// src/components/Header.jsx
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';

const Header = () => {
  const { t, i18n } = useTranslation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [currentLanguage, setCurrentLanguage] = useState('es');
  const location = useLocation();

  const handleLanguageChange = (lang) => {
    i18n.changeLanguage(lang);
  };

  const handleNavLinkClick = () => {
    setIsMenuOpen(false);
  };

  const menuVariants = {
    hidden: { opacity: 0, x: "100%" },
    visible: { opacity: 1, x: "0%", transition: { type: "tween", duration: 0.3 } },
    exit: { opacity: 0, x: "100%", transition: { type: "tween", duration: 0.3 } }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <header className="fixed top-0 w-full z-50 transition-all duration-300 bg-white/80 shadow-md backdrop-blur-md py-6 md:py-7">
      <nav className="flex justify-between items-center max-w-7xl mx-auto px-6">
        {/* Logo */}
        <Link to="/" className="text-gray-900 text-3xl md:text-3xl lg:text-3xl font-extrabold tracking-tight hover:text-blue-600 transition-colors duration-300">
          IMAFORBES
        </Link>

        {/* Botón de menú para móvil */}
        <div className="md:hidden">
          <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-gray-800 focus:outline-none">
            {isMenuOpen ? <X size={32} /> : <Menu size={32} />}
          </button>
        </div>


        {/* Navegación principal (Escritorio) */}
        <div className="hidden md:flex items-center space-x-8">
          <Link
            to="/"
            className={`text-gray-700 text-3lg hover:text-blue-600 transition-colors duration-300 px-4 py-2 rounded-md
                       ${location.pathname === '/' ? 'font-bold text-blue-600 bg-blue-50' : ''}`}
          >
            Inicio
          </Link>
          <Link
            to="/about"
            className={`text-gray-700 text-3lg hover:text-blue-600 transition-colors duration-300 px-4 py-2 rounded-md
                       ${location.pathname === '/about' ? 'font-bold text-blue-600 bg-blue-50' : ''}`}
          >
            Sobre mí
          </Link>
          <Link
            to="/projects"
            className={`text-gray-700 text-3lg hover:text-blue-600 transition-colors duration-300 px-4 py-2 rounded-md
                       ${location.pathname === '/projects' ? 'font-bold text-blue-600 bg-blue-50' : ''}`}
          >
            Proyectos
          </Link>
          <Link
            to="/contact"
            className={`text-gray-700 text-3lg hover:text-blue-600 transition-colors duration-300 px-4 py-2 rounded-md
                       ${location.pathname === '/contact' ? 'font-bold text-blue-600 bg-blue-50' : ''}`}
          >
            Contacto
          </Link>

          {/* --- AQUÍ LA MEJORA: Botones de Idioma con nuevo diseño --- */}
          <div className="flex items-center p-1 bg-gray-200 rounded-full ml-4">
            <button
              onClick={() => handleLanguageChange('es')}
              className={`px-3 py-1 text-sm font-semibold rounded-full transition-colors duration-300 ${i18n.language.startsWith('es') ? 'bg-white text-gray-800 shadow' : 'bg-transparent text-gray-500 hover:text-gray-800'}`}
              aria-label="Cambiar a español"
            >
              ES
            </button>
            <button
              onClick={() => handleLanguageChange('en')}
              className={`px-3 py-1 text-sm font-semibold rounded-full transition-colors duration-300 ${i18n.language.startsWith('en') ? 'bg-white text-gray-800 shadow' : 'bg-transparent text-gray-500 hover:text-gray-800'}`}
              aria-label="Cambiar a inglés"
            >
              EN
            </button>
          </div>
        </div>
      </nav>


      {/* Menú móvil */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.nav
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={menuVariants}
            className="md:hidden bg-white/95 absolute top-full left-0 w-full p-4 flex flex-col items-center space-y-4 shadow-lg z-40"
          >
            <Link to="/" className="block..." onClick={handleNavLinkClick}>{t('nav.home')}</Link>
            <Link to="/about" className="block..." onClick={handleNavLinkClick}>{t('nav.about')}</Link>
            <Link to="/projects" className="block..." onClick={handleNavLinkClick}>{t('nav.projects')}</Link>
            <Link to="/contact" className="block..." onClick={handleNavLinkClick}>{t('nav.contact')}</Link>
            
            <motion.div variants={itemVariants} className="flex items-center p-1 bg-gray-200 rounded-full mt-4">
              <button
                onClick={() => handleLanguageChange('es')}
                className={`px-4 py-2 ... ${i18n.language.startsWith('es') ? 'bg-white ...' : '...'}`}
              >
                ES
              </button>
              <button
                onClick={() => handleLanguagege('en')}
                className={`px-4 py-2 ... ${i18n.language.startsWith('en') ? 'bg-white ...' : '...'}`}
              >
                EN
              </button>
            </motion.div>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;