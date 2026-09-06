// ============================================================
// CẨM NANG TOÀN NĂNG - APP.JS
// ============================================================

// ============================================================
// DỮ LIỆU CÁC DANH MỤC
// ============================================================
const categories = {
    tool: {
        icon: 'fa-tools',
        name: 'Công cụ',
        items: [
            { icon: 'fa-file-pdf', title: 'iLovePDF', url: 'https://www.ilovepdf.com/' },
            { icon: 'fa-image', title: 'PNGTree', url: 'https://vi.pngtree.com/' },
            { icon: 'fa-arrows-rotate', title: 'Convertio', url: 'https://convertio.co/vn/' }
        ]
    },
    ai: {
        icon: 'fa-robot',
        name: 'AI Phổ thông',
        items: [
            { icon: 'fa-brain', title: 'ChatGPT', url: 'https://chatgpt.com/' },
            { icon: 'fa-star', title: 'Gemini', url: 'https://gemini.google.com/app' },
            { icon: 'fa-book', title: 'NotebookLM', url: 'https://notebook.google.com/' }
        ]
    },
    'ai-utility': {
        icon: 'fa-wand-magic-sparkles',
        name: 'AI Tiện ích',
        items: [
            { icon: 'fa-user-graduate', title: 'Ông Lão Tử', url: 'https://chatgpt.com/g/g-68d6b31640ec8191b945e7a0d7e876b0-ong-lao-tu' },
            { icon: 'fa-graduation-cap', title: 'AI Học Trí Tuệ', url: 'https://chatgpt.com/g/g-9yBS1MigT-ai-hoc-tri-tue' },
            { icon: 'fa-language', title: 'Học Ngoại Ngữ', url: 'https://chatgpt.com/g/g-67d79e355a948191a84e2d1b589d6a7d-hoc-ngoai-ngu-tieng-anh-trung-nhat-han' },
            { icon: 'fa-pen-fancy', title: 'Trợ lý Viết Bài MXH', url: 'https://chatgpt.com/g/g-67d65b01aab88191a708773c20ff4a1c-tro-ly-viet-bai-mang-xa-hoi-velo' }
        ]
    },
    search: {
        icon: 'fa-search-location',
        name: 'Tra cứu',
        items: [
            { icon: 'fa-mobile-screen', title: 'IMEI.info', url: 'https://www.imei.info/' },
            { icon: 'fa-magnifying-glass', title: 'IMEICheck', url: 'https://imeicheck.com/vi/kiem-tra-imei' },
            { icon: 'fa-map-location-dot', title: 'MultiCellID', url: 'https://www.multicellid.com/dangnhap.php' },
            { icon: 'fa-location-dot', title: 'FindCellID', url: 'https://findcellid.com/' },
            { icon: 'fa-signal', title: 'CellID.co', url: 'https://cellid.co/cell' }
        ]
    },
    utility: {
        icon: 'fa-bolt',
        name: 'Tiện ích',
        items: [
            { icon: 'fa-video', title: 'YouTube', url: 'https://www.youtube.com' },
            { icon: 'fa-cloud-sun', title: 'Thời tiết NB', url: 'https://coccoc.com/search?query=th%E1%BB%9Di+ti%E1%BA%BFt+ninh+binh' },
            { icon: 'fa-moon', title: 'Lịch âm', url: 'https://coccoc.com/search?query=l%E1%BB%8Bch+%C3%A2m' }
        ]
    },
    calculator: {
        icon: 'fa-calculator',
        name: 'Tính toán',
        isCalculator: true
    },
    route: {
        icon: 'fa-route',
        name: 'Lộ trình',
        isRoute: true
    },
    'search-data': {
        icon: 'fa-database',
        name: 'Tra cứu dữ liệu',
        isSearchData: true
    }
};

// ============================================================
// RENDER TAB
// ============================================================
function renderTab(tabId) {
    const container = document.getElementById('tabContent');
    const category = categories[tabId];
    if (!category) return;

    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.classList.toggle('active', btn.dataset.tab === tabId);
    });

    if (category.isCalculator) {
        container.innerHTML = renderCalculator();
        attachCalculatorEvents();
        return;
    }

    if (category.isRoute) {
        container.innerHTML = renderRoute();
        return;
    }

    if (category.isSearchData) {
        container.innerHTML = renderSearchData();
        setTimeout(loadData, 300);
        return;
    }

    container.innerHTML = `
        <div class="tab-panel active">
            <div class="category">
                <div class="category-header">
                    <span class="cat-icon"><i class="fas ${category.icon}"></i></span>
                    <h2>${category.name}</h2>
                    <span class="count">${category.items.length}</span>
                </div>
                <div class="card-grid">
                    ${category.items.map(item => `
                        <a href="${item.url}" target="_blank" rel="noopener noreferrer" class="card">
                            <span class="card-icon"><i class="fas ${item.icon}"></i></span>
                            <span class="card-title">${item.title}</span>
                        </a>
                    `).join('')}
                </div>
            </div>
        </div>
    `;
}

// ============================================================
// RENDER CALCULATOR
// ============================================================
function renderCalculator() {
    return `
        <div class="tab-panel active">
            <div class="calculator-container">
                <div class="calculator-header">
                    <span class="calc-icon">🧮</span>
                    <h2>Công cụ tính toán</h2>
                    <p class="calc-desc">Chọn chức năng và nhập dữ liệu</p>
                </div>

                <div class="calc-mode-selector">
                    <button class="mode-btn active" data-mode="formula" onclick="switchMode('formula')">
                        📐 Chuyển Cell - Dec
                    </button>
                    <button class="mode-btn" data-mode="hex" onclick="switchMode('hex')">
                        🔢 Hex → Dec
                    </button>
                </div>

                <div id="formulaMode" class="mode-panel active">
                    <div class="calc-form">
                        <div class="form-group">
                            <label for="inputX">Nhập X (≥ 6 chữ số):</label>
                            <input type="text" id="inputX" placeholder="VD: 1234567890" />
                            <button class="btn btn-primary" onclick="calculate()">🧮 Tính</button>
                            <button class="btn btn-secondary" onclick="clearResult()">🔄 Xóa</button>
                        </div>
                    </div>
                    <div id="resultContainer" style="display: none;">
                        <div class="result-grid">
                            <div class="result-card"><div class="result-label">📊 KQ1</div><div class="result-value" id="result1">0</div></div>
                            <div class="result-card"><div class="result-label">📊 KQ2</div><div class="result-value" id="result2">0</div></div>
                            <div class="result-card"><div class="result-label">📊 KQ3</div><div class="result-value" id="result3">0</div></div>
                            <div class="result-card"><div class="result-label">📊 KQ4</div><div class="result-value" id="result4">0</div></div>
                        </div>
                    </div>
                </div>

                <div id="hexMode" class="mode-panel" style="display:none;">
                    <div class="calc-form">
                        <div class="form-group">
                            <label for="inputHex">Nhập số thập lục phân (Hex):</label>
                            <input type="text" id="inputHex" placeholder="VD: 1A, FF, ABCD" style="text-transform:uppercase;" />
                            <button class="btn btn-primary" onclick="convertHexToDec()">🔄 Đổi sang Dec</button>
                            <button class="btn btn-secondary" onclick="clearHexResult()">🔄 Xóa</button>
                        </div>
                    </div>
                    <div id="hexResultContainer" style="display: none;">
                        <div class="result-grid" style="grid-template-columns: 1fr 1fr;">
                            <div class="result-card" style="grid-column: 1 / -1;">
                                <div class="result-label">📥 Hex (đầu vào)</div>
                                <div class="result-value" id="hexInputDisplay" style="font-size:20px; color:#3b82f6;">-</div>
                            </div>
                            <div class="result-card"><div class="result-label">📊 Thập phân</div><div class="result-value" id="decResult">0</div></div>
                            <div class="result-card"><div class="result-label">📊 Nhị phân</div><div class="result-value" id="binResult" style="font-size:18px;">0</div></div>
                        </div>
                        <div class="calc-detail" id="hexDetailInfo"></div>
                    </div>
                </div>
            </div>
        </div>
    `;
}

