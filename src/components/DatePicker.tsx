import { useState } from "react";
import { Time } from "../lib/time";

type Props = {
  start?: Date
  end?:Date
  value?:Date
}

export const DatePicker: React.FC<Props>=(props)=>{
  const {start, end, value} = props
  const t = new Time()
  console.log(t.add(10, 'years').format('yyyy年MM月dd日 HH:mm:ss.fff'))
  const [isTouching, setIsTouching] = useState(false)
  const [initY, setInitY] = useState(-1)
  const [translateY, setTranslateY] = useState(0)
  return (
    <div h-50vh overflow-hidden relative
    onTouchStart={(e)=>{
      setIsTouching(true)
      setInitY(e.touches[0].clientY)
    }}
    onTouchMove={(e)=>{
      if(isTouching){
        const y = e.touches[0].clientY
        const dy = y - initY
        setTranslateY(translateY + dy)
        setInitY(y)
      }
    }} 
    onTouchEnd={()=>{
      const remainder = translateY % 36
      let y = translateY - remainder
      if (Math.abs(remainder) > 18) {
        y += 36 * (remainder > 0 ? 1 : -1)
      }
      setTranslateY(y)
      setIsTouching(false)
    }}
    >
      <div b-1 b-red h-36px absolute top="[calc(50%-18px)]" w-full />
      <div b-1 b-red h-36px absolute top="[calc(50%-18px)]" w-full>
        <ol style={{ transform:`translateY(${translateY}px)`}} children-h-36px children-leading-36px>
          <li>2013</li>
          <li>2012</li>
          <li>2011</li>
          <li>2010</li>
          <li>2009</li>
          <li>2008</li>
          <li>2007</li>
          <li>2006</li>
          <li>2005</li>
          <li>2004</li>
          <li>2003</li>
          <li>2002</li>
          <li>2001</li>
          <li>2000</li>
          <li>1999</li>
          <li>1998</li>
          <li>1997</li>
        </ol>
      </div>
      </div>
  )
};