import { Instagram, Linkedin, Twitter, Mail, MapPin, Phone, ExternalLink } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { motion } from 'motion/react';

export function Footer() {
  const { language } = useLanguage();

  const content = {
    es: {
      tagline: "Transformamos ideas en experiencias digitales",
      products: {
        title: "Productos",
        items: [
          { name: "Visible Link", price: "$1,799", href: "/demo/link" },
          { name: "Visible Page", price: "$2,699", href: "/demo/page" },
          { name: "Visible MenÃº", price: "$3,599", href: "/demo/menu" },
          { name: "Visible Agenda", price: "$4,499", href: "/demo/agenda" }
        ]
      },
      company: {
        title: "CompaÃ±Ã­a",
        items: [
          { name: "Sobre Nosotros", href: "#nosotros" },
          { name: "Proceso", href: "#proceso" },
          { name: "Casos de Ã‰xito", href: "#casos" },
          { name: "Contacto", href: "#contacto" }
        ]
      },
      legal: {
        title: "Legal",
        items: [
          { name: "Privacidad", href: "#privacidad" },
          { name: "TÃ©rminos", href: "#terminos" },
          { name: "Cookies", href: "#cookies" }
        ]
      },
      contact: {
        email: "ferrobles2003@gmail.com",
        phone: "664 353 3036",
        address: "Tijuana, Baja California, MÃ©xico"
      },
      social: {
        title: "SÃ­guenos"
      },
      copyright: "Â© 2026 Visible MX. Todos los derechos reservados.",
      madeWith: "Hecho con"
    },
    en: {
      tagline: "Transforming ideas into digital experiences",
      products: {
        title: "Products",
        items: [
          { name: "Visible Link", price: "$1,799", href: "/demo/link" },
          { name: "Visible Page", price: "$2,699", href: "/demo/page" },
          { name: "Visible MenÃº", price: "$3,599", href: "/demo/menu" },
          { name: "Visible Agenda", price: "$4,499", href: "/demo/agenda" }
        ]
      },
      company: {
        title: "Company",
        items: [
          { name: "About Us", href: "#about" },
          { name: "Process", href: "#process" },
          { name: "Case Studies", href: "#cases" },
          { name: "Contact", href: "#contact" }
        ]
      },
      legal: {
        title: "Legal",
        items: [
          { name: "Privacy", href: "#privacy" },
          { name: "Terms", href: "#terms" },
          { name: "Cookies", href: "#cookies" }
        ]
      },
      contact: {
        email: "ferrobles2003@gmail.com",
        phone: "664 353 3036",
        address: "Tijuana, Baja California, Mexico"
      },
      social: {
        title: "Follow Us"
      },
      copyright: "Â© 2026 Visible MX. All rights reserved.",
      madeWith: "Made with"
    }
  };

  const t = content[language];

  const socialLinks = [
    { icon: Instagram, href: "https://instagram.com/visiblemx", label: "Instagram" },
    { icon: Linkedin, href: "https://linkedin.com/company/visiblemx", label: "LinkedIn" },
    { icon: Twitter, href: "https://twitter.com/visiblemx", label: "Twitter" }
  ];

  return (
    <footer className="bg-slate-900 text-white relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff08_1px,transparent_1px),linear-gradient(to_bottom,#ffffff08_1px,transparent_1px)] bg-[size:60px_60px]" />
      </div>

      {/* Main Footer */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 pt-20 pb-12">
        {/* Top Section */}
        <div className="grid lg:grid-cols-5 gap-12 lg:gap-16 mb-16 pb-16 border-b border-white/10">
          {/* Brand Column */}
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h3 className="text-4xl font-black text-white mb-4 tracking-tight">
                VISIBLE MX
              </h3>
              <p className="text-lg text-white/60 font-light mb-8 leading-relaxed max-w-sm">
                {t.tagline}
              </p>
              
              {/* Contact Info */}
              <div className="space-y-4">
                <a href={`mailto:${t.contact.email}`} className="flex items-center gap-3 text-white/80 hover:text-white transition-colors group">
                  <Mail className="w-5 h-5 flex-shrink-0" />
                  <span className="group-hover:underline">{t.contact.email}</span>
                </a>
                <a href={`tel:${t.contact.phone}`} className="flex items-center gap-3 text-white/80 hover:text-white transition-colors group">
                  <Phone className="w-5 h-5 flex-shrink-0" />
                  <span className="group-hover:underline">{t.contact.phone}</span>
                </a>
                <div className="flex items-center gap-3 text-white/80">
                  <MapPin className="w-5 h-5 flex-shrink-0" />
                  <span>{t.contact.address}</span>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Products */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-6">
              {t.products.title}
            </h4>
            <ul className="space-y-4">
              {t.products.items.map((item, i) => (
                <li key={i}>
                  <a href={item.href} className="group flex items-baseline gap-2 text-white/60 hover:text-white transition-colors">
                    <span className="group-hover:underline">{item.name}</span>
                    <span className="text-xs text-white/40">{item.price}</span>
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Company */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-6">
              {t.company.title}
            </h4>
            <ul className="space-y-4">
              {t.company.items.map((item, i) => (
                <li key={i}>
                  <a href={item.href} className="text-white/60 hover:text-white transition-colors hover:underline">
                    {item.name}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Legal */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-6">
              {t.legal.title}
            </h4>
            <ul className="space-y-4">
              {t.legal.items.map((item, i) => (
                <li key={i}>
                  <a href={item.href} className="text-white/60 hover:text-white transition-colors hover:underline">
                    {item.name}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>

        {/* Bottom Section */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          {/* Copyright */}
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-white/40 text-sm order-2 md:order-1"
          >
            {t.copyright}
          </motion.p>

          {/* Social Links */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex items-center gap-4 order-1 md:order-2"
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
                  className="w-12 h-12 border-2 border-white/20 hover:border-white hover:bg-white group flex items-center justify-center transition-all"
                >
                  <Icon className="w-5 h-5 text-white group-hover:text-slate-900 transition-colors" />
                </a>
              );
            })}
          </motion.div>
        </div>

        {/* Made with love */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center mt-12 pt-8 border-t border-white/10"
        >
          <p className="text-white/30 text-xs flex items-center justify-center gap-2">
            {t.madeWith} <span className="text-red-500">â¤</span> {language === 'es' ? 'en' : 'in'} Tijuana
          </p>
        </motion.div>
      </div>

      {/* Decorative Element */}
      <div className="absolute bottom-0 right-0 w-64 h-64 border-[40px] border-white/5 -translate-x-1/2 translate-y-1/2" />
    </footer>
  );
}
