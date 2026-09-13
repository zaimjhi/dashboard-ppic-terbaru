/**
 * =========================================================================
 * GOOGLE APPS SCRIPT: WEBHOOK DUA ARAH PRESISI 100% FORM OT PPIC
 * (PT CHAROEN POKPHAND INDONESIA)
 * =========================================================================
 * 
 * PEMETAAN KOLOM RESMI (SESUAI DOKUMEN ASLI PPIC):
 * - Kolom A & B : Kosong (Margin)
 * - Kolom C (3) : NO (Nomor urut: 1, 2, ... 16, 17...)
 * - Kolom D (4) : NAMA KARYAWAN
 * - Kolom E (5) : NO REG/KARYAWAN (NIP, misal: 18572610003)
 * - Kolom F (6) : TGL (Format: d/m/yyyy, misal: 14/9/2026)
 * - Kolom G (7) : MULAI (Jam Mulai, misal: 16:00 / 17:00)
 * - Kolom H (8) : SELESAI (Jam Selesai, misal: 19:00 / 20:00)
 * - Kolom I (9) : ISTIRAHAT / BREAK
 * - Kolom J (10): JUMLAH JAM LEMBUR (Format: "3 jam")
 * - Kolom K (11): KET / URAIAN
 * - Kolom L (12): PARAF
 */

var COL_NO = 3;       // Kolom C: NO
var COL_NAMA = 4;     // Kolom D: NAMA KARYAWAN
var COL_NOREG = 5;    // Kolom E: NO REG/KARYAWAN
var COL_TGL = 6;      // Kolom F: TGL
var COL_MULAI = 7;    // Kolom G: MULAI
var COL_SELESAI = 8;  // Kolom H: SELESAI
var COL_BREAK = 9;    // Kolom I: ISTIRAHAT / BREAK
var COL_JAM = 10;     // Kolom J: JUMLAH JAM LEMBUR
var COL_KET = 11;     // Kolom K: KET / URAIAN
var COL_PARAF = 12;   // Kolom L: PARAF

function doPost(e) {
  try {
    var rawData = e.postData ? e.postData.contents : "{}";
    var data = JSON.parse(rawData);
    var action = data.action; // 'create', 'update', 'delete'
    var item = data.item;

    var ss = SpreadsheetApp.getActiveSpreadsheet();
    // Gunakan tab sheet yang sedang aktif atau cari berdasarkan nama sheet
    var sheet = ss.getActiveSheet();
    if (item && item.sheet_name) {
      var found = ss.getSheetByName(item.sheet_name);
      if (found) sheet = found;
    }

    var result = {};
    if (action === 'create') {
      result = insertOvertimeRow(sheet, item);
    } else if (action === 'update') {
      result = updateOvertimeRow(sheet, item, data.old_item);
    } else if (action === 'delete') {
      result = deleteOvertimeRow(sheet, item);
    } else {
      throw new Error("Aksi tidak valid: " + action);
    }

    return ContentService.createTextOutput(JSON.stringify({
      ok: true,
      action: action,
      sheet: sheet.getName(),
      result: result
    })).setMimeType(ContentService.MimeType.JSON);

  } catch (err) {
    return ContentService.createTextOutput(JSON.stringify({
      ok: false,
      error: err.toString()
    })).setMimeType(ContentService.MimeType.JSON);
  }
}

function doGet(e) {
  return ContentService.createTextOutput("Webhook OVT PPIC Online & Aktif.");
}

