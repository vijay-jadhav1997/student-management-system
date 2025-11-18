import { useContext, useEffect } from "react"
import { Navigate, Outlet } from "react-router-dom"
import { Skeleton } from "antd"

import HttpInterceptor from "../lib/httpInceptor"
import Context from "../store/Context"
import { EmptySessionData } from "../utils/session.constant"



const AuthGuard = () => {

  const {session, setSession} = useContext(Context)
  
  const getSession = async()=>{
    try {
      const localSession = localStorage.getItem('session')

      if(localSession){
        setSession(JSON.parse(localSession))
        return
      }
      
      const { data } = await HttpInterceptor.get('/auth/session')
      setSession({...data, isActive: true})
      localStorage.setItem('session', JSON.stringify({...data, isActive: true}))

    } catch(err) {
      setSession(EmptySessionData)
      console.error(err)
    }
  }

  useEffect(()=>{
    getSession()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  

  if(session === null)
    return <Skeleton active/>
  
  if(session.isActive === false)
    return <Navigate to={'/login'} />
  
  return (
    <Outlet />
  )
}

export default AuthGuard