import React, { useId } from 'react'

const Input = React.forwardRef(function Input({
    label,
    type = "text",
    className = "",
    ...props

}, ref)   {
 
    const id = useId();
    return (
      <div className='w-full'>
        { label && (
            <label 
            className='inline-block mb-1 pl-1 text-gray-400 font-semibold'
            htmlFor={id}>
                {label}
            </label>
        )}
        
        <input 
        type={type} 
        className={`${className} px-3 py-2 rounded-lg bg-white text-black outline-none focus:bg-gray-50 duration-200 border border-gray-200 w-full`} 
        ref={ref}
        // This is what will give refrence of this to its parent-component so that state can be synced with parent-component

        id={id}
        {...props}
        />
      </div>
    )
})

export default Input