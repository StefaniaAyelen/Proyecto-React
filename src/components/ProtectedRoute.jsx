import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({children}) => {
    const { isLoggedIn, loading } = useContext(AuthContext);
    if (loading) {
        // Puedes poner un spinner o un componente de carga aquí
        return <p className="text-center mt-20">Verificando autenticación...</p>; 
    }

    if (!isLoggedIn) {
        return <Navigate to="/login" replace />;
    }

    return children

}

export default ProtectedRoute;