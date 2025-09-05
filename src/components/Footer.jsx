// src/components/Footer.jsx
import React from 'react';
import { Github, Linkedin, Twitter } from 'lucide-react';

const Footer = () => {
  // El año no necesita ser un estado. Se calcula una vez y listo.
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    { href: "https://github.com/Imaforbes", icon: Github, label: "GitHub" },
    { href: "https://www.linkedin.com/in/imanol-perez-arteaga-016894161/", icon: Linkedin, label: "LinkedIn" },
    { href: "https://twitter.com/imaforbes", icon: Twitter, label: "Twitter" },
  ];

  return (
    <footer className="py-12 bg-black text-gray-400 text-center">
      <div className="container mx-auto px-6 max-w-4xl">
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