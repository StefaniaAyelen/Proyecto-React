import { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ConfirmacionModal from '../components/ConfirmacionModal'; 

const AdminPanel = () => {
    
    const MOCKAPI_URL = 'https://692f3b6391e00bafccd700ba.mockapi.io/edupro/products';
    
    // --- ESTADOS ---
    const [productos, setProductos] = useState([]);
    const [cargando, setCargando] = useState(true); 
    const [error, setError] = useState(null);       
    const [modalOpen, setModalOpen] = useState(false);
    const [productoSeleccionado, setProductoSeleccionado] = useState(null); 
    
    const navigate = useNavigate();

    // --- LÓGICA DE LECTURA (GET) ---
    // Use useCallback para que esta función no cambie en cada render
    const obtenerProductos = useCallback(async () => {
        setCargando(true);
        setError(null);
        try {
            const response = await fetch(MOCKAPI_URL);
            if (!response.ok) {
                throw new Error('No se pudo obtener la lista de productos.');
            }
            const data = await response.json();
            setProductos(data);
        } catch (err) {
            setError('Error de conexión. Intenta más tarde.');
            toast.error('Error de red al cargar productos.');
        } finally {
            setCargando(false);
        }
    }, [MOCKAPI_URL]);

    useEffect(() => {
        obtenerProductos();
    }, [obtenerProductos]);

    // --- LÓGICA DE ELIMINACIÓN (DELETE) ---
    const handleEliminar = (producto) => {
        setProductoSeleccionado(producto);
        setModalOpen(true);
    };

    const confirmarEliminacion = async () => {
        if (!productoSeleccionado) return;
        
        try {
            const DELETE_URL = `${MOCKAPI_URL}/${productoSeleccionado.id}`;
            const response = await fetch(DELETE_URL, { method: 'DELETE' });

            if (response.ok) {
                toast.success(`Producto "${productoSeleccionado.title}" eliminado con éxito.`); 
                obtenerProductos(); // Vuelve a cargar la lista para actualizar la UI
            } else {
                toast.error('Error al eliminar: La API devolvió un error.');
            }
        } catch (error) {
            toast.error('Error de red al intentar eliminar el producto.');
        } finally {
            setModalOpen(false); // Cierra el modal
            setProductoSeleccionado(null);
        }
    };

    // --- LÓGICA DE REDIRECCIÓN PARA EDICIÓN ---

    const handleEditar = (productoId) => {
        // Redirige al Formulario de Edición
        navigate(`/admin/editar/${productoId}`); 
    };

    // --- RENDERIZADO CONDICIONAL ---

    if (cargando) return <p className="text-center mt-20">Cargando catálogo...</p>;
    if (error) return <p className="text-center mt-20 text-red-600"> Error: {error}</p>; 
    
    // Si la lista está vacía, mostrar mensaje
    if (productos.length === 0 && !cargando) return (
        <div className="text-center mt-20">
            <p>No hay productos en el catálogo.</p>
            <button onClick={() => navigate('/admin/crear')} className="mt-4 bg-indigo-600 text-white px-4 py-2 rounded-lg">
                Agregar el primer producto
            </button>
        </div>
    );

    return (
        <div className="container mx-auto p-6 max-w-4xl">
            <ToastContainer position="top-right" autoClose={3000} />
            
            <div className="flex justify-between items-center border-b pb-4 mb-6">
                <h1 className="text-3xl font-bold text-gray-800">Administración de Productos</h1>
                <button 
                    onClick={() => navigate('/admin/crear')} // Redirige al Formulario POST
                    className="bg-green-600 text-white px-4 py-2 rounded-lg flex items-center shadow-md hover:bg-green-700 transition"
                >
                    Agregar Producto
                </button>
            </div>
            <div className="space-y-3">
                {productos.map((producto) => (
                    <div
                        key={producto.id}
                        className="bg-white border p-4 shadow-md flex items-center justify-between transition duration-150 hover:shadow-lg rounded-lg"
                    >
                        <div className="flex items-center space-x-4">
                            {/* Imagen */}
                            <img src={producto.image} alt={producto.title} className="h-16 w-16 object-contain rounded" />
                            <div>
                                {/* Nombre y Precio */}
                                <p className="font-semibold text-lg text-black">{producto.title}</p>
                                <p className="text-indigo-600 font-bold">${producto.price}</p>
                            </div>
                        </div>

                        {/* Botones de Acción */}
                        <div className="flex space-x-2">
                            <button 
                                onClick={() => handleEditar(producto.id)}
                                className="bg-gray-800 text-white px-3 py-2 rounded-lg flex items-center text-sm hover:bg-gray-700 transition cursor-pointer"
                            >
                                Editar
                            </button>
                            <button 
                                onClick={() => handleEliminar(producto)} // Abre el modal
                                className="bg-red-600 text-white px-3 py-2 rounded-lg flex items-center text-sm hover:bg-red-700 transition cursor-pointer"
                            >
                                Eliminar
                            </button>
                        </div>
                    </div>
                ))}
            </div>
            {modalOpen && productoSeleccionado && (
                <ConfirmacionModal 
                    nombreProducto={productoSeleccionado.title} 
                    onConfirm={confirmarEliminacion} 
                    onClose={() => setModalOpen(false)} 
                />
            )}

        </div>
    );
};

export default AdminPanel;