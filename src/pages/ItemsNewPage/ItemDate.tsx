import { time } from '../../lib/time'
import { Icon } from "../../components/Icon";
import { useState } from 'react';
import { DatePicker } from '../../components/DatePicker';
import { usePopup } from '../../hooks/usePopup';

export const ItemDate: React.FC =()=>{
  const [date, setDate] = useState(new Date())
  const { toggle, popup, hide } = usePopup({
    children: <DatePicker
      onConfirm={d => { setDate(d); hide() }}
      onCancel={() => hide()} />
  })
 return (
  <>
    {popup}
    <span flex gap-x-8px items-center onClick={toggle}>
    <Icon name="calendar" className="w-24px h-24px grow-0 shrink-0" />
    <span grow-0 shrink-0 color="#999">
      {time(date).format() === time().format() ? '今天' : time(date).format()}
    </span>
  </span>
  </> 
 )
};