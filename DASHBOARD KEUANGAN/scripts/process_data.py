import sys
import argparse
import pandas as pd
import json
import os
import re
import tempfile
import subprocess
import shutil
from datetime import datetime

import holidays

if hasattr(sys.stdout, 'reconfigure'):
    sys.stdout.reconfigure(encoding='utf-8', errors='replace')
    sys.stderr.reconfigure(encoding='utf-8', errors='replace')

BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
DATA_DIR = os.path.join(BASE_DIR, 'data')
DEPARTMENTS_FILE = os.path.join(DATA_DIR, 'departments.json')
DATA_DEPTS_FILE = os.path.join(DATA_DIR, 'data_departments.json')
JS_FILE = os.path.join(DATA_DIR, 'data.js')

# Aturan bisnis hari libur
TANGGAL_MERAH = set()
TAHUN_LIBUR_TERDETEKSI = set()

DAFTAR_LIBUR_FALLBACK = {
    2024: {'2024-01-01', '2024-02-08', '2024-02-14', '2024-03-11', '2024-03-29', '2024-03-30', '2024-04-10', '2024-05-01', '2024-05-23', '2024-06-01', '2024-06-17', '2024-07-07', '2024-08-17', '2024-09-16', '2024-11-15', '2024-12-25', '2024-12-26'},
    2025: {'2025-01-01', '2025-01-27', '2025-02-25', '2025-03-18', '2025-03-19', '2025-03-20', '2025-04-11', '2025-05-01', '2025-05-12', '2025-05-13', '2025-05-29', '2025-06-01', '2025-06-26', '2025-07-07', '2025-08-17', '2025-09-05', '2025-11-15', '2025-12-25'},
    2026: {'2026-01-01', '2026-01-27', '2026-02-09', '2026-02-10', '2026-02-11', '2026-03-31', '2026-04-01', '2026-04-02', '2026-04-03', '2026-05-01', '2026-05-14', '2026-05-15', '2026-05-26', '2026-06-01', '2026-07-20', '2026-08-17', '2026-09-24', '2026-11-15', '2026-12-25'}
}

def tambah_tanggal_merah_tahun(tahun):
    global TANGGAL_MERAH
    if tahun in TAHUN_LIBUR_TERDETEKSI:
        return
    libur_tahun = set(DAFTAR_LIBUR_FALLBACK.get(tahun, set()))
    try:
        negara = holidays.country_holidays('ID', years=tahun)
        for tgl in negara:
            libur_tahun.add(pd.Timestamp(tgl).strftime('%Y-%m-%d'))
    except Exception:
        pass
    TANGGAL_MERAH.update(libur_tahun)
    TAHUN_LIBUR_TERDETEKSI.add(tahun)

def parse_tanggal(tgl_raw):
    if pd.isna(tgl_raw):
        return pd.NaT
    d_clean = str(tgl_raw).lower()
    bulan_id = {'januari':'jan', 'februari':'feb', 'maret':'mar', 'mei':'may', 'juni':'jun', 'juli':'jul', 'agustus':'aug', 'oktober':'oct', 'desember':'dec'}
    for id_m, en_m in bulan_id.items():
        d_clean = d_clean.replace(id_m, en_m)
    try:
        if re.match(r'^\d{4}-\d{2}-\d{2}', d_clean):
            return pd.to_datetime(d_clean)
        return pd.to_datetime(d_clean, dayfirst=True)
    except:
        return pd.NaT

def is_hari_libur(tgl_obj):
    if pd.isna(tgl_obj):
        return False
    tgl_iso = tgl_obj.strftime('%Y-%m-%d')
    tahun = tgl_obj.year
    tambah_tanggal_merah_tahun(tahun)
    return tgl_obj.isoweekday() == 7 or tgl_iso in TANGGAL_MERAH

def format_waktu(val):
    val_str = str(val).strip()
    if not val_str or val_str.lower() in ['nan', 'nat', 'none', '-', '']:
        return '-'
    m = re.search(r'(\d{1,2})[:.](\d{2})', val_str)
    if m:
        return f"{int(m.group(1)):02d}:{m.group(2)}"
    return val_str[:5]

