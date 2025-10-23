import React, {useState, useEffect} from "react"
import { useParams } from "react-router-dom"
import { Link } from "react-router-dom";

function DetalleProducto() {
    const { id } = useParams()
    const [producto, setProducto] = useState({});
        const [cargando, setCargando] = useState(true);
        const [error, setError] = useState(null);
        useEffect(() => {
            fetch(`https://fakestoreapi.com/products/${id}`)
                .then((respuesta) => respuesta.json())
                .then((datos) => {
                    setProducto(datos);
                    setCargando(false);
                })
                .catch((error) => {
                    setError('Hubo un error al cargar el producto')
                    setCargando(false)
                })
        }, [id]);
    
        if (cargando) {
            return <p>Cargando producto...</p>
        }
        if (error) {
            return <p>{error}</p>
        }
    return(
        <div className="max-w-3xl mx-auto p-8 text-center bg-white shadow-lg rounded-2xl m-5">
            <img src={producto.image} alt={producto.title} className="h-64 mx-auto object-contain mb-4" />
            <h1 className="text-2xl font-bold text-indigo-700 mb-3">{producto.title}</h1>
            <p className="text-gray-600 mb-3">{producto.description}</p>
            <p className="text-xl font-semibold text-green-600 mb-4">${producto.price}</p>

            <Link to={'/'} className="text-indigo-600 hover:underline">
                Volver al inicio
            </Link>
        </div>
    )
}


export default DetalleProducto;