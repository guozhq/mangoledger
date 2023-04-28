import {
  createBrowserRouter,
} from 'react-router-dom'
import { NotFoundPage } from '../components/NotFoundPage'
import { welcomeRoutes } from './welcomeRoutes'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <div>Hello world!</div>,
    errorElement: <NotFoundPage />,
    children: [
      welcomeRoutes,
    ],
  },
])
