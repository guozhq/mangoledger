import { animated, useTransition } from '@react-spring/web'
import type { ReactNode } from 'react'
import { useRef } from 'react'
import { Link, useLocation, useOutlet } from 'react-router-dom'

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
        ? 'translateX(100%)'
        : 'translateX(0)',
    },
    enter: { transform: 'translateX(0)' },
    leave: { transform: 'translateX(-100%)' },
    config: { duration: 1000 },
  })
  return transitions((style, pathname) => {
    return (
      <div>
        <header>
          <img src={''}/>
          <h1>React 记账</h1>
        </header>
        <main>
          <animated.div key={pathname} style={style}>
            {map.current[pathname]}
          </animated.div>
        </main>
        <footer>
          <Link to={linkMap[location.pathname]} >下一页</Link>
          <Link to='/welcome/xxx'>跳过</Link>
        </footer>
      </div>
    )
  })
}
