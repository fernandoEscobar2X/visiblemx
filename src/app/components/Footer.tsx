import { ArrowRight, Mail, MapPin, Phone } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { motion } from 'motion/react';

export function Footer() {
  const { language } = useLanguage();

  const content = {
    es: {
      tagline: 'Creamos sitios, sistemas y plataformas digitales para vender mejor y operar con más orden.',
      products: {
        title: 'Soluciones',
        items: [
          { name: 'Presencia digital', href: '#productos' },
          { name: 'Sistemas conectados', href: '#sistemas' },
          { name: 'Proceso por fases', href: '#proceso' },
          { name: 'Proyecto', href: '#contacto' }
        ]
      },
      company: {
        title: 'Compañía',
        items: [
          { name: 'Filosofía', href: '#filosofia' },
          { name: 'Proceso', href: '#proceso' },
          { name: 'Caso real', href: '#caso-real' },
          { name: 'Contacto', href: '#contacto' }
        ]
      },
      legal: {
        title: 'Siguiente paso',
        items: [
          { name: 'Hablemos de tu proyecto', href: '#contacto' },
          { name: 'Ver soluciones', href: '#productos' },
          { name: 'Ver caso real', href: '#caso-real' }
        ]
      },
      contact: {
        email: 'ferrobles2003@gmail.com',
        phone: '664 353 3036',
        address: 'Tijuana, Baja California, México'
      },
      copyright: '© 2026 Visible MX. Todos los derechos reservados.',
      madeWith: 'Hecho en Tijuana',
      projectCta: 'Hablemos de tu proyecto'
    },
    en: {
      tagline: 'We build websites, systems and digital platforms to sell better and operate with more order.',
      products: {
        title: 'Solutions',
        items: [
          { name: 'Digital presence', href: '#productos' },
          { name: 'Connected systems', href: '#sistemas' },
          { name: 'Phased process', href: '#proceso' },
          { name: 'Project', href: '#contacto' }
        ]
      },
      company: {
        title: 'Company',
        items: [
          { name: 'Philosophy', href: '#filosofia' },
          { name: 'Process', href: '#proceso' },
          { name: 'Real case', href: '#caso-real' },
          { name: 'Contact', href: '#contacto' }
        ]
      },
      legal: {
        title: 'Next step',
        items: [
          { name: "Let's talk about your project", href: '#contacto' },
          { name: 'See solutions', href: '#productos' },
          { name: 'See real case', href: '#caso-real' }
        ]
      },
      contact: {
        email: 'ferrobles2003@gmail.com',
        phone: '664 353 3036',
        address: 'Tijuana, Baja California, Mexico'
      },
      copyright: '© 2026 Visible MX. All rights reserved.',
      madeWith: 'Made in Tijuana',
      projectCta: "Let's talk about your project"
    }
  };

  const t = content[language];

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
                  <a href={item.href} className="group flex items-center gap-2 text-white/60 transition-colors hover:text-white">
                    <span className="group-hover:underline">{item.name}</span>
                    <ArrowRight className="h-3.5 w-3.5 opacity-0 transition-opacity group-hover:opacity-100" />
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
            className="order-1 md:order-2"
          >
            <a
              href="#contacto"
              className="inline-flex items-center gap-2 border border-white/20 px-5 py-3 text-sm font-bold uppercase tracking-wide text-white transition-colors hover:border-white hover:bg-white hover:text-slate-900"
            >
              {t.projectCta}
              <ArrowRight className="h-4 w-4" />
            </a>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-12 border-t border-white/10 pt-8 text-center"
        >
          <p className="text-xs text-white/30">{t.madeWith}</p>
        </motion.div>
      </div>

    </footer>
  );
}
