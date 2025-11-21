/**
 * PricingCard.js - Componente dinámico para tarjetas de precios
 * Carga datos desde pricing.json y renderiza las tarjetas
 */

class PricingCard {
  constructor(data) {
    this.data = data;
  }

  /**
   * Renderiza el HTML de una tarjeta de precio
   * @returns {string} HTML de la tarjeta
   */
  render() {
    const { id, name, icon, badge, price, period, description, features, cta, whatsappText, featured, deliveryTime } = this.data;
    
    const whatsappUrl = `https://wa.me/5216633634237?text=${encodeURIComponent(whatsappText)}`;
    
    return `
      <article class="pricing-card ${featured ? 'featured' : ''}" data-package="${id}">
        ${badge ? `<div class="price-badge">${badge}</div>` : ''}
        
        <h3>${icon} ${name}</h3>
        
        <div class="price">
          ${price} <span class="price-period">USD</span>
        </div>
        <p class="text-muted" style="font-size: var(--text-sm); margin-bottom: var(--space-6);">
          ${period}
        </p>
        
        <p style="color: var(--ink-muted); margin-bottom: var(--space-6); line-height: 1.6;">
          ${description}
        </p>
        
        <ul>
          ${features.map(feature => `<li>${feature}</li>`).join('')}
        </ul>
        
        <div style="margin-top: auto;">
          <a 
            href="${whatsappUrl}" 
            class="btn btn-primary btn-block" 
            target="_blank" 
            rel="noopener"
            onclick="gtag('event', 'clic_paquete', {
              'event_category': 'conversion',
              'event_label': '${id}',
              'value': ${price.replace('$', '')}
            })"
          >
            ${cta}
          </a>
          
          <p style="text-align: center; margin-top: var(--space-3); font-size: var(--text-xs); color: var(--ink-muted);">
            ⏱️ Entrega en ${deliveryTime}
          </p>
        </div>
      </article>
    `;
  }
}

/**
 * Inicializa el sistema de pricing cards
 */
async function initPricingCards() {
  const pricingGrid = document.getElementById('pricing-grid');
  
  if (!pricingGrid) return;
  
  try {
    // Mostrar loading
    pricingGrid.innerHTML = `
      <div style="grid-column: 1 / -1; display: flex; justify-content: center; padding: var(--space-12);">
        <div class="spinner"></div>
      </div>
    `;
    
    // Fetch pricing data
    const response = await fetch('data/pricing.json');
    
    if (!response.ok) {
      throw new Error('No se pudo cargar pricing.json');
    }
    
    const data = await response.json();
    const packages = data.packages;
    
    // Renderizar tarjetas
    pricingGrid.innerHTML = packages
      .map(pkg => new PricingCard(pkg).render())
      .join('');
    
    // Animación de entrada
    setTimeout(() => {
      document.querySelectorAll('.pricing-card').forEach((card, index) => {
        setTimeout(() => {
          card.style.opacity = '0';
          card.style.transform = 'translateY(20px)';
          card.style.transition = 'all 0.5s ease';
          
          requestAnimationFrame(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
          });
        }, index * 100);
      });
    }, 50);
    
  } catch (error) {
    console.error('Error loading pricing cards:', error);
    pricingGrid.innerHTML = `
      <div style="grid-column: 1 / -1; text-align: center; padding: var(--space-12); color: var(--ink-muted);">
        <p>Error al cargar los paquetes. Por favor intenta de nuevo.</p>
        <a href="https://wa.me/5216633634237?text=Hola%20VisibleMX%2C%20quiero%20información" class="btn btn-primary" style="margin-top: var(--space-4);">
          Contactar por WhatsApp
        </a>
      </div>
    `;
  }
}

// Inicializar cuando el DOM esté listo
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initPricingCards);
} else {
  initPricingCards();
}