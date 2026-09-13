const menuRingkasan = document.getElementById('menuRingkasan');
const menuLembur = document.getElementById('menuLembur');
const menuBenchmark = document.getElementById('menuBenchmark');
const halRingkasan = document.getElementById('halamanRingkasan');
const halLembur = document.getElementById('halamanLembur');
const halBenchmark = document.getElementById('halamanBenchmark');
const btnRefreshBenchmark = document.getElementById('btnRefreshBenchmark');
const loginScreen = document.getElementById('loginScreen');
const companyProfileScreen = document.getElementById('companyProfileScreen');
const appDashboard = document.getElementById('appDashboard');
const loginForm = document.getElementById('loginForm');
const loginError = document.getElementById('loginError');
const btnLogout = document.getElementById('btnLogout');
const btnRefreshData = document.getElementById('btnRefreshData');
const btnViewProfile = document.getElementById('btnViewProfile');
const btnBackToLogin = document.getElementById('btnBackToLogin');

// Elemen Departemen & Modal
const selectDepartemen = document.getElementById('selectDepartemen');
const headerJudulTim = document.getElementById('headerJudulTim');
const badgeDepartemen = document.getElementById('badgeDepartemen');
const btnBukaModalDept = document.getElementById('btnBukaModalDept');
const modalKelolaDept = document.getElementById('modalKelolaDept');
const btnTutupModalDept = document.getElementById('btnTutupModalDept');
const daftarDeptContainer = document.getElementById('daftarDeptContainer');
const formTambahDept = document.getElementById('formTambahDept');
const inputDeptId = document.getElementById('inputDeptId');
const inputDeptNama = document.getElementById('inputDeptNama');
const inputDeptUrl = document.getElementById('inputDeptUrl');
const inputDeptWebhook = document.getElementById('inputDeptWebhook');
const formDeptTitle = document.getElementById('formDeptTitle');
const btnBatalEditDept = document.getElementById('btnBatalEditDept');
const btnSubmitDept = document.getElementById('btnSubmitDept');
const submitDeptSpinner = document.getElementById('submitDeptSpinner');
const submitDeptText = document.getElementById('submitDeptText');
const modalDeptAlert = document.getElementById('modalDeptAlert');

// Elemen Modal Input / Edit Lembur Cepat (Dua Arah)
const btnTambahLembur = document.getElementById('btnTambahLembur');
const modalFormLembur = document.getElementById('modalFormLembur');
const btnTutupModalLembur = document.getElementById('btnTutupModalLembur');
const btnBatalInputLembur = document.getElementById('btnBatalInputLembur');
const formInputLembur = document.getElementById('formInputLembur');
const inputLemburMode = document.getElementById('inputLemburMode');
const inputLemburOldItem = document.getElementById('inputLemburOldItem');
const modalLemburJudul = document.getElementById('modalLemburJudul');
const modalLemburSubjudul = document.getElementById('modalLemburSubjudul');
const modalLemburIcon = document.getElementById('modalLemburIcon');
const inputLemburTanggal = document.getElementById('inputLemburTanggal');
const inputLemburJenisHari = document.getElementById('inputLemburJenisHari');
const inputLemburNama = document.getElementById('inputLemburNama');
const listKaryawanDept = document.getElementById('listKaryawanDept');
const inputLemburMulai = document.getElementById('inputLemburMulai');
const inputLemburSelesai = document.getElementById('inputLemburSelesai');
const inputLemburJam = document.getElementById('inputLemburJam');
const inputLemburUang = document.getElementById('inputLemburUang');
const inputLemburSheet = document.getElementById('inputLemburSheet');
const inputLemburStatus = document.getElementById('inputLemburStatus');
const inputLemburKeterangan = document.getElementById('inputLemburKeterangan');
const boxWebhookStatus = document.getElementById('boxWebhookStatus');
const textWebhookTitle = document.getElementById('textWebhookTitle');
const textWebhookDesc = document.getElementById('textWebhookDesc');
const modalLemburAlert = document.getElementById('modalLemburAlert');
const btnSubmitLembur = document.getElementById('btnSubmitLembur');
const submitLemburSpinner = document.getElementById('submitLemburSpinner');
const submitLemburText = document.getElementById('submitLemburText');

// Elemen Modal Buka Periode Baru (Auto-Create Tab Google Sheets)
const btnBukaPeriodeBaru = document.getElementById('btnBukaPeriodeBaru');
const modalPeriodeBaru = document.getElementById('modalPeriodeBaru');
const btnTutupModalPeriode = document.getElementById('btnTutupModalPeriode');
const btnBatalPeriode = document.getElementById('btnBatalPeriode');
const formPeriodeBaru = document.getElementById('formPeriodeBaru');
const inputPeriodeMulai = document.getElementById('inputPeriodeMulai');
const inputPeriodeSelesai = document.getElementById('inputPeriodeSelesai');
const inputPeriodeNama = document.getElementById('inputPeriodeNama');
const inputPeriodeSpv = document.getElementById('inputPeriodeSpv');
const inputPeriodeDept = document.getElementById('inputPeriodeDept');
const modalPeriodeAlert = document.getElementById('modalPeriodeAlert');
const btnSubmitPeriode = document.getElementById('btnSubmitPeriode');
const submitPeriodeSpinner = document.getElementById('submitPeriodeSpinner');
const submitPeriodeText = document.getElementById('submitPeriodeText');

const LOGIN_KEY = 'ovtmanager_login';
const VALID_USER = { username: 'admin', password: 'admin123' };

function bukaHalaman(halamanAktif, menuAktif) {
    [halRingkasan, halLembur, halBenchmark].forEach(hal => {
        if (!hal) return;
        hal.classList.add('hidden');
        hal.classList.remove('block');
    });
    if (halamanAktif) {
        halamanAktif.classList.remove('hidden');
        halamanAktif.classList.add('block');
    }
    [menuRingkasan, menuLembur, menuBenchmark].forEach(menu => {
        if (!menu) return;
        menu.classList.remove('active');
    });
    if (menuAktif) {
        menuAktif.classList.add('active');
    }
}

function aturTampilanAuth() {
    const siapLogin = localStorage.getItem(LOGIN_KEY) === '1';
    if (siapLogin) {
        loginScreen.classList.add('hidden');
        companyProfileScreen.classList.add('hidden');
        appDashboard.classList.remove('hidden');
    } else {
        loginScreen.classList.remove('hidden');
        companyProfileScreen.classList.add('hidden');
        appDashboard.classList.add('hidden');
    }
}

loginForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const username = document.getElementById('loginUsername').value.trim();
    const password = document.getElementById('loginPassword').value.trim();

    if (username.toLowerCase() === VALID_USER.username.toLowerCase() && password === VALID_USER.password) {
        localStorage.setItem(LOGIN_KEY, '1');
        loginError.classList.add('hidden');
        loginError.textContent = '';
        aturTampilanAuth();
        return;
    }

    loginError.textContent = 'Username atau password salah.';
    loginError.classList.remove('hidden');
});

btnLogout.addEventListener('click', () => {
    localStorage.removeItem(LOGIN_KEY);
    document.getElementById('loginUsername').value = '';
    document.getElementById('loginPassword').value = '';
    loginError.classList.add('hidden');
    aturTampilanAuth();
});

btnViewProfile.addEventListener('click', () => {
    loginScreen.classList.add('hidden');
    companyProfileScreen.classList.remove('hidden');
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

btnBackToLogin.addEventListener('click', () => {
    companyProfileScreen.classList.add('hidden');
    loginScreen.classList.remove('hidden');
});

// Interactive Company Profile Elements
const btnFooterBackLogin = document.getElementById('btnFooterBackLogin');
if (btnFooterBackLogin) {
    btnFooterBackLogin.addEventListener('click', () => {
        companyProfileScreen.classList.add('hidden');
        loginScreen.classList.remove('hidden');
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
}

// Logo Click to Scroll to Top
const brandLogoHome = document.getElementById('brandLogoHome');
if (brandLogoHome) {
    brandLogoHome.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
}

// Nav Showroom Anchor Links (Toyota Showroom Menu)
document.querySelectorAll('.navShowroomLink').forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('data-target');
        const targetEl = document.getElementById(targetId);
        if (targetEl) {
            // Update active link appearance
            document.querySelectorAll('.navShowroomLink').forEach(l => {
                l.classList.remove('text-blue-700', 'font-bold');
                l.classList.add('text-slate-600');
            });
            link.classList.remove('text-slate-600');
            link.classList.add('text-blue-700', 'font-bold');

            // Scroll cleanly using both scrollIntoView and window offset
            targetEl.scrollIntoView({ behavior: 'smooth', block: 'start' });

            const headerOffset = 90;
            const elementPosition = targetEl.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });

            const cpScreen = document.getElementById('companyProfileScreen');
            if (cpScreen && cpScreen.scrollHeight > cpScreen.clientHeight) {
                const cpOffset = elementPosition + cpScreen.scrollTop - headerOffset;
                cpScreen.scrollTo({
                    top: cpOffset,
                    behavior: 'smooth'
                });
            }
        }
    });
});

// Category Filter Tabs (Toyota Style: All | Gasoline | Diesel)
const filterTabs = document.querySelectorAll('.cp-filter-tab');
const showroomCards = document.querySelectorAll('.showroomCard');

filterTabs.forEach(tab => {
    tab.addEventListener('click', () => {
        // Toggle active tab appearance
        filterTabs.forEach(t => t.classList.remove('active'));
        tab.classList.add('active');

        const filterVal = tab.getAttribute('data-filter');

        showroomCards.forEach(card => {
            const cardCat = card.getAttribute('data-category');
            if (filterVal === 'all' || cardCat === filterVal) {
                card.style.display = 'flex';
                card.classList.remove('opacity-0', 'scale-95');
                card.classList.add('opacity-100', 'scale-100');
            } else {
                card.style.display = 'none';
            }
        });
    });
});

// Carousel Arrows Scroll (Slider Kiri & Kanan)
const showroomCardGrid = document.getElementById('showroomCardGrid');
const sliderPrevBtn = document.getElementById('sliderPrevBtn');
const sliderNextBtn = document.getElementById('sliderNextBtn');

if (sliderPrevBtn && showroomCardGrid) {
    sliderPrevBtn.addEventListener('click', () => {
        const card = showroomCardGrid.querySelector('.showroomCard');
        const scrollAmount = card ? (card.offsetWidth + 32) * 2 : 450;
        showroomCardGrid.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
    });
}

if (sliderNextBtn && showroomCardGrid) {
    sliderNextBtn.addEventListener('click', () => {
        const card = showroomCardGrid.querySelector('.showroomCard');
        const scrollAmount = card ? (card.offsetWidth + 32) * 2 : 450;
        showroomCardGrid.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    });
}

// Company Profile Interactive Cards Modal
const modalProfileDetail = document.getElementById('modalProfileDetail');
const modalProfileImg = document.getElementById('modalProfileImg');
const modalProfileCategory = document.getElementById('modalProfileCategory');
const modalProfileTitle = document.getElementById('modalProfileTitle');
const modalProfileDesc = document.getElementById('modalProfileDesc');
const btnProfileModalClose = document.getElementById('btnProfileModalClose');
const btnProfileModalCloseBottom = document.getElementById('btnProfileModalCloseBottom');

function openProfileModal(title, category, image, desc) {
    if (!modalProfileDetail) return;
    if (modalProfileTitle) modalProfileTitle.textContent = title || 'Informasi Fasilitas';
    if (modalProfileCategory) modalProfileCategory.textContent = category || 'Charoen Pokphand';
    if (modalProfileImg) modalProfileImg.src = image || 'logo_pokphand.png';
    if (modalProfileDesc) modalProfileDesc.textContent = desc || '';
    modalProfileDetail.classList.remove('hidden');
}

function closeProfileModal() {
    if (modalProfileDetail) {
        modalProfileDetail.classList.add('hidden');
    }
}

document.querySelectorAll('.profileInteractiveCard').forEach(card => {
    card.addEventListener('click', (e) => {
        e.stopPropagation();
        const title = card.getAttribute('data-title');
        const category = card.getAttribute('data-category');
        const image = card.getAttribute('data-image');
        const desc = card.getAttribute('data-desc');
        openProfileModal(title, category, image, desc);
    });
});

if (btnProfileModalClose) btnProfileModalClose.addEventListener('click', closeProfileModal);
if (btnProfileModalCloseBottom) btnProfileModalCloseBottom.addEventListener('click', closeProfileModal);
if (modalProfileDetail) {
    modalProfileDetail.addEventListener('click', (e) => {
        if (e.target === modalProfileDetail) {
            closeProfileModal();
        }
    });
}

document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modalProfileDetail && !modalProfileDetail.classList.contains('hidden')) {
        closeProfileModal();
    }
});



// Helper Backend URL
const getBackendUrl = (path) => {
    const isDirectBackend = window.location.port === '8000';
    return isDirectBackend ? path : `http://127.0.0.1:8000${path}`;
};

// State Multi-Departemen
let daftarDepartemen = [];
let allDeptData = {};
let activeDeptId = 'ppic';

function getActiveDepartment() {
    return daftarDepartemen.find(d => d.id === activeDeptId) || { id: activeDeptId, name: activeDeptId.toUpperCase() };
}

async function refreshDataFromPython(specificDeptId = null) {
    if (!btnRefreshData) return;

    const targetDeptId = specificDeptId || activeDeptId;
    const targetDeptObj = daftarDepartemen.find(d => d.id === targetDeptId) || { name: targetDeptId };

    const originalText = btnRefreshData.innerHTML;
    btnRefreshData.disabled = true;
    btnRefreshData.innerHTML = `<span class="animate-spin">⌛</span><span>Refreshing ${targetDeptObj.name}...</span>`;
    btnRefreshData.classList.add('opacity-75', 'cursor-wait');

    const refreshUrl = getBackendUrl('/api/refresh');

    try {
        const response = await fetch(refreshUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ dept_id: targetDeptId })
        });

        const text = await response.text();
        let result = {};
        try {
            result = text ? JSON.parse(text) : {};
        } catch (parseErr) {
            throw new Error(`Server tidak mengembalikan JSON yang valid (HTTP ${response.status}). Pastikan server backend berjalan via: python server.py`);
        }

        if (!response.ok || !result.ok) {
            throw new Error(result.error || result.stderr || `Refresh data gagal (Status: ${response.status}).`);
        }

        const payload = result.stdout || `Data lembur departemen ${targetDeptObj.name} berhasil diperbarui.`;
        alert(payload);

        // Muat ulang data terbaru dengan anti-cache URL
        window.location.href = window.location.origin + window.location.pathname + '?_ts=' + Date.now();
    } catch (error) {
        console.error('Refresh data error:', error);
        let message = error && error.message ? error.message : String(error);
        if (message.includes('Failed to fetch') || message.includes('NetworkError') || message.includes('fetch failed')) {
            message = 'Tidak dapat terhubung ke server backend di port 8000. Pastikan server sudah dijalankan dengan perintah: python server.py (atau buka file jalankan_server.bat).';
        }
        alert(`Gagal refresh data: ${message}`);
    } finally {
        btnRefreshData.disabled = false;
        btnRefreshData.innerHTML = originalText;
        btnRefreshData.classList.remove('opacity-75', 'cursor-wait');
    }
}

if (btnRefreshData) {
    btnRefreshData.addEventListener('click', () => refreshDataFromPython());
}

if (menuRingkasan) menuRingkasan.addEventListener('click', () => bukaHalaman(halRingkasan, menuRingkasan));
if (menuLembur) menuLembur.addEventListener('click', () => bukaHalaman(halLembur, menuLembur));
if (menuBenchmark) {
    menuBenchmark.addEventListener('click', () => {
        bukaHalaman(halBenchmark, menuBenchmark);
        renderBenchmarkAntarDivisi();
    });
}
if (btnRefreshBenchmark) {
    btnRefreshBenchmark.addEventListener('click', refreshAllDepartmentsBenchmark);
}

aturTampilanAuth();

const formatRupiah = (angka) => new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(angka);
const toIsoDate = (dateObj) => dateObj.toISOString().slice(0, 10);

var optTren = { series: [{ name: 'OVT (Jam)', data: [] }], chart: { type: 'area', height: 320, toolbar: { show: false }, foreColor: '#94a3b8' }, colors: ['#3b82f6'], fill: { type: 'gradient', gradient: { shadeIntensity: 1, opacityFrom: 0.4, opacityTo: 0.05, stops: [0, 90, 100] } }, dataLabels: { enabled: false }, stroke: { curve: 'smooth', width: 3 }, xaxis: { categories: [] }, tooltip: { theme: 'dark' } };
var chartTren = new ApexCharts(document.querySelector("#chartTren"), optTren); chartTren.render();

var optChartKaryawan = { series: [{ name: 'Total Jam', data: [] }], chart: { type: 'bar', height: 320, toolbar: { show: false }, foreColor: '#94a3b8' }, colors: ['#f59e0b', '#3b82f6', '#10b981', '#8b5cf6'], plotOptions: { bar: { horizontal: true, borderRadius: 4, distributed: true } }, dataLabels: { enabled: true, style: { colors: ['#fff'] } }, xaxis: { categories: [] }, legend: { show: false }, tooltip: { theme: 'dark' } };
var chartKaryawan = new ApexCharts(document.querySelector("#chartKaryawan"), optChartKaryawan); chartKaryawan.render();

// Setup Weekly Heatmap Matrix
const timeSlotLabels = ['Siang (< 16:00)', 'Sore (16:00 - 18:00)', 'Malam (18:00 - 21:00)', 'Larut Malam (> 21:00)'];
const daysOfWeek = ['Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu', 'Minggu'];

var optWeeklyHeatmap = {
    series: timeSlotLabels.map(slot => ({
        name: slot,
        data: daysOfWeek.map(day => ({ x: day, y: 0 }))
    })),
    chart: {
        type: 'heatmap',
        height: 270,
        toolbar: { show: false },
        foreColor: '#94a3b8',
        fontFamily: 'inherit'
    },
    dataLabels: {
        enabled: true,
        style: {
            colors: ['#ffffff'],
            fontSize: '11px',
            fontWeight: '600'
        },
        formatter: function(val) {
            return val > 0 ? val + 'j' : '0';
        }
    },
    plotOptions: {
        heatmap: {
            radius: 8,
            enableShades: true,
            shadeIntensity: 0.6,
            colorScale: {
                ranges: [
                    { from: 0, to: 0, color: '#1e293b', name: '0j' },
                    { from: 0.1, to: 4, color: '#1e3a8a', name: '1-4j' },
                    { from: 4.1, to: 10, color: '#2563eb', name: '4-10j' },
                    { from: 10.1, to: 200, color: '#f59e0b', name: '>10j' }
                ]
            }
        }
    },
    stroke: {
        width: 2,
        colors: ['#0f172a']
    },
    xaxis: {
        type: 'category',
        categories: daysOfWeek,
        labels: {
            style: { colors: '#94a3b8', fontWeight: 600 }
        }
    },
    yaxis: {
        labels: {
            style: { colors: '#94a3b8', fontWeight: 600 }
        }
    },
    tooltip: {
        theme: 'dark',
        y: {
            formatter: function(val) {
                return (val || 0).toFixed(1) + ' Jam Lembur';
            }
        }
    }
};
var chartWeeklyHeatmap = new ApexCharts(document.querySelector("#chartWeeklyHeatmap"), optWeeklyHeatmap);
chartWeeklyHeatmap.render();

