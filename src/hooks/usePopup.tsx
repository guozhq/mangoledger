import { ReactNode, useState } from "react"
import { Popup } from "../components/Popup"

export const usePopup = (children: ReactNode) =>{
  const [visible, setVisible] = useState(false)
  const popup = <Popup visible={visible} onClickMask={()=>setVisible(false)}>
    {children}
  </Popup>
  return {
    popup,
    show(){
      setVisible(true)
    },
    hide(){
      setVisible(false)
    },
    toggle(){
      setVisible(!visible)
    }
  }
}