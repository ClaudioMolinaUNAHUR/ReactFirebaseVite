import { collection, deleteDoc, doc, getDocs, query, setDoc, updateDoc, where } from "firebase/firestore/lite"
import { useState } from "react"
import { db, auth } from "../firebase"
import { nanoid } from 'nanoid'

export const useFirestore = () => {
    const [ data, setData ] = useState([])
    const [ error, setError ] = useState()
    const [ loading, setLoading ] = useState({})
    const uid = auth.currentUser.uid


    const readData = async() => {
        try{
            setLoading(prev => ({...prev, get: true}))
            const dataRef = collection(db, "Urls")
            const q = query(dataRef, where("userid", "==", uid)) //accede al usuario activo en firebase
            const querySnapshot = await getDocs(q) //llama datos de una entidad en la bd de firebase
            const dataDb = querySnapshot.docs.map( doc => doc.data()) //map en nuevo array un objeto con id y datos puede usarse tmb ({id: doc.id, ...doc.data()})
            setData(dataDb)
        }catch (error){
            console.log(error)
            setError(error.message)
        }finally{
            setLoading(prev => ({...prev, get: false}))
        }
    }

    const createData = async(url) => {
        try {
            setLoading(prev => ({...prev, add: true}))
            const newDoc = {
                enable: true,
                nanoid: nanoid(6),
                origin: url,
                userid: uid
            }
            const docRef = doc(db, "Urls", newDoc.nanoid)
            await setDoc(docRef, newDoc)
            setData([...data, newDoc])
        } catch (error) {
            setError(error.message)
        }finally{
            setLoading(prev => ({...prev, add: false}))
        }
    }

    const delData = async(nanoid) => {
        try {
            setLoading(prev => ({...prev, [nanoid]: true}))
            const docRef = doc(db, "Urls", nanoid)
            await deleteDoc(docRef)
            const newData = data.filter( item => item.nanoid !== nanoid)
            setData(newData)
        } catch (error) {
            setError(error.message)
        }finally{
            setLoading(prev => ({...prev, [nanoid]: false}))
        }
    }

    const updateData = async(nanoid, newOrigin) => {
        try {
            setLoading(prev => ({...prev, [`update${nanoid}`]: true}))
            const docRef = doc(db, "Urls", nanoid)
            await updateDoc(docRef, {origin: newOrigin})
            const changesData = data.map( item => item.nanoid == nanoid ? {...item, origin: newOrigin} : item)
            setData(changesData)
        } catch (error) {
            setError(error.message)
        }finally{
            setLoading(prev => ({...prev, [`update${nanoid}`]: false}))
        }
    }



    return {data, error, loading, getData: readData, createData, delData, updateData}
}