import React, {createContext, useState, useEffect} from 'react';

export const AuthContext = createContext();

const AuthContextProvider = (props)=>{

    const [user,setUser] = useState(null);

    useEffect(()=>{
        setUser(JSON.parse(localStorage.getItem("user")));
    },[]);

    const logout = () =>{
        localStorage.removeItem("user");
        setUser(null);
    }

    const login = (userData) =>{
        localStorage.setItem("user",JSON.stringify(userData));
        setUser(null);
    }

    return(
        <AuthContext.Provider value={{user,logout,login}}>
            {props.children}
        </AuthContext.Provider>
    );
}

export default AuthContextProvider;