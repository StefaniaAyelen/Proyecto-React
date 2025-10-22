import Main from "../components/Main";

function Inicio({agregarAlCarrito, carrito, vaciarCarrito}) {
    return(
        <Main agregarAlCarrito={agregarAlCarrito} carrito={carrito} vaciarCarrito={vaciarCarrito}></Main>
    )
}

export default Inicio