// ============================================================
// CALCULATOR EVENTS
// ============================================================
function attachCalculatorEvents() {
    const inputX = document.getElementById('inputX');
    if (inputX) inputX.addEventListener('keypress', e => { if (e.key === 'Enter') calculate(); });
    const inputHex = document.getElementById('inputHex');
    if (inputHex) inputHex.addEventListener('keypress', e => { if (e.key === 'Enter') convertHexToDec(); });
}

window.switchMode = function(mode) {
    document.querySelectorAll('.mode-btn').forEach(btn => btn.classList.toggle('active', btn.dataset.mode === mode));
    document.getElementById('formulaMode').style.display = mode === 'formula' ? 'block' : 'none';
    document.getElementById('hexMode').style.display = mode === 'hex' ? 'block' : 'none';
};

window.calculate = function() {
    const input = document.getElementById('inputX');
    if (!input) return;
    const X = input.value.trim();
    if (X.length < 6) { alert('⚠️ X phải có ít nhất 6 chữ số!'); input.focus(); return; }
    if (!/^\d+$/.test(X)) { alert('⚠️ Vui lòng chỉ nhập số!'); input.focus(); return; }

    const a1 = Number(X.slice(-5)), b1 = Number(X.slice(0, -5));
    const kq1 = b1 * 65536 + a1;
    const a2 = Number(X.slice(-4)), b2 = Number(X.slice(0, -4));
    const kq2 = b2 * 1048576 + a2;
    const kq3 = kq1;
    const a4 = Number(X.slice(-5)), b4 = Number(X.slice(0, -5));
    const kq4 = b4 * 1048576 + a4;

    document.getElementById('result1').textContent = kq1.toString();
    document.getElementById('result2').textContent = kq2.toString();
    document.getElementById('result3').textContent = kq3.toString();
    document.getElementById('result4').textContent = kq4.toString();
    document.getElementById('resultContainer').style.display = 'block';
};

window.clearResult = function() {
    document.getElementById('inputX').value = '';
    document.getElementById('resultContainer').style.display = 'none';
    document.getElementById('inputX').focus();
};

window.convertHexToDec = function() {
    const input = document.getElementById('inputHex');
    if (!input) return;
    const hexStr = input.value.trim().toUpperCase();
    if (!hexStr) { alert('⚠️ Vui lòng nhập số thập lục phân!'); input.focus(); return; }
    if (!/^[0-9A-F]+$/.test(hexStr)) { alert('⚠️ Chỉ nhập 0-9 và A-F!'); input.focus(); return; }

    const decValue = parseInt(hexStr, 16);
    const binValue = decValue.toString(2);

    document.getElementById('hexInputDisplay').textContent = hexStr;
    document.getElementById('decResult').textContent = decValue.toString();
    document.getElementById('binResult').textContent = binValue;
    document.getElementById('hexDetailInfo').innerHTML = `
        <div style="display:grid; grid-template-columns:1fr 1fr; gap:12px; margin-top:16px; padding:16px; background:#f8fafc; border-radius:8px; font-size:14px;">
            <div><strong>🔢 Hex:</strong> ${hexStr}</div>
            <div><strong>📊 Dec:</strong> ${decValue.toString()}</div>
            <div><strong>📘 Bin:</strong> ${binValue}</div>
            <div><strong>🔢 Số chữ số:</strong> ${hexStr.length} ký tự Hex</div>
        </div>
    `;
    document.getElementById('hexResultContainer').style.display = 'block';
};

window.clearHexResult = function() {
    document.getElementById('inputHex').value = '';
    document.getElementById('hexResultContainer').style.display = 'none';
    document.getElementById('inputHex').focus();
};

