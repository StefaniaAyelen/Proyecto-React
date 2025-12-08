// Muestra los productos que el usuario agrego
import { useContext } from "react";
import { CarritoContext } from "../context/CarritoContext";

const Carrito = () => {
    const { carrito } = useContext(CarritoContext);
    const { vaciarCarrito } = useContext(CarritoContext);
    const { eliminarDelCarrito } = useContext(CarritoContext);
    const total = carrito.reduce((precios, producto) => precios + Number(producto.price), 0);
    return (
        <div className="max-w-3xl mx-auto bg-white shadow-lg rounded-2xl p-6 mt-8">
        <h2 className="text-2xl font-bold text-indigo-700 mb-6 text-center">
            🛒 Tu carrito de compras
        </h2>
        {carrito.length === 0 ? (
            <p className="text-gray-600 text-center text-lg">
                No hay productos todavía
            </p>
        ) : (
            <>
            <div className="space-y-4 mb-6">
                {carrito.map((producto) => (
                <div
                    key={producto.id}
                    className="flex items-center justify-between bg-gray-50 border border-gray-200 rounded-lg p-4 shadow-sm hover:shadow-md transition"
                >
                    <div className="flex items-center gap-4">
                        <img
                            src={producto.image}
                            alt={producto.title}
                            className="h-16 w-16 object-contain"
                        />
                        <div>
                            <p className="font-medium text-gray-800">{producto.title}</p>
                            <p className="text-sm text-gray-500">${producto.price}</p>
                        </div>
                    </div>
                    <p className="text-indigo-600 font-semibold">
                        ${producto.price}
                    </p>
                    <button
                        onClick={() => eliminarDelCarrito(producto.id)}
                        className=" cursor-pointer bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600 transition"
                        >
                        Eliminar
                    </button>
                </div>
                ))}
            </div>
            <h2>TOTAL: ${total}</h2>
            <button
                onClick={vaciarCarrito}
                className="mt-6 w-full bg-indigo-600 text-white py-3 rounded-lg hover:bg-indigo-700 transition font-semibold cursor-pointer"
            >
                Vaciar carrito
            </button>
            <button
                className="mt-6 w-full bg-green-400 text-white py-3 rounded-lg hover:bg-green-700 transition font-semibold cursor-pointer"
            >
                Comprar
            </button>
            </>
        )}
        </div>
    );
}

export default Carrito;
