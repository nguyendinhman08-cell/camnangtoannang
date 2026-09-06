// ============================================================
// CẨM NANG TOÀN NĂNG - APP.JS
// ============================================================

// ============================================================
// DỮ LIỆU CÁC DANH MỤC
// ============================================================
const categories = {
    tool: {
        icon: '🛠️',
        name: 'Công cụ',
        items: [
            { icon: '📄', title: 'iLovePDF', url: 'https://www.ilovepdf.com/' },
            { icon: '🖼️', title: 'PNGTree', url: 'https://vi.pngtree.com/' },
            { icon: '🔄', title: 'Convertio', url: 'https://convertio.co/vn/' }
        ]
    },
    ai: {
        icon: '🤖',
        name: 'AI Phổ thông',
        items: [
            { icon: '🧠', title: 'ChatGPT', url: 'https://chatgpt.com/' },
            { icon: '✨', title: 'Gemini', url: 'https://gemini.google.com/app' },
            { icon: '📓', title: 'NotebookLM', url: 'https://notebook.google.com/' }
        ]
    },
    'ai-utility': {
        icon: '🛠️',
        name: 'AI Tiện ích',
        items: [
            { icon: '🧘', title: 'Ông Lão Tử', url: 'https://chatgpt.com/g/g-68d6b31640ec8191b945e7a0d7e876b0-ong-lao-tu' },
            { icon: '📚', title: 'AI Học Trí Tuệ', url: 'https://chatgpt.com/g/g-9yBS1MigT-ai-hoc-tri-tue' },
            { icon: '🌍', title: 'Học Ngoại Ngữ', url: 'https://chatgpt.com/g/g-67d79e355a948191a84e2d1b589d6a7d-hoc-ngoai-ngu-tieng-anh-trung-nhat-han' },
            { icon: '✍️', title: 'Trợ lý Viết Bài MXH', url: 'https://chatgpt.com/g/g-67d65b01aab88191a708773c20ff4a1c-tro-ly-viet-bai-mang-xa-hoi-velo' }
        ]
    },
    search: {
        icon: '📡',
        name: 'Tra cứu',
        items: [
            { icon: '📱', title: 'IMEI.info', url: 'https://www.imei.info/' },
            { icon: '🔍', title: 'IMEICheck', url: 'https://imeicheck.com/vi/kiem-tra-imei' },
            { icon: '🗺️', title: 'MultiCellID', url: 'https://www.multicellid.com/dangnhap.php' },
            { icon: '📍', title: 'FindCellID', url: 'https://findcellid.com/' },
            { icon: '📶', title: 'CellID.co', url: 'https://cellid.co/cell' }
        ]
    },
    utility: {
        icon: '⚡',
        name: 'Tiện ích',
        items: [
            { icon: '🎬', title: 'YouTube', url: 'https://www.youtube.com' },
            { icon: '🌤️', title: 'Thời tiết NB', url: 'https://coccoc.com/search?query=th%E1%BB%9Di+ti%E1%BA%BFt+ninh+binh' },
            { icon: '🌙', title: 'Lịch âm', url: 'https://coccoc.com/search?query=l%E1%BB%8Bch+%C3%A2m' }
        ]
    },
    calculator: {
        icon: '🧮',
        name: 'Tính toán',
        isCalculator: true
    },
    route: {
        icon: '📍',
        name: 'Lộ trình',
        isRoute: true
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
        setTimeout(() => {
            initRouteMap();
        }, 500);
        return;
    }

    container.innerHTML = `
        <div class="tab-panel active">
            <div class="category">
                <div class="category-header">
                    <span class="cat-icon">${category.icon}</span>
                    <h2>${category.name}</h2>
                    <span class="count">${category.items.length}</span>
                </div>
                <div class="card-grid">
                    ${category.items.map(item => `
                        <a href="${item.url}" target="_blank" rel="noopener noreferrer" class="card">
                            <span class="card-icon">${item.icon}</span>
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
                    <p class="route-desc">Nhập các điểm đến, xem hành trình trên bản đồ</p>
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
                    <button class="btn btn-primary" onclick="updateRouteMap()" ${points.length < 2 ? 'disabled' : ''}>
                        🗺️ Vẽ lộ trình trên bản đồ
                    </button>
                    <button class="btn btn-secondary" onclick="clearAllRoutePoints()">🗑️ Xóa tất cả</button>
                </div>

                <div id="mapContainer"></div>
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
    setTimeout(() => initRouteMap(), 500);
}

window.addRoutePoint = function() {
    const latInput = document.getElementById('routeLat');
    const lngInput = document.getElementById('routeLng');
    const noteInput = document.getElementById('routeNote');
    const lat = parseFloat(latInput.value.trim());
    const lng = parseFloat(lngInput.value.trim());
    const note = noteInput.value.trim(); // KHÔNG TỰ ĐỘNG THÊM GHI CHÚ

    if (isNaN(lat) || isNaN(lng)) { alert('⚠️ Vui lòng nhập đúng vĩ độ và kinh độ!'); return; }
    if (lat < -90 || lat > 90 || lng < -180 || lng > 180) { alert('⚠️ Vĩ độ từ -90 đến 90, kinh độ từ -180 đến 180!'); return; }

    const points = getRoutePoints();
    points.push({ lat, lng, note }); // note có thể là rỗng
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
// LEAFLET MAP - KHỞI TẠO & VẼ LỘ TRÌNH (DÙNG TILE ỔN ĐỊNH)
// ============================================================
let map = null;
let polylineLayer = null;
let markerLayer = null;

function initRouteMap() {
    const container = document.getElementById('mapContainer');
    if (!container) {
        console.log('❌ Không tìm thấy mapContainer');
        return;
    }

    if (map) {
        console.log('🔄 Map đã tồn tại');
        map.invalidateSize();
        updateRouteMap();
        return;
    }

    console.log('🗺️ Đang khởi tạo map...');

    try {
        map = L.map('mapContainer', {
            center: [21.0285, 105.8542],
            zoom: 13,
            zoomControl: true,
        });

        // ===== DÙNG TILE SERVER ỔN ĐỊNH NHẤT =====
        // CartoDB Voyager (đẹp, ổn định)
        L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png', {
            attribution: '© OpenStreetMap, CartoDB',
            maxZoom: 19,
            subdomains: 'abcd',
        }).addTo(map);

        // ===== DỰ PHÒNG: NẾU CARTO LỖI, DÙNG STAMEN =====
        /*
        L.tileLayer('https://stamen-tiles-{s}.a.ssl.fastly.net/toner/{z}/{x}/{y}.png', {
            attribution: '© OpenStreetMap, Stamen Design',
            maxZoom: 19,
            subdomains: 'abcd',
        }).addTo(map);
        */

        polylineLayer = L.layerGroup().addTo(map);
        markerLayer = L.layerGroup().addTo(map);

        console.log('✅ Map khởi tạo thành công');

        updateRouteMap();

        setTimeout(() => {
            if (map) {
                map.invalidateSize();
                console.log('🔄 Resize map sau 300ms');
            }
        }, 300);

        setTimeout(() => {
            if (map) {
                map.invalidateSize();
                console.log('🔄 Resize map sau 800ms');
            }
        }, 800);

    } catch (error) {
        console.error('❌ Lỗi khởi tạo map:', error);
        container.innerHTML = '<p style="color:red;padding:20px;text-align:center;">❌ Lỗi tải bản đồ. Vui lòng kiểm tra kết nối mạng hoặc thử lại sau.</p>';
    }
}

// ============================================================
// CẬP NHẬT LỘ TRÌNH TRÊN MAP - LABEL LUÔN HIỂN THỊ
// ============================================================
window.updateRouteMap = function() {
    const points = getRoutePoints();
    
    if (!map) {
        console.log('❌ Map chưa khởi tạo, thử khởi tạo lại...');
        initRouteMap();
        return;
    }

    if (!polylineLayer || !markerLayer) {
        polylineLayer = L.layerGroup().addTo(map);
        markerLayer = L.layerGroup().addTo(map);
    }

    polylineLayer.clearLayers();
    markerLayer.clearLayers();

    if (points.length === 0) {
        map.setView([21.0285, 105.8542], 13);
        return;
    }

    // Tạo marker cho từng điểm với STT LUÔN HIỂN THỊ
    points.forEach((p, index) => {
        const stt = index + 1;
        
        // ICON HÌNH TRÒN VỚI STT (LUÔN HIỂN THỊ)
        const icon = L.divIcon({
            className: 'marker-label',
            html: `<div style="
                font-family: 'Times New Roman', Times, serif !important;
                font-size: 14px !important;
                color: #ffffff !important;
                font-weight: bold !important;
                background: #2563eb;
                border-radius: 50%;
                width: 34px;
                height: 34px;
                display: flex;
                align-items: center;
                justify-content: center;
                border: 2.5px solid #000000;
                box-shadow: 0 2px 8px rgba(0,0,0,0.4);
                line-height: 1;
            ">${stt}</div>`,
            iconSize: [34, 34],
            iconAnchor: [17, 17],
        });

        // Marker chính với STT
        L.marker([p.lat, p.lng], { 
            icon: icon,
        }).addTo(markerLayer);

        // CHỈ HIỂN THỊ GHI CHÚ NẾU CÓ NỘI DUNG
        if (p.note && p.note.trim() !== '') {
            const labelIcon = L.divIcon({
                className: 'marker-label-text',
                html: `<div style="
                    font-family: 'Times New Roman', Times, serif !important;
                    font-size: 13px !important;
                    color: #000000 !important;
                    font-weight: bold !important;
                    background: rgba(255,255,255,0.92);
                    padding: 3px 10px;
                    border-radius: 4px;
                    border: 1.5px solid #000000;
                    box-shadow: 0 2px 6px rgba(0,0,0,0.2);
                    white-space: nowrap;
                    text-align: center;
                    margin-top: 6px;
                ">${p.note}</div>`,
                iconSize: [0, 0],
                iconAnchor: [0, 0],
            });

            // Thêm ghi chú bên dưới marker (nếu có)
            L.marker([p.lat - 0.001, p.lng], { 
                icon: labelIcon,
                interactive: false,
            }).addTo(markerLayer);
        }
    });

    // Vẽ polyline nối các điểm
    if (points.length >= 2) {
        const latlngs = points.map(p => [p.lat, p.lng]);
        const polyline = L.polyline(latlngs, {
            color: '#000000',
            weight: 5,
            opacity: 1,
            smoothFactor: 1,
        }).addTo(polylineLayer);

        const bounds = L.latLngBounds(latlngs);
        map.fitBounds(bounds, { padding: [60, 60] });
        console.log('✅ Vẽ polyline thành công');
    } else {
        map.setView([points[0].lat, points[0].lng], 15);
    }
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