// ============================================================
// ROUTE - RENDER
// ============================================================
function renderRoute() {
    const points = getRoutePoints();
    return `
        <div class="tab-panel active">
            <div class="route-container">
                <div class="route-header">
                    <span class="route-icon">📍</span>
                    <h2>Lộ trình di chuyển</h2>
                    <p class="route-desc">Nhập các điểm đến, sau đó xem trên Google Earth</p>
                </div>

                <div class="route-form">
                    <div class="route-inputs">
                        <input type="text" id="routeLat" placeholder="Vĩ độ (VD: 21.0285)" />
                        <input type="text" id="routeLng" placeholder="Kinh độ (VD: 105.8542)" />
                        <input type="text" id="routeNote" placeholder="Ghi chú (tùy chọn)" />
                        <button class="btn btn-primary" onclick="addRoutePoint()">➕ Thêm điểm</button>
                    </div>
                </div>

                <div id="routeList">
                    ${points.length === 0 ? '<p class="route-empty">Chưa có điểm nào. Hãy thêm điểm đầu tiên!</p>' : ''}
                    <ul class="route-points">
                        ${points.map((p, index) => `
                            <li class="route-point" data-index="${index}">
                                <span class="route-stt">${index + 1}</span>
                                <span class="route-note">${p.note || ''}</span>
                                <button class="btn-remove" onclick="removeRoutePoint(${index})">✕</button>
                            </li>
                        `).join('')}
                    </ul>
                </div>

                <div class="route-actions">
                    <button class="btn btn-primary" onclick="buildKML()" ${points.length < 2 ? 'disabled' : ''}>
                        🌍 Xem trên Google Earth
                    </button>
                    <button class="btn btn-secondary" onclick="clearAllRoutePoints()">🗑️ Xóa tất cả</button>
                </div>
            </div>
        </div>
    `;
}

// ============================================================
// ROUTE - LƯU TRỮ
// ============================================================
function getRoutePoints() {
    return JSON.parse(localStorage.getItem('routePoints')) || [];
}
function saveRoutePoints(points) {
    localStorage.setItem('routePoints', JSON.stringify(points));
}
function renderRouteTab() {
    const container = document.getElementById('tabContent');
    container.innerHTML = renderRoute();
}

window.addRoutePoint = function() {
    const latInput = document.getElementById('routeLat');
    const lngInput = document.getElementById('routeLng');
    const noteInput = document.getElementById('routeNote');
    const lat = parseFloat(latInput.value.trim());
    const lng = parseFloat(lngInput.value.trim());
    const note = noteInput.value.trim();

    if (isNaN(lat) || isNaN(lng)) { alert('⚠️ Vui lòng nhập đúng vĩ độ và kinh độ!'); return; }
    if (lat < -90 || lat > 90 || lng < -180 || lng > 180) { alert('⚠️ Vĩ độ từ -90 đến 90, kinh độ từ -180 đến 180!'); return; }

    const points = getRoutePoints();
    points.push({ lat, lng, note });
    saveRoutePoints(points);
    renderRouteTab();
};

window.removeRoutePoint = function(index) {
    const points = getRoutePoints();
    points.splice(index, 1);
    saveRoutePoints(points);
    renderRouteTab();
};

window.clearAllRoutePoints = function() {
    if (confirm('Bạn có chắc muốn xóa tất cả điểm?')) {
        saveRoutePoints([]);
        renderRouteTab();
    }
};

// ============================================================
// TẠO FILE KML
// ============================================================
window.buildKML = function() {
    const points = getRoutePoints();
    if (points.length < 2) {
        alert('⚠️ Cần ít nhất 2 điểm để tạo lộ trình!');
        return;
    }

    let kml = `<?xml version="1.0" encoding="UTF-8"?>
<kml xmlns="http://www.opengis.net/kml/2.2">
  <Document>
    <name>Lộ trình của tôi</name>
    
    <Style id="waypointStyle">
      <IconStyle>
        <scale>1.2</scale>
        <Icon>
          <href>http://maps.google.com/mapfiles/kml/pushpin/red-pushpin.png</href>
        </Icon>
      </IconStyle>
      <LabelStyle>
        <color>ffffffff</color>
        <scale>1.4</scale>
        <colorMode>normal</colorMode>
      </LabelStyle>
    </Style>
    
    <Style id="lineStyle">
      <LineStyle>
        <color>ffffffff</color>
        <width>5</width>
      </LineStyle>
    </Style>`;

    points.forEach((p, index) => {
        const stt = index + 1;
        const label = p.note && p.note.trim() !== '' ? `${stt}. ${p.note}` : `${stt}`;
        kml += `
    <Placemark>
      <name>${label}</name>
      <styleUrl>#waypointStyle</styleUrl>
      <Point>
        <coordinates>${p.lng},${p.lat},0</coordinates>
      </Point>
    </Placemark>`;
    });

    kml += `
    <Placemark>
      <name>Đường chim bay</name>
      <styleUrl>#lineStyle</styleUrl>
      <LineString>
        <tessellate>1</tessellate>
        <coordinates>`;
    
    points.forEach(p => {
        kml += `
          ${p.lng},${p.lat},0`;
    });

    kml += `
        </coordinates>
      </LineString>
    </Placemark>
  </Document>
</kml>`;

    const blob = new Blob([kml], { type: 'application/vnd.google-earth.kml+xml' });
    const url = URL.createObjectURL(blob);
    
    const link = document.createElement('a');
    link.href = url;
    link.download = `lo_trinh_${new Date().toISOString().slice(0,10)}.kml`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    setTimeout(() => URL.revokeObjectURL(url), 1000);
    
    alert('✅ Đã tạo file KML! Vui lòng mở file vừa tải xuống bằng Google Earth để xem lộ trình.');
};

