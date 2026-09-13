from http.server import ThreadingHTTPServer, SimpleHTTPRequestHandler
from urllib.parse import urlparse, parse_qs
import json
import os
import subprocess
import sys

ROOT = os.path.dirname(os.path.abspath(__file__))
DEPARTMENTS_FILE = os.path.join(ROOT, 'data', 'departments.json')


class Handler(SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=ROOT, **kwargs)

    def end_headers(self):
        self.send_header('Cache-Control', 'no-store, no-cache, must-revalidate, max-age=0')
        self.send_header('Pragma', 'no-cache')
        self.send_header('Expires', '0')
        super().end_headers()

    def _send_json(self, status_code, payload):
        body = json.dumps(payload).encode('utf-8')
        self.send_response(status_code)
        self.send_header('Content-Type', 'application/json; charset=utf-8')
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Access-Control-Allow-Methods', 'GET, POST, DELETE, OPTIONS')
        self.send_header('Access-Control-Allow-Headers', 'Content-Type')
        self.send_header('Content-Length', str(len(body)))
        self.end_headers()
        self.wfile.write(body)

    def _read_json_body(self):
        try:
            content_len = int(self.headers.get('Content-Length', 0))
            if content_len > 0:
                raw = self.rfile.read(content_len).decode('utf-8')
                return json.loads(raw)
        except Exception:
            pass
        return {}

    def do_OPTIONS(self):
        self.send_response(204)
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Access-Control-Allow-Methods', 'GET, POST, DELETE, OPTIONS')
        self.send_header('Access-Control-Allow-Headers', 'Content-Type')
        self.end_headers()

    def do_GET(self):
        parsed = urlparse(self.path)
        if parsed.path == '/api/health':
            self._send_json(200, {'ok': True, 'status': 'running'})
            return
        if parsed.path == '/api/departments':
            try:
                if os.path.exists(DEPARTMENTS_FILE):
                    with open(DEPARTMENTS_FILE, 'r', encoding='utf-8') as f:
                        data = json.load(f)
                else:
                    data = {"departments": [], "default_dept": ""}
                self._send_json(200, {'ok': True, **data})
                return
            except Exception as e:
                self._send_json(500, {'ok': False, 'error': str(e)})
                return
        if parsed.path == '/api/departments_data':
            try:
                data_file = os.path.join(ROOT, 'data', 'data_departments.json')
                if os.path.exists(data_file):
                    with open(data_file, 'r', encoding='utf-8') as f:
                        data = json.load(f)
                else:
                    data = {}
                self._send_json(200, {'ok': True, 'data': data})
                return
            except Exception as e:
                self._send_json(500, {'ok': False, 'error': str(e)})
                return
        super().do_GET()

    def do_POST(self):
        parsed = urlparse(self.path)
        script_path = os.path.join(ROOT, 'scripts', 'process_data.py')

        if parsed.path == '/api/refresh':
            try:
                data = self._read_json_body()
                dept_id = data.get('dept_id')
                cmd = [sys.executable, script_path]
                if dept_id:
                    cmd.extend(['--dept', dept_id])
                else:
                    cmd.append('--all')

                result = subprocess.run(
                    cmd,
                    cwd=ROOT,
                    capture_output=True,
                    text=True,
                    encoding='utf-8',
                    errors='replace',
                    timeout=300,
                )
                payload = {
                    'ok': result.returncode == 0,
                    'stdout': result.stdout.strip(),
                    'stderr': result.stderr.strip(),
                    'returncode': result.returncode,
                }
                self._send_json(200 if result.returncode == 0 else 500, payload)
                return
            except Exception as exc:
                self._send_json(500, {'ok': False, 'error': str(exc)})
                return

        if parsed.path == '/api/departments':
            try:
                data = self._read_json_body()
                name = str(data.get('name', '')).strip()
                url = str(data.get('url', '')).strip()
                dept_id = str(data.get('id', '')).strip()
                webhook_url = str(data.get('webhook_url', '')).strip()

                if not name or not url:
                    self._send_json(400, {'ok': False, 'error': 'Nama departemen dan link spreadsheet wajib diisi.'})
                    return

                cmd = [sys.executable, script_path, '--add', '--name', name, '--url', url]
                if dept_id:
                    cmd.extend(['--id', dept_id])
                if webhook_url:
                    cmd.extend(['--webhook', webhook_url])

                result = subprocess.run(
                    cmd,
                    cwd=ROOT,
                    capture_output=True,
                    text=True,
                    encoding='utf-8',
                    errors='replace',
                    timeout=300,
                )

                if result.returncode != 0:
                    self._send_json(500, {
                        'ok': False,
                        'error': result.stderr.strip() or result.stdout.strip() or 'Gagal memproses spreadsheet.'
                    })
                    return

                depts_info = {}
                if os.path.exists(DEPARTMENTS_FILE):
                    with open(DEPARTMENTS_FILE, 'r', encoding='utf-8') as f:
                        depts_info = json.load(f)

                self._send_json(200, {
                    'ok': True,
                    'message': f"Departemen '{name}' berhasil disimpan dan data diperbarui.",
                    'stdout': result.stdout.strip(),
                    **depts_info
                })
                return
            except Exception as exc:
                self._send_json(500, {'ok': False, 'error': str(exc)})
                return

        if parsed.path == '/api/overtime/save':
            try:
                data = self._read_json_body()
                dept_id = str(data.get('dept_id', '')).strip()
                item = data.get('item', {})
                old_item = data.get('old_item', None)
                is_edit = bool(data.get('is_edit', False))

                if not dept_id or not item or not item.get('nama') or not item.get('tanggal_iso'):
                    self._send_json(400, {'ok': False, 'error': 'Departemen, nama karyawan, dan tanggal wajib diisi.'})
                    return

                data_file = os.path.join(ROOT, 'data', 'data_departments.json')
                all_data = {}
                if os.path.exists(data_file):
                    with open(data_file, 'r', encoding='utf-8') as f:
                        all_data = json.load(f)

                if dept_id not in all_data:
                    all_data[dept_id] = {'karyawan': [], 'min_date': '', 'max_date': '', 'log': []}

                dept_log = all_data[dept_id].get('log', [])

                if is_edit and old_item:
                    # Cari baris yang cocok berdasarkan tanggal dan nama lama
                    found_idx = -1
                    for idx, row in enumerate(dept_log):
                        if (row.get('tanggal_iso') == old_item.get('tanggal_iso') and 
                            row.get('nama', '').strip().upper() == old_item.get('nama', '').strip().upper() and
                            row.get('mulai') == old_item.get('mulai')):
                            found_idx = idx
                            break
                    if found_idx != -1:
                        dept_log[found_idx] = item
                    else:
                        dept_log.insert(0, item)
                else:
                    dept_log.insert(0, item)

                # Update daftar karyawan unik
                karyawan_set = set(all_data[dept_id].get('karyawan', []))
                karyawan_set.add(item['nama'])
                all_data[dept_id]['karyawan'] = sorted(list(karyawan_set))
                all_data[dept_id]['log'] = dept_log

                # Simpan ke data_departments.json
                with open(data_file, 'w', encoding='utf-8') as f:
                    json.dump(all_data, f, indent=4)

                # Perbarui data.js
                depts_info = {}
                if os.path.exists(DEPARTMENTS_FILE):
                    with open(DEPARTMENTS_FILE, 'r', encoding='utf-8') as f:
                        depts_info = json.load(f)

                default_id = depts_info.get("default_dept", dept_id)
                default_data = all_data.get(default_id, {"karyawan": [], "min_date": "", "max_date": "", "log": []})

                js_file = os.path.join(ROOT, 'data', 'data.js')
                with open(js_file, 'w', encoding='utf-8') as f:
                    f.write(f"const data_departments_meta = {json.dumps(depts_info.get('departments', []), indent=4)};\n\n")
                    f.write(f"const data_departments_all = {json.dumps(all_data, indent=4)};\n\n")
                    f.write(f"// Backward compatibility:\n")
                    f.write(f"const data_dashboard = {json.dumps(default_data, indent=4)};\n")

                self._send_json(200, {
                    'ok': True,
                    'message': 'Data lembur berhasil disimpan secara lokal dan disinkronkan.',
                    'item': item
                })
                return
            except Exception as exc:
                self._send_json(500, {'ok': False, 'error': str(exc)})
                return

        if parsed.path == '/api/overtime/delete':
            try:
                data = self._read_json_body()
                dept_id = str(data.get('dept_id', '')).strip()
                item = data.get('item', {})

                if not dept_id or not item:
                    self._send_json(400, {'ok': False, 'error': 'Departemen dan item data wajib diisi.'})
                    return

                data_file = os.path.join(ROOT, 'data', 'data_departments.json')
                if os.path.exists(data_file):
                    with open(data_file, 'r', encoding='utf-8') as f:
                        all_data = json.load(f)
                else:
                    all_data = {}

                if dept_id in all_data and 'log' in all_data[dept_id]:
                    dept_log = all_data[dept_id]['log']
                    new_log = [
                        row for row in dept_log 
                        if not (
                            row.get('tanggal_iso') == item.get('tanggal_iso') and 
                            row.get('nama', '').strip().upper() == item.get('nama', '').strip().upper() and
                            row.get('mulai') == item.get('mulai') and
                            row.get('selesai') == item.get('selesai')
                        )
                    ]
                    all_data[dept_id]['log'] = new_log
                    all_karyawan = sorted(list(set(r.get('nama', '').strip() for r in new_log if r.get('nama'))))
                    all_data[dept_id]['karyawan'] = all_karyawan

                    with open(data_file, 'w', encoding='utf-8') as f:
                        json.dump(all_data, f, indent=4)

                    depts_info = {}
                    if os.path.exists(DEPARTMENTS_FILE):
                        with open(DEPARTMENTS_FILE, 'r', encoding='utf-8') as f:
                            depts_info = json.load(f)

                    default_id = depts_info.get("default_dept", dept_id)
                    default_data = all_data.get(default_id, {"karyawan": [], "min_date": "", "max_date": "", "log": []})

                    js_file = os.path.join(ROOT, 'data', 'data.js')
                    with open(js_file, 'w', encoding='utf-8') as f:
                        f.write(f"const data_departments_meta = {json.dumps(depts_info.get('departments', []), indent=4)};\n\n")
                        f.write(f"const data_departments_all = {json.dumps(all_data, indent=4)};\n\n")
                        f.write(f"// Backward compatibility:\n")
                        f.write(f"const data_dashboard = {json.dumps(default_data, indent=4)};\n")

                self._send_json(200, {'ok': True, 'message': 'Data lembur berhasil dihapus.'})
                return
            except Exception as exc:
                self._send_json(500, {'ok': False, 'error': str(exc)})
                return

        self.send_response(404)
        self.send_header('Access-Control-Allow-Origin', '*')
        self.end_headers()

    def do_DELETE(self):
        parsed = urlparse(self.path)
        if parsed.path == '/api/departments':
            try:
                query_params = parse_qs(parsed.query)
                dept_id = query_params.get('id', [None])[0]
                if not dept_id:
                    data = self._read_json_body()
                    dept_id = data.get('id')

                if not dept_id:
                    self._send_json(400, {'ok': False, 'error': 'Parameter id departemen wajib ada.'})
                    return

                script_path = os.path.join(ROOT, 'scripts', 'process_data.py')
                result = subprocess.run(
                    [sys.executable, script_path, '--delete', '--dept', dept_id],
                    cwd=ROOT,
                    capture_output=True,
                    text=True,
                    encoding='utf-8',
                    errors='replace',
                    timeout=60,
                )

                if result.returncode != 0:
                    self._send_json(500, {'ok': False, 'error': result.stderr.strip() or 'Gagal menghapus departemen.'})
                    return

                depts_info = {}
                if os.path.exists(DEPARTMENTS_FILE):
                    with open(DEPARTMENTS_FILE, 'r', encoding='utf-8') as f:
                        depts_info = json.load(f)

                self._send_json(200, {
                    'ok': True,
                    'message': f"Departemen '{dept_id}' berhasil dihapus.",
                    **depts_info
                })
                return
            except Exception as exc:
                self._send_json(500, {'ok': False, 'error': str(exc)})
                return

        self.send_response(404)
        self.send_header('Access-Control-Allow-Origin', '*')
        self.end_headers()


if __name__ == '__main__':
    host = '0.0.0.0'
    port = int(os.environ.get('PORT', 8000))
    server = ThreadingHTTPServer((host, port), Handler)
    print(f'Server running at http://127.0.0.1:{port} (Bisa diakses dari HP di jaringan WiFi yang sama)')
    server.serve_forever()
