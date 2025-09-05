import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const AdminMensajes = () => {
  const [mensajes, setMensajes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMensajes = async () => {
      try {
        const response = await fetch('/api_db/get_mensajes.php');
        if (response.status === 403) {
            // Si no estamos autorizados, nos redirige al login
            navigate('/login');
            return;
        }
        if (!response.ok) throw new Error('Error al cargar mensajes');
        
        const data = await response.json();
        setMensajes(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchMensajes();
  }, [navigate]);

  const handleLogout = async () => {
    await fetch('/api_db/logout.php');
    navigate('/login');
  };

  if (loading) return <p className="text-center text-white p-8">Cargando mensajes...</p>;
  if (error) return <p className="text-center text-red-500 p-8">Error: {error}</p>;

  return (
    <div className="min-h-screen bg-gray-900 text-white p-4 sm:p-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Bandeja de Entrada</h1>
        <button 
          onClick={handleLogout}
          className="bg-red-600 hover:bg-red-500 text-white font-bold py-2 px-4 rounded-lg transition-colors"
        >
          Cerrar Sesión
        </button>
      </div>
      <div className="overflow-x-auto rounded-lg shadow-lg">
        {/* El resto de tu tabla de mensajes va aquí... (código sin cambios) */}
        <table className="min-w-full bg-gray-800">
           {/* ... tu thead ... */}
           <thead className="bg-gray-700">
            <tr className="border-b border-gray-600">
              <th className="p-4 text-left font-semibold">Fecha</th>
              <th className="p-4 text-left font-semibold">Nombre</th>
              <th className="p-4 text-left font-semibold">Email</th>
              <th className="p-4 text-left font-semibold">Mensaje</th>
            </tr>
          </thead>
           <tbody>
            {mensajes.length > 0 ? (
              mensajes.map((mensaje) => (
                <tr key={mensaje.id} className="border-b border-gray-700 hover:bg-gray-600 transition-colors">
                  <td className="p-4 whitespace-nowrap">{mensaje.fecha}</td>
                  <td className="p-4 whitespace-nowrap">{mensaje.nombre}</td>
                  <td className="p-4 whitespace-nowrap">
                    <a href={`mailto:${mensaje.email}`} className="text-blue-400 hover:underline">
                      {mensaje.email}
                    </a>
                  </td>
                  <td className="p-4 max-w-md whitespace-pre-wrap break-words">{mensaje.mensaje}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="text-center p-8 text-gray-500">
                  Aún no has recibido ningún mensaje.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminMensajes;