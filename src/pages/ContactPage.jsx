// src/pages/ContactPage.jsx
import React, { useState, useEffect } from 'react';
// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from 'framer-motion';
import { FiSend, FiMail, FiLinkedin, FiGithub, FiLoader, FiCheckCircle, FiAlertTriangle, FiX } from 'react-icons/fi';

const HeroBackground = () => (
    <div className="absolute inset-0 -z-10 overflow-hidden opacity-70">
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/15 rounded-full blur-3xl animate-blob" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/15 rounded-full blur-3xl animate-blob animation-delay-2000" />
      <div className="absolute top-1/3 right-1/3 w-80 h-80 bg-teal-500/15 rounded-full blur-3xl animate-blob animation-delay-4000" />
    </div>
);

const ContactPage = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState({ message: '', type: '', sending: false });
  
  useEffect(() => {
    if (status.message) {
      const timer = setTimeout(() => setStatus({ message: '', type: '', sending: false }), 5000);
      return () => clearTimeout(timer);
    }
  }, [status.message]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus({ message: 'Enviando...', type: 'info', sending: true });

    try {
      const response = await fetch('/api_db/contact.php', { // Asegúrate de que esta URL sea correcta para el hosting
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (response.ok) {
        setStatus({ message: '¡Mensaje enviado con éxito!', type: 'success', sending: false });
        setFormData({ name: '', email: '', message: '' });
      } else {
        setStatus({ message: `Error: ${result.message}`, type: 'error', sending: false });
      }
    } catch {
      setStatus({ message: 'Error de conexión. Inténtalo más tarde.', type: 'error', sending: false });
    }
  };
  
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.15, delayChildren: 0.5 } },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 40, scale: 0.95 },
    visible: { opacity: 1, y: 0, scale: 1, transition: { type: "spring", damping: 15, stiffness: 100 } },
  };

  return (
    <>
      <motion.section
        id="contacto"
        className="relative min-h-screen bg-gradient-to-br from-gray-800 to-gray-700 text-white overflow-hidden"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <HeroBackground />
        {/* Ajuste de padding y max-w para diferentes tamaños de pantalla */}
        <div className="relative z-10 container mx-auto max-w-6xl py-16 px-4 md:py-24 md:px-6">
          <div className="text-center mb-10 md:mb-16">
            {/* Tamaño del título responsivo */}
            
            <motion.h1
            className="text-4xl sm:text-4xl md:text-4xl font-extrabold mb-4 leading-tight tracking-tighter"
          >
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-teal-300 to-purple-400 animate-gradient-x">
            Hablemos
            </span>
          </motion.h1>
            {/* Tamaño del texto responsivo */}
            <motion.p variants={itemVariants} className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed">
              ¿Tienes una idea, un proyecto o simplemente quieres saludar? Me encantaría saber de ti.
            </motion.p>
          </div>

          {/* Disposición responsiva del grid de contacto */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
            <motion.div variants={itemVariants} className="space-y-6">
              <h3 className="text-xl md:text-2xl font-bold mb-4">Información de Contacto</h3>
              {/* Ajuste de tamaño de texto para enlaces de contacto */}
              <a href="mailto:imanol@imaforbes.com" className="group flex items-center gap-4 text-base md:text-lg text-gray-300 hover:text-blue-400 transition-colors"><FiMail /><span>imanol@imaforbes.com</span></a>
              <a href="https://www.linkedin.com/in/imanol-pérez-arteaga-a72a08235" target="_blank" rel="noopener noreferrer" className="group flex items-center gap-4 text-base md:text-lg text-gray-300 hover:text-blue-400 transition-colors"><FiLinkedin /><span>LinkedIn</span></a>
              <a href="https://github.com/Imaforbes" target="_blank" rel="noopener noreferrer" className="group flex items-center gap-4 text-base md:text-lg text-gray-300 hover:text-blue-400 transition-colors"><FiGithub /><span>GitHub</span></a>
            </motion.div>

            <motion.form variants={itemVariants} onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-400 mb-2">Nombre</label>
                <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} required className="w-full p-3 bg-gray-900/50 border-2 border-gray-700 rounded-lg focus:ring-blue-500 focus:border-blue-500 transition" />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-400 mb-2">E-mail</label>
                <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} required className="w-full p-3 bg-gray-900/50 border-2 border-gray-700 rounded-lg focus:ring-blue-500 focus:border-blue-500 transition" />
              </div>
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-400 mb-2">Mensaje</label>
                <textarea id="message" name="message" value={formData.message} onChange={handleChange} required rows="5" className="w-full p-3 bg-gray-900/50 border-2 border-gray-700 rounded-lg focus:ring-blue-500 focus:border-blue-500 transition resize-none"></textarea>
              </div>
              {/* Tamaño del botón responsivo */}
              <button type="submit" disabled={status.sending} className="group flex items-center justify-center gap-2 px-7 py-3 md:px-9 md:py-3.5 bg-blue-600 hover:bg-blue-700 text-white text-base md:text-lg font-semibold rounded-full shadow-xl transition-all duration-300 transform hover:scale-105 active:scale-95 disabled:bg-gray-500 disabled:cursor-wait">
                {status.sending ? <><FiLoader className="animate-spin" /> Enviando...</> : <>Enviar Mensaje <FiSend /></>}
              </button>
            </motion.form>
          </div>
        </div>
      </motion.section>
      
      {/* Notificación Toast (ajuste de padding para móvil) */}
      <AnimatePresence>
        {status.message && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className={`fixed bottom-5 right-5 p-3 md:p-4 rounded-lg shadow-2xl flex items-center gap-4 text-white ${status.type === 'success' ? 'bg-green-600' : 'bg-red-600'}`}
          >
            {status.type === 'success' ? <FiCheckCircle size={24} /> : <FiAlertTriangle size={24} />}
            <p className="font-semibold text-sm md:text-base">{status.message}</p>
            <button onClick={() => setStatus({ message: '', type: '', sending: false })} className="p-1 rounded-full hover:bg-white/20"><FiX size={18} /></button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default ContactPage;