def hitung_durasi_jam(mulai_val, selesai_val):
    """
    Menghitung durasi lembur (jam) dari jam mulai dan selesai.
    Mendukung format '14:00', '14.00', datetime.time, dll.
    """
    if not mulai_val or not selesai_val:
        return 0.0
    val1 = str(mulai_val).strip()
    val2 = str(selesai_val).strip()
    if val1 in ['-', '', 'nan', 'nat'] or val2 in ['-', '', 'nan', 'nat']:
        return 0.0
    try:
        m1 = re.search(r'(\d{1,2})[:.](\d{2})', val1)
        m2 = re.search(r'(\d{1,2})[:.](\d{2})', val2)
        if m1 and m2:
            h1, min1 = int(m1.group(1)), int(m1.group(2))
            h2, min2 = int(m2.group(1)), int(m2.group(2))
            total_menit = (h2 * 60 + min2) - (h1 * 60 + min1)
            if total_menit < 0:
                total_menit += 24 * 60
            if total_menit > 0:
                return round(total_menit / 60.0, 2)
    except Exception:
        pass
    return 0.0

def normalize_sheets_url(raw_url):
    """
    Otomatis mengubah URL Google Spreadsheet ke URL download .xlsx yang valid:
    - https://docs.google.com/spreadsheets/d/e/2PACX-.../pubhtml -> .../pub?output=xlsx
    - https://docs.google.com/spreadsheets/d/<SHEET_ID>/edit... -> .../export?format=xlsx
    - https://docs.google.com/spreadsheets/d/<SHEET_ID>/view... -> .../export?format=xlsx
    """
    url = raw_url.strip()
    if not url:
        return ""
    # Format published to web
    if '/pubhtml' in url:
        return re.sub(r'/pubhtml.*', '/pub?output=xlsx', url)
    if '/pub?' in url or url.endswith('/pub'):
        if 'output=xlsx' not in url:
            sep = '&' if '?' in url else '?'
            return f"{url}{sep}output=xlsx"
        return url
    # Format share biasa (/edit, /view, atau hanya /d/<id>)
    m = re.search(r'/spreadsheets/d/([a-zA-Z0-9_-]+)', url)
    if m:
        sheet_id = m.group(1)
        if sheet_id != 'e':
            return f"https://docs.google.com/spreadsheets/d/{sheet_id}/export?format=xlsx"
    return url

def download_spreadsheet(url, output_path):
    curl_bin = shutil.which('curl.exe') or shutil.which('curl')
    if curl_bin:
        try:
            cmd = [curl_bin, '-s', '-L', '--max-time', '180', url, '-o', output_path]
            res = subprocess.run(cmd, capture_output=True, timeout=190)
            if res.returncode == 0 and os.path.exists(output_path) and os.path.getsize(output_path) > 1000:
                return
        except Exception as curl_err:
            print(f"Curl gagal ({curl_err}), mencoba fallback urllib...")

    import urllib.request
    req = urllib.request.Request(
        url,
        headers={'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)'}
    )
    with urllib.request.urlopen(req, timeout=180) as resp, open(output_path, 'wb') as out_f:
        shutil.copyfileobj(resp, out_f)

    if not os.path.exists(output_path) or os.path.getsize(output_path) <= 1000:
        raise RuntimeError("Gagal mengunduh file spreadsheet dari Google Sheets (file kosong atau rusak). Pastikan link benar dan akses dibuka umum/public.")