// ============================================================
// SEARCH DATA - RENDER
// ============================================================
function renderSearchData() {
    return `
        <div class="tab-panel active">
            <div class="search-data-container">
                <div class="search-data-header">
                    <span class="search-icon">📡</span>
                    <h2>Tra cứu Cell ID</h2>
                    <p class="search-desc">Nhập MNC, LAC, Cell để tìm kiếm (có thể để trống 1 hoặc nhiều điều kiện)</p>
                    <p class="search-status" id="dataStatus" style="font-size:13px;color:#94a3b8;margin-top:4px;">
                        <i class="fas fa-spinner fa-spin"></i> Đang tải dữ liệu...
                    </p>
                </div>

                <div class="search-filters">
                    <div class="filter-group">
                        <label for="filterMNC">MNC</label>
                        <input type="text" id="filterMNC" placeholder="VD: 01, 02..." oninput="searchData()" />
                    </div>
                    <div class="filter-group">
                        <label for="filterLAC">LAC</label>
                        <input type="text" id="filterLAC" placeholder="VD: 12345..." oninput="searchData()" />
                    </div>
                    <div class="filter-group">
                        <label for="filterCell">Cell</label>
                        <input type="text" id="filterCell" placeholder="VD: 123456..." oninput="searchData()" />
                    </div>
                    <div class="filter-actions">
                        <button class="btn btn-secondary" onclick="clearFilters()">
                            <i class="fas fa-undo"></i> Xóa bộ lọc
                        </button>
                    </div>
                </div>

                <div id="searchResult">
                    <div class="search-stats" id="searchStats">
                        <span><i class="fas fa-database"></i> Tổng: <strong id="totalCount">0</strong> dòng</span>
                        <span><i class="fas fa-filter"></i> Hiển thị: <strong id="filteredCount">0</strong> dòng</span>
                    </div>
                    <div class="table-wrapper">
                        <table class="data-table" id="dataTable">
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>MNC</th>
                                    <th>LAC</th>
                                    <th>Cell</th>
                                    <th>Tọa độ</th>
                                </tr>
                            </thead>
                            <tbody id="tableBody">
                                <tr>
                                    <td colspan="5" style="text-align:center;padding:40px;color:#94a3b8;">
                                        <i class="fas fa-spinner fa-spin" style="font-size:30px;display:block;margin-bottom:10px;"></i>
                                        Đang tải dữ liệu...
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <div class="pagination" id="pagination"></div>
                </div>
            </div>
        </div>
    `;
}

// ============================================================
// BIẾN TOÀN CỤC CHO SEARCH DATA
// ============================================================
let fullData = [];
let filteredData = [];
let currentPage = 1;
const pageSize = 50;
let isDataLoaded = false;

