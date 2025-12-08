import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const ProductoForm = () => {
    
    const MOCKAPI_URL = 'https://692f3b6391e00bafccd700ba.mockapi.io/edupro/products';

    // Detección de Modo: Creación (POST) o Edición (PUT)
    const { id: productoId } = useParams(); 
    const isEditing = !!productoId; 
    
    const navigate = useNavigate();

    // --- ESTADOS ---
    const [formData, setFormData] = useState({
        title: '',
        price: '',
        description: '',
        category: '',
        image: ''
    });
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);
    const [initialLoad, setInitialLoad] = useState(isEditing); // Para el modo edición

    // LÓGICA DE CARGA DE DATOS (Solo en Modo Edición) ---
    useEffect(() => {
        if (!isEditing) return; // Solo se ejecuta si estamos editando
        
        const fetchProducto = async () => {
            try {
                const response = await fetch(`${MOCKAPI_URL}/${productoId}`);
                if (!response.ok) throw new Error('Producto no encontrado.');
                
                const data = await response.json();
                
                setFormData({
                    title: data.title || '',
                    price: data.price || '',
                    description: data.description || '',
                    category: data.category || '',
                    image: data.image || ''
                });

            } catch (error) {
                toast.error(`Error al cargar los datos: ${error.message}`);
                navigate('/admin/productos');
            } finally {
                setInitialLoad(false);
            }
        };

        fetchProducto();
    }, [isEditing, productoId, navigate, MOCKAPI_URL]);

    const handleChange = (e) => {
        const { title, value } = e.target;
        setFormData(prev => ({ ...prev, [title]: value }));
        setErrors(prev => ({ ...prev, [title]: null }));
    };

    const validateForm = () => {
        const newErrors = {};
        
        if (!formData.title.trim()) {
            newErrors.title = 'El nombre del producto es obligatorio.';
        }

        const priceValue = parseFloat(formData.price);
        if (isNaN(priceValue) || priceValue <= 0) {
            newErrors.price = 'El precio debe ser un número mayor a 0.';
        }

        if (formData.description.trim().length < 10) {
            newErrors.description = 'La descripción debe tener al menos 10 caracteres.';
        }
        
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    // ---MANEJADOR DE ENVÍO (POST / PUT) ---
    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validateForm()) {
            toast.error("Por favor, corrige los errores del formulario.");
            return;
        }

        setLoading(true);
        const method = isEditing ? 'PUT' : 'POST';
        const url = isEditing ? `${MOCKAPI_URL}/${productoId}` : MOCKAPI_URL;
        
        try {
            const response = await fetch(url, {
                method: method,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });

            if (!response.ok) throw new Error(`Error en la API: ${response.statusText}`);

            const action = isEditing ? 'editado' : 'creado';
            toast.success(`Producto ${formData.title} ${action} con éxito.`);
            navigate('/admin/productos'); // Redirigir de vuelta al panel
            
        } catch (error) {
            toast.error(`Error al ${isEditing ? 'editar' : 'crear'} el producto. Intenta más tarde.`);
        } finally {
            setLoading(false);
        }
    };
    
    if (initialLoad) return <p className="text-center mt-20">Cargando datos del producto...</p>;

    return (
        <div className="container mx-auto p-6 max-w-2xl">
            <h1 className="text-3xl font-bold mb-6 text-gray-800">
                {isEditing ? `Editar Producto: ${formData.title}` : 'Crear Nuevo Producto'}
            </h1>
            
            <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-xl space-y-4">
                
                {/* Campo Nombre */}
                <div>
                    <label htmlFor="title" className="block text-sm font-medium text-gray-700">Nombre:</label>
                    <input
                        type="text"
                        title="title"
                        value={formData.title}
                        onChange={handleChange}
                        className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                    />
                    {errors.title && <p className="text-red-500 text-xs mt-1">{errors.title}</p>}
                </div>

                {/* Campo Precio */}
                <div>
                    <label htmlFor="price" className="block text-sm font-medium text-gray-700">Precio:</label>
                    <input
                        type="number"
                        title="price"
                        value={formData.price}
                        onChange={handleChange}
                        step="0.01"
                        className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                    />
                    {errors.price && <p className="text-red-500 text-xs mt-1">{errors.price}</p>}
                </div>
                
                {/* Campo Descripción */}
                <div>
                    <label htmlFor="description" className="block text-sm font-medium text-gray-700">Descripción:</label>
                    <textarea
                        title="description"
                        value={formData.description}
                        onChange={handleChange}
                        rows="4"
                        className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                    />
                    {errors.description && <p className="text-red-500 text-xs mt-1">{errors.description}</p>}
                </div>
                
                {/*  Campo Categoría */}
                <div>
                    <label htmlFor="category" className="block text-sm font-medium text-gray-700">Categoría:</label>
                    <input
                        type="text"
                        title="category" // <--- ¡Nombre del campo!
                        value={formData.category}
                        onChange={handleChange}
                        className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                    />
                    {/* Si deseas validación para categoría, agrega aquí: {errors.category && <p>...</p>} */}
                </div>
                
                <div>
                    <label htmlFor="image" className="block text-sm font-medium text-gray-700">URL de Imagen:</label>
                    <input
                        type="text"
                        title="image" // <--- ¡Nombre del campo!
                        value={formData.image}
                        onChange={handleChange}
                        className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                    />
                </div>
                <div className="flex justify-end space-x-3 pt-4">
                    <button 
                        type="button" 
                        onClick={() => navigate('/admin/productos')} 
                        className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300"
                    >
                        Cancelar
                    </button>
                    
                    <button 
                        type="submit" 
                        disabled={loading}
                        className={`px-4 py-2 rounded-md text-white font-semibold transition 
                            ${loading ? 'bg-indigo-400 cursor-wait' : 'bg-indigo-600 hover:bg-indigo-700'}`}
                    >
                        {loading 
                            ? 'Guardando...' 
                            : isEditing ? 'Guardar Cambios' : 'Crear Producto'}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default ProductoForm;