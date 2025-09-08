// src/pages/ContactPage.jsx
import React, { useState, useEffect } from 'react';
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

  // --- FUNCIÓN handleSubmit MEJORADA Y MÁS ROBUSTA ---
  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus({ message: 'Enviando...', type: 'info', sending: true });

    try {
      const response = await fetch('/api_db/contact.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      // --> CAMBIO CLAVE: Leemos la respuesta como texto plano primero.
      // Esto es mucho más seguro y compatible con todos los navegadores, ya que evita
      // que la aplicación se congele si la respuesta no es un JSON perfecto.
      const responseText = await response.text();

      // Ahora, intentamos convertir ese texto en un objeto JSON.
      // Si el texto no es un JSON válido, el bloque catch se encargará del error.
      const result = JSON.parse(responseText);

      // Verificamos tanto la respuesta del servidor como el contenido del JSON.
      if (response.ok && result.status === 'success') {
        setStatus({ message: '¡Mensaje enviado con éxito!', type: 'success', sending: false });
        setFormData({ name: '', email: '', message: '' }); // Limpia el formulario
      } else {
        // Si el servidor o el JSON indican un error, lo mostramos.
        setStatus({ message: `Error: ${result.message || 'Ocurrió un error inesperado.'}`, type: 'error', sending: false });
      }
    } catch (error) {
      // Este bloque ahora atrapará tanto errores de red (sin conexión) como errores
      // si la respuesta del servidor no es un JSON válido (ej. un error de PHP).
      console.error("Error en el envío del formulario:", error);
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
        <div className="relative z-10 container mx-auto max-w-6xl py-24 px-4 md:px-6">
          <div className="text-center mb-12 md:mb-16">
            <motion.h2 variants={itemVariants} className="text-3xl md:text-4xl font-extrabold tracking-tighter mb-4">
              Hablemos
            </motion.h2>
            <motion.p variants={itemVariants} className="text-base md:text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed">
              ¿Tienes una idea, un proyecto o simplemente quieres saludar? Me encantaría saber de ti.
            </motion.p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
            <motion.div variants={itemVariants} className="space-y-6">
              <h3 className="text-xl md:text-2xl font-bold mb-4">Información de Contacto</h3>
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
              <button type="submit" disabled={status.sending} className="group flex items-center justify-center gap-2 px-9 py-3.5 bg-blue-600 hover:bg-blue-700 text-white text-lg font-semibold rounded-full shadow-xl transition-all duration-300 transform hover:scale-105 active:scale-95 disabled:bg-gray-500 disabled:cursor-wait">
                {status.sending ? <><FiLoader className="animate-spin" /> Enviando...</> : <>Contactar <FiSend /></>}
              </button>
            </motion.form>
          </div>
        </div>
      </motion.section>
      
     {/* --> INICIO DE LA SECCIÓN MODIFICADA: Banner Superior Responsivo */}
     <div className="fixed top-20 md:top-24 left-1/2 -translate-x-1/2 w-[90%] md:w-full max-w-lg z-50">
        <AnimatePresence>
          {status.message && (
            <motion.div
              initial={{ opacity: 0, y: -30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -30 }}
              transition={{ type: "spring", stiffness: 200, damping: 20 }}
              className={`relative w-full p-4 rounded-xl shadow-2xl flex items-center space-x-4
                ${status.type === 'success' ? 'bg-green-500' : ''}
                ${status.type === 'error' ? 'bg-red-500' : ''}
              `}
            >
              <div className="flex-shrink-0">
                {status.type === 'success' && <FiCheckCircle className="w-6 h-6 text-white" />}
                {status.type === 'error' && <FiAlertTriangle className="w-6 h-6 text-white" />}
              </div>
              <div className="flex-1">
                <p className="text-white text-sm md:text-base font-semibold">
                  {status.message}
                </p>
              </div>
              <div className="flex-shrink-0">
                <button onClick={() => setStatus({ message: '', type: '', sending: false })} className="p-1 rounded-full text-white/70 hover:text-white hover:bg-white/20 transition-colors">
                  <FiX size={18} />
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      {/* --> FIN DE LA SECCIÓN MODIFICADA */}
    </>
  );
};

export default ContactPage;