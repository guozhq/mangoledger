import { useNavigate } from 'react-router-dom'
import cloud from '../assets/images/cloud.svg'
import { useLocalStore } from '../stores/useLocalStore'

export const Welcome4: React.FC = () => {
  const { setHasReadWelcomes } = useLocalStore()
  const nav = useNavigate()
  const onSkip = () => {
    setHasReadWelcomes(true)
    nav('/home')
  }
  return (
    <div text-center>
      <img w-129px h-83px src={ cloud } />
      <h2 text-32px mt-48px>
        云备份 <br />
        再也不怕数据丢失
      </h2>
      <div mt-64px>
        <span text-32px color="#6035BF" font-bold onClick={onSkip}>开启应用</span>
      </div>
    </div>
  )
}
