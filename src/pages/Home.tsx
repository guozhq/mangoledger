import useSWR from 'swr'
import { Navigate } from 'react-router-dom'
import pot from '../assets/images/pot.svg'
import { useTitle } from '../hooks/useTitle'
import { ajax } from '../lib/ajax'
import { Loading } from '../components/Loading'
import { AddItemFloatButton } from '../components/AddItemFloatButton'

interface Props {
  title?: string
}
export const Home: React.FC<Props> = (props) => {
  useTitle(props.title)
  const { data: meData, error: meError, isLoading: meLoading } = useSWR('/api/v1/me', async path =>
    (await ajax.get<Resource<User>>(path)).data.resource
  )
  const { data: itemsData, error: itemsError, isLoading: itemsLoading } = useSWR(meData ? '/api/v1/item' : null, async path =>
    (await ajax.get<Resources<Item>>(path)).data
  )
  if (meLoading || itemsLoading) {
    return <Loading />
  }
  if (itemsData?.resources[0]) {
    return <Navigate to="/items"/>
  }
  return <div>
    <div flex justify-center items-center>
      <img mt-20vh mb-20vh width="128" height="130" src={pot} />
    </div>
    <div px-16px>
    <button j-btn>开始记账</button>
    </div>
    <AddItemFloatButton />
  </div>
}
