// src/pages/AdminMensajes.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
// --> CAMBIO CLAVE: Se importan los iconos desde 'lucide-react' para mantener la consistencia del proyecto.
import { LogOut, Trash2, AlertTriangle } from 'lucide-react'; 
// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from 'framer-motion';

const HeroBackground = () => (
    <div className="absolute inset-0 -z-10 overflow-hidden opacity-50">
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/15 rounded-full blur-3xl animate-blob" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/15 rounded-full blur-3xl animate-blob animation-delay-2000" />
    </div>
);

const AdminMensajes = () => {
  const [mensajes, setMensajes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [messageToDelete, setMessageToDelete] = useState(null);

  useEffect(() => {
    const fetchMensajes = async () => {
      try {
        const response = await fetch('/api_db/get_mensajes.php', { credentials: 'include' });
        if (response.status === 403) {
          navigate('/login');
          return;
        }
        if (!response.ok) throw new Error('La respuesta de la red no fue exitosa');
        const data = await response.json();
        if (data.error) {
            navigate('/login');
        } else {
            setMensajes(data);
        }
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchMensajes();
  }, [navigate]);

  const handleLogout = async () => {
    await fetch('/api_db/logout.php', { credentials: 'include' });
    navigate('/login');
  };

  const handleDeleteClick = (id) => {
    setMessageToDelete(id);
    setShowConfirmModal(true);
  };
  
  const confirmDelete = async () => {
    if (!messageToDelete) return;
    try {
      const response = await fetch('/api_db/delete_mensaje.php', {
        method: 'POST',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: messageToDelete }),
      });
      const result = await response.json();
      if (response.ok) {
        setMensajes(current => current.filter(m => m.id !== messageToDelete));
      } else {
        alert(`Error al eliminar: ${result.message || 'Error desconocido'}`);
      }
    } catch {
      alert('Error de conexión.');
    } finally {
      setShowConfirmModal(false);
      setMessageToDelete(null);
    }
  };

  const cancelDelete = () => {
    setShowConfirmModal(false);
    setMessageToDelete(null);
  };

  if (loading) return <div className="min-h-screen bg-gray-800 flex items-center justify-center text-white">Cargando mensajes...</div>;
  if (error) return <div className="min-h-screen bg-gray-800 flex items-center justify-center text-red-400">Error: {error}</div>;

  return (
    <>
      <div className="relative min-h-screen bg-gradient-to-br from-gray-800 to-gray-700 text-white p-4 sm:p-8">
        <HeroBackground />
        <div className="relative z-10 container mx-auto max-w-7xl">
          <div className="flex flex-col sm:flex-row justify-between items-center mb-8 gap-4">

          <motion.h1
            className="text-3xl sm:text-3xl md:text-3xl font-extrabold text-center mb-6 leading-tight tracking-tighter"
          >
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-teal-300 to-purple-400 animate-gradient-x">
            Bandeja de Entrada
            </span>
          </motion.h1>
            
            <button
              onClick={handleLogout}
              className="group flex items-center justify-center gap-2 px-6 py-3 bg-red-600 hover:bg-red-700 text-white text-sm font-semibold rounded-full shadow-lg transition-all duration-300 transform hover:scale-105 active:scale-95"
            >
              {/* --> CAMBIO CLAVE: Se usa el icono de Lucide. */}
              <LogOut size={16} />
              <span>Cerrar Sesión</span>
            </button>
          </div>
          <div className="overflow-x-auto bg-gray-900/50 rounded-2xl shadow-2xl border border-gray-700/50 backdrop-blur-sm">
            <table className="min-w-full text-sm">
              <thead className="border-b border-gray-700/50">
                <tr>
                  <th className="p-4 text-left font-semibold text-gray-400">ID</th>
                  <th className="p-4 text-left font-semibold text-gray-400">Fecha</th>
                  <th className="p-4 text-left font-semibold text-gray-400">Nombre</th>
                  <th className="p-4 text-left font-semibold text-gray-400">Email</th>
                  <th className="p-4 text-left font-semibold text-gray-400">Mensaje</th>
                  <th className="p-4 text-left font-semibold text-gray-400">Acciones</th>
                </tr>
              </thead>
              <tbody>
                {mensajes.length > 0 ? (
                  mensajes.map((mensaje) => (
                    <tr key={mensaje.id} className="border-b border-gray-800 hover:bg-gray-800/60 transition-colors">
                      <td className="p-4 whitespace-nowrap text-gray-400">{mensaje.id}</td>
                      <td className="p-4 whitespace-nowrap text-gray-400">{mensaje.fecha}</td>
                      <td className="p-4 whitespace-nowrap">{mensaje.nombre}</td>
                      <td className="p-4 whitespace-nowrap"><a href={`mailto:${mensaje.email}`} className="text-blue-400 hover:underline">{mensaje.email}</a></td>
                      <td className="p-4 max-w-xs text-gray-300 whitespace-pre-wrap break-words">{mensaje.mensaje}</td>
                      <td className="p-4">
                        <button onClick={() => handleDeleteClick(mensaje.id)} className="text-red-400 hover:text-red-500 transition-colors">
                          {/* --> CAMBIO CLAVE: Se usa el icono de Lucide. */}
                          <Trash2 size={20} />
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr><td colSpan="6" className="text-center p-8 text-gray-500">Aún no has recibido ningún mensaje.</td></tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {showConfirmModal && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center p-4 z-50 backdrop-blur-sm">
            <motion.div
              initial={{ scale: 0.7, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.7, opacity: 0 }}
              className="bg-gray-800 rounded-2xl shadow-2xl p-8 max-w-sm w-full text-center border border-gray-700"
            >
              {/* --> CAMBIO CLAVE: Se usa el icono de Lucide. */}
              <AlertTriangle className="text-yellow-400 text-5xl mx-auto mb-4" />
              <h2 className="text-2xl font-bold mb-2">Confirmar Eliminación</h2>
              <p className="text-gray-400 mb-8">¿Estás seguro? Esta acción no se puede deshacer.</p>
              <div className="flex justify-center gap-4">
                <button onClick={cancelDelete} className="px-8 py-3 rounded-full bg-gray-600 hover:bg-gray-500 transition-colors font-semibold">Cancelar</button>
                <button onClick={confirmDelete} className="px-8 py-3 rounded-full bg-red-600 hover:bg-red-500 transition-colors font-semibold text-white">Sí, eliminar</button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default AdminMensajes;