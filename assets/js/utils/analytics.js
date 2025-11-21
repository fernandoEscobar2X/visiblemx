/**
 * analytics.js - Sistema centralizado de analytics para VisibleMX
 * Wrapper para Google Analytics 4 con eventos personalizados
 */

const VisibleMXAnalytics = {
  /**
   * Verifica si gtag está disponible
   */
  isAvailable() {
    return typeof gtag !== 'undefined';
  },

  /**
   * Envía un evento personalizado
   * @param {string} eventName - Nombre del evento
   * @param {Object} params - Parámetros del evento
   */
  trackEvent(eventName, params = {}) {
    if (!this.isAvailable()) {
      console.log(`[Analytics Mock] ${eventName}:`, params);
      return;
    }

    gtag('event', eventName, {
      ...params,
      timestamp: new Date().toISOString()
    });
  },

  /**
   * Track page view
   * @param {string} page - Ruta de la página
   */
  trackPageView(page) {
    this.trackEvent('page_view', {
      page_path: page || window.location.pathname
    });
  },

  /**
   * Track clic en paquete
   * @param {string} packageId - ID del paquete
   * @param {number} price - Precio del paquete
   */
  trackPackageClick(packageId, price) {
    this.trackEvent('select_package', {
      event_category: 'conversion',
      event_label: packageId,
      value: price,
      currency: 'USD'
    });
  },

  /**
   * Track clic en WhatsApp
   * @param {string} source - Origen del clic (hero, contacto, paquete, etc)
   */
  trackWhatsAppClick(source = 'unknown') {
    this.trackEvent('contact_whatsapp', {
      event_category: 'conversion',
      event_label: source,
      method: 'whatsapp'
    });
  },

  /**
   * Track envío de formulario
   * @param {string} formName - Nombre del formulario
   */
  trackFormSubmission(formName) {
    this.trackEvent('generate_lead', {
      event_category: 'conversion',
      event_label: formName,
      method: 'form'
    });
  },

  /**
   * Track visualización de proyecto en portfolio
   * @param {string} projectName - Nombre del proyecto
   */
  trackProjectView(projectName) {
    this.trackEvent('view_project', {
      event_category: 'engagement',
      event_label: projectName,
      content_type: 'portfolio'
    });
  },

  /**
   * Track scroll depth
   * @param {number} percentage - Porcentaje de scroll
   */
  trackScrollDepth(percentage) {
    this.trackEvent('scroll', {
      event_category: 'engagement',
      event_label: `${percentage}%`,
      value: percentage
    });
  },

  /**
   * Track tiempo en página
   * @param {number} seconds - Segundos en la página
   */
  trackTimeOnPage(seconds) {
    this.trackEvent('time_on_page', {
      event_category: 'engagement',
      value: seconds
    });
  },

  /**
   * Track error
   * @param {string} errorMessage - Mensaje de error
   * @param {string} errorLocation - Ubicación del error
   */
  trackError(errorMessage, errorLocation) {
    this.trackEvent('exception', {
      description: errorMessage,
      location: errorLocation,
      fatal: false
    });
  },

  /**
   * Track cambio de tema
   * @param {string} theme - Tema seleccionado (light/dark)
   */
  trackThemeChange(theme) {
    this.trackEvent('theme_change', {
      event_category: 'customization',
      event_label: theme
    });
  },

  /**
   * Track descarga de PDF
   */
  trackPDFDownload() {
    this.trackEvent('file_download', {
      event_category: 'conversion',
      event_label: 'catalogo_pdf',
      file_name: 'Catálogo_VisibleMX.pdf'
    });
  }
};

// ==========================================
// TRACKING AUTOMÁTICO DE SCROLL DEPTH
// ==========================================
(function() {
  const milestones = [25, 50, 75, 100];
  const reached = new Set();

  function checkScrollDepth() {
    const scrollPercent = Math.round(
      (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100
    );

    milestones.forEach(milestone => {
      if (scrollPercent >= milestone && !reached.has(milestone)) {
        reached.add(milestone);
        VisibleMXAnalytics.trackScrollDepth(milestone);
      }
    });
  }

  let scrollTimeout;
  window.addEventListener('scroll', () => {
    clearTimeout(scrollTimeout);
    scrollTimeout = setTimeout(checkScrollDepth, 300);
  }, { passive: true });
})();

// ==========================================
// TRACKING AUTOMÁTICO DE TIEMPO EN PÁGINA
// ==========================================
(function() {
  let startTime = Date.now();
  let tracked = false;

  function trackTimeSpent() {
    if (tracked) return;
    
    const timeSpent = Math.round((Date.now() - startTime) / 1000);
    
    // Track si pasó más de 10 segundos
    if (timeSpent >= 10) {
      VisibleMXAnalytics.trackTimeOnPage(timeSpent);
      tracked = true;
    }
  }

  // Track al salir de la página
  window.addEventListener('beforeunload', trackTimeSpent);
  
  // Track también si cambia de visibilidad (cambio de pestaña)
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
      trackTimeSpent();
    }
  });
})();

// ==========================================
// TRACKING DE ERRORES JAVASCRIPT
// ==========================================
window.addEventListener('error', (event) => {
  VisibleMXAnalytics.trackError(
    event.message,
    event.filename + ':' + event.lineno
  );
});

// ==========================================
// EXPORT
// ==========================================
window.VisibleMXAnalytics = VisibleMXAnalytics;

console.log('📊 Analytics system initialized');