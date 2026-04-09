// ==========================================
// Multi-language Support
// ==========================================

// Default language
let currentLanguage = localStorage.getItem('language') || 'ja';

// Set HTML lang attribute
document.documentElement.lang = currentLanguage;

// Function to translate the page
function translatePage(lang) {
    currentLanguage = lang;
    localStorage.setItem('language', lang);
    document.documentElement.lang = lang;
    
    // Update all elements with data-translate attribute
    document.querySelectorAll('[data-translate]').forEach(element => {
        const key = element.getAttribute('data-translate');
        if (translations[lang] && translations[lang][key]) {
            if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA') {
                element.placeholder = translations[lang][key];
            } else {
                element.textContent = translations[lang][key];
            }
        }
    });
    
    // Update active language button
    document.querySelectorAll('.lang-btn').forEach(btn => {
        btn.classList.remove('active');
        if (btn.getAttribute('data-lang') === lang) {
            btn.classList.add('active');
        }
    });
    
    console.log(`Language changed to: ${lang}`);
}

// Initialize language on page load
document.addEventListener('DOMContentLoaded', () => {
    // Apply saved language
    translatePage(currentLanguage);
    
    // Add event listeners to language buttons
    document.querySelectorAll('.lang-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const lang = btn.getAttribute('data-lang');
            translatePage(lang);
        });
    });
});

// ==========================================
// Smooth Scrolling & Navigation
// ==========================================

// Mobile menu toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');
const navLinks = document.querySelectorAll('.nav-link');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a link
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// Navbar scroll effect
const navbar = document.querySelector('.navbar');
window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const navbarHeight = navbar.offsetHeight;
            const targetPosition = target.offsetTop - navbarHeight;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// ==========================================
// Scroll Animations (AOS-like)
// ==========================================

const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('aos-animate');
        }
    });
}, observerOptions);

// Observe all elements with data-aos attribute
document.querySelectorAll('[data-aos]').forEach(element => {
    observer.observe(element);
});

// ==========================================
// Contact Form Handling
// ==========================================

const contactForm = document.getElementById('contactForm');
const formMessage = document.getElementById('formMessage');

contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Get form data
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const subject = document.getElementById('subject').value;
    const message = document.getElementById('message').value;
    
    // Create mailto link
    const mailtoLink = `mailto:bass293ou@muzzlefx.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`)}`;
    
    // Open email client
    window.location.href = mailtoLink;
    
    // Show success message
    formMessage.textContent = translations[currentLanguage]['contact.success'];
    formMessage.className = 'form-message success';
    formMessage.style.display = 'block';
    
    // Reset form
    contactForm.reset();
    
    // Hide message after 5 seconds
    setTimeout(() => {
        formMessage.style.display = 'none';
    }, 5000);
});

// Form validation
const emailInput = document.getElementById('email');
emailInput.addEventListener('blur', () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(emailInput.value)) {
        emailInput.style.borderColor = '#ff0000';
    } else {
        emailInput.style.borderColor = 'var(--color-primary)';
    }
});

// ==========================================
// Parallax Effect for Hero Background
// ==========================================

window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const heroBackground = document.querySelector('.animated-bg');
    if (heroBackground) {
        heroBackground.style.transform = `translateY(${scrolled * 0.5}px)`;
    }
});

// ==========================================
// Dynamic Year in Footer
// ==========================================

document.addEventListener('DOMContentLoaded', () => {
    const footerYear = document.querySelector('.footer-bottom p');
    if (footerYear) {
        const currentYear = new Date().getFullYear();
        footerYear.innerHTML = `&copy; ${currentYear} Muzzle. All rights reserved.`;
    }
});

// ==========================================
// Cursor Trail Effect (Optional Enhancement)
// ==========================================

let cursorTrail = [];
const trailLength = 10;

document.addEventListener('mousemove', (e) => {
    cursorTrail.push({ x: e.clientX, y: e.clientY, time: Date.now() });
    
    if (cursorTrail.length > trailLength) {
        cursorTrail.shift();
    }
});

// ==========================================
// Typing Effect for Hero Subtitle (Optional)
// ==========================================

const roles = document.querySelectorAll('.role');
roles.forEach((role, index) => {
    role.style.opacity = '0';
    setTimeout(() => {
        role.style.transition = 'opacity 0.5s ease';
        role.style.opacity = '1';
    }, 500 + (index * 300));
});

// ==========================================
// Skill Card Hover Effects
// ==========================================

const skillCards = document.querySelectorAll('.skill-card');
skillCards.forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-10px) scale(1.02)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
    });
});

// ==========================================
// Social Card Click Analytics (Optional)
// ==========================================

const socialCards = document.querySelectorAll('.social-card');
socialCards.forEach(card => {
    card.addEventListener('click', (e) => {
        const platform = card.querySelector('.social-name').textContent;
        console.log(`Social link clicked: ${platform}`);
        // Add analytics tracking here if needed
    });
});

// ==========================================
// Scroll Progress Indicator
// ==========================================

function createScrollProgressBar() {
    const progressBar = document.createElement('div');
    progressBar.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        height: 3px;
        background: linear-gradient(90deg, var(--color-primary), var(--color-accent));
        z-index: 9999;
        transition: width 0.1s ease;
    `;
    document.body.appendChild(progressBar);
    
    window.addEventListener('scroll', () => {
        const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (window.pageYOffset / windowHeight) * 100;
        progressBar.style.width = scrolled + '%';
    });
}

