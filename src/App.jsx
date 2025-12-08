import CarritoProvider from './context/CarritoContext';
import './App.css'
import Header from './components/Header';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Inicio from './pages/Inicio';
import Moda from './pages/Moda';
import Login from './pages/Login'
import PagCarrito from './pages/PagCarrito';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import DetalleProducto from './pages/DetalleProducto';
import ProtectedRoute from './components/ProtectedRoute';
import AuthProvider from './context/AuthContext';
import AdminPanel from './components/AdminPanel';
import ProductoForm from './components/ProductoForm';
import AdminProtectedRoute from './components/AdminProtectedRoute';

function App() {

  return (
    <div className="min-h-screen bg-gray-50 text-gray-800 font-sans flex flex-col">
      <AuthProvider>
        <CarritoProvider>
          <BrowserRouter>
            <Header/>
            <Navbar />
              <div className='flex-1'>
                <Routes>
                  <Route path="/login" element={<Login/>} />
                  <Route path="/" element={<Inicio/>} />
                  <Route path="/Moda" element={<Moda/>} />
                  <Route path='/pagCarrito' element={<ProtectedRoute> <PagCarrito/> </ProtectedRoute> }/>
                  <Route path="/producto/:id" element={<DetalleProducto/>} />
                  <Route path="/admin/productos" element={<AdminProtectedRoute> <AdminPanel /> </AdminProtectedRoute>}/>
                  <Route path="/admin/crear" element={<AdminProtectedRoute> <ProductoForm /> </AdminProtectedRoute>}/>
                  <Route path="/admin/editar/:id" element={<AdminProtectedRoute> <ProductoForm /> </AdminProtectedRoute>}/>
              </Routes>
              </div>
            <Footer />
          </BrowserRouter>
        </CarritoProvider>
      </AuthProvider>
    </div>
  );
}

export default App
