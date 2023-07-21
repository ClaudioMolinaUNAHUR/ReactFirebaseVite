import React from 'react'
import { forwardRef } from 'react' //pasar referencias desde sus padres

const FormInput = forwardRef(({type, placeholder, onChange, onBlur, name, children}, ref) => {
  return (
    <>
      <input 
        type={type}
        placeholder={placeholder}
        //los siguientes atributos las usa el register de react-hook-form
        ref={ref}
        onChange={onChange}
        onBlur={onBlur}
        name={name}/>
        <>
          {children}
        </>
    </>
  )
})

export default FormInput
