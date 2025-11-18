import { useContext, useEffect } from "react"
import { Navigate, Outlet } from "react-router-dom"

import Context from "../store/Context"
import { EmptySessionData } from "../utils/session.constant"

const RedirectGuard = () => {

  const {session, setSession} = useContext(Context)
  
  const getSession = async()=>{
    try {
      const localSession = localStorage.getItem('session')
      
      if(localSession){
        setSession(JSON.parse(localSession))
        return
      }
    } catch(err) {
      setSession(EmptySessionData)
      localStorage.removeItem('session')
      console.error(err)
    }
  }

  useEffect(()=>{
    getSession()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  


  
  if(session === null || session.isActive === false)
    return (<Outlet />)

  return (<Navigate to={'/app'} />)
  
}

export default RedirectGuard