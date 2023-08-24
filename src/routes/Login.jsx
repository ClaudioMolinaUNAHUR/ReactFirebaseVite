import React, { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import FormError from '../components/FormError'
import FormInput from '../components/FormInput'
import { userContext } from '../context/UserProvider'
import { erroresFirebase } from '../utils/erroresFirebase'
import { formValidate } from '../utils/formValidate'
import Title from '../components/title'
import GenericButton from '../components/GenericButton'

const Login = () => {

    const {loginUser, loading, setLoading} = useContext(userContext)

    const navigate = useNavigate()
    
    const {required, patternEmail, minLength, validateTrim} = formValidate()
    const { register, handleSubmit, formState: { errors }, setError } = useForm({
        //recordar sacar
        defaultValues:{
            email:"claud@mail.com",
            password:"123123"
        }
    });
    
    const onSubmit = async({email, password}) => {
    try {
        setLoading(true)
        await loginUser(email, password)
        console.log('usuario logeado');
        navigate('/')
    } catch (error) {
        console.log(error.code);
        const {code, message} = erroresFirebase(error.code)
        setError(code,{ message })       
    } finally {
        setLoading(false)
    }
  }

  return (
    <>
        <Title text="Inicio Sesión"/>
        <form onSubmit={handleSubmit(onSubmit)}>
            <FormError error={errors.firebase}/>

            <FormInput
                type="email"
                placeholder='Ingrese email'
                label='Ingrese Email'
                {...register("email", { 
                    required,
                    pattern: patternEmail
                })}>
                <FormError error={errors.email}/>
            </FormInput>

            <FormInput
                type="password"
                placeholder='Ingrese password'
                label='Ingrese Contraseña'
                {...register("password", { 
                    minLength,
                    validate: validateTrim
                })}>
                <FormError error={errors.password}/>
            </FormInput>
            
            <GenericButton text="Logearse" type="submit" loading={loading}/>
            
        </form>
    </>
  )
}

export default Login