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

import auth from "/auth.svg"


const Signup = () => {
  const navigate = useNavigate()
  
  const handleFormSubmit = async (formData:FormDataType) => {
    try {
      const {data} = await HttpInterceptor.post('/auth/signup', formData)

      toast.success(data?.message,{
        position: 'top-center',
        autoClose: 2000,
      });

      navigate('/login')
    } catch (err: unknown) {
      CatchError(err, "top-left")
    }
  }
  
  return (
    <div className="h-screen flex justify-center items-center bg-gray-100">
      <div className="max-w-3xl w-[95%] animate__animated animate__fadeIn">
        <Card>
          <div className="grid grid-cols-2">
            <div className="p-6 md:p-8 space-y-4">
              <div className="">
                <h1 className="text-2xl font-bold text-black uppercase">SIGN UP</h1>
                <p className="text-gray-500">Start managing your students record now !</p>
              </div>
              <Form onValue={handleFormSubmit}  className="flex flex-col gap-3 md:gap-4" >
                <Input name="fullname" placeholder="Fullname" />
                <Input name="email" type="email" placeholder="Email Id" />
                <Input name="mobile" type="tel" placeholder="Mobile" />
                <Input name="password" type="password" placeholder="Password" />

                <Button type="love" children="Sign up" icon={<RiArrowRightUpLine className="" />} />
              </Form>

              <p className="">
                Already have an account?
                <Link to={'/login'} className="text-green-500 inline-block ml-2 font-medium hover:underline">Sign in</Link>
              </p>
            </div>
            <div className="h-[500px] overflow-hidden bg-linear-to-t from-sky-500 to-indigo-500 flex items-center justify-center rounded-r-lg ">
              <img src={auth} className="w-full animate__animated animate__slideInUp animate__faster" alt="auth" />
            </div>
          </div>
        </Card>
      </div>
    </div>
  )
}

export default Signup