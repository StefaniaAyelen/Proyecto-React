// Estructura visual del Navbar
function Navbar() {
    return (
        <nav className="bg-indigo-700 text-white flex justify-center gap-8 py-3 shadow">
        <a href="#" className="hover:text-yellow-300 transition font-medium">
            Inicio
        </a>
        <a href="#" className="hover:text-yellow-300 transition font-medium">
            Moda
        </a>
        <a href="#" className="hover:text-yellow-300 transition font-medium">
            Carrito
        </a>
        </nav>
    );
}

export default Navbar;
