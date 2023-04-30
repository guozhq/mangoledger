import { animated, useTransition } from '@react-spring/web'
import type { ReactNode } from 'react'
import { useRef } from 'react'
import { Link, useLocation, useOutlet } from 'react-router-dom'
import logo from '../assets/images/mangosteen.svg'

const linkMap: Record<string, string> = {
  '/welcome/1': '/welcome/2',
  '/welcome/2': '/welcome/3',
  '/welcome/3': '/welcome/4',
  '/welcome/4': '/welcome/5',
}
export const WelcomeLayout: React.FC = () => {
  const map = useRef<Record<string, ReactNode>>({})
  const location = useLocation()
  const outlet = useOutlet()
  map.current[location.pathname] = outlet
  const transitions = useTransition(location.pathname, {
    from: {
      transform: location.pathname === '/welcome/1'
        ? 'translateX(0)'
        : 'translateX(100%)',
    },
    enter: { transform: 'translateX(0)' },
    leave: { transform: 'translateX(-100%)' },
    config: { duration: 1000 },
  })
  return (
      <div className="bg-#5e34bf" h-screen flex flex-col items-stretch pb-16px>
        <header shrink-0 text-center >
          <img src={ logo } w-64px/>
          <h1 color="#D4D4EE" text-32px>React 记账</h1>
        </header>
        <main bg-white m-16px rounded-8px flex justify-center items-center text-center shrink-1 grow-1>
        {transitions((style, pathname) =>
          <animated.div key={pathname} style={style}>
            {map.current[pathname]}
          </animated.div>)}
        </main>
        <footer shrink-0 text-center text-24px text-white grid grid-cols-3 grid-rows-1>
          <Link to={linkMap[location.pathname]} style={{ gridArea: '1 / 2 / 2 / 3' }}>下一页</Link>
          <Link to='/welcome/xxx' style={{ gridArea: '1 / 3 / 2 / 4' }}>跳过</Link>
        </footer>
      </div>
  )
}
