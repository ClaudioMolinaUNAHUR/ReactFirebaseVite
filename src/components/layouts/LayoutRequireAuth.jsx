import React, { useContext } from 'react'
import { Navigate, Outlet } from 'react-router-dom';
import { userContext } from '../../context/UserProvider';

const LayoutRequireAuth = () => {
    const {user} = useContext(userContext)

    if(!user){
        return <Navigate to="/login"/>
    }

    return (
        <div className='container mx-auto mt-20'>  
            <Outlet/>
        </div>
    )
}

export default LayoutRequireAuth;