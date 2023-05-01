import { animated, useTransition } from '@react-spring/web'
import type { ReactNode } from 'react'
import { useEffect, useRef, useState } from 'react'
import { Link, useLocation, useNavigate, useOutlet } from 'react-router-dom'
import logo from '../assets/images/mangosteen.svg'
import { useSwipe } from '../hooks/useSwipe'

const linkMap: Record<string, string> = {
  '/welcome/1': '/welcome/2',
  '/welcome/2': '/welcome/3',
  '/welcome/3': '/welcome/4',
  '/welcome/4': '/welcome/1',
}
export const WelcomeLayout: React.FC = () => {
  const animating = useRef(false)
  const map = useRef<Record<string, ReactNode>>({})
  const location = useLocation()
  const outlet = useOutlet()
  map.current[location.pathname] = outlet
  const [extraStyle, setextraStyle] = useState<{ position: 'relative' | 'absolute' }>({ position: 'relative' })
  const transitions = useTransition(location.pathname, {
    from: {
      transform: location.pathname === '/welcome/1'
        ? 'translateX(0%)'
        : 'translateX(100%)',
    },
    enter: { transform: 'translateX(0%)' },
    leave: { transform: 'translateX(-100%)' },
    config: { duration: 1000 },
    onStart: () => {
      setextraStyle({ position: 'absolute' })
    },
    onRest: () => {
      animating.current = false
      setextraStyle({ position: 'relative' })
    },
  })
  const main = useRef<HTMLElement>(null)
  const { direction } = useSwipe(main, { onTouchStart: e => e.preventDefault() })
  const nav = useNavigate()
  useEffect(() => {
    if (direction === 'left') {
      if (animating.current) { return }
      animating.current = true
      nav(linkMap[location.pathname])
    }
  }, [direction, location.pathname, linkMap])
  return (
      <div className="bg-#5e34bf" h-screen flex flex-col items-stretch pb-16px>
        <header shrink-0 text-center >
          <img src={ logo } w-64px h-69px />
          <h1 color="#D4D4EE" text-32px>React</h1>
        </header>
        <main shrink-1 grow-1 relative m-16px ref={main}>
        {transitions((style, pathname) =>
          <animated.div key={pathname} style={{ ...style, ...extraStyle }} w-full h-full p-16px flex>
            <div bg-white grow-1 flex justify-center items-center rounded-8px>
              {map.current[pathname]}
            </div>
          </animated.div>)}
        </main>
        <footer shrink-0 text-center text-24px text-white grid grid-cols-3 grid-rows-1>
          <Link to={linkMap[location.pathname]} style={{ gridArea: '1 / 2 / 2 / 3' }}>下一页</Link>
          <Link to='/welcome/1' style={{ gridArea: '1 / 3 / 2 / 4' }}>跳过</Link>
        </footer>
      </div>
  )
}
