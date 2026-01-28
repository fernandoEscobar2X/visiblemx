/**
 * LanguageToggle.js - Sistema bilingüe ES/EN para VisibleMX
 * Maneja cambio de idioma, persistencia y actualización dinámica de contenido
 */

class LanguageSystem {
  constructor() {
    this.currentLang = this.getStoredLanguage() || 'es';
    this.translations = null;
    this.init();
  }

  /**
   * Inicializa el sistema de idiomas
   */
  async init() {
    try {
      await this.loadTranslations();
      this.setupToggleButtons();
      this.applyLanguage(this.currentLang);
      console.log('✅ Language system initialized');
    } catch (error) {
      console.error('Error initializing language system:', error);
    }
  }

  /**
   * Carga traducciones desde JSON
   */
  async loadTranslations() {
    try {
      const response = await fetch('data/translations.json');
      if (!response.ok) throw new Error('Failed to load translations');
      this.translations = await response.json();
    } catch (error) {
      console.error('Error loading translations:', error);
      // Fallback: continuar en español
      this.currentLang = 'es';
    }
  }

  /**
   * Obtiene idioma guardado en localStorage
   */
  getStoredLanguage() {
    return localStorage.getItem('visiblemx-language');
  }

  /**
   * Guarda idioma en localStorage
   */
  setStoredLanguage(lang) {
    localStorage.setItem('visiblemx-language', lang);
  }

  /**
   * Configura botones de toggle
   */
  setupToggleButtons() {
    // Toggle en header desktop
    const langToggle = document.getElementById('lang-toggle');
    if (langToggle) {
      langToggle.innerHTML = this.createToggleHTML();
      this.bindToggleEvents(langToggle);
    }

    // Toggle en menú móvil
    const langToggleMobile = document.getElementById('lang-toggle-mobile');
    if (langToggleMobile) {
      langToggleMobile.innerHTML = this.createToggleHTML();
      this.bindToggleEvents(langToggleMobile);
    }
  }

  /**
   * Crea HTML del toggle
   */
  createToggleHTML() {
    return `
      <button class="lang-btn ${this.currentLang === 'es' ? 'active' : ''}" data-lang="es" aria-label="Español">
        ES
      </button>
      <span style="color: var(--ink-muted);">|</span>
      <button class="lang-btn ${this.currentLang === 'en' ? 'active' : ''}" data-lang="en" aria-label="English">
        EN
      </button>
    `;
  }

  /**
   * Vincula eventos a botones
   */
  bindToggleEvents(container) {
    const buttons = container.querySelectorAll('.lang-btn');
    buttons.forEach(btn => {
      btn.addEventListener('click', () => {
        const newLang = btn.getAttribute('data-lang');
        if (newLang !== this.currentLang) {
          this.switchLanguage(newLang);
        }
      });
    });
  }

  /**
   * Cambia el idioma
   */
  switchLanguage(lang) {
    this.currentLang = lang;
    this.setStoredLanguage(lang);
    this.applyLanguage(lang);
    
    // Actualizar toggles
    this.setupToggleButtons();
    
    // Track en Analytics
    if (typeof gtag !== 'undefined') {
      gtag('event', 'language_switch', {
        'event_category': 'engagement',
        'event_label': lang
      });
    }
  }

  /**
   * Aplica traducciones a toda la página
   */
  applyLanguage(lang) {
    if (!this.translations) return;

    const t = this.translations[lang];
    if (!t) return;

    // Actualizar atributo lang del HTML
    document.documentElement.setAttribute('lang', lang);

    // Actualizar meta description
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc && lang === 'en') {
      metaDesc.setAttribute('content', 'Professional websites + physical materials included. Modern design, fast delivery. From $75 USD. Tijuana and San Diego.');
    }

    // Traducir elementos con data-i18n
    document.querySelectorAll('[data-i18n]').forEach(el => {
      const key = el.getAttribute('data-i18n');
      const translation = this.getTranslation(t, key);
      if (translation) {
        if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
          el.placeholder = translation;
        } else {
          el.textContent = translation;
        }
      }
    });

    // Traducir elementos con data-i18n-html (permite HTML)
    document.querySelectorAll('[data-i18n-html]').forEach(el => {
      const key = el.getAttribute('data-i18n-html');
      const translation = this.getTranslation(t, key);
      if (translation) {
        el.innerHTML = translation;
      }
    });

    // Actualizar precios (mostrar USD primero en EN, MXN primero en ES)
    this.updatePrices(lang);
  }

  /**
   * Obtiene traducción por key (soporta nested keys como "hero.title")
   */
  getTranslation(obj, key) {
    return key.split('.').reduce((o, k) => (o || {})[k], obj);
  }

  /**
   * Actualiza formato de precios según idioma
   */
  updatePrices(lang) {
    document.querySelectorAll('[data-price-mxn][data-price-usd]').forEach(el => {
      const mxn = el.getAttribute('data-price-mxn');
      const usd = el.getAttribute('data-price-usd');
      
      if (lang === 'en') {
        el.textContent = `${usd} / ${mxn}`;
      } else {
        el.textContent = `${mxn} / ${usd}`;
      }
    });
  }

  /**
   * Helper: obtiene traducción actual
   */
  t(key) {
    if (!this.translations) return key;
    return this.getTranslation(this.translations[this.currentLang], key) || key;
  }

  /**
   * Helper: obtiene idioma actual
   */
  getCurrentLanguage() {
    return this.currentLang;
  }
}

// ==========================================
// INICIALIZACIÓN GLOBAL
// ==========================================
let languageSystem;

document.addEventListener('DOMContentLoaded', async () => {
  languageSystem = new LanguageSystem();
  window.VisibleMXLanguage = languageSystem;
});

// ==========================================
// CSS PARA TOGGLE (inyectado dinámicamente)
// ==========================================
const toggleStyles = `
<style id="lang-toggle-styles">
.lang-btn {
  padding: 0.25rem 0.5rem;
  background: transparent;
  border: none;
  color: var(--ink-muted);
  font-weight: 500;
  font-size: var(--text-sm);
  cursor: pointer;
  transition: var(--transition-fast);
  border-radius: var(--radius-sm);
}

.lang-btn:hover {
  color: var(--ink);
  background: var(--bg-alt);
}

.lang-btn.active {
  color: var(--accent);
  font-weight: 600;
}

#lang-toggle,
#lang-toggle-mobile {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem;
  background: var(--bg-alt);
  border-radius: var(--radius);
  border: 1px solid var(--border);
}

@media (max-width: 1024px) {
  #lang-toggle {
    display: none;
  }
}
</style>
`;

// Inyectar estilos solo si no existen
if (!document.getElementById('lang-toggle-styles')) {
  document.head.insertAdjacentHTML('beforeend', toggleStyles);
}

console.log('✅ LanguageToggle system loaded');