// Setup Benchmark Charts
var optBenchmarkBar = {
    series: [
        { name: 'Total Lembur (Jam)', data: [] },
        { name: 'Total Biaya (x100rb Rp)', data: [] }
    ],
    chart: {
        type: 'bar',
        height: 320,
        toolbar: { show: false },
        foreColor: '#94a3b8',
        fontFamily: 'inherit'
    },
    colors: ['#6366f1', '#10b981'],
    plotOptions: {
        bar: {
            horizontal: false,
            columnWidth: '45%',
            borderRadius: 6,
            dataLabels: { position: 'top' }
        }
    },
    dataLabels: {
        enabled: true,
        formatter: function(val, opts) {
            return opts.seriesIndex === 0 ? val + 'j' : 'Rp' + (val * 100).toLocaleString('id-ID') + 'rb';
        },
        offsetY: -20,
        style: { fontSize: '10px', colors: ['#e2e8f0'] }
    },
    xaxis: { categories: [] },
    yaxis: [
        { title: { text: 'Jam Lembur', style: { color: '#6366f1' } } },
        { opposite: true, title: { text: 'Biaya Lembur', style: { color: '#10b981' } } }
    ],
    legend: { position: 'top', labels: { colors: '#cbd5e1' } },
    tooltip: { theme: 'dark' }
};
var chartBenchmarkBar = new ApexCharts(document.querySelector("#chartBenchmarkBar"), optBenchmarkBar);
chartBenchmarkBar.render();

var optBenchmarkRatio = {
    series: [
        { name: 'Hari Biasa (B)', data: [] },
        { name: 'Hari Libur (L)', data: [] }
    ],
    chart: {
        type: 'bar',
        height: 320,
        stacked: true,
        stackType: '100%',
        toolbar: { show: false },
        foreColor: '#94a3b8',
        fontFamily: 'inherit'
    },
    colors: ['#3b82f6', '#f43f5e'],
    plotOptions: {
        bar: {
            horizontal: true,
            borderRadius: 4
        }
    },
    dataLabels: {
        enabled: true,
        formatter: function(val) {
            return Math.round(val) + '%';
        },
        style: { fontSize: '11px', colors: ['#ffffff'] }
    },
    xaxis: { categories: [] },
    yaxis: { categories: [] },
    legend: { position: 'top', labels: { colors: '#cbd5e1' } },
    tooltip: { theme: 'dark' }
};
var chartBenchmarkRatio = new ApexCharts(document.querySelector("#chartBenchmarkRatio"), optBenchmarkRatio);
chartBenchmarkRatio.render();

let dataMentah = [];
let approvalStatus = {};

// Inisialisasi approval status dari localStorage
const loadApprovalStatus = () => {
    const stored = localStorage.getItem('approvalStatus_overtimeManager');
    if (stored) {
        try {
            approvalStatus = JSON.parse(stored);
        } catch (e) {
            approvalStatus = {};
        }
    }
};

const saveApprovalStatus = () => {
    localStorage.setItem('approvalStatus_overtimeManager', JSON.stringify(approvalStatus));
};

const getApprovalKey = (item) => `${item.tanggal_iso}-${item.nama}-${item.mulai}-${item.selesai}`;
const getApprovalStatus = (item) => approvalStatus[getApprovalKey(item)] || 'Pending';
const setApprovalStatus = (item, status) => {
    approvalStatus[getApprovalKey(item)] = status;
    saveApprovalStatus();
};

loadApprovalStatus();

// Filter Elements
const optKaryawan = document.getElementById('filterKaryawan');
const optApprovalStatus = document.getElementById('filterApprovalStatus');
const elTglMulai = document.getElementById('filterTglMulai');
const elTglAkhir = document.getElementById('filterTglAkhir');
const elTarget = document.getElementById('filterTarget');

// Fungsi Utama Perhitungan & Render Filter
function fungsiFilterSuper() {
    const valKaryawan = optKaryawan.value;
    const valMulai = elTglMulai.value;
    const valAkhir = elTglAkhir.value;
    const targetJam = Number(elTarget.value) || 0;
    const valApprovalStatus = optApprovalStatus.value;

    // Menyaring data berdasarkan Nama, Rentang Tanggal, dan Status Approval
    const dataTersaring = dataMentah.filter(item => {
        let cocokKaryawan = (valKaryawan === 'Semua') || (item.nama === valKaryawan);
        
        let cocokTgl = true;
        if (valMulai && item.tanggal_iso < valMulai) cocokTgl = false;
        if (valAkhir && item.tanggal_iso > valAkhir) cocokTgl = false;
        
        let cocokApproval = (valApprovalStatus === 'Semua') || (getApprovalStatus(item) === valApprovalStatus);
        
        return cocokKaryawan && cocokTgl && cocokApproval;
    });

    let jamB = 0, jamL = 0, uang = 0;
    let rankNama = {}, rankTren = {};

    dataTersaring.forEach(d => {
        if(d.jenis_hari === 'B') jamB += d.ovt;
        if(d.jenis_hari === 'L') jamL += d.ovt;
        uang += d.uang;
        rankNama[d.nama] = (rankNama[d.nama] || 0) + d.ovt;
        rankTren[d.tanggal_tampil] = (rankTren[d.tanggal_tampil] || 0) + d.ovt;
    });

    const totalJam = jamB + jamL;
    const jumlahKaryawan = new Set(dataTersaring.map(d => d.nama)).size;
    const rataKaryawan = jumlahKaryawan > 0 ? totalJam / jumlahKaryawan : 0;
    const targetStatus = totalJam > targetJam ? '⚠️ Melebihi target' : '✅ Dalam target';
    const namaPalingTinggi = Object.entries(rankNama).sort((a, b) => b[1] - a[1])[0];

    document.getElementById('kpiTotalJam').innerText = totalJam + " Jam";
    document.getElementById('kpiJamB').innerText = jamB + " Jam";
    document.getElementById('kpiJamL').innerText = jamL + " Jam";
    document.getElementById('kpiTotalUang').innerText = formatRupiah(uang);
    document.getElementById('kpiRataKaryawan').innerText = rataKaryawan.toFixed(1) + " Jam";
    document.getElementById('kpiTargetStatus').innerText = targetStatus;
    document.getElementById('kpiTargetStatus').className = totalJam > targetJam
        ? 'text-2xl font-bold mt-2 text-amber-300'
        : 'text-2xl font-bold mt-2 text-emerald-300';
    document.getElementById('kpiKaryawanTinggi').innerText = namaPalingTinggi ? `${namaPalingTinggi[0]} (${namaPalingTinggi[1].toFixed(1)} jam)` : '-';

    const warningPanel = document.getElementById('warningPanel');
    const warningMessages = [];

    let previousTotal = 0;
    if (valMulai && valAkhir) {
        const startDate = new Date(valMulai + 'T00:00:00');
        const endDate = new Date(valAkhir + 'T00:00:00');
        const diffDays = Math.max(0, Math.round((endDate - startDate) / 86400000));
        const prevEnd = new Date(startDate);
        prevEnd.setDate(prevEnd.getDate() - 1);
        const prevStart = new Date(prevEnd);
        prevStart.setDate(prevStart.getDate() - diffDays);

        const prevRange = dataMentah.filter(item => {
            const itemDate = new Date(item.tanggal_iso + 'T00:00:00');
            return itemDate >= prevStart && itemDate <= prevEnd;
        });

        previousTotal = prevRange.reduce((sum, item) => sum + item.ovt, 0);
        const delta = totalJam - previousTotal;
        const deltaText = delta >= 0 ? `+${delta.toFixed(1)}` : delta.toFixed(1);
        warningMessages.push(`<div class="rounded-lg border border-violet-500/50 bg-violet-500/10 text-violet-200 px-3 py-2 mb-2">🔄 Periode sebelumnya: ${previousTotal.toFixed(1)} jam. Selisih dengan periode ini: ${deltaText} jam.</div>`);
    }

    if (targetJam > 0) {
        if (totalJam > targetJam) {
            warningMessages.push(`<div class="rounded-lg border border-amber-500/50 bg-amber-500/10 text-amber-200 px-3 py-2 mb-2">⚠️ Total lembur ${totalJam.toFixed(1)} jam melebihi target ${targetJam} jam.</div>`);
        } else {
            warningMessages.push(`<div class="rounded-lg border border-emerald-500/50 bg-emerald-500/10 text-emerald-200 px-3 py-2 mb-2">✅ Total lembur ${totalJam.toFixed(1)} jam masih dalam target ${targetJam} jam.</div>`);
        }
    }

    if (jamL > jamB) {
        warningMessages.push(`<div class="rounded-lg border border-rose-500/50 bg-rose-500/10 text-rose-200 px-3 py-2 mb-2">📌 Hari libur mendominasi lembur pada periode ini (${jamL.toFixed(1)} jam vs ${jamB.toFixed(1)} jam biasa).</div>`);
    } else {
        warningMessages.push(`<div class="rounded-lg border border-sky-500/50 bg-sky-500/10 text-sky-200 px-3 py-2 mb-2">📊 Lembur lebih dominan pada hari biasa (${jamB.toFixed(1)} jam vs ${jamL.toFixed(1)} jam hari libur).</div>`);
    }

    if (jumlahKaryawan > 0) {
        warningMessages.push(`<div class="rounded-lg border border-slate-600 bg-slate-800/50 text-slate-200 px-3 py-2">👥 Rata-rata lembur per karyawan: ${rataKaryawan.toFixed(1)} jam.</div>`);
    }

    warningPanel.innerHTML = warningMessages.join('');

    // Pending Approval Summary
    const pendingContainer = document.getElementById('pendingApprovalContainer');
    const allPendingItems = dataTersaring.filter(item => getApprovalStatus(item) === 'Pending');
    const approvedItems = dataTersaring.filter(item => getApprovalStatus(item) === 'Approved');
    const rejectedItems = dataTersaring.filter(item => getApprovalStatus(item) === 'Rejected');
    
    const totalItems = dataTersaring.length;
    const completionRate = totalItems > 0 ? ((approvedItems.length + rejectedItems.length) / totalItems * 100).toFixed(1) : 0;
    
    const pendingByEmployee = {};
    allPendingItems.forEach(item => {
        if (!pendingByEmployee[item.nama]) {
            pendingByEmployee[item.nama] = [];
        }
        pendingByEmployee[item.nama].push(item);
    });
    
    const pendingRows = Object.entries(pendingByEmployee)
        .map(([nama, items]) => ({
            nama,
            count: items.length,
            totalJam: items.reduce((sum, i) => sum + i.ovt, 0),
            oldestDate: items.length > 0 ? Math.min(...items.map(i => new Date(i.tanggal_iso).getTime())) : 0
        }))
        .sort((a, b) => b.count - a.count);
    
    const pendingHTML = `
        <div class="grid grid-cols-1 md:grid-cols-3 gap-3 mb-4">
            <div class="rounded-lg bg-blue-500/20 border border-blue-500/50 px-4 py-3">
                <p class="text-xs text-blue-300 font-bold uppercase">Completion Rate</p>
                <p class="text-2xl font-bold text-blue-300 mt-1">${completionRate}%</p>
                <p class="text-xs text-blue-200 mt-1">${approvedItems.length + rejectedItems.length} dari ${totalItems} ditinjau</p>
            </div>
            <div class="rounded-lg ${allPendingItems.length > 0 ? 'bg-amber-500/20 border border-amber-500/50' : 'bg-emerald-500/20 border border-emerald-500/50'} px-4 py-3">
                <p class="text-xs ${allPendingItems.length > 0 ? 'text-amber-300' : 'text-emerald-300'} font-bold uppercase">Pending Review</p>
                <p class="text-2xl font-bold ${allPendingItems.length > 0 ? 'text-amber-300' : 'text-emerald-300'} mt-1">${allPendingItems.length}</p>
                <p class="text-xs ${allPendingItems.length > 0 ? 'text-amber-200' : 'text-emerald-200'} mt-1">masih menunggu tindakan</p>
            </div>
            <div class="rounded-lg bg-violet-500/20 border border-violet-500/50 px-4 py-3">
                <p class="text-xs text-violet-300 font-bold uppercase">Approved</p>
                <p class="text-2xl font-bold text-violet-300 mt-1">${approvedItems.length}</p>
                <p class="text-xs text-violet-200 mt-1">sudah disetujui</p>
            </div>
        </div>
        ${allPendingItems.length > 0 ? `
        <div class="border-t border-slate-600 pt-4 mt-4">
            <p class="text-xs font-bold text-slate-400 mb-3 uppercase">Pending per Karyawan</p>
            <div class="space-y-2">
                ${pendingRows.map(row => `
                    <div class="rounded-lg bg-slate-800/60 border border-slate-700 px-3 py-2 flex justify-between items-center">
                        <div>
                            <span class="text-sm font-semibold text-slate-200">${row.nama}</span>
                            <span class="text-xs text-amber-400 ml-2">⏳ ${row.count} entry</span>
                        </div>
                        <span class="text-sm font-bold text-amber-300">${row.totalJam.toFixed(1)}j</span>
                    </div>
                `).join('')}
            </div>
        </div>
        ` : `
        <div class="border-t border-slate-600 pt-4 mt-4">
            <p class="text-sm text-emerald-300 font-semibold">🎉 Semua entry sudah ditinjau!</p>
        </div>
        `}
    `;
    
    pendingContainer.innerHTML = pendingHTML;

    let arrNama = Object.entries(rankNama).sort((a,b) => b[1] - a[1]); 
    chartKaryawan.updateSeries([{ name: 'Total Jam', data: arrNama.map(x => x[1]) }]);
    chartKaryawan.updateOptions({ xaxis: { categories: arrNama.map(x => x[0]) } });

    const detailContainer = document.getElementById('detailKaryawanContainer');
    const detailMap = {};
    dataTersaring.forEach(item => {
        if (!detailMap[item.nama]) {
            detailMap[item.nama] = { nama: item.nama, jamB: 0, jamL: 0, uang: 0, jumlahRecord: 0 };
        }
        detailMap[item.nama].jamB += item.jenis_hari === 'B' ? item.ovt : 0;
        detailMap[item.nama].jamL += item.jenis_hari === 'L' ? item.ovt : 0;
        detailMap[item.nama].uang += item.uang;
        detailMap[item.nama].jumlahRecord += 1;
    });

    const detailRows = Object.values(detailMap)
        .map(item => ({
            ...item,
            totalJam: item.jamB + item.jamL,
            share: totalJam > 0 ? ((item.jamB + item.jamL) / totalJam) * 100 : 0
        }))
        .sort((a, b) => b.totalJam - a.totalJam);

    detailContainer.innerHTML = detailRows.map((item, index) => {
        const shareLabel = totalJam > 0 ? `${((item.totalJam / totalJam) * 100).toFixed(1)}%` : '0%';
        const rankStyle = index === 0 ? 'border-amber-400/40 bg-amber-500/10' : 'border-slate-700 bg-slate-800/40';
        return `
            <div class="rounded-xl border ${rankStyle} p-4">
                <div class="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
                    <div>
                        <div class="flex items-center gap-2">
                            <span class="text-xs font-bold uppercase tracking-wider text-slate-400">#${index + 1}</span>
                            <h4 class="text-lg font-semibold text-white">${item.nama}</h4>
                        </div>
                        <p class="text-xs text-slate-400 mt-1">${item.jumlahRecord} transaksi • share ${shareLabel} dari total periode</p>
                    </div>
                    <div class="text-right">
                        <p class="text-2xl font-bold text-blue-300">${item.totalJam.toFixed(1)} jam</p>
                        <p class="text-sm text-emerald-300">${formatRupiah(item.uang)}</p>
                    </div>
                </div>
                <div class="mt-3 grid grid-cols-1 sm:grid-cols-3 gap-3 text-sm">
                    <div class="rounded-lg bg-slate-900/60 border border-slate-700 px-3 py-2">
                        <span class="text-slate-400 block">Hari Biasa</span>
                        <span class="font-bold text-slate-200">${item.jamB.toFixed(1)} jam</span>
                    </div>
                    <div class="rounded-lg bg-slate-900/60 border border-slate-700 px-3 py-2">
                        <span class="text-slate-400 block">Hari Libur</span>
                        <span class="font-bold text-rose-300">${item.jamL.toFixed(1)} jam</span>
                    </div>
                    <div class="rounded-lg bg-slate-900/60 border border-slate-700 px-3 py-2">
                        <span class="text-slate-400 block">Total Share</span>
                        <span class="font-bold text-amber-300">${shareLabel}</span>
                    </div>
                </div>
            </div>
        `;
    }).join('');

    let arrTren = Object.keys(rankTren).reverse(); 
    if (arrTren.length > 14) arrTren = arrTren.slice(-14);
    chartTren.updateSeries([{ name: 'OVT (Jam)', data: arrTren.map(k => rankTren[k]) }]);
    chartTren.updateOptions({ xaxis: { categories: arrTren } });

    // Update Weekly Heatmap Matrix
    const heatmapMatrix = [
        [0, 0, 0, 0, 0, 0, 0], // Slot 0: Siang (< 16:00)
        [0, 0, 0, 0, 0, 0, 0], // Slot 1: Sore (16:00 - 18:00)
        [0, 0, 0, 0, 0, 0, 0], // Slot 2: Malam (18:00 - 21:00)
        [0, 0, 0, 0, 0, 0, 0]  // Slot 3: Larut Malam (> 21:00)
    ];
    const dayTotals = [0, 0, 0, 0, 0, 0, 0];
    const slotTotals = [0, 0, 0, 0];

    dataTersaring.forEach(item => {
        if (!item.tanggal_iso) return;
        const dObj = new Date(item.tanggal_iso + 'T00:00:00');
        if (isNaN(dObj.getTime())) return;
        const rawDay = dObj.getDay(); // 0 = Minggu, 1 = Senin, ... 6 = Sabtu
        const dayIdx = rawDay === 0 ? 6 : rawDay - 1; // 0 = Senin, ... 6 = Minggu

        let startHour = 16;
        if (item.mulai && typeof item.mulai === 'string' && item.mulai.includes(':')) {
            const parsed = parseInt(item.mulai.split(':')[0], 10);
            if (!isNaN(parsed)) startHour = parsed;
        }

        let slotIdx = 1;
        if (startHour < 16) slotIdx = 0;
        else if (startHour < 18) slotIdx = 1;
        else if (startHour < 21) slotIdx = 2;
        else slotIdx = 3;

        const ovtVal = Number(item.ovt) || 0;
        heatmapMatrix[slotIdx][dayIdx] += ovtVal;
        dayTotals[dayIdx] += ovtVal;
        slotTotals[slotIdx] += ovtVal;
    });

    const updatedHeatmapSeries = timeSlotLabels.map((slot, sIdx) => ({
        name: slot,
        data: daysOfWeek.map((day, dIdx) => ({
            x: day,
            y: Number(heatmapMatrix[sIdx][dIdx].toFixed(1))
        }))
    }));

    if (chartWeeklyHeatmap) {
        chartWeeklyHeatmap.updateSeries(updatedHeatmapSeries);
    }

    const textPeakDay = document.getElementById('textPeakDay');
    const textPeakSlot = document.getElementById('textPeakSlot');
    
    let maxDayVal = -1, maxDayIdx = -1;
    dayTotals.forEach((val, idx) => {
        if (val > maxDayVal) {
            maxDayVal = val;
            maxDayIdx = idx;
        }
    });

    let maxSlotVal = -1, maxSlotIdx = -1;
    slotTotals.forEach((val, idx) => {
        if (val > maxSlotVal) {
            maxSlotVal = val;
            maxSlotIdx = idx;
        }
    });

    if (textPeakDay) {
        textPeakDay.textContent = (maxDayVal > 0 && maxDayIdx >= 0)
            ? `Hari Tersibuk: ${daysOfWeek[maxDayIdx]} (${maxDayVal.toFixed(1)}j)` 
            : 'Hari Tersibuk: Nihil';
    }
    if (textPeakSlot) {
        textPeakSlot.textContent = (maxSlotVal > 0 && maxSlotIdx >= 0)
            ? `Jam Puncak: ${timeSlotLabels[maxSlotIdx]} (${maxSlotVal.toFixed(1)}j)` 
            : 'Jam Puncak: Nihil';
    }

    // Simpan data tersaring saat ini & render tabel utama
    currentDataTersaringUtama = dataTersaring;
    renderTabelUtama();
}

