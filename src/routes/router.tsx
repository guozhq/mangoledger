import {
  Navigate,
  Outlet,
  createBrowserRouter,
} from 'react-router-dom'
import { Root } from '../components/Root'
import { WelcomeLayout } from '../layouts/WelcomeLayout'
import { Welcome1 } from '../pages/Welcome1'
import { Welcome2 } from '../pages/Welcome2'
import { Welcome3 } from '../pages/Welcome3'
import { Welcome4 } from '../pages/Welcome4'
import { Home } from '../pages/Home'
import { ItemsPages } from '../pages/ItemsPage'
import { SignInPage } from '../pages/SignInPage'
import { ItemsNewPage } from '../pages/ItemsNewPage'
import { TagsNewPage } from '../pages/TagsNewPage'
import { TagsEditPage } from '../pages/TagsEditPage'
import { StatisticsPage } from '../pages/StatisticsPage'
import axios, { AxiosError } from 'axios'
import { ItemsPageError } from '../components/ItemsPageError'
import { ErrorEmptyData, ErrorUnauthorized } from '../errors'
import useSWR, { preload } from 'swr'
import { ErrorPage } from '../pages/ErrorPage'
import { ajax } from '../lib/ajax'
import { ComingSoonPage } from '../pages/ComingSoonPage'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
  },
  {
    path: 'home',
    element: <Home title="首页"/>,
  },
  {
    path: 'welcome',
    element: <WelcomeLayout />,
    children: [
      { path: '1', element: <Welcome1 /> },
      { path: '2', element: <Welcome2 /> },
      { path: '3', element: <Welcome3 /> },
      { path: '4', element: <Welcome4 /> },
    ],
  },
  { path: '/sign_in', element: <SignInPage /> },
  {// 放在这里的路由全部都需要登录
    path: '/',
    element: <Outlet />,
    errorElement: <ErrorPage />,
    loader: async () => {
      return await ajax.get<Resource<User>>('/api/v1/me').catch(e => {
        if (e.response?.status === 401) { throw new ErrorUnauthorized }
        throw e
      })
    },
    children: [
      {
        path: '/items',
        element: <ItemsPages />,
        errorElement: <ItemsPageError />,
        loader: async () => {
          const onError = (error: AxiosError) => {
            if (error.response?.status === 401) { throw new ErrorUnauthorized() }
            throw error
          }
          const response = await ajax.get<Resources<Item>>('/api/v1/items?page=1').catch(onError)
          if (response.data.resources.length > 0) {
            return response.data
          } else {
            throw new ErrorEmptyData()
          }
        }
      },
      {
        path: '/items/new',
        element: <ItemsNewPage />,
      },
      { path: '/tags/new', element: <TagsNewPage /> },
      { path: '/tags/:id', element: <TagsEditPage /> },
      { path: '/statistics', element: <StatisticsPage /> },
      { path: '/export', element: <ComingSoonPage /> },
      { path: '/noty', element: <ComingSoonPage /> },
    ]},
  ])
