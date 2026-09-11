// DOM Elements
const navbar = document.getElementById('navbar');
const navToggle = document.getElementById('nav-toggle');
const navMenu = document.getElementById('nav-menu');
const contactForm = document.getElementById('contactForm');
const toast = document.getElementById('toast');

// Mobile Navigation Toggle
navToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    navToggle.classList.toggle('active');
});

// Navbar Scroll Effect
window.addEventListener('scroll', () => {
    if (window.scrollY > 10) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Smooth Scrolling for Navigation Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const targetSection = document.querySelector(targetId);
        
        if (targetSection) {
            targetSection.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
            
            // Close mobile menu if open
            navMenu.classList.remove('active');
            navToggle.classList.remove('active');
        }
    });
});

// Skills Animation on Scroll
const observeSkills = () => {
    const skillsSection = document.querySelector('.skills');
    const skillBars = document.querySelectorAll('.skill-progress');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                skillBars.forEach(bar => {
                    const skillLevel = bar.getAttribute('data-skill');
                    setTimeout(() => {
                        bar.style.width = skillLevel + '%';
                    }, 200);
                });
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    if (skillsSection) {
        observer.observe(skillsSection);
    }
};

// Contact Form Handling
contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const formData = new FormData(contactForm);
    const data = {
        firstName: formData.get('firstName'),
        lastName: formData.get('lastName'),
        email: formData.get('email'),
        subject: formData.get('subject'),
        message: formData.get('message')
    };
    
    // Basic validation
    if (!data.firstName || !data.lastName || !data.email || !data.subject || !data.message) {
        showToast('Please fill in all fields', 'error');
        return;
    }
    
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(data.email)) {
        showToast('Please enter a valid email address', 'error');
        return;
    }
    
    // Update button state
    const submitButton = contactForm.querySelector('button[type="submit"]');
    const originalText = submitButton.innerHTML;
    submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
    submitButton.disabled = true;
    
    try {
        // Simulate API call (replace with actual endpoint)
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // In a real application, you would send this data to your backend
        console.log('Contact form data:', data);
        
        showToast('Message sent successfully! I\'ll get back to you soon.', 'success');
        contactForm.reset();
        
    } catch (error) {
        console.error('Error sending message:', error);
        showToast('Error sending message. Please try again later.', 'error');
    } finally {
        submitButton.innerHTML = originalText;
        submitButton.disabled = false;
    }
});

// Resume Download
document.querySelector('[data-testid="button-download-resume"]').addEventListener('click', () => {
    // In a real application, this would download the actual resume file
    showToast('Resume download started!', 'success');
    
    // Simulate download
    const link = document.createElement('a');
    link.href = '#'; // Replace with actual resume file URL
    link.download = 'Alex_Johnson_Resume.pdf';
    link.click();
});

// Toast Notification System
function showToast(message, type = 'success') {
    const toastIcon = toast.querySelector('.toast-icon');
    const toastMessage = toast.querySelector('.toast-message');
    
    // Set icon based on type
    if (type === 'success') {
        toastIcon.className = 'toast-icon fas fa-check-circle';
        toast.className = 'toast success';
    } else if (type === 'error') {
        toastIcon.className = 'toast-icon fas fa-exclamation-circle';
        toast.className = 'toast error';
    }
    
    toastMessage.textContent = message;
    toast.classList.add('show');
    
    // Auto hide after 5 seconds
    setTimeout(() => {
        toast.classList.remove('show');
    }, 5000);
}

// Intersection Observer for Animations
const observeAnimations = () => {
    const animatedElements = document.querySelectorAll('.animate-fade-in-up, .animate-slide-in-right');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0) translateX(0)';
            }
        });
    }, { threshold: 0.1 });
    
    animatedElements.forEach(element => {
        // Set initial state
        element.style.opacity = '0';
        if (element.classList.contains('animate-fade-in-up')) {
            element.style.transform = 'translateY(30px)';
        } else if (element.classList.contains('animate-slide-in-right')) {
            element.style.transform = 'translateX(30px)';
        }
        
        observer.observe(element);
    });
};

// Project Card Hover Effects
const setupProjectCards = () => {
    const projectCards = document.querySelectorAll('.project-card');
    
    projectCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-8px)';
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0)';
        });
    });
};

// Loading Animation for External Links
const setupExternalLinks = () => {
    const externalLinks = document.querySelectorAll('a[target="_blank"]');
    
    externalLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            const originalText = link.innerHTML;
            link.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Loading...';
            
            setTimeout(() => {
                link.innerHTML = originalText;
            }, 1000);
        });
    });
};