let currentDataTersaringUtama = [];
let currentSortCol = 'tanggal';
let currentSortDir = 'asc';

// Deteksi Anomali Data Input Spreadsheet
function deteksiAnomaliData(dataset) {
    const anomaliMap = new Map();
    let countJamEkstrem = 0;
    let countDuplikasi = 0;
    let countUangNol = 0;
    let countJamNol = 0;
    let countTanpaTugas = 0;

    const seenMap = {};
    dataset.forEach((item, index) => {
        const key = `${item.tanggal_iso}__${item.nama}`;
        if (!seenMap[key]) seenMap[key] = [];
        seenMap[key].push(index);
    });

    dataset.forEach((item) => {
        const issues = [];
        const key = `${item.tanggal_iso}__${item.nama}`;

        if (seenMap[key] && seenMap[key].length > 1) {
            issues.push({ tipe: 'danger', label: 'Data Ganda / Duplikat Tanggal' });
            countDuplikasi++;
        }
        if (item.ovt > 8) {
            issues.push({ tipe: 'warning', label: `Jam Ekstrem (${item.ovt}j > 8j)` });
            countJamEkstrem++;
        }
        if (item.ovt <= 0) {
            issues.push({ tipe: 'danger', label: 'Durasi <= 0 Jam' });
            countJamNol++;
        }
        if (item.ovt > 0 && (!item.uang || item.uang === 0)) {
            issues.push({ tipe: 'danger', label: 'Tarif Rp 0 / Rumus Error' });
            countUangNol++;
        }
        if (!item.keterangan || item.keterangan.trim() === '' || item.keterangan.trim() === '-') {
            issues.push({ tipe: 'warning', label: 'Uraian Tugas Kosong' });
            countTanpaTugas++;
        }

        if (issues.length > 0) {
            anomaliMap.set(item, issues);
        }
    });

    return {
        anomaliMap,
        totalAnomali: anomaliMap.size,
        breakdown: {
            jamEkstrem: countJamEkstrem,
            duplikasi: countDuplikasi,
            uangNol: countUangNol,
            jamNol: countJamNol,
            tanpaTugas: countTanpaTugas
        }
    };
}

// Fungsi Render Tabel Riwayat dengan Multi-Filter & Anomali
function renderTabelUtama() {
    const tbody = document.getElementById('tabelLogContainer');
    if (!tbody) return;

    const inputSearch = document.getElementById('inputTableSearch');
    const filterJenis = document.getElementById('filterTableJenisHari');
    const filterApprv = document.getElementById('filterTableApproval');
    const filterAudit = document.getElementById('filterTableModeAudit');

    const querySearch = (inputSearch ? inputSearch.value : '').toLowerCase().trim();
    const valJenis = filterJenis ? filterJenis.value : 'Semua';
    const valApprv = filterApprv ? filterApprv.value : 'Semua';
    const valAudit = filterAudit ? filterAudit.value : 'Semua';

    // 1. Jalankan deteksi anomali pada seluruh dataset tersaring periode saat ini
    const hasilAudit = deteksiAnomaliData(currentDataTersaringUtama);

    // Update banner & badge anomali
    const badgeCountAnomali = document.getElementById('badgeCountAnomali');
    const bannerAudit = document.getElementById('bannerAuditAnomali');
    const textRingkasanAnomali = document.getElementById('textRingkasanAnomali');
    const containerBadges = document.getElementById('containerBadgesAnomali');
    const badgeTotalRecords = document.getElementById('badgeTotalRecords');

    if (badgeCountAnomali) badgeCountAnomali.textContent = hasilAudit.totalAnomali;
    if (badgeTotalRecords) badgeTotalRecords.textContent = `${currentDataTersaringUtama.length} Transaksi`;

    if (bannerAudit && textRingkasanAnomali && containerBadges) {
        if (hasilAudit.totalAnomali > 0) {
            textRingkasanAnomali.textContent = `Ditemukan ${hasilAudit.totalAnomali} baris berpotensi keliru / anomali.`;
            let badgesHtml = '';
            if (hasilAudit.breakdown.duplikasi > 0) {
                badgesHtml += `<span class="px-2 py-0.5 rounded text-[11px] font-bold bg-rose-500/20 text-rose-300 border border-rose-500/30">⚠️ Duplikasi Shift: ${hasilAudit.breakdown.duplikasi}</span>`;
            }
            if (hasilAudit.breakdown.jamEkstrem > 0) {
                badgesHtml += `<span class="px-2 py-0.5 rounded text-[11px] font-bold bg-amber-500/20 text-amber-300 border border-amber-500/30">⏱️ Jam Ekstrem (>8j): ${hasilAudit.breakdown.jamEkstrem}</span>`;
            }
            if (hasilAudit.breakdown.uangNol > 0) {
                badgesHtml += `<span class="px-2 py-0.5 rounded text-[11px] font-bold bg-rose-500/20 text-rose-300 border border-rose-500/30">💰 Tarif Rp 0: ${hasilAudit.breakdown.uangNol}</span>`;
            }
            if (hasilAudit.breakdown.tanpaTugas > 0) {
                badgesHtml += `<span class="px-2 py-0.5 rounded text-[11px] font-bold bg-slate-500/20 text-slate-300 border border-slate-500/30">📝 Tanpa Tugas: ${hasilAudit.breakdown.tanpaTugas}</span>`;
            }
            containerBadges.innerHTML = badgesHtml;
            if (valAudit === 'Anomali') {
                bannerAudit.classList.remove('hidden');
            }
        } else {
            textRingkasanAnomali.textContent = `Seluruh data valid dan bersih dari anomali.`;
            containerBadges.innerHTML = `<span class="px-2 py-0.5 rounded text-[11px] font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">✅ 100% Data Bersih</span>`;
            if (valAudit !== 'Anomali') {
                bannerAudit.classList.add('hidden');
            }
        }
    }

    // 2. Filter data tabel berdasarkan kontrol tabel lokal
    let barisTampil = currentDataTersaringUtama.filter(d => {
        if (querySearch) {
            const strTeks = `${d.nama} ${d.tanggal_tampil} ${d.tanggal_iso} ${d.keterangan || ''} ${d.sheet_name || ''}`.toLowerCase();
            if (!strTeks.includes(querySearch)) return false;
        }

        if (valJenis !== 'Semua' && d.jenis_hari !== valJenis) return false;
        if (valApprv !== 'Semua' && getApprovalStatus(d) !== valApprv) return false;

        const isAnomali = hasilAudit.anomaliMap.has(d);
        if (valAudit === 'Anomali' && !isAnomali) return false;
        if (valAudit === 'Normal' && isAnomali) return false;

        return true;
    });

    // 3. Sort Data Sesuai Kolom Aktif
    barisTampil.sort((a, b) => {
        let valA, valB;
        if (currentSortCol === 'tanggal') {
            valA = a.tanggal_iso || '';
            valB = b.tanggal_iso || '';
            return currentSortDir === 'asc' ? valA.localeCompare(valB) : valB.localeCompare(valA);
        } else if (currentSortCol === 'nama') {
            valA = a.nama || '';
            valB = b.nama || '';
            return currentSortDir === 'asc' ? valA.localeCompare(valB) : valB.localeCompare(valA);
        } else if (currentSortCol === 'jam') {
            valA = a.ovt || 0;
            valB = b.ovt || 0;
            return currentSortDir === 'asc' ? valA - valB : valB - valA;
        } else if (currentSortCol === 'uang') {
            valA = a.uang || 0;
            valB = b.uang || 0;
            return currentSortDir === 'asc' ? valA - valB : valB - valA;
        }
        return 0;
    });

    // Update counter
    const countTabelTampil = document.getElementById('countTabelTampil');
    const countTabelTotal = document.getElementById('countTabelTotal');
    if (countTabelTampil) countTabelTampil.textContent = barisTampil.length;
    if (countTabelTotal) countTabelTotal.textContent = currentDataTersaringUtama.length;

    // 4. Render Baris HTML
    tbody.innerHTML = '';
    if (barisTampil.length === 0) {
        tbody.innerHTML = `
            <tr>
                <td colspan="10" class="px-6 py-12 text-center text-slate-400">
                    <div class="flex flex-col items-center justify-center gap-2">
                        <span class="text-3xl">🔍</span>
                        <span class="font-semibold text-sm">Tidak ada transaksi yang cocok dengan filter tabel saat ini.</span>
                        <button id="btnResetInlineFilter" class="mt-2 px-3 py-1.5 rounded-lg text-xs font-bold bg-indigo-600 text-white hover:bg-indigo-500 transition cursor-pointer">Reset Filter Tabel</button>
                    </div>
                </td>
            </tr>
        `;
        const btnResetInline = document.getElementById('btnResetInlineFilter');
        if (btnResetInline) {
            btnResetInline.addEventListener('click', resetTableFilters);
        }
        return;
    }

    barisTampil.forEach((d, idx) => {
        const currentStatus = getApprovalStatus(d);
        const badgeHari = d.jenis_hari === 'L' 
            ? `<span class="bg-rose-500/20 text-rose-400 px-2 py-1 rounded text-xs font-bold border border-rose-500/30">Libur (L)</span>` 
            : `<span class="bg-blue-500/20 text-blue-400 px-2 py-1 rounded text-xs font-bold border border-blue-500/30">Biasa (B)</span>`;
        
        let badgeApproval = '';
        if (currentStatus === 'Approved') badgeApproval = `<span class="bg-emerald-500/20 text-emerald-400 px-2 py-1 rounded text-xs font-bold border border-emerald-500/30">✅ Approved</span>`;
        else if (currentStatus === 'Rejected') badgeApproval = `<span class="bg-rose-500/20 text-rose-400 px-2 py-1 rounded text-xs font-bold border border-rose-500/30">❌ Rejected</span>`;
        else badgeApproval = `<span class="bg-amber-500/20 text-amber-400 px-2 py-1 rounded text-xs font-bold border border-amber-500/30">⏳ Pending</span>`;
        
        const appKey = getApprovalKey(d);
        const actionColHtml = `
            <div class="flex items-center gap-1.5 flex-nowrap">
                <div class="flex gap-1 items-center bg-slate-800/80 p-0.5 rounded border border-slate-700">
                    <button class="approvalBtn" data-key="${appKey}" data-status="Approved" style="${currentStatus === 'Approved' ? 'opacity: 1; background: #10b981;' : 'opacity: 0.35; background: #475569;'} color: white; padding: 3px 5px; border-radius: 3px; font-size: 11px; border: none; cursor: pointer;" title="Setujui Lembur">✅</button>
                    <button class="approvalBtn" data-key="${appKey}" data-status="Pending" style="${currentStatus === 'Pending' ? 'opacity: 1; background: #f59e0b;' : 'opacity: 0.35; background: #475569;'} color: white; padding: 3px 5px; border-radius: 3px; font-size: 11px; border: none; cursor: pointer;" title="Tandai Pending">⏳</button>
                    <button class="approvalBtn" data-key="${appKey}" data-status="Rejected" style="${currentStatus === 'Rejected' ? 'opacity: 1; background: #ef4444;' : 'opacity: 0.35; background: #475569;'} color: white; padding: 3px 5px; border-radius: 3px; font-size: 11px; border: none; cursor: pointer;" title="Tolak Lembur">❌</button>
                </div>
                <div class="flex gap-1 items-center">
                    <button class="btnEditLembur" data-idx="${idx}" style="background: #3b82f6; color: white; padding: 3px 6px; border-radius: 4px; font-size: 11px; border: none; cursor: pointer;" title="Edit data lembur ini">✏️</button>
                    <button class="btnHapusLembur" data-idx="${idx}" style="background: #ef4444; color: white; padding: 3px 6px; border-radius: 4px; font-size: 11px; border: none; cursor: pointer;" title="Hapus data lembur ini">🗑️</button>
                </div>
            </div>
        `;

        // Badge Audit Anomali
        const issues = hasilAudit.anomaliMap.get(d) || [];
        let auditColHtml = '';
        let rowClass = 'hover:bg-slate-700/30 transition';

        if (issues.length > 0) {
            rowClass += ' row-anomaly';
            const firstIssue = issues[0];
            const badgeClass = firstIssue.tipe === 'danger' ? 'badge-anomaly-danger' : 'badge-anomaly-warning';
            auditColHtml = `
                <div class="flex flex-col items-center gap-1" title="${issues.map(x => x.label).join(', ')}">
                    <span class="badge-anomaly ${badgeClass}">⚠️ ${firstIssue.label}</span>
                    ${issues.length > 1 ? `<span class="text-[10px] text-amber-500 font-bold">+${issues.length - 1} isu</span>` : ''}
                </div>
            `;
        } else {
            auditColHtml = `<span class="badge-anomaly badge-clean">✅ Valid</span>`;
        }
        
        tbody.innerHTML += `
            <tr class="${rowClass}">
                <td class="px-4 py-3 whitespace-nowrap text-xs">${d.tanggal_tampil} <br><span class="text-slate-500">${d.sheet_name || '-'}</span></td>
                <td class="px-4 py-3">${badgeHari}</td>
                <td class="px-4 py-3 font-semibold text-blue-300">${d.nama}</td>
                <td class="px-4 py-3 text-center font-bold tracking-wider text-amber-300">${d.mulai} - ${d.selesai}</td>
                <td class="px-4 py-3 text-center font-bold text-amber-400">${d.ovt}</td>
                <td class="px-4 py-3 text-right font-bold text-emerald-400">+${formatRupiah(d.uang)}</td>
                <td class="px-4 py-3">${badgeApproval}</td>
                <td class="px-4 py-3">${actionColHtml}</td>
                <td class="px-4 py-3 text-slate-400 italic text-sm">${d.keterangan || '-'}</td>
                <td class="px-4 py-3 text-center">${auditColHtml}</td>
            </tr>`;
    });
    
    // Pasang event listener tombol approval
    tbody.querySelectorAll('.approvalBtn').forEach(btn => {
        btn.addEventListener('click', () => {
            const key = btn.dataset.key;
            const newStatus = btn.dataset.status;
            approvalStatus[key] = newStatus;
            saveApprovalStatus();
            fungsiFilterSuper();
        });
    });

    // Pasang event listener tombol edit
    tbody.querySelectorAll('.btnEditLembur').forEach(btn => {
        btn.addEventListener('click', () => {
            const idx = parseInt(btn.dataset.idx, 10);
            const item = barisTampil[idx];
            if (item) bukaModalInputLembur('edit', item);
        });
    });

    // Pasang event listener tombol hapus
    tbody.querySelectorAll('.btnHapusLembur').forEach(btn => {
        btn.addEventListener('click', () => {
            const idx = parseInt(btn.dataset.idx, 10);
            const item = barisTampil[idx];
            if (item) konfirmasiHapusLembur(item);
        });
    });
}

function setSortColumn(colName) {
    if (currentSortCol === colName) {
        currentSortDir = currentSortDir === 'asc' ? 'desc' : 'asc';
    } else {
        currentSortCol = colName;
        currentSortDir = 'asc';
    }
    updateSortIcons();
    renderTabelUtama();
}

function updateSortIcons() {
    const iconTgl = document.getElementById('iconSortTanggal');
    const iconNama = document.getElementById('iconSortNama');
    const iconJam = document.getElementById('iconSortJam');
    const iconUang = document.getElementById('iconSortUang');

    const dirArrow = currentSortDir === 'asc' ? '▲' : '▼';
    if (iconTgl) {
        iconTgl.textContent = currentSortCol === 'tanggal' ? dirArrow : '↕';
        iconTgl.className = currentSortCol === 'tanggal' ? 'sort-icon active' : 'sort-icon';
    }
    if (iconNama) {
        iconNama.textContent = currentSortCol === 'nama' ? dirArrow : '↕';
        iconNama.className = currentSortCol === 'nama' ? 'sort-icon active' : 'sort-icon';
    }
    if (iconJam) {
        iconJam.textContent = currentSortCol === 'jam' ? dirArrow : '↕';
        iconJam.className = currentSortCol === 'jam' ? 'sort-icon active' : 'sort-icon';
    }
    if (iconUang) {
        iconUang.textContent = currentSortCol === 'uang' ? dirArrow : '↕';
        iconUang.className = currentSortCol === 'uang' ? 'sort-icon active' : 'sort-icon';
    }
}

function resetTableFilters() {
    const inputSearch = document.getElementById('inputTableSearch');
    const filterJenis = document.getElementById('filterTableJenisHari');
    const filterApprv = document.getElementById('filterTableApproval');
    const filterAudit = document.getElementById('filterTableModeAudit');

    if (inputSearch) inputSearch.value = '';
    if (filterJenis) filterJenis.value = 'Semua';
    if (filterApprv) filterApprv.value = 'Semua';
    if (filterAudit) filterAudit.value = 'Semua';

    currentSortCol = 'tanggal';
    currentSortDir = 'asc';
    updateSortIcons();
    renderTabelUtama();
}

// Fungsi Ganti Departemen
function pilihDepartemen(deptId) {
    activeDeptId = deptId;
    localStorage.setItem('active_department_id', deptId);

    const deptObj = getActiveDepartment();

    if (selectDepartemen) selectDepartemen.value = deptId;
    if (headerJudulTim) headerJudulTim.textContent = `Monitoring Lembur Tim ${deptObj.name}`;
    if (badgeDepartemen) badgeDepartemen.textContent = deptObj.name;
    document.title = `Manager Dashboard - Overtime ${deptObj.name}`;

    // Ambil data untuk departemen terpilih
    const currentData = (allDeptData && allDeptData[deptId]) || 
        (typeof data_dashboard !== 'undefined' ? data_dashboard : { karyawan: [], min_date: '', max_date: '', log: [] });

    dataMentah = currentData.log || [];

    // Setup Dropdown Karyawan
    optKaryawan.innerHTML = '<option value="Semua">Semua Karyawan</option>';
    (currentData.karyawan || []).forEach(k => {
        optKaryawan.innerHTML += `<option value="${k}">${k}</option>`;
    });

    // Setup Filter Tanggal
    elTglMulai.value = currentData.min_date || '';
    elTglAkhir.value = currentData.max_date || '';

    // Re-render
    fungsiFilterSuper();
}

