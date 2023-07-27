import React from 'react'
import { Outlet } from 'react-router-dom'


const LayoutLog = () => {
  return (
    <div className='w-96 mx-auto mt-10'>  
        <Outlet/>
    </div>
  )
}

export default LayoutLog