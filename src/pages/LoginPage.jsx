// src/pages/LoginPage.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';

const HeroBackground = () => (
    <div className="absolute inset-0 -z-10 overflow-hidden opacity-70">
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/15 rounded-full blur-3xl animate-blob" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/15 rounded-full blur-3xl animate-blob animation-delay-2000" />
      <div className="absolute top-1/3 right-1/3 w-80 h-80 bg-teal-500/15 rounded-full blur-3xl animate-blob animation-delay-4000" />
    </div>
);

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  // --- LÓGICA AÑADIDA ---
  // Esta función ahora envía los datos de login al backend.
  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const response = await fetch('/api_db/login.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
        credentials: 'include' // Importante para manejar cookies de sesión
      });
      const result = await response.json();
      if (response.ok) {
        navigate('/admin/mensajes'); // Si el login es exitoso, te redirige al panel
      } else {
        setError(result.message || 'Error al iniciar sesión.');
      }
    } catch {
      setError('Error de conexión. Inténtalo de nuevo.');
    }
  };
  // --- FIN DE LA LÓGICA AÑADIDA ---

  return (
    <div className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-800 to-gray-700 text-white p-6">
      <HeroBackground />
      <motion.div
        initial={{ opacity: 0, y: 40, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ type: "spring", damping: 15, stiffness: 100 }}
        className="relative z-10 bg-gray-900/50 p-8 rounded-2xl shadow-2xl w-full max-w-sm border border-gray-700/50 backdrop-blur-sm"
      >

<motion.h1
            className="text-3xl sm:text-3xl md:text-3xl font-extrabold text-center mb-6 leading-tight tracking-tighter"
          >
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-teal-300 to-purple-400 animate-gradient-x">
            Admin Login
            </span>
          </motion.h1>

        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label htmlFor="username" className="block text-sm font-medium text-gray-400 mb-2">Usuario</label>
            <input
              type="text" id="username" value={username} onChange={(e) => setUsername(e.target.value)} required
              className="w-full p-3 bg-gray-700/50 border-2 border-gray-600 rounded-full focus:ring-blue-500 focus:border-blue-500 transition"
            />
          </div>
          <div>
            <label htmlFor="password"  className="block text-sm font-medium text-gray-400 mb-2">Contraseña</label>
            <input
              type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} required
              className="w-full p-3 bg-gray-700/50 border-2 border-gray-600 rounded-full focus:ring-blue-500 focus:border-blue-500 transition"
            />
          </div>
          {error && <p className="text-red-400 text-sm text-center pt-2">{error}</p>}
          <button
            type="submit"
            className="w-full px-9 py-3.5 bg-blue-600 hover:bg-blue-700 text-white text-lg font-semibold rounded-full shadow-xl transition-all duration-300 transform hover:scale-105 active:scale-95"
          >
            Entrar
          </button>
        </form>
      </motion.div>
    </div>
  );
};

export default LoginPage;