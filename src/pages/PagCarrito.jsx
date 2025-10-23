import Carrito from "../components/carrito"

function pagCarrito({carrito , vaciarCarrito, eliminarDelCarrito}) {
    return(
        <div>
            <Carrito carrito={carrito} vaciarCarrito={vaciarCarrito} eliminarDelCarrito={eliminarDelCarrito}></Carrito>
        </div>
    )
}

export default pagCarrito