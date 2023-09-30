import { async } from '@firebase/util'
import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import { Outlet, useParams } from 'react-router-dom'
import { useFirestore } from '../../hooks/useFirestore'
import Title from '../title'

const LayoutRedirect = () => {
    const {searchData} = useFirestore()
    const {nanoid} = useParams()
    const [loading, setLoading] = useState(true)

    useEffect(async()=>{
        const dataOrigin = await searchData(nanoid)
        if(dataOrigin.exists()){
            window.location.href = dataOrigin.data().origin
        }else{
            setLoading(false)
        }
    }, [])

    if(loading) return <Title text={"Waiting redirect..."}/>

    return (
        <div className='container mx-auto'>
            <Outlet/>
        </div>
    )
}

export default LayoutRedirect