// Render Pilihan Departemen di Dropdown Sidebar
function renderDropdownDepartemen() {
    if (!selectDepartemen) return;
    selectDepartemen.innerHTML = '';
    daftarDepartemen.forEach(d => {
        const opt = document.createElement('option');
        opt.value = d.id;
        opt.textContent = d.name;
        if (d.id === activeDeptId) opt.selected = true;
        selectDepartemen.appendChild(opt);
    });
}

// Render Komparasi & Benchmark Antar-Divisi
function renderBenchmarkAntarDivisi() {
    if (!daftarDepartemen || daftarDepartemen.length === 0) return;

    // Ambil data untuk setiap departemen
    const deptSummaries = daftarDepartemen.map(dept => {
        const dData = (allDeptData && allDeptData[dept.id]) || { karyawan: [], log: [] };
        const logs = dData.log || [];
        
        let totalJam = 0, jamB = 0, jamL = 0, totalUang = 0;
        const employeeSet = new Set(dData.karyawan || []);

        logs.forEach(item => {
            const ovt = Number(item.ovt) || 0;
            totalJam += ovt;
            if (item.jenis_hari === 'B') jamB += ovt;
            if (item.jenis_hari === 'L') jamL += ovt;
            totalUang += Number(item.uang) || 0;
            if (item.nama) employeeSet.add(item.nama);
        });

        const employeeCount = Math.max(employeeSet.size, (dData.karyawan || []).length, 1);
        const avgPerEmployee = totalJam / employeeCount;
        const liburRatio = totalJam > 0 ? (jamL / totalJam) * 100 : 0;

        return {
            id: dept.id,
            name: dept.name,
            totalJam: Number(totalJam.toFixed(1)),
            jamB: Number(jamB.toFixed(1)),
            jamL: Number(jamL.toFixed(1)),
            totalUang,
            employeeCount,
            avgPerEmployee: Number(avgPerEmployee.toFixed(1)),
            liburRatio: Number(liburRatio.toFixed(1))
        };
    });

    // Urutkan berdasarkan total jam tertinggi
    deptSummaries.sort((a, b) => b.totalJam - a.totalJam);

    // Hitung agregat seluruh divisi
    const grandTotalJam = deptSummaries.reduce((sum, d) => sum + d.totalJam, 0);
    const grandTotalUang = deptSummaries.reduce((sum, d) => sum + d.totalUang, 0);
    const grandTotalKaryawan = deptSummaries.reduce((sum, d) => sum + d.employeeCount, 0);
    const avgBiayaPerDept = deptSummaries.length > 0 ? grandTotalUang / deptSummaries.length : 0;

    // Tertinggi dan Terefisien
    const highestDept = deptSummaries[0] || { name: '-', totalJam: 0 };
    const sortedByAvg = [...deptSummaries].sort((a, b) => a.avgPerEmployee - b.avgPerEmployee);
    const lowestDept = sortedByAvg[0] || { name: '-', avgPerEmployee: 0 };

    // Update KPI Cards
    const elBenchJam = document.getElementById('kpiBenchTotalJam');
    const elBenchKaryawan = document.getElementById('kpiBenchTotalKaryawan');
    const elBenchUang = document.getElementById('kpiBenchTotalUang');
    const elBenchRataBiaya = document.getElementById('kpiBenchRataBiaya');
    const elBenchHighDept = document.getElementById('kpiBenchHighestDept');
    const elBenchHighVal = document.getElementById('kpiBenchHighestVal');
    const elBenchLowDept = document.getElementById('kpiBenchLowestDept');
    const elBenchLowVal = document.getElementById('kpiBenchLowestVal');

    if (elBenchJam) elBenchJam.textContent = grandTotalJam.toFixed(1) + " Jam";
    if (elBenchKaryawan) elBenchKaryawan.textContent = `${grandTotalKaryawan} Personel aktif terdaftar`;
    if (elBenchUang) elBenchUang.textContent = formatRupiah(grandTotalUang);
    if (elBenchRataBiaya) elBenchRataBiaya.textContent = `Rata-rata: ${formatRupiah(avgBiayaPerDept)} / Divisi`;
    if (elBenchHighDept) elBenchHighDept.textContent = highestDept.name;
    if (elBenchHighVal) elBenchHighVal.textContent = `${highestDept.totalJam.toFixed(1)} Jam lembur`;
    if (elBenchLowDept) elBenchLowDept.textContent = lowestDept.name;
    if (elBenchLowVal) elBenchLowVal.textContent = `Rata-rata: ${lowestDept.avgPerEmployee.toFixed(1)} jam / orang`;

    // Update ApexCharts Benchmark Bar
    if (chartBenchmarkBar) {
        const catNames = deptSummaries.map(d => d.name);
        const seriesJam = deptSummaries.map(d => d.totalJam);
        const seriesBiaya = deptSummaries.map(d => Math.round(d.totalUang / 100000));

        chartBenchmarkBar.updateOptions({ xaxis: { categories: catNames } });
        chartBenchmarkBar.updateSeries([
            { name: 'Total Lembur (Jam)', data: seriesJam },
            { name: 'Total Biaya (x100rb Rp)', data: seriesBiaya }
        ]);
    }

    // Update ApexCharts Benchmark Ratio
    if (chartBenchmarkRatio) {
        const catNames = deptSummaries.map(d => d.name);
        const seriesBiasa = deptSummaries.map(d => d.jamB);
        const seriesLibur = deptSummaries.map(d => d.jamL);

        chartBenchmarkRatio.updateOptions({
            xaxis: { categories: catNames },
            yaxis: { categories: catNames }
        });
        chartBenchmarkRatio.updateSeries([
            { name: 'Hari Biasa (B)', data: seriesBiasa },
            { name: 'Hari Libur (L)', data: seriesLibur }
        ]);
    }

    // Render Tabel Benchmark
    const tabelBody = document.getElementById('tabelBenchmarkBody');
    if (!tabelBody) return;

    tabelBody.innerHTML = deptSummaries.map((d, idx) => {
        const rankMedal = idx === 0 ? '🥇' : idx === 1 ? '🥈' : idx === 2 ? '🥉' : `#${idx + 1}`;
        const isCurrentActive = d.id === activeDeptId;

        let statusBadge = '';
        if (d.avgPerEmployee > 35) {
            statusBadge = '<span class="bg-rose-500/20 text-rose-300 border border-rose-500/30 px-2.5 py-1 rounded-full text-xs font-bold">⚠️ Beban Tinggi</span>';
        } else if (d.avgPerEmployee > 15) {
            statusBadge = '<span class="bg-amber-500/20 text-amber-300 border border-amber-500/30 px-2.5 py-1 rounded-full text-xs font-bold">⚡ Optimal</span>';
        } else {
            statusBadge = '<span class="bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 px-2.5 py-1 rounded-full text-xs font-bold">✅ Terkendali</span>';
        }

        return `
            <tr class="hover:bg-slate-50 border-b border-slate-100 transition-colors">
                <td class="px-4 py-3.5 font-bold text-center text-base text-slate-800">${rankMedal}</td>
                <td class="px-4 py-3.5">
                    <div class="flex items-center gap-2">
                        <span class="font-bold text-slate-900 text-base">${d.name}</span>
                        ${isCurrentActive ? '<span class="bg-blue-50 text-blue-700 border border-blue-200 text-[10px] px-2 py-0.5 rounded font-bold">Sedang Dibuka</span>' : ''}
                    </div>
                </td>
                <td class="px-4 py-3.5 text-center font-semibold text-slate-700">${d.employeeCount} Orang</td>
                <td class="px-4 py-3.5 text-center font-bold text-indigo-700 text-base">${d.totalJam.toFixed(1)}j</td>
                <td class="px-4 py-3.5 text-center font-semibold text-amber-700">${d.avgPerEmployee.toFixed(1)}j / org</td>
                <td class="px-4 py-3.5 text-right font-bold text-emerald-700">${formatRupiah(d.totalUang)}</td>
                <td class="px-4 py-3.5 text-center font-semibold text-rose-600">${d.liburRatio.toFixed(1)}%</td>
                <td class="px-4 py-3.5 text-center">${statusBadge}</td>
                <td class="px-4 py-3.5 text-center">
                    <button class="btnBukaDetailDivisi px-3.5 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold transition shadow" data-id="${d.id}">
                        Buka Detail →
                    </button>
                </td>
            </tr>
        `;
    }).join('');

    tabelBody.querySelectorAll('.btnBukaDetailDivisi').forEach(btn => {
        btn.addEventListener('click', () => {
            const deptId = btn.dataset.id;
            pilihDepartemen(deptId);
            bukaHalaman(halRingkasan, menuRingkasan);
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    });
}

// Fungsi Tarik Data Spreadsheet Seluruh Divisi (Tombol di Halaman Benchmark)
async function refreshAllDepartmentsBenchmark() {
    if (!btnRefreshBenchmark) return;

    const btn = btnRefreshBenchmark;
    const originalContent = btn.innerHTML;
    btn.disabled = true;
    btn.innerHTML = `<span class="inline-block animate-spin">⌛</span><span>Menyinkronkan Semua Spreadsheet...</span>`;
    btn.classList.add('opacity-75', 'cursor-wait');

    try {
        // 1. Panggil backend API /api/refresh tanpa dept_id (memicu subprocess process_data.py --all)
        const response = await fetch(getBackendUrl('/api/refresh'), {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({})
        });

        const text = await response.text();
        let result = {};
        try { result = text ? JSON.parse(text) : {}; } catch (e) {}

        if (!response.ok || !result.ok) {
            throw new Error(result.error || result.stderr || `Gagal sinkronisasi (Status: ${response.status})`);
        }

        // 2. Ambil data terbaru hasil pemrosesan
        const resData = await fetch(getBackendUrl(`/api/departments_data?_t=${Date.now()}`)).catch(() => null);
        if (resData && resData.ok) {
            const apiRes = await resData.json();
            if (apiRes.ok && apiRes.data && Object.keys(apiRes.data).length > 0) {
                allDeptData = apiRes.data;
            }
        }

        // 3. Render ulang komparasi benchmark
        renderBenchmarkAntarDivisi();

        const successMsg = result.stdout || 'Data lembur seluruh departemen berhasil disinkronkan dari Google Spreadsheet!';
        alert(`🎉 Berhasil Disinkronkan!\n\n${successMsg}`);
    } catch (err) {
        console.warn('Backend refresh error:', err);
        
        // Fallback: reload dari file statis jika server tidak merespon
        try {
            const resStatic = await fetch(`data/data_departments.json?_t=${Date.now()}`);
            if (resStatic.ok) {
                const staticJson = await resStatic.json();
                if (staticJson && Object.keys(staticJson).length > 0) {
                    allDeptData = staticJson;
                }
            }
        } catch (e) {}

        renderBenchmarkAntarDivisi();

        let errMsg = err.message || '';
        if (errMsg.includes('Failed to fetch') || errMsg.includes('NetworkError')) {
            alert('⚠️ Server backend python di port 8000 belum aktif.\n\nData komparasi dimuat dari cache lokal.\nUntuk menarik data spreadsheet terbaru langsung dari Google Docs, silakan jalankan "jalankan_server.bat" atau "python server.py".');
        } else {
            alert(`Pembaruan data selesai: ${errMsg}`);
        }
    } finally {
        btn.disabled = false;
        btn.innerHTML = originalContent;
        btn.classList.remove('opacity-75', 'cursor-wait');
    }
}

// Modal Kelola Departemen
function bukaModalDept() {
    if (!modalKelolaDept) return;
    modalKelolaDept.classList.remove('hidden');
    renderDaftarDeptModal();
    resetFormDept();
}

function tutupModalDept() {
    if (!modalKelolaDept) return;
    modalKelolaDept.classList.add('hidden');
}

function resetFormDept() {
    inputDeptId.value = '';
    inputDeptNama.value = '';
    inputDeptUrl.value = '';
    if (inputDeptWebhook) inputDeptWebhook.value = '';
    formDeptTitle.textContent = 'Tambah Departemen Baru';
    btnBatalEditDept.classList.add('hidden');
    modalDeptAlert.classList.add('hidden');
}

function tampilkanAlertModal(pesan, sukses = true) {
    if (!modalDeptAlert) return;
    modalDeptAlert.className = sukses
        ? 'rounded-lg p-3 text-xs font-medium bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 block'
        : 'rounded-lg p-3 text-xs font-medium bg-rose-500/20 text-rose-300 border border-rose-500/40 block';
    modalDeptAlert.innerHTML = pesan;
}

function renderDaftarDeptModal() {
    if (!daftarDeptContainer) return;
    daftarDeptContainer.innerHTML = '';

    if (daftarDepartemen.length === 0) {
        daftarDeptContainer.innerHTML = '<p class="text-sm text-slate-400 italic">Belum ada departemen yang terdaftar.</p>';
        return;
    }

    daftarDepartemen.forEach(d => {
        const item = document.createElement('div');
        item.className = 'rounded-xl border border-slate-700 bg-slate-800/60 p-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-3';
        
        const lastSync = d.updated_at ? `Terkahir sinkron: ${d.updated_at}` : 'Belum pernah disinkronkan';
        const displayUrl = d.url.length > 50 ? d.url.slice(0, 47) + '...' : d.url;
        const webhookBadge = d.webhook_url ? '<span class="text-[10px] uppercase tracking-wider bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 px-2 py-0.5 rounded font-semibold">⚡ Dua Arah</span>' : '';

        item.innerHTML = `
            <div class="min-w-0 flex-1">
                <div class="flex items-center gap-2 flex-wrap">
                    <span class="font-bold text-white text-base">${d.name}</span>
                    ${d.id === activeDeptId ? '<span class="text-[10px] uppercase tracking-wider bg-blue-500/20 text-blue-400 border border-blue-500/30 px-2 py-0.5 rounded font-semibold">Aktif</span>' : ''}
                    ${webhookBadge}
                </div>
                <div class="flex items-center gap-2 mt-1">
                    <a href="${d.url}" target="_blank" class="text-xs text-blue-400 hover:underline truncate max-w-xs block" title="${d.url}">🔗 ${displayUrl}</a>
                </div>
                <p class="text-[11px] text-slate-400 mt-0.5">${lastSync}</p>
            </div>
            <div class="flex items-center gap-1.5 shrink-0">
                <button class="btnSyncItem rounded-lg bg-violet-600/80 hover:bg-violet-600 text-white px-2.5 py-1.5 text-xs font-semibold transition" data-id="${d.id}" title="Sinkronkan data spreadsheet departemen ini">🔄 Refresh</button>
                <button class="btnEditItem rounded-lg bg-slate-700 hover:bg-slate-600 text-slate-200 px-2.5 py-1.5 text-xs font-semibold transition" data-id="${d.id}" title="Edit link atau nama">✏️ Edit</button>
                <button class="btnHapusItem rounded-lg bg-rose-600/80 hover:bg-rose-600 text-white px-2.5 py-1.5 text-xs font-semibold transition" data-id="${d.id}" title="Hapus departemen">🗑️</button>
            </div>
        `;
        daftarDeptContainer.appendChild(item);
    });

    // Attach row events
    daftarDeptContainer.querySelectorAll('.btnSyncItem').forEach(btn => {
        btn.addEventListener('click', () => {
            const deptId = btn.dataset.id;
            refreshDataFromPython(deptId);
        });
    });

    daftarDeptContainer.querySelectorAll('.btnEditItem').forEach(btn => {
        btn.addEventListener('click', () => {
            const deptId = btn.dataset.id;
            const target = daftarDepartemen.find(d => d.id === deptId);
            if (target) {
                inputDeptId.value = target.id;
                inputDeptNama.value = target.name;
                inputDeptUrl.value = target.url;
                if (inputDeptWebhook) inputDeptWebhook.value = target.webhook_url || '';
                formDeptTitle.textContent = `Edit Departemen: ${target.name}`;
                btnBatalEditDept.classList.remove('hidden');
                inputDeptNama.focus();
            }
        });
    });

    daftarDeptContainer.querySelectorAll('.btnHapusItem').forEach(btn => {
        btn.addEventListener('click', async () => {
            const deptId = btn.dataset.id;
            const target = daftarDepartemen.find(d => d.id === deptId);
            if (!target) return;

            if (daftarDepartemen.length <= 1) {
                alert('Tidak dapat menghapus. Minimal harus ada 1 departemen di dashboard.');
                return;
            }

            if (!confirm(`Apakah Anda yakin ingin menghapus departemen "${target.name}"? Data lembur departemen ini akan dihapus dari dashboard.`)) {
                return;
            }

            try {
                const response = await fetch(getBackendUrl(`/api/departments?id=${encodeURIComponent(deptId)}`), {
                    method: 'DELETE'
                });
                const result = await response.json();
                if (!response.ok || !result.ok) {
                    throw new Error(result.error || 'Gagal menghapus departemen.');
                }
                alert(result.message || 'Departemen berhasil dihapus.');
                window.location.reload();
            } catch (err) {
                alert(`Gagal: ${err.message}`);
            }
        });
    });
}

// Inisialisasi Departemen
async function initDepartemen() {
    // 1. Muat dari data.js bawaan bila ada
    if (typeof data_departments_meta !== 'undefined' && Array.isArray(data_departments_meta)) {
        daftarDepartemen = data_departments_meta;
    } else {
        daftarDepartemen = [{ id: 'ppic', name: 'PPIC', url: '', updated_at: '' }];
    }

    if (typeof data_departments_all !== 'undefined') {
        allDeptData = data_departments_all;
    } else if (typeof data_dashboard !== 'undefined') {
        allDeptData = { 'ppic': data_dashboard };
    }

    // 2. Ambil update daftar departemen dari API backend jika server sedang berjalan
    try {
        const res = await fetch(getBackendUrl(`/api/departments?_t=${Date.now()}`), { method: 'GET' });
        if (res.ok) {
            const apiData = await res.json();
            if (apiData.ok && Array.isArray(apiData.departments) && apiData.departments.length > 0) {
                daftarDepartemen = apiData.departments;
            }
        }
    } catch (e) {
        // Jika backend offline, tetap gunakan data statis dari data.js
    }

    // 2b. SELALU ambil data lembur terbaru dari backend/JSON dengan anti-cache
    try {
        const resData = await fetch(getBackendUrl(`/api/departments_data?_t=${Date.now()}`));
        if (resData.ok) {
            const apiRes = await resData.json();
            if (apiRes.ok && apiRes.data && Object.keys(apiRes.data).length > 0) {
                allDeptData = apiRes.data;
            }
        }
    } catch (eData) {
        try {
            const resStatic = await fetch(`data/data_departments.json?_t=${Date.now()}`);
            if (resStatic.ok) {
                const staticJson = await resStatic.json();
                if (staticJson && Object.keys(staticJson).length > 0) {
                    allDeptData = staticJson;
                }
            }
        } catch (eStatic) {}
    }

    // 3. Tentukan departemen aktif
    const savedActiveDept = localStorage.getItem('active_department_id');
    if (savedActiveDept && daftarDepartemen.some(d => d.id === savedActiveDept)) {
        activeDeptId = savedActiveDept;
    } else if (daftarDepartemen.length > 0) {
        activeDeptId = daftarDepartemen[0].id;
    } else {
        activeDeptId = 'ppic';
    }

    renderDropdownDepartemen();
    pilihDepartemen(activeDeptId);
    renderBenchmarkAntarDivisi();
}

// Event Listeners Modal
if (btnBukaModalDept) {
    btnBukaModalDept.addEventListener('click', bukaModalDept);
}

if (btnTutupModalDept) {
    btnTutupModalDept.addEventListener('click', tutupModalDept);
}

if (btnBatalEditDept) {
    btnBatalEditDept.addEventListener('click', resetFormDept);
}

if (selectDepartemen) {
    selectDepartemen.addEventListener('change', (e) => {
        pilihDepartemen(e.target.value);
    });
}

// Form Submit Tambah / Edit Departemen
if (formTambahDept) {
    formTambahDept.addEventListener('submit', async (e) => {
        e.preventDefault();
        const nama = inputDeptNama.value.trim();
        const url = inputDeptUrl.value.trim();
        const id = inputDeptId.value.trim();
        const webhook_url = inputDeptWebhook ? inputDeptWebhook.value.trim() : '';

        if (!nama || !url) {
            tampilkanAlertModal('Nama dan link spreadsheet wajib diisi.', false);
            return;
        }

        submitDeptSpinner.classList.remove('hidden');
        btnSubmitDept.disabled = true;
        submitDeptText.textContent = 'Mengunduh & Memproses...';
        tampilkanAlertModal('Mengunduh spreadsheet dari Google Docs dan membaca seluruh tab sheet... Mohon tunggu sebentar.', true);

        try {
            const response = await fetch(getBackendUrl('/api/departments'), {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ id, name: nama, url, webhook_url })
            });

            const result = await response.json();
            if (!response.ok || !result.ok) {
                throw new Error(result.error || 'Gagal menyimpan dan memproses departemen.');
            }

            tampilkanAlertModal(`🎉 Sukses! Departemen "${nama}" berhasil disimpan dan datanya sudah terupdate. Halaman akan dimuat ulang...`, true);
            setTimeout(() => {
                window.location.reload();
            }, 1200);
        } catch (err) {
            console.error('Submit department error:', err);
            let errMsg = err.message;
            if (errMsg.includes('Failed to fetch')) {
                errMsg = 'Tidak dapat terhubung ke server backend di port 8000. Pastikan "python server.py" aktif.';
            }
            tampilkanAlertModal(`❌ Gagal: ${errMsg}`, false);
        } finally {
            submitDeptSpinner.classList.add('hidden');
            btnSubmitDept.disabled = false;
            submitDeptText.textContent = 'Simpan & Tarik Data';
        }
    });
}

