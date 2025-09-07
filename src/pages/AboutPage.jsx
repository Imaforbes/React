// src/pages/AboutPage.jsx
import React from 'react';
import { motion } from 'framer-motion';
import { FaHtml5, FaCss3Alt, FaJsSquare, FaPhp, FaLinux, FaReact } from 'react-icons/fa';

// --> MODIFICACIÓN: Se importa el componente de fondo animado para mantener la consistencia visual.
const HeroBackground = () => (
  <div className="absolute inset-0 -z-10 overflow-hidden opacity-70">
    <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/15 rounded-full blur-3xl animate-blob" />
    <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/15 rounded-full blur-3xl animate-blob animation-delay-2000" />
    <div className="absolute top-1/3 right-1/3 w-80 h-80 bg-teal-500/15 rounded-full blur-3xl animate-blob animation-delay-4000" />
  </div>
);

const AboutPage = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.15, delayChildren: 0.5 } },
  };

  // --> MODIFICACIÓN: Se ajusta la animación para usar "spring", que da un efecto más dinámico y natural, como en HomePage.
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
    // --> MODIFICACIÓN: Estructura principal de la página.
    // 'relative' para contener el fondo.
    // 'min-h-screen' para asegurar que el fondo cubra toda la pantalla.
    // 'bg-gradient-to-br...' para el color de fondo oscuro y consistente.
    <motion.section
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="relative min-h-screen bg-gradient-to-br from-gray-800 to-gray-700 text-white overflow-hidden"
    >
      <HeroBackground />
      <div className="relative z-10 container mx-auto max-w-6xl py-24 px-6">
        <section id="sobre-mi" className="grid grid-cols-1 md:grid-cols-5 gap-12 items-center mb-32">
          {/* ... El código de la imagen no cambia ... */}
          <motion.div
            variants={itemVariants}
            className="md:col-span-2"
            whileHover={{ scale: 1.03 }}
            transition={{ type: 'spring', stiffness: 300 }}
          >
            <img src="/img/IMG_0029.JPG" alt="Imanol Pérez Arteaga" className="rounded-lg object-cover w-full h-full shadow-2xl shadow-blue-500/20"/>
          </motion.div>
          
          <motion.div variants={itemVariants} className="md:col-span-3">
            {/* --> MODIFICACIÓN: Estilo de tipografía del título.
                'font-extrabold' y 'tracking-tighter' le dan el aspecto moderno y audaz de HomePage. */}
            <h1 className="text-4xl font-extrabold mb-6 tracking-tighter">
              Piensa en código. Crea el futuro.
            </h1>
            <p className="text-lg text-gray-300 leading-relaxed mb-6">
              Mi trabajo comienza con una pregunta: ¿Cómo podemos hacer algo maravillosamente genial? No se trata solo de escribir código robusto, sino de ponerle un alma a la tecnología.
            </p>
            <p className="text-lg text-gray-300 leading-relaxed mb-8">
              Mi objetivo es simple: usar mis herramientas para hacer una pequeña mella en el universo, combinando ingeniería, marketing y una insaciable pasión por crear.
            </p>

            {/* --> MODIFICACIÓN CLAVE: Estilo del botón principal.
                'px-9 py-3.5': Padding para hacerlo más grande y visible.
                'bg-blue-600 hover:bg-blue-700': Colores primarios de acción.
                'rounded-full': La forma redondeada característica de HomePage.
                'shadow-xl': Sombra para darle profundidad.
                'transform hover:scale-105 active:scale-95': Animación interactiva al pasar el mouse y hacer clic. */}
            <a
              href="/resources/CvIng_Imanol Perez Arteaga.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center justify-center gap-2 px-9 py-3.5 bg-blue-600 hover:bg-blue-700 text-white text-lg font-semibold rounded-full shadow-xl transition-all duration-300 transform hover:scale-105 active:scale-95"
            >
              Descargar CV
            </a>
          </motion.div>
        </section>
        {/* ... El resto del componente sigue la misma lógica de estilos ... */}
      </div>
    </motion.section>
  );
};

export default AboutPage;