import React from 'react'
import ButtonLoading from './ButtonLoading'

const GenericButton = ({text, type, color = 'yellow', loading = false, onClick}) => {
  
  color = `text-white bg-${color}-400 hover:bg-${color}-500 focus:outline-none focus:ring-4 focus:ring-${color}-300 font-medium rounded-full text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:focus:ring-${color}-900`
  
  if (loading) return (<ButtonLoading/>)
  return (
    <button
      onClick={onClick}
      className={color}
      type={type}>
        {text}
    </button>
  )
}

export default GenericButton
