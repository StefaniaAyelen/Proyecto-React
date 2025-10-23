import ListaProductos from "./ListaProductos";
import Carrito from "./carrito";

function Main({agregarAlCarrito}) {
    return (
        <main>
        <div>
            <ListaProductos agregarAlCarrito={agregarAlCarrito}></ListaProductos>
        </div>
        </main>
    );
}

export default Main;
