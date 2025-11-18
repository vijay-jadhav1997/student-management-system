import type { FC, ReactElement, ReactNode } from "react"

interface CardInterface {
  title?: ReactNode,
  children?: ReactNode,
  footer?: string,
  icon?: ReactElement,
  devider?: boolean,
  padding?: boolean,
  capitalize?: boolean,
}

const Card: FC<CardInterface> = ({children, padding=false, title, footer, devider=false, capitalize=false})=>{
  return(
    <div className={`${padding ? 'px-5 py-4': ''} ${capitalize ? 'capitalize': ''} rounded-lg shadow-lg border border-gray-100 space-y-2 bg-white`}>

      {
        title &&
        <h1 className="text-lg text-black font-medium">{title}</h1>
      }
      {
        devider &&
        <div className="bg-gray-100 shadow -mx-5 h-[0.5px]"/>
      }
      {
        children &&
        <div className="text-gray-500">{children}</div>
      }
      {
        footer &&
        <div className="mt-4">{footer}</div>
      }
    </div>
  )
}

export default Card