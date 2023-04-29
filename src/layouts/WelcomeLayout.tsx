import { animated, useTransition } from '@react-spring/web'
import type { ReactNode } from 'react'
import { useLocation, useOutlet } from 'react-router-dom'

const map: Record<string, ReactNode> = {}
export const WelcomeLayout: React.FC = () => {
  const location = useLocation()
  const outlet = useOutlet()
  map[location.pathname] = outlet
  const transitions = useTransition(location.pathname, {
    from: { transform: 'translateX(100%)' },
    enter: { transform: 'translateX(0)' },
    leave: { transform: 'translateX(-100%)' },
    config: { duration: 1000 },
  })
  return transitions((style, pathname) => {
    return <animated.div key={pathname} style={style}>
          {map[pathname]}
        </animated.div>
  })
}
