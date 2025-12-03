import { createContext, useState, useEffect } from "react";
export const AuthContext = createContext();

function AuthProvider({ children }) {
    
    const [isLoggedIn, setIsLoggedIn] = useState(false)
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const userGuardado = localStorage.getItem("isLoggedIn");
        if (userGuardado) {
        setIsLoggedIn(JSON.parse(userGuardado));
        }
        setLoading(false);
    }, []);

    function login(){
        setIsLoggedIn(true);
        localStorage.setItem("isLoggedIn", JSON.stringify(true));
    }

    function logout(){
        setIsLoggedIn(false)
        localStorage.removeItem("isLoggedIn")
    }

    return (
    <AuthContext.Provider value={{isLoggedIn, login, logout, loading}}>
      {children}
    </AuthContext.Provider>
  );
}

export default AuthProvider;