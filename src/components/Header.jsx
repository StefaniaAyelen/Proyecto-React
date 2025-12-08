// Estructura visual del Header
import { useContext } from "react";
import { CarritoContext } from "../context/CarritoContext";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

function Header() {

    const { carrito } = useContext(CarritoContext);
    const cantidadTotal = carrito.length;
    const navigate = useNavigate();
    const { isLoggedIn, logout } = useContext(AuthContext);
    const { vaciarCarrito } = useContext(CarritoContext);
    const handleAuthClick = () => {
        if (isLoggedIn) {
            // Si está logueado, al hacer clic, hace LOGOUT
            vaciarCarrito()
            logout();
        } else {
            // Si NO está logueado, al hacer clic, va a LOGIN
            navigate('/login');
        }
    };
    
    return (
        <header className="bg-indigo-600 text-white py-4 px-8 shadow-md flex justify-between items-center">
        <h1 className="text-2xl font-bold tracking-wide">Urbanita Store</h1>
        <span className="bg-white text-indigo-600 px-3 py-1 rounded-full font-semibold">
            🛒 {cantidadTotal}
        </span>
        <button 
                    onClick={handleAuthClick}
                    className="bg-white text-black bg-opacity-20 hover:bg-opacity-30 px-3 py-1 rounded-md font-medium transition"
                >
                    {isLoggedIn ? 'Cerrar Sesión' : 'Iniciar Sesión'}
                </button>
        </header>
    );
}

export default Header;