// Tutup modal jika klik di luar box
window.addEventListener('click', (e) => {
    if (e.target === modalKelolaDept) {
        tutupModalDept();
    }
});

// Setup Export CSV
const btnExportCsv = document.getElementById('btnExportCsv');
if (btnExportCsv) {
    btnExportCsv.addEventListener('click', () => {
        const rows = dataMentah.filter(item => {
            let cocokKaryawan = (optKaryawan.value === 'Semua') || (item.nama === optKaryawan.value);
            let cocokTgl = true;
            if (elTglMulai.value && item.tanggal_iso < elTglMulai.value) cocokTgl = false;
            if (elTglAkhir.value && item.tanggal_iso > elTglAkhir.value) cocokTgl = false;
            return cocokKaryawan && cocokTgl;
        }).sort((a, b) => a.tanggal_iso.localeCompare(b.tanggal_iso));

        const header = ['tanggal_iso', 'tanggal_tampil', 'sheet_name', 'nama', 'jenis_hari', 'mulai', 'selesai', 'ovt', 'uang', 'keterangan'];
        const csvRows = rows.map(item => [
            item.tanggal_iso,
            item.tanggal_tampil,
            item.sheet_name,
            item.nama,
            item.jenis_hari,
            item.mulai,
            item.selesai,
            item.ovt,
            item.uang,
            item.keterangan
        ].map(value => `"${String(value ?? '').replace(/"/g, '""')}"`).join(','));

        const csvContent = [header.join(','), ...csvRows].join('\n');
        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = `laporan_lembur_${activeDeptId}.csv`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
    });
}

// Setup Export PDF
const btnExportPdf = document.getElementById('btnExportPdf');
if (btnExportPdf) {
    btnExportPdf.addEventListener('click', () => {
        if (!window.jspdf || !window.jspdf.jsPDF) {
            alert('Library PDF tidak tersedia. Muat ulang halaman lalu coba lagi.');
            return;
        }

        const rows = dataMentah.filter(item => {
            let cocokKaryawan = (optKaryawan.value === 'Semua') || (item.nama === optKaryawan.value);
            let cocokTgl = true;
            if (elTglMulai.value && item.tanggal_iso < elTglMulai.value) cocokTgl = false;
            if (elTglAkhir.value && item.tanggal_iso > elTglAkhir.value) cocokTgl = false;
            return cocokKaryawan && cocokTgl;
        }).sort((a, b) => a.tanggal_iso.localeCompare(b.tanggal_iso));

        const tglMulai = elTglMulai.value || 'N/A';
        const tglAkhir = elTglAkhir.value || 'N/A';
        const namaKaryawan = optKaryawan.value;
        const activeDeptObj = getActiveDepartment();

        const totalJam = rows.reduce((sum, r) => sum + r.ovt, 0);
        const totalUang = rows.reduce((sum, r) => sum + r.uang, 0);
        const jamBiasa = rows.filter(r => r.jenis_hari === 'B').reduce((sum, r) => sum + r.ovt, 0);
        const jamLibur = rows.filter(r => r.jenis_hari === 'L').reduce((sum, r) => sum + r.ovt, 0);

        const { jsPDF } = window.jspdf;
        const doc = new jsPDF({ orientation: 'landscape', unit: 'mm', format: 'a4' });

        const pageWidth = doc.internal.pageSize.getWidth();
        const pageHeight = doc.internal.pageSize.getHeight();

        doc.setFillColor(15, 23, 42);
        doc.rect(0, 0, pageWidth, 22, 'F');
        doc.setTextColor(255, 255, 255);
        doc.setFontSize(16);
        doc.text(`Laporan Lembur Tim ${activeDeptObj.name}`, 14, 14);

        doc.setTextColor(51, 65, 85);
        doc.setFontSize(10);
        doc.text(`Departemen: ${activeDeptObj.name}`, 14, 32);
        doc.text(`Periode: ${tglMulai} s/d ${tglAkhir}`, 14, 38);
        doc.text(`Karyawan: ${namaKaryawan}`, 14, 44);
        doc.text(`Tanggal Cetak: ${new Date().toLocaleDateString('id-ID')}`, 14, 50);

        doc.setDrawColor(203, 213, 225);
        doc.setFillColor(248, 250, 252);
        doc.roundedRect(14, 56, pageWidth - 28, 18, 2, 2, 'FD');
        doc.setTextColor(15, 23, 42);
        doc.setFontSize(9);
        doc.text('Total Jam Lembur', 20, 64);
        doc.setFontSize(11);
        doc.text(`${totalJam.toFixed(1)} jam`, 20, 70);

        doc.setFontSize(9);
        doc.text('Jam Biasa', 90, 64);
        doc.setFontSize(11);
        doc.text(`${jamBiasa.toFixed(1)} jam`, 90, 70);

        doc.setFontSize(9);
        doc.text('Jam Libur', 160, 64);
        doc.setFontSize(11);
        doc.text(`${jamLibur.toFixed(1)} jam`, 160, 70);

        doc.setFontSize(9);
        doc.text('Total Pendapatan', 230, 64);
        doc.setFontSize(11);
        doc.text(`Rp ${Number(totalUang).toLocaleString('id-ID')}`, 230, 70);

        const bodyRows = rows.map((item, index) => [
            index + 1,
            item.tanggal_tampil,
            item.nama,
            `${item.mulai} - ${item.selesai}`,
            String(item.ovt),
            item.jenis_hari === 'L' ? 'Libur' : 'Biasa',
            `Rp ${Number(item.uang).toLocaleString('id-ID')}`,
            item.keterangan || '-'
        ]);

        doc.autoTable({
            head: [['No', 'Tanggal', 'Karyawan', 'Waktu', 'Jam', 'Tipe', 'Uang', 'Keterangan']],
            body: bodyRows,
            startY: 82,
            theme: 'grid',
            styles: {
                fontSize: 7,
                cellPadding: 2,
                overflow: 'linebreak',
                valign: 'middle'
            },
            headStyles: {
                fillColor: [15, 23, 42],
                textColor: [255, 255, 255],
                fontStyle: 'bold',
                fontSize: 7
            },
            alternateRowStyles: {
                fillColor: [248, 250, 252]
            },
            margin: { left: 14, right: 14 },
            didDrawPage: () => {
                const currentY = doc.lastAutoTable.finalY + 8;
                if (currentY > pageHeight - 20) {
                    doc.text(`Laporan ini dicetak secara otomatis dari Sistem Dashboard Keuangan - ${activeDeptObj.name}`, 14, pageHeight - 14);
                }
            }
        });

        const finalY = doc.lastAutoTable.finalY + 10;
        doc.setTextColor(100, 116, 139);
        doc.setFontSize(8);
        doc.text(`Laporan ini dicetak secara otomatis dari Sistem Dashboard Keuangan - ${activeDeptObj.name}`, 14, finalY);
        doc.text(`Waktu: ${new Date().toLocaleString('id-ID')}`, 14, finalY + 6);

        doc.save(`laporan_lembur_${activeDeptId}_${tglMulai}_${tglAkhir}.pdf`);
    });
}

// Event Listeners Filter
optKaryawan.addEventListener('change', fungsiFilterSuper);
elTglMulai.addEventListener('change', fungsiFilterSuper);
elTglAkhir.addEventListener('change', fungsiFilterSuper);
elTarget.addEventListener('input', fungsiFilterSuper);
optApprovalStatus.addEventListener('change', fungsiFilterSuper);

// ==========================================
// FITUR: QUICK DATE PRESETS
// ==========================================
function setQuickDatePreset(presetType) {
    const currentData = (allDeptData && allDeptData[activeDeptId]) || 
        (typeof data_dashboard !== 'undefined' ? data_dashboard : { min_date: '', max_date: '' });
    
    // Gunakan tanggal max dari data atau hari ini
    const baseDateStr = currentData.max_date || new Date().toISOString().slice(0, 10);
    const refDate = new Date(baseDateStr + 'T00:00:00');

    function toYmd(d) {
        const y = d.getFullYear();
        const m = String(d.getMonth() + 1).padStart(2, '0');
        const day = String(d.getDate()).padStart(2, '0');
        return `${y}-${m}-${day}`;
    }

    if (presetType === 'today') {
        elTglMulai.value = baseDateStr;
        elTglAkhir.value = baseDateStr;
    } else if (presetType === 'this_week') {
        const day = refDate.getDay(); // 0 = Sun, 1 = Mon ...
        const diffToMon = day === 0 ? -6 : 1 - day;
        const monday = new Date(refDate);
        monday.setDate(refDate.getDate() + diffToMon);
        const sunday = new Date(monday);
        sunday.setDate(monday.getDate() + 6);
        
        elTglMulai.value = toYmd(monday);
        elTglAkhir.value = toYmd(sunday);
    } else if (presetType === 'this_month') {
        const firstDay = new Date(refDate.getFullYear(), refDate.getMonth(), 1);
        const lastDay = new Date(refDate.getFullYear(), refDate.getMonth() + 1, 0);
        elTglMulai.value = toYmd(firstDay);
        elTglAkhir.value = toYmd(lastDay);
    } else if (presetType === 'last_month') {
        const firstDayPrev = new Date(refDate.getFullYear(), refDate.getMonth() - 1, 1);
        const lastDayPrev = new Date(refDate.getFullYear(), refDate.getMonth(), 0);
        elTglMulai.value = toYmd(firstDayPrev);
        elTglAkhir.value = toYmd(lastDayPrev);
    } else if (presetType === 'all') {
        elTglMulai.value = currentData.min_date || '';
        elTglAkhir.value = currentData.max_date || '';
    }

    document.querySelectorAll('.btn-date-preset').forEach(btn => {
        if (btn.dataset.preset === presetType) {
            btn.classList.add('active');
        } else {
            btn.classList.remove('active');
        }
    });

    fungsiFilterSuper();
}

document.querySelectorAll('.btn-date-preset').forEach(btn => {
    btn.addEventListener('click', () => {
        setQuickDatePreset(btn.dataset.preset);
    });
});

[elTglMulai, elTglAkhir].forEach(input => {
    input.addEventListener('change', () => {
        document.querySelectorAll('.btn-date-preset').forEach(b => b.classList.remove('active'));
    });
});

// ==========================================
// FITUR: 1-CLICK WHATSAPP EXECUTIVE SUMMARY
// ==========================================
const btnExportWa = document.getElementById('btnExportWa');
if (btnExportWa) {
    btnExportWa.addEventListener('click', () => {
        const deptObj = getActiveDepartment();
        const tglMulai = elTglMulai.value || 'Awal Periode';
        const tglAkhir = elTglAkhir.value || 'Akhir Periode';
        const namaKaryawan = optKaryawan.value;
        const totalJam = document.getElementById('kpiTotalJam').innerText || '0 Jam';
        const jamBiasa = document.getElementById('kpiJamB').innerText || '0 Jam';
        const jamLibur = document.getElementById('kpiJamL').innerText || '0 Jam';
        const totalUang = document.getElementById('kpiTotalUang').innerText || 'Rp 0';
        const rataKaryawan = document.getElementById('kpiRataKaryawan').innerText || '0 Jam';
        const karyawanTinggi = document.getElementById('kpiKaryawanTinggi').innerText || '-';
        const targetStatus = document.getElementById('kpiTargetStatus').innerText || '-';

        const valKaryawan = optKaryawan.value;
        const valMulai = elTglMulai.value;
        const valAkhir = elTglAkhir.value;
        const valApprovalStatus = optApprovalStatus.value;

        const dataTersaring = dataMentah.filter(item => {
            let cocokKaryawan = (valKaryawan === 'Semua') || (item.nama === valKaryawan);
            let cocokTgl = true;
            if (valMulai && item.tanggal_iso < valMulai) cocokTgl = false;
            if (valAkhir && item.tanggal_iso > valAkhir) cocokTgl = false;
            let cocokApproval = (valApprovalStatus === 'Semua') || (getApprovalStatus(item) === valApprovalStatus);
            return cocokKaryawan && cocokTgl && cocokApproval;
        });

        const approvedCount = dataTersaring.filter(item => getApprovalStatus(item) === 'Approved').length;
        const pendingCount = dataTersaring.filter(item => getApprovalStatus(item) === 'Pending').length;
        const rejectedCount = dataTersaring.filter(item => getApprovalStatus(item) === 'Rejected').length;

        const waText = [
            `📊 *LAPORAN LEMBUR TIM ${deptObj.name.toUpperCase()}*`,
            `🏢 PT Charoen Pokphand Indonesia`,
            `🗓️ Periode: ${tglMulai} s/d ${tglAkhir}`,
            `👤 Filter Karyawan: ${namaKaryawan}`,
            `─────────────────────────────`,
            `⏱️ *Total Lembur*   : *${totalJam}*`,
            `   • Hari Biasa (B): ${jamBiasa}`,
            `   • Hari Libur (L): ${jamLibur}`,
            `💰 *Estimasi Biaya*  : *${totalUang}*`,
            `👥 *Rata-rata/Orang* : ${rataKaryawan}`,
            `🏆 *OVT Tertinggi*  : ${karyawanTinggi}`,
            `🎯 *Status Target*   : ${targetStatus}`,
            `📋 *Status Review*  : ${approvedCount} Disetujui, ${pendingCount} Menunggu (Pending)${rejectedCount > 0 ? `, ${rejectedCount} Ditolak` : ''}`,
            `─────────────────────────────`,
            `_Dibuat otomatis via OVT Manager System • ${new Date().toLocaleDateString('id-ID')}_`
        ].join('\n');

        if (navigator.clipboard && navigator.clipboard.writeText) {
            navigator.clipboard.writeText(waText).then(() => {
                alert(`✅ Ringkasan Laporan WhatsApp Berhasil Disalin!\n\nTeks sudah siap di-paste (Ctrl + V) ke ruang chat/grup WhatsApp manajemen.`);
            }).catch(() => {
                prompt("Salin teks laporan WhatsApp di bawah ini (Ctrl + C):", waText);
            });
        } else {
            prompt("Salin teks laporan WhatsApp di bawah ini (Ctrl + C):", waText);
        }
    });
}

// ==========================================
// FITUR: WHAT-IF COST SIMULATOR & SPL ESTIMATOR
// ==========================================
const btnBukaSimulator = document.getElementById('btnBukaSimulator');
const modalSimulatorLembur = document.getElementById('modalSimulatorLembur');
const btnTutupModalSimulator = document.getElementById('btnTutupModalSimulator');
const btnTutupModalSimulatorBottom = document.getElementById('btnTutupModalSimulatorBottom');
const simDept = document.getElementById('simDept');
const simJumlahPersonel = document.getElementById('simJumlahPersonel');
const simJenisHari = document.getElementById('simJenisHari');
const simDurasiJam = document.getElementById('simDurasiJam');
const simTarifPerJam = document.getElementById('simTarifPerJam');
const simUraianTugas = document.getElementById('simUraianTugas');
const simOutTotalJam = document.getElementById('simOutTotalJam');
const simOutTotalBiaya = document.getElementById('simOutTotalBiaya');
const simOutImpact = document.getElementById('simOutImpact');
const btnSalinSplWa = document.getElementById('btnSalinSplWa');

function bukaModalSimulator() {
    if (!modalSimulatorLembur) return;
    
    if (simDept) {
        simDept.innerHTML = '';
        daftarDepartemen.forEach(d => {
            const opt = document.createElement('option');
            opt.value = d.id;
            opt.textContent = d.name;
            if (d.id === activeDeptId) opt.selected = true;
            simDept.appendChild(opt);
        });
    }

    hitungSimulasiLembur();
    modalSimulatorLembur.classList.remove('hidden');
}

function tutupModalSimulator() {
    if (modalSimulatorLembur) {
        modalSimulatorLembur.classList.add('hidden');
    }
}

function hitungSimulasiLembur() {
    if (!simJumlahPersonel || !simDurasiJam || !simTarifPerJam) return;

    const personel = Math.max(1, parseInt(simJumlahPersonel.value) || 1);
    const durasi = Math.max(0.5, parseFloat(simDurasiJam.value) || 0);
    const tarif = Math.max(0, parseFloat(simTarifPerJam.value) || 0);
    const jenisHari = simJenisHari ? simJenisHari.value : 'B';
    const targetJam = Number(elTarget.value) || 0;

    const totalJamSim = Number((personel * durasi).toFixed(1));
    const totalBiayaSim = Math.round(totalJamSim * tarif);

    if (simOutTotalJam) simOutTotalJam.textContent = `${totalJamSim.toFixed(1)} Jam`;
    if (simOutTotalBiaya) simOutTotalBiaya.textContent = formatRupiah(totalBiayaSim);

    if (simOutImpact) {
        let currentDeptTotalJam = 0;
        dataMentah.forEach(d => currentDeptTotalJam += (d.ovt || 0));
        
        const proyeksiTotal = currentDeptTotalJam + totalJamSim;
        const hariText = jenisHari === 'L' ? 'Hari Libur (L)' : 'Hari Biasa (B)';

        if (targetJam > 0 && proyeksiTotal > targetJam) {
            simOutImpact.className = 'rounded-lg bg-amber-500/20 border border-amber-500/40 p-2.5 text-xs text-amber-200';
            simOutImpact.innerHTML = `⚠️ <b>Perhatian Target:</b> Rencana lembur ini akan meningkatkan akumulasi dari <b>${currentDeptTotalJam.toFixed(1)} jam</b> menjadi <b>${proyeksiTotal.toFixed(1)} jam</b> (melebihi target kuota ${targetJam} jam).`;
        } else {
            simOutImpact.className = 'rounded-lg bg-emerald-500/20 border border-emerald-500/40 p-2.5 text-xs text-emerald-200';
            simOutImpact.innerHTML = `✅ <b>Kapasitas Aman:</b> Akumulasi jam berjalan diproyeksikan menjadi <b>${proyeksiTotal.toFixed(1)} jam</b> ${targetJam > 0 ? `(masih dalam kuota target ${targetJam} jam)` : ''}. Rencana lembur ${hariText}.`;
        }
    }
}

