// ====================================
// ALTTABCORP - Sistema Principal
// Plataforma Corporativa
// ====================================

// ====================================
// Utility Functions
// ====================================


// Console easter egg
console.log('%c🚀 AlttabCorp', 'color: #0066FF; font-size: 20px; font-weight: bold;');
console.log('%cInteressado em fazer parte da nossa equipe?', 'color: #00C2FF; font-size: 14px;');
console.log('%cEnvie um email para: alttabcorp@gmail.com', 'color: #A8B2D1; font-size: 12px;');

// Debounce para otimização de performance
const debounce = (func, wait = 10) => {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
};

// Loading Screen - Transição Profissional
window.addEventListener('load', () => {
    const loading = document.querySelector('.loading');
    setTimeout(() => {
        loading.classList.add('hidden');
        setTimeout(() => {
            loading.style.display = 'none';
        }, 400);
    }, 600);
});

// ====================================
// Mobile Menu Toggle
// ====================================
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');
const navLinks = document.querySelectorAll('.nav-menu a');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
    document.body.classList.toggle('menu-open');
});

// Close menu when clicking a link
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
        document.body.classList.remove('menu-open');
    });
});

// Close menu when clicking outside
document.addEventListener('click', (e) => {
    if (!navMenu.contains(e.target) && !hamburger.contains(e.target)) {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
        document.body.classList.remove('menu-open');
    }
});

// ====================================
// Smooth Scroll
// ====================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const headerOffset = 80;
            const elementPosition = target.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// ====================================
// Header Scroll Effect
// ====================================
const header = document.querySelector('.header');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    // Add shadow on scroll
    if (currentScroll > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
    
    // Hide/show header on scroll direction
    if (currentScroll > lastScroll && currentScroll > 500) {
        header.style.transform = 'translateY(-100%)';
    } else {
        header.style.transform = 'translateY(0)';
    }
    
    lastScroll = currentScroll;
});

// ====================================
// Scroll to Top Button
// ====================================
const scrollTopBtn = document.querySelector('.scroll-top');

window.addEventListener('scroll', () => {
    if (window.pageYOffset > 500) {
        scrollTopBtn.classList.add('visible');
    } else {
        scrollTopBtn.classList.remove('visible');
    }
});

scrollTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// ====================================
// Intersection Observer - Animações Profissionais
// ====================================
const observerOptions = {
    threshold: 0.15,
    rootMargin: '0px 0px -80px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate');
            
            // Animate children com delay escalonado
            const children = entry.target.querySelectorAll('.animate-delay-1, .animate-delay-2, .animate-delay-3, .animate-delay-4, .animate-delay-5');
            children.forEach(child => {
                child.classList.add('animate');
            });
        }
    });
}, observerOptions);

// Observe sections
document.querySelectorAll('.section, .projeto-card, .tech-category, .stat-item, .area-feature, .contact-method').forEach(el => {
    observer.observe(el);
});

// ====================================
// Parallax Sutil - Corporativo
// ====================================
const floatingElements = document.querySelectorAll('.floating-element');

window.addEventListener('scroll', debounce(() => {
    const scrolled = window.pageYOffset;
    
    floatingElements.forEach((element, index) => {
        const speed = 0.08 + (index * 0.02); // Movimento muito mais sutil
        const yPos = -(scrolled * speed);
        // Removido a rotação para manter profissional
        element.style.transform = `translate3d(0, ${yPos}px, 0)`;
    });
}, 10));

// ====================================
// Animate Numbers (Stats)
// ====================================
const animateValue = (element, start, end, duration) => {
    let startTimestamp = null;
    const step = (timestamp) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / duration, 1);
        const current = Math.floor(progress * (end - start) + start);
        element.textContent = current + (element.dataset.suffix || '');
        if (progress < 1) {
            window.requestAnimationFrame(step);
        }
    };
    window.requestAnimationFrame(step);
};

// Observer for stats
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting && !entry.target.classList.contains('animated')) {
            const statNumber = entry.target.querySelector('.stat-number');
            if (statNumber) {
                const endValue = parseInt(statNumber.textContent);
                if (!isNaN(endValue)) {
                    const suffix = statNumber.textContent.replace(/[0-9]/g, '');
                    statNumber.dataset.suffix = suffix;
                    animateValue(statNumber, 0, endValue, 2000);
                    entry.target.classList.add('animated');
                }
            }
        }
    });
}, { threshold: 0.5 });

document.querySelectorAll('.stat-item').forEach(stat => {
    statsObserver.observe(stat);
});

// ====================================
// Button Ripple Effect
// ====================================
document.querySelectorAll('.btn').forEach(button => {
    button.addEventListener('click', function(e) {
        const rect = this.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const ripple = document.createElement('span');
        ripple.className = 'ripple';
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
        
        this.appendChild(ripple);
        
        setTimeout(() => {
            ripple.remove();
        }, 600);
    });
});

// ====================================
// Projeto Cards - Hover Profissional
// ====================================
document.querySelectorAll('.projeto-card').forEach(card => {
    // Efeito sutil de elevação e sombra
    card.addEventListener('mouseenter', () => {
        card.style.transform = 'translateY(-3px)';
        card.style.transition = 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)';
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'translateY(0)';
    });
});

// ====================================
// Navbar Active Link
// ====================================
const sections = document.querySelectorAll('section[id]');

const highlightNavLink = () => {
    const scrollY = window.pageYOffset;
    
    sections.forEach(section => {
        const sectionHeight = section.offsetHeight;
        const sectionTop = section.offsetTop - 100;
        const sectionId = section.getAttribute('id');
        const navLink = document.querySelector(`.nav-menu a[href="#${sectionId}"]`);
        
        if (navLink) {
            if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                navLink.classList.add('active');
            } else {
                navLink.classList.remove('active');
            }
        }
    });
};

window.addEventListener('scroll', highlightNavLink);

// ====================================
// Lazy Load Images
// ====================================
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                if (img.dataset.src) {
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                }
                imageObserver.unobserve(img);
            }
        });
    });
    
    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
}

// ====================================
// Preload Critical Images
// ====================================
const preloadImages = () => {
    const images = document.querySelectorAll('img[src]');
    images.forEach(img => {
        const link = document.createElement('link');
        link.rel = 'preload';
        link.as = 'image';
        link.href = img.src;
        document.head.appendChild(link);
    });
};

// ====================================
// Accessibility: Keyboard Navigation
// ====================================
document.addEventListener('keydown', (e) => {
    // ESC to close mobile menu
    if (e.key === 'Escape' && navMenu.classList.contains('active')) {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
        document.body.classList.remove('menu-open');
    }
});

// ====================================
// Initialize
// ====================================
document.addEventListener('DOMContentLoaded', () => {
    
    // Load com transição suave
    document.body.classList.add('loaded');
    
    // Trigger initial highlight
    highlightNavLink();
});

// ====================================
// Reduce Motion Support - Acessibilidade
// ====================================
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

if (prefersReducedMotion.matches) {
    // Desabilita animações complexas mantendo transições básicas
    const style = document.createElement('style');
    style.textContent = `
        * {
            animation-duration: 0.01ms !important;
            animation-iteration-count: 1 !important;
            transition-duration: 0.15s !important;
        }
        .floating-element {
            animation: none !important;
        }
    `;
    document.head.appendChild(style);
}

// ====================================
// Service Worker Registration (Optional)
// ====================================
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        // Uncomment to enable service worker
        // navigator.serviceWorker.register('/sw.js').then(registration => {
        //     console.log('SW registered: ', registration);
        // }).catch(error => {
        //     console.log('SW registration failed: ', error);
        // });
    });
}

// ====================================
// CAROUSEL - Sistema de Galeria de Imagens
// ====================================
class Carousel {
    constructor(element) {
        this.carousel = element;
        this.track = element.querySelector('.carousel-track');
        this.slides = Array.from(element.querySelectorAll('.carousel-slide'));
        this.prevBtn = element.querySelector('.carousel-prev');
        this.nextBtn = element.querySelector('.carousel-next');
        this.indicators = Array.from(element.querySelectorAll('.indicator'));
        
        this.currentIndex = 0;
        this.autoplayInterval = null;
        this.autoplayDelay = 5000;
        
        this.init();
    }
    
    init() {
        // Event listeners para botões
        this.prevBtn?.addEventListener('click', () => this.prev());
        this.nextBtn?.addEventListener('click', () => this.next());
        
        // Event listeners para indicadores
        this.indicators.forEach((indicator, index) => {
            indicator.addEventListener('click', () => this.goToSlide(index));
        });
        
        // Keyboard navigation
        this.carousel.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowLeft') this.prev();
            if (e.key === 'ArrowRight') this.next();
        });
        
        // Pause autoplay on hover
        this.carousel.addEventListener('mouseenter', () => this.stopAutoplay());
        this.carousel.addEventListener('mouseleave', () => this.startAutoplay());
        
        // Touch/swipe support
        this.addTouchSupport();
        
        // Start autoplay
        this.startAutoplay();
    }
    
    goToSlide(index) {
        // Remove active class
        this.slides[this.currentIndex].classList.remove('active');
        this.indicators[this.currentIndex]?.classList.remove('active');
        
        // Update index
        this.currentIndex = index;
        
        // Add active class
        this.slides[this.currentIndex].classList.add('active');
        this.indicators[this.currentIndex]?.classList.add('active');
    }
    
    next() {
        const nextIndex = (this.currentIndex + 1) % this.slides.length;
        this.goToSlide(nextIndex);
    }
    
    prev() {
        const prevIndex = (this.currentIndex - 1 + this.slides.length) % this.slides.length;
        this.goToSlide(prevIndex);
    }
    
    startAutoplay() {
        this.stopAutoplay();
        this.autoplayInterval = setInterval(() => this.next(), this.autoplayDelay);
    }
    
    stopAutoplay() {
        if (this.autoplayInterval) {
            clearInterval(this.autoplayInterval);
            this.autoplayInterval = null;
        }
    }
    
    addTouchSupport() {
        let touchStartX = 0;
        let touchEndX = 0;
        
        this.carousel.addEventListener('touchstart', (e) => {
            touchStartX = e.changedTouches[0].screenX;
        }, { passive: true });
        
        this.carousel.addEventListener('touchend', (e) => {
            touchEndX = e.changedTouches[0].screenX;
            this.handleSwipe();
        }, { passive: true });
        
        const handleSwipe = () => {
            const swipeThreshold = 50;
            const diff = touchStartX - touchEndX;
            
            if (Math.abs(diff) > swipeThreshold) {
                if (diff > 0) {
                    this.next();
                } else {
                    this.prev();
                }
            }
        };
        
        this.handleSwipe = handleSwipe;
    }
}

// Inicializar todos os carrosséis
document.addEventListener('DOMContentLoaded', () => {
    const carousels = document.querySelectorAll('.carousel');
    carousels.forEach(carousel => new Carousel(carousel));
});