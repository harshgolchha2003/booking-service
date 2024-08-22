import axios from "axios";
import { useEffect } from "react";
import { createContext } from "react";
import { useState } from "react";
export const userContext=createContext({});

export const UserContextProvider=({children})=>{
    const [user,setUser]=useState(null);
    useEffect(()=>{
        if(!user)
        {
            axios.get('/profile');
        }
    },[]);
    return( 
    <userContext.Provider value={{user,setUser}}>
        {children}
    </userContext.Provider>
    );
}