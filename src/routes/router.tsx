import {
  Navigate,
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
import { ItesmPageError } from '../components/ItemsPageError'
import { ErrorEmptyData, ErrorUnauthorized } from '../errors'
import useSWR, { preload } from 'swr'

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
  { path: '/items', 
  element: <ItemsPages />,
  errorElement:<ItesmPageError />,
  loader: async () =>{
    const onError = (error: AxiosError) =>{
      if(error.response?.status === 401) { throw new ErrorUnauthorized}
      throw error
    }
    return preload('/api/v1/items?page=1',async(path)=>{
      const response = await axios.get<Resources<Item>>(path).catch(onError)
      if(response.data.resources.length > 0) {
        return response.data
      } else {
        throw new ErrorEmptyData
      }
    })
  }},
  { path: '/items/new', element: <ItemsNewPage /> },
  { path:'/tags/news', element:<TagsNewPage />},
  { path: '/tags/:id', element:<TagsEditPage />},
  { path: '/sign_in', element: <SignInPage /> },
  { path: '/chart', element: <StatisticsPage/> },
  { path: '/export', element: <div>敬请期待</div> },
  { path: '/tags', element: <div>标签</div> },
  { path: '/noty', element: <div>敬请期待</div> },
])
