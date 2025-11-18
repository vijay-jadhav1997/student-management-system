import type { FC } from "react"

interface InputInterface  {
  type?: 'text' | 'password' | 'number' | 'email' | 'tel'
  name?: string
  placeholder?: string
  label?: string
  required?: boolean
  defaultValue?: string
}

const Input: FC<InputInterface> = ({type='text', name='', label, placeholder, required=true, defaultValue}) => {
  return (
    <>
      {
        label &&
        <label htmlFor={name}>{label}</label>
      }
      <input id={name} type={type} placeholder={placeholder}
        name={name}
        className="border border-gray-200 px-4 py-2 w-full rounded-md focus:outline-none focus:border-blue-300" 
        required={required}
        defaultValue={defaultValue}
      />
    </>
  )
}

export default Input