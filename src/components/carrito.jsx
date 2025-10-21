// Muestra los productos que el usuario agrego
const Carrito = ({carrito}) => {
    return(
        <div>
            {carrito.length === 0 
            ? <h3>No hay productos todavia</h3>
            : carrito.map(producto => (
                <p key={producto.id}>{producto.title} - ${producto.price}</p>
            ))                
            }
        </div>
    )
}

export default Carrito;
