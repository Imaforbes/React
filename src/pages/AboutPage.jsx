// src/pages/AboutPage.jsx
import React from 'react';
import { motion } from 'framer-motion';
import { FaHtml5, FaCss3Alt, FaJsSquare, FaPhp, FaLinux, FaReact } from 'react-icons/fa';

const HeroBackground = () => (
  <div className="absolute inset-0 -z-10 overflow-hidden opacity-70">
    <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/15 rounded-full blur-3xl animate-blob" />
    <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/15 rounded-full blur-3xl animate-blob animation-delay-2000" />
    <div className="absolute top-1/3 right-1/3 w-80 h-80 bg-teal-500/15 rounded-full blur-3xl animate-blob animation-delay-4000" />
  </div>
);

const AboutPage = () => {
  const _MOTION = motion; // reference to satisfy linter unused import
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.15, delayChildren: 0.5 } },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 40, scale: 0.95 },
    visible: { opacity: 1, y: 0, scale: 1, transition: { type: "spring", damping: 15, stiffness: 100 } },
  };

  const skills = [
      { name: 'HTML5', icon: <FaHtml5 size={40} /> },
      { name: 'CSS3', icon: <FaCss3Alt size={40} /> },
      { name: 'JavaScript', icon: <FaJsSquare size={40} /> },
      { name: 'React', icon: <FaReact size={40} /> },
      { name: 'PHP', icon: <FaPhp size={40} /> },
      { name: 'Linux', icon: <FaLinux size={40} /> },
  ];

  return (
    <motion.section
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="relative min-h-screen bg-gradient-to-br from-gray-800 to-gray-700 text-white overflow-hidden"
    >
      <HeroBackground />
      {/* Ajuste de padding y max-w para diferentes tamaños de pantalla */}
      <div className="relative z-10 container mx-auto max-w-6xl py-16 px-4 md:py-24 md:px-6"> 
        {/* Disposición responsiva de la sección "sobre-mi" */}
        <section id="sobre-mi" className="grid grid-cols-1 md:grid-cols-5 gap-8 md:gap-12 items-center mb-16 md:mb-32">
          <motion.div
            variants={itemVariants}
            // Imagen ocupa 1 columna en móvil, 2 en pantallas medianas y más grandes
            className="md:col-span-2" 
            whileHover={{ scale: 1.03 }}
            transition={{ type: 'spring', stiffness: 300 }}
          >
            <img src="/img/IMG_0029.JPG" alt="Imanol Pérez Arteaga" className="rounded-lg object-cover w-full h-auto md:h-full shadow-2xl shadow-blue-500/20"/>
          </motion.div>
          
          <motion.div variants={itemVariants} className="md:col-span-3">
            {/* Tamaño del título responsivo */}
            <motion.h1
            variants={itemVariants}
            className="text-4xl sm:text-4xl md:text-4xl font-extrabold mb-4 leading-tight tracking-tighter">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-teal-300 to-purple-400 animate-gradient-x">
            Piensa en código. Crea el futuro.
            </span>
          </motion.h1>
            {/* Tamaño del texto responsivo */}
            <p className="text-base md:text-lg text-gray-300 leading-relaxed mb-4 md:mb-6"> 
              Mi trabajo comienza con una pregunta: ¿Cómo podemos hacer algo maravillosamente genial? No se trata solo de escribir código robusto, sino de ponerle un alma a la tecnología.
            </p>
            <p className="text-base md:text-lg text-gray-300 leading-relaxed mb-6 md:mb-8">
              Mi objetivo es simple: usar mis herramientas para hacer una pequeña mella en el universo, combinando ingeniería, marketing y una insaciable pasión por crear.
            </p>

            {/* Tamaño del botón responsivo */}
            <a
              href="/resources/CvIng_Imanol Perez Arteaga.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center justify-center gap-2 px-7 py-3 md:px-9 md:py-3.5 bg-blue-600 hover:bg-blue-700 text-white text-base md:text-lg font-semibold rounded-full shadow-xl transition-all duration-300 transform hover:scale-105 active:scale-95"
            >
              Descargar CV
            </a>
          </motion.div>
        </section>

        <section id="habilidades" className="mb-16 md:mb-32">
          {/* Tamaño del título responsivo */}
          <motion.h2 variants={itemVariants} className="text-3xl md:text-4xl font-extrabold text-center mb-10 tracking-tighter">
            Mis Habilidades
          </motion.h2>
          {/* Grid responsivo para las habilidades */}
          <motion.div
            variants={containerVariants}
            className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-6 md:gap-8"
          >
            {skills.map((skill, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className="flex flex-col items-center justify-center p-6 bg-gray-900/50 rounded-lg shadow-lg border border-gray-700/50 backdrop-blur-sm hover:border-blue-500/50 transition-all duration-300"
                whileHover={{ scale: 1.05, y: -5 }}
                transition={{ type: 'spring', stiffness: 300 }}
              >
                {/* Tamaño de ícono responsivo */}
                <span className="text-blue-400 mb-3">{React.cloneElement(skill.icon, { size: 32, className: 'md:size-40' })}</span> 
                {/* Tamaño de texto responsivo */}
                <p className="text-sm md:text-lg font-semibold text-gray-200">{skill.name}</p> 
              </motion.div>
            ))}
          </motion.div>
        </section>
      </div>
    </motion.section>
  );
};

export default AboutPage;