// ============================================================
// LOAD DỮ LIỆU TỪ FILE JSON
// ============================================================
async function loadData() {
    const statusEl = document.getElementById('dataStatus');
    const tbody = document.getElementById('tableBody');
    
    try {
        statusEl.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Đang tải dữ liệu...';
        
        const response = await fetch('assets/data.json');
        if (!response.ok) {
            throw new Error('Không tìm thấy file data.json');
        }
        
        fullData = await response.json();
        filteredData = fullData;
        isDataLoaded = true;
        
        statusEl.innerHTML = `<i class="fas fa-check-circle" style="color:#22c55e;"></i> Đã tải ${fullData.length} dòng dữ liệu`;
        document.getElementById('totalCount').textContent = fullData.length;
        document.getElementById('filteredCount').textContent = filteredData.length;
        
        renderTable();
        
    } catch (error) {
        console.error('Lỗi load dữ liệu:', error);
        statusEl.innerHTML = `<i class="fas fa-exclamation-circle" style="color:#ef4444;"></i> Lỗi: ${error.message}`;
        tbody.innerHTML = `
            <tr>
                <td colspan="5" style="text-align:center;padding:40px;color:#ef4444;">
                    <i class="fas fa-exclamation-triangle" style="font-size:30px;display:block;margin-bottom:10px;"></i>
                    Không thể tải dữ liệu. Vui lòng kiểm tra file <strong>assets/data.json</strong>
                </td>
            </tr>
        `;
    }
}

// ============================================================
// HÀM TÌM KIẾM (DÙNG TÊN CỘT HOA: MNC, LAC, CELL, TOADO)
// ============================================================
window.searchData = function() {
    if (!isDataLoaded) return;
    
    const mncValue = document.getElementById('filterMNC').value.trim();
    const lacValue = document.getElementById('filterLAC').value.trim();
    const cellValue = document.getElementById('filterCell').value.trim();

    filteredData = fullData.filter(row => {
        let match = true;
        
        if (mncValue !== '') {
            match = match && String(row.MNC).toLowerCase().includes(mncValue.toLowerCase());
        }
        if (lacValue !== '') {
            match = match && String(row.LAC).toLowerCase().includes(lacValue.toLowerCase());
        }
        if (cellValue !== '') {
            match = match && String(row.CELL).toLowerCase().includes(cellValue.toLowerCase());
        }
        
        return match;
    });

    document.getElementById('totalCount').textContent = fullData.length;
    document.getElementById('filteredCount').textContent = filteredData.length;

    currentPage = 1;
    renderTable();
};

// ============================================================
// HÀM XÓA BỘ LỌC
// ============================================================
window.clearFilters = function() {
    document.getElementById('filterMNC').value = '';
    document.getElementById('filterLAC').value = '';
    document.getElementById('filterCell').value = '';
    searchData();
};

// ============================================================
// HÀM MỞ GOOGLE MAPS KHI CLICK VÀO TỌA ĐỘ
// ============================================================
window.openGoogleMaps = function(toado) {
    if (!toado) return;
    const parts = toado.split(',');
    if (parts.length === 2) {
        const lat = parts[0].trim();
        const lng = parts[1].trim();
        const url = `https://www.google.com/maps?q=${lat},${lng}`;
        window.open(url, '_blank');
    }
};

// ============================================================
// HÀM RENDER BẢNG (DÙNG TÊN CỘT HOA)
// ============================================================
function renderTable() {
    const tbody = document.getElementById('tableBody');
    const start = (currentPage - 1) * pageSize;
    const end = Math.min(start + pageSize, filteredData.length);
    const pageData = filteredData.slice(start, end);
    
    if (filteredData.length === 0) {
        tbody.innerHTML = `
            <tr>
                <td colspan="5" style="text-align:center;padding:40px;color:#94a3b8;">
                    <i class="fas fa-search" style="font-size:30px;display:block;margin-bottom:10px;"></i>
                    Không tìm thấy dữ liệu phù hợp
                </td>
            </tr>
        `;
    } else {
        tbody.innerHTML = pageData.map((row, index) => `
            <tr>
                <td>${start + index + 1}</td>
                <td><strong>${row.MNC}</strong></td>
                <td>${row.LAC}</td>
                <td style="font-family: 'Courier New', monospace;">${row.CELL}</td>
                <td>
                    <a href="#" onclick="openGoogleMaps('${row.TOADO}'); return false;" 
                       style="color:#3b82f6; text-decoration:none; font-family: 'Courier New', monospace; cursor:pointer;"
                       title="Click để mở Google Maps">
                        <i class="fas fa-map-marker-alt" style="color:#ef4444;"></i>
                        ${row.TOADO}
                    </a>
                </td>
            </tr>
        `).join('');
    }
    
    renderPagination();
}

