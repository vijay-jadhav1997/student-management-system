import { useContext, useState} from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Modal, Card, Avatar } from "antd"
import { UserOutlined } from "@ant-design/icons"
import Context from "../../store/Context"
import { useNavigate } from "react-router-dom"
import CatchError from "../../lib/catchError"
import HttpInterceptor from "../../lib/httpInceptor"
import { toast } from "react-toastify"
import type { FormDataType } from "../../types/form-type"
import Form from "../shared/Form"
import Input from "../shared/Input"
import Button from "../shared/Button"
import { RiArrowRightUpLine } from "react-icons/ri"
import moment from "moment"

const UserProfile = () => {
  const [open, setOpen] = useState(false)
  const { session, setSession} = useContext(Context)
  const navigate = useNavigate()

  if(!session){
    navigate('/login')
    return
  }

  
  const handleFinish = async (values:FormDataType) => {
    try {
      const { data } = await HttpInterceptor.put(`/auth/${session?.id}`, values)
      setSession(data.data)
      localStorage.setItem('session', JSON.stringify(data.data))
      setOpen(false)
      toast.success(data.message, {position: 'top-center', closeOnClick: true})
    } catch (err: unknown) {
      CatchError(err)
    }
  }


  return (
    <div className="bg-gray-950 text-gray-200 flex items-center justify-center p-6">
      <Card className="w-full max-w-xl bg-gray-900 border border-gray-800 shadow-2xl rounded-2xl p-6">
        <div className="flex flex-col items-center text-center space-y-4">
          {/* Avatar */}
          <Avatar
            size={96}
            src={session?.avatar}
            icon={<UserOutlined />}
            className="shadow-lg border border-gray-700"
          />

          <h2 className="text-2xl capitalize font-semibold tracking-wide">{session.fullname}</h2>

          <p className="text-gray-400 text-sm">{session.email}</p>

          <p className="text-gray-400 text-sm">{session.mobile}</p>

          <a
            href={'https://vijay-jadhav1997.netlify.app'}
            target="_blank"
            className="text-indigo-400! underline hover:text-indigo-300 transition"
          >
           <span className="text-gray-800">Portfolio:</span> https://vijay-jadhav1997.netlify.app
          </a>

          <Button
            type="primary"
            onClick={() => setOpen(true) }
          >
            Update Profile
          </Button>

          <div className="flex flex-col sm:flex-row mt-8 justify-between w-full">
            {
              session?.createdAt &&
              <span className="text-gray-600">{"Joined: " + moment(session.createdAt).format("DD MMM YYYY")}</span>
            }
            {
              session?.updatedAt &&
              <span className="text-gray-600">{"Last updated: "  + moment(session.updatedAt).format("DD MMM YYYY")}</span>
            }
          </div>
        </div>
      </Card>

      {/* Popup Modal to open update User Form*/}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/70 flex items-center justify-center p-4 z-50"
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="w-full max-w-lg"
            >
              <Modal
                title={<span className="bg-linear-to-r from-indigo-800 to-green-400 text-transparent bg-clip-text text-2xl font-bold text-center! ">Update Profile</span>}
                open={open}
                onCancel={() => setOpen(false)}
                footer={null}
                className="dark-modal"
              >
                <Form onValue={handleFinish} className="space-y-4 py-4">
                  <div>
                    <label className="block mb-1 text-sm text-gray-800">Full Name</label>
                    <Input
                      name="fullname"
                      type="text"
                      placeholder="Enter full name"
                      required
                      defaultValue={session?.fullname}
                    />
                  </div>

                  <div>
                    <label className="block mb-1 text-sm text-gray-800">Email</label>
                    <Input
                      name="email"
                      type="email"
                      placeholder="Enter email"
                      required
                      defaultValue={session?.email}
                    />
                  </div>
                  <div>
                    <label className="block mb-1 text-sm text-gray-800">Mobile</label>
                    <Input
                      type="tel"
                      placeholder="Enter mobile number"
                      name="mobile"
                      required
                      defaultValue={session?.mobile}
                    />
                  </div>

                  {/* <div>
                    <label className="block mb-1 text-sm text-gray-800">Website Link</label>
                    <Input
                      value={'https://vijay-jadhav1997.netlify.app'}
                      placeholder="Enter website URL"
                      className="bg-gray-800 border-gray-700 text-gray-200"
                    />
                  </div> */}
                  <div className="flex justify-center mt-8">
                    <Button
                      type="primary"
                      children="Update profile" 
                      icon={<RiArrowRightUpLine className="" />}
                    />
                  </div>
                </Form>
              </Modal>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default UserProfile