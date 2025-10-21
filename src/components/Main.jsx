import ListaProductos from "./ListaProductos";
import Carrito from "./carrito";

function Main({carrito , agregarAlCarrito}) {
    return (
        <main>
        <div>
            <ListaProductos agregarAlCarrito={agregarAlCarrito}></ListaProductos>
            <Carrito carrito={carrito}></Carrito>
        </div>
        </main>
    );
}

export default Main;