def parse_excel_sheets(excel_path):
    print("Membaca dan menganalisis semua sheet Excel...")
    semua_sheet = pd.read_excel(excel_path, sheet_name=None, header=None)
    
    log_lengkap = []
    karyawan_set = set()
    tanggal_kumpulan = []

    for nama_sheet, df in semua_sheet.items():
        header_idx = None
        for idx, row in df.iterrows():
            if row.fillna('').astype(str).str.contains('NAMA KARYAWAN', case=False).any():
                header_idx = idx
                break
        
        if header_idx is not None:
            df.columns = df.iloc[header_idx].fillna('').astype(str).str.strip().str.upper().tolist()
            df = df.iloc[header_idx + 1:].reset_index(drop=True)
            
            if not df.empty:
                first_row = df.iloc[0].fillna('').astype(str).str.upper().tolist()
                ada_subheader = False
                for i, val in enumerate(first_row):
                    if 'MULAI' in val or 'SELESAI' in val:
                        df.columns.values[i] = val.strip()
                        ada_subheader = True
                if ada_subheader:
                    df = df.iloc[1:].reset_index(drop=True)
            
            df.columns = [re.sub(r'\s+', ' ', str(col)).strip() for col in df.columns]
            
            col_tgl = next((c for c in df.columns if 'TGL' in c or 'TANGGAL' in c), None)
            if col_tgl:
                def to_nan_if_empty(x):
                    if pd.isna(x) or str(x).strip() == '' or str(x).lower() == 'nan':
                        return pd.NA
                    return x
                df[col_tgl] = df[col_tgl].apply(to_nan_if_empty).ffill()

            col_nama = next((c for c in df.columns if 'NAMA KARYAWAN' in c), None)
            if col_nama:
                df = df.dropna(subset=[col_nama])
                col_mulai = next((c for c in df.columns if 'MULAI' in c), None)
                col_selesai = next((c for c in df.columns if 'SELESAI' in c), None)
                
                for _, row in df.iterrows():
                    nama = str(row[col_nama]).strip()
                    if not nama or nama.lower() == 'nan':
                        continue
                    if 'OT TS' in nama.upper() or 'TOTAL' in nama.upper():
                        continue
                    
                    col_ovt = next((c for c in df.columns if ('JUMLAH' in c or 'LEMBUR' in c) and 'JAM' in c), None)
                    if not col_ovt:
                        col_ovt = next((c for c in df.columns if 'OVT' in c), None)
                    if not col_ovt:
                        continue
                    
                    ovt_str = str(row.get(col_ovt, '0')).lower().replace('jam', '').replace(',', '.').strip()
                    try:
                        ovt_jam = float(ovt_str)
                    except:
                        ovt_jam = 0.0
                    
                    # Fallback cerdas: Jika di spreadsheet tertulis 0 jam (salah input/rumus nol)
                    # tetapi ada jam MULAI & SELESAI yang terisi, hitung jam otomatis
                    if ovt_jam <= 0 and col_mulai and col_selesai:
                        durasi_otomatis = hitung_durasi_jam(row.get(col_mulai), row.get(col_selesai))
                        if durasi_otomatis > 0:
                            ovt_jam = durasi_otomatis
                    
                    col_ket = next((c for c in df.columns if 'KET' in c or 'URAIAN' in c or 'TUGAS' in c), None)
                    ket = str(row.get(col_ket)).strip() if col_ket else '-'
                    if ket.lower() == 'nan':
                        ket = '-'
                    
                    # Jika setelah fallback ovt_jam tetap <= 0 dan tidak ada jam kerja ataupun keterangan yang valid, lewati baris kosong
                    if ovt_jam <= 0 and (ket == '-' or not ket) and (not col_mulai or not col_selesai):
                        continue
                    
                    tgl_raw = row[col_tgl] if col_tgl else ''
                    jenis_hari = 'B'
                    tgl_str_tampil = str(tgl_raw)
                    tgl_iso = '1970-01-01'
                    
                    tgl_obj = parse_tanggal(tgl_raw)
                    if pd.notna(tgl_obj):
                        tgl_iso = tgl_obj.strftime('%Y-%m-%d')
                        tgl_str_tampil = tgl_obj.strftime('%d/%m/%Y')
                        tanggal_kumpulan.append(tgl_iso)
                        if is_hari_libur(tgl_obj):
                            jenis_hari = 'L'
                        
                    uang = ovt_jam * 43000 if jenis_hari == 'L' else ovt_jam * 32000
                    karyawan_set.add(nama)
                    mulai = format_waktu(row.get(col_mulai)) if col_mulai else '-'
                    selesai = format_waktu(row.get(col_selesai)) if col_selesai else '-'
                    
                    log_lengkap.append({
                        "sheet_name": nama_sheet,
                        "tanggal_iso": tgl_iso,
                        "tanggal_tampil": tgl_str_tampil,
                        "nama": nama,
                        "mulai": mulai,
                        "selesai": selesai,
                        "ovt": ovt_jam,
                        "jenis_hari": jenis_hari,
                        "uang": uang,
                        "keterangan": ket
                    })

    min_date = min(tanggal_kumpulan) if tanggal_kumpulan else ''
    max_date = max(tanggal_kumpulan) if tanggal_kumpulan else ''

    return {
        "karyawan": sorted(list(karyawan_set)),
        "min_date": min_date,
        "max_date": max_date,
        "log": sorted(log_lengkap, key=lambda x: x['tanggal_iso'], reverse=True)
    }

