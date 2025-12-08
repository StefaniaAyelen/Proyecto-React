import { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext'; 

const AdminProtectedRoute = ({ children }) => {
    const { isLoggedIn, isAdmin, loading } = useContext(AuthContext); 

    if (loading) {
        return <p className="text-center mt-20">Verificando credenciales de administrador...</p>; 
    }
    
    if (!isLoggedIn || !isAdmin) {
        return <Navigate to="/" replace />; 
    }

    return children;
};

export default AdminProtectedRoute;