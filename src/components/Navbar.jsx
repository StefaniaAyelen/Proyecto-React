// Estructura visual del Navbar

import { Link } from "react-router-dom";
function Navbar() {
    return (
        <nav className="bg-indigo-700 text-white flex justify-center gap-8 py-3 shadow">
            <Link to="/" className="hover:text-yellow-300 transition font-medium">
                Inicio
            </Link>
            <Link to="/moda" className="hover:text-yellow-300 transition font-medium">
                Moda
            </Link>
            <Link to="/PagCarrito" className="hover:text-yellow-300 transition font-medium">
                Carrito
            </Link>
        </nav>
    );
}

export default Navbar;
