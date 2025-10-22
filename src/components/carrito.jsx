// Muestra los productos que el usuario agrego
const Carrito = ({carrito, vaciarCarrito}) => {
    return(
        <div>
            {carrito.length === 0 
            ? <h3>No hay productos todavia</h3>
            : carrito.map(producto => (
                <p key={producto.id}>{producto.title} - ${producto.price}</p>
            ))}
            <button
                onClick={() => vaciarCarrito()}
                className="mt-4 bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition w-full font-medium cursor-pointer"
            >
                VaciarCarrito
            </button>          
        </div>
    )
}

export default Carrito;
