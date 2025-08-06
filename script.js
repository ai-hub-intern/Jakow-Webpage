// DOM Elements
const navToggle = document.getElementById('mobile-menu');
const navMenu = document.getElementById('nav-menu');
const navLinks = document.querySelectorAll('.nav-link');
const contactForm = document.getElementById('contact-form');

// Mobile Navigation Toggle
navToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    navToggle.classList.toggle('active');
});

// Close mobile menu when clicking on nav links
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        navToggle.classList.remove('active');
    });
});

// Smooth scrolling for navigation links
navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href');
        const targetSection = document.querySelector(targetId);
        
        if (targetSection) {
            const offsetTop = targetSection.offsetTop - 70; // Account for fixed navbar
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// Change navbar background on scroll
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.backgroundColor = 'rgba(255, 255, 255, 0.98)';
        navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.15)';
    } else {
        navbar.style.backgroundColor = 'rgba(255, 255, 255, 0.95)';
        navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
    }
});

// Active navigation link highlighting
window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('section');
    const scrollPos = window.scrollY + 100;

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');
        
        if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${sectionId}`) {
                    link.classList.add('active');
                }
            });
        }
    });
});

// Intersection Observer for fade-in animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in-up');
        }
    });
}, observerOptions);

// Observe elements for animation
const animateElements = document.querySelectorAll('.portfolio-item, .skill-item, .contact-info, .contact-form');
animateElements.forEach(el => observer.observe(el));

// Contact form handling
contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Get form data
    const formData = new FormData(contactForm);
    const name = formData.get('name');
    const email = formData.get('email');
    const subject = formData.get('subject');
    const message = formData.get('message');
    
    // Basic validation
    if (!name || !email || !subject || !message) {
        showNotification('Bitte füllen Sie alle Felder aus.', 'error');
        return;
    }
    
    if (!isValidEmail(email)) {
        showNotification('Bitte geben Sie eine gültige E-Mail-Adresse ein.', 'error');
        return;
    }
    
    // Simulate form submission
    showNotification('Nachricht wird gesendet...', 'info');
    
    setTimeout(() => {
        showNotification('Vielen Dank für Ihre Nachricht! Ich werde mich bald bei Ihnen melden.', 'success');
        contactForm.reset();
    }, 2000);
});

// Email validation function
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Notification system
function showNotification(message, type = 'info') {
    // Remove existing notification
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <span class="notification-message">${message}</span>
            <button class="notification-close">&times;</button>
        </div>
    `;
    
    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        z-index: 10000;
        max-width: 400px;
        padding: 1rem;
        border-radius: 8px;
        box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
        animation: slideInRight 0.3s ease-out;
        background-color: ${type === 'success' ? '#10b981' : type === 'error' ? '#ef4444' : '#3b82f6'};
        color: white;
    `;
    
    // Add to document
    document.body.appendChild(notification);
    
    // Close button functionality
    const closeBtn = notification.querySelector('.notification-close');
    closeBtn.addEventListener('click', () => {
        notification.style.animation = 'slideOutRight 0.3s ease-out';
        setTimeout(() => notification.remove(), 300);
    });
    
    // Auto-remove after 5 seconds
    setTimeout(() => {
        if (notification.parentNode) {
            notification.style.animation = 'slideOutRight 0.3s ease-out';
            setTimeout(() => notification.remove(), 300);
        }
    }, 5000);
}

// Add notification animations to CSS
const notificationStyles = document.createElement('style');
notificationStyles.textContent = `
    @keyframes slideInRight {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOutRight {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
    
    .notification-content {
        display: flex;
        justify-content: space-between;
        align-items: center;
        gap: 1rem;
    }
    
    .notification-close {
        background: none;
        border: none;
        color: white;
        font-size: 1.5rem;
        cursor: pointer;
        padding: 0;
        line-height: 1;
    }
    
    .notification-close:hover {
        opacity: 0.7;
    }
`;
document.head.appendChild(notificationStyles);

// Typing animation for hero title
function typeWriter(element, text, speed = 100) {
    let i = 0;
    element.innerHTML = '';
    
    function type() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    
    type();
}

// Initialize typing animation when page loads
window.addEventListener('load', () => {
    const heroTitle = document.querySelector('.hero-title');
    const originalText = heroTitle.textContent;
    
    // Start typing animation after a short delay
    setTimeout(() => {
        typeWriter(heroTitle, originalText, 50);
    }, 1000);
});

// Parallax effect for hero section
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');
    const rate = scrolled * -0.5;
    
    if (hero) {
        hero.style.transform = `translateY(${rate}px)`;
    }
});

// Skill items hover effect
const skillItems = document.querySelectorAll('.skill-item');
skillItems.forEach(item => {
    item.addEventListener('mouseenter', () => {
        item.style.transform = 'translateY(-10px) scale(1.05)';
        item.style.boxShadow = '0 15px 30px rgba(0, 0, 0, 0.15)';
    });
    
    item.addEventListener('mouseleave', () => {
        item.style.transform = 'translateY(0) scale(1)';
        item.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.05)';
    });
});

// Portfolio items hover effect
const portfolioItems = document.querySelectorAll('.portfolio-item');
portfolioItems.forEach(item => {
    item.addEventListener('mouseenter', () => {
        item.style.transform = 'translateY(-15px)';
        item.style.boxShadow = '0 20px 40px rgba(0, 0, 0, 0.2)';
    });
    
    item.addEventListener('mouseleave', () => {
        item.style.transform = 'translateY(0)';
        item.style.boxShadow = '0 10px 25px rgba(0, 0, 0, 0.1)';
    });
});

// Add loading screen
function createLoadingScreen() {
    const loadingScreen = document.createElement('div');
    loadingScreen.id = 'loading-screen';
    loadingScreen.innerHTML = `
        <div class="loading-content">
            <div class="loading-spinner"></div>
            <p>Website wird geladen...</p>
        </div>
    `;
    
    loadingScreen.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 9999;
        color: white;
        font-family: 'Inter', sans-serif;
    `;
    
    const loadingSpinnerStyles = `
        .loading-content {
            text-align: center;
        }
        
        .loading-spinner {
            width: 50px;
            height: 50px;
            border: 4px solid rgba(255, 255, 255, 0.3);
            border-top: 4px solid #fbbf24;
            border-radius: 50%;
            animation: spin 1s linear infinite;
            margin: 0 auto 1rem;
        }
        
        @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
        }
    `;
    
    const styleSheet = document.createElement('style');
    styleSheet.textContent = loadingSpinnerStyles;
    document.head.appendChild(styleSheet);
    
    document.body.appendChild(loadingScreen);
    
    // Remove loading screen when page is fully loaded
    window.addEventListener('load', () => {
        setTimeout(() => {
            loadingScreen.style.opacity = '0';
            loadingScreen.style.transition = 'opacity 0.5s ease-out';
            setTimeout(() => {
                loadingScreen.remove();
            }, 500);
        }, 1500);
    });
}

// Initialize loading screen
createLoadingScreen();

// Back to top button
function createBackToTopButton() {
    const backToTopBtn = document.createElement('button');
    backToTopBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
    backToTopBtn.className = 'back-to-top';
    
    backToTopBtn.style.cssText = `
        position: fixed;
        bottom: 30px;
        right: 30px;
        width: 50px;
        height: 50px;
        background-color: #2563eb;
        color: white;
        border: none;
        border-radius: 50%;
        cursor: pointer;
        font-size: 1.2rem;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
        transition: all 0.3s ease;
        opacity: 0;
        visibility: hidden;
        z-index: 1000;
    `;
    
    document.body.appendChild(backToTopBtn);
    
    // Show/hide button based on scroll position
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            backToTopBtn.style.opacity = '1';
            backToTopBtn.style.visibility = 'visible';
        } else {
            backToTopBtn.style.opacity = '0';
            backToTopBtn.style.visibility = 'hidden';
        }
    });
    
    // Scroll to top functionality
    backToTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    // Hover effect
    backToTopBtn.addEventListener('mouseenter', () => {
        backToTopBtn.style.backgroundColor = '#1d4ed8';
        backToTopBtn.style.transform = 'translateY(-3px)';
    });
    
    backToTopBtn.addEventListener('mouseleave', () => {
        backToTopBtn.style.backgroundColor = '#2563eb';
        backToTopBtn.style.transform = 'translateY(0)';
    });
}

