/**
 * Message Board - Save and Display Messages
 */

const MESSAGE_STORAGE_KEY = 'love_messages_local';

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
    loadMessages();
    setupFormSubmit();
});

// Form submission handler
function setupFormSubmit() {
    const form = document.getElementById('messageForm');
    const messageText = document.getElementById('messageText');
    const successMessage = document.getElementById('successMessage');

    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        const message = messageText.value.trim();
        if (!message) return;

        const messageData = {
            message: message,
            timestamp: new Date().toISOString()
        };

        // Try to save to Table API first
        const saved = await saveToTableAPI(messageData);
        
        if (!saved) {
            // Fallback to localStorage
            saveToLocalStorage(messageData);
        }

        // Show success message
        successMessage.classList.add('show');
        messageText.value = '';

        // Reload messages
        setTimeout(() => {
            loadMessages();
            successMessage.classList.remove('show');
        }, 2000);

        // Scroll to messages
        setTimeout(() => {
            document.getElementById('messagesContainer').scrollIntoView({ 
                behavior: 'smooth', 
                block: 'nearest' 
            });
        }, 2500);
    });
}

// Save to Table API
async function saveToTableAPI(messageData) {
    try {
        const response = await fetch('tables/love_messages', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(messageData)
        });

        if (response.ok) {
            console.log('Message saved to Table API');
            return true;
        }
        return false;
    } catch (error) {
        console.log('Table API not available, using localStorage fallback');
        return false;
    }
}

// Save to localStorage as fallback
function saveToLocalStorage(messageData) {
    try {
        let messages = JSON.parse(localStorage.getItem(MESSAGE_STORAGE_KEY) || '[]');
        messages.unshift({
            id: Date.now().toString(),
            ...messageData
        });
        localStorage.setItem(MESSAGE_STORAGE_KEY, JSON.stringify(messages));
        console.log('Message saved to localStorage');
    } catch (error) {
        console.error('Error saving to localStorage:', error);
    }
}

// Load messages from API or localStorage
async function loadMessages() {
    const container = document.getElementById('messagesContainer');
    
    // Try to load from Table API first
    const apiMessages = await loadFromTableAPI();
    
    if (apiMessages && apiMessages.length > 0) {
        displayMessages(apiMessages, container);
    } else {
        // Fallback to localStorage
        const localMessages = loadFromLocalStorage();
        if (localMessages && localMessages.length > 0) {
            displayMessages(localMessages, container);
        } else {
            container.innerHTML = '<div class="no-messages">No messages yet. Be the first to share your thoughts.</div>';
        }
    }
}

// Load from Table API
async function loadFromTableAPI() {
    try {
        const response = await fetch('tables/love_messages?sort=-created_at&limit=50');
        if (response.ok) {
            const data = await response.json();
            return data.data || [];
        }
        return null;
    } catch (error) {
        console.log('Could not load from Table API');
        return null;
    }
}

// Load from localStorage
function loadFromLocalStorage() {
    try {
        const messages = JSON.parse(localStorage.getItem(MESSAGE_STORAGE_KEY) || '[]');
        return messages;
    } catch (error) {
        console.error('Error loading from localStorage:', error);
        return [];
    }
}

// Display messages
function displayMessages(messages, container) {
    if (!messages || messages.length === 0) {
        container.innerHTML = '<div class="no-messages">No messages yet. Be the first to share your thoughts.</div>';
        return;
    }

    container.innerHTML = messages.map(msg => {
        const date = formatDate(msg.timestamp || msg.created_at);
        const messageText = msg.message || '';
        
        return `
            <div class="message-card">
                <div class="message-text">${escapeHtml(messageText)}</div>
                <div class="message-date">
                    <i class="fas fa-clock"></i> ${date}
                </div>
            </div>
        `;
    }).join('');

    // Animate cards
    const cards = container.querySelectorAll('.message-card');
    cards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        setTimeout(() => {
            card.style.transition = 'all 0.5s ease';
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }, index * 100);
    });
}

// Format date
function formatDate(dateString) {
    if (!dateString) return 'Just now';
    
    try {
        const date = new Date(dateString);
        const now = new Date();
        const diffMs = now - date;
        const diffMins = Math.floor(diffMs / 60000);
        const diffHours = Math.floor(diffMs / 3600000);
        const diffDays = Math.floor(diffMs / 86400000);

        if (diffMins < 1) return 'Just now';
        if (diffMins < 60) return `${diffMins} minute${diffMins > 1 ? 's' : ''} ago`;
        if (diffHours < 24) return `${diffHours} hour${diffHours > 1 ? 's' : ''} ago`;
        if (diffDays < 7) return `${diffDays} day${diffDays > 1 ? 's' : ''} ago`;
        
        return date.toLocaleDateString('en-US', { 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
        });
    } catch (error) {
        return 'Recently';
    }
}

// Escape HTML to prevent XSS
function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML.replace(/\n/g, '<br>');
}
