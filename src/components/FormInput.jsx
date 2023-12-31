import React from 'react'
import { forwardRef } from 'react' //pasar referencias desde sus padres

const FormInput = forwardRef(({type, placeholder, onChange, onBlur, name, label, children}, ref) => {
    const {labelColor, inputColor} = children.props.error 
                        ? {labelColor: "text-red-700 dark:text-red-500", inputColor: "bg-red-50 border-red-500 text-red-900 placeholder-red-700 focus:ring-red-500 focus:border-red-500 dark:bg-red-100 dark:border-red-400" }
                        : {labelColor:"text-gray-900 dark:text-white", inputColor:"bg-gray-50 border-gray-300 text-gray-900 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"}
                           
    const classLabel = `block mb-2 text-sm font-medium ${labelColor}`
    const classInput = `border text-sm rounded-lg block w-full p-2.5 ${inputColor}`
  return (
    <div className="mb-6">
        <label
          htmlFor={type}
          className={classLabel}>{label}</label>
        <input
            className={classInput}
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
    </div>
  )
})

export default FormInput
