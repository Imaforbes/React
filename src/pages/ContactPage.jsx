// src/pages/ContactPage.jsx
import React, { useState } from 'react';
// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';
import { FiSend, FiMail, FiLinkedin, FiGithub, FiLoader } from 'react-icons/fi';

const ContactPage = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState({ message: '', type: '', sending: false });

  // Base URL configurable por entorno (Vite usa import.meta.env)
  // ContactPage.jsx - Versión optimizada para usar el proxy
const backendUrl = '/api_db/contact.php'; // Sin http://localhost

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus({ message: 'Enviando...', type: 'info', sending: true });
    try {
      const response = await fetch(backendUrl, {
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
    visible: { opacity: 1, transition: { staggerChildren: 0.2, duration: 0.5 } },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: 'easeOut' } },
  };


  return (
    <motion.section
      id="contacto"
      className="min-h-screen bg-gray-800 to-gray-700 text-white"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <div className="container mx-auto max-w-6xl py-24 px-6">
        <div className="text-center mb-16">
          <motion.h2 variants={itemVariants} className="text-3xl md:text-3xl font-bold tracking-tighter mb-4">
            Hablemos
          </motion.h2>
          <motion.p variants={itemVariants} className="text-md text-gray-400 max-w-2xl mx-auto">
            ¿Tienes una idea, un proyecto o simplemente quieres saludar? Me encantaría saber de ti.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <motion.div variants={itemVariants}>
            <h3 className="text-3xl font-semibold mb-6">Información de Contacto</h3>
            <p className="text-md text-gray-400 mb-8">
              Si prefieres otros medios, aquí me puedes encontrar. Siempre estoy abierto a conectar con otros profesionales del sector.
            </p>
            <div className="space-y-6">
              <a href="mailto:imanol.perez.arteaga@gmail.com" className="group flex items-center gap-4 text-md text-gray-300 hover:text-blue-400 transition-colors">
                <FiMail size={24} className="group-hover:text-blue-400 transition-colors" />
                <span>imanol.perez.arteaga@gmail.com</span>
              </a>
              <a href="https://www.linkedin.com/in/imanol-pérez-arteaga-a72a08235" target="_blank" rel="noopener noreferrer" className="group flex items-center gap-4 text-md text-gray-300 hover:text-blue-400 transition-colors">
                <FiLinkedin size={24} className="group-hover:text-blue-400 transition-colors" />
                <span>LinkedIn</span>
              </a>
              <a href="https://github.com/Imaforbes" target="_blank" rel="noopener noreferrer" className="group flex items-center gap-4 text-md text-gray-300 hover:text-blue-400 transition-colors">
                <FiGithub size={24} className="group-hover:text-blue-400 transition-colors" />
                <span>GitHub</span>
              </a>
            </div>
          </motion.div>

          <motion.form variants={itemVariants} onSubmit={handleSubmit} className="space-y-8">
            {/* Campo con etiqueta flotante */}
            <div className="relative">
              <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} required className="peer w-full p-4 bg-transparent border-b-2 border-gray-700 focus:border-blue-500 outline-none transition text-md" placeholder=" " />
              <label htmlFor="name" className="absolute left-0 -top-5 text-gray-500 text-sm transition-all peer-placeholder-shown:text-lg peer-placeholder-shown:text-gray-500 peer-placeholder-shown:top-3 peer-focus:-top-5 peer-focus:text-blue-400 peer-focus:text-sm">Nombre</label>
            </div>
            <div className="relative">
              <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} required className="peer w-full p-4 bg-transparent border-b-2 border-gray-700 focus:border-blue-500 outline-none transition text-md" placeholder=" " />
              <label htmlFor="email" className="absolute left-0 -top-5 text-gray-500 text-sm transition-all peer-placeholder-shown:text-lg peer-placeholder-shown:text-gray-500 peer-placeholder-shown:top-3 peer-focus:-top-5 peer-focus:text-blue-400 peer-focus:text-sm">Email</label>
            </div>
            <div className="relative">
              <textarea id="message" name="message" value={formData.message} onChange={handleChange} required rows="5" className="peer w-full p-4 bg-transparent border-b-2 border-gray-700 focus:border-blue-500 outline-none transition resize-none text-md" placeholder=" "></textarea>
              <label htmlFor="message" className="absolute left-0 -top-5 text-gray-500 text-sm transition-all peer-placeholder-shown:text-lg peer-placeholder-shown:text-gray-500 peer-placeholder-shown:top-3 peer-focus:-top-5 peer-focus:text-blue-400 peer-focus:text-sm">Mensaje</label>
            </div>
            <div className="flex items-center justify-between">
              <button type="submit" disabled={status.sending} className="group flex items-center justify-center gap-3 px-8 py-4 bg-blue-600 text-white font-semibold rounded-lg shadow-lg hover:bg-blue-500 transition-all duration-300 transform hover:scale-105 text-md disabled:bg-gray-500 disabled:scale-100 disabled:cursor-wait">
                {status.sending ? (
                  <>
                    <FiLoader className="animate-spin" /> Enviando...
                  </>
                ) : (
                  <>
                    Enviar Mensaje <FiSend />
                  </>
                )}
              </button>
              {status.message && (
                <p className={`text-sm ${status.type === 'success' ? 'text-green-400' : status.type === 'error' ? 'text-red-400' : 'text-gray-400'}`}>
                  {status.message}
                </p>
              )}
            </div>
          </motion.form>
        </div>
      </div>
    </motion.section>
  );
};

export default ContactPage;