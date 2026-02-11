/* ================================================
   VisibleMX Premium - Main JavaScript
   GSAP animations, Swiper sliders, and interactions
   ================================================ */

// Wait for DOM
document.addEventListener('DOMContentLoaded', () => {
    // Initialize all modules
    Preloader.init();
    Header.init();
    MobileMenu.init();
    Cursor.init();
    Counters.init();
    Sliders.init();
    Forms.init();
    SmoothScroll.init();
    
    // Initialize AOS
    AOS.init({
        duration: 800,
        easing: 'ease-out-cubic',
        once: true,
        offset: 50
    });
    
    // Initialize GSAP ScrollTrigger
    gsap.registerPlugin(ScrollTrigger);
    Animations.init();
});

/* ================================================
   Preloader
   ================================================ */
const Preloader = {
    init() {
        const preloader = document.querySelector('.preloader');
        if (!preloader) return;
        
        window.addEventListener('load', () => {
            setTimeout(() => {
                preloader.classList.add('hidden');
                document.body.classList.remove('loading');
                
                // Trigger hero animations after preloader
                this.triggerHeroAnimations();
            }, 1800);
        });
    },
    
    triggerHeroAnimations() {
        // Animate hero elements with GSAP
        const tl = gsap.timeline();
        
        tl.from('.hero-badge', {
            y: 30,
            opacity: 0,
            duration: 0.6
        })
        .from('.title-line', {
            y: 50,
            opacity: 0,
            duration: 0.8,
            stagger: 0.15
        }, '-=0.3')
        .from('.hero-subtitle', {
            y: 30,
            opacity: 0,
            duration: 0.6
        }, '-=0.4')
        .from('.hero-cta .btn', {
            y: 30,
            opacity: 0,
            duration: 0.6,
            stagger: 0.1
        }, '-=0.3')
        .from('.stat', {
            y: 30,
            opacity: 0,
            duration: 0.6,
            stagger: 0.1
        }, '-=0.3');
    }
};

/* ================================================
   Header
   ================================================ */
const Header = {
    init() {
        this.header = document.querySelector('.header');
        this.topBar = document.querySelector('.top-bar');
        if (!this.header) return;
        
        this.handleScroll();
        window.addEventListener('scroll', () => this.handleScroll());
    },
    
    handleScroll() {
        const scrollY = window.scrollY;
        const threshold = this.topBar ? 40 : 0;
        
        if (scrollY > threshold) {
            this.header.classList.add('scrolled');
        } else {
            this.header.classList.remove('scrolled');
        }
    }
};

/* ================================================
   Mobile Menu
   ================================================ */
const MobileMenu = {
    init() {
        this.toggle = document.querySelector('.menu-toggle');
        this.menu = document.querySelector('.mobile-menu');
        this.links = document.querySelectorAll('.mobile-nav-link');
        
        if (!this.toggle || !this.menu) return;
        
        this.toggle.addEventListener('click', () => this.toggleMenu());
        
        this.links.forEach(link => {
            link.addEventListener('click', () => this.closeMenu());
        });
    },
    
    toggleMenu() {
        this.toggle.classList.toggle('active');
        this.menu.classList.toggle('active');
        document.body.classList.toggle('no-scroll');
    },
    
    closeMenu() {
        this.toggle.classList.remove('active');
        this.menu.classList.remove('active');
        document.body.classList.remove('no-scroll');
    }
};

/* ================================================
   Custom Cursor
   ================================================ */
const Cursor = {
    init() {
        // Only on desktop with fine pointer
        if (window.innerWidth < 1024 || window.matchMedia('(pointer: coarse)').matches) {
            return;
        }
        
        this.cursor = document.querySelector('.cursor');
        this.follower = document.querySelector('.cursor-follower');
        
        if (!this.cursor || !this.follower) return;
        
        this.cursorX = 0;
        this.cursorY = 0;
        this.followerX = 0;
        this.followerY = 0;
        
        document.addEventListener('mousemove', (e) => {
            this.cursorX = e.clientX;
            this.cursorY = e.clientY;
        });
        
        this.animate();
        this.handleHovers();
    },
    
    animate() {
        // Smooth follower movement
        this.followerX += (this.cursorX - this.followerX) * 0.15;
        this.followerY += (this.cursorY - this.followerY) * 0.15;
        
        if (this.cursor && this.follower) {
            this.cursor.style.left = `${this.cursorX}px`;
            this.cursor.style.top = `${this.cursorY}px`;
            this.follower.style.left = `${this.followerX}px`;
            this.follower.style.top = `${this.followerY}px`;
        }
        
        requestAnimationFrame(() => this.animate());
    },
    
    handleHovers() {
        const interactiveElements = document.querySelectorAll('a, button, .service-card, .portfolio-card, .package-card');
        
        interactiveElements.forEach(el => {
            el.addEventListener('mouseenter', () => {
                this.cursor.style.transform = 'translate(-50%, -50%) scale(2)';
                this.follower.style.width = '60px';
                this.follower.style.height = '60px';
                this.follower.style.opacity = '1';
            });
            
            el.addEventListener('mouseleave', () => {
                this.cursor.style.transform = 'translate(-50%, -50%) scale(1)';
                this.follower.style.width = '40px';
                this.follower.style.height = '40px';
                this.follower.style.opacity = '0.5';
            });
        });
    }
};

