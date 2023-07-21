import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import FormError from '../components/FormError'
import FormInput from '../components/FormInput'
import { userContext } from '../context/UserProvider'
import { erroresFirebase } from '../utils/erroresFirebase'
import { formValidate } from '../utils/formValidate'

const Register = () => {
        const {registerUser} = useContext(userContext)
        const {required, patternEmail, minLength, validateTrim, validateEquals} = formValidate()
        const navigate = useNavigate()
 const name = new type(arguments);
        const { register, handleSubmit, formState: { errors }, getValues, setError } = useForm({
            //recordar sacar
            defaultValues:{
                email:"claud@mail.com",
                password:"123123",
                repassword: "123123"
            }
        });

        const onSubmit = async({email, password}) => {
            try {
                await registerUser(email, password)
                navigate('/')
            } catch (error) {
                console.log(error);
                setError('firebase',{
                    message: erroresFirebase(error.code)
                });            
            }
        }

    return (
        <>
            <h1>register</h1>
            <form onSubmit={handleSubmit(onSubmit)}>

                <FormError error={errors.firebase}/>

                <FormInput
                    type="email"
                    placeholder='Ingrese email'
                    {...register("email", { 
                        required,
                        pattern: patternEmail
                    })}
                />

                <FormError error={errors.email}/>
                
                <FormInput
                    type="password"
                    placeholder='Ingrese password'
                    {...register("password", { 
                        minLength,
                        validate: validateTrim
                    })}
                    autoComplete="off"
                />

                <FormError error={errors.password}/>
                
                <FormInput
                    type="password"
                    placeholder='Repita el password'
                    {...register("repassword", {
                        validate: validateEquals(getValues)
                    }) }
                />
                
                <FormError error={errors.repassword}/>

                <button type='submit'>Register</button>

            </form>
        </>
    )
}

export default Register