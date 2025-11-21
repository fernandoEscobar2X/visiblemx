/**
 * main.js - JavaScript principal de VisibleMX
 * Funcionalidades core del sitio
 */

// ==========================================
// 1. AÑO DINÁMICO EN FOOTER
// ==========================================
function updateYear() {
  const yearSpan = document.getElementById('year');
  if (yearSpan) {
    yearSpan.textContent = new Date().getFullYear();
  }
}

// ==========================================
// 2. HEADER STICKY CON SCROLL
// ==========================================
let lastScroll = 0;
const header = document.getElementById('header');

function handleScroll() {
  const currentScroll = window.scrollY;
  
  if (!header) return;
  
  // Agregar clase 'scrolled' cuando se hace scroll
  if (currentScroll > 20) {
    header.classList.add('scrolled');
  } else {
    header.classList.remove('scrolled');
  }
  
  lastScroll = currentScroll;
}

// ==========================================
// 3. THEME TOGGLE (Dark Mode Manual)
// ==========================================
function initThemeToggle() {
  const themeToggle = document.getElementById('theme-toggle');
  const themeToggleMobile = document.getElementById('theme-toggle-mobile');
  
  // Obtener tema guardado o usar preferencia del sistema
  const savedTheme = localStorage.getItem('theme');
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  const currentTheme = savedTheme || (prefersDark ? 'dark' : 'light');
  
  // Aplicar tema inicial
  document.documentElement.setAttribute('data-theme', currentTheme);
  updateThemeIcon(currentTheme);
  
  // Event listeners para ambos toggles
  if (themeToggle) {
    themeToggle.addEventListener('click', toggleTheme);
  }
  
  if (themeToggleMobile) {
    themeToggleMobile.addEventListener('click', toggleTheme);
  }
  
  function toggleTheme() {
    const current = document.documentElement.getAttribute('data-theme');
    const newTheme = current === 'dark' ? 'light' : 'dark';
    
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    updateThemeIcon(newTheme);
    
    // Track en Analytics
    if (typeof gtag !== 'undefined') {
      gtag('event', 'theme_toggle', {
        'event_category': 'engagement',
        'event_label': newTheme
      });
    }
  }
  
  function updateThemeIcon(theme) {
    const icons = document.querySelectorAll('.theme-icon');
    icons.forEach(icon => {
      icon.textContent = theme === 'dark' ? '☀️' : '🌙';
    });
  }
}

// ==========================================
// 4. SMOOTH SCROLL PARA ANCLAS
// ==========================================
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const href = this.getAttribute('href');
      
      // Ignorar # solo
      if (href === '#') return;
      
      e.preventDefault();
      
      const target = document.querySelector(href);
      if (target) {
        const headerHeight = header ? header.offsetHeight : 80;
        const targetPosition = target.getBoundingClientRect().top + window.scrollY - headerHeight;
        
        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
        
        // Cerrar menú móvil si está abierto
        const mobileMenu = document.getElementById('menu-mobile');
        const burger = document.querySelector('.burger');
        if (mobileMenu && !mobileMenu.hidden) {
          mobileMenu.hidden = true;
          if (burger) burger.setAttribute('aria-expanded', 'false');
        }
      }
    });
  });
}

// ==========================================
// 5. VALIDACIÓN DE FORMULARIO
// ==========================================
function initFormValidation() {
  const contactForm = document.getElementById('contact-form');
  
  if (!contactForm) return;
  
  contactForm.addEventListener('submit', async function(e) {
    e.preventDefault(); // Prevenir envío normal
    
    const nombre = document.getElementById('nombre');
    const email = document.getElementById('email');
    const mensaje = document.getElementById('mensaje');
    const submitBtn = document.getElementById('submit-btn');
    
    // Validación básica
    if (nombre && nombre.value.trim().length < 2) {
      alert('Por favor ingresa tu nombre completo');
      nombre.focus();
      return false;
    }
    
    if (email && !isValidEmail(email.value)) {
      alert('Por favor ingresa un email válido');
      email.focus();
      return false;
    }
    
    if (mensaje && mensaje.value.trim().length < 10) {
      alert('Por favor describe tu proyecto con más detalle (mínimo 10 caracteres)');
      mensaje.focus();
      return false;
    }
    
    // Mostrar loading en botón
    const originalText = submitBtn.innerHTML;
    submitBtn.innerHTML = `
      <span style="display: inline-flex; align-items: center; gap: 8px;">
        <span class="spinner" style="width: 16px; height: 16px; border-width: 2px;"></span> 
        Enviando...
      </span>
    `;
    submitBtn.disabled = true;
    
    try {
      // Enviar formulario a Netlify
      const formData = new FormData(contactForm);
      
      const response = await fetch('/', {
        method: 'POST',
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams(formData).toString()
      });
      
      if (response.ok) {
        // Éxito: Mostrar modal
        showSuccessModal();
        
        // Limpiar formulario
        contactForm.reset();
        
        // Track en Analytics
        if (typeof gtag !== 'undefined') {
          gtag('event', 'form_submit', {
            'event_category': 'conversion',
            'event_label': 'contacto_exitoso'
          });
        }
      } else {
        throw new Error('Error al enviar');
      }
      
    } catch (error) {
      console.error('Error:', error);
      alert('Hubo un error al enviar el mensaje. Por favor intenta de nuevo o contáctanos por WhatsApp.');
    } finally {
      // Restaurar botón
      submitBtn.innerHTML = originalText;
      submitBtn.disabled = false;
    }
  });
  
  function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }
}

