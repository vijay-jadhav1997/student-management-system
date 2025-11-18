import type { FC } from "react"

interface LogoInterface {
  size?: 'lg' | 'xl' | '2xl' | '3xl'
}

const Logo: FC<LogoInterface> = ({size='xl'}) => {
  return (
    <div 
      className={`text-transparent bg-linear-to-br from-blue-600 via-cyan-400 to-green-400 bg-clip-text font-bold text-lg md:text-${size}`}
    >Manage.Students</div>
  )
}

export default Logo