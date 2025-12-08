import React from 'react';

/**
 * Componente Modal de Confirmación
 * * @param {string} nombreProducto - Nombre del producto a eliminar
 * @param {function} onConfirm - Función a ejecutar si el usuario confirma (Ej: ejecutar DELETE)
 * @param {function} onClose - Función para cerrar el modal (Ej: setModalOpen(false))
 */
const ConfirmacionModal = ({ nombreProducto, onConfirm, onClose }) => {
    
    // El modal no se renderiza si no se llama
    if (!nombreProducto) return null;

    return (
        // 1. Overlay Oscuro (Fondo que cubre toda la pantalla)
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 transition-opacity duration-300">
            
            {/* 2. Contenedor del Diálogo (El modal visible) */}
            <div className="bg-white rounded-lg shadow-2xl p-6 w-full max-w-sm transform transition-all duration-300 scale-100">
                
                {/* Encabezado */}
                <h3 className="text-xl font-bold text-red-600 mb-4">
                    ⚠️ Confirmar Eliminación
                </h3>
                
                {/* Mensaje de Advertencia */}
                <p className="text-gray-700 mb-6">
                    Estás a punto de eliminar permanentemente el producto:
                    <span className="font-semibold block mt-1">"{nombreProducto}"</span>.
                    Esta acción no se puede deshacer.
                </p>

                {/* Botones de Acción */}
                <div className="flex justify-end space-x-3">
                    
                    {/* Botón de Cancelar */}
                    <button
                        onClick={onClose}
                        className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-200 rounded-md hover:bg-gray-300 transition cursor-pointer"
                    >
                        Cancelar
                    </button>
                    
                    {/* Botón de Confirmar (Ejecuta la acción DELETE) */}
                    <button
                        onClick={onConfirm}
                        className="px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-md shadow-sm hover:bg-red-700 transition cursor-pointer"
                    >
                        Eliminar Definitivamente
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ConfirmacionModal;