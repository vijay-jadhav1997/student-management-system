import type { FC, FormEvent, ReactNode } from "react"
import type { FormDataType } from "../../types/form-type"

interface FormInterface {
  children: ReactNode
  className: string
  onValue?: (data: FormDataType)=>void
}

const Form: FC<FormInterface> = ({children, className, onValue}) => {
  const handleSubmit = (e: FormEvent<HTMLFormElement>)=>{
    e.preventDefault()
    const form =  e.currentTarget
    const formData = new FormData(form)
    const data: FormDataType = {}

    formData.forEach((value, name)=>{
      data[name] = value.toString()
    })

    if(onValue){
      onValue(data)
      form.reset()
    }


  }
  
  return (
    <form className={className} onSubmit={handleSubmit}>
      {children}
    </form>
  )
}

export default Form