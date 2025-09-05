// src/pages/ProjectsPage.jsx
import React from 'react';
import { motion } from 'framer-motion';
import { FiGithub, FiExternalLink } from 'react-icons/fi';

// --- Componente ProjectCard ---
const ProjectCard = ({ project }) => {
  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
  };

  return (
    <motion.div
      variants={cardVariants}
      className="group relative overflow-hidden rounded-lg shadow-lg bg-gray-800 border border-gray-700/50 transition-all duration-300 hover:shadow-blue-500/30 hover:border-blue-500/50"
    
    >
      <img
        src={project.image}
        alt={project.title}
        className="w-full h-60 object-cover transition-transform duration-500 ease-in-out group-hover:scale-105"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/60 to-transparent" />
      <div className="absolute inset-0 p-6 flex flex-col justify-end">
        <h3 className="text-2xl font-bold text-white mb-2">{project.title}</h3>
        <div className="flex flex-wrap gap-2 mb-4">
          {project.tags.map(tag => (
            <span key={tag} className="px-3 py-1 bg-blue-500/20 text-blue-300 text-sm font-semibold rounded-full">
              {tag}
            </span>
          ))}
        </div>
        
        {/* MODIFICACIÓN CLAVE: Transición suave para la descripción */}
        <div className="overflow-hidden transition-all duration-500 ease-in-out max-h-0 group-hover:max-h-40">
          <p className="text-gray-300 text-base mb-4 pt-2">
            {project.description}
          </p>
        </div>
        <div className="flex items-center gap-4">
          <a href={project.repo} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-blue-400 transition-colors duration-300" aria-label="Ver repositorio en GitHub">
            <FiGithub size={24} />
          </a>
          {project.link !== '#' && (
            <a href={project.link} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-blue-400 transition-colors duration-300" aria-label="Ver demo del proyecto">
              <FiExternalLink size={24} />
            </a>
          )}
        </div>
      </div>
    </motion.div>
  );
};


// --- Página de Proyectos ---
const ProjectsPage = () => {
  // ... (El array de `projects` no necesita cambios)
  const projects = [
    { id: 1, title: 'Sistema de Gestión Hotelera', description: 'Aplicación de escritorio para la administración de huéspedes, habitaciones y actividades de un hotel, enfocada en la eficiencia del backend.', image: '/img/Proy1.png', link: '#', repo: 'https://github.com/Imaforbes/sistema_hotel', tags: ['Java', 'MySQL', 'Desktop App'] },
    { id: 2, title: 'Grinch Animado con CSS', description: 'Demostración de animaciones complejas y manipulación del DOM utilizando únicamente HTML y CSS puro.', image: '/img/Proy2.png', link: '#', repo: 'https://github.com/Imaforbes/Yo-no-soy-grinch', tags: ['HTML', 'CSS', 'Animation'] },
    { id: 3, title: 'Portafolio Freelancer', description: 'Plataforma web full-stack que sirve como un portafolio profesional, integrando un diseño limpio con funcionalidades de backend.', image: '/img/Proy3.png', link: '#', repo: 'https://github.com/Imaforbes/Freelancer-Project', tags: ['FullStack', 'PHP', 'JavaScript'] },
    { id: 4, title: 'Landing Page Responsiva', description: 'Diseño y maquetación de una landing page moderna con un enfoque "mobile-first", asegurando una experiencia de usuario perfecta en todos los dispositivos.', image: '/img/Proy4.png', link: '#', repo: 'https://github.com/Imaforbes/Responsive-website', tags: ['HTML', 'CSS', 'Responsive Design'] },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.15, duration: 0.5 } },
  };

  return (
    <motion.section
      id="proyectos"
      className="bg-gray-900 text-white min-h-screen"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <div className="container mx-auto max-w-7xl py-24 px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-3xl font-bold tracking-tighter mb-4">
            Proyectos Destacados
          </h2>
          <p className="text-md text-gray-500 max-w-2xl mx-auto">
            Una selección de mi trabajo. Cada proyecto representa un reto único y una oportunidad para aprender y crecer.
          </p>
        </div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8"
          variants={containerVariants}
        >
          {projects.map(project => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </motion.div>
      </div>
    </motion.section>
  );
};

export default ProjectsPage;