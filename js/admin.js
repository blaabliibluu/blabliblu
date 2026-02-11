/**
 * Admin Panel - Guestbook Management
 * Password: admin123 (you can change this in the code)
 */

const ADMIN_PASSWORD = 'admin123'; // Change this to your desired password
const ADMIN_SESSION_KEY = 'guestbook_admin_logged_in';
const MESSAGE_STORAGE_KEY = 'love_messages_local';

let allMessages = [];
let filteredMessages = [];
let currentFilter = 'all';

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
    checkAuthStatus();
    setupEventListeners();
});

// Check if already logged in
function checkAuthStatus() {
    const isLoggedIn = sessionStorage.getItem(ADMIN_SESSION_KEY);
    if (isLoggedIn === 'true') {
        showDashboard();
    } else {
        showLogin();
    }
}

// Show login screen
function showLogin() {
    document.getElementById('loginScreen').style.display = 'block';
    document.getElementById('adminDashboard').classList.remove('active');
}

// Show dashboard
function showDashboard() {
    document.getElementById('loginScreen').style.display = 'none';
    document.getElementById('adminDashboard').classList.add('active');
    loadMessages();
}

// Setup event listeners
function setupEventListeners() {
    // Login form
    document.getElementById('loginForm').addEventListener('submit', handleLogin);

    // Logout button
    document.getElementById('logoutBtn').addEventListener('click', handleLogout);

    // Refresh button
    document.getElementById('refreshBtn').addEventListener('click', () => {
        loadMessages();
    });

    // Search input
    document.getElementById('searchInput').addEventListener('input', (e) => {
        handleSearch(e.target.value);
    });

    // Filter buttons
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
            e.target.classList.add('active');
            currentFilter = e.target.dataset.filter;
            applyFilter();
        });
    });

    // Close modal
    document.getElementById('closeModal').addEventListener('click', closeModal);
    document.getElementById('viewModal').addEventListener('click', (e) => {
        if (e.target.id === 'viewModal') {
            closeModal();
        }
    });
}

// Handle login
function handleLogin(e) {
    e.preventDefault();
    const password = document.getElementById('password').value;
    const errorMessage = document.getElementById('loginError');

    if (password === ADMIN_PASSWORD) {
        sessionStorage.setItem(ADMIN_SESSION_KEY, 'true');
        errorMessage.classList.remove('show');
        showDashboard();
    } else {
        errorMessage.classList.add('show');
    }
}

// Handle logout
function handleLogout() {
    sessionStorage.removeItem(ADMIN_SESSION_KEY);
    showLogin();
}

// Load messages from API or localStorage
async function loadMessages() {
    const tableBody = document.getElementById('messagesTableBody');
    tableBody.innerHTML = '<div class="loading"><i class="fas fa-spinner"></i><p>Loading messages...</p></div>';

    // Try to load from Table API first
    const apiMessages = await loadFromTableAPI();
    
    if (apiMessages && apiMessages.length > 0) {
        allMessages = apiMessages;
    } else {
        // Fallback to localStorage
        allMessages = loadFromLocalStorage();
    }

    filteredMessages = [...allMessages];
    updateStatistics();
    applyFilter();
}

// Load from Table API
async function loadFromTableAPI() {
    try {
        const response = await fetch('tables/love_messages?sort=-created_at&limit=1000');
        if (response.ok) {
            const data = await response.json();
            console.log('Loaded messages from API:', data.data.length);
            return data.data || [];
        }
        return null;
    } catch (error) {
        console.log('Could not load from Table API:', error);
        return null;
    }
}

// Load from localStorage
function loadFromLocalStorage() {
    try {
        const messages = JSON.parse(localStorage.getItem(MESSAGE_STORAGE_KEY) || '[]');
        console.log('Loaded messages from localStorage:', messages.length);
        return messages;
    } catch (error) {
        console.error('Error loading from localStorage:', error);
        return [];
    }
}

// Update statistics
function updateStatistics() {
    const now = new Date();
    const todayStart = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const weekStart = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);

    // Total messages
    document.getElementById('totalMessages').textContent = allMessages.length;

    // Today's messages
    const todayCount = allMessages.filter(msg => {
        const msgDate = new Date(msg.timestamp || msg.created_at);
        return msgDate >= todayStart;
    }).length;
    document.getElementById('todayMessages').textContent = todayCount;

    // This week's messages
    const weekCount = allMessages.filter(msg => {
        const msgDate = new Date(msg.timestamp || msg.created_at);
        return msgDate >= weekStart;
    }).length;
    document.getElementById('weekMessages').textContent = weekCount;

    // Latest message time
    if (allMessages.length > 0) {
        const latestDate = new Date(allMessages[0].timestamp || allMessages[0].created_at);
        document.getElementById('latestMessage').textContent = formatTimeAgo(latestDate);
    } else {
        document.getElementById('latestMessage').textContent = '-';
    }
}

