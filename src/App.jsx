// src/App.jsx
import React from 'react';
// Se elimina la importación de 'Router' porque ahora está en main.jsx
import { Routes, Route, Link } from 'react-router-dom';

// Importa tus componentes de layout
import Header from './components/Header';
import Footer from './components/Footer';
import ScrollToTopButton from './components/ScrollToTopButton';

// Importa tus páginas
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import ProjectsPage from './pages/ProjectsPage';
import ContactPage from './pages/ContactPage';
import LoginPage from './pages/LoginPage';
import AdminMensajes from './pages/AdminMensajes';

import './i18n'; // Configuración de internacionalización

function App() {
  // Se ha eliminado el componente <Router> que envolvía todo
  return (
    <div className="flex flex-col min-h-screen bg-gray-50 text-gray-900">
      <Header />
      <main className="flex-grow pt-[96px]">
        <Routes>
          {/* Rutas Públicas del Portafolio */}
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/projects" element={<ProjectsPage />} />
          <Route path="/contact" element={<ContactPage />} />
          
          {/* Rutas del Sistema de Admin */}
          <Route path="/login" element={<LoginPage />} />
          <Route path="/admin/mensajes" element={<AdminMensajes />} />

          {/* Ruta para 404 - Página no encontrada */}
          <Route path="*" element={
            <div className="flex flex-col items-center justify-center min-h-[calc(100vh-96px-128px)] bg-gray-100 text-gray-800 text-center px-4">
              <h2 className="text-4xl md:text-5xl font-bold mb-4">404 - Página no encontrada</h2>
              <p className="text-lg md:text-xl">Lo sentimos, la página que buscas no existe.</p>
              <Link to="/" className="mt-8 px-8 py-4 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 transition-colors duration-300">
                Volver a Inicio
              </Link>
            </div>
          } />
        </Routes>
      </main>
      <ScrollToTopButton />
      <Footer />
    </div>
  );
}

export default App;