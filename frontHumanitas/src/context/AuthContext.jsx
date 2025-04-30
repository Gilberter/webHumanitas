import React, {createContext, useState, useContext} from "react";

const AuthContext = createContext();

export const AuthProvider = ({children = null}) => {
    if (!children) {
        console.log("AuthProvider no recibió ningún children.");
    }

    const [user, setUser] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    const login = async (username, password) => {
        try {
            // Cargar el archivo JSON de usuarios
            const response = await fetch("user.json");
            const usersObject = await response.json();

            const usersNestedArray = Object.values(usersObject); // Convertir el objeto a un array
    
            console.log(username, password);
            
            const users = usersNestedArray.flat()
            console.log(users);
            const foundUser = users.find(user => user.username === username && user.password === password); // Buscar el usuario
            
            if (foundUser) {
                setUser(foundUser); // Guardar el usuario autenticado
                setIsAuthenticated(true); // Cambiar el estado de autenticación
                return true;
            } else {
                console.error("Usuario o contraseña incorrectos.");
                return false;
            }
        } catch (err) {
            console.log("Error al autenticar:", err);

        }
    };
    

    const logout = () => {
        setUser(null);
        setIsAuthenticated(false);
    };

    return (
        <AuthContext.Provider value={{ user, isAuthenticated, login, logout }}>
            {children}
        </AuthContext.Provider>
    );

}
export const useAuth = () => useContext(AuthContext);