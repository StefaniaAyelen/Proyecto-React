import ListaProductos from "./ListaProductos";
import Carrito from "./carrito";

function Main({carrito , agregarAlCarrito, vaciarCarrito}) {
    return (
        <main>
        <div>
            <ListaProductos agregarAlCarrito={agregarAlCarrito}></ListaProductos>
            <Carrito carrito={carrito} vaciarCarrito={vaciarCarrito}></Carrito>
        </div>
        </main>
    );
}

export default Main;
