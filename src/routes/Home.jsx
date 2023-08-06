import React, { useEffect } from 'react'
import { useState } from 'react'
import GenericButton from '../components/GenericButton'
import Title from '../components/title'
import { useFirestore } from '../hooks/useFirestore'

const Home = () => {
    const {data, error, loading, getData: readData, createData, delData, updateData} = useFirestore()
    const [url, setUrl] = useState('')
    const [idUrlModified, setIDUrlModified] = useState()
    
    useEffect(() => {
        readData();
        console.log("get");
    }, []);

    const handleSubmit = async(e) => {
        e.preventDefault()
        if(idUrlModified){            
            await updateData(idUrlModified , url)
            setUrl('')
            setIDUrlModified('')
            return
        }
        await createData(url)
        setUrl("")
    }

    const handleChange = (e) => {
        setUrl(e.target.value)
    }

    const handleDelete = async(e) =>{
        await delData(e)
    }
    const handleUpdate = async(e) =>{
        setUrl(e.origin)
        setIDUrlModified(e.nanoid)
    }

  if(loading.get) return <p>Loading Data...</p>
  if(error) return <p> {error}</p>
  
  return (
    <>
       <Title text="Home"/>
        <form onSubmit={handleSubmit}>
            <input placeholder="ex: http://google.com" name="url" type="text" value={url} onChange={handleChange} />
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
       {
        data.map( item => (
          <div key={item.nanoid}>
            <p>{item.nanoid}</p>
            <p>{item.origin}</p>
            <p>{item.userid}</p>
            <GenericButton type="button" text="Delete" color='red' loading={loading[item.nanoid]} onClick={()=> handleDelete(item.nanoid)}/>
            <GenericButton type="button" text="Update" onClick={()=> handleUpdate(item)}/>
          </div>
        ))
       }
    </>
  )
}

export default Home