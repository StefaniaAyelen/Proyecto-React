import { createContext, useState, useEffect } from "react";
export const AuthContext = createContext();

const ADMIN_EMAIL = 'admin@edu.com';
function AuthProvider({ children }) {
    
    const [currentUser, setCurrentUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const emailGuardado = localStorage.getItem("userEmail");
        if (emailGuardado) {
            setCurrentUser(JSON.parse(emailGuardado));
        }
        setLoading(false);
    }, []);

    function login(email){
        setCurrentUser(email);
        localStorage.setItem("userEmail", JSON.stringify(email));
    }

    function logout(){
        setCurrentUser(null);
        localStorage.removeItem("userEmail")
    }

    const isLoggedIn = !!currentUser;
    const isAdmin = currentUser === ADMIN_EMAIL;

    return (
    <AuthContext.Provider value={{isLoggedIn, isAdmin , currentUser, login, logout, loading}}>
      {children}
    </AuthContext.Provider>
  );
}

export default AuthProvider;