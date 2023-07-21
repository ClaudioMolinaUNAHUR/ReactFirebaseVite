import React, { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { userContext } from '../context/UserProvider'

const Login = () => {

  const [userForm, setUserForm] = useState({email:'claud@mail.com', password: '123123'})
  const {email, password} = userForm

  const {loginUser} = useContext(userContext)
  const navigate = useNavigate()
  
  const handleSubmit = async(e) => {
    e.preventDefault();
    try {
        await loginUser(email, password)
        console.log('usuario logeado');
        navigate('/')
    } catch (error) {
        console.log(error.code)
    }
  }
  const handleChange = (e) => {
    setUserForm((old) => (
        {...old, 
        [e.target.name]: e.target.value }
      ))
  }

  return (
    <>
        Login
        <form onSubmit={handleSubmit}>
            <input
              type="email"
              placeholder='Ingrese email'
              value={email}
              onChange={handleChange} />
            <input
              type="password"
              placeholder='Ingrese password'
              value={password}
              onChange={handleChange} />
              <button type='submit'>Login</button>
        </form>
    </>
  )
}

export default Login