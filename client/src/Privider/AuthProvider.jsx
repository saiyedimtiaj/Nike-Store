/* eslint-disable react/prop-types */
import { createContext, useEffect, useState } from "react";
import { GoogleAuthProvider, createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from "firebase/auth";
import Auth from "../Firebase/Firebase.config";
import useAxiosPublic from "../hooks/UseAxiosPublic";



export const AuthContext = createContext([])

const AuthProvider = ({children}) => {
    const [user,setUser] = useState([])
    const axiosPub = useAxiosPublic()
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [loading,setLoading] = useState(true)

    const provider = new GoogleAuthProvider();

    const signin = (email,password) => {
        setLoading(true)
        return signInWithEmailAndPassword(Auth,email,password)
    }

    const register = (email,password) => {
        setLoading(true)
        return createUserWithEmailAndPassword(Auth,email,password)
    }

    const logout = () => {
        setLoading(true)
        return signOut(Auth)
    }

    const google = () => {
        return signInWithPopup(Auth,provider)
    }

    const profile = (name,profileImage) => {
        setLoading(true)
        return updateProfile(Auth.currentUser,{
            displayName: name,
            photoURL: profileImage
        })
    }

    useEffect(()=>{
        const subscribe = onAuthStateChanged(Auth,(currentUser)=>{
            console.log(currentUser);
            setUser(currentUser)
            if(currentUser){
                setLoading(false)
                axiosPub.post('/jwt',{email:currentUser?.email})
        .then(res=>{
          console.log(res.data);
        })
        .catch(err=>{
          console.log(err);
        })
            }
        })
        return () => {
            return subscribe
        }
    },[axiosPub])

    const userInfo = {
        signin,register,user,logout,google,profile,loading,isMenuOpen, setIsMenuOpen
    }


    return (
       <AuthContext.Provider value={userInfo}>
        {children}
       </AuthContext.Provider>
    );
};

export default AuthProvider;