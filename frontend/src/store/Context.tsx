import { createContext, type Dispatch, type SetStateAction } from "react";



export interface ContextInterface {
  session: UserInterface | null 
  setSession: Dispatch<SetStateAction<UserInterface | null>>
}



const Context = createContext<ContextInterface>({
  session: null,
  setSession: ()=>{}
})

export default Context