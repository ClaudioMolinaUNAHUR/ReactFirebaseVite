import { Routes, Route} from 'react-router-dom'
import { useContext } from 'react'

import { userContext } from './context/UserProvider'

import Home from './routes/Home'
import Register from './routes/register'
import Login from './routes/Login'
import Perfil from './routes/Perfil'

import LayoutRequireAuth from './components/layouts/LayoutRequireAuth'
import LayoutLog from './components/layouts/LayoutLog'
import LayoutRedirect from './components/layouts/LayoutRedirect'

import Navbar from './components/Navbar'
import NotFound from './routes/NotFound'

const App =() => {
    const {user} = useContext(userContext)

    if(user === false){
        return <p>Loading...</p>
    }

    return ( 
        <>
            <Navbar/>  
            <Routes>
                <Route path='/' element={<LayoutRequireAuth/>}>
                    <Route index element={<Home />}/>
                    <Route path="/perfil" element={<Perfil />}/>
                </Route>
                
                <Route path='/' element={<LayoutLog/>}>          
                    <Route path='/login' element={ <Login/> }/>
                    <Route path='/register' element={ <Register/> }/>
                </Route>

                <Route path='/:nanoid' element={<LayoutRedirect/>}>
                    <Route index element={<NotFound/>}/>
                </Route>

            </Routes>   
        </> 
    )
}

export default App
