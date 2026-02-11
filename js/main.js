// ===================================
// SMOOTH SCROLL REVEAL ANIMATIONS
// ===================================

// Intersection Observer for scroll animations
const observerOptions = {
    threshold: 0.15,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('revealed');
            // Optional: unobserve after revealing to improve performance
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe all elements with reveal classes
function initScrollAnimations() {
    const revealElements = document.querySelectorAll(
        '.reveal-left, .reveal-right, .reveal-up, .reveal-fade, .reveal-scale'
    );
    
    revealElements.forEach(element => {
        observer.observe(element);
    });
}

// ===================================
// SMOOTH SCROLLING FOR ANCHOR LINKS
// ===================================
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// ===================================
// INTERACTIVE BUTTON EFFECTS
// ===================================
function initButtonEffects() {
    const buttons = document.querySelectorAll('.btn');
    
    buttons.forEach(button => {
        // Ripple effect on click
        button.addEventListener('click', function(e) {
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.width = ripple.style.height = size + 'px';
            ripple.style.left = x + 'px';
            ripple.style.top = y + 'px';
            ripple.classList.add('ripple');
            
            this.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });

        // Add hover sound effect (visual feedback)
        button.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.02)';
        });

        button.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
        });
    });

    // Add ripple animation styles
    const style = document.createElement('style');
    style.textContent = `
        .btn {
            position: relative;
            overflow: hidden;
        }
        
        .ripple {
            position: absolute;
            border-radius: 50%;
            background: rgba(255, 255, 255, 0.5);
            transform: scale(0);
            animation: ripple-animation 0.6s ease-out;
            pointer-events: none;
        }
        
        @keyframes ripple-animation {
            to {
                transform: scale(4);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);
}

// ===================================
// PARALLAX EFFECT FOR HERO SECTION
// ===================================
function initParallaxEffect() {
    const hero = document.querySelector('.hero');
    if (!hero) return;

    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const parallaxSpeed = 0.5;
        
        if (scrolled < hero.offsetHeight) {
            hero.style.transform = `translateY(${scrolled * parallaxSpeed}px)`;
        }
    });
}

// ===================================
// TESTIMONIAL CARD INTERACTIONS
// ===================================
function initTestimonialInteractions() {
    const testimonialCards = document.querySelectorAll('.testimonial-card');
    
    testimonialCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            // Highlight effect
            this.style.borderLeft = '4px solid var(--primary-color)';
            this.style.paddingLeft = '2.25rem';
        });

        card.addEventListener('mouseleave', function() {
            this.style.borderLeft = 'none';
            this.style.paddingLeft = '2.5rem';
        });
    });
}

// ===================================
// COUNTER ANIMATION FOR STATS
// ===================================
function animateCounter(element, target, duration = 2000) {
    const start = 0;
    const increment = target / (duration / 16); // 60fps
    let current = start;
    
    const timer = setInterval(() => {
        current += increment;
        
        if (current >= target) {
            element.textContent = formatNumber(target);
            clearInterval(timer);
        } else {
            element.textContent = formatNumber(Math.floor(current));
        }
    }, 16);
}

function formatNumber(num) {
    if (num >= 1000000) {
        return (num / 1000000).toFixed(0) + 'M+';
    } else if (num >= 1000) {
        return (num / 1000).toFixed(0) + 'k+';
    }
    return num.toString();
}

function initStatsCounter() {
    const stats = [
        { selector: '.stat-item:nth-child(1) h3', value: 70, suffix: '+ Years' },
        { selector: '.stat-item:nth-child(2) h3', value: 10000000, suffix: '+' },
        { selector: '.stat-item:nth-child(3) h3', value: 100, suffix: '%' }
    ];

    const statsSection = document.querySelector('.story-stats');
    if (!statsSection) return;

    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                stats.forEach(stat => {
                    const element = document.querySelector(stat.selector);
                    if (element && !element.classList.contains('counted')) {
                        element.classList.add('counted');
                        
                        if (stat.value === 70) {
                            animateSimpleCounter(element, stat.value, stat.suffix);
                        } else if (stat.value === 100) {
                            animateSimpleCounter(element, stat.value, stat.suffix);
                        } else {
                            animateCounter(element, stat.value);
                        }
                    }
                });
                statsObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    statsObserver.observe(statsSection);
}

function animateSimpleCounter(element, target, suffix) {
    let current = 0;
    const increment = target / 60; // Animate over ~1 second
    
    const timer = setInterval(() => {
        current += increment;
        
        if (current >= target) {
            element.textContent = target + suffix;
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(current) + suffix;
        }
    }, 16);
}

// ===================================
// SCROLL PROGRESS INDICATOR
// ===================================
function initScrollProgress() {
    // Create progress bar
    const progressBar = document.createElement('div');
    progressBar.id = 'scroll-progress';
    progressBar.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        height: 3px;
        background: linear-gradient(90deg, #d4711e 0%, #f4a460 100%);
        width: 0%;
        z-index: 9999;
        transition: width 0.1s ease-out;
    `;
    document.body.appendChild(progressBar);

    // Update progress on scroll
    window.addEventListener('scroll', () => {
        const windowHeight = window.innerHeight;
        const documentHeight = document.documentElement.scrollHeight - windowHeight;
        const scrolled = window.pageYOffset;
        const progress = (scrolled / documentHeight) * 100;
        
        progressBar.style.width = Math.min(progress, 100) + '%';
    });
}

