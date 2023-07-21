import React, { createContext, useEffect, useState } from 'react'
import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { auth } from '../firebase'

export const userContext = createContext()

const UserProvider = ({children}) => {

    const [user, setUser] = useState(false)

    useEffect(()=>{
        //chequea que exista un usuario logeado en firebase, estructura en la docu de firebase web
        const unsuscribe = onAuthStateChanged(auth, (user) =>{
            console.log(user);
            if(user){
                const {email, photoURL, displayName, uid} = user
                setUser({email, photoURL, displayName, uid})
            }else{
                setUser(null)
            }
        })
        return () => unsuscribe()
    },[])

    const registerUser = (email, password) => (createUserWithEmailAndPassword(auth, email, password))
    const loginUser = (email, password) => (signInWithEmailAndPassword(auth, email, password))
    const singOutUser = () => signOut(auth)

    return (
        <userContext.Provider 
        value={{user, setUser, registerUser, loginUser, singOutUser}}
        >
            {children}
        </userContext.Provider>
    )
}

export default UserProvider