// Mencari baris data terakhir dan nomor urut terakhir di Kolom C
function findTableBoundary(sheet) {
  var maxNo = 0;
  var lastDataRow = 12; // Dimulai setelah header (baris 11-12)

  for (var r = 13; r <= 90; r++) {
    var valC = sheet.getRange(r, COL_NO).getValue();
    var valD = String(sheet.getRange(r, COL_NAMA).getValue() || '').trim();
    var valK = String(sheet.getRange(r, COL_KET).getValue() || '').trim();

    // Berhenti saat menyentuh kotak tanda tangan
    if (valC === 'Pemberi Perintah' || valD === 'Pemberi Perintah' || valK.indexOf('Mengetahui') !== -1 ||
        valD.indexOf('Rahmatullah') !== -1 || valD.indexOf('PPIC Manager') !== -1) {
      break;
    }

    if (typeof valC === 'number' && valC > 0) {
      if (valC > maxNo) {
        maxNo = valC;
        lastDataRow = r;
      }
    } else if (valD !== '' && valD !== 'OT TS') {
      lastDataRow = r;
    }
  }

  return {
    lastRow: lastDataRow,
    nextNo: maxNo + 1
  };
}

// Format tanggal ISO (2026-09-14) menjadi d/m/yyyy (14/9/2026)
function formatTanggal(isoStr, tampilStr) {
  if (isoStr && isoStr.indexOf('-') !== -1) {
    var parts = isoStr.split('-');
    if (parts.length === 3) {
      return parseInt(parts[2], 10) + '/' + parseInt(parts[1], 10) + '/' + parts[0];
    }
  }
  return tampilStr || isoStr || '';
}

// Mencari NIP / NO REG karyawan dari baris-baris atas
function lookupNIP(sheet, namaKaryawan) {
  var target = namaKaryawan.trim().toUpperCase();
  for (var r = 13; r <= 80; r++) {
    var n = String(sheet.getRange(r, COL_NAMA).getValue() || '').trim().toUpperCase();
    if (n === target) {
      var nip = sheet.getRange(r, COL_NOREG).getValue();
      if (nip) return String(nip);
    }
  }
  return '';
}

// 1. TAMBAH BARIS BARU (CREATE)
function insertOvertimeRow(sheet, item) {
  var boundary = findTableBoundary(sheet);
  var targetRow = boundary.lastRow + 1;

  // Sisipkan 1 baris baru tepat di bawah baris nomor terakhir (sebelum tanda tangan)
  sheet.insertRowAfter(boundary.lastRow);

  // Salin garis border & format tabel dari baris sebelumnya (Kolom C sampai L)
  var sourceRange = sheet.getRange(boundary.lastRow, COL_NO, 1, 10);
  var targetRange = sheet.getRange(targetRow, COL_NO, 1, 10);
  sourceRange.copyTo(targetRange, SpreadsheetApp.CopyPasteType.PASTE_FORMAT, false);

  var tglStr = formatTanggal(item.tanggal_iso, item.tanggal_tampil);
  var noReg = lookupNIP(sheet, item.nama);
  var jamStr = item.ovt ? (item.ovt + " jam") : "1 jam";

  // Tulis nilai tepat di kolom masing-masing:
  sheet.getRange(targetRow, COL_NO).setValue(boundary.nextNo);              // Kolom C: NO (misal 17)
  sheet.getRange(targetRow, COL_NAMA).setValue(item.nama);                 // Kolom D: NAMA KARYAWAN
  if (noReg) sheet.getRange(targetRow, COL_NOREG).setValue(noReg);         // Kolom E: NO REG/KARYAWAN
  sheet.getRange(targetRow, COL_TGL).setValue(tglStr);                     // Kolom F: TGL (14/9/2026)
  sheet.getRange(targetRow, COL_MULAI).setValue(item.mulai || "17:00");    // Kolom G: MULAI
  sheet.getRange(targetRow, COL_SELESAI).setValue(item.selesai || "20:00");// Kolom H: SELESAI
  sheet.getRange(targetRow, COL_BREAK).setValue("");                       // Kolom I: BREAK
  sheet.getRange(targetRow, COL_JAM).setValue(jamStr);                     // Kolom J: JUMLAH JAM LEMBUR
  sheet.getRange(targetRow, COL_KET).setValue(item.keterangan || "-");     // Kolom K: KET / URAIAN

  return {
    row: targetRow,
    no: boundary.nextNo,
    nama: item.nama,
    tanggal: tglStr
  };
}

