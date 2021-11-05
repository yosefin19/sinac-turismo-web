import {createContext, useEffect, useState} from "react";


export const AuthenticationContext = createContext(undefined);

const AuthenticationProvider = ({children}) => {
    const [user, setUser] = useState(
        JSON.parse(localStorage.getItem("user")) || null
    );

    useEffect(() => {
        try{
            localStorage.setItem("user", JSON.stringify(user));
        } catch (error) {
            localStorage.removeItem("user");
            console.log(error)
        }
    }, [user])


    // hay que traer el correo y contrasena y usar getuser con token y ver si es admin, sino f
    //habria que hacer un useEffect para que si el token funca si hacer lo del usuario.
    const login = (email, password) => {
        setUser({id: 1, name:"bj"});
    }

    const logout = () => {
        setUser(null);
    }

    const logged = () => {
        return !!user
    };

    const contextValue = {
        user,
        login,
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