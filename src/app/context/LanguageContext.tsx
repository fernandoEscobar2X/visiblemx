import { createContext, useContext, useState, type ReactNode } from 'react';

type Language = 'es' | 'en';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  toggleLanguage: () => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const translations = {
  es: {
    // Hero
    'hero.pill': 'Digital + Físico para negocios en Tijuana',
    'hero.title1': 'Haz que te encuentren.',
    'hero.title2': 'Haz que te recuerden.',
    'hero.title3': 'Haz que regresen.',
    'hero.subtitle': 'Presencia digital + material físico para tu negocio en Tijuana. Sitios web que se instalan como App (PWA) + Acrílicos QR que pones en tu mostrador.',
    'hero.cta1': 'Ver Paquetes de Lanzamiento',
    'hero.cta2': 'Hablar con nosotros',
    'hero.feature1': 'Carga ultra-rápida',
    'hero.feature2': 'Acrílicos incluidos',
    'hero.feature3': 'Se instala como App',
    
    // Problem
    'problem.eyebrow': 'El problema real',
    'problem.title': 'Tu competencia ya tiene presencia digital. ¿Y tú?',
    'problem.subtitle': 'Cada día pierdes clientes que te buscan en Google, ven un PDF borroso como menú, o no pueden agendar.',
    'problem.card1.title': 'Clientes te buscan y no apareces',
    'problem.card1.text': 'Si no estás en Google con una web profesional, simplemente no existes para muchos clientes.',
    'problem.card2.title': 'Tu menú es un PDF ilegible',
    'problem.card2.text': 'Zoom, carga lenta, letras borrosas... el cliente se desespera y se va.',
    'problem.card3.title': 'Pierdes citas por llamadas',
    'problem.card3.text': 'La gente ya no quiere marcar: si no pueden agendar fácil, se van con otro.',
    'problem.solution.title': 'Digital + Físico en un solo paquete',
    'problem.solution.feature1': 'Página carga en menos de 1 segundo',
    'problem.solution.feature2': 'Se instala como App (PWA)',
    'problem.solution.feature3': 'Incluye Acrílicos QR físicos',
    'problem.stat': '"Cada vez más clientes buscan negocios locales desde el celular antes de visitarlos."',
    
    // Packages
    'packages.eyebrow': 'Precios de lanzamiento',
    'packages.title': 'Elige tu paquete. Lanza tu negocio.',
    'packages.subtitle': 'Cada paquete incluye tu presencia digital + materiales físicos. Sin mensualidades. Pago único.',
    'packages.spots': 'lugares tomados —',
    'packages.remaining': 'restantes',
    
    'package1.name': 'VISIBLE LINK',
    'package1.badge': 'Esencial',
    'package1.for': 'Freelancers, food trucks, negocios chicos',
    'package1.price': '$1,799',
    'package1.normal': '$2,699',
    'package1.includes': 'Incluye:',
    'package1.feature1': 'Página de links personalizada (tipo link-in-bio pro)',
    'package1.feature2': 'Botones: WhatsApp, Instagram, ubicación, llamada',
    'package1.feature3': 'Diseño a tu imagen (colores/tipografía)',
    'package1.feature4': 'Optimizada para móvil',
    'package1.feature5': '1 Acrílico QR de mostrador',
    'package1.feature6': 'Entrega rápida',
    'package1.ideal': 'Ideal si: solo necesitas que te contacten y te encuentren rápido.',
    
    'package2.name': 'VISIBLE PAGE',
    'package2.badge': 'Popular',
    'package2.for': 'Plomeros, clínicas, servicios, negocios locales',
    'package2.price': '$2,699',
    'package2.normal': '$4,499',
    'package2.includes': 'Incluye:',
    'package2.feature1': 'Web completa multi-sección (home + servicios + contacto)',
    'package2.feature2': 'Galería de trabajos/servicios',
    'package2.feature3': 'Formulario de contacto + botón WhatsApp',
    'package2.feature4': 'Google Maps integrado',
    'package2.feature5': '2 Acrílicos QR profesionales',
    'package2.feature6': 'Diseño moderno y profesional',
    'package2.ideal': 'Ideal si: quieres verte serio y cerrar clientes con confianza.',
    
    'package3.name': 'VISIBLE MENÚ',
    'package3.badge': 'Best Seller',
    'package3.for': 'Restaurantes, cafés, bares, taquerías',
    'package3.price': '$3,599',
    'package3.normal': '$6,299',
    'package3.includes': 'Incluye:',
    'package3.feature1': 'Menú interactivo, rápido y fácil de navegar',
    'package3.feature2': 'Categorías (tacos, bebidas, combos, etc.)',
    'package3.feature3': 'Botones claros para pedir / WhatsApp',
    'package3.feature4': 'Se instala como App (PWA) para que el cliente lo tenga siempre',
    'package3.feature5': '5 Acrílicos de mesa + 1 de mostrador',
    'package3.feature6': 'Fotos (si te las mandan) optimizadas y bien presentadas',
    'package3.callout': 'Actualiza precios en 5 min sin reimprimir.',
    'package3.ideal': 'Ideal si: tu menú hoy es PDF/imagen y eso te está costando ventas.',
    
    'package4.name': 'VISIBLE AGENDA',
    'package4.badge': 'Premium',
    'package4.for': 'Barberías, spas, salones, clínicas, consultorios',
    'package4.price': '$4,499',
    'package4.normal': '$7,199',
    'package4.includes': 'Incluye:',
    'package4.feature1': 'Sistema de citas simple y efectivo',
    'package4.feature2': 'Calendario autogestionable (tú controlas horarios)',
    'package4.feature3': 'Confirmaciones/recordatorios (manual o automatizado)',
    'package4.feature4': '50 Tarjetas QR personalizadas',
    'package4.feature5': '1 Acrílico de mostrador',
    'package4.feature6': 'Página con servicios, ubicación y contacto',
    'package4.callout': 'Tus clientes agendan solos, cero llamadas perdidas.',
    'package4.ideal': '',
    
    'packages.note.title': 'Todos los paquetes incluyen:',
    'packages.note.item1': 'Dominio + hosting 1 año',
    'packages.note.item2': 'SSL (https)',
    'packages.note.item3': 'Publicación y entrega',
    'packages.note.item4': 'Ajustes menores post-entrega (7 días)',
    'packages.note.notinclude': 'No incluye:',
    'packages.note.notitem1': 'Manejo de redes / publicidad pagada',
    'packages.note.notitem2': 'Sesión de fotos profesional a domicilio',
    'packages.note.notitem3': 'Cambios ilimitados (se cotizan)',
    
    // Enterprise
    'enterprise.eyebrow': 'Soluciones avanzadas',
    'enterprise.title': 'Para empresas que necesitan más',
    'enterprise1.name': 'Visible Industrial',
    'enterprise1.price': 'Desde $8,999',
    'enterprise1.for': 'Fábricas, distribuidores, talleres',
    'enterprise1.feature1': 'Sitio corporativo con secciones profesionales',
    'enterprise1.feature2': 'Catálogo de productos/servicios',
    'enterprise1.feature3': 'Ficha técnica descargable (PDF)',
    'enterprise1.feature4': 'Botón de cotización / formulario pro',
    'enterprise2.name': 'Visible Residencial',
    'enterprise2.price': 'Desde $6,499',
    'enterprise2.for': 'Desarrollos, inmobiliarias, bienes raíces',
    'enterprise2.feature1': 'Landing inmobiliaria con galería',
    'enterprise2.feature2': 'Ubicación + mapa',
    'enterprise2.feature3': 'Captura de leads (formulario)',
    'enterprise2.feature4': 'CTA directo a WhatsApp',
    
    'addons.title': 'ADD-ONS DISPONIBLES',
    'addon1.name': 'Review Booster',
    'addon1.price': '+$499',
    'addon1.text': 'QR directo a tu perfil de Google para conseguir más reseñas.',
    'addon2.name': 'Notificaciones Push',
    'addon2.price': '+$799',
    'addon2.text': 'Envía ofertas y avisos al celular (para clientes que instalan la app PWA).',
    'addon3.name': 'Estadísticas Pro',
    'addon3.price': '+$599',
    'addon3.text': 'Dashboard con visitas, clics y comportamiento.',
    
    // Process
    'process.eyebrow': 'Así funciona',
    'process.title': 'De cero a visible en 3 pasos',
    'process.step1.title': 'Nos escribes',
    'process.step1.text': 'Cuéntanos sobre tu negocio por WhatsApp. Elegimos tu paquete ideal.',
    'process.step2.title': 'Diseñamos todo',
    'process.step2.text': 'En 3–5 días hábiles tienes tu sitio listo + tus acrílicos QR en producción.',
    'process.step3.title': 'Lanzamos',
    'process.step3.text': 'Publicamos tu web, te entregamos los acrílicos y te enseñamos a usarlo todo.',
    
    // Final CTA
    'final.badge': 'Oferta limitada',
    'final.title': 'Solo 5 lugares a precio de lanzamiento',
    'final.subtitle': 'Precios exclusivos para nuestros primeros clientes. Cuando se acaben, regresan a precio normal.',
    'final.cta': 'Apartar mi lugar',
    'final.trust1': 'Pago único',
    'final.trust2': 'Hosting 1 año incluido',
    'final.trust3': 'Sin contratos',
    'final.trust4': 'Entrega en 5 días',
    
    // Footer
    'footer.tagline': 'hazte visible',
    'footer.rights': '© 2026 Visible MX. Todos los derechos reservados.',
  },
  en: {
    // Hero
    'hero.pill': 'Digital + Physical for Tijuana businesses',
    'hero.title1': 'Get found.',
    'hero.title2': 'Get remembered.',
    'hero.title3': 'Get them back.',
    'hero.subtitle': 'Digital presence + physical materials for your Tijuana business. Websites that install as Apps (PWA) + QR Acrylics you place on your counter.',
    'hero.cta1': 'View Launch Packages',
    'hero.cta2': 'Talk to us',
    'hero.feature1': 'Ultra-fast loading',
    'hero.feature2': 'Acrylics included',
    'hero.feature3': 'Installs as App',
    
    // Problem
    'problem.eyebrow': 'The real problem',
    'problem.title': 'Your competition already has a digital presence. Do you?',
    'problem.subtitle': 'Every day you lose customers who search for you on Google, see a blurry PDF menu, or can\'t book appointments.',
    'problem.card1.title': 'Customers search and can\'t find you',
    'problem.card1.text': 'If you\'re not on Google with a professional website, you simply don\'t exist to many customers.',
    'problem.card2.title': 'Your menu is an unreadable PDF',
    'problem.card2.text': 'Zoom, slow loading, blurry text... the customer gets frustrated and leaves.',
    'problem.card3.title': 'You lose appointments due to calls',
    'problem.card3.text': 'People don\'t want to call anymore: if they can\'t book easily, they go elsewhere.',
    'problem.solution.title': 'Digital + Physical in one package',
    'problem.solution.feature1': 'Page loads in under 1 second',
    'problem.solution.feature2': 'Installs as App (PWA)',
    'problem.solution.feature3': 'Includes physical QR Acrylics',
    'problem.stat': '"More and more customers search for local businesses from their phones before visiting."',
    
    // Packages
    'packages.eyebrow': 'Launch pricing',
    'packages.title': 'Choose your package. Launch your business.',
    'packages.subtitle': 'Each package includes your digital presence + physical materials. No monthly fees. One-time payment.',
    'packages.spots': 'spots taken —',
    'packages.remaining': 'remaining',
    
    'package1.name': 'VISIBLE LINK',
    'package1.badge': 'Essential',
    'package1.for': 'Freelancers, food trucks, small businesses',
    'package1.price': '$99',
    'package1.normal': '$149',
    'package1.includes': 'Includes:',
    'package1.feature1': 'Custom link page (pro link-in-bio style)',
    'package1.feature2': 'Buttons: WhatsApp, Instagram, location, call',
    'package1.feature3': 'Custom design (colors/typography)',
    'package1.feature4': 'Mobile-optimized',
    'package1.feature5': '1 Counter QR Acrylic',
    'package1.feature6': 'Fast delivery',
    'package1.ideal': 'Ideal if: you just need people to contact and find you quickly.',
    
    'package2.name': 'VISIBLE PAGE',
    'package2.badge': 'Popular',
    'package2.for': 'Plumbers, clinics, services, local businesses',
    'package2.price': '$149',
    'package2.normal': '$249',
    'package2.includes': 'Includes:',
    'package2.feature1': 'Complete multi-section website (home + services + contact)',
    'package2.feature2': 'Work/services gallery',
    'package2.feature3': 'Contact form + WhatsApp button',
    'package2.feature4': 'Google Maps integrated',
    'package2.feature5': '2 Professional QR Acrylics',
    'package2.feature6': 'Modern and professional design',
    'package2.ideal': 'Ideal if: you want to look serious and close customers with confidence.',
    
    'package3.name': 'VISIBLE MENU',
    'package3.badge': 'Best Seller',
    'package3.for': 'Restaurants, cafés, bars, taquerias',
    'package3.price': '$199',
    'package3.normal': '$349',
    'package3.includes': 'Includes:',
    'package3.feature1': 'Interactive menu, fast and easy to navigate',
    'package3.feature2': 'Categories (tacos, drinks, combos, etc.)',
    'package3.feature3': 'Clear buttons for ordering / WhatsApp',
    'package3.feature4': 'Installs as App (PWA) so customers always have it',
    'package3.feature5': '5 Table Acrylics + 1 counter',
    'package3.feature6': 'Photos (if sent) optimized and well-presented',
    'package3.callout': 'Update prices in 5 min without reprinting.',
    'package3.ideal': 'Ideal if: your menu today is PDF/image and that\'s costing you sales.',
    
    'package4.name': 'VISIBLE BOOKING',
    'package4.badge': 'Premium',
    'package4.for': 'Barbershops, spas, salons, clinics, practices',
    'package4.price': '$249',
    'package4.normal': '$399',
    'package4.includes': 'Includes:',
    'package4.feature1': 'Simple and effective booking system',
    'package4.feature2': 'Self-managed calendar (you control schedules)',
    'package4.feature3': 'Confirmations/reminders (manual or automated)',
    'package4.feature4': '50 Personalized QR Cards',
    'package4.feature5': '1 Counter Acrylic',
    'package4.feature6': 'Page with services, location and contact',
    'package4.callout': 'Your customers book themselves, zero missed calls.',
    'package4.ideal': '',
    
    'packages.note.title': 'All packages include:',
    'packages.note.item1': 'Domain + hosting 1 year',
    'packages.note.item2': 'SSL (https)',
    'packages.note.item3': 'Publication and delivery',
    'packages.note.item4': 'Minor post-delivery adjustments (7 days)',
    'packages.note.notinclude': 'Does not include:',
    'packages.note.notitem1': 'Social media management / paid advertising',
    'packages.note.notitem2': 'Professional on-site photo session',
    'packages.note.notitem3': 'Unlimited changes (quoted separately)',
    
    // Enterprise
    'enterprise.eyebrow': 'Advanced solutions',
    'enterprise.title': 'For companies that need more',
    'enterprise1.name': 'Visible Industrial',
    'enterprise1.price': 'From $499',
    'enterprise1.for': 'Factories, distributors, workshops',
    'enterprise1.feature1': 'Corporate site with professional sections',
    'enterprise1.feature2': 'Product/service catalog',
    'enterprise1.feature3': 'Downloadable technical sheet (PDF)',
    'enterprise1.feature4': 'Quote button / pro form',
    'enterprise2.name': 'Visible Real Estate',
    'enterprise2.price': 'From $359',
    'enterprise2.for': 'Developments, real estate, properties',
    'enterprise2.feature1': 'Real estate landing with gallery',
    'enterprise2.feature2': 'Location + map',
    'enterprise2.feature3': 'Lead capture (form)',
    'enterprise2.feature4': 'Direct WhatsApp CTA',
    
    'addons.title': 'AVAILABLE ADD-ONS',
    'addon1.name': 'Review Booster',
    'addon1.price': '+$29',
    'addon1.text': 'Direct QR to your Google profile to get more reviews.',
    'addon2.name': 'Push Notifications',
    'addon2.price': '+$44',
    'addon2.text': 'Send offers and notifications to mobile (for customers who install the PWA app).',
    'addon3.name': 'Pro Analytics',
    'addon3.price': '+$33',
    'addon3.text': 'Dashboard with visits, clicks and behavior.',
    
    // Process
    'process.eyebrow': 'How it works',
    'process.title': 'From zero to visible in 3 steps',
    'process.step1.title': 'Contact us',
    'process.step1.text': 'Tell us about your business via WhatsApp. We choose your ideal package.',
    'process.step2.title': 'We design everything',
    'process.step2.text': 'In 3–5 business days you have your site ready + your QR acrylics in production.',
    'process.step3.title': 'We launch',
    'process.step3.text': 'We publish your website, deliver the acrylics and teach you how to use everything.',
    
    // Final CTA
    'final.badge': 'Limited offer',
    'final.title': 'Only 5 spots at launch price',
    'final.subtitle': 'Exclusive pricing for our first customers. When they\'re gone, prices return to normal.',
    'final.cta': 'Reserve my spot',
    'final.trust1': 'One-time payment',
    'final.trust2': 'Hosting 1 year included',
    'final.trust3': 'No contracts',
    'final.trust4': 'Delivered in 5 days',
    
    // Footer
    'footer.tagline': 'get visible',
    'footer.rights': '© 2026 Visible MX. All rights reserved.',
  },
};

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>('es');

  const toggleLanguage = () => {
    setLanguage(language === 'es' ? 'en' : 'es');
  };

  const t = (key: string): string => {
    const dict = translations[language] as Record<string, string>;
    return dict[key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, toggleLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
