import type { FC, ReactElement } from 'react';
import { FaSpinner } from 'react-icons/fa';

const ButtonModel = {
  primary: 'bg-purple-700 hover:bg-purple-800',
  secondary: 'bg-cyan-600 hover:bg-cyan-700',
  danger: 'bg-rose-500 hover:bg-rose-600',
  success: 'bg-green-400 hover:bg-green-500',
  info: 'bg-sky-400 hover:bg-sky-500',
  warning: 'bg-amber-400 hover:bg-amber-500',
  dark: 'bg-gray-500 hover:bg-gray-600',
  help: 'bg-blue-600 hover:bg-blue-500',
  love: 'bg-pink-600 hover:bg-pink-500',
}

interface ButtonInterface {
  children?: string
  type?: 'primary' | 'secondary' | 'warning' | 'success' | 'help' | 'info' | 'dark' | 'danger' | 'love'
  onClick?: ()=>void
  icon?: ReactElement
  size?: 'sm' | 'base' | 'lg' | 'xl'
  loading?: boolean
  buttonType?: 'button' | 'submit' | 'reset'
}

const Button: FC<ButtonInterface> = ({children='Button', type='help', icon, size='lg', onClick, loading=false, buttonType='button' }) => {
  if(loading){
    return (
      <button className="flex items-center justify-center gap-1" type={buttonType}>
        <FaSpinner className={`${size === 'base' || size === 'sm' ? 'h-4 w-4 text-sm' : 'h-10 w-10'} animate-spin duration-700 text-blue-300`} />
        Processing...
      </button>
    )
  }
  return (
    <button
     className={`${size === 'base' || size === 'sm' ? 'px-2 py-1' : 'px-3 py-2'} flex justify-center items-center gap-2 cursor-pointer text-white text-${size} font-medium ${ButtonModel[type]}`}
     onClick={onClick}
     style={{borderRadius: "5px"}}
    >
      { icon &&
        icon
      }
      {children}
    </button>
  )
}

export default Button