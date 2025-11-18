import { isAxiosError } from "axios"
import HttpInterceptor from "./httpInceptor"

const Fetcher = async(url: string)=>{
  try {
    const { data } = await HttpInterceptor.get(url)
    return data
  } catch (err: unknown) {
    if(isAxiosError(err))
      throw err

    if(err instanceof Error)
      throw new Error(err.message)

  }
}

export default Fetcher