/**
 * Portfolio.js - Componente dinámico para proyectos del portfolio
 * Carga datos desde portfolio.json y renderiza las tarjetas de proyectos
 */

class PortfolioCard {
  constructor(project) {
    this.project = project;
  }

  /**
   * Renderiza el HTML de una tarjeta de proyecto
   * @returns {string} HTML de la tarjeta
   */
  render() {
    const { title, category, description, image, stats, url } = this.project;
    
    return `
      <article class="portfolio-card" data-category="${category.toLowerCase()}">
        <div style="overflow: hidden; border-radius: var(--radius-xl) var(--radius-xl) 0 0;">
          <img 
            src="${image}" 
            alt="${title}" 
            class="portfolio-image"
            loading="lazy"
            onerror="this.src='img/portfolio/placeholder.jpg'"
          />
        </div>
        
        <div class="portfolio-content">
          <span class="portfolio-category">${category}</span>
          
          <h3>${title}</h3>
          
          <p class="portfolio-description">${description}</p>
          
          <div class="portfolio-stats">
            <div class="stat-item">
              <div class="stat-value">${stats.conversion}</div>
              <div class="stat-label">Conversión</div>
            </div>
            
            <div class="stat-item">
              <div class="stat-value">${stats.traffic}</div>
              <div class="stat-label">Tráfico</div>
            </div>
            
            <div class="stat-item">
              <div class="stat-value">${stats.lighthouse}</div>
              <div class="stat-label">Performance</div>
            </div>
          </div>
          
          ${url ? `
            <a 
              href="${url}" 
              target="_blank" 
              rel="noopener" 
              class="link-arrow"
              style="margin-top: var(--space-4); display: inline-flex;"
              onclick="gtag('event', 'ver_proyecto', {
                'event_category': 'engagement',
                'event_label': '${title}'
              })"
            >
              Ver proyecto <span>→</span>
            </a>
          ` : ''}
        </div>
      </article>
    `;
  }
}

/**
 * Inicializa el sistema de portfolio
 */
async function initPortfolio() {
  const portfolioGrid = document.getElementById('portfolio-grid');
  
  if (!portfolioGrid) return;
  
  try {
    // Fetch portfolio data
    const response = await fetch('data/portfolio.json');
    
    if (!response.ok) {
      throw new Error('No se pudo cargar portfolio.json');
    }
    
    const data = await response.json();
    const projects = data.projects.filter(p => p.featured); // Solo proyectos destacados
    
    if (projects.length === 0) {
      throw new Error('No hay proyectos disponibles');
    }
    
    // Renderizar proyectos
    portfolioGrid.innerHTML = projects
      .map(project => new PortfolioCard(project).render())
      .join('');
    
    // Animación de entrada con stagger
    setTimeout(() => {
      document.querySelectorAll('.portfolio-card').forEach((card, index) => {
        setTimeout(() => {
          card.style.opacity = '0';
          card.style.transform = 'translateY(30px)';
          card.style.transition = 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
          
          requestAnimationFrame(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
          });
        }, index * 150);
      });
    }, 100);
    
  } catch (error) {
    console.error('Error loading portfolio:', error);
    
    // Fallback: Mostrar proyectos de ejemplo estáticos
    portfolioGrid.innerHTML = `
      <article class="portfolio-card">
        <div style="overflow: hidden; border-radius: var(--radius-xl) var(--radius-xl) 0 0;">
          <div style="width: 100%; height: 240px; background: linear-gradient(135deg, var(--accent) 0%, var(--color-teal-700) 100%); display: flex; align-items: center; justify-content: center; color: white; font-size: var(--text-2xl); font-weight: 700;">
            Café Local
          </div>
        </div>
        <div class="portfolio-content">
          <span class="portfolio-category">Cafetería</span>
          <h3>Proyecto Ejemplo</h3>
          <p class="portfolio-description">Landing page moderna con menú digital y sistema de reservas. Diseño optimizado para móvil.</p>
          <div class="portfolio-stats">
            <div class="stat-item">
              <div class="stat-value">+180%</div>
              <div class="stat-label">Conversión</div>
            </div>
            <div class="stat-item">
              <div class="stat-value">+240%</div>
              <div class="stat-label">Tráfico</div>
            </div>
            <div class="stat-item">
              <div class="stat-value">98</div>
              <div class="stat-label">Performance</div>
            </div>
          </div>
        </div>
      </article>
      
      <article class="portfolio-card">
        <div style="overflow: hidden; border-radius: var(--radius-xl) var(--radius-xl) 0 0;">
          <div style="width: 100%; height: 240px; background: linear-gradient(135deg, #8b5cf6 0%, #6366f1 100%); display: flex; align-items: center; justify-content: center; color: white; font-size: var(--text-2xl); font-weight: 700;">
            Estética
          </div>
        </div>
        <div class="portfolio-content">
          <span class="portfolio-category">Belleza</span>
          <h3>Proyecto Ejemplo</h3>
          <p class="portfolio-description">Sitio elegante con galería y sistema de citas. Optimizado para conversión mobile.</p>
          <div class="portfolio-stats">
            <div class="stat-item">
              <div class="stat-value">+150%</div>
              <div class="stat-label">Conversión</div>
            </div>
            <div class="stat-item">
              <div class="stat-value">+200%</div>
              <div class="stat-label">Tráfico</div>
            </div>
            <div class="stat-item">
              <div class="stat-value">96</div>
              <div class="stat-label">Performance</div>
            </div>
          </div>
        </div>
      </article>
      
      <article class="portfolio-card">
        <div style="overflow: hidden; border-radius: var(--radius-xl) var(--radius-xl) 0 0;">
          <div style="width: 100%; height: 240px; background: linear-gradient(135deg, #ef4444 0%, #dc2626 100%); display: flex; align-items: center; justify-content: center; color: white; font-size: var(--text-2xl); font-weight: 700;">
            Consultorio
          </div>
        </div>
        <div class="portfolio-content">
          <span class="portfolio-category">Salud</span>
          <h3>Proyecto Ejemplo</h3>
          <p class="portfolio-description">Página profesional con información de servicios y formulario de contacto seguro.</p>
          <div class="portfolio-stats">
            <div class="stat-item">
              <div class="stat-value">+220%</div>
              <div class="stat-label">Conversión</div>
            </div>
            <div class="stat-item">
              <div class="stat-value">+300%</div>
              <div class="stat-label">Tráfico</div>
            </div>
            <div class="stat-item">
              <div class="stat-value">99</div>
              <div class="stat-label">Performance</div>
            </div>
          </div>
        </div>
      </article>
    `;
    
    // Animación de fallback
    setTimeout(() => {
      document.querySelectorAll('.portfolio-card').forEach((card, index) => {
        setTimeout(() => {
          card.style.opacity = '0';
          card.style.transform = 'translateY(30px)';
          card.style.transition = 'all 0.6s ease';
          
          requestAnimationFrame(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
          });
        }, index * 150);
      });
    }, 100);
  }
}

// Inicializar cuando el DOM esté listo
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initPortfolio);
} else {
  initPortfolio();
}