import {createContext, useEffect, useState} from "react";
import {API_URL} from "../config";


export const AuthenticationContext = createContext(undefined);

const AuthenticationProvider = ({children}) => {
    const [credentials, setCredentials] = useState(
        JSON.parse(localStorage.getItem("credentials")) || null
    );
    const[valid, setValid] = useState(false);

    /**
     * Almacena en el localstorage las credenciales, para usarlas en siguiente
     * sesiones por parte de un usuario.
     */
    useEffect(() => {
        try{
            localStorage.setItem("credentials", JSON.stringify(credentials));
        } catch (error) {
            localStorage.removeItem("credentials");
            console.log(error)
        }
    }, [credentials]);


    /**
     * Verifíca si un usuario es realmente administrador, para lo que
     * hace uso de las credenciales.
     * @returns {boolean} true si es administrador, falso otro caso.
     */
    function isValidUser() {
        if(!credentials) {
            return false;
        }
        let endPoint = `${API_URL}user`
        let options = {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer " + credentials.token,
            },
        }
        fetch(endPoint, options).then((response) => response.json()).then((res) => {
            if(!res.err) {
                if (res.admin){
                    setValid(true);
                }
                else{
                    setCredentials(null);
                    setValid(false);
                }
            }
        });
    }

    /**
     * Función para verificar el inicio de sesión de un usuario, verifica si el
     * correo y contraseña son de un ususario registrado en la plataforma.
     * @param email correo electrónico del usuario
     * @param password contraseña del usuario
     */
    const login = (email, password) => {
        let endPoint = `${API_URL}login`
        let options = {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({
                email: email,
                password: password,
            }),
        }
        fetch(endPoint, options).then((response) => response.json()).then((res) => {
            if (!!res.token) {
                setCredentials(res);
            } else {
                setCredentials(null);
            }
        });
    }

    /**
     * Elimina las credenciales de la maquina, por lo que es necesario volver
     * a iniciar sesión.
     */
    const logout = () => {
        setCredentials(null);
        setValid(false);
    }

    /**
     * Verífica que el ususario este logueado, para esto se valida que
     * existan credenciales y sean de un usuario administrador.
     * @returns {boolean}
     */
    const logged = () => {
        isValidUser()
        return !!credentials && valid;
    };

    const contextValue = {
        credentials,
        login,
        isValidUser,
        logout,
        logged,
    }

    return (
        <AuthenticationContext.Provider value={contextValue}>
            {children}
        </AuthenticationContext.Provider>
    )
}

export  default AuthenticationProvider;