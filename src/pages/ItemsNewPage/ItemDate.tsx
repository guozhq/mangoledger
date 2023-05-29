import { time } from '../../lib/time'
import { Icon } from "../../components/Icon";
import { DatePicker } from '../../components/DatePicker';
import { usePopup } from '../../hooks/usePopup';

type Props = {
  value?: string | Date
  onChange?: (date:string) => void
}

export const ItemDate: React.FC<Props> =(props)=>{
  const {value, onChange} = props
  const { toggle, popup, hide } = usePopup({
    children: <DatePicker
      onConfirm={d => { onChange?.(time(d).isoString); hide() }}
      onCancel={() => hide()} />
  })
 return (
  <>
    {popup}
    <span flex gap-x-8px items-center onClick={toggle}>
    <Icon name="calendar" className="w-24px h-24px grow-0 shrink-0" />
    <span grow-0 shrink-0 color="#999">
      {time(value).format() === time().format() ? '今天' : time(value).format()}
    </span>
  </span>
  </> 
 )
};