// Initialize back to top button
createBackToTopButton();

// Chatbot functionality
class Chatbot {
    constructor() {
        this.isOpen = false;
        this.messages = [];
        this.n8nWebhookUrl = 'YOUR_N8N_WEBHOOK_URL_HERE'; // Diese URL müssen Sie durch Ihre n8n Webhook URL ersetzen
        
        this.initializeElements();
        this.bindEvents();
        this.loadWelcomeMessage();
    }

    initializeElements() {
        this.toggle = document.getElementById('chatbot-toggle');
        this.window = document.getElementById('chatbot-window');
        this.closeBtn = document.getElementById('chatbot-close');
        this.messagesContainer = document.getElementById('chatbot-messages');
        this.form = document.getElementById('chatbot-form');
        this.input = document.getElementById('chatbot-input');
        this.sendBtn = document.getElementById('chatbot-send');
        this.typingIndicator = document.getElementById('chatbot-typing');
        this.notification = document.getElementById('chatbot-notification');
    }

    bindEvents() {
        this.toggle.addEventListener('click', () => this.toggleChat());
        this.closeBtn.addEventListener('click', () => this.closeChat());
        this.form.addEventListener('submit', (e) => this.handleSubmit(e));
        
        // Auto-resize input
        this.input.addEventListener('input', () => {
            if (this.input.value.length > 0) {
                this.sendBtn.style.opacity = '1';
            } else {
                this.sendBtn.style.opacity = '0.6';
            }
        });

        // Enter to send
        this.input.addEventListener('keypress', (e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                this.handleSubmit(e);
            }
        });
    }

    toggleChat() {
        if (this.isOpen) {
            this.closeChat();
        } else {
            this.openChat();
        }
    }

    openChat() {
        this.isOpen = true;
        this.window.classList.add('active');
        this.input.focus();
        this.hideNotification();
        
        // Add opening animation
        this.window.style.animation = 'slideInUp 0.3s ease-out';
    }

    closeChat() {
        this.isOpen = false;
        this.window.style.animation = 'slideOutDown 0.3s ease-out';
        
        setTimeout(() => {
            this.window.classList.remove('active');
        }, 300);
    }

    hideNotification() {
        this.notification.style.display = 'none';
    }

    showNotification() {
        this.notification.style.display = 'flex';
    }

    loadWelcomeMessage() {
        // Hide initial notification after 5 seconds
        setTimeout(() => {
            this.hideNotification();
        }, 5000);
    }

    async handleSubmit(e) {
        e.preventDefault();
        const message = this.input.value.trim();
        
        if (!message) return;

        // Add user message
        this.addMessage(message, 'user');
        this.input.value = '';
        this.sendBtn.style.opacity = '0.6';

        // Show typing indicator
        this.showTyping();

        try {
            // Send to n8n webhook
            const response = await this.sendToN8n(message);
            
            // Hide typing indicator
            this.hideTyping();
            
            // Add bot response
            this.addMessage(response, 'bot');
            
        } catch (error) {
            console.error('Chatbot error:', error);
            this.hideTyping();
            
            // Add error message
            const errorMessage = this.getErrorMessage();
            this.addMessage(errorMessage, 'bot');
        }
    }

    async sendToN8n(message) {
        // If no webhook URL is configured, return demo response
        if (this.n8nWebhookUrl === 'YOUR_N8N_WEBHOOK_URL_HERE') {
            return this.getDemoResponse(message);
        }

        const response = await fetch(this.n8nWebhookUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                message: message,
                timestamp: new Date().toISOString(),
                user_info: {
                    page: window.location.pathname,
                    referrer: document.referrer
                }
            })
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        return data.response || data.message || 'Entschuldigung, ich konnte keine Antwort generieren.';
    }

    getDemoResponse(message) {
        // Demo responses for testing without n8n backend
        const responses = {
            'hallo': 'Hallo! Schön, dass Sie hier sind. Wie kann ich Ihnen heute helfen?',
            'hi': 'Hi! Ich bin Jakows AI-Assistent. Womit kann ich Ihnen behilflich sein?',
            'hilfe': 'Gerne helfe ich Ihnen! Sie können mich zu Jakows Erfahrung, Projekten oder AI-Services fragen.',
            'ai': 'Jakow ist Experte für KI-Integration und führt STARTPLATZ AI HUB. Er arbeitet mit n8n, Claude und LangChain.',
            'erfahrung': 'Jakow ist CEO von STARTPLATZ AI HUB und hat umfangreiche Erfahrung in AI-Consulting, Esports Management und Unternehmensgründung.',
            'kontakt': 'Sie können Jakow unter wbk2020@gmail.com erreichen oder über LinkedIn kontaktieren.',
            'projekte': 'Jakow leitet das STARTPLATZ AI HUB, hatte Erfolg im Esports-Bereich und gründete die Bonum GmbH.',
            'startplatz': 'STARTPLATZ AI HUB ist Deutschlands zentrale Anlaufstelle für KI-Bildung unter Jakows Führung.',
            'danke': 'Gern geschehen! Gibt es noch etwas anderes, womit ich helfen kann?'
        };

        const lowerMessage = message.toLowerCase();
        
        // Check for keyword matches
        for (const [key, response] of Object.entries(responses)) {
            if (lowerMessage.includes(key)) {
                return response;
            }
        }

        // Default responses
        const defaultResponses = [
            'Das ist eine interessante Frage! Jakow ist Experte für AI-Integration und kann Ihnen sicher weiterhelfen.',
            'Für spezifische Fragen zu AI-Projekten empfehle ich Ihnen, direkt Kontakt mit Jakow aufzunehmen.',
            'Jakows Expertise umfasst n8n, Claude und LangChain. Gerne können Sie mehr über seine Projekte erfahren.',
            'Als CEO von STARTPLATZ AI HUB kann Jakow Ihnen bei AI-Strategien und -Implementierung helfen.'
        ];

        return defaultResponses[Math.floor(Math.random() * defaultResponses.length)];
    }

    getErrorMessage() {
        const errorMessages = [
            'Entschuldigung, es gab ein technisches Problem. Bitte versuchen Sie es später erneut.',
            'Momentan kann ich nicht antworten. Kontaktieren Sie Jakow direkt über wbk2020@gmail.com',
            'Es scheint ein Verbindungsproblem zu geben. Bitte versuchen Sie es in einem Moment noch einmal.'
        ];

        return errorMessages[Math.floor(Math.random() * errorMessages.length)];
    }

    addMessage(text, sender) {
        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${sender}-message`;
        
        const avatarDiv = document.createElement('div');
        avatarDiv.className = 'message-avatar';
        
        if (sender === 'bot') {
            avatarDiv.innerHTML = '<i class="fas fa-robot"></i>';
        } else {
            avatarDiv.innerHTML = '<i class="fas fa-user"></i>';
        }
        
        const contentDiv = document.createElement('div');
        contentDiv.className = 'message-content';
        
        const textP = document.createElement('p');
        textP.textContent = text;
        
        const timeSpan = document.createElement('span');
        timeSpan.className = 'message-time';
        timeSpan.textContent = this.formatTime(new Date());
        
        contentDiv.appendChild(textP);
        contentDiv.appendChild(timeSpan);
        
        messageDiv.appendChild(avatarDiv);
        messageDiv.appendChild(contentDiv);
        
        this.messagesContainer.appendChild(messageDiv);
        
        // Scroll to bottom
        this.scrollToBottom();
        
        // Store message
        this.messages.push({
            text: text,
            sender: sender,
            timestamp: new Date()
        });
    }

    showTyping() {
        this.typingIndicator.style.display = 'flex';
        this.scrollToBottom();
    }

    hideTyping() {
        this.typingIndicator.style.display = 'none';
    }

    scrollToBottom() {
        setTimeout(() => {
            this.messagesContainer.scrollTop = this.messagesContainer.scrollHeight;
        }, 100);
    }

    formatTime(date) {
        return date.toLocaleTimeString('de-DE', {
            hour: '2-digit',
            minute: '2-digit'
        });
    }
}

// Initialize chatbot when page loads
let chatbot;
document.addEventListener('DOMContentLoaded', () => {
    chatbot = new Chatbot();
});

// Add slideOutDown animation
const additionalStyles = `
    @keyframes slideOutDown {
        from {
            transform: translateY(0);
            opacity: 1;
        }
        to {
            transform: translateY(20px);
            opacity: 0;
        }
    }
`;

const styleSheet = document.createElement('style');
styleSheet.textContent = additionalStyles;
document.head.appendChild(styleSheet);

console.log('🚀 Website erfolgreich geladen! Willkommen auf Ihrer persönlichen Website.');
console.log('🤖 Chatbot initialisiert! Klicken Sie auf das Chat-Icon, um zu starten.');