// ===================================
// NAVBAR BACKGROUND ON SCROLL (if navbar added later)
// ===================================
function initNavbarScroll() {
    const navbar = document.querySelector('nav');
    if (!navbar) return;

    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
}

// ===================================
// TRIGGER CARD HOVER EFFECTS
// ===================================
function initTriggerCardEffects() {
    const triggerCards = document.querySelectorAll('.trigger-card');
    
    triggerCards.forEach(card => {
        // Add tilt effect on mouse move
        card.addEventListener('mousemove', function(e) {
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = (y - centerY) / 20;
            const rotateY = (centerX - x) / 20;
            
            this.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-8px)`;
        });

        card.addEventListener('mouseleave', function() {
            this.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0)';
        });
    });
}

// ===================================
// MOMENT CARD SEQUENTIAL REVEAL
// ===================================
function initMomentCards() {
    const momentCards = document.querySelectorAll('.moment-card');
    
    momentCards.forEach((card, index) => {
        card.style.transitionDelay = `${index * 0.1}s`;
    });
}

// ===================================
// LAZY LOAD IMAGES (for when real images are added)
// ===================================
function initLazyLoading() {
    const images = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.add('loaded');
                imageObserver.unobserve(img);
            }
        });
    });

    images.forEach(img => imageObserver.observe(img));
}

// ===================================
// ACCESSIBILITY: FOCUS VISIBLE
// ===================================
function initAccessibility() {
    // Add focus-visible polyfill behavior
    document.body.addEventListener('keydown', (e) => {
        if (e.key === 'Tab') {
            document.body.classList.add('keyboard-navigation');
        }
    });

    document.body.addEventListener('mousedown', () => {
        document.body.classList.remove('keyboard-navigation');
    });

    // Add styles for keyboard navigation
    const style = document.createElement('style');
    style.textContent = `
        body:not(.keyboard-navigation) *:focus {
            outline: none;
        }
        
        body.keyboard-navigation *:focus {
            outline: 2px solid var(--primary-color);
            outline-offset: 2px;
        }
    `;
    document.head.appendChild(style);
}

// ===================================
// CONSOLE EASTER EGG
// ===================================
function initEasterEgg() {
    console.log('%c🍱 Steel Tiffin ', 'font-size: 24px; font-weight: bold; color: #d4711e;');
    console.log('%cCarrying love from home since generations 💝', 'font-size: 14px; color: #8b4513;');
    console.log('%cBuilt with passion for tradition and sustainability 🌱', 'font-size: 12px; color: #5c4033;');
}

// ===================================
// PERFORMANCE: DEBOUNCE UTILITY
// ===================================
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// ===================================
// INITIALIZE ALL FEATURES
// ===================================
document.addEventListener('DOMContentLoaded', () => {
    console.log('Initializing Steel Tiffin Landing Page...');
    
    // Core animations
    initScrollAnimations();
    initSmoothScroll();
    
    // Interactive elements
    initButtonEffects();
    initTestimonialInteractions();
    initTriggerCardEffects();
    initMomentCards();
    
    // Visual effects
    initParallaxEffect();
    initScrollProgress();
    initStatsCounter();
    
    // Utilities
    initNavbarScroll();
    initLazyLoading();
    initAccessibility();
    initEasterEgg();
    
    console.log('✅ All features initialized successfully!');
});

// ===================================
// HANDLE WINDOW RESIZE
// ===================================
window.addEventListener('resize', debounce(() => {
    // Re-initialize features that depend on viewport size
    console.log('Window resized, adjusting layout...');
}, 250));

// ===================================
// PERFORMANCE MONITORING
// ===================================
window.addEventListener('load', () => {
    // Log page load performance
    if (window.performance) {
        const perfData = window.performance.timing;
        const pageLoadTime = perfData.loadEventEnd - perfData.navigationStart;
        console.log(`⚡ Page loaded in ${pageLoadTime}ms`);
    }
});