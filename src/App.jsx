import { useState } from 'react'
import './App.css'
import Header from './components/Header';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Inicio from './pages/Inicio';
import Moda from './pages/Moda';
import PagCarrito from './pages/PagCarrito';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import DetalleProducto from './pages/DetalleProducto';

function App() {
  const [carrito, setCarrito] = useState([]);

  function agregarAlCarrito(producto) {
    setCarrito([...carrito, producto])
  }

  function vaciarCarrito() {
    setCarrito([])
  }

  function eliminarDelCarrito(id) {
    const nuevoCarrito = carrito.filter(producto => producto.id !== id);
    setCarrito(nuevoCarrito);
  }


  return (
    <div className="min-h-screen bg-gray-50 text-gray-800 font-sans flex flex-col">
      <BrowserRouter>
        <Header carrito={carrito} />
        <Navbar />
          <div className='flex-1'>
            <Routes>
              <Route path="/" element={<Inicio agregarAlCarrito={agregarAlCarrito} />} />
              <Route path="/Moda" element={<Moda agregarAlCarrito={agregarAlCarrito} />} />
              <Route path='/pagCarrito' element={<PagCarrito carrito={carrito} vaciarCarrito={vaciarCarrito} eliminarDelCarrito={eliminarDelCarrito}/>}/>
              <Route path="/producto/:id" element={<DetalleProducto />} />
          </Routes>
          </div>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App