// ============================================================
// HÀM PHÂN TRANG
// ============================================================
function renderPagination() {
    const pagination = document.getElementById('pagination');
    const totalPages = Math.ceil(filteredData.length / pageSize);
    
    if (totalPages <= 1) {
        pagination.innerHTML = '';
        return;
    }
    
    let html = '';
    html += `<button onclick="goToPage(${currentPage - 1})" ${currentPage === 1 ? 'disabled' : ''}>
        <i class="fas fa-chevron-left"></i>
    </button>`;
    
    const maxVisible = 7;
    let startPage = Math.max(1, currentPage - Math.floor(maxVisible / 2));
    let endPage = Math.min(totalPages, startPage + maxVisible - 1);
    
    if (endPage - startPage < maxVisible - 1) {
        startPage = Math.max(1, endPage - maxVisible + 1);
    }
    
    if (startPage > 1) {
        html += `<button onclick="goToPage(1)">1</button>`;
        if (startPage > 2) html += `<span>...</span>`;
    }
    
    for (let i = startPage; i <= endPage; i++) {
        html += `<button onclick="goToPage(${i})" ${i === currentPage ? 'class="active"' : ''}>${i}</button>`;
    }
    
    if (endPage < totalPages) {
        if (endPage < totalPages - 1) html += `<span>...</span>`;
        html += `<button onclick="goToPage(${totalPages})">${totalPages}</button>`;
    }
    
    html += `<button onclick="goToPage(${currentPage + 1})" ${currentPage === totalPages ? 'disabled' : ''}>
        <i class="fas fa-chevron-right"></i>
    </button>`;
    
    pagination.innerHTML = html;
}

// ============================================================
// HÀM CHUYỂN TRANG
// ============================================================
window.goToPage = function(page) {
    const totalPages = Math.ceil(filteredData.length / pageSize);
    if (page < 1 || page > totalPages) return;
    currentPage = page;
    renderTable();
    document.querySelector('.table-wrapper').scrollIntoView({ behavior: 'smooth', block: 'start' });
};

// ============================================================
// TYPING EFFECT
// ============================================================
document.addEventListener('DOMContentLoaded', function() {
    const fullText = `👋 Chào mừng bạn đến với Cẩm nang toàn năng – Nơi hội tụ công cụ, AI và tri thức. ✨ Chúc bạn một ngày sáng tạo và hiệu quả!`;
    const welcomeElement = document.getElementById('welcomeText');
    if (welcomeElement) {
        let charIndex = 0;
        function typeText() {
            if (charIndex < fullText.length) {
                const cursor = welcomeElement.querySelector('.typing-cursor');
                if (cursor) cursor.remove();
                let displayChar = fullText[charIndex];
                if (fullText.substring(charIndex).startsWith('Cẩm nang toàn năng')) {
                    displayChar = `<span class="highlight-welcome">${displayChar}`;
                    if (charIndex + 1 < fullText.length && fullText.substring(charIndex + 1).startsWith(' –')) {
                        displayChar += '</span>';
                    }
                }
                welcomeElement.innerHTML = fullText.substring(0, charIndex + 1) + '<span class="typing-cursor"></span>';
                charIndex++;
                setTimeout(typeText, 30 + Math.random() * 40);
            } else {
                const cursor = welcomeElement.querySelector('.typing-cursor');
                if (cursor) cursor.remove();
                welcomeElement.innerHTML = fullText;
                welcomeElement.innerHTML += '<span class="typing-cursor"></span>';
                setTimeout(() => {
                    const finalCursor = welcomeElement.querySelector('.typing-cursor');
                    if (finalCursor) finalCursor.remove();
                }, 3000);
            }
        }
        setTimeout(typeText, 500);
    }

    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            renderTab(this.dataset.tab);
        });
    });
    renderTab('tool');
});