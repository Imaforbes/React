// src/components/ProjectCard.jsx
import React from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, Github } from 'lucide-react'; // Iconos para los botones

const ProjectCard = ({ project }) => {
  const itemVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
  };

  return (
    <motion.div
      variants={itemVariants}
      className="group bg-gray-800 rounded-xl shadow-lg overflow-hidden border border-gray-700/50 
                 hover:shadow-blue-500/20 hover:border-blue-500/50 transition-all duration-300 transform hover:-translate-y-2"
    >
      <div className="overflow-hidden">
        <img
          src={project.image}
          alt={project.title}
          className="w-full h-56 object-cover object-center transition-transform duration-500 ease-in-out group-hover:scale-105"
        />
      </div>
      <div className="p-6 md:p-8">
        <h3 className="text-xl md:text-2xl font-bold text-white mb-2">{project.title}</h3>
        <div className="flex flex-wrap gap-2 mb-4">
            {project.tags.map(tag => (
              <span key={tag} className="px-3 py-1 bg-blue-500/20 text-blue-300 text-sm font-semibold rounded-full">
                {tag}
              </span>
            ))}
        </div>
        <p className="text-gray-400 text-base mb-6 leading-relaxed">{project.description}</p>
        <div className="flex flex-wrap items-center gap-4 mt-auto">
          {project.link && project.link !== '#' && (
            <a
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2 bg-blue-600 text-white font-semibold rounded-lg shadow-md
                         hover:bg-blue-500 transition-colors duration-300"
            >
              <ExternalLink size={18} /> Ver Proyecto
            </a>
          )}
          {project.repo && (
            <a
              href={project.repo}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2 bg-gray-700 text-gray-300 font-semibold rounded-lg
                         hover:bg-gray-600 hover:text-white transition-colors duration-300"
            >
              <Github size={18} /> Ver Código
            </a>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default ProjectCard;