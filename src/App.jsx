import { useState } from 'react'
import './App.css'
import Header from './components/Header';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Inicio from './pages/Inicio';
import Moda from './pages/Moda';
import PagCarrito from './pages/PagCarrito';
import { Routes, Route, BrowserRouter } from 'react-router-dom';

function App() {
  const [carrito, setCarrito] = useState([]);

  function agregarAlCarrito(producto) {
    setCarrito([...carrito, producto])
  }

  function vaciarCarrito() {
    setCarrito([])
  }

  return (
    <div className="min-h-screen bg-gray-50 text-gray-800 font-sans flex flex-col">
      <BrowserRouter>
        <Header />
        <Navbar />
          <div>
            <Routes>
              <Route path="/" element={<Inicio agregarAlCarrito={agregarAlCarrito} carrito={carrito} vaciarCarrito={vaciarCarrito} />} />
              <Route path="/Moda" element={<Moda />} />
              <Route path='/pagCarrito' element={<PagCarrito/>}/>
          </Routes>
          </div>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App
