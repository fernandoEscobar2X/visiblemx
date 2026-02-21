import { useState } from 'react';
import { motion } from 'motion/react';
import { Send, MessageCircle, Mail, MapPin, Phone, CheckCircle, Zap } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';

export function GymContact() {
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
      overtitle: "¿Listo para el cambio?",
      title: "COMIENZA HOY",
      description: "Agenda tu visita o clase de prueba gratis hoy mismo.",
      form: {
        name: "Nombre completo",
        email: "Email",
        phone: "Teléfono",
        service: "Interés principal",
        servicePlaceholder: "Selecciona una opción",
        message: "Objetivos o dudas",
        submit: "ENVIAR MENSAJE",
        whatsapp: "WHATSAPP DIRECTO"
      },
      services: [
        { value: 'membership', label: 'Membresía General' },
        { value: 'pt', label: 'Entrenamiento Personal' },
        { value: 'classes', label: 'Clases Grupales' },
        { value: 'nutrition', label: 'Nutrición' },
        { value: 'trial', label: 'Pase de Prueba Gratis' }
      ],
      info: {
        email: "info@irongym.com",
        phone: "+52 664 123 4567",
        whatsapp: "5216641234567",
        address: "Tijuana, Baja California, México"
      },
      success: {
        title: "¡MENSAJE ENVIADO!",
        description: "Te contactaremos en breve para confirmar tu visita."
      }
    },
    en: {
      overtitle: "Ready for change?",
      title: "START TODAY",
      description: "Book your visit or free trial class today.",
      form: {
        name: "Full name",
        email: "Email",
        phone: "Phone",
        service: "Main Interest",
        servicePlaceholder: "Select an option",
        message: "Goals or questions",
        submit: "SEND MESSAGE",
        whatsapp: "DIRECT WHATSAPP"
      },
      services: [
        { value: 'membership', label: 'General Membership' },
        { value: 'pt', label: 'Personal Training' },
        { value: 'classes', label: 'Group Classes' },
        { value: 'nutrition', label: 'Nutrition' },
        { value: 'trial', label: 'Free Trial Pass' }
      ],
      info: {
        email: "info@irongym.com",
        phone: "+52 664 123 4567",
        whatsapp: "5216641234567",
        address: "Tijuana, Baja California, Mexico"
      },
      success: {
        title: "MESSAGE SENT!",
        description: "We will contact you shortly to confirm your visit."
      }
    }
  };

  const t = content[language];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const message = encodeURIComponent(
      `NUEVO LEAD - IRON GYM\n\n` +
      `Nombre: ${formData.name}\n` +
      `Email: ${formData.email}\n` +
      `Teléfono: ${formData.phone || 'No proporcionado'}\n` +
      `Interés: ${formData.service}\n\n` +
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
    window.open(`https://wa.me/${t.info.whatsapp}?text=Hola! Estoy interesado en entrenar en Iron Gym`, '_blank');
  };

  if (submitted) {
    return (
      <section className="py-32 bg-[#050505]" id="contacto">
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
              className="w-24 h-24 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-8 shadow-[0_0_40px_-10px_#2563EB]"
            >
              <CheckCircle className="w-14 h-14 text-white" />
            </motion.div>
            <h3 className="text-5xl font-black text-white mb-4 uppercase italic">
              {t.success.title}
            </h3>
            <p className="text-xl text-white/60 font-light">
              {t.success.description}
            </p>
          </motion.div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-32 bg-[#050505] relative overflow-hidden border-t border-white/5" id="contacto">
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-blue-600/20 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-blue-600/10 rounded-full blur-[80px] translate-y-1/2 -translate-x-1/2" />
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
              <div className="w-12 h-px bg-blue-600" />
              <span className="text-sm font-black text-blue-500 tracking-[0.2em] uppercase">
                {t.overtitle}
              </span>
            </div>
            <h2 className="text-6xl lg:text-8xl font-black text-white mb-6 leading-none uppercase italic tracking-tighter">
              {t.title}
            </h2>
            <p className="text-2xl text-white/60 font-light">
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
                <div className="w-14 h-14 bg-white/5 border border-white/10 text-white rounded-2xl flex items-center justify-center flex-shrink-0 group-hover:border-blue-500 group-hover:bg-blue-500/10 group-hover:text-blue-500 transition-all duration-300">
                  <Mail className="w-6 h-6" />
                </div>
                <div>
                  <div className="text-sm font-bold text-white/70 mb-1 uppercase tracking-wider">
                    Email
                  </div>
                  <a href={`mailto:${t.info.email}`} className="text-xl font-medium text-white hover:text-blue-500 transition-colors">
                    {t.info.email}
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-5 group">
                <div className="w-14 h-14 bg-white/5 border border-white/10 text-white rounded-2xl flex items-center justify-center flex-shrink-0 group-hover:border-blue-500 group-hover:bg-blue-500/10 group-hover:text-blue-500 transition-all duration-300">
                  <Phone className="w-6 h-6" />
                </div>
                <div>
                  <div className="text-sm font-bold text-white/70 mb-1 uppercase tracking-wider">
                    {language === 'es' ? 'Teléfono' : 'Phone'}
                  </div>
                  <a href={`tel:${t.info.phone}`} className="text-xl font-medium text-white hover:text-blue-500 transition-colors">
                    {t.info.phone}
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-5 group">
                <div className="w-14 h-14 bg-white/5 border border-white/10 text-white rounded-2xl flex items-center justify-center flex-shrink-0 group-hover:border-blue-500 group-hover:bg-blue-500/10 group-hover:text-blue-500 transition-all duration-300">
                  <MapPin className="w-6 h-6" />
                </div>
                <div>
                  <div className="text-sm font-bold text-white/70 mb-1 uppercase tracking-wider">
                    {language === 'es' ? 'Ubicación' : 'Location'}
                  </div>
                  <p className="text-xl font-medium text-white">
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
              className="w-full bg-[#25D366] hover:bg-[#20BA5A] text-white py-6 px-8 font-black uppercase tracking-wider text-lg flex items-center justify-center gap-3 transition-colors rounded-none skew-x-[-10deg]"
            >
              <div className="skew-x-[10deg] flex items-center gap-3">
                <MessageCircle className="w-6 h-6" />
                {t.form.whatsapp}
              </div>
            </motion.button>
          </motion.div>

          {/* Form */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-[#0A0A0A] p-8 rounded-[2rem] border border-white/10"
          >
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="gym-contact-name" className="block text-sm font-bold text-white/80 mb-3 uppercase tracking-wider">
                  {t.form.name}
                </label>
                <input
                  id="gym-contact-name"
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-6 py-4 bg-white/5 border-2 border-transparent focus:border-blue-600 rounded-xl focus:outline-none text-white text-lg transition-colors placeholder-white/20"
                  placeholder="Juan Pérez"
                />
              </div>

              <div>
                <label htmlFor="gym-contact-email" className="block text-sm font-bold text-white/80 mb-3 uppercase tracking-wider">
                  {t.form.email}
                </label>
                <input
                  id="gym-contact-email"
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-6 py-4 bg-white/5 border-2 border-transparent focus:border-blue-600 rounded-xl focus:outline-none text-white text-lg transition-colors placeholder-white/20"
                  placeholder="juan@email.com"
                />
              </div>

              <div>
                <label htmlFor="gym-contact-service" className="block text-sm font-bold text-white/80 mb-3 uppercase tracking-wider">
                  {t.form.service}
                </label>
                <div className="relative">
                  <select
                    id="gym-contact-service"
                    required
                    value={formData.service}
                    onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                    className="w-full px-6 py-4 bg-white/5 border-2 border-transparent focus:border-blue-600 rounded-xl focus:outline-none text-white text-lg transition-colors appearance-none"
                  >
                    <option value="" className="bg-[#0A0A0A]">{t.form.servicePlaceholder}</option>
                    {t.services.map((service) => (
                      <option key={service.value} value={service.value} className="bg-[#0A0A0A]">
                        {service.label}
                      </option>
                    ))}
                  </select>
                  <div className="absolute right-6 top-1/2 -translate-y-1/2 pointer-events-none text-white/70">
                    <svg width="12" height="8" viewBox="0 0 12 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M1 1.5L6 6.5L11 1.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                </div>
              </div>

              <div>
                <label htmlFor="gym-contact-message" className="block text-sm font-bold text-white/80 mb-3 uppercase tracking-wider">
                  {t.form.message}
                </label>
                <textarea
                  id="gym-contact-message"
                  required
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  rows={4}
                  className="w-full px-6 py-4 bg-white/5 border-2 border-transparent focus:border-blue-600 rounded-xl focus:outline-none text-white text-lg transition-colors resize-none placeholder-white/20"
                  placeholder={language === 'es' ? "Mis objetivos son..." : "My goals are..."}
                />
              </div>

              <motion.button
                type="submit"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full bg-blue-600 hover:bg-blue-500 text-white py-6 px-8 font-black uppercase tracking-widest text-lg flex items-center justify-center gap-3 transition-all rounded-none skew-x-[-5deg] shadow-[0_0_30px_-5px_rgba(37,99,235,0.4)]"
              >
                <div className="skew-x-[5deg] flex items-center gap-3">
                    <Zap className="w-5 h-5 fill-white" />
                    <span>{t.form.submit}</span>
                </div>
              </motion.button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
