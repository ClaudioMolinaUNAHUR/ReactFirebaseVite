import React, { useEffect } from 'react'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import FormError from '../components/FormError'
import FormInput from '../components/FormInput'
import GenericButton from '../components/GenericButton'
import Title from '../components/title'
import { useFirestore } from '../hooks/useFirestore'
import { erroresFirebase } from '../utils/erroresFirebase'
import { formValidate } from '../utils/formValidate'

const Home = () => {
    const {data, error, loading, readData, createData, delData, updateData} = useFirestore()
    const [idUrlModified, setIDUrlModified] = useState()
    const [copyIt, setCopyIt] = useState({})
    const {required, patternUrl} = formValidate()
    const { register, handleSubmit, resetField, setValue, formState: { errors }, setError } = useForm();
    
    useEffect(() => {
        readData();
        console.log("get");
    }, []);

    const onSubmit = async({url}) => {
        try {
            if(idUrlModified){            
                await updateData(idUrlModified , url)
                setIDUrlModified('')
            }else {
                await createData(url)
            }
            resetField("url")            
        } catch (error) {            
            console.log(error.code);
            const {code, message} = erroresFirebase(error.code)
            setError(code,{ message })       
        }
    }
    const handleDelete = async(e) =>{
        await delData(e)
    }
    const handleUpdate = async(e) =>{
        setValue("url", e.origin)
        setIDUrlModified(e.nanoid)
    }

    const handleCopy = async(nanoid) =>{
        try {
            setCopyIt({nanoid})
            await navigator.clipboard.writeText(window.location.href + nanoid)
        } catch (error) {
            console.log(error)
        }
        finally{
            setTimeout(() => setCopyIt({}), 5000)
        }
    }

  if(loading.get) return <p>Loading Data...</p>
  if(error) return <p> {error}</p>
  
  return (
    <>
       <Title text="Home"/>
        <form onSubmit={handleSubmit(onSubmit)}>
            <FormInput
                type="text"
                placeholder='ex: http://google.com'
                label='Ingrese una URL'
                {...register("url", { 
                    required,
                    pattern: patternUrl
                })}>
                <FormError error={errors.url}/>
            </FormInput>
            {
                idUrlModified
                ?<GenericButton
                    type='submit'
                    text="Edit"
                    loading={loading.update}/>
                :<GenericButton
                    type='submit'
                    text="Add URL"
                    color='green'
                    loading={loading.add}/>
            }            
        </form>
        <div className='container flex flex-wrap'>
        {
            data.map( item => (            
                <div key={item.nanoid} className='w-96 max-w-full  mb-4 mx-4 p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700'>
                    <p className='mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white'>{item.nanoid}</p>
                    <p className='mb-3 font-normal text-gray-700 dark:text-gray-400'>{item.origin}</p>
                    {/* <p>{item.userid}</p> */}
                    <div className='flex mx-auto'>
                        <GenericButton type="button" text="delete" color='red' loading={loading[item.nanoid]} onClick={()=> handleDelete(item.nanoid)}/>
                        <GenericButton type="button" text="update" onClick={()=> handleUpdate(item)}/>
                        <GenericButton type="button" text={(copyIt.nanoid === item.nanoid) ? 'copied' : 'copy'} color='blue' onClick={()=> handleCopy(item.nanoid)}/>
                    </div>
                </div>
            ))
        }
    </div>
    </>
  )
}

export default Home