def load_departments():
    if os.path.exists(DEPARTMENTS_FILE):
        try:
            with open(DEPARTMENTS_FILE, 'r', encoding='utf-8') as f:
                return json.load(f)
        except Exception:
            pass
    return {
        "departments": [
            {
                "id": "ppic",
                "name": "PPIC",
                "url": "https://docs.google.com/spreadsheets/d/e/2PACX-1vRqMZX-vHRj5O0KIlThwayVCWOX6JctaM-Y7vV_yR9deR4AXrMbeqbVjAE4iO7LP3K9MqxgfIVBecCa/pub?output=xlsx",
                "updated_at": ""
            }
        ],
        "default_dept": "ppic"
    }

def save_departments(config):
    os.makedirs(DATA_DIR, exist_ok=True)
    with open(DEPARTMENTS_FILE, 'w', encoding='utf-8') as f:
        json.dump(config, f, indent=4)

def load_data_departments():
    if os.path.exists(DATA_DEPTS_FILE):
        try:
            with open(DATA_DEPTS_FILE, 'r', encoding='utf-8') as f:
                return json.load(f)
        except Exception:
            pass
    return {}

def save_all_data(dept_config, data_all):
    os.makedirs(DATA_DIR, exist_ok=True)
    with open(DATA_DEPTS_FILE, 'w', encoding='utf-8') as f:
        json.dump(data_all, f, indent=4)
        
    default_id = dept_config.get("default_dept") or (dept_config["departments"][0]["id"] if dept_config["departments"] else "")
    default_data = data_all.get(default_id, {"karyawan": [], "min_date": "", "max_date": "", "log": []})

    with open(JS_FILE, 'w', encoding='utf-8') as f:
        f.write(f"const data_departments_meta = {json.dumps(dept_config['departments'], indent=4)};\n\n")
        f.write(f"const data_departments_all = {json.dumps(data_all, indent=4)};\n\n")
        f.write(f"// Backward compatibility:\n")
        f.write(f"const data_dashboard = {json.dumps(default_data, indent=4)};\n")

def process_single_department(dept_item):
    name = dept_item.get('name', 'Departemen')
    raw_url = dept_item.get('url', '')
    download_url = normalize_sheets_url(raw_url)
    if not download_url:
        raise ValueError(f"Link spreadsheet kosong untuk departemen '{name}'.")

    print(f"\n==================================================")
    print(f"Memproses Departemen: {name}")
    print(f"URL: {download_url}")
    print(f"==================================================")

    tmp_file = os.path.join(tempfile.gettempdir(), f"temp_{dept_item['id']}_sheets.xlsx")
    try:
        download_spreadsheet(download_url, tmp_file)
        data = parse_excel_sheets(tmp_file)
        dept_item['updated_at'] = datetime.now().strftime('%Y-%m-%d %H:%M:%S')
        print(f"Sukses! {len(data['log'])} baris lembur terdeteksi untuk {name}.")
        return data
    finally:
        if os.path.exists(tmp_file):
            try:
                os.remove(tmp_file)
            except Exception:
                pass