if (btnBukaSimulator) btnBukaSimulator.addEventListener('click', bukaModalSimulator);
if (btnTutupModalSimulator) btnTutupModalSimulator.addEventListener('click', tutupModalSimulator);
if (btnTutupModalSimulatorBottom) btnTutupModalSimulatorBottom.addEventListener('click', tutupModalSimulator);

[simDept, simJumlahPersonel, simJenisHari, simDurasiJam, simTarifPerJam].forEach(el => {
    if (el) {
        el.addEventListener('input', hitungSimulasiLembur);
        el.addEventListener('change', hitungSimulasiLembur);
    }
});

window.addEventListener('click', (e) => {
    if (e.target === modalSimulatorLembur) {
        tutupModalSimulator();
    }
});

if (btnSalinSplWa) {
    btnSalinSplWa.addEventListener('click', () => {
        const deptName = (simDept && simDept.options[simDept.selectedIndex]) ? simDept.options[simDept.selectedIndex].text : activeDeptId.toUpperCase();
        const personel = simJumlahPersonel.value || 1;
        const durasi = simDurasiJam.value || 1;
        const jenisHari = simJenisHari.value === 'L' ? 'Hari Libur / Weekend (L)' : 'Hari Kerja Biasa (B)';
        const tarif = parseFloat(simTarifPerJam.value) || 0;
        const totalJam = (personel * durasi).toFixed(1);
        const totalBiaya = formatRupiah(Math.round(totalJam * tarif));
        const uraian = simUraianTugas.value.trim() || 'Pekerjaan operasional terencana';

        const drafSplText = [
            `📝 *FORM PENGAJUAN RENCANA LEMBUR (SPL)*`,
            `🏢 PT Charoen Pokphand Indonesia • Divisi ${deptName}`,
            `─────────────────────────────`,
            `👥 *Jumlah Personel* : ${personel} Orang`,
            `📅 *Jenis Hari*      : ${jenisHari}`,
            `⏱️ *Durasi per Orang* : ${durasi} Jam`,
            `⏳ *Total Akumulasi*  : *${totalJam} Jam*`,
            `💰 *Estimasi Biaya*   : *${totalBiaya}*`,
            `📌 *Uraian Tugas*     : ${uraian}`,
            `─────────────────────────────`,
            `_Mohon persetujuan (approval) manajemen sebelum SPL diterbitkan._`
        ].join('\n');

        if (navigator.clipboard && navigator.clipboard.writeText) {
            navigator.clipboard.writeText(drafSplText).then(() => {
                alert(`✅ Draf Pengajuan SPL Berhasil Disalin!\n\nSiap di-paste ke chat WhatsApp supervisor/manajer untuk meminta persetujuan.`);
            }).catch(() => {
                prompt("Salin teks draf SPL di bawah ini (Ctrl + C):", drafSplText);
            });
        } else {
            prompt("Salin teks draf SPL di bawah ini (Ctrl + C):", drafSplText);
        }
    });
}

// ==========================================
// FITUR: EXPORT EXCEL FORMAL (.XLSX)
// ==========================================
function exportExcelFormal() {
    if (!window.XLSX) {
        alert('Pustaka SheetJS (XLSX) sedang dimuat. Silakan tunggu sejenak atau muat ulang browser.');
        return;
    }

    const deptObj = getActiveDepartment();
    const tglMulai = elTglMulai.value || 'Semua';
    const tglAkhir = elTglAkhir.value || 'Semua';
    const periodeStr = `${tglMulai} s/d ${tglAkhir}`;
    const tanggalCetak = new Date().toLocaleString('id-ID');

    const dataEkspor = [...currentDataTersaringUtama].sort((a, b) => 
        (a.tanggal_iso || '').localeCompare(b.tanggal_iso || '')
    );

    const hasilAudit = deteksiAnomaliData(dataEkspor);

    // SHEET 1: Detail_Transaksi
    const ws1Data = [
        ['PT CHAROEN POKPHAND INDONESIA - EASTERN REGION'],
        [`REKAPITULASI LAPORAN LEMBUR KARYAWAN - DIVISI ${deptObj.name.toUpperCase()}`],
        [`Periode: ${periodeStr} | Waktu Ekspor: ${tanggalCetak} | Total Transaksi: ${dataEkspor.length}`],
        [],
        ['No', 'Tanggal', 'Sheet Sumber', 'Tipe Hari', 'Nama Karyawan', 'Jam Mulai', 'Jam Selesai', 'Total Jam', 'Uang Lembur (Rp)', 'Status Approval', 'Audit Validitas', 'Keterangan / Uraian Tugas']
    ];

    let totalJamSemua = 0;
    let totalUangSemua = 0;

    dataEkspor.forEach((d, idx) => {
        const approval = getApprovalStatus(d);
        const tipeHari = d.jenis_hari === 'L' ? 'Libur (L)' : 'Biasa (B)';
        const issues = hasilAudit.anomaliMap.get(d);
        const auditStatus = issues ? issues.map(x => x.label).join('; ') : 'Valid';

        totalJamSemua += d.ovt;
        totalUangSemua += d.uang;

        ws1Data.push([
            idx + 1,
            d.tanggal_tampil || d.tanggal_iso,
            d.sheet_name || '-',
            tipeHari,
            d.nama,
            d.mulai || '-',
            d.selesai || '-',
            Number(d.ovt.toFixed(2)),
            d.uang,
            approval,
            auditStatus,
            d.keterangan || '-'
        ]);
    });

    ws1Data.push([]);
    ws1Data.push([
        'TOTAL AKUMULASI', '', '', '', '', '', '',
        Number(totalJamSemua.toFixed(2)),
        totalUangSemua,
        '', '', ''
    ]);

    const ws1 = XLSX.utils.aoa_to_sheet(ws1Data);
    ws1['!cols'] = [
        { wch: 6 },
        { wch: 14 },
        { wch: 14 },
        { wch: 12 },
        { wch: 24 },
        { wch: 12 },
        { wch: 12 },
        { wch: 12 },
        { wch: 16 },
        { wch: 16 },
        { wch: 26 },
        { wch: 35 }
    ];

    // SHEET 2: Rekap_Per_Karyawan
    const ws2Data = [
        ['PT CHAROEN POKPHAND INDONESIA - EASTERN REGION'],
        [`RINGKASAN AKUMULASI PER KARYAWAN - DIVISI ${deptObj.name.toUpperCase()}`],
        [`Periode: ${periodeStr} | Total Personel Aktif: ${new Set(dataEkspor.map(d => d.nama)).size} Orang`],
        [],
        ['No', 'Nama Karyawan', 'Lembur Hari Biasa (Jam)', 'Lembur Hari Libur (Jam)', 'Total Jam Lembur', 'Porsi Jam (%)', 'Total Biaya Lembur (Rp)']
    ];

    const employeeMap = {};
    dataEkspor.forEach(d => {
        if (!employeeMap[d.nama]) {
            employeeMap[d.nama] = { nama: d.nama, jamB: 0, jamL: 0, totalJam: 0, totalUang: 0 };
        }
        if (d.jenis_hari === 'B') employeeMap[d.nama].jamB += d.ovt;
        if (d.jenis_hari === 'L') employeeMap[d.nama].jamL += d.ovt;
        employeeMap[d.nama].totalJam += d.ovt;
        employeeMap[d.nama].totalUang += d.uang;
    });

    const rankKaryawan = Object.values(employeeMap).sort((a, b) => b.totalJam - a.totalJam);
    rankKaryawan.forEach((k, idx) => {
        const porsi = totalJamSemua > 0 ? ((k.totalJam / totalJamSemua) * 100).toFixed(1) + '%' : '0%';
        ws2Data.push([
            idx + 1,
            k.nama,
            Number(k.jamB.toFixed(2)),
            Number(k.jamL.toFixed(2)),
            Number(k.totalJam.toFixed(2)),
            porsi,
            k.totalUang
        ]);
    });

    ws2Data.push([]);
    ws2Data.push(['TOTAL', '', '', '', Number(totalJamSemua.toFixed(2)), '100%', totalUangSemua]);

    const ws2 = XLSX.utils.aoa_to_sheet(ws2Data);
    ws2['!cols'] = [
        { wch: 6 },
        { wch: 24 },
        { wch: 22 },
        { wch: 22 },
        { wch: 18 },
        { wch: 14 },
        { wch: 22 }
    ];

    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws1, 'Detail_Transaksi');
    XLSX.utils.book_append_sheet(wb, ws2, 'Rekap_Per_Karyawan');

    const cleanDate = (tglMulai !== 'Semua' ? tglMulai : 'Semua').replace(/-/g, '');
    const filename = `Laporan_Lembur_CP_${deptObj.id.toUpperCase()}_${cleanDate}.xlsx`;
    XLSX.writeFile(wb, filename);

    // Toast notifikasi
    const toast = document.createElement('div');
    toast.className = 'fixed bottom-6 right-6 z-50 bg-emerald-600 text-white px-5 py-3.5 rounded-xl shadow-2xl flex items-center gap-3 text-sm font-semibold transition';
    toast.innerHTML = `<span>📗</span><span>File Excel <b>${filename}</b> berhasil diunduh!</span>`;
    document.body.appendChild(toast);
    setTimeout(() => { toast.style.opacity = '0'; setTimeout(() => toast.remove(), 400); }, 3500);
}

