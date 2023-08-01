import React, { useContext } from 'react';
import { Link, NavLink } from 'react-router-dom';
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
    const classButtonB = "text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center mr-3 md:mr-1 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
    const classButtonR = "text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-4 py-2 text-center mr-3 md:mr-1 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800"
  return (
    <nav className='bg-white dark:bg-gray-900 fixed w-full z-20 top-0 left-0 border-b border-gray-200 dark:border-gray-600'>
        <div className='max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4'>
            <Link to="/" className='flex items-center'>
                <span className='self-center text-2xl font-semibold whitespace-nowrap dark:text-white'>UrlShort App</span>
            </Link>        
            <div className='flex md:order-2'>
                {user 
                    ?(
                        <>
                            <NavLink to="/" className={classButtonB}>Inicio</NavLink>
                            <button onClick={handleLogOut} className={classButtonR}>Logout</button>
                        </> 
                    )
                    :(
                        <>
                            <NavLink to="/login" className={classButtonB}>Login</NavLink> 
                            <NavLink to="/register" className={classButtonR}>Register</NavLink>
                        </> 
                    ) 
                } 
            </div>
        </div>
    </nav>
  )
};

export default Navbar;