def main():
    parser = argparse.ArgumentParser(description="Proses Data Spreadsheet Lembur Multi-Departemen")
    parser.add_argument('--dept', type=str, help="ID departemen yang ingin diproses (misal: ppic)")
    parser.add_argument('--all', action='store_true', help="Proses seluruh departemen yang terdaftar")
    parser.add_argument('--add', action='store_true', help="Tambah atau update departemen")
    parser.add_argument('--id', type=str, help="ID departemen untuk --add")
    parser.add_argument('--name', type=str, help="Nama departemen untuk --add")
    parser.add_argument('--url', type=str, help="Link Google Sheets untuk --add")
    parser.add_argument('--webhook', type=str, default=None, help="Link Webhook Apps Script untuk --add")
    parser.add_argument('--delete', action='store_true', help="Hapus departemen")
    
    args = parser.parse_args()

    config = load_departments()
    data_all = load_data_departments()

    # Operasi Hapus
    if args.delete:
        dept_id = args.dept or args.id
        if not dept_id:
            print("Error: Harap sebutkan --dept <id> untuk dihapus.", file=sys.stderr)
            sys.exit(1)
        config["departments"] = [d for d in config["departments"] if d["id"] != dept_id]
        if dept_id in data_all:
            del data_all[dept_id]
        if config.get("default_dept") == dept_id and config["departments"]:
            config["default_dept"] = config["departments"][0]["id"]
        save_departments(config)
        save_all_data(config, data_all)
        print(f"Departemen '{dept_id}' berhasil dihapus.")
        sys.exit(0)

    # Operasi Tambah / Edit
    if args.add:
        if not args.name or not args.url:
            print("Error: --name dan --url wajib diisi untuk --add", file=sys.stderr)
            sys.exit(1)
        dept_id = args.id or re.sub(r'[^a-zA-Z0-9_]', '_', args.name.lower().strip())
        normalized_url = normalize_sheets_url(args.url)
        
        # Cek apakah sudah ada
        found = False
        target_item = None
        for d in config["departments"]:
            if d["id"] == dept_id:
                d["name"] = args.name.strip()
                d["url"] = normalized_url
                if args.webhook is not None:
                    d["webhook_url"] = args.webhook.strip()
                target_item = d
                found = True
                break
        if not found:
            target_item = {
                "id": dept_id,
                "name": args.name.strip(),
                "url": normalized_url,
                "webhook_url": args.webhook.strip() if args.webhook else "",
                "updated_at": ""
            }
            config["departments"].append(target_item)
            
        parsed_data = process_single_department(target_item)
        data_all[dept_id] = parsed_data
        save_departments(config)
        save_all_data(config, data_all)
        print(f"\nBINGO! Departemen '{args.name}' berhasil ditambahkan dan disinkronkan!")
        sys.exit(0)

    # Operasi Refresh
    if args.all:
        for dept in config["departments"]:
            try:
                parsed = process_single_department(dept)
                data_all[dept["id"]] = parsed
            except Exception as exc:
                print(f"Error memproses {dept['name']}: {exc}", file=sys.stderr)
        save_departments(config)
        save_all_data(config, data_all)
        print("\nBINGO! Seluruh departemen berhasil diperbarui!")
        sys.exit(0)

    # Single department refresh (atau default)
    target_id = args.dept or config.get("default_dept", "ppic")
    target_item = next((d for d in config["departments"] if d["id"] == target_id), None)
    if not target_item:
        if config["departments"]:
            target_item = config["departments"][0]
        else:
            print("Belum ada departemen yang terdaftar.", file=sys.stderr)
            sys.exit(1)

    parsed = process_single_department(target_item)
    data_all[target_item["id"]] = parsed
    save_departments(config)
    save_all_data(config, data_all)
    print(f"\nBINGO! Data lembur departemen '{target_item['name']}' berhasil diperbarui!")

if __name__ == '__main__':
    try:
        main()
    except Exception as e:
        print(f"Terjadi kesalahan: {e}", file=sys.stderr)
        sys.exit(1)