// 2. EDIT BARIS (UPDATE)
function updateOvertimeRow(sheet, newItem, oldItem) {
  var searchItem = oldItem || newItem;
  var targetNama = String(searchItem.nama || '').trim().toUpperCase();
  var searchTgl = formatTanggal(searchItem.tanggal_iso, searchItem.tanggal_tampil);

  var targetRow = -1;
  for (var r = 13; r <= 80; r++) {
    var rowNama = String(sheet.getRange(r, COL_NAMA).getValue() || '').trim().toUpperCase();
    var cellTgl = sheet.getRange(r, COL_TGL).getValue();
    var rowTgl = cellTgl instanceof Date 
      ? (cellTgl.getDate() + "/" + (cellTgl.getMonth() + 1) + "/" + cellTgl.getFullYear())
      : String(cellTgl || '').trim();

    if (rowNama === targetNama && (rowTgl.indexOf(searchTgl) !== -1 || (searchItem.tanggal_tampil && rowTgl.indexOf(searchItem.tanggal_tampil) !== -1))) {
      targetRow = r;
      break;
    }
  }

  if (targetRow !== -1) {
    if (newItem.nama) sheet.getRange(targetRow, COL_NAMA).setValue(newItem.nama);
    if (newItem.tanggal_iso) sheet.getRange(targetRow, COL_TGL).setValue(formatTanggal(newItem.tanggal_iso, newItem.tanggal_tampil));
    if (newItem.mulai) sheet.getRange(targetRow, COL_MULAI).setValue(newItem.mulai);
    if (newItem.selesai) sheet.getRange(targetRow, COL_SELESAI).setValue(newItem.selesai);
    if (newItem.ovt) sheet.getRange(targetRow, COL_JAM).setValue(newItem.ovt + " jam");
    if (newItem.keterangan) sheet.getRange(targetRow, COL_KET).setValue(newItem.keterangan);
    return { rowUpdated: targetRow };
  } else {
    return insertOvertimeRow(sheet, newItem);
  }
}

// 3. HAPUS BARIS (DELETE)
function deleteOvertimeRow(sheet, item) {
  var targetNama = String(item.nama || '').trim().toUpperCase();
  var searchTgl = formatTanggal(item.tanggal_iso, item.tanggal_tampil);

  var targetRow = -1;
  for (var r = 13; r <= 80; r++) {
    var rowNama = String(sheet.getRange(r, COL_NAMA).getValue() || '').trim().toUpperCase();
    var cellTgl = sheet.getRange(r, COL_TGL).getValue();
    var rowTgl = cellTgl instanceof Date 
      ? (cellTgl.getDate() + "/" + (cellTgl.getMonth() + 1) + "/" + cellTgl.getFullYear())
      : String(cellTgl || '').trim();

    if (rowNama === targetNama && (rowTgl.indexOf(searchTgl) !== -1 || (item.tanggal_tampil && rowTgl.indexOf(item.tanggal_tampil) !== -1))) {
      targetRow = r;
      break;
    }
  }

  if (targetRow !== -1) {
    sheet.deleteRow(targetRow);

    // Penomoran ulang Kolom C agar nomor urut 1, 2, 3... tetap rapi
    var noUrut = 1;
    for (var r = 13; r <= 80; r++) {
      var valNama = String(sheet.getRange(r, COL_NAMA).getValue() || '').trim();
      if (valNama === 'Pemberi Perintah' || String(sheet.getRange(r, COL_KET).getValue() || '').indexOf('Mengetahui') !== -1) {
        break;
      }
      if (valNama !== '' && valNama !== 'OT TS') {
        sheet.getRange(r, COL_NO).setValue(noUrut++);
      }
    }
    return { rowDeleted: targetRow };
  }

  return { message: "Baris tidak ditemukan di Google Sheets" };
}
