/**
 * Portfolio.js - Componente para proyectos showcase/demo
 * Versión actualizada que soporta gradientes y proyectos conceptuales
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
    const { title, category, description, image, gradient, stats, url, isDemo } = this.project;
    
    // Si es demo y tiene gradient, usar gradient en lugar de imagen
    const visualContent = image ? 
      `<img 
        src="${image}" 
        alt="${title}" 
        class="portfolio-image"
        loading="lazy"
        onerror="this.parentElement.innerHTML='<div style=\\'width:100%;height:240px;background:${gradient || 'var(--accent)'};display:flex;align-items:center;justify-content:center;color:white;font-size:var(--text-2xl);font-weight:700;\\'>${title}</div>'"
      />` :
      `<div style="width: 100%; height: 240px; background: ${gradient || 'var(--accent)'}; display: flex; align-items: center; justify-content: center; color: white; font-size: var(--text-2xl); font-weight: 700;">
        ${title}
      </div>`;
    
    return `
      <article class="portfolio-card ${isDemo ? 'portfolio-demo' : ''}" data-category="${category.toLowerCase()}">
        <div style="overflow: hidden; border-radius: var(--radius-xl) var(--radius-xl) 0 0;">
          ${visualContent}
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
              <div class="stat-label">Enfoque</div>
            </div>
            
            <div class="stat-item">
              <div class="stat-value">${stats.lighthouse}</div>
              <div class="stat-label">Performance</div>
            </div>
          </div>
          
          ${isDemo ? `
            <div style="margin-top: var(--space-4); padding: var(--space-3); background: var(--bg-alt); border-radius: var(--radius); border-left: 3px solid var(--accent);">
              <p style="font-size: var(--text-xs); color: var(--ink-muted); margin: 0;">
                💡 <strong>Proyecto conceptual</strong> - Muestra nuestro estilo de diseño
              </p>
            </div>
          ` : ''}
          
          ${url ? `
            <a 
              href="${url}" 
              target="_blank" 
              rel="noopener" 
              class="btn btn-secondary btn-block"
              style="margin-top: var(--space-4);"
              onclick="gtag('event', 'ver_proyecto', {
                'event_category': 'engagement',
                'event_label': '${title}'
              })"
            >
              Ver proyecto <span>→</span>
            </a>
          ` : `
            <a 
              href="#contacto" 
              class="btn btn-primary btn-block"
              style="margin-top: var(--space-4);"
              onclick="gtag('event', 'solicitar_similar', {
                'event_category': 'conversion',
                'event_label': '${title}'
              })"
            >
              Quiero uno así →
            </a>
          `}
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
    const projects = data.projects.filter(p => p.featured);
    
    if (projects.length === 0) {
      throw new Error('No hay proyectos disponibles');
    }
    
    // Renderizar proyectos
    portfolioGrid.innerHTML = projects
      .map(project => new PortfolioCard(project).render())
      .join('');
    
    // Agregar nota informativa si hay demos
    if (data.showcase && projects.some(p => p.isDemo)) {
      const showcaseNote = document.createElement('div');
      showcaseNote.className = 'portfolio-showcase-note';
      showcaseNote.innerHTML = `
        <div style="
          text-align: center;
          padding: var(--space-6);
          background: var(--bg-alt);
          border-radius: var(--radius-lg);
          margin-top: var(--space-8);
          border: 1px solid var(--border);
        ">
          <p style="color: var(--ink-muted); font-size: var(--text-sm); line-height: 1.7; max-width: 600px; margin: 0 auto;">
            ${data.showcase.note}
          </p>
        </div>
      `;
      portfolioGrid.parentElement.insertBefore(showcaseNote, portfolioGrid.nextSibling);
    }
    
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
    
    // Fallback mejorado con gradientes
    portfolioGrid.innerHTML = `
      <article class="portfolio-card portfolio-demo">
        <div style="overflow: hidden; border-radius: var(--radius-xl) var(--radius-xl) 0 0;">
          <div style="width: 100%; height: 240px; background: linear-gradient(135deg, #14b8a6 0%, #0f766e 100%); display: flex; align-items: center; justify-content: center; color: white; font-size: var(--text-2xl); font-weight: 700;">
            Café Local
          </div>
        </div>
        <div class="portfolio-content">
          <span class="portfolio-category">Cafetería</span>
          <h3>Proyecto Ejemplo</h3>
          <p class="portfolio-description">Landing page moderna con menú digital y sistema de reservas. Diseño optimizado para móvil.</p>
          <div class="portfolio-stats">
            <div class="stat-item">
              <div class="stat-value">Optimizado</div>
              <div class="stat-label">Conversión</div>
            </div>
            <div class="stat-item">
              <div class="stat-value">SEO Ready</div>
              <div class="stat-label">Enfoque</div>
            </div>
            <div class="stat-item">
              <div class="stat-value">98</div>
              <div class="stat-label">Performance</div>
            </div>
          </div>
          <div style="margin-top: var(--space-4); padding: var(--space-3); background: var(--bg-alt); border-radius: var(--radius); border-left: 3px solid var(--accent);">
            <p style="font-size: var(--text-xs); color: var(--ink-muted); margin: 0;">
              💡 <strong>Proyecto conceptual</strong> - Muestra nuestro estilo de diseño
            </p>
          </div>
          <a href="#contacto" class="btn btn-primary btn-block" style="margin-top: var(--space-4);">
            Quiero uno así →
          </a>
        </div>
      </article>
      
      <article class="portfolio-card portfolio-demo">
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
              <div class="stat-value">Conversión+</div>
              <div class="stat-label">Conversión</div>
            </div>
            <div class="stat-item">
              <div class="stat-value">Mobile First</div>
              <div class="stat-label">Enfoque</div>
            </div>
            <div class="stat-item">
              <div class="stat-value">96</div>
              <div class="stat-label">Performance</div>
            </div>
          </div>
          <div style="margin-top: var(--space-4); padding: var(--space-3); background: var(--bg-alt); border-radius: var(--radius); border-left: 3px solid var(--accent);">
            <p style="font-size: var(--text-xs); color: var(--ink-muted); margin: 0;">
              💡 <strong>Proyecto conceptual</strong> - Muestra nuestro estilo de diseño
            </p>
          </div>
          <a href="#contacto" class="btn btn-primary btn-block" style="margin-top: var(--space-4);">
            Quiero uno así →
          </a>
        </div>
      </article>
      
      <article class="portfolio-card portfolio-demo">
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
              <div class="stat-value">Profesional</div>
              <div class="stat-label">Conversión</div>
            </div>
            <div class="stat-item">
              <div class="stat-value">Accesible</div>
              <div class="stat-label">Enfoque</div>
            </div>
            <div class="stat-item">
              <div class="stat-value">99</div>
              <div class="stat-label">Performance</div>
            </div>
          </div>
          <div style="margin-top: var(--space-4); padding: var(--space-3); background: var(--bg-alt); border-radius: var(--radius); border-left: 3px solid var(--accent);">
            <p style="font-size: var(--text-xs); color: var(--ink-muted); margin: 0;">
              💡 <strong>Proyecto conceptual</strong> - Muestra nuestro estilo de diseño
            </p>
          </div>
          <a href="#contacto" class="btn btn-primary btn-block" style="margin-top: var(--space-4);">
            Quiero uno así →
          </a>
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