// Estructura visual del Header
function Header({carrito}) {
    return (
        <header className="bg-indigo-600 text-white py-4 px-8 shadow-md flex justify-between items-center">
        <h1 className="text-2xl font-bold tracking-wide">Mi Tienda</h1>
        <span className="bg-white text-indigo-600 px-3 py-1 rounded-full font-semibold">
            🛒 {carrito.length}
        </span>
        </header>
    );
}

export default Header;