createScrollProgressBar();

// ==========================================
// Lazy Loading Images (if any are added later)
// ==========================================

if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                if (img.dataset.src) {
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                    observer.unobserve(img);
                }
            }
        });
    });
    
    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
}

// ==========================================
// Console Welcome Message
// ==========================================

console.log('%c🎵 Welcome to Muzzle\'s Portfolio! 🎵', 
    'font-size: 20px; font-weight: bold; color: #00d9ff; text-shadow: 0 0 10px #00d9ff;');
console.log('%cDJ / Furry / Photographer', 
    'font-size: 14px; color: #00ffcc;');
console.log('%c━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━', 
    'color: #00d9ff;');
console.log('Interested in the code? Check out the source! 🚀');

// ==========================================
// Performance Monitoring (Optional)
// ==========================================

window.addEventListener('load', () => {
    // Log page load time
    const loadTime = performance.timing.loadEventEnd - performance.timing.navigationStart;
    console.log(`⚡ Page loaded in ${loadTime}ms`);
    
    // Add loaded class to body for any CSS animations
    document.body.classList.add('loaded');
});

// ==========================================
// Keyboard Navigation Enhancement
// ==========================================

document.addEventListener('keydown', (e) => {
    // Press 'Escape' to close mobile menu
    if (e.key === 'Escape' && navMenu.classList.contains('active')) {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    }
});

// ==========================================
// Touch Swipe for Mobile Menu
// ==========================================

let touchStartX = 0;
let touchEndX = 0;

document.addEventListener('touchstart', (e) => {
    touchStartX = e.changedTouches[0].screenX;
}, false);

document.addEventListener('touchend', (e) => {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe();
}, false);

function handleSwipe() {
    if (touchEndX < touchStartX - 50 && navMenu.classList.contains('active')) {
        // Swipe left - close menu
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    }
}

// ==========================================
// Prevent Right Click on Images (Optional)
// ==========================================

// Uncomment if you want to protect images
// document.querySelectorAll('img').forEach(img => {
//     img.addEventListener('contextmenu', (e) => {
//         e.preventDefault();
//         return false;
//     });
// });

// ==========================================
// Auto-hide Scroll Indicator
// ==========================================

const scrollIndicator = document.querySelector('.scroll-indicator');
if (scrollIndicator) {
    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            scrollIndicator.style.opacity = '0';
            scrollIndicator.style.pointerEvents = 'none';
        } else {
            scrollIndicator.style.opacity = '1';
            scrollIndicator.style.pointerEvents = 'auto';
        }
    });
}
