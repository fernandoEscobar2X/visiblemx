/**
 * Portfolio.js V2.0 - TODO traducible
 * Renderiza portfolio cards con soporte bilingüe completo
 */

class PortfolioRenderer {
  constructor() {
    this.currentLang = 'es';
  }

  async loadPortfolio() {
    try {
      const response = await fetch('data/portfolio.json');
      if (!response.ok) throw new Error('Failed to load portfolio');
      return await response.json();
    } catch (error) {
      console.error('Error loading portfolio:', error);
      return null;
    }
  }

  async render() {
    const data = await this.loadPortfolio();
    if (!data) return;

    const grid = document.getElementById('portfolio-grid');
    if (!grid) return;

    // Limpiar grid
    grid.innerHTML = '';

    // Renderizar proyectos
    if (data.projects && data.projects.length > 0) {
      data.projects.forEach((project, index) => {
        const card = this.createProjectCard(project, index);
        grid.appendChild(card);
      });
    }

    console.log('✅ Portfolio rendered');
  }

  createProjectCard(project, index) {
    const card = document.createElement('article');
    card.className = 'portfolio-card fade-up';
    card.style.animationDelay = `${index * 0.1}s`;

    // Determinar idioma actual
    const lang = document.documentElement.getAttribute('lang') || 'es';
    
    // Traducciones inline
    const translations = {
      es: {
        conceptual: 'Proyecto conceptual',
        demo: 'Ver demo completo',
        package: 'Quiero el paquete',
        includes: 'Digital incluido',
        physical: 'Físico incluido',
        performance: 'PERFORMANCE'
      },
      en: {
        conceptual: 'Conceptual project',
        demo: 'View full demo',
        package: 'I want the package',
        includes: 'Digital included',
        physical: 'Physical included',
        performance: 'PERFORMANCE'
      }
    };

    const t = translations[lang];

    card.innerHTML = `
      <div class="portfolio-visual" style="background: ${project.gradient || 'linear-gradient(135deg, #0EA5E9 0%, #14B8A6 100%)'};">
        <span class="portfolio-category">${project.category}</span>
        <h3 class="portfolio-title">${project.title}</h3>
      </div>

      <div class="portfolio-content">
        <p class="portfolio-description">${project.description}</p>

        ${project.stats ? `
          <div class="portfolio-stats">
            ${project.stats.map(stat => `
              <div class="stat-item">
                <div class="stat-label">${stat.label}</div>
                <div class="stat-value">${stat.value}</div>
              </div>
            `).join('')}
          </div>
        ` : ''}

        ${project.package ? `
          <div class="portfolio-package">
            <div class="package-info">
              <div class="package-label">${project.package.name.toUpperCase()}</div>
              <div class="package-price">${lang === 'en' ? project.package.priceUSD : project.package.priceMXN}</div>
            </div>

            ${project.package.features && project.package.features.length > 0 ? `
              <div class="package-features">
                <strong>${t.includes}:</strong>
                <ul>
                  ${project.package.features.slice(0, 3).map(f => `<li>${f}</li>`).join('')}
                </ul>
              </div>
            ` : ''}

            ${project.package.physicalItems && project.package.physicalItems.length > 0 ? `
              <div class="package-physical">
                <strong>${t.physical}:</strong>
                <ul>
                  ${project.package.physicalItems.slice(0, 3).map(item => `<li>${item}</li>`).join('')}
                </ul>
              </div>
            ` : ''}
          </div>
        ` : ''}

        ${project.disclaimer ? `
          <div class="portfolio-disclaimer">
            💡 <strong>${t.conceptual}:</strong> ${project.disclaimer}
          </div>
        ` : ''}

        <div class="portfolio-actions">
          ${project.demoUrl ? `
            <a href="${project.demoUrl}" class="btn btn-secondary btn-block" target="_blank" rel="noopener">
              ${t.demo} →
            </a>
          ` : ''}
          ${project.package ? `
            <a href="https://wa.me/5216633634237?text=Hola%20VisibleMX%2C%20quiero%20el%20paquete%20${encodeURIComponent(project.package.name)}%20(${project.package.priceMXN})" 
               class="btn btn-primary btn-block" 
               target="_blank" 
               rel="noopener"
               onclick="gtag('event', 'clic_portfolio_paquete', {'event_category': 'conversion', 'event_label': '${project.package.id}'})">
              ${t.package}
            </a>
          ` : ''}
        </div>
      </div>
    `;

    return card;
  }

  updateLanguage(lang) {
    this.currentLang = lang;
    this.render(); // Re-render con nuevo idioma
  }
}

// Auto-init
document.addEventListener('DOMContentLoaded', () => {
  const renderer = new PortfolioRenderer();
  renderer.render();
  window.PortfolioRenderer = renderer; // Exponer globalmente
});

console.log('✅ Portfolio V2 loaded');