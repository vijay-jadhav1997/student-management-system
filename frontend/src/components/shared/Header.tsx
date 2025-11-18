import { type FC } from 'react'
import { NavLink } from 'react-router-dom'
import Logo from './Logo'
import { RiMenuLine } from 'react-icons/ri'

interface HeaderInterface {
  setOpen?: (open:boolean)=>void
  open?: boolean
  session?: UserInterface | null
  logout?: ()=> void
}

const Header: FC<HeaderInterface> = ({setOpen, open, session, logout}) => {
  return (
    <header className="sticky z-500 top-0 py-4 w-full border-b bg-gray-950 border-gray-800 flex items-center justify-between px-4">
      <div className="flex items-center gap-3">
        {
          setOpen &&
          <button onClick={() => setOpen(!open)} className={`${open ? 'opacity-0' : 'opacity-100'} cursor-pointer transition-all duration-1000 ease-in text-xl md:hidden`}>
            <RiMenuLine className='text-2xl' />
          </button>
        }
        <Logo size='xl'/>
      </div>
      <nav className='space-x-4 pr-4'>
        {
          session ?
            <button 
              onClick={logout}
              className={ `px-2 py-1 hover:text-red-500 hover:scale-110 duration-200 ease-out transition-all `}
            >Logout</button>
          :
          <>
            <NavLink to="/login" 
              className={({isActive}) => `px-2 py-1 ${isActive ? '' : 'hover:text-blue-400 hover:scale-110 duration-200 ease-out transition-all'} `}
            >Login</NavLink>
            <NavLink to="/signup" 
              className={({isActive}) => `px-2 py-1 ${isActive ? '' : 'hover:text-blue-400 hover:scale-110 duration-200 ease-out transition-all'} `}
            >Signup</NavLink>
          </>
        }
      </nav>
    </header>
  )
}

export default Header