import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import { userContext } from '../context/UserProvider';

const Navbar = () => {
    const {user, singOutUser} = useContext(userContext) 
    const handleLogOut = async(e) =>{
        try {
            await singOutUser()
        } catch (error) {
            console.log(error.code);
            const {code, message} = erroresFirebase(error.code)
            setError(code,{ message })       
        }
    }
  return (
    <>
        {user 
            ?(
                <>
                    <NavLink to="/">Inicio</NavLink>
                    <button onClick={handleLogOut}>Logout</button>
                </> 
            )
            :(
                <>
                    <NavLink to="/login">Login</NavLink> 
                    <NavLink to="/register">Register</NavLink>
                </> 
            ) 
        }  
    </>
  )
};

export default Navbar;