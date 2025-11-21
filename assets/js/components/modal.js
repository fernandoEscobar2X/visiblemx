/**
 * Modal.js - Sistema de modales reutilizable
 * Para mostrar demos de proyectos, videos, etc.
 */

class Modal {
  constructor() {
    this.modal = null;
    this.isOpen = false;
    this.init();
  }

  /**
   * Inicializa el modal
   */
  init() {
    // Crear estructura del modal si no existe
    if (!document.getElementById('modal-overlay')) {
      this.createModal();
    }
    
    this.modal = document.getElementById('modal-overlay');
    this.modalContent = document.getElementById('modal-content');
    this.modalClose = document.getElementById('modal-close');
    
    // Event listeners
    this.bindEvents();
  }

  /**
   * Crea la estructura HTML del modal
   */
  createModal() {
    const modalHTML = `
      <div id="modal-overlay" class="modal-overlay" aria-hidden="true">
        <div class="modal-container">
          <div class="modal-header">
            <button id="modal-close" class="modal-close" aria-label="Cerrar modal">
              <svg width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>
          </div>
          <div id="modal-content" class="modal-content"></div>
        </div>
      </div>
    `;
    
    document.body.insertAdjacentHTML('beforeend', modalHTML);
  }

  /**
   * Vincula eventos
   */
  bindEvents() {
    // Cerrar al hacer clic en el overlay
    this.modal.addEventListener('click', (e) => {
      if (e.target === this.modal) {
        this.close();
      }
    });
    
    // Cerrar al hacer clic en el botón
    this.modalClose.addEventListener('click', () => this.close());
    
    // Cerrar con tecla ESC
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && this.isOpen) {
        this.close();
      }
    });
  }

  /**
   * Abre el modal con contenido
   * @param {string|HTMLElement} content - Contenido del modal
   * @param {Object} options - Opciones adicionales
   */
  open(content, options = {}) {
    this.modalContent.innerHTML = '';
    
    if (typeof content === 'string') {
      this.modalContent.innerHTML = content;
    } else if (content instanceof HTMLElement) {
      this.modalContent.appendChild(content);
    }
    
    this.modal.classList.add('active');
    this.modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
    this.isOpen = true;
    
    // Track en Analytics
    if (window.VisibleMXAnalytics) {
      window.VisibleMXAnalytics.trackEvent('modal_open', {
        event_category: 'engagement',
        event_label: options.name || 'unknown'
      });
    }
  }

  /**
   * Cierra el modal
   */
  close() {
    this.modal.classList.remove('active');
    this.modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
    this.isOpen = false;
    
    // Limpiar contenido después de la animación
    setTimeout(() => {
      this.modalContent.innerHTML = '';
    }, 300);
  }

  /**
   * Abre modal con iframe (para demos, videos, etc)
   * @param {string} url - URL del contenido
   * @param {Object} options - Opciones
   */
  openIframe(url, options = {}) {
    const iframe = document.createElement('iframe');
    iframe.src = url;
    iframe.style.width = '100%';
    iframe.style.height = '600px';
    iframe.style.border = 'none';
    iframe.style.borderRadius = '8px';
    iframe.setAttribute('loading', 'lazy');
    
    this.open(iframe, options);
  }

  /**
   * Abre modal con imagen
   * @param {string} src - URL de la imagen
   * @param {string} alt - Texto alternativo
   */
  openImage(src, alt = '') {
    const img = document.createElement('img');
    img.src = src;
    img.alt = alt;
    img.style.maxWidth = '100%';
    img.style.height = 'auto';
    img.style.borderRadius = '8px';
    
    this.open(img, { name: 'image_' + alt });
  }

  /**
   * Abre modal con video
   * @param {string} src - URL del video
   */
  openVideo(src) {
    const video = document.createElement('video');
    video.src = src;
    video.controls = true;
    video.style.width = '100%';
    video.style.borderRadius = '8px';
    
    this.open(video, { name: 'video' });
  }
}

// ==========================================
// CSS DEL MODAL (inyectado dinámicamente)
// ==========================================
const modalStyles = `
<style>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.8);
  backdrop-filter: blur(4px);
  z-index: var(--z-modal);
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  visibility: hidden;
  transition: all 0.3s ease;
  padding: var(--space-4);
}

.modal-overlay.active {
  opacity: 1;
  visibility: visible;
}

.modal-container {
  background: var(--bg-card);
  border-radius: var(--radius-xl);
  max-width: 900px;
  width: 100%;
  max-height: 90vh;
  overflow-y: auto;
  box-shadow: var(--shadow-xl);
  transform: translateY(20px) scale(0.95);
  transition: transform 0.3s ease;
  position: relative;
}

.modal-overlay.active .modal-container {
  transform: translateY(0) scale(1);
}

.modal-header {
  position: sticky;
  top: 0;
  background: var(--bg-card);
  padding: var(--space-4);
  border-bottom: 1px solid var(--border);
  display: flex;
  justify-content: flex-end;
  z-index: 10;
}

.modal-close {
  width: 40px;
  height: 40px;
  border-radius: var(--radius);
  background: var(--bg-alt);
  border: 1px solid var(--border);
  color: var(--ink);
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all var(--transition-fast);
}

.modal-close:hover {
  background: var(--accent);
  color: white;
  border-color: var(--accent);
  transform: rotate(90deg);
}

.modal-content {
  padding: var(--space-6);
}

@media (max-width: 640px) {
  .modal-container {
    max-width: 100%;
    max-height: 100vh;
    border-radius: 0;
  }
}
</style>
`;

// Inyectar estilos
if (!document.getElementById('modal-styles')) {
  document.head.insertAdjacentHTML('beforeend', modalStyles);
  const styleTag = document.head.lastElementChild;
  styleTag.id = 'modal-styles';
}

// ==========================================
// INICIALIZACIÓN GLOBAL
// ==========================================
const modal = new Modal();
window.VisibleMXModal = modal;

// ==========================================
// AUTO-BIND PARA ELEMENTOS CON data-modal
// ==========================================
document.addEventListener('DOMContentLoaded', () => {
  // Ejemplo: <button data-modal-iframe="https://example.com">Ver demo</button>
  document.querySelectorAll('[data-modal-iframe]').forEach(el => {
    el.addEventListener('click', (e) => {
      e.preventDefault();
      const url = el.getAttribute('data-modal-iframe');
      modal.openIframe(url, { name: el.textContent });
    });
  });
  
  // Ejemplo: <button data-modal-image="img/screenshot.jpg">Ver captura</button>
  document.querySelectorAll('[data-modal-image]').forEach(el => {
    el.addEventListener('click', (e) => {
      e.preventDefault();
      const src = el.getAttribute('data-modal-image');
      const alt = el.getAttribute('data-modal-alt') || '';
      modal.openImage(src, alt);
    });
  });
});

console.log('✅ Modal system initialized');