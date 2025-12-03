import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
// Asegúrate de que las rutas de importación sean correctas
import { AuthContext } from '../context/AuthContext'; 

const Login = () => {
    //Estados para manejar los campos del formulario
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const [cargando, setCargando] = useState(false);

    //Obtener la función de login del Contexto
    const { login, isLoggedIn } = useContext(AuthContext);

    // Hook para la navegación programática (redirigir al usuario)
    const navigate = useNavigate();

    // Función que se ejecuta al enviar el formulario
    const handleLoginSubmit = (e) => {
        e.preventDefault(); // Previene la recarga de la página

        // Validación Simulada
        if (email === '' || password === '') {
            setError('Todos los campos son obligatorios.');
            return;
        }

        // Simular un inicio de sesión exitoso (ejemplo: si la contraseña es "123")
        if (email === 'test@edu.com' && password === '123') {
            setCargando(true);
            setError(null);

            // Simular un tiempo de espera de la API
            setTimeout(() => {
                login(); // Llama a la función del AuthContext que actualiza el estado y localStorage
                setCargando(false);
                
                // Redirigir al usuario a la página de inicio
                navigate('/'); 

            }, 1000);
        } else {
            setError('Credenciales incorrectas. Intenta con test@edu.com y 123');
        }
    };
    
    // Si el usuario ya está logueado, lo redirijo
    if (isLoggedIn) {
        navigate('/'); 
    }


    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="w-full max-w-md">
                <div className="bg-white shadow-xl rounded-xl p-8 space-y-6">
                    <h1 className="text-3xl font-extrabold text-center text-indigo-600">
                        Iniciar Sesión
                    </h1>
                    <p>Email: test@edu.com | Contraseña: 123
                    </p>

                    <form onSubmit={handleLoginSubmit} className="space-y-6">
                        {/* Campo Email */}
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                                Correo Electrónico
                            </label>
                            <input
                                id="email"
                                name="email"
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                aria-label="Correo electrónico" // Requerimiento de Accesibilidad
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            />
                        </div>

                        {/* Campo Contraseña */}
                        <div>
                            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                                Contraseña
                            </label>
                            <input
                                id="password"
                                name="password"
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                aria-label="Contraseña" // Requerimiento de Accesibilidad
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            />
                        </div>

                        {/* Mensaje de Error */}
                        {error && (
                            <div className="text-red-600 text-sm font-medium p-2 bg-red-50 rounded-md">
                                {error}
                            </div>
                        )}
                        
                        {/* Botón de Enviar */}
                        <button
                            type="submit"
                            disabled={cargando}
                            className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white ${
                                cargando ? 'bg-indigo-400 cursor-not-allowed' : 'bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
                            }`}
                        >
                            {cargando ? 'Cargando...' : 'Iniciar Sesión'}
                        </button>

                    </form>
                </div>
            </div>
        </div>
    );
};

export default Login;