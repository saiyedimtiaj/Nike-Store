/* eslint-disable react/prop-types */
import { createContext, useEffect, useState } from "react";
import { GoogleAuthProvider, createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut } from "firebase/auth";
import Auth from "../Firebase/Firebase.config";



export const AuthContext = createContext([])

const AuthProvider = ({children}) => {
    const [user,setUser] = useState([])

    const provider = new GoogleAuthProvider();

    const signin = (email,password) => {
        return signInWithEmailAndPassword(Auth,email,password)
    }

    const register = (email,password) => {
        return createUserWithEmailAndPassword(Auth,email,password)
    }

    const logout = () => {
        return signOut(Auth)
    }

    const google = () => {
        return signInWithPopup(Auth,provider)
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
        signin,register,user,logout,google
    }


    return (
       <AuthContext.Provider value={userInfo}>
        {children}
       </AuthContext.Provider>
    );
};

export default AuthProvider;