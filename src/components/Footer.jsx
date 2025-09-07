// src/components/Footer.jsx
import React from 'react';
import { Github, Linkedin, Twitter } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    { href: "https://github.com/Imaforbes", icon: Github, label: "GitHub" },
    { href: "https://www.linkedin.com/in/imanol-perez-arteaga-016894161/", icon: Linkedin, label: "LinkedIn" },
    { href: "https://twitter.com/imaforbes", icon: Twitter, label: "Twitter" },
  ];

  return (
    // --> MEJORA: Padding responsivo (py-8 en móvil, py-12 en escritorio).
    <footer className="py-8 md:py-12 bg-black text-gray-400 text-center">
      {/* --> MEJORA: Padding responsivo (px-4 en móvil, px-6 en escritorio). */}
      <div className="container mx-auto px-4 md:px-6 max-w-4xl">
        <div className="mb-8">
          <div className="flex justify-center space-x-6">
            {socialLinks.map(social => (
              <a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={social.label}
                className="p-3 bg-gray-800 rounded-full text-gray-400 hover:text-white hover:bg-blue-600 
                           transition-all duration-300 transform hover:scale-110"
              >
                <social.icon size={24} />
              </a>
            ))}
          </div>
        </div>
        <p className="text-gray-500 text-sm">
          © {currentYear} Imanol Pérez Arteaga. Todos los derechos reservados.
        </p>
      </div>
    </footer>
  );
};

export default Footer;