// ==========================================
// FITUR: EXPORT PRESENTASI POWERPOINT (.PPTX)
// ==========================================
async function exportPowerPointFormal() {
    const btn = document.getElementById('btnExportPpt');
    const originalText = btn ? btn.innerHTML : '';
    if (btn) {
        btn.disabled = true;
        btn.classList.add('opacity-75', 'cursor-wait');
        btn.innerHTML = `<span>⏳</span><span>Menyiapkan Slide PPT...</span>`;
    }

    try {
        if (typeof PptxGenJS === 'undefined') {
            throw new Error('Pustaka PptxGenJS belum siap dimuat. Silakan periksa koneksi atau muat ulang halaman.');
        }

        const pptx = new PptxGenJS();
        pptx.layout = 'LAYOUT_16x9';
        pptx.author = 'Management Information System';
        pptx.company = 'PT Charoen Pokphand Indonesia';

        const deptObj = getActiveDepartment();
        const tglMulai = (elTglMulai && elTglMulai.value) ? elTglMulai.value : 'Semua';
        const tglAkhir = (elTglAkhir && elTglAkhir.value) ? elTglAkhir.value : 'Semua';
        const periodeStr = `${tglMulai} s/d ${tglAkhir}`;
        const tanggalCetak = new Date().toLocaleDateString('id-ID', { day: '2-digit', month: 'long', year: 'numeric' });

        // Data tersaring saat ini
        const dataEkspor = (currentDataTersaringUtama && currentDataTersaringUtama.length > 0) 
            ? [...currentDataTersaringUtama] 
            : [...currentData.log];
        
        const totalJam = dataEkspor.reduce((sum, d) => sum + (d.ovt || 0), 0);
        const jamB = dataEkspor.filter(d => d.jenis_hari === 'B').reduce((sum, d) => sum + (d.ovt || 0), 0);
        const jamL = dataEkspor.filter(d => d.jenis_hari === 'L').reduce((sum, d) => sum + (d.ovt || 0), 0);
        const totalUang = dataEkspor.reduce((sum, d) => sum + (d.uang || 0), 0);
        const jumlahKaryawan = new Set(dataEkspor.map(d => d.nama)).size;
        const rataJam = jumlahKaryawan > 0 ? (totalJam / jumlahKaryawan).toFixed(1) : 0;

        // Peringkat Karyawan
        const empMap = {};
        dataEkspor.forEach(d => {
            if (!empMap[d.nama]) empMap[d.nama] = { nama: d.nama, jamB: 0, jamL: 0, total: 0, uang: 0 };
            if (d.jenis_hari === 'B') empMap[d.nama].jamB += d.ovt;
            if (d.jenis_hari === 'L') empMap[d.nama].jamL += d.ovt;
            empMap[d.nama].total += d.ovt;
            empMap[d.nama].uang += d.uang;
        });
        const topEmp = Object.values(empMap).sort((a, b) => b.total - a.total);

        // Hari & Jam Tersibuk
        const peakDayText = textPeakDay ? textPeakDay.textContent : 'Hari Kerja';
        const peakSlotText = textPeakSlot ? textPeakSlot.textContent : 'Pukul 17:00 - 21:00';

        // -------------------------------------------------------------
        // SLIDE 1: COVER PRESENTASI EKSEKUTIF (Clean Widescreen Layout)
        // -------------------------------------------------------------
        const slide1 = pptx.addSlide();
        slide1.background = { color: '0F172A' };

        // Top & Bottom Accent Bars
        slide1.addShape(pptx.shapes.RECTANGLE, { x: 0, y: 0, w: '100%', h: 0.12, fill: { color: '3B82F6' } });
        slide1.addShape(pptx.shapes.RECTANGLE, { x: 0, y: 5.50, w: '100%', h: 0.12, fill: { color: '0284C7' } });

        // Category Tagline
        slide1.addText('PT CHAROEN POKPHAND INDONESIA TBK • EASTERN REGION', {
            x: 0.8, y: 0.75, w: 8.4, h: 0.35,
            fontSize: 11, bold: true, color: '60A5FA', fontFace: 'Calibri'
        });

        // Main Title
        slide1.addText('LAPORAN EVALUASI & ANALISIS BIAYA LEMBUR', {
            x: 0.8, y: 1.15, w: 8.4, h: 0.95,
            fontSize: 24, bold: true, color: 'FFFFFF', fontFace: 'Calibri',
            margin: 0
        });

        // Subtitle Unit
        slide1.addText(`UNIT OPERASIONAL: DIVISI ${(deptObj && deptObj.name ? deptObj.name : 'PPIC').toUpperCase()}`, {
            x: 0.8, y: 2.15, w: 8.4, h: 0.35,
            fontSize: 13, bold: true, color: '38BDF8', fontFace: 'Calibri'
        });

        // Box Metadata
        slide1.addShape(pptx.shapes.RECTANGLE, {
            x: 0.8, y: 2.75, w: 8.4, h: 2.25,
            fill: { color: '1E293B' }, line: { color: '334155', width: 1 }, roundRadius: 0.08
        });

        slide1.addText([
            { text: '• Periode Evaluasi   : ', options: { bold: true, color: '94A3B8' } },
            { text: `${periodeStr}\n`, options: { bold: true, color: 'FFFFFF' } },
            { text: '• Personel Aktif     : ', options: { bold: true, color: '94A3B8' } },
            { text: `${jumlahKaryawan} Orang (${dataEkspor.length} Transaksi Lembur)\n`, options: { bold: true, color: 'FFFFFF' } },
            { text: '• Total Anggaran     : ', options: { bold: true, color: '94A3B8' } },
            { text: `${formatRupiah(totalUang)} (${totalJam.toFixed(1)} Jam Akumulasi)\n`, options: { bold: true, color: '34D399' } },
            { text: '• Tanggal Dokumen    : ', options: { bold: true, color: '94A3B8' } },
            { text: `${tanggalCetak} (Sistem Manajemen Lembur OVT)`, options: { color: 'CBD5E1' } }
        ], { x: 1.1, y: 2.95, w: 7.8, h: 1.85, fontSize: 11, fontFace: 'Calibri', lineSpacing: 22 });

        // -------------------------------------------------------------
        // SLIDE 2: RINGKASAN EKSEKUTIF & 4 KARTU KPI
        // -------------------------------------------------------------
        const slide2 = pptx.addSlide();
        slide2.background = { color: 'F8FAFC' };

        slide2.addText('RINGKASAN EKSEKUTIF & INDIKATOR KINERJA UTAMA (KPI)', {
            x: 0.8, y: 0.45, w: 8.4, h: 0.35,
            fontSize: 16, bold: true, color: '0F172A', fontFace: 'Calibri'
        });
        slide2.addText(`Ikhtisar serapan anggaran dan akumulasi jam lembur divisi ${deptObj ? deptObj.name : 'PPIC'}`, {
            x: 0.8, y: 0.80, w: 8.4, h: 0.25,
            fontSize: 10, color: '64748B', fontFace: 'Calibri'
        });

        // 4 KPI Cards (Total width fits inside 8.4 inches)
        const cards = [
            { label: 'TOTAL JAM LEMBUR', val: `${totalJam.toFixed(1)} Jam`, sub: `${jamB.toFixed(1)}j Biasa • ${jamL.toFixed(1)}j Libur`, border: '4F46E5', textClr: '4F46E5' },
            { label: 'TOTAL ANGGARAN', val: formatRupiah(totalUang), sub: 'Serapan Anggaran', border: '059669', textClr: '059669' },
            { label: 'PERSONEL AKTIF', val: `${jumlahKaryawan} Orang`, sub: `${dataEkspor.length} Transaksi`, border: 'D97706', textClr: 'D97706' },
            { label: 'RATA-RATA / ORANG', val: `${rataJam} Jam`, sub: 'Beban Rata-rata Tim', border: '0284C7', textClr: '0284C7' }
        ];

        const cardW = 1.95;
        const cardGap = 0.20;
        cards.forEach((c, idx) => {
            const xPos = 0.8 + (idx * (cardW + cardGap));
            slide2.addShape(pptx.shapes.RECTANGLE, {
                x: xPos, y: 1.15, w: cardW, h: 1.35,
                fill: { color: 'FFFFFF' }, line: { color: 'CBD5E1', width: 1 }, roundRadius: 0.08
            });
            slide2.addShape(pptx.shapes.RECTANGLE, {
                x: xPos, y: 1.15, w: cardW, h: 0.06, fill: { color: c.border }
            });
            slide2.addText(c.label, {
                x: xPos + 0.1, y: 1.28, w: cardW - 0.2, h: 0.25,
                fontSize: 8, bold: true, color: '64748B', fontFace: 'Calibri'
            });
            slide2.addText(c.val, {
                x: xPos + 0.1, y: 1.55, w: cardW - 0.2, h: 0.45,
                fontSize: 13, bold: true, color: c.textClr, fontFace: 'Calibri'
            });
            slide2.addText(c.sub, {
                x: xPos + 0.1, y: 2.05, w: cardW - 0.2, h: 0.35,
                fontSize: 8, color: '94A3B8', fontFace: 'Calibri'
            });
        });

        // Strategic Insights Box
        slide2.addShape(pptx.shapes.RECTANGLE, {
            x: 0.8, y: 2.65, w: 8.4, h: 2.45,
            fill: { color: 'FFFFFF' }, line: { color: 'CBD5E1', width: 1 }, roundRadius: 0.08
        });
        slide2.addText('POIN ANALISIS STRATEGIS & KESIMPULAN OPERASIONAL', {
            x: 1.05, y: 2.80, w: 7.9, h: 0.30,
            fontSize: 11, bold: true, color: '1E293B', fontFace: 'Calibri'
        });

        const porsiBiasa = totalJam > 0 ? ((jamB / totalJam) * 100).toFixed(1) : 0;
        const porsiLibur = totalJam > 0 ? ((jamL / totalJam) * 100).toFixed(1) : 0;
        const avgCostPerPerson = jumlahKaryawan > 0 ? Math.round(totalUang / jumlahKaryawan) : 0;

        slide2.addText([
            { text: '• Rasio Beban Kerja Hari: ', options: { bold: true, color: '1E293B' } },
            { text: `Lembur Hari Biasa ${porsiBiasa}% (${jamB.toFixed(1)} Jam), Hari Libur ${porsiLibur}% (${jamL.toFixed(1)} Jam).\n`, options: { color: '475569' } },
            { text: '• Waktu Puncak Sibuk: ', options: { bold: true, color: '1E293B' } },
            { text: `Berdasarkan Heatmap Matrix, ${peakDayText} dan ${peakSlotText}.\n`, options: { color: '475569' } },
            { text: '• Akumulasi Personel Tertinggi: ', options: { bold: true, color: '1E293B' } },
            { text: `${topEmp[0] ? topEmp[0].nama : '-'} dengan akumulasi ${topEmp[0] ? topEmp[0].total.toFixed(1) : 0} Jam.\n`, options: { color: '475569' } },
            { text: '• Rata-rata Biaya Tim: ', options: { bold: true, color: '1E293B' } },
            { text: `Pengeluaran rata-rata lembur sebesar Rp ${avgCostPerPerson.toLocaleString('id-ID')} per orang tervalidasi.`, options: { color: '475569' } }
        ], { x: 1.05, y: 3.15, w: 7.9, h: 1.85, fontSize: 9.5, fontFace: 'Calibri', lineSpacing: 18 });

        // -------------------------------------------------------------
        // SLIDE 3: TOP PERSONEL LEMBUR TERTINGGI
        // -------------------------------------------------------------
        const slide3 = pptx.addSlide();
        slide3.background = { color: 'F8FAFC' };

        slide3.addText('PERINGKAT PERSONEL DENGAN AKUMULASI LEMBUR TERTINGGI', {
            x: 0.8, y: 0.45, w: 8.4, h: 0.35,
            fontSize: 16, bold: true, color: '0F172A', fontFace: 'Calibri'
        });
        slide3.addText('Daftar karyawan dengan jam kerja lembur tertinggi untuk evaluasi rotasi tim', {
            x: 0.8, y: 0.80, w: 8.4, h: 0.25,
            fontSize: 10, color: '64748B', fontFace: 'Calibri'
        });

        const top5 = topEmp.slice(0, 6);
        const tableHeader = [
            { text: 'Rank', options: { bold: true, fill: '1E293B', color: 'FFFFFF', align: 'center' } },
            { text: 'Nama Karyawan', options: { bold: true, fill: '1E293B', color: 'FFFFFF' } },
            { text: 'Biasa', options: { bold: true, fill: '1E293B', color: 'FFFFFF', align: 'center' } },
            { text: 'Libur', options: { bold: true, fill: '1E293B', color: 'FFFFFF', align: 'center' } },
            { text: 'Total Jam', options: { bold: true, fill: '4F46E5', color: 'FFFFFF', align: 'center' } },
            { text: 'Porsi', options: { bold: true, fill: '1E293B', color: 'FFFFFF', align: 'center' } },
            { text: 'Estimasi Biaya', options: { bold: true, fill: '059669', color: 'FFFFFF', align: 'right' } }
        ];

        const tableRows = [tableHeader];
        top5.forEach((emp, idx) => {
            const share = totalJam > 0 ? ((emp.total / totalJam) * 100).toFixed(1) + '%' : '0%';
            const isZebra = idx % 2 === 1;
            const rowBg = isZebra ? 'F8FAFC' : 'FFFFFF';
            tableRows.push([
                { text: `#${idx + 1}`, options: { fill: rowBg, align: 'center', bold: true } },
                { text: emp.nama, options: { fill: rowBg, bold: true, color: '1E293B' } },
                { text: `${emp.jamB.toFixed(1)}j`, options: { fill: rowBg, align: 'center' } },
                { text: `${emp.jamL.toFixed(1)}j`, options: { fill: rowBg, align: 'center', color: 'DC2626' } },
                { text: `${emp.total.toFixed(1)}j`, options: { fill: rowBg, align: 'center', bold: true, color: '4F46E5' } },
                { text: share, options: { fill: rowBg, align: 'center' } },
                { text: formatRupiah(emp.uang), options: { fill: rowBg, align: 'right', bold: true, color: '059669' } }
            ]);
        });

        slide3.addTable(tableRows, {
            x: 0.8, y: 1.25, w: 8.4,
            colW: [0.7, 2.6, 0.9, 0.9, 1.0, 0.8, 1.5],
            fontSize: 9.5, fontFace: 'Calibri',
            rowH: 0.35, border: { pt: 0.5, color: 'CBD5E1' }
        });

        // -------------------------------------------------------------
        // SLIDE 4: BENCHMARK & KOMPARASI LINTAS DIVISI
        // -------------------------------------------------------------
        const slide4 = pptx.addSlide();
        slide4.background = { color: 'F8FAFC' };

        slide4.addText('BENCHMARK & KOMPARASI EFISIENSI LINTAS DIVISI', {
            x: 0.8, y: 0.45, w: 8.4, h: 0.35,
            fontSize: 16, bold: true, color: '0F172A', fontFace: 'Calibri'
        });
        slide4.addText('Perbandingan serapan lembur dan produktivitas antar unit bisnis wilayah timur', {
            x: 0.8, y: 0.80, w: 8.4, h: 0.25,
            fontSize: 10, color: '64748B', fontFace: 'Calibri'
        });

        const benchHeader = [
            { text: 'Departemen', options: { bold: true, fill: '1E293B', color: 'FFFFFF' } },
            { text: 'Personel', options: { bold: true, fill: '1E293B', color: 'FFFFFF', align: 'center' } },
            { text: 'Total Jam', options: { bold: true, fill: '4F46E5', color: 'FFFFFF', align: 'center' } },
            { text: 'Rata / Org', options: { bold: true, fill: '1E293B', color: 'FFFFFF', align: 'center' } },
            { text: 'Total Anggaran', options: { bold: true, fill: '059669', color: 'FFFFFF', align: 'right' } },
            { text: 'Status Efisiensi', options: { bold: true, fill: '1E293B', color: 'FFFFFF', align: 'center' } }
        ];

        const benchRows = [benchHeader];
        const deptList = typeof getDepartmentList === 'function' ? getDepartmentList() : [{ id: 'ppic', name: 'PPIC' }];
        deptList.forEach((dep, idx) => {
            const dData = (allDeptData && allDeptData[dep.id] && allDeptData[dep.id].log) ? allDeptData[dep.id].log : [];
            const depJam = dData.reduce((s, x) => s + (x.ovt || 0), 0);
            const depUang = dData.reduce((s, x) => s + (x.uang || 0), 0);
            const depPers = new Set(dData.map(x => x.nama)).size;
            const depRata = depPers > 0 ? (depJam / depPers).toFixed(1) : 0;
            const isZebra = idx % 2 === 1;
            const rowBg = isZebra ? 'F8FAFC' : 'FFFFFF';
            const statusBeban = depRata > 25 ? '⚠️ Beban Tinggi' : (depRata > 15 ? '🔵 Normal' : '🟢 Efisien');

            benchRows.push([
                { text: dep.name, options: { fill: rowBg, bold: true } },
                { text: `${depPers} Org`, options: { fill: rowBg, align: 'center' } },
                { text: `${depJam.toFixed(1)} Jam`, options: { fill: rowBg, align: 'center', bold: true, color: '4F46E5' } },
                { text: `${depRata} Jam`, options: { fill: rowBg, align: 'center' } },
                { text: formatRupiah(depUang), options: { fill: rowBg, align: 'right', bold: true, color: '059669' } },
                { text: statusBeban, options: { fill: rowBg, align: 'center', bold: true } }
            ]);
        });

        slide4.addTable(benchRows, {
            x: 0.8, y: 1.25, w: 8.4,
            colW: [2.0, 1.0, 1.4, 1.1, 1.6, 1.3],
            fontSize: 9.5, fontFace: 'Calibri',
            rowH: 0.35, border: { pt: 0.5, color: 'CBD5E1' }
        });

        // -------------------------------------------------------------
        // SLIDE 5: REKOMENDASI MANAJEMEN & PENUTUP (Tampilan Rapi & Muat)
        // -------------------------------------------------------------
        const slide5 = pptx.addSlide();
        slide5.background = { color: '0F172A' };

        slide5.addShape(pptx.shapes.RECTANGLE, { x: 0, y: 0, w: '100%', h: 0.12, fill: { color: '3B82F6' } });
        slide5.addShape(pptx.shapes.RECTANGLE, { x: 0, y: 5.50, w: '100%', h: 0.12, fill: { color: '0284C7' } });

        slide5.addText('TEMUAN AUDIT INPUT & REKOMENDASI TINDAKAN', {
            x: 0.8, y: 0.45, w: 8.4, h: 0.35,
            fontSize: 18, bold: true, color: 'FFFFFF', fontFace: 'Calibri'
        });
        slide5.addText('Rekomendasi strategis untuk pimpinan dalam mengoptimalkan produktivitas & biaya', {
            x: 0.8, y: 0.80, w: 8.4, h: 0.25,
            fontSize: 10, color: '94A3B8', fontFace: 'Calibri'
        });

        const actions = [
            {
                title: '1. PENGATURAN ROTASI SHIFT & K3',
                desc: 'Pemerataan beban kerja lembur pada karyawan dengan akumulasi jam tertinggi guna meminimalisir risiko kelelahan kerja (fatigue) dan menjaga produktivitas.',
                border: '38BDF8'
            },
            {
                title: '2. MONITORING JAM PUNCAK (PEAK HOURS)',
                desc: `Fokus pengendalian efisiensi di ${peakSlotText} guna menekan porsi lembur malam yang membutuhkan tarif penggantian ekstra.`,
                border: 'F59E0B'
            },
            {
                title: '3. PENERTIBAN SPL DIGITAL TERPADU',
                desc: 'Wajibkan simulasi biaya sebelum penugasan lembur lapangan disahkan oleh masing-masing supervisor unit kerja.',
                border: '34D399'
            }
        ];

        const actBoxH = 0.95;
        const actGap = 0.25;
        actions.forEach((act, idx) => {
            const yPos = 1.25 + (idx * (actBoxH + actGap));
            slide5.addShape(pptx.shapes.RECTANGLE, {
                x: 0.8, y: yPos, w: 8.4, h: actBoxH,
                fill: { color: '1E293B' }, line: { color: act.border, width: 1.2 }, roundRadius: 0.08
            });
            slide5.addText(act.title, {
                x: 1.05, y: yPos + 0.10, w: 7.9, h: 0.25,
                fontSize: 10.5, bold: true, color: act.border, fontFace: 'Calibri'
            });
            slide5.addText(act.desc, {
                x: 1.05, y: yPos + 0.35, w: 7.9, h: 0.50,
                fontSize: 9, color: 'CBD5E1', fontFace: 'Calibri'
            });
        });

        slide5.addText('Generated automatically by CP OVT Management System • PT Charoen Pokphand Indonesia', {
            x: 0.8, y: 5.15, w: 8.4, h: 0.25,
            fontSize: 8.5, color: '64748B', align: 'center', fontFace: 'Calibri'
        });

        // Unduh File PPTX
        const cleanDate = (tglMulai !== 'Semua' ? tglMulai : 'Semua').replace(/-/g, '');
        const deptIdStr = (deptObj && deptObj.id) ? deptObj.id.toUpperCase() : 'PPIC';
        const filename = `Presentasi_Lembur_CP_${deptIdStr}_${cleanDate}.pptx`;
        
        await pptx.writeFile({ fileName: filename });

        // Toast Konfirmasi Sukses
        const toast = document.createElement('div');
        toast.className = 'fixed bottom-6 right-6 z-50 bg-orange-600 text-white px-5 py-3.5 rounded-xl shadow-2xl flex items-center gap-3 text-sm font-semibold transition';
        toast.innerHTML = `<span>📊</span><span>File Presentasi PowerPoint <b>${filename}</b> berhasil diunduh!</span>`;
        document.body.appendChild(toast);
        setTimeout(() => { toast.style.opacity = '0'; setTimeout(() => toast.remove(), 400); }, 4000);
    } catch (err) {
        console.error('Error generating PowerPoint presentation:', err);
        alert('Gagal mengekspor PowerPoint: ' + (err.message || err));
    } finally {
        if (btn) {
            btn.disabled = false;
            btn.classList.remove('opacity-75', 'cursor-wait');
            btn.innerHTML = originalText;
        }
    }
}

// Event Listeners Export (Excel & PPT)
const btnExportExcel = document.getElementById('btnExportExcel');
const btnTableExportExcel = document.getElementById('btnTableExportExcel');
const btnExportPpt = document.getElementById('btnExportPpt');

if (btnExportExcel) btnExportExcel.addEventListener('click', exportExcelFormal);
if (btnTableExportExcel) btnTableExportExcel.addEventListener('click', exportExcelFormal);
if (btnExportPpt) btnExportPpt.addEventListener('click', exportPowerPointFormal);

// Event Listeners Multi-Filter & Search Tabel
const inputTableSearch = document.getElementById('inputTableSearch');
const filterTableJenisHari = document.getElementById('filterTableJenisHari');
const filterTableApproval = document.getElementById('filterTableApproval');
const filterTableModeAudit = document.getElementById('filterTableModeAudit');
const btnResetTableFilters = document.getElementById('btnResetTableFilters');

if (inputTableSearch) inputTableSearch.addEventListener('input', renderTabelUtama);
if (filterTableJenisHari) filterTableJenisHari.addEventListener('change', renderTabelUtama);
if (filterTableApproval) filterTableApproval.addEventListener('change', renderTabelUtama);
if (filterTableModeAudit) filterTableModeAudit.addEventListener('change', renderTabelUtama);
if (btnResetTableFilters) btnResetTableFilters.addEventListener('click', resetTableFilters);

// Event Listeners Tombol Audit & Filter Cepat Anomali
const btnToggleAuditAnomali = document.getElementById('btnToggleAuditAnomali');
const btnLihatHanyaAnomali = document.getElementById('btnLihatHanyaAnomali');
const btnLihatSemuaData = document.getElementById('btnLihatSemuaData');
const bannerAuditAnomali = document.getElementById('bannerAuditAnomali');

if (btnToggleAuditAnomali) {
    btnToggleAuditAnomali.addEventListener('click', () => {
        if (bannerAuditAnomali) {
            const isHidden = bannerAuditAnomali.classList.contains('hidden');
            if (isHidden) {
                bannerAuditAnomali.classList.remove('hidden');
                if (filterTableModeAudit) filterTableModeAudit.value = 'Anomali';
            } else {
                bannerAuditAnomali.classList.add('hidden');
                if (filterTableModeAudit) filterTableModeAudit.value = 'Semua';
            }
            renderTabelUtama();
        }
    });
}

if (btnLihatHanyaAnomali) {
    btnLihatHanyaAnomali.addEventListener('click', () => {
        if (filterTableModeAudit) filterTableModeAudit.value = 'Anomali';
        renderTabelUtama();
    });
}

if (btnLihatSemuaData) {
    btnLihatSemuaData.addEventListener('click', () => {
        if (filterTableModeAudit) filterTableModeAudit.value = 'Semua';
        renderTabelUtama();
    });
}

// Event Listeners Sort Header Tabel
const thSortTanggal = document.getElementById('thSortTanggal');
const thSortNama = document.getElementById('thSortNama');
const thSortJam = document.getElementById('thSortJam');
const thSortUang = document.getElementById('thSortUang');

if (thSortTanggal) thSortTanggal.addEventListener('click', () => setSortColumn('tanggal'));
if (thSortNama) thSortNama.addEventListener('click', () => setSortColumn('nama'));
if (thSortJam) thSortJam.addEventListener('click', () => setSortColumn('jam'));
if (thSortUang) thSortUang.addEventListener('click', () => setSortColumn('uang'));

// ==========================================
// FITUR DUA ARAH GOOGLE SPREADSHEET (CRUD)
// ==========================================

function updateDatalistKaryawan() {
    if (!listKaryawanDept) return;
    listKaryawanDept.innerHTML = '';
    const deptData = allDeptData[activeDeptId] || (typeof data_dashboard !== 'undefined' ? data_dashboard : null);
    const daftar = (deptData && deptData.karyawan) ? deptData.karyawan : [];
    daftar.forEach(k => {
        const opt = document.createElement('option');
        opt.value = k;
        listKaryawanDept.appendChild(opt);
    });
}

function hitungEstimasiInputLembur() {
    if (!inputLemburMulai || !inputLemburSelesai || !inputLemburJam || !inputLemburUang || !inputLemburJenisHari) return;
    
    // Auto-cek weekend dari tanggal jika ada
    if (inputLemburTanggal && inputLemburTanggal.value) {
        const parts = inputLemburTanggal.value.split('-');
        if (parts.length === 3) {
            const dt = new Date(parseInt(parts[0], 10), parseInt(parts[1], 10) - 1, parseInt(parts[2], 10));
            const day = dt.getDay(); // 0: Sun, 6: Sat
            if (inputLemburJenisHari.dataset.userModified !== 'true') {
                if (day === 0 || day === 6) {
                    inputLemburJenisHari.value = 'L';
                } else {
                    inputLemburJenisHari.value = 'B';
                }
            }
        }
    }

    const mulaiStr = inputLemburMulai.value.trim();
    const selesaiStr = inputLemburSelesai.value.trim();

    // Hitung durasi jam jika format HH:MM valid
    const matchM = mulaiStr.match(/^(\d{1,2})[:.](\d{2})$/);
    const matchS = selesaiStr.match(/^(\d{1,2})[:.](\d{2})$/);
    if (matchM && matchS) {
        const jamM = parseInt(matchM[1], 10) + parseInt(matchM[2], 10) / 60;
        const jamS = parseInt(matchS[1], 10) + parseInt(matchS[2], 10) / 60;
        let diff = jamS - jamM;
        if (diff < 0) diff += 24; // Cross midnight
        if (diff >= 0 && diff <= 24) {
            inputLemburJam.value = Math.round(diff * 10) / 10;
        }
    }

    const jam = parseFloat(inputLemburJam.value) || 0;
    const jenis = inputLemburJenisHari.value;
    const rate = jenis === 'L' ? 43000 : 32000;
    inputLemburUang.value = Math.round(jam * rate);
}

