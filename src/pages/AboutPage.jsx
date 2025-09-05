// src/pages/AboutPage.jsx
import React from 'react';
import { motion } from 'framer-motion';
import { FaHtml5, FaCss3Alt, FaJsSquare, FaPhp, FaLinux, FaReact } from 'react-icons/fa';

const AboutPage = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.2, duration: 0.5 } },
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -30 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.7, ease: 'easeOut' } },
  };

  const skills = [
    { name: 'HTML5', icon: <FaHtml5 size={40} className="transition-transform duration-300 group-hover:scale-110" /> },
    { name: 'CSS3', icon: <FaCss3Alt size={40} className="transition-transform duration-300 group-hover:scale-110" /> },
    { name: 'JavaScript', icon: <FaJsSquare size={40} className="transition-transform duration-300 group-hover:scale-110" /> },
    { name: 'React', icon: <FaReact size={40} className="transition-transform duration-300 group-hover:scale-110" /> },
    { name: 'PHP', icon: <FaPhp size={40} className="transition-transform duration-300 group-hover:scale-110" /> },
    { name: 'Linux', icon: <FaLinux size={40} className="transition-transform duration-300 group-hover:scale-110" /> },
  ];

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="min-h-screen bg-gray-800 to-gray-700 text-white"
    >
      <div className="container mx-auto max-w-6xl py-24 px-6">
        <section id="sobre-mi" className="grid grid-cols-1 md:grid-cols-5 gap-12 items-center mb-32">
          <motion.div
            variants={itemVariants}
            className="md:col-span-2"
            whileHover={{ scale: 1.03 }}
            transition={{ type: 'spring', stiffness: 300 }}
          >
            <img
              src="/img/IMG_0029.JPG"
              alt="Imanol Pérez Arteaga"
              className="rounded-lg object-cover w-full h-full shadow-2xl shadow-blue-500/20"
            />
          </motion.div>
          
          <motion.div variants={itemVariants} className="md:col-span-3">
            <h1 className="text-3xl md:text-3xl font-bold mb-6 tracking-tighter">
              Piensa en código. Crea el futuro.
            </h1>
            <p className="text-md text-gray-400 leading-relaxed mb-6">
            Mi trabajo comienza con una pregunta simple: ¿Cómo podemos hacer algo maravillosamente genial? No se trata solo de escribir código robusto y escalable, sino de ponerle un alma a la tecnología. Me obsesiona el 'porqué' de cada proyecto, porque la única forma de hacer un trabajo increíble es amar lo que haces.
            </p>
            <p className="text-md text-gray-400 leading-relaxed mb-8">
            Creo que las reglas y las carreras son solo constructos. Lo que realmente importa es la chispa, esa voz interior que te empuja a crear, a explorar y a desafiar el 'statu quo'. Mi camino atraviesa la ingeniería, el marketing y el impacto social, no por estrategia, sino por pasión. Mi objetivo es simple: usar mis herramientas para hacer una pequeña mella en el universo.
            </p>
            <a
              href="/resources/CvIng Imanol Pérez Arteaga .pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block px-8 py-3 bg-blue-600 text-white text-md font-semibold rounded-lg shadow-lg hover:bg-blue-500 transition-all duration-300 transform hover:scale-105"
            >
              Descargar CV
            </a>
          </motion.div>
        </section>

        <section id="habilidades">
          <motion.h2 variants={itemVariants} className="text-3xl md:text-3xl font-bold text-center mb-16 tracking-tighter">
            Mi Stack Tecnológico
          </motion.h2>
          <motion.div variants={containerVariants} className="flex flex-wrap justify-center items-center gap-10 md:gap-16">
            {skills.map((skill, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                whileHover={{ y: -10 }}
                className="group flex flex-col items-center gap-4 cursor-pointer"
                title={skill.name}
              >
                <div className="p-4 bg-gray-800/50 rounded-full transition-all duration-300 group-hover:bg-blue-500/20">
                    <div className="text-gray-500 group-hover:text-blue-400 transition-colors duration-300">
                        {skill.icon}
                    </div>
                </div>
                <span className="text-base text-gray-400 font-semibold group-hover:text-white transition-colors duration-300">
                  {skill.name}
                </span>
              </motion.div>
            ))}
          </motion.div>
        </section>
      </div>
    </motion.div>
  );
};

export default AboutPage;