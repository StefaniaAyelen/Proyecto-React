import { useState } from 'react'
import './App.css'
import Header from './components/Header';
import Navbar from './components/Navbar';
import Main from './components/Main';
import Footer from './components/Footer';

function App() {
  const [carrito, setCarrito] = useState([]);

  function agregarAlCarrito(producto) {
    setCarrito([...carrito, producto])
  }

  return (
    <div className="min-h-screen bg-gray-50 text-gray-800 font-sans flex flex-col">
      <Header />
      <Navbar />
      <Main agregarAlCarrito={agregarAlCarrito} carrito={carrito} />
      <Footer />
    </div>
  );
}

export default App