async function kirimWebhookGoogleSheets(action, item, oldItem = null, extraData = {}) {
    const dept = getActiveDepartment();
    if (!dept || !dept.webhook_url) {
        console.log('Webhook Google Spreadsheet tidak dikonfigurasi untuk departemen ini. Lewati sync online.');
        return { ok: true, skipped: true };
    }

    try {
        const payload = Object.assign({
            action: action,
            dept_id: dept.id,
            item: item,
            old_item: oldItem
        }, extraData);

        await fetch(dept.webhook_url, {
            method: 'POST',
            mode: 'no-cors',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        });

        console.log(`Webhook Google Sheets [${action}] berhasil dikirim ke: ${dept.webhook_url}`);
        return { ok: true };
    } catch (err) {
        console.warn('Gagal mengirim ke Webhook Apps Script:', err);
        return { ok: false, error: err.message };
    }
}

function bukaModalInputLembur(mode = 'create', item = null) {
    if (!modalFormLembur) return;

    updateDatalistKaryawan();
    if (modalLemburAlert) {
        modalLemburAlert.classList.add('hidden');
        modalLemburAlert.innerHTML = '';
    }
    if (inputLemburJenisHari) {
        inputLemburJenisHari.dataset.userModified = 'false';
    }

    const dept = getActiveDepartment();

    // Setup Webhook status banner in modal
    if (boxWebhookStatus && textWebhookTitle && textWebhookDesc) {
        if (dept && dept.webhook_url) {
            boxWebhookStatus.className = 'rounded-xl border border-emerald-500/30 bg-emerald-500/10 p-3 text-xs text-emerald-200 flex items-start gap-2';
            textWebhookTitle.textContent = '⚡ Sinkronisasi Dua Arah Aktif';
            textWebhookDesc.textContent = `Tersambung ke Google Spreadsheet [${dept.name}]. Data otomatis tembus ke Google Sheets online secara real-time.`;
        } else {
            boxWebhookStatus.className = 'rounded-xl border border-indigo-500/30 bg-indigo-500/10 p-3 text-xs text-indigo-200 flex items-start gap-2';
            textWebhookTitle.textContent = '💾 Mode Database Lokal Aktif';
            textWebhookDesc.textContent = `Data tersimpan langsung di server backend dashboard. (Opsional: Daftarkan link Webhook Google Apps Script di menu "Kelola Departemen" untuk sinkronisasi otomatis ke Google Spreadsheet online).`;
        }
    }

    if (mode === 'edit' && item) {
        inputLemburMode.value = 'edit';
        inputLemburOldItem.value = JSON.stringify(item);
        if (modalLemburJudul) modalLemburJudul.textContent = `Edit Data Lembur: ${item.nama}`;
        if (modalLemburSubjudul) modalLemburSubjudul.textContent = `Perbarui rincian transaksi lembur untuk ${dept.name}`;
        if (modalLemburIcon) modalLemburIcon.textContent = '✏️';

        inputLemburTanggal.value = item.tanggal_iso || '';
        inputLemburJenisHari.value = item.jenis_hari || 'B';
        inputLemburNama.value = item.nama || '';
        inputLemburMulai.value = item.mulai || '17:00';
        inputLemburSelesai.value = item.selesai || '20:00';
        inputLemburJam.value = item.ovt || 0;
        inputLemburUang.value = item.uang || 0;
        inputLemburSheet.value = item.sheet_name || '';
        inputLemburStatus.value = getApprovalStatus(item) || 'Pending';
        inputLemburKeterangan.value = item.keterangan || '';
        if (submitLemburText) submitLemburText.textContent = 'Perbarui Data Lembur';
    } else {
        inputLemburMode.value = 'create';
        inputLemburOldItem.value = '';
        if (modalLemburJudul) modalLemburJudul.textContent = `Input Lembur Cepat (${dept.name})`;
        if (modalLemburSubjudul) modalLemburSubjudul.textContent = 'Tambah lembur baru langsung ke dashboard & spreadsheet';
        if (modalLemburIcon) modalLemburIcon.textContent = '📝';

        const todayStr = new Date().toISOString().slice(0, 10);
        inputLemburTanggal.value = todayStr;
        inputLemburJenisHari.value = 'B';
        inputLemburNama.value = '';
        inputLemburMulai.value = '17:00';
        inputLemburSelesai.value = '20:00';
        inputLemburJam.value = 3;
        inputLemburUang.value = 96000;

        let latestSheet = '';
        if (currentDataTersaringUtama && currentDataTersaringUtama.length > 0) {
            latestSheet = currentDataTersaringUtama[0].sheet_name || '';
        }
        inputLemburSheet.value = latestSheet || 'LEMBUR MANUAL';
        inputLemburStatus.value = 'Pending';
        inputLemburKeterangan.value = '';
        if (submitLemburText) submitLemburText.textContent = 'Simpan Data Lembur';

        hitungEstimasiInputLembur();
    }

    modalFormLembur.classList.remove('hidden');
    inputLemburNama.focus();
}

function tutupModalInputLembur() {
    if (!modalFormLembur) return;
    modalFormLembur.classList.add('hidden');
}

async function simpanTransaksiLembur(e) {
    e.preventDefault();
    const mode = inputLemburMode.value;
    const tanggal = inputLemburTanggal.value;
    const jenisHari = inputLemburJenisHari.value;
    const nama = inputLemburNama.value.trim();
    const mulai = inputLemburMulai.value.trim();
    const selesai = inputLemburSelesai.value.trim();
    const ovt = parseFloat(inputLemburJam.value) || 0;
    const uang = parseInt(inputLemburUang.value, 10) || 0;
    const sheetName = inputLemburSheet.value.trim() || 'LEMBUR MANUAL';
    const keterangan = inputLemburKeterangan.value.trim();
    const statusApproval = inputLemburStatus.value;

    let oldItem = null;
    const oldItemRaw = inputLemburOldItem.value;
    if (oldItemRaw) {
        try { oldItem = JSON.parse(oldItemRaw); } catch (_) {}
    }

    const dObj = new Date(tanggal + 'T00:00:00');
    const namaBulan = ['Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun', 'Jul', 'Agu', 'Sep', 'Okt', 'Nov', 'Des'];
    const tglTampil = !isNaN(dObj.getTime()) 
        ? `${dObj.getDate()} ${namaBulan[dObj.getMonth()]} ${dObj.getFullYear()}` 
        : tanggal;

    const item = {
        sheet_name: sheetName,
        tanggal_iso: tanggal,
        tanggal_tampil: tglTampil,
        nama: nama,
        mulai: mulai,
        selesai: selesai,
        ovt: ovt,
        jenis_hari: jenisHari,
        uang: uang,
        keterangan: keterangan
    };

    if (submitLemburSpinner) submitLemburSpinner.classList.remove('hidden');
    if (btnSubmitLembur) btnSubmitLembur.disabled = true;
    if (submitLemburText) submitLemburText.textContent = 'Menyimpan...';

    try {
        const saveUrl = getBackendUrl('/api/overtime/save');
        const res = await fetch(saveUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                dept_id: activeDeptId,
                is_edit: mode === 'edit',
                item: item,
                old_item: oldItem
            })
        });

        const resJson = await res.json();
        if (!res.ok || !resJson.ok) {
            throw new Error(resJson.error || 'Gagal menyimpan ke server backend.');
        }

        const appKey = getApprovalKey(item);
        if (statusApproval) {
            approvalStatus[appKey] = statusApproval;
            saveApprovalStatus();
        }

        const dept = getActiveDepartment();
        let webhookMsg = '';
        if (dept && dept.webhook_url) {
            if (submitLemburText) submitLemburText.textContent = 'Sinkron ke Google Sheets...';
            await kirimWebhookGoogleSheets(mode === 'edit' ? 'update' : 'create', item, oldItem);
            webhookMsg = ' & disinkronkan ke Google Spreadsheet online';
        }

        modalLemburAlert.className = 'rounded-lg p-3 text-xs font-medium bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 block';
        modalLemburAlert.innerHTML = `🎉 Data lembur berhasil disimpan${webhookMsg}! Memperbarui dashboard...`;

        setTimeout(() => {
            tutupModalInputLembur();
            window.location.reload();
        }, 1200);

    } catch (err) {
        console.error('Simpan lembur error:', err);
        modalLemburAlert.className = 'rounded-lg p-3 text-xs font-medium bg-rose-500/20 text-rose-300 border border-rose-500/40 block';
        modalLemburAlert.innerHTML = `❌ Gagal menyimpan: ${err.message}`;
        if (submitLemburSpinner) submitLemburSpinner.classList.add('hidden');
        if (btnSubmitLembur) btnSubmitLembur.disabled = false;
        if (submitLemburText) submitLemburText.textContent = 'Simpan Data Lembur';
    }
}

async function konfirmasiHapusLembur(item) {
    if (!item) return;
    const pesan = `Hapus data lembur:\n• Karyawan: ${item.nama}\n• Tanggal: ${item.tanggal_tampil || item.tanggal_iso}\n• Jam: ${item.mulai} - ${item.selesai} (${item.ovt} jam)\n• Biaya: Rp ${(item.uang || 0).toLocaleString('id-ID')}\n\nApakah Anda yakin ingin menghapus data lembur ini?`;
    
    if (!confirm(pesan)) return;

    try {
        const deleteUrl = getBackendUrl('/api/overtime/delete');
        const res = await fetch(deleteUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                dept_id: activeDeptId,
                item: item
            })
        });

        const resJson = await res.json();
        if (!res.ok || !resJson.ok) {
            throw new Error(resJson.error || 'Gagal menghapus data dari server backend.');
        }

        const dept = getActiveDepartment();
        if (dept && dept.webhook_url) {
            await kirimWebhookGoogleSheets('delete', item);
        }

        alert('Data lembur berhasil dihapus.');
        window.location.reload();
    } catch (err) {
        console.error('Hapus lembur error:', err);
        alert(`Gagal menghapus: ${err.message}`);
    }
}

// Event Listeners Input Lembur
if (btnTambahLembur) btnTambahLembur.addEventListener('click', () => bukaModalInputLembur('create'));
if (btnTutupModalLembur) btnTutupModalLembur.addEventListener('click', tutupModalInputLembur);
if (btnBatalInputLembur) btnBatalInputLembur.addEventListener('click', tutupModalInputLembur);
if (formInputLembur) formInputLembur.addEventListener('submit', simpanTransaksiLembur);

[inputLemburTanggal, inputLemburMulai, inputLemburSelesai].forEach(inp => {
    if (inp) {
        inp.addEventListener('input', hitungEstimasiInputLembur);
        inp.addEventListener('change', hitungEstimasiInputLembur);
    }
});

if (inputLemburJenisHari) {
    inputLemburJenisHari.addEventListener('change', () => {
        inputLemburJenisHari.dataset.userModified = 'true';
        const jam = parseFloat(inputLemburJam.value) || 0;
        const rate = inputLemburJenisHari.value === 'L' ? 43000 : 32000;
        inputLemburUang.value = Math.round(jam * rate);
    });
}

if (inputLemburJam) {
    inputLemburJam.addEventListener('input', () => {
        const jam = parseFloat(inputLemburJam.value) || 0;
        const rate = inputLemburJenisHari.value === 'L' ? 43000 : 32000;
        inputLemburUang.value = Math.round(jam * rate);
    });
}

// ====================================================
// FITUR BUKA PERIODE SPL MINGGUAN BARU (GOOGLE SHEETS)
// ====================================================

function hitungPeriodeMingguBerikutnya() {
    let maxDate = null;
    const deptData = allDeptData[activeDeptId] || (typeof data_dashboard !== 'undefined' ? data_dashboard : null);
    if (deptData && deptData.log && deptData.log.length > 0) {
        deptData.log.forEach(row => {
            if (row.tanggal_iso) {
                const d = new Date(row.tanggal_iso + 'T00:00:00');
                if (!isNaN(d.getTime())) {
                    if (!maxDate || d > maxDate) maxDate = d;
                }
            }
        });
    }

    if (!maxDate) maxDate = new Date();

    // Dapatkan hari Senin berikutnya setelah maxDate
    const hari = maxDate.getDay(); // 0 = Minggu, 1 = Senin, ...
    const selisihKeSenin = (8 - hari) % 7 || 7;
    const nextSenin = new Date(maxDate);
    nextSenin.setDate(maxDate.getDate() + selisihKeSenin);

    const nextMinggu = new Date(nextSenin);
    nextMinggu.setDate(nextSenin.getDate() + 6);

    const pad = (n) => String(n).padStart(2, '0');
    const isoSenin = `${nextSenin.getFullYear()}-${pad(nextSenin.getMonth() + 1)}-${pad(nextSenin.getDate())}`;
    const isoMinggu = `${nextMinggu.getFullYear()}-${pad(nextMinggu.getMonth() + 1)}-${pad(nextMinggu.getDate())}`;

    const namaBulanBesar = [
        'JANUARI', 'FEBRUARI', 'MARET', 'APRIL', 'MEI', 'JUNI',
        'JULI', 'AGUSTUS', 'SEPTEMBER', 'OKTOBER', 'NOVEMBER', 'DESEMBER'
    ];

    let labelPeriode = '';
    if (nextSenin.getMonth() === nextMinggu.getMonth()) {
        labelPeriode = `${nextSenin.getDate()} - ${nextMinggu.getDate()} ${namaBulanBesar[nextMinggu.getMonth()]} ${nextMinggu.getFullYear()}`;
    } else {
        labelPeriode = `${nextSenin.getDate()} ${namaBulanBesar[nextSenin.getMonth()]} - ${nextMinggu.getDate()} ${namaBulanBesar[nextMinggu.getMonth()]} ${nextMinggu.getFullYear()}`;
    }

    return {
        isoStart: isoSenin,
        isoEnd: isoMinggu,
        labelPeriod: labelPeriode
    };
}

function bukaModalPeriodeBaru() {
    if (!modalPeriodeBaru) return;

    if (modalPeriodeAlert) {
        modalPeriodeAlert.classList.add('hidden');
        modalPeriodeAlert.innerHTML = '';
    }

    const dept = getActiveDepartment();
    const infoNext = hitungPeriodeMingguBerikutnya();

    if (inputPeriodeMulai) inputPeriodeMulai.value = infoNext.isoStart;
    if (inputPeriodeSelesai) inputPeriodeSelesai.value = infoNext.isoEnd;
    if (inputPeriodeNama) inputPeriodeNama.value = infoNext.labelPeriod;
    if (inputPeriodeDept) inputPeriodeDept.value = dept.name;

    modalPeriodeBaru.classList.remove('hidden');
    if (inputPeriodeNama) inputPeriodeNama.focus();
}

function tutupModalPeriodeBaru() {
    if (!modalPeriodeBaru) return;
    modalPeriodeBaru.classList.add('hidden');
}

async function simpanPeriodeBaru(e) {
    e.preventDefault();
    const periodName = inputPeriodeNama.value.trim();
    const startDate = inputPeriodeMulai.value;
    const endDate = inputPeriodeSelesai.value;
    const spvName = inputPeriodeSpv.value.trim();
    const deptName = inputPeriodeDept.value.trim();

    if (!periodName) {
        modalPeriodeAlert.className = 'rounded-lg p-3 text-xs font-medium bg-rose-500/20 text-rose-300 border border-rose-500/40 block';
        modalPeriodeAlert.textContent = 'Nama tab periode SPL wajib diisi.';
        return;
    }

    const dept = getActiveDepartment();
    if (!dept || !dept.webhook_url) {
        modalPeriodeAlert.className = 'rounded-lg p-3 text-xs font-medium bg-amber-500/20 text-amber-300 border border-amber-500/40 block';
        modalPeriodeAlert.innerHTML = '⚠️ Link Webhook Google Spreadsheet belum terpasang untuk departemen ini. Silakan daftarkan link Webhook di menu <b>"Kelola Departemen"</b> terlebih dahulu agar tab baru bisa dibuat otomatis di Google Sheets.';
        return;
    }

    if (submitPeriodeSpinner) submitPeriodeSpinner.classList.remove('hidden');
    if (btnSubmitPeriode) btnSubmitPeriode.disabled = true;
    if (submitPeriodeText) submitPeriodeText.textContent = 'Membuat Tab di Google Sheets...';

    try {
        const payloadExtra = {
            period_name: periodName,
            start_date: startDate,
            end_date: endDate,
            spv_name: spvName,
            dept_name: deptName
        };

        const res = await kirimWebhookGoogleSheets('create_sheet', null, null, payloadExtra);
        if (!res.ok) {
            throw new Error(res.error || 'Gagal mengirim perintah ke Webhook.');
        }

        modalPeriodeAlert.className = 'rounded-lg p-3 text-xs font-medium bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 block';
        modalPeriodeAlert.innerHTML = `🎉 <b>Berhasil!</b> Tab periode baru <b>"${periodName}"</b> telah dibuat di Google Spreadsheet lengkap dengan format resmi PPIC, nomor urut direset ke 1, dan kotak tanda tangan rapi!`;

        if (inputLemburSheet) inputLemburSheet.value = periodName;

        setTimeout(() => {
            tutupModalPeriodeBaru();
            if (typeof refreshDataFromPython === 'function') {
                refreshDataFromPython();
            } else {
                window.location.reload();
            }
        }, 1800);

    } catch (err) {
        console.error('Create sheet error:', err);
        modalPeriodeAlert.className = 'rounded-lg p-3 text-xs font-medium bg-rose-500/20 text-rose-300 border border-rose-500/40 block';
        modalPeriodeAlert.innerHTML = `❌ Gagal membuat tab baru: ${err.message}`;
        if (submitPeriodeSpinner) submitPeriodeSpinner.classList.add('hidden');
        if (btnSubmitPeriode) btnSubmitPeriode.disabled = false;
        if (submitPeriodeText) submitPeriodeText.textContent = 'Buat Tab Baru di Spreadsheet';
    }
}

// Event Listeners Buka Periode Baru
if (btnBukaPeriodeBaru) btnBukaPeriodeBaru.addEventListener('click', bukaModalPeriodeBaru);
if (btnTutupModalPeriode) btnTutupModalPeriode.addEventListener('click', tutupModalPeriodeBaru);
if (btnBatalPeriode) btnBatalPeriode.addEventListener('click', tutupModalPeriodeBaru);
if (formPeriodeBaru) formPeriodeBaru.addEventListener('submit', simpanPeriodeBaru);

[inputPeriodeMulai, inputPeriodeSelesai].forEach(inp => {
    if (inp) {
        inp.addEventListener('change', () => {
            if (inputPeriodeMulai.value && inputPeriodeSelesai.value) {
                const s = new Date(inputPeriodeMulai.value + 'T00:00:00');
                const e = new Date(inputPeriodeSelesai.value + 'T00:00:00');
                const namaBulanBesar = [
                    'JANUARI', 'FEBRUARI', 'MARET', 'APRIL', 'MEI', 'JUNI',
                    'JULI', 'AGUSTUS', 'SEPTEMBER', 'OKTOBER', 'NOVEMBER', 'DESEMBER'
                ];
                if (!isNaN(s.getTime()) && !isNaN(e.getTime())) {
                    if (s.getMonth() === e.getMonth()) {
                        inputPeriodeNama.value = `${s.getDate()} - ${e.getDate()} ${namaBulanBesar[e.getMonth()]} ${e.getFullYear()}`;
                    } else {
                        inputPeriodeNama.value = `${s.getDate()} ${namaBulanBesar[s.getMonth()]} - ${e.getDate()} ${namaBulanBesar[e.getMonth()]} ${e.getFullYear()}`;
                    }
                }
            }
        });
    }
});

// Jalankan Inisialisasi Departemen saat halaman dimuat
initDepartemen();