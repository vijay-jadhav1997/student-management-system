import { Link, useNavigate } from "react-router-dom"
import { RiArrowRightUpLine } from "react-icons/ri"
import { toast } from "react-toastify"

import Button from "../shared/Button"
import Card from "../shared/Card"
import Input from "../shared/Input"
import Form from "../shared/Form"

import type { FormDataType } from "../../types/form-type"
import HttpInterceptor from "../../lib/httpInceptor"
import CatchError from "../../lib/catchError"

import auth from "/log.svg"


const Login = () => {
  const navigate = useNavigate()
  
  const handleFormSubmit = async(formData: FormDataType)=>{
    try {
      const {data} = await HttpInterceptor.post('/auth/login', formData)
      toast.success(data?.message,{
        position: 'top-center',
        autoClose: 3000,
      });

      navigate('/app/dashboard')
    } catch (err: unknown) {
      CatchError(err)
    }
  }
  
  return (
    <div className="h-screen flex justify-center items-center bg-gray-100">
      <div className="max-w-3xl w-[95%] animate__animated animate__fadeIn">
        <Card>
          <div className="grid grid-cols-2">
            <div className="p-6 md:p-8 space-y-4">
              <div className="">
                <h1 className="text-2xl font-bold text-black uppercase">SIGN in</h1>
                <p className="text-gray-500">Start managing your students record now !</p>
              </div>
              <Form onValue={(data)=> handleFormSubmit(data)}  className="flex flex-col gap-3 md:gap-6" >
                <Input name="email" type="email" placeholder="Email Id" />
                <Input name="password" type="password" placeholder="Password" />

                <Button type="love" children="Sign in" icon={<RiArrowRightUpLine className="" />} />
              </Form>

              <p className="">
                Don't have an account?
                <Link to={'/signup'} className="text-green-500 font-medium hover:underline">Sign up</Link>
              </p>
            </div>
            <div className="h-[500px] overflow-hidden bg-linear-to-t from-blue-300 to-indigo-600 flex items-center justify-center rounded-r-lg ">
              <img src={auth} className="w-[60%] animate__animated animate__slideInUp animate__faster" alt="auth" />
            </div>
          </div>
        </Card>
      </div>
    </div>
  )
}

export default Login