// Keyboard Navigation Support
document.addEventListener('keydown', (e) => {
    // Close mobile menu with Escape key
    if (e.key === 'Escape' && navMenu.classList.contains('active')) {
        navMenu.classList.remove('active');
        navToggle.classList.remove('active');
    }
    
    // Navigate sections with arrow keys (when focused)
    if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
        const sections = ['home', 'about', 'projects', 'skills', 'testimonials', 'contact'];
        const currentSection = getCurrentSection();
        const currentIndex = sections.indexOf(currentSection);
        
        if (currentIndex !== -1) {
            let nextIndex;
            if (e.key === 'ArrowDown') {
                nextIndex = (currentIndex + 1) % sections.length;
            } else {
                nextIndex = currentIndex === 0 ? sections.length - 1 : currentIndex - 1;
            }
            
            const nextSection = document.getElementById(sections[nextIndex]);
            if (nextSection && document.activeElement.tagName !== 'INPUT' && 
                document.activeElement.tagName !== 'TEXTAREA' && 
                document.activeElement.tagName !== 'SELECT') {
                e.preventDefault();
                nextSection.scrollIntoView({ behavior: 'smooth' });
            }
        }
    }
});

// Get Current Section in Viewport
function getCurrentSection() {
    const sections = ['home', 'about', 'projects', 'skills', 'testimonials', 'contact'];
    const scrollPosition = window.scrollY + 100;
    
    for (let i = sections.length - 1; i >= 0; i--) {
        const section = document.getElementById(sections[i]);
        if (section && section.offsetTop <= scrollPosition) {
            return sections[i];
        }
    }
    return 'home';
}

// Update Active Navigation Link
const updateActiveNavLink = () => {
    const currentSection = getCurrentSection();
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${currentSection}`) {
            link.classList.add('active');
        }
    });
};

// Throttled Scroll Event for Performance
let ticking = false;
function updateOnScroll() {
    updateActiveNavLink();
    ticking = false;
}

window.addEventListener('scroll', () => {
    if (!ticking) {
        requestAnimationFrame(updateOnScroll);
        ticking = true;
    }
});

// Initialize all functionality when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    observeSkills();
    observeAnimations();
    setupProjectCards();
    setupExternalLinks();
    updateActiveNavLink();
    
    // Add mobile menu styles
    const style = document.createElement('style');
    style.textContent = `
        @media (max-width: 767px) {
            .nav-menu {
                position: fixed;
                top: 100%;
                left: 0;
                width: 100%;
                background-color: white;
                border-top: 1px solid var(--border);
                box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.1);
                transform: translateX(-100%);
                transition: transform 0.3s ease;
                z-index: 999;
                padding: 2rem;
                display: flex;
                flex-direction: column;
                gap: 1rem;
            }
            
            .nav-menu.active {
                transform: translateX(0);
                display: flex;
            }
            
            .nav-toggle.active .bar:nth-child(1) {
                transform: rotate(45deg) translate(5px, 5px);
            }
            
            .nav-toggle.active .bar:nth-child(2) {
                opacity: 0;
            }
            
            .nav-toggle.active .bar:nth-child(3) {
                transform: rotate(-45deg) translate(7px, -6px);
            }
            
            .navbar.scrolled {
                background-color: rgba(255, 255, 255, 0.95);
                backdrop-filter: blur(10px);
                border-bottom: 1px solid var(--border);
            }
        }
        
        .nav-link.active {
            color: var(--primary);
        }
        
        .nav-link.active::after {
            width: 100%;
        }
    `;
    document.head.appendChild(style);
});

// Performance: Lazy load images
const lazyLoadImages = () => {
    const images = document.querySelectorAll('img[src]');
    
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.style.opacity = '0';
                img.style.transition = 'opacity 0.3s ease';
                
                img.onload = () => {
                    img.style.opacity = '1';
                };
                
                observer.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
};

// Initialize lazy loading
document.addEventListener('DOMContentLoaded', lazyLoadImages);

// Error handling for images
document.querySelectorAll('img').forEach(img => {
    img.addEventListener('error', () => {
        img.style.display = 'none';
        console.warn('Failed to load image:', img.src);
    });
});

// Service Worker Registration (for future PWA capabilities)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        // Uncomment when you have a service worker file
        // navigator.serviceWorker.register('/sw.js');
    });
}
