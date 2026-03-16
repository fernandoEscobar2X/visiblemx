import { Instagram, Linkedin, Twitter, Mail, MapPin, Phone } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { motion } from 'motion/react';

export function Footer() {
  const { language } = useLanguage();

  const content = {
    es: {
      tagline: 'Transformamos ideas en experiencias digitales',
      products: {
        title: 'Productos',
        items: [
          { name: 'Visible Tap', price: '$450', href: '/tap' },
          { name: 'Visible Link', price: '$1,799', href: '/demo/link' },
          { name: 'Visible Page', price: '$2,699', href: '/demo/page' },
          { name: 'Visible Menu', price: '$3,599', href: '/demo/menu' },
          { name: 'Visible Agenda', price: '$4,499', href: '/demo/agenda' }
        ]
      },
      company: {
        title: 'Compania',
        items: [
          { name: 'Sobre Nosotros', href: '#nosotros' },
          { name: 'Proceso', href: '#proceso' },
          { name: 'Casos de Exito', href: '#casos' },
          { name: 'Contacto', href: '#contacto' }
        ]
      },
      legal: {
        title: 'Legal',
        items: [
          { name: 'Privacidad', href: '#privacidad' },
          { name: 'Terminos', href: '#terminos' },
          { name: 'Cookies', href: '#cookies' }
        ]
      },
      contact: {
        email: 'ferrobles2003@gmail.com',
        phone: '664 353 3036',
        address: 'Tijuana, Baja California, Mexico'
      },
      copyright: '© 2026 Visible MX. Todos los derechos reservados.',
      madeWith: 'Hecho con'
    },
    en: {
      tagline: 'Transforming ideas into digital experiences',
      products: {
        title: 'Products',
        items: [
          { name: 'Visible Tap', price: '$450', href: '/tap' },
          { name: 'Visible Link', price: '$1,799', href: '/demo/link' },
          { name: 'Visible Page', price: '$2,699', href: '/demo/page' },
          { name: 'Visible Menu', price: '$3,599', href: '/demo/menu' },
          { name: 'Visible Agenda', price: '$4,499', href: '/demo/agenda' }
        ]
      },
      company: {
        title: 'Company',
        items: [
          { name: 'About Us', href: '#about' },
          { name: 'Process', href: '#process' },
          { name: 'Case Studies', href: '#cases' },
          { name: 'Contact', href: '#contact' }
        ]
      },
      legal: {
        title: 'Legal',
        items: [
          { name: 'Privacy', href: '#privacy' },
          { name: 'Terms', href: '#terms' },
          { name: 'Cookies', href: '#cookies' }
        ]
      },
      contact: {
        email: 'ferrobles2003@gmail.com',
        phone: '664 353 3036',
        address: 'Tijuana, Baja California, Mexico'
      },
      copyright: '© 2026 Visible MX. All rights reserved.',
      madeWith: 'Made with'
    }
  };

  const t = content[language];

  const socialLinks = [
    { icon: Instagram, href: 'https://instagram.com/visiblemx', label: 'Instagram' },
    { icon: Linkedin, href: 'https://linkedin.com/company/visiblemx', label: 'LinkedIn' },
    { icon: Twitter, href: 'https://twitter.com/visiblemx', label: 'Twitter' }
  ];

  return (
    <footer className="relative overflow-hidden bg-slate-900 text-white">
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff08_1px,transparent_1px),linear-gradient(to_bottom,#ffffff08_1px,transparent_1px)] bg-[size:60px_60px]" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-6 pb-12 pt-20 lg:px-8">
        <div className="mb-16 grid gap-12 border-b border-white/10 pb-16 lg:grid-cols-5 lg:gap-16">
          <div className="lg:col-span-2">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
              <h3 className="mb-4 text-4xl font-black tracking-tight text-white">VISIBLE MX</h3>
              <p className="mb-8 max-w-sm text-lg font-light leading-relaxed text-white/60">{t.tagline}</p>

              <div className="space-y-4">
                <a href={`mailto:${t.contact.email}`} className="group flex items-center gap-3 text-white/80 transition-colors hover:text-white">
                  <Mail className="h-5 w-5 flex-shrink-0" />
                  <span className="group-hover:underline">{t.contact.email}</span>
                </a>
                <a href={`tel:${t.contact.phone}`} className="group flex items-center gap-3 text-white/80 transition-colors hover:text-white">
                  <Phone className="h-5 w-5 flex-shrink-0" />
                  <span className="group-hover:underline">{t.contact.phone}</span>
                </a>
                <div className="flex items-center gap-3 text-white/80">
                  <MapPin className="h-5 w-5 flex-shrink-0" />
                  <span>{t.contact.address}</span>
                </div>
              </div>
            </motion.div>
          </div>

          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.1 }}>
            <h4 className="mb-6 text-sm font-bold uppercase tracking-wider text-white">{t.products.title}</h4>
            <ul className="space-y-4">
              {t.products.items.map((item, i) => (
                <li key={i}>
                  <a href={item.href} className="group flex items-baseline gap-2 text-white/60 transition-colors hover:text-white">
                    <span className="group-hover:underline">{item.name}</span>
                    <span className="text-xs text-white/40">{item.price}</span>
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.2 }}>
            <h4 className="mb-6 text-sm font-bold uppercase tracking-wider text-white">{t.company.title}</h4>
            <ul className="space-y-4">
              {t.company.items.map((item, i) => (
                <li key={i}>
                  <a href={item.href} className="text-white/60 transition-colors hover:text-white hover:underline">
                    {item.name}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.3 }}>
            <h4 className="mb-6 text-sm font-bold uppercase tracking-wider text-white">{t.legal.title}</h4>
            <ul className="space-y-4">
              {t.legal.items.map((item, i) => (
                <li key={i}>
                  <a href={item.href} className="text-white/60 transition-colors hover:text-white hover:underline">
                    {item.name}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>

        <div className="flex flex-col items-center justify-between gap-8 md:flex-row">
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="order-2 text-sm text-white/40 md:order-1"
          >
            {t.copyright}
          </motion.p>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="order-1 flex items-center gap-4 md:order-2"
          >
            {socialLinks.map((social, i) => {
              const Icon = social.icon;
              return (
                <a
                  key={i}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className="group flex h-12 w-12 items-center justify-center border-2 border-white/20 transition-all hover:border-white hover:bg-white"
                >
                  <Icon className="h-5 w-5 text-white transition-colors group-hover:text-slate-900" />
                </a>
              );
            })}
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-12 border-t border-white/10 pt-8 text-center"
        >
          <p className="flex items-center justify-center gap-2 text-xs text-white/30">
            {t.madeWith} <span className="text-red-500">❤</span> {language === 'es' ? 'en' : 'in'} Tijuana
          </p>
        </motion.div>
      </div>

      <div className="absolute bottom-0 right-0 h-64 w-64 -translate-x-1/2 translate-y-1/2 border-[40px] border-white/5" />
    </footer>
  );
}
