// src/pages/HomePage.jsx
import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FiArrowRight, FiMail, FiCode, FiStar } from 'react-icons/fi'; // Añadimos algunos iconos más para posibilidades

// Nuevo Componente: HeroBackground
// Encapsula el fondo animado para una mejor modularidad
const HeroBackground = () => (
  <div className="absolute inset-0 -z-10 overflow-hidden opacity-70">
    {/* Patrón de estrellas/puntos sutil */}
    <div className="absolute inset-0 bg-dot-grid"></div>

    {/* Blobs luminosos, ajustados para un efecto más etéreo */}
    <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/15 rounded-full blur-3xl animate-blob" />
    <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/15 rounded-full blur-3xl animate-blob animation-delay-2000" />
    <div className="absolute top-1/3 right-1/3 w-80 h-80 bg-teal-500/15 rounded-full blur-3xl animate-blob animation-delay-4000" />
    <div className="absolute bottom-1/3 left-1/3 w-72 h-72 bg-rose-500/15 rounded-full blur-3xl animate-blob animation-delay-6000" /> {/* Un blob extra */}
  </div>
);

const HomePage = () => {
  const _MOTION = motion; // reference to satisfy linter unused import
  // Variantes de animación para una entrada escalonada y elegante
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15, // Más lento para un efecto de "florecimiento"
        delayChildren: 0.5,   // Retraso inicial para que el fondo se asiente
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 40, scale: 0.95 }, // Animación de entrada más pronunciada
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: "spring", // Usamos spring para un movimiento más natural
        damping: 15,
        stiffness: 100,
        duration: 0.9,
      },
    },
  };

  return (
    <section className="relative flex flex-col items-center justify-center h-screen bg-gradient-to-br from-gray-800 to-gray-700 text-white overflow-hidden p-4">
      <HeroBackground /> {/* Nuestro componente de fondo */}

      <div className="relative z-10 text-center max-w-4xl w-full mx-auto px-5 md:px-5">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="flex flex-col items-center justify-center"
        >
          {/* Título Principal - Más grande y con un degradado animado */}
          <motion.h1
            variants={itemVariants}
            className="text-4xl sm:text-4xl md:text-4xl font-extrabold mb-4 leading-tight tracking-tighter"
          >
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-teal-300 to-purple-400 animate-gradient-x">
              Imanol Pérez Arteaga
            </span>
          </motion.h1>

          {/* Subtítulo con un toque futurista */}
          <motion.h2
            variants={itemVariants}
            className="text-3xl sm:text-3xl md:text-3xl text-blue-300 font-mono mb-8 opacity-90">
            &lt;Software Engineer / Digital Strategist&gt;
          </motion.h2>

          {/* Eslogan inspirado en visionarios, centrado y con mejor legibilidad */}
          <motion.p
            variants={itemVariants}
            className="text-2xl sm:text-2xl md:text-2xl text-gray-300 mb-12 max-w-2xl mx-auto leading-relaxed"
          >
            Mi trabajo no es solo escribir código, es diseñar el futuro.
            Creando experiencias digitales que redefinen lo posible.
          </motion.p>

          {/* Botones de Acción - Mejorados para un efecto más interactivo */}
          <motion.div
            variants={itemVariants}
            className="flex flex-col sm:flex-row justify-center items-center gap-5"
          >
            <Link
              to="/projects"
              className="group relative flex items-center justify-center gap-2 px-9 py-4 bg-blue-600 hover:bg-blue-700 text-white text-2lg font-semibold rounded-full shadow-xl transition-all duration-300 transform hover:scale-105 active:scale-95 focus:outline-none focus:ring-4 focus:ring-blue-500/50"
            >
              <FiCode className="text-xl" />
              <span>Ver Proyectos</span>
              <FiArrowRight className="transition-transform group-hover:translate-x-1" />
            </Link>
            <Link
              to="/contact"
              className="group relative flex items-center justify-center gap-2 px-9 py-3.5 bg-transparent border-2 border-gray-600 hover:border-blue-500 text-gray-300 hover:text-white text-2lg font-semibold rounded-full transition-all duration-300 transform hover:scale-105 active:scale-95 focus:outline-none focus:ring-4 focus:ring-gray-600/50"
            >
              <FiMail className="text-xl" />
              <span>Contactar</span>
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default HomePage;