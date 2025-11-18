import { useCallback, useContext, useEffect, useState } from "react"
import { NavLink, Outlet, useNavigate } from "react-router-dom"
import {  RiCloseLine, RiHome9Line, RiLogoutBoxLine, RiMenuLine, RiUser2Line } from "react-icons/ri"

import HttpInterceptor from "../../lib/httpInceptor"
import Context from "../../store/Context"
import useSWR from "swr"
import Fetcher from "../../lib/fetcher"
import CatchError from "../../lib/catchError"
import { toast } from "react-toastify"
import Header from "../shared/Header"

const NineMinutesInMs = (9*60*1000)

const menus = [
  {
    href: 'dashboard',
    label: 'dashbord',
    icon: <RiHome9Line className="text-2xl" />
  },
  {
    href: 'user',
    label: 'User',
    icon: <RiUser2Line className="text-2xl" />
  },
]

const Layout = () => {
  const [open, setOpen] = useState(true)

  const {error} = useSWR('/auth/refresh-token', Fetcher, {
    refreshInterval: NineMinutesInMs,
    shouldRetryOnError: false
  })

  const navigate = useNavigate()

  
  const { session } = useContext(Context)

  const logout = useCallback(async()=>{
    try {
      await HttpInterceptor.post('/auth/logout')
      localStorage.removeItem('session')

      toast.success("You logged out successfully..!", {
        position: "top-center",
        autoClose: 2000
      })

      navigate('/login')
    } catch (err) {
      CatchError(err)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  },[])

  useEffect(()=>{
    if(error){
      logout()
      console.log(error)
    }
  }, [error, logout])

  
  return (
   <div className="relative w-full h-screen flex bg-gray-950 text-white">
      {/* Sidebar */}
        <aside
          className={`fixed md:relative ${ open ? 'w-64' : 'w-0 md:w-16'} overflow-hidden transition-all duration-300 ease-out z-600 bg-gray-950 top-0 h-screen border-r border-gray-800  pb-2 flex flex-col justify-between`}
        >
          <div className="space-y-6 overflow-hidden w-64">
            <div className=" overflow-hidden py-4 flex items-center justify-between px-4">
              <RiMenuLine  
                className="text-2xl cursor-pointer" 
                onClick={()=>setOpen(true)}
              />
              {
                open &&
                <RiCloseLine 
                  className="text-2xl cursor-pointer hover:text-gray-400" 
                  onClick={()=>setOpen(false)}
                />
              }
            </div>

            <nav className="">
              {
                menus.map(menu=>(
                  <NavLink 
                  key={menu.label}
                    className={ ({isActive}) => `flex items-center gap-6 px-4 py-3 text-white   capitalize ${isActive ? 'text-blue-400 bg-gray-500/5 hover:text-blue-500' : ' hover:text-gray-300 hover:bg-gray-400/30'}`} 
                    to={menu.href}
                  >
                    {menu.icon}
                    {menu.label}
                  </NavLink>
                ))
              }
              <button 
                className={ `flex items-center gap-6 px-4 py-3 w-full capitalize cursor-pointer  hover:text-gray-300 hover:bg-gray-400/30`} 
                onClick={logout}
              >
                <RiLogoutBoxLine className="text-2xl" />
                Logout
              </button>
            </nav>
          </div>

          <div className="absolute w-64  overflow-hidden left-0 px-4 bottom-0 py-4 border-t flex items-center gap-4 border-gray-700">
            <p className="text-sm w-8 h-8 rounded-full flex justify-center items-center uppercase overflow-hidden bg-pink-600 text-white">{session?.fullname?.split(' ').map((ch:string)=> ch[0]).join('').slice(0,2)}</p>
            <p className="text-sm capitalize text-gray-400 font-semibold">{session?.fullname}</p>
          </div>
        </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col scrollbar-custom overflow-y-auto">
        {/* Header */}
        <Header session={session} logout={logout} setOpen={()=>setOpen(!open)} open={open}/>

        <main className="">
          <Outlet />
        </main>
      </div>
    </div>
  )
}

export default Layout