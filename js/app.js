// ============================================================
// CẨM NANG TOÀN NĂNG - APP.JS
// ============================================================

// ============================================================
// DỮ LIỆU CÁC DANH MỤC
// ============================================================
const categories = {
    // ===== CÔNG CỤ =====
    tool: {
        icon: '🛠️',
        name: 'Công cụ',
        items: [
            { icon: '📄', title: 'iLovePDF', url: 'https://www.ilovepdf.com/' },
            { icon: '🖼️', title: 'PNGTree', url: 'https://vi.pngtree.com/' },
            { icon: '🔄', title: 'Convertio', url: 'https://convertio.co/vn/' }
        ]
    },

    // ===== AI PHỔ THÔNG =====
    ai: {
        icon: '🤖',
        name: 'AI Phổ thông',
        items: [
            { icon: '🧠', title: 'ChatGPT', url: 'https://chatgpt.com/' },
            { icon: '✨', title: 'Gemini', url: 'https://gemini.google.com/app' },
            { icon: '📓', title: 'NotebookLM', url: 'https://notebook.google.com/' }
        ]
    },

    // ===== AI TIỆN ÍCH =====
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

    // ===== TRA CỨU =====
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

    // ===== TIỆN ÍCH =====
    utility: {
        icon: '⚡',
        name: 'Tiện ích',
        items: [
            { icon: '🎬', title: 'YouTube', url: 'https://www.youtube.com' },
            { icon: '🌤️', title: 'Thời tiết NB', url: 'https://coccoc.com/search?query=th%E1%BB%9Di+ti%E1%BA%BFt+ninh+binh' },
            { icon: '🌙', title: 'Lịch âm', url: 'https://coccoc.com/search?query=l%E1%BB%8Bch+%C3%A2m' }
        ]
    },

    // ===== TÍNH TOÁN =====
    calculator: {
        icon: '🧮',
        name: 'Tính toán',
        isCalculator: true
    }
};

