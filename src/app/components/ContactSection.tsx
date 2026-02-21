import { useState } from 'react';
import { motion } from 'motion/react';
import { Send, MessageCircle, Mail, MapPin, Phone, CheckCircle } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export function ContactSection() {
  const { language } = useLanguage();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service: '',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);

  const content = {
    es: {
      overtitle: "¿Listo para comenzar?",
      title: "Hablemos de tu proyecto",
      description: "Respuesta en menos de 24 horas. Sin compromiso.",
      form: {
        name: "Nombre completo",
        email: "Email",
        phone: "Teléfono (opcional)",
        service: "Servicio de interés",
        servicePlaceholder: "Selecciona un servicio",
        message: "Cuéntanos sobre tu proyecto",
        submit: "Enviar Mensaje",
        whatsapp: "O escríbenos por WhatsApp"
      },
      services: [
        { value: 'link', label: 'Visible Link - $1,799 MXN' },
        { value: 'page', label: 'Visible Page - $2,699 MXN' },
        { value: 'menu', label: 'Visible Menú - $3,599 MXN' },
        { value: 'agenda', label: 'Visible Agenda - $4,499 MXN' },
        { value: 'custom', label: 'Proyecto personalizado' }
      ],
      info: {
        email: "ferrobles2003@gmail.com",
        phone: "664 353 3036",
        whatsapp: "526643533036",
        address: "Tijuana, Baja California, México"
      },
      success: {
        title: "¡Mensaje enviado!",
        description: "Te contactaremos en las próximas 24 horas"
      }
    },
    en: {
      overtitle: "Ready to start?",
      title: "Let's talk about your project",
      description: "Response in less than 24 hours. No commitment.",
      form: {
        name: "Full name",
        email: "Email",
        phone: "Phone (optional)",
        service: "Service of interest",
        servicePlaceholder: "Select a service",
        message: "Tell us about your project",
        submit: "Send Message",
        whatsapp: "Or message us on WhatsApp"
      },
      services: [
        { value: 'link', label: 'Visible Link - $1,799 MXN' },
        { value: 'page', label: 'Visible Page - $2,699 MXN' },
        { value: 'menu', label: 'Visible Menú - $3,599 MXN' },
        { value: 'agenda', label: 'Visible Agenda - $4,499 MXN' },
        { value: 'custom', label: 'Custom project' }
      ],
      info: {
        email: "ferrobles2003@gmail.com",
        phone: "664 353 3036",
        whatsapp: "526643533036",
        address: "Tijuana, Baja California, Mexico"
      },
      success: {
        title: "Message sent!",
        description: "We'll contact you within 24 hours"
      }
    }
  };

  const t = content[language];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const message = encodeURIComponent(
      `NUEVO LEAD - VISIBLE MX\n\n` +
      `Nombre: ${formData.name}\n` +
      `Email: ${formData.email}\n` +
      `Teléfono: ${formData.phone || 'No proporcionado'}\n` +
      `Servicio: ${formData.service}\n\n` +
      `Mensaje:\n${formData.message}`
    );
    
    window.open(`https://wa.me/${t.info.whatsapp}?text=${message}`, '_blank');
    setSubmitted(true);
    
    setTimeout(() => {
      setSubmitted(false);
      setFormData({ name: '', email: '', phone: '', service: '', message: '' });
    }, 5000);
  };

  const handleWhatsAppDirect = () => {
    window.open(`https://wa.me/${t.info.whatsapp}?text=Hola! Estoy interesado en los servicios de Visible MX`, '_blank');
  };

  if (submitted) {
    return (
      <section className="py-32 bg-white" id="contacto">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="max-w-2xl mx-auto text-center"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", delay: 0.2, stiffness: 200 }}
              className="w-24 h-24 bg-slate-900 rounded-full flex items-center justify-center mx-auto mb-8"
            >
              <CheckCircle className="w-14 h-14 text-white" />
            </motion.div>
            <h3 className="text-5xl font-black text-slate-900 mb-4">
              {t.success.title}
            </h3>
            <p className="text-xl text-slate-600 font-light">
              {t.success.description}
            </p>
          </motion.div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-32 bg-white relative overflow-hidden" id="contacto">
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] border-[80px] border-slate-900 rounded-full -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] border-[60px] border-slate-900 translate-y-1/2 -translate-x-1/2" />
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="max-w-3xl mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-px bg-slate-900" />
              <span className="text-sm font-medium text-slate-600 tracking-[0.2em] uppercase">
                {t.overtitle}
              </span>
            </div>
            <h2 className="text-6xl lg:text-7xl font-black text-slate-900 mb-6 leading-tight">
              {t.title}
            </h2>
            <p className="text-2xl text-slate-600 font-light">
              {t.description}
            </p>
          </motion.div>
        </div>

        <div className="grid lg:grid-cols-2 gap-16 items-start">
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-8"
          >
            <div className="space-y-6">
              <div className="flex items-start gap-5 group">
                <div className="w-14 h-14 border-2 border-slate-900 flex items-center justify-center flex-shrink-0 group-hover:bg-slate-900 transition-colors">
                  <Mail className="w-6 h-6 text-slate-900 group-hover:text-white transition-colors" />
                </div>
                <div>
                  <div className="text-sm font-medium text-slate-600 mb-1 uppercase tracking-wider">
                    Email
                  </div>
                  <a href={`mailto:${t.info.email}`} className="text-xl font-medium text-slate-900 hover:underline">
                    {t.info.email}
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-5 group">
                <div className="w-14 h-14 border-2 border-slate-900 flex items-center justify-center flex-shrink-0 group-hover:bg-slate-900 transition-colors">
                  <Phone className="w-6 h-6 text-slate-900 group-hover:text-white transition-colors" />
                </div>
                <div>
                  <div className="text-sm font-medium text-slate-600 mb-1 uppercase tracking-wider">
                    {language === 'es' ? 'Teléfono' : 'Phone'}
                  </div>
                  <a href={`tel:${t.info.phone}`} className="text-xl font-medium text-slate-900 hover:underline">
                    {t.info.phone}
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-5 group">
                <div className="w-14 h-14 border-2 border-slate-900 flex items-center justify-center flex-shrink-0 group-hover:bg-slate-900 transition-colors">
                  <MapPin className="w-6 h-6 text-slate-900 group-hover:text-white transition-colors" />
                </div>
                <div>
                  <div className="text-sm font-medium text-slate-600 mb-1 uppercase tracking-wider">
                    {language === 'es' ? 'Ubicación' : 'Location'}
                  </div>
                  <p className="text-xl font-medium text-slate-900">
                    {t.info.address}
                  </p>
                </div>
              </div>
            </div>

            {/* WhatsApp CTA */}
            <motion.button
              onClick={handleWhatsAppDirect}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full bg-[#25D366] hover:bg-[#20BA5A] text-white py-6 px-8 font-bold text-lg flex items-center justify-center gap-3 transition-colors"
            >
              <MessageCircle className="w-6 h-6" />
              {t.form.whatsapp}
            </motion.button>
          </motion.div>

          {/* Form */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-white p-8 rounded-[2rem] border border-slate-100 shadow-xl"
          >
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="contact-name" className="block text-sm font-medium text-slate-900 mb-3 uppercase tracking-wider">
                  {t.form.name}
                </label>
                <input
                  id="contact-name"
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-6 py-5 border-2 border-slate-200 focus:border-slate-900 focus:outline-none text-slate-900 text-lg transition-colors"
                  placeholder="Juan Pérez"
                />
              </div>

              <div>
                <label htmlFor="contact-email" className="block text-sm font-medium text-slate-900 mb-3 uppercase tracking-wider">
                  {t.form.email}
                </label>
                <input
                  id="contact-email"
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-6 py-5 border-2 border-slate-200 focus:border-slate-900 focus:outline-none text-slate-900 text-lg transition-colors"
                  placeholder="juan@empresa.com"
                />
              </div>

              <div>
                <label htmlFor="contact-phone" className="block text-sm font-medium text-slate-900 mb-3 uppercase tracking-wider">
                  {t.form.phone}
                </label>
                <input
                  id="contact-phone"
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full px-6 py-5 border-2 border-slate-200 focus:border-slate-900 focus:outline-none text-slate-900 text-lg transition-colors"
                  placeholder="664 353 3036"
                />
              </div>

              <div>
                <label htmlFor="contact-service" className="block text-sm font-medium text-slate-900 mb-3 uppercase tracking-wider">
                  {t.form.service}
                </label>
                <select
                  id="contact-service"
                  required
                  value={formData.service}
                  onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                  className="w-full px-6 py-5 border-2 border-slate-200 focus:border-slate-900 focus:outline-none text-slate-900 text-lg transition-colors appearance-none bg-white"
                >
                  <option value="">{t.form.servicePlaceholder}</option>
                  {t.services.map((service) => (
                    <option key={service.value} value={service.value}>
                      {service.label}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label htmlFor="contact-message" className="block text-sm font-medium text-slate-900 mb-3 uppercase tracking-wider">
                  {t.form.message}
                </label>
                <textarea
                  id="contact-message"
                  required
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  rows={5}
                  className="w-full px-6 py-5 border-2 border-slate-200 focus:border-slate-900 focus:outline-none text-slate-900 text-lg transition-colors resize-none"
                  placeholder={language === 'es' ? "Necesito una página web para..." : "I need a website for..."}
                />
              </div>

              <motion.button
                type="submit"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full bg-slate-900 hover:bg-slate-800 text-white py-6 px-8 font-bold text-lg flex items-center justify-center gap-3 transition-all relative overflow-hidden group"
              >
                {/* Liquid effect background */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-slate-700 to-slate-800"
                  initial={{ x: '-100%' }}
                  whileHover={{ x: 0 }}
                  transition={{ duration: 0.5, ease: 'easeOut' }}
                />
                
                <Send className="w-6 h-6 relative z-10 group-hover:rotate-45 transition-transform duration-300" />
                <span className="relative z-10">{t.form.submit}</span>
              </motion.button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

