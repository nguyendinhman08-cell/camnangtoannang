// ============================================================
// CẨM NANG TOÀN NĂNG - DỮ LIỆU LINKS
// ============================================================

const categories = [
    {
        id: 'aiGrid',
        icon: '🤖',
        name: 'Trợ lý AI',
        items: [
            { icon: '🧠', title: 'ChatGPT', desc: 'Trợ lý AI của OpenAI', url: 'https://chatgpt.com', tag: 'Phổ biến' },
            { icon: '✨', title: 'Claude', desc: 'Trợ lý AI của Anthropic', url: 'https://claude.ai', tag: 'Code tốt' },
            { icon: '🌐', title: 'DeepSeek', desc: 'AI miễn phí, đa ngôn ngữ', url: 'https://deepseek.com', tag: 'Miễn phí' },
            { icon: '🎨', title: 'Midjourney', desc: 'Tạo ảnh bằng AI', url: 'https://midjourney.com', tag: 'Sáng tạo' }
        ]
    },
    {
        id: 'devGrid',
        icon: '💻',
        name: 'Công cụ lập trình',
        items: [
            { icon: '📘', title: 'GitHub', desc: 'Lưu trữ code, quản lý phiên bản', url: 'https://github.com', tag: 'Must-have' },
            { icon: '📄', title: 'Stack Overflow', desc: 'Hỏi đáp lập trình', url: 'https://stackoverflow.com', tag: 'Cộng đồng' },
            { icon: '📖', title: 'MDN Web Docs', desc: 'Tài liệu Web chuẩn', url: 'https://developer.mozilla.org', tag: 'Tài liệu' },
            { icon: '🧪', title: 'CodePen', desc: 'Code HTML/CSS/JS online', url: 'https://codepen.io', tag: 'Thực hành' }
        ]
    },
    {
        id: 'learnGrid',
        icon: '📚',
        name: 'Học tập & Tra cứu',
        items: [
            { icon: '🎓', title: 'Google Scholar', desc: 'Tìm kiếm tài liệu học thuật', url: 'https://scholar.google.com', tag: 'Học thuật' },
            { icon: '📝', title: 'Wikipedia', desc: 'Bách khoa toàn thư mở', url: 'https://wikipedia.org', tag: 'Tra cứu' },
            { icon: '🇻🇳', title: 'Google Translate', desc: 'Dịch văn bản, phát âm chuẩn', url: 'https://translate.google.com', tag: 'Ngôn ngữ' },
            { icon: '📊', title: 'Canva', desc: 'Thiết kế đồ họa online', url: 'https://canva.com', tag: 'Thiết kế' }
        ]
    },
    {
        id: 'officeGrid',
        icon: '📝',
        name: 'Công cụ văn phòng',
        items: [
            { icon: '📧', title: 'Gmail', desc: 'Email của Google', url: 'https://mail.google.com', tag: 'Email' },
            { icon: '📁', title: 'Google Drive', desc: 'Lưu trữ và chia sẻ file', url: 'https://drive.google.com', tag: 'Cloud' },
            { icon: '📅', title: 'Google Calendar', desc: 'Quản lý lịch làm việc', url: 'https://calendar.google.com', tag: 'Lịch' },
            { icon: '📝', title: 'Google Docs', desc: 'Soạn thảo văn bản online', url: 'https://docs.google.com', tag: 'Văn bản' }
        ]
    },
    {
        id: 'funGrid',
        icon: '🎵',
        name: 'Giải trí & Đọc báo',
        items: [
            { icon: '🎧', title: 'Spotify', desc: 'Nghe nhạc trực tuyến', url: 'https://spotify.com', tag: 'Âm nhạc' },
            { icon: '🎬', title: 'YouTube', desc: 'Xem video, học tập, giải trí', url: 'https://youtube.com', tag: 'Video' },
            { icon: '📰', title: 'VnExpress', desc: 'Tin tức Việt Nam hàng ngày', url: 'https://vnexpress.net', tag: 'Tin tức' },
            { icon: '📖', title: 'Goodreads', desc: 'Cộng đồng đọc sách', url: 'https://goodreads.com', tag: 'Sách' }
        ]
    }
];

// ============================================================
// RENDER CARDS
// ============================================================

function renderCategories() {
    categories.forEach(cat => {
        const container = document.getElementById(cat.id);
        if (!container) return;

        container.innerHTML = cat.items.map(item => `
            <a href="${item.url}" target="_blank" rel="noopener noreferrer" class="card">
                <span class="card-icon">${item.icon}</span>
                <span class="card-title">${item.title}</span>
                <span class="card-desc">${item.desc}</span>
                <span class="card-tag">${item.tag}</span>
            </a>
        `).join('');
    });
}

// ============================================================
// KHỞI CHẠY
// ============================================================
document.addEventListener('DOMContentLoaded', renderCategories);