import { Routes, Route} from 'react-router-dom'
import Navbar from './components/Navbar'
import Home from './routes/Home'
import Login from './routes/Login'
import RequireAuth from './components/RequireAuth'
import Register from './routes/register'
import { useContext } from 'react'
import { userContext } from './context/UserProvider'
import LayoutLog from './components/LayoutLog'

const App =() => {
  const {user} = useContext(userContext)

  if(user === false){
    return <p>Loading...</p>
  }

  return (
    <>
      <Navbar/>
      <h1>APP</h1>    
      <Routes>      
        <Route path='/' element={
            <RequireAuth>
                <Home/>
            </RequireAuth> 
        }/>
        <Route path='/' element={<LayoutLog/>}>          
          <Route path='/login' element={ <Login/> }/>
          <Route path='/register' element={ <Register/> }/>
        </Route>
      </Routes>   
    </> 
  )
}

export default App