// Apply current filter
function applyFilter() {
    const now = new Date();
    const todayStart = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const weekStart = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);

    switch (currentFilter) {
        case 'today':
            filteredMessages = allMessages.filter(msg => {
                const msgDate = new Date(msg.timestamp || msg.created_at);
                return msgDate >= todayStart;
            });
            break;
        case 'week':
            filteredMessages = allMessages.filter(msg => {
                const msgDate = new Date(msg.timestamp || msg.created_at);
                return msgDate >= weekStart;
            });
            break;
        default:
            filteredMessages = [...allMessages];
    }

    displayMessages();
}

// Handle search
function handleSearch(query) {
    if (!query.trim()) {
        filteredMessages = [...allMessages];
    } else {
        const searchTerm = query.toLowerCase();
        filteredMessages = allMessages.filter(msg => 
            msg.message.toLowerCase().includes(searchTerm)
        );
    }
    displayMessages();
}

// Display messages in table
function displayMessages() {
    const tableBody = document.getElementById('messagesTableBody');

    if (filteredMessages.length === 0) {
        tableBody.innerHTML = '<div class="no-messages">No messages found matching your criteria.</div>';
        return;
    }

    tableBody.innerHTML = filteredMessages.map((msg, index) => {
        const messageId = msg.id || 'N/A';
        const messageText = msg.message || '';
        const messagePreview = messageText.length > 100 
            ? messageText.substring(0, 100) + '...' 
            : messageText;
        const date = formatDate(msg.timestamp || msg.created_at);
        
        return `
            <div class="message-row">
                <div class="row-id">${index + 1}</div>
                <div class="row-message">${escapeHtml(messagePreview)}</div>
                <div class="row-date">
                    <i class="fas fa-clock"></i> ${date}
                </div>
                <div class="row-actions">
                    <button class="action-btn view-btn" onclick="viewMessage('${escapeAttribute(messageId)}')">
                        <i class="fas fa-eye"></i> View
                    </button>
                    <button class="action-btn delete-btn" onclick="deleteMessage('${escapeAttribute(messageId)}')">
                        <i class="fas fa-trash"></i> Delete
                    </button>
                </div>
            </div>
        `;
    }).join('');
}

// View full message
window.viewMessage = function(messageId) {
    const message = allMessages.find(msg => msg.id === messageId);
    if (!message) return;

    document.getElementById('modalMessageBody').textContent = message.message;
    document.getElementById('modalMessageDate').innerHTML = `<i class="fas fa-clock"></i> ${formatDate(message.timestamp || message.created_at)}`;
    document.getElementById('modalMessageId').innerHTML = `<strong>ID:</strong> ${messageId}`;
    
    document.getElementById('viewModal').classList.add('active');
}

// Close modal
function closeModal() {
    document.getElementById('viewModal').classList.remove('active');
}

// Delete message
window.deleteMessage = async function(messageId) {
    if (!confirm('Are you sure you want to delete this message? This action cannot be undone.')) {
        return;
    }

    // Try to delete from API first
    const deleted = await deleteFromAPI(messageId);
    
    if (deleted) {
        // Remove from local array
        allMessages = allMessages.filter(msg => msg.id !== messageId);
        filteredMessages = filteredMessages.filter(msg => msg.id !== messageId);
        updateStatistics();
        displayMessages();
        
        alert('Message deleted successfully!');
    } else {
        // Try localStorage fallback
        deleteFromLocalStorage(messageId);
        allMessages = allMessages.filter(msg => msg.id !== messageId);
        filteredMessages = filteredMessages.filter(msg => msg.id !== messageId);
        updateStatistics();
        displayMessages();
        
        alert('Message deleted from local storage!');
    }
}

// Delete from API
async function deleteFromAPI(messageId) {
    try {
        const response = await fetch(`tables/love_messages/${messageId}`, {
            method: 'DELETE'
        });
        
        if (response.ok || response.status === 204) {
            console.log('Message deleted from API');
            return true;
        }
        return false;
    } catch (error) {
        console.log('Could not delete from API:', error);
        return false;
    }
}

// Delete from localStorage
function deleteFromLocalStorage(messageId) {
    try {
        let messages = JSON.parse(localStorage.getItem(MESSAGE_STORAGE_KEY) || '[]');
        messages = messages.filter(msg => msg.id !== messageId);
        localStorage.setItem(MESSAGE_STORAGE_KEY, JSON.stringify(messages));
        console.log('Message deleted from localStorage');
    } catch (error) {
        console.error('Error deleting from localStorage:', error);
    }
}

// Format date
function formatDate(dateString) {
    if (!dateString) return 'Unknown date';
    
    try {
        const date = new Date(dateString);
        return date.toLocaleString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    } catch (error) {
        return 'Invalid date';
    }
}

// Format time ago
function formatTimeAgo(date) {
    const now = new Date();
    const diffMs = now - date;
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 1) return 'Just now';
    if (diffMins < 60) return `${diffMins}m ago`;
    if (diffHours < 24) return `${diffHours}h ago`;
    if (diffDays < 7) return `${diffDays}d ago`;
    return `${Math.floor(diffDays / 7)}w ago`;
}

// Escape HTML to prevent XSS
function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

// Escape attribute value
function escapeAttribute(text) {
    return text.replace(/'/g, "\\'").replace(/"/g, '\\"');
}
