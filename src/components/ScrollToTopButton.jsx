// src/components/ScrollToTopButton.jsx
import React, { useState, useEffect } from 'react';
import { ChevronUp } from 'lucide-react';
import { motion } from 'framer-motion';

const ScrollToTopButton = () => {
  const _MOTION = motion; // reference to satisfy linter unused import
  const [isVisible, setIsVisible] = useState(false);

  const toggleVisibility = () => {
    if (window.scrollY > 300) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  useEffect(() => {
    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  return (
    <motion.button
      onClick={scrollToTop}
      // --> MEJORA: Posición responsiva (más cerca del borde en móvil, más alejado en escritorio).
      className={`fixed bottom-4 right-4 md:bottom-8 md:right-8 w-12 h-12 md:w-14 md:h-14 rounded-full flex items-center justify-center
                 bg-white text-black cursor-pointer z-50 shadow-lg`}
      aria-label="Volver arriba"
      initial={{ scale: 0, opacity: 0 }}
      animate={isVisible ? { scale: 1, opacity: 1 } : { scale: 0, opacity: 0 }}
      transition={{ type: 'spring', stiffness: 260, damping: 20 }}
      whileHover={{ scale: 1.1, rotate: -5 }}
      whileTap={{ scale: 0.9 }}
    >
      <ChevronUp size={28} />
    </motion.button>
  );
};

export default ScrollToTopButton;