// Portfolio Website JavaScript

// DOM Content Loaded Event
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all functionality
    initNavigation();
    initThemeToggle();
    initTypingAnimation();
    initScrollAnimations();
    initFormValidation();
    initLoadingAnimations();
    initSkillsAnimation();
});

// Navigation functionality
function initNavigation() {
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');
    const navbar = document.getElementById('navbar');

    // Mobile menu toggle
    navToggle.addEventListener('click', function() {
        navToggle.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // Close mobile menu when clicking on a link
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            navToggle.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });

    // Smooth scrolling for navigation links
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 80;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Active section highlighting and navbar background
    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset;
        
        // Add scrolled class to navbar
        if (scrollTop > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }

        // Highlight active section
        const sections = document.querySelectorAll('section[id]');
        let currentSection = '';

        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionHeight = section.offsetHeight;
            
            if (scrollTop >= sectionTop && scrollTop < sectionTop + sectionHeight) {
                currentSection = section.getAttribute('id');
            }
        });

        // Update active nav link
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${currentSection}`) {
                link.classList.add('active');
            }
        });
    });
}

// Theme toggle functionality
function initThemeToggle() {
    const themeToggle = document.getElementById('theme-toggle');
    const themeIcon = themeToggle.querySelector('.theme-icon');
    
    // Check for saved theme preference or default to light mode
    const currentTheme = localStorage.getItem('theme') || 'light';
    document.documentElement.setAttribute('data-color-scheme', currentTheme);
    updateThemeIcon(currentTheme);

    themeToggle.addEventListener('click', function() {
        const currentTheme = document.documentElement.getAttribute('data-color-scheme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        
        document.documentElement.setAttribute('data-color-scheme', newTheme);
        localStorage.setItem('theme', newTheme);
        updateThemeIcon(newTheme);
    });

    function updateThemeIcon(theme) {
        themeIcon.textContent = theme === 'dark' ? '☀️' : '🌙';
    }
}

// Typing animation for hero section
function initTypingAnimation() {
    const typingElement = document.getElementById('typing-text');
    const texts = [
        'Specializing in Web & API Test Automation',
        'Quality Assurance Expert',
        'ISTQB Certified Professional',
        'Selenium WebDriver Specialist',
        'Agile Testing Practitioner'
    ];
   if(obj && obj.sentence) {
    // Safe to access obj.sentence
}
    let textIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingSpeed = 100;

    function typeText() {
        const currentText = texts[textIndex];
        
        if (isDeleting) {
            typingElement.textContent = currentText.substring(0, charIndex - 1);
            charIndex--;
            typingSpeed = 50;
        } else {
            typingElement.textContent = currentText.substring(0, charIndex + 1);
            charIndex++;
            typingSpeed = 100;
        }

        if (!isDeleting && charIndex === currentText.length) {
            // Pause at end of text
            typingSpeed = 2000;
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            textIndex = (textIndex + 1) % texts.length;
            typingSpeed = 500;
        }

        setTimeout(typeText, typingSpeed);
    }

    // Start typing animation
    setTimeout(typeText, 1000);
}

// Scroll animations using Intersection Observer
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    // Observe elements for animation
    const animatedElements = document.querySelectorAll('.fade-in, .slide-in-left, .slide-in-right');
    animatedElements.forEach(element => {
        observer.observe(element);
    });

    // Add animation classes to elements
    document.querySelectorAll('.about-content > *').forEach((element, index) => {
        element.classList.add('fade-in');
        element.style.transitionDelay = `${index * 0.1}s`;
    });

    document.querySelectorAll('.skill-category').forEach((element, index) => {
        element.classList.add('slide-in-left');
        element.style.transitionDelay = `${index * 0.2}s`;
    });

    document.querySelectorAll('.timeline-item').forEach((element, index) => {
        element.classList.add('slide-in-right');
        element.style.transitionDelay = `${index * 0.3}s`;
    });

    document.querySelectorAll('.project-card').forEach((element, index) => {
        element.classList.add('fade-in');
        element.style.transitionDelay = `${index * 0.1}s`;
    });

    document.querySelectorAll('.contact-info, .contact-form').forEach((element, index) => {
        element.classList.add('slide-in-left');
        element.style.transitionDelay = `${index * 0.2}s`;
    });
}

// Skills progress bar animation
function initSkillsAnimation() {
    const skillsSection = document.getElementById('skills');
    let skillsAnimated = false;

    const skillsObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting && !skillsAnimated) {
                animateSkillBars();
                skillsAnimated = true;
            }
        });
    }, {
        threshold: 0.5
    });

    skillsObserver.observe(skillsSection);

    function animateSkillBars() {
        const skillBars = document.querySelectorAll('.skill-progress');
        
        skillBars.forEach((bar, index) => {
            setTimeout(() => {
                const progress = bar.getAttribute('data-progress');
                bar.style.width = progress + '%';
            }, index * 100);
        });
    }
}

// Form validation
function initFormValidation() {
    const form = document.getElementById('contact-form');
    const nameField = document.getElementById('name');
    const emailField = document.getElementById('email');
    const subjectField = document.getElementById('subject');
    const messageField = document.getElementById('message');

    // Real-time validation
    nameField.addEventListener('blur', () => validateField(nameField, 'name'));
    emailField.addEventListener('blur', () => validateField(emailField, 'email'));
    subjectField.addEventListener('blur', () => validateField(subjectField, 'subject'));
    messageField.addEventListener('blur', () => validateField(messageField, 'message'));

    // Clear errors on input
    [nameField, emailField, subjectField, messageField].forEach(field => {
        field.addEventListener('input', () => clearFieldError(field));
    });

    // Form submission
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        let isValid = true;
        
        // Validate all fields
        if (!validateField(nameField, 'name')) isValid = false;
        if (!validateField(emailField, 'email')) isValid = false;
        if (!validateField(subjectField, 'subject')) isValid = false;
        if (!validateField(messageField, 'message')) isValid = false;

        if (isValid) {
            // Simulate form submission
            showFormSuccess();
            form.reset();
        }
    });

    function validateField(field, type) {
        const value = field.value.trim();
        let isValid = true;
        let errorMessage = '';

        // Clear previous errors
        clearFieldError(field);

        // Validation rules
        switch(type) {
            case 'name':
                if (value.length < 2) {
                    errorMessage = 'Name must be at least 2 characters long';
                    isValid = false;
                }
                break;
            case 'email':
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!emailRegex.test(value)) {
                    errorMessage = 'Please enter a valid email address';
                    isValid = false;
                }
                break;
            case 'subject':
                if (value.length < 5) {
                    errorMessage = 'Subject must be at least 5 characters long';
                    isValid = false;
                }
                break;
            case 'message':
                if (value.length < 10) {
                    errorMessage = 'Message must be at least 10 characters long';
                    isValid = false;
                }
                break;
        }

        if (!isValid) {
            showFieldError(field, errorMessage);
        }

        return isValid;
    }

    function showFieldError(field, message) {
        field.classList.add('error');
        const errorElement = document.getElementById(field.name + '-error');
        if (errorElement) {
            errorElement.textContent = message;
            errorElement.classList.add('show');
        }
    }

    function clearFieldError(field) {
        field.classList.remove('error');
        const errorElement = document.getElementById(field.name + '-error');
        if (errorElement) {
            errorElement.classList.remove('show');
        }
    }

    function showFormSuccess() {
        const successElement = document.getElementById('form-success');
        if (successElement) {
            successElement.style.display = 'block';
            setTimeout(() => {
                successElement.style.display = 'none';
            }, 5000);
        }
    }
}

// Loading animations
function initLoadingAnimations() {
    // Add loading class to body initially
    document.body.classList.add('loading');

    // Remove loading class after page is fully loaded
    window.addEventListener('load', function() {
        setTimeout(() => {
            document.body.classList.remove('loading');
            document.body.classList.add('loaded');
            
            // Animate hero section elements
            animateHeroElements();
        }, 300);
    });

    function animateHeroElements() {
        const heroElements = document.querySelectorAll('.hero-text > *');
        heroElements.forEach((element, index) => {
            element.style.opacity = '0';
            element.style.transform = 'translateY(30px)';
            
            setTimeout(() => {
                element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }, index * 200);
        });
    }
}

// Utility functions
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

// Parallax effect for hero section
window.addEventListener('scroll', debounce(function() {
    const scrolled = window.pageYOffset;
    const heroBackground = document.querySelector('.hero-background');
    
    if (heroBackground && scrolled < window.innerHeight) {
        const rate = scrolled * -0.5;
        heroBackground.style.transform = `translateY(${rate}px)`;
    }
}, 10));

// Keyboard navigation support
document.addEventListener('keydown', function(e) {
    // ESC key closes mobile menu
    if (e.key === 'Escape') {
        const navToggle = document.getElementById('nav-toggle');
        const navMenu = document.getElementById('nav-menu');
        
        if (navMenu.classList.contains('active')) {
            navToggle.classList.remove('active');
            navMenu.classList.remove('active');
        }
    }
    
    // Enter key activates theme toggle
    if (e.key === 'Enter' && e.target.id === 'theme-toggle') {
        e.target.click();
    }
});

// Focus management for accessibility
document.addEventListener('focusin', function(e) {
    if (e.target.matches('.nav-link')) {
        // Ensure mobile menu is visible when navigating with keyboard
        const navMenu = document.getElementById('nav-menu');
        if (window.innerWidth <= 768 && !navMenu.classList.contains('active')) {
            const navToggle = document.getElementById('nav-toggle');
            navToggle.classList.add('active');
            navMenu.classList.add('active');
        }
    }
});

// Preload critical resources
function preloadResources() {
    // Preload fonts if using web fonts
    const fontLinks = document.querySelectorAll('link[rel="stylesheet"]');
    fontLinks.forEach(link => {
        const prefetchLink = document.createElement('link');
        prefetchLink.rel = 'preload';
        prefetchLink.as = 'style';
        prefetchLink.href = link.href;
        document.head.appendChild(prefetchLink);
    });
}

// Initialize preloading
preloadResources();

// Performance monitoring
if ('performance' in window) {
    window.addEventListener('load', function() {
        setTimeout(() => {
            const perfData = performance.timing;
            const loadTime = perfData.loadEventEnd - perfData.navigationStart;
            console.log('Page load time:', loadTime + 'ms');
        }, 0);
    });
}

// Error handling
window.addEventListener('error', function(e) {
    console.error('JavaScript error:', e.message, 'at', e.filename + ':' + e.lineno);
});

// Service worker registration for enhanced performance (optional)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', function() {
        // Uncomment if you have a service worker file
        // navigator.serviceWorker.register('/sw.js')
        //     .then(registration => console.log('SW registered'))
        //     .catch(registrationError => console.log('SW registration failed'));
    });
}
