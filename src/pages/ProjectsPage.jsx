// src/pages/ProjectsPage.jsx
import React from 'react';
import { motion } from 'framer-motion';
import { FiGithub, FiExternalLink } from 'react-icons/fi';

const HeroBackground = () => (
  <div className="absolute inset-0 -z-10 overflow-hidden opacity-70">
    <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/15 rounded-full blur-3xl animate-blob" />
    <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/15 rounded-full blur-3xl animate-blob animation-delay-2000" />
    <div className="absolute top-1/3 right-1/3 w-80 h-80 bg-teal-500/15 rounded-full blur-3xl animate-blob animation-delay-4000" />
  </div>
);

const ProjectCard = ({ project }) => {
  const cardVariants = {
    hidden: { opacity: 0, y: 40, scale: 0.95 },
    visible: { opacity: 1, y: 0, scale: 1, transition: { type: "spring", damping: 15, stiffness: 100 } },
  };

  return (
    <motion.div
      variants={cardVariants}
      className="group relative overflow-hidden rounded-lg shadow-lg bg-gray-800 border border-gray-700/50 transition-all duration-300 hover:shadow-blue-500/30 hover:border-blue-500/50"
    >
      <img src={project.image} alt={project.title} className="w-full h-52 sm:h-60 object-cover transition-transform duration-500 ease-in-out group-hover:scale-105" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/60 to-transparent" />
      {/* Ajuste de padding de la tarjeta y tamaño de texto */}
      <div className="absolute inset-0 p-4 sm:p-6 flex flex-col justify-end"> 
        <h3 className="text-xl sm:text-2xl font-bold text-white mb-2">{project.title}</h3> 
        <div className="flex flex-wrap gap-2 mb-4">
          {project.tags.map(tag => <span key={tag} className="px-2 py-0.5 sm:px-3 sm:py-1 bg-blue-500/20 text-blue-300 text-xs sm:text-sm font-semibold rounded-full">{tag}</span>)}
        </div>
        <div className="overflow-hidden transition-all duration-500 ease-in-out max-h-0 group-hover:max-h-40">
          <p className="text-sm sm:text-base text-gray-300 mb-4 pt-2">{project.description}</p>
        </div>
        <div className="flex items-center gap-4">
          <a href={project.repo} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-blue-400 transition-colors duration-300"><FiGithub size={20} /></a> {/* Íconos más pequeños en móvil */}
          {project.link !== '#' && <a href={project.link} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-blue-400 transition-colors duration-300"><FiExternalLink size={20} /></a>}
        </div>
      </div>
    </motion.div>
  );
};

const ProjectsPage = () => {
  const _MOTION = motion; // reference to satisfy linter unused import
  const projects = [
    { id: 1, title: 'Sistema de Gestión Hotelera', description: 'Aplicación de escritorio para la administración de huéspedes, habitaciones y actividades de un hotel.', image: '/img/Proy1.png', link: '#', repo: 'https://github.com/Imaforbes/sistema_hotel', tags: ['Java', 'MySQL'] },
    { id: 2, title: 'Grinch Animado con CSS', description: 'Demostración de animaciones complejas y manipulación del DOM utilizando únicamente HTML y CSS.', image: '/img/Proy2.png', link: '#', repo: 'https://github.com/Imaforbes/Yo-no-soy-grinch', tags: ['HTML', 'CSS'] },
    { id: 3, title: 'Portafolio Freelancer', description: 'Plataforma web full-stack que sirve como un portafolio profesional y sistema de contacto.', image: '/img/Proy3.png', link: '#', repo: 'https://github.com/Imaforbes/Freelancer-Project', tags: ['FullStack', 'PHP'] },
    { id: 4, title: 'Landing Page Responsiva', description: 'Diseño y maquetación de una landing page moderna con un enfoque "mobile-first".', image: '/img/Proy4.png', link: '#', repo: 'https://github.com/Imaforbes/Responsive-website', tags: ['HTML', 'CSS', 'Responsive'] },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.15, delayChildren: 0.5 } },
  };

  return (
    <motion.section
      id="proyectos"
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
            Proyectos Destacados
            </span>
          </motion.h1>
          
          {/* Tamaño del texto responsivo */}
          <motion.p
            variants={{ hidden: { opacity: 0, y: 40 }, visible: { opacity: 1, y: 0 } }}
            className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed" 
          >
            Una selección de mi trabajo. Cada proyecto representa un reto único y una oportunidad para aprender y crecer.
          </motion.p>
        </div>
        {/* Grid responsivo para los proyectos */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 gap-8" 
          variants={containerVariants}
        >
          {projects.map(project => <ProjectCard key={project.id} project={project} />)}
        </motion.div>
      </div>
    </motion.section>
  );
};

export default ProjectsPage;