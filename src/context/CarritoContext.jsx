import { createContext, useState, useEffect } from "react";
export const CarritoContext = createContext();

function CarritoProvider({ children }) {
    
    const [carrito, setCarrito] = useState([]);

     // Lee el carrito guardado cuando carga la app
    useEffect(() => {
        const carritoGuardado = localStorage.getItem("carrito");
        if (carritoGuardado) {
        setCarrito(JSON.parse(carritoGuardado));
        }
    }, []);

    
    function agregarAlCarrito(producto) {
        const nuevoCarrito = [...carrito, producto];
        setCarrito(nuevoCarrito);
        localStorage.setItem("carrito", JSON.stringify(nuevoCarrito));
    }
    
    function vaciarCarrito() {
        setCarrito([])
        localStorage.setItem("carrito", JSON.stringify([]));
    }
    
    function eliminarDelCarrito(id) {
        const nuevoCarrito = carrito.filter(producto => producto.id !== id);
        setCarrito(nuevoCarrito);
        localStorage.setItem("carrito", JSON.stringify(nuevoCarrito));
    }

    return (
    <CarritoContext.Provider value={{ carrito, agregarAlCarrito, eliminarDelCarrito, vaciarCarrito }}>
      {children}
    </CarritoContext.Provider>
  );
}

export default CarritoProvider;