/**
 * PricingCard.js V2.0 - Actualizado para sistema bilingüe
 * Renderiza cards de paquetes con precios duales MXN/USD
 */

class PricingCardRenderer {
  constructor() {
    this.currentLang = 'es';
    this.exchangeRate = 20; // MXN por USD
  }

  async loadPricing() {
    try {
      const response = await fetch('data/pricing.json');
      if (!response.ok) throw new Error('Failed to load pricing');
      return await response.json();
    } catch (error) {
      console.error('Error loading pricing:', error);
      return null;
    }
  }

  async render() {
    const data = await this.loadPricing();
    if (!data) return;

    const grid = document.getElementById('pricing-grid');
    if (!grid) return;

    // Limpiar grid
    grid.innerHTML = '';

    // Renderizar cada paquete
    data.packages.forEach((pkg, index) => {
      const card = this.createCard(pkg, index);
      grid.appendChild(card);
    });

    console.log('✅ Pricing cards rendered');
  }

  createCard(pkg, index) {
    const card = document.createElement('div');
    card.className = `pricing-card fade-up ${pkg.featured ? 'featured' : ''}`;
    card.style.animationDelay = `${index * 0.1}s`;

    // Determinar si mostrar MXN o USD primero según idioma
    const lang = document.documentElement.getAttribute('lang') || 'es';
    const priceDisplay = lang === 'en' 
      ? `${pkg.priceUSD} <span class="price-alt">/ ${pkg.priceMXN}</span>`
      : `${pkg.priceMXN} <span class="price-alt">/ ${pkg.priceUSD}</span>`;

    card.innerHTML = `
      ${pkg.featured ? '<div class="featured-badge">⭐ MÁS VENDIDO</div>' : ''}
      ${pkg.badge ? `<div class="package-badge">${pkg.badge}</div>` : ''}
      
      <div class="package-header">
        <div class="package-icon">${pkg.icon}</div>
        <h3 class="package-name">${pkg.name}</h3>
        <div class="package-price">
          ${priceDisplay}
        </div>
        <div class="package-period">${pkg.period}</div>
      </div>

      <p class="package-description">${pkg.description}</p>

      <button class="expand-btn" onclick="togglePackageDetails('${pkg.id}')" aria-expanded="false">
        <span class="expand-text">Ver qué incluye</span>
        <span class="expand-icon">▼</span>
      </button>

      <div class="package-details" id="details-${pkg.id}" hidden>
        <!-- Features Digitales -->
        <div class="features-section">
          <h4>✨ Digital incluido</h4>
          <ul class="features-list">
            ${pkg.features.map(f => `<li>${f}</li>`).join('')}
          </ul>
        </div>

        <!-- Materiales Físicos -->
        ${pkg.physicalItems && pkg.physicalItems.length > 0 ? `
          <div class="features-section">
            <h4>📦 Materiales físicos</h4>
            <ul class="features-list physical">
              ${pkg.physicalItems.map(item => `<li>${item}</li>`).join('')}
            </ul>
          </div>
        ` : '<p class="no-physical">❌ Sin materiales físicos incluidos</p>'}

        <!-- Ideal para -->
        <div class="ideal-for">
          <strong>👥 Ideal para:</strong> ${pkg.idealFor}
        </div>

        <!-- Delivery -->
        <div class="delivery-time">
          <strong>⏱️ Entrega:</strong> ${pkg.deliveryTime}
        </div>
      </div>

      <a 
        href="https://wa.me/5216633634237?text=${encodeURIComponent(pkg.whatsappText)}" 
        class="btn ${pkg.featured ? 'btn-primary' : 'btn-secondary'} btn-block"
        target="_blank"
        rel="noopener"
        onclick="gtag('event', 'clic_paquete', {'event_category': 'conversion', 'event_label': '${pkg.id}'})"
      >
        ${pkg.cta}
      </a>
    `;

    return card;
  }

  updateLanguage(lang) {
    this.currentLang = lang;
    this.render(); // Re-render con nuevo idioma
  }
}

// Toggle details function (global)
function togglePackageDetails(packageId) {
  const details = document.getElementById(`details-${packageId}`);
  const btn = details.previousElementSibling;
  
  if (details.hidden) {
    details.hidden = false;
    btn.setAttribute('aria-expanded', 'true');
    btn.querySelector('.expand-text').textContent = 'Ocultar detalles';
    btn.querySelector('.expand-icon').style.transform = 'rotate(180deg)';
  } else {
    details.hidden = true;
    btn.setAttribute('aria-expanded', 'false');
    btn.querySelector('.expand-text').textContent = 'Ver qué incluye';
    btn.querySelector('.expand-icon').style.transform = 'rotate(0deg)';
  }
}

// Auto-init
document.addEventListener('DOMContentLoaded', () => {
  const renderer = new PricingCardRenderer();
  renderer.render();
  window.PricingCardRenderer = renderer; // Exponer globalmente
});

console.log('✅ PricingCard V2 loaded');