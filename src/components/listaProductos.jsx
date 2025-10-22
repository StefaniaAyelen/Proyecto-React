// Muestra los productos disponibles.
import React from "react"
import { useState, useEffect } from "react"

const ListaProductos = ({agregarAlCarrito}) => {
    const [productos, setProductos] = useState([]);
    const [cargando, setCargando] = useState(true);
    const [error, setError] = useState(null);
    useEffect(() => {
        fetch('https://fakestoreapi.com/products')
            .then((respuesta) => respuesta.json())
            .then((datos) => {
                setProductos(datos);
                setCargando(false);
            })
            .catch((error) => {
                setError('Hubo un error al cargar los productos')
                setCargando(false)
            })
    }, []);

    if (cargando) {
        return <p>Cargando productos...</p>
    }
    if (error) {
        return <p>{error}</p>
    }
    return(
        <div>
            <h2 className="text-3xl font-bold text-blue-500 text-center m-5">Productos Disponibles!</h2>
            <div className="flex flex-wrap justify-center gap-8">
        {productos.map((producto) => (
            <div
            key={producto.id}
            className="bg-white border rounded-xl shadow-md hover:shadow-lg transition transform hover:-translate-y-1 p-5 flex flex-col justify-between items-center text-center w-64 min-h-[430px]"
            >
            {/* Imagen */}
            <div className="flex justify-center items-center h-40">
                <img
                src={producto.image}
                alt={producto.title}
                className="h-36 object-contain"
                />
            </div>

            {/* Informacion de los productos */}
            <div className="flex flex-col justify-between flex-1">
                <h3 className="text-base font-semibold mt-2 leading-snug line-clamp-2">
                {producto.title}
                </h3>
                <p className="text-gray-500 text-sm">{producto.category}</p>
                <p className="text-indigo-600 font-bold mt-1">${producto.price}</p>
            </div>

            {/* Boton */}
            <button
                onClick={() => agregarAlCarrito(producto)}
                className="mt-4 bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition w-full font-medium cursor-pointer"
            >
                Agregar al carrito
            </button>
            </div>
        ))}
        </div>
        </div>
    )
}

export default ListaProductos;