// ============================================================
// RENDER TAB (HIỂN THỊ DẠNG LƯỚI THU GỌN)
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
        // Gán lại sự kiện Enter sau khi render calculator
        attachCalculatorEvents();
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

                <!-- FORMULA MODE -->
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
                            <div class="result-card">
                                <div class="result-label">📊 KQ1</div>
                                <div class="result-value" id="result1">0</div>
                            </div>
                            <div class="result-card">
                                <div class="result-label">📊 KQ2</div>
                                <div class="result-value" id="result2">0</div>
                            </div>
                            <div class="result-card">
                                <div class="result-label">📊 KQ3</div>
                                <div class="result-value" id="result3">0</div>
                            </div>
                            <div class="result-card">
                                <div class="result-label">📊 KQ4</div>
                                <div class="result-value" id="result4">0</div>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- HEX MODE -->
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
                            <div class="result-card">
                                <div class="result-label">📊 Thập phân (Decimal)</div>
                                <div class="result-value" id="decResult">0</div>
                            </div>
                            <div class="result-card">
                                <div class="result-label">📊 Nhị phân (Binary)</div>
                                <div class="result-value" id="binResult" style="font-size:18px;">0</div>
                            </div>
                        </div>
                        <div class="calc-detail" id="hexDetailInfo"></div>
                    </div>
                </div>
            </div>
        </div>
    `;
}

// ============================================================
// GÁN LẠI SỰ KIỆN CHO CALCULATOR SAU KHI RENDER
// ============================================================
function attachCalculatorEvents() {
    const inputX = document.getElementById('inputX');
    if (inputX) {
        inputX.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') calculate();
        });
    }

    const inputHex = document.getElementById('inputHex');
    if (inputHex) {
        inputHex.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') convertHexToDec();
        });
    }
}

// ============================================================
// SWITCH MODE
// ============================================================
window.switchMode = function(mode) {
    document.querySelectorAll('.mode-btn').forEach(btn => {
        btn.classList.toggle('active', btn.dataset.mode === mode);
    });

    const formulaMode = document.getElementById('formulaMode');
    const hexMode = document.getElementById('hexMode');
    
    if (formulaMode) formulaMode.style.display = mode === 'formula' ? 'block' : 'none';
    if (hexMode) hexMode.style.display = mode === 'hex' ? 'block' : 'none';
};

// ============================================================
// TÍNH TOÁN CHUYỂN CELL - DEC (KHÔNG DẤU NGĂN CÁCH)
// ============================================================
window.calculate = function() {
    const input = document.getElementById('inputX');
    if (!input) return;
    
    const X = input.value.trim();
    
    if (X.length < 6) {
        alert('⚠️ X phải có ít nhất 6 chữ số!');
        input.focus();
        return;
    }

    if (!/^\d+$/.test(X)) {
        alert('⚠️ Vui lòng chỉ nhập số!');
        input.focus();
        return;
    }

    const a1 = Number(X.slice(-5));
    const b1 = Number(X.slice(0, -5));
    const kq1 = b1 * 65536 + a1;

    const a2 = Number(X.slice(-4));
    const b2 = Number(X.slice(0, -4));
    const kq2 = b2 * 1048576 + a2;

    const kq3 = kq1;

    const a4 = Number(X.slice(-5));
    const b4 = Number(X.slice(0, -5));
    const kq4 = b4 * 1048576 + a4;

    // HIỂN THỊ KHÔNG CÓ DẤU NGĂN CÁCH
    const r1 = document.getElementById('result1');
    const r2 = document.getElementById('result2');
    const r3 = document.getElementById('result3');
    const r4 = document.getElementById('result4');
    
    if (r1) r1.textContent = kq1.toString();
    if (r2) r2.textContent = kq2.toString();
    if (r3) r3.textContent = kq3.toString();
    if (r4) r4.textContent = kq4.toString();

    const container = document.getElementById('resultContainer');
    if (container) container.style.display = 'block';
};

// ============================================================
// XÓA KẾT QUẢ FORMULA
// ============================================================
window.clearResult = function() {
    const input = document.getElementById('inputX');
    if (input) input.value = '';
    
    const container = document.getElementById('resultContainer');
    if (container) container.style.display = 'none';
    
    if (input) input.focus();
};

// ============================================================
// HEX → DEC (KHÔNG DẤU NGĂN CÁCH)
// ============================================================
window.convertHexToDec = function() {
    const input = document.getElementById('inputHex');
    if (!input) return;
    
    const hexStr = input.value.trim().toUpperCase();

    if (!hexStr) {
        alert('⚠️ Vui lòng nhập số thập lục phân!');
        input.focus();
        return;
    }

    if (!/^[0-9A-F]+$/.test(hexStr)) {
        alert('⚠️ Chỉ nhập ký tự hợp lệ: 0-9 và A-F!');
        input.focus();
        return;
    }

    const decValue = parseInt(hexStr, 16);
    const binValue = decValue.toString(2);

    const hexDisplay = document.getElementById('hexInputDisplay');
    const decDisplay = document.getElementById('decResult');
    const binDisplay = document.getElementById('binResult');
    const detailInfo = document.getElementById('hexDetailInfo');
    const container = document.getElementById('hexResultContainer');

    if (hexDisplay) hexDisplay.textContent = hexStr;
    if (decDisplay) decDisplay.textContent = decValue.toString(); // KHÔNG DẤU NGĂN CÁCH
    if (binDisplay) binDisplay.textContent = binValue;

    if (detailInfo) {
        detailInfo.innerHTML = `
            <div style="display:grid; grid-template-columns:1fr 1fr; gap:12px; margin-top:16px; padding:16px; background:#f8fafc; border-radius:8px; font-size:14px;">
                <div><strong>🔢 Hex:</strong> ${hexStr}</div>
                <div><strong>📊 Dec:</strong> ${decValue.toString()}</div>
                <div><strong>📘 Bin:</strong> ${binValue}</div>
                <div><strong>🔢 Số chữ số:</strong> ${hexStr.length} ký tự Hex</div>
            </div>
        `;
    }

    if (container) container.style.display = 'block';
};

// ============================================================
// XÓA KẾT QUẢ HEX
// ============================================================
window.clearHexResult = function() {
    const input = document.getElementById('inputHex');
    if (input) input.value = '';
    
    const container = document.getElementById('hexResultContainer');
    if (container) container.style.display = 'none';
    
    if (input) input.focus();
};

// ============================================================
// HIỆU ỨNG TYPING EFFECT
// ============================================================
document.addEventListener('DOMContentLoaded', function() {
    // Typing effect cho welcome
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
                    if (charIndex + 1 < fullText.length && 
                        fullText.substring(charIndex + 1).startsWith(' –')) {
                        displayChar += '</span>';
                    }
                }
                
                welcomeElement.innerHTML = fullText.substring(0, charIndex + 1) + 
                                          '<span class="typing-cursor"></span>';
                
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

    // ===== KHỞI TẠO TABS =====
    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            renderTab(this.dataset.tab);
        });
    });

    // ===== HIỂN THỊ TAB ĐẦU TIÊN =====
    renderTab('tool');
});