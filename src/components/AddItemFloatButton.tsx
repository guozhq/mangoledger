import { Link } from 'react-router-dom'
import add from '../assets/images/add.svg'

export const AddItemFloatButton: React.FC = () => {
  return (
  <Link to="/items/new"><button p-4px w-56px h-56px bg="#9ccb3b" rounded="50%" b-none text-white
  text-6xl fixed bottom-16px right-16px>
    <img src={add} max-w="100%" max-h="100%" />
  </button></Link>
  )
}