// Función para mostrar el modal de éxito
function showSuccessModal() {
  const modal = document.getElementById('success-modal');
  if (modal) {
    modal.style.display = 'flex';
    document.body.style.overflow = 'hidden'; // Prevenir scroll
  }
}

// Función para cerrar el modal
function closeSuccessModal() {
  const modal = document.getElementById('success-modal');
  if (modal) {
    modal.style.display = 'none';
    document.body.style.overflow = ''; // Restaurar scroll
  }
}

// Hacer función global para que funcione desde el HTML
window.closeSuccessModal = closeSuccessModal;

// ==========================================
// 6. INTERSECTION OBSERVER PARA ANIMACIONES
// ==========================================
function initAnimationObserver() {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        
        // Track en Analytics (solo la primera vez)
        if (!entry.target.dataset.tracked && typeof gtag !== 'undefined') {
          const sectionId = entry.target.closest('section')?.id;
          if (sectionId) {
            gtag('event', 'section_view', {
              'event_category': 'engagement',
              'event_label': sectionId
            });
            entry.target.dataset.tracked = 'true';
          }
        }
      }
    });
  }, observerOptions);
  
  // Observar elementos con clase fade-up
  document.querySelectorAll('.fade-up').forEach(el => {
    observer.observe(el);
  });
}

// ==========================================
// 7. DETECTAR CLICKS EN CTA PRINCIPALES
// ==========================================
function initCTATracking() {
  // Track clicks en WhatsApp
  document.querySelectorAll('a[href*="wa.me"]').forEach(link => {
    link.addEventListener('click', function() {
      const section = this.closest('section')?.id || 'unknown';
      
      if (typeof gtag !== 'undefined') {
        gtag('event', 'clic_whatsapp', {
          'event_category': 'conversion',
          'event_label': section
        });
      }
    });
  });
  
  // Track clicks en paquetes
  document.querySelectorAll('a[href="#paquetes"]').forEach(link => {
    link.addEventListener('click', function() {
      if (typeof gtag !== 'undefined') {
        gtag('event', 'clic_ver_paquetes', {
          'event_category': 'engagement',
          'event_label': 'navigation'
        });
      }
    });
  });
}

// ==========================================
// 8. PERFORMANCE MONITORING
// ==========================================
function initPerformanceMonitoring() {
  // Web Vitals tracking (si existe gtag)
  if (typeof gtag !== 'undefined' && 'PerformanceObserver' in window) {
    // Largest Contentful Paint
    try {
      const lcpObserver = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        const lastEntry = entries[entries.length - 1];
        gtag('event', 'LCP', {
          value: Math.round(lastEntry.renderTime || lastEntry.loadTime),
          event_category: 'Web Vitals'
        });
      });
      lcpObserver.observe({ entryTypes: ['largest-contentful-paint'] });
    } catch (e) {
      console.log('LCP observer not supported');
    }
  }
}

// ==========================================
// 9. LAZY LOADING DE IMÁGENES (Fallback para navegadores viejos)
// ==========================================
function initLazyLoading() {
  if ('loading' in HTMLImageElement.prototype) {
    // El navegador soporta lazy loading nativo
    return;
  }
  
  // Fallback para navegadores que no soportan loading="lazy"
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

// ==========================================
// INICIALIZACIÓN
// ==========================================
function init() {
  updateYear();
  initThemeToggle();
  initSmoothScroll();
  initFormValidation();
  initAnimationObserver();
  initCTATracking();
  initPerformanceMonitoring();
  initLazyLoading();
  
  // Event listeners
  window.addEventListener('scroll', handleScroll, { passive: true });
  
  // Ejecutar scroll handler una vez al cargar
  handleScroll();
  
  console.log('✅ VisibleMX inicializado correctamente');
}

// Ejecutar cuando el DOM esté listo
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}

// ==========================================
// EXPORTS PARA TESTING (opcional)
// ==========================================
window.VisibleMX = {
  updateYear,
  handleScroll,
  initThemeToggle,
  initSmoothScroll
};