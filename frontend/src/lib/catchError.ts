import { AxiosError } from "axios"
import { toast, type ToastPosition } from "react-toastify"

const CatchError = (err: unknown, position:ToastPosition = "top-center") => {
  if(err instanceof AxiosError){
    console.error(err?.response?.data.message)
    return toast.error(err.response?.data?.message || err?.message, {position})
  }
  
  if(err instanceof Error){
    console.error(err?.message )
    return toast.error(err.message, {position})
  }
}

export default CatchError