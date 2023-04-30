import clock from '../assets/images/clock.svg'

export const Welcome2: React.FC = () => {
  return (
    <div text-center>
      <img w-128px h-150px src={ clock } />
      <h2 text-32px mt-48px>
        每日提醒 <br />
        不会遗漏每一笔账单
      </h2>
    </div>
  )
}