/* ================================================
   Counters Animation
   ================================================ */
const Counters = {
    init() {
        this.counters = document.querySelectorAll('[data-count]');
        if (!this.counters.length) return;
        
        this.counters.forEach(counter => {
            this.observeCounter(counter);
        });
    },
    
    observeCounter(counter) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    this.animateCounter(counter);
                    observer.unobserve(counter);
                }
            });
        }, { threshold: 0.5 });
        
        observer.observe(counter);
    },
    
    animateCounter(counter) {
        const target = parseInt(counter.dataset.count);
        const duration = 2000;
        const start = performance.now();
        
        const animate = (currentTime) => {
            const elapsed = currentTime - start;
            const progress = Math.min(elapsed / duration, 1);
            
            // Easing function
            const easeOutQuart = 1 - Math.pow(1 - progress, 4);
            const current = Math.floor(easeOutQuart * target);
            
            counter.textContent = current;
            
            if (progress < 1) {
                requestAnimationFrame(animate);
            } else {
                counter.textContent = target;
            }
        };
        
        requestAnimationFrame(animate);
    }
};

/* ================================================
   Sliders
   ================================================ */
const Sliders = {
    init() {
        this.initServiceSlider();
        this.initPortfolioSlider();
        this.initTestimonialsSlider();
    },
    
    initServiceSlider() {
        const slider = document.querySelector('.service-slider');
        if (!slider) return;
        
        new Swiper('.service-slider', {
            slidesPerView: 1,
            spaceBetween: 20,
            loop: true,
            autoplay: {
                delay: 4000,
                disableOnInteraction: false
            },
            breakpoints: {
                640: {
                    slidesPerView: 2
                },
                1024: {
                    slidesPerView: 3
                },
                1280: {
                    slidesPerView: 4
                }
            }
        });
    },
    
    initPortfolioSlider() {
        const slider = document.querySelector('.portfolio-slider');
        if (!slider) return;
        
        new Swiper('.portfolio-slider', {
            slidesPerView: 1,
            spaceBetween: 30,
            centeredSlides: true,
            loop: true,
            pagination: {
                el: '.portfolio-slider .swiper-pagination',
                clickable: true
            },
            breakpoints: {
                640: {
                    slidesPerView: 1.5
                },
                768: {
                    slidesPerView: 2
                },
                1024: {
                    slidesPerView: 2.5
                },
                1280: {
                    slidesPerView: 3
                }
            }
        });
    },
    
    initTestimonialsSlider() {
        const slider = document.querySelector('.testimonials-slider');
        if (!slider) return;
        
        new Swiper('.testimonials-slider', {
            slidesPerView: 1,
            spaceBetween: 30,
            loop: true,
            autoplay: {
                delay: 5000,
                disableOnInteraction: false
            },
            pagination: {
                el: '.testimonials-slider .swiper-pagination',
                clickable: true
            }
        });
    }
};

/* ================================================
   GSAP Animations
   ================================================ */
const Animations = {
    init() {
        this.parallaxEffects();
        this.revealAnimations();
        this.statsAnimation();
    },
    
    parallaxEffects() {
        // Hero video parallax
        const heroVideo = document.querySelector('.hero-video');
        if (heroVideo) {
            gsap.to(heroVideo, {
                yPercent: 30,
                ease: 'none',
                scrollTrigger: {
                    trigger: '.hero',
                    start: 'top top',
                    end: 'bottom top',
                    scrub: true
                }
            });
        }
        
        // Service images parallax
        gsap.utils.toArray('.service-image img').forEach(img => {
            gsap.to(img, {
                yPercent: -10,
                ease: 'none',
                scrollTrigger: {
                    trigger: img,
                    start: 'top bottom',
                    end: 'bottom top',
                    scrub: true
                }
            });
        });
    },
    
    revealAnimations() {
        // Section titles reveal
        gsap.utils.toArray('.section-title').forEach(title => {
            gsap.from(title, {
                y: 50,
                opacity: 0,
                duration: 1,
                scrollTrigger: {
                    trigger: title,
                    start: 'top 85%',
                    toggleActions: 'play none none none'
                }
            });
        });
        
        // Package cards stagger
        gsap.utils.toArray('.packages-grid').forEach(grid => {
            const cards = grid.querySelectorAll('.package-card');
            gsap.from(cards, {
                y: 60,
                opacity: 0,
                duration: 0.8,
                stagger: 0.15,
                scrollTrigger: {
                    trigger: grid,
                    start: 'top 80%',
                    toggleActions: 'play none none none'
                }
            });
        });
        
        // Process steps
        gsap.utils.toArray('.process-step').forEach((step, i) => {
            gsap.from(step, {
                x: i % 2 === 0 ? -50 : 50,
                opacity: 0,
                duration: 0.8,
                scrollTrigger: {
                    trigger: step,
                    start: 'top 85%',
                    toggleActions: 'play none none none'
                }
            });
        });
    },
    
    statsAnimation() {
        const statsBanner = document.querySelector('.stats-banner');
        if (!statsBanner) return;
        
        gsap.from('.stats-banner .count', {
            textContent: 0,
            duration: 2,
            snap: { textContent: 1 },
            scrollTrigger: {
                trigger: statsBanner,
                start: 'top 80%',
                toggleActions: 'play none none none'
            }
        });
    }
};

