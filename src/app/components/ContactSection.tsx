import { useState } from 'react';
import { motion } from 'motion/react';
import { Send, MessageCircle, Mail, MapPin, Phone, CheckCircle } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

type ServiceOption = {
  value: string;
  label: string;
};

export function ContactSection() {
  const { language } = useLanguage();
  const [formData, setFormData] = useState({
    name: '',
    company: '',
    contact: '',
    projectType: '',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);

  const content = {
    es: {
      overtitle: 'Proyecto',
      title: 'Cuéntanos tu proyecto',
      description:
        'Describe qué necesitas construir, mejorar u ordenar. Te responderemos con una propuesta según el alcance, etapa y objetivos del proyecto.',
      form: {
        name: 'Nombre',
        company: 'Empresa o negocio',
        contact: 'WhatsApp o correo',
        projectType: 'Tipo de proyecto',
        projectTypePlaceholder: 'Selecciona el tipo de proyecto',
        message: 'Qué necesitas resolver',
        submit: 'Enviar solicitud',
        whatsapp: 'O escríbenos por WhatsApp'
      },
      services: [
        { value: 'sitio-profesional', label: 'Sitio web profesional' },
        { value: 'landing-page', label: 'Landing page' },
        { value: 'menu-digital', label: 'Menú digital' },
        { value: 'agenda-citas', label: 'Agenda o sistema de citas' },
        { value: 'sistema-medida', label: 'Sistema a medida' },
        { value: 'plataforma-multicanal', label: 'Plataforma multicanal' },
        { value: 'automatizacion-reportes', label: 'Automatización y reportes' },
        { value: 'orientacion', label: 'No estoy seguro, necesito orientación' }
      ] as ServiceOption[],
      info: {
        email: 'ferrobles2003@gmail.com',
        phone: '664 353 3036',
        whatsapp: '526643533036',
        address: 'Tijuana, Baja California, México'
      },
      success: {
        title: '¡Mensaje enviado!',
        description: 'Te contactaremos en las próximas 24 horas'
      },
      placeholders: {
        name: 'Juan Pérez',
        company: 'Nombre del negocio',
        contact: '664 123 4567 o correo@empresa.com',
        message: 'Quiero construir, mejorar u ordenar...'
      }
    },
    en: {
      overtitle: 'Project',
      title: 'Tell us about your project',
      description: 'Describe what you need to build, improve or organize. We will reply with a proposal based on project scope, stage and goals.',
      form: {
        name: 'Name',
        company: 'Company or business',
        contact: 'WhatsApp or email',
        projectType: 'Project type',
        projectTypePlaceholder: 'Select the project type',
        message: 'What do you need to solve?',
        submit: 'Send request',
        whatsapp: 'Or message us on WhatsApp'
      },
      services: [
        { value: 'professional-website', label: 'Professional website' },
        { value: 'landing-page', label: 'Landing page' },
        { value: 'digital-menu', label: 'Digital menu' },
        { value: 'booking-system', label: 'Booking or appointment system' },
        { value: 'custom-system', label: 'Custom system' },
        { value: 'multichannel-platform', label: 'Multichannel platform' },
        { value: 'automation-reports', label: 'Automation and reports' },
        { value: 'guidance', label: 'Not sure yet, I need guidance' }
      ] as ServiceOption[],
      info: {
        email: 'ferrobles2003@gmail.com',
        phone: '664 353 3036',
        whatsapp: '526643533036',
        address: 'Tijuana, Baja California, Mexico'
      },
      success: {
        title: 'Message sent!',
        description: "We'll contact you within 24 hours"
      },
      placeholders: {
        name: 'John Perez',
        company: 'Business name',
        contact: 'Phone or email',
        message: 'I want to build, improve or organize...'
      }
    }
  };

  const t = content[language];
  const selectedProjectType = t.services.find((service) => service.value === formData.projectType);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const message = encodeURIComponent(
      `NUEVO LEAD - VISIBLE MX\n\n` +
        `Nombre: ${formData.name}\n` +
        `Empresa o negocio: ${formData.company}\n` +
        `Contacto: ${formData.contact}\n` +
        `Tipo de proyecto: ${selectedProjectType?.label || formData.projectType}\n\n` +
        `Qué necesita resolver:\n${formData.message}`
    );

    window.open(`https://wa.me/${t.info.whatsapp}?text=${message}`, '_blank');
    setSubmitted(true);

    setTimeout(() => {
      setSubmitted(false);
      setFormData({ name: '', company: '', contact: '', projectType: '', message: '' });
    }, 5000);
  };

  const handleWhatsAppDirect = () => {
    window.open(`https://wa.me/${t.info.whatsapp}?text=¡Hola! Quiero cotizar un proyecto con Visible MX`, '_blank');
  };

  if (submitted) {
    return (
      <section className="bg-white py-32" id="contacto">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="mx-auto max-w-2xl text-center">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: 'spring', delay: 0.2, stiffness: 200 }}
              className="mx-auto mb-8 flex h-24 w-24 items-center justify-center rounded-full bg-slate-900"
            >
              <CheckCircle className="h-14 w-14 text-white" />
            </motion.div>
            <h3 className="mb-4 text-5xl font-black text-slate-900">{t.success.title}</h3>
            <p className="text-xl font-light text-slate-600">{t.success.description}</p>
          </motion.div>
        </div>
      </section>
    );
  }

  return (
    <section className="relative overflow-hidden bg-white py-32" id="contacto">
      <div className="absolute inset-0 opacity-5">
        <div className="absolute right-0 top-0 h-[600px] w-[600px] translate-x-1/2 -translate-y-1/2 rounded-full border-[80px] border-slate-900" />
        <div className="absolute bottom-0 left-0 h-[400px] w-[400px] -translate-x-1/2 translate-y-1/2 border-[60px] border-slate-900" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mb-20 max-w-3xl">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
            <div className="mb-6 flex items-center gap-3">
              <div className="h-px w-12 bg-slate-900" />
              <span className="text-sm font-medium uppercase tracking-[0.2em] text-slate-600">{t.overtitle}</span>
            </div>
            <h2 className="mb-6 text-5xl font-black leading-tight text-slate-900 md:text-6xl lg:text-7xl">{t.title}</h2>
            <p className="text-xl font-light leading-8 text-slate-600 md:text-2xl">{t.description}</p>
          </motion.div>
        </div>

        <div className="grid items-start gap-16 lg:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-8"
          >
            <div className="space-y-6">
              <div className="group flex items-start gap-5">
                <div className="flex h-14 w-14 flex-shrink-0 items-center justify-center border-2 border-slate-900 transition-colors group-hover:bg-slate-900">
                  <Mail className="h-6 w-6 text-slate-900 transition-colors group-hover:text-white" />
                </div>
                <div>
                  <div className="mb-1 text-sm font-medium uppercase tracking-wider text-slate-600">Email</div>
                  <a href={`mailto:${t.info.email}`} className="text-xl font-medium text-slate-900 hover:underline">
                    {t.info.email}
                  </a>
                </div>
              </div>

              <div className="group flex items-start gap-5">
                <div className="flex h-14 w-14 flex-shrink-0 items-center justify-center border-2 border-slate-900 transition-colors group-hover:bg-slate-900">
                  <Phone className="h-6 w-6 text-slate-900 transition-colors group-hover:text-white" />
                </div>
                <div>
                  <div className="mb-1 text-sm font-medium uppercase tracking-wider text-slate-600">{language === 'es' ? 'Teléfono' : 'Phone'}</div>
                  <a href={`tel:${t.info.phone}`} className="text-xl font-medium text-slate-900 hover:underline">
                    {t.info.phone}
                  </a>
                </div>
              </div>

              <div className="group flex items-start gap-5">
                <div className="flex h-14 w-14 flex-shrink-0 items-center justify-center border-2 border-slate-900 transition-colors group-hover:bg-slate-900">
                  <MapPin className="h-6 w-6 text-slate-900 transition-colors group-hover:text-white" />
                </div>
                <div>
                  <div className="mb-1 text-sm font-medium uppercase tracking-wider text-slate-600">{language === 'es' ? 'Ubicación' : 'Location'}</div>
                  <p className="text-xl font-medium text-slate-900">{t.info.address}</p>
                </div>
              </div>
            </div>

            <motion.button
              onClick={handleWhatsAppDirect}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="flex w-full items-center justify-center gap-3 bg-[#25D366] px-8 py-6 text-lg font-bold text-white transition-colors hover:bg-[#20BA5A]"
            >
              <MessageCircle className="h-6 w-6" />
              {t.form.whatsapp}
            </motion.button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="rounded-[2rem] border border-slate-100 bg-white p-8 shadow-xl"
          >
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="contact-name" className="mb-3 block text-sm font-medium uppercase tracking-wider text-slate-900">
                  {t.form.name}
                </label>
                <input
                  id="contact-name"
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full border-2 border-slate-200 px-6 py-5 text-lg text-slate-900 transition-colors focus:border-slate-900 focus:outline-none"
                  placeholder={t.placeholders.name}
                />
              </div>

              <div>
                <label htmlFor="contact-company" className="mb-3 block text-sm font-medium uppercase tracking-wider text-slate-900">
                  {t.form.company}
                </label>
                <input
                  id="contact-company"
                  type="text"
                  required
                  value={formData.company}
                  onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                  className="w-full border-2 border-slate-200 px-6 py-5 text-lg text-slate-900 transition-colors focus:border-slate-900 focus:outline-none"
                  placeholder={t.placeholders.company}
                />
              </div>

              <div>
                <label htmlFor="contact-method" className="mb-3 block text-sm font-medium uppercase tracking-wider text-slate-900">
                  {t.form.contact}
                </label>
                <input
                  id="contact-method"
                  type="text"
                  required
                  value={formData.contact}
                  onChange={(e) => setFormData({ ...formData, contact: e.target.value })}
                  className="w-full border-2 border-slate-200 px-6 py-5 text-lg text-slate-900 transition-colors focus:border-slate-900 focus:outline-none"
                  placeholder={t.placeholders.contact}
                />
              </div>

              <div>
                <label htmlFor="contact-project-type" className="mb-3 block text-sm font-medium uppercase tracking-wider text-slate-900">
                  {t.form.projectType}
                </label>
                <select
                  id="contact-project-type"
                  required
                  value={formData.projectType}
                  onChange={(e) => setFormData({ ...formData, projectType: e.target.value })}
                  className="w-full appearance-none bg-white border-2 border-slate-200 px-6 py-5 text-lg text-slate-900 transition-colors focus:border-slate-900 focus:outline-none"
                >
                  <option value="">{t.form.projectTypePlaceholder}</option>
                  {t.services.map((service) => (
                    <option key={service.value} value={service.value}>
                      {service.label}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label htmlFor="contact-message" className="mb-3 block text-sm font-medium uppercase tracking-wider text-slate-900">
                  {t.form.message}
                </label>
                <textarea
                  id="contact-message"
                  required
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  rows={5}
                  className="w-full resize-none border-2 border-slate-200 px-6 py-5 text-lg text-slate-900 transition-colors focus:border-slate-900 focus:outline-none"
                  placeholder={t.placeholders.message}
                />
              </div>

              <motion.button
                type="submit"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="group relative flex w-full items-center justify-center gap-3 overflow-hidden bg-slate-900 px-8 py-6 text-lg font-bold text-white transition-all hover:bg-slate-800"
              >
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-slate-700 to-slate-800"
                  initial={{ x: '-100%' }}
                  whileHover={{ x: 0 }}
                  transition={{ duration: 0.5, ease: 'easeOut' }}
                />

                <Send className="relative z-10 h-6 w-6 transition-transform duration-300 group-hover:rotate-45" />
                <span className="relative z-10">{t.form.submit}</span>
              </motion.button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}


