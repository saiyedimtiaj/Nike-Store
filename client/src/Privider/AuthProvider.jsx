/* eslint-disable react/prop-types */
import { createContext, useEffect, useState } from "react";
import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut } from "firebase/auth";
import Auth from "../Firebase/Firebase.config";



export const AuthContext = createContext([])

const AuthProvider = ({children}) => {
    const [user,setUser] = useState([])

    const signin = (email,password) => {
        return signInWithEmailAndPassword(Auth,email,password)
    }

    const register = (email,password) => {
        return createUserWithEmailAndPassword(Auth,email,password)
    }

    const logout = () => {
        return signOut(Auth)
    }

    useEffect(()=>{
        const subscribe = onAuthStateChanged(Auth,(currentUser)=>{
            console.log(currentUser);
            setUser(currentUser)
        })
        return () => {
            return subscribe
        }
    },[])

    const userInfo = {
        signin,register,user,logout
    }


    return (
       <AuthContext.Provider value={userInfo}>
        {children}
       </AuthContext.Provider>
    );
};

export default AuthProvider;