/* ================================================
   Forms
   ================================================ */
const Forms = {
    init() {
        this.contactForm = document.querySelector('#contactForm');
        if (this.contactForm) {
            this.contactForm.addEventListener('submit', (e) => this.handleSubmit(e));
        }
        
        // Newsletter form
        const newsletterForm = document.querySelector('.newsletter-form');
        if (newsletterForm) {
            newsletterForm.addEventListener('submit', (e) => this.handleNewsletter(e));
        }
    },
    
    handleSubmit(e) {
        e.preventDefault();
        
        const formData = new FormData(this.contactForm);
        const data = Object.fromEntries(formData);
        
        // Construct WhatsApp message
        let message = `Hola VisibleMX, me interesa información:\n\n`;
        message += `*Nombre:* ${data.name}\n`;
        message += `*Email:* ${data.email}\n`;
        if (data.phone) message += `*Teléfono:* ${data.phone}\n`;
        message += `*Paquete:* ${data.package}\n`;
        if (data.message) message += `*Mensaje:* ${data.message}\n`;
        
        // Encode and open WhatsApp
        const encoded = encodeURIComponent(message);
        window.open(`https://wa.me/5216633634237?text=${encoded}`, '_blank');
        
        // Show success feedback
        this.showSuccess('¡Mensaje enviado! Te redirigimos a WhatsApp.');
        this.contactForm.reset();
    },
    
    handleNewsletter(e) {
        e.preventDefault();
        const email = e.target.querySelector('input').value;
        
        // Here you would typically send to your newsletter service
        console.log('Newsletter signup:', email);
        
        this.showSuccess('¡Gracias por suscribirte!');
        e.target.reset();
    },
    
    showSuccess(message) {
        // Create toast notification
        const toast = document.createElement('div');
        toast.className = 'toast-notification';
        toast.innerHTML = `
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <polyline points="20 6 9 17 4 12"/>
            </svg>
            <span>${message}</span>
        `;
        
        // Style the toast
        Object.assign(toast.style, {
            position: 'fixed',
            bottom: '100px',
            right: '24px',
            background: '#10B981',
            color: 'white',
            padding: '16px 24px',
            borderRadius: '12px',
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            boxShadow: '0 10px 40px rgba(16, 185, 129, 0.3)',
            zIndex: '1000',
            transform: 'translateY(20px)',
            opacity: '0',
            transition: 'all 0.3s ease'
        });
        
        document.body.appendChild(toast);
        
        // Animate in
        requestAnimationFrame(() => {
            toast.style.transform = 'translateY(0)';
            toast.style.opacity = '1';
        });
        
        // Remove after delay
        setTimeout(() => {
            toast.style.transform = 'translateY(20px)';
            toast.style.opacity = '0';
            setTimeout(() => toast.remove(), 300);
        }, 4000);
    }
};

/* ================================================
   Smooth Scroll
   ================================================ */
const SmoothScroll = {
    init() {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', (e) => {
                const href = anchor.getAttribute('href');
                if (href === '#') return;
                
                const target = document.querySelector(href);
                if (!target) return;
                
                e.preventDefault();
                
                const headerOffset = 80;
                const elementPosition = target.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
                
                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            });
        });
    }
};

/* ================================================
   Video Background Fallback
   ================================================ */
const VideoBackground = {
    init() {
        const video = document.querySelector('.hero-video');
        if (!video) return;
        
        // Check if video can play
        video.addEventListener('error', () => {
            // Fallback to static background
            const heroBg = document.querySelector('.hero-bg');
            if (heroBg) {
                heroBg.style.background = 'linear-gradient(135deg, #0A0A0F 0%, #141420 50%, #1E1E2E 100%)';
            }
        });
        
        // Reduce motion preference
        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
            video.pause();
            video.style.display = 'none';
        }
    }
};

// Initialize video background
document.addEventListener('DOMContentLoaded', () => {
    VideoBackground.init();
});

/* ================================================
   Lazy Loading Images
   ================================================ */
const LazyLoad = {
    init() {
        if ('loading' in HTMLImageElement.prototype) {
            // Native lazy loading supported
            const images = document.querySelectorAll('img[loading="lazy"]');
            images.forEach(img => {
                img.src = img.dataset.src || img.src;
            });
        } else {
            // Fallback with Intersection Observer
            const images = document.querySelectorAll('img[loading="lazy"]');
            const imageObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const img = entry.target;
                        img.src = img.dataset.src || img.src;
                        imageObserver.unobserve(img);
                    }
                });
            });
            
            images.forEach(img => imageObserver.observe(img));
        }
    }
};

document.addEventListener('DOMContentLoaded', () => {
    LazyLoad.init();
});
