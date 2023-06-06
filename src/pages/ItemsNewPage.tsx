import type { ReactNode } from 'react'
import { useState } from 'react'
import { Gradient } from '../components/Gradient'
import { Tabs } from '../components/Tabs'
import { TopNav } from '../components/TopNav'
import s from './ItemsNewPage.module.scss'
import { Tags } from './ItemsNewPage/Tags'
import { ItemAmount } from './ItemsNewPage/ItemAmount'
import { useCreateItemStore } from '../stores/useCreateItemStore'
import { ItemDate } from './ItemsNewPage/ItemDate'
import { hasError, validate } from '../lib/validate'
import { useAjax } from '../lib/ajax'
import { BackIcon } from '../components/BackIcon'
import { useNavigate } from 'react-router-dom'


export const ItemsNewPage: React.FC = () => {
  const {data, error, setData, setError}= useCreateItemStore()
  const tabItems: { key: Item['kind']; text: string; element?: ReactNode }[] = [
    { key: 'expenses', text: '支出', 
    element: <Tags kind="expenses" value={data.tag_ids} onChange={(ids)=>setData({tag_ids:ids})} />},
    { key: 'income', text: '收入', 
    element: <Tags kind="income" value={data.tag_ids} onChange={(ids)=>setData({tag_ids:ids})}/> }]
  const [tabItem, setTabItem] = useState<Item['kind']>('expenses')
  const {post}  = useAjax({showLoading:true, handleError:true})
  const nav = useNavigate()
  const onSubmit = async ()=>{
    const error = validate(data, [
      { key: 'kind', type:'required', message: '请选择类型，收入或支出'},
      { key: 'tag_ids', type: 'required', message: '请选择一个标签'},
      { key: 'happen_at', type:'required', message: '请选择一个时间'},
      { key: 'amount', type: 'required', message: '请输入金额'},
      { key: 'amount', type: 'notEqual', value: 0, message: '金额不能为0'},
    ])
    setError(error)
    if(hasError(error)){
      const message = Object.values(error).flat().join('\n')
      window.alert(message)
    }else{
      await post<Resource<Item>>('/api/v1/items', data)
      nav('/items')
    }
  }
  return (
    <div className={s.wrapper} hc-screen flex flex-col>
      <Gradient className="grow-0 shrink-0">
        <TopNav title="记一笔" icon={<BackIcon />}/>
      </Gradient>
      <Tabs className="text-center grow-1 shrink-1 overflow-hidden" classPrefix='itemsNewPage' tabItems={tabItems} value={data.kind!} onChange={(tabItem) => { setData({kind:tabItem}) }} />
      <ItemAmount className="grow-0 shrink-0" 
      itemDate={<ItemDate value={data.happen_at} onChange={(happen_at) => setData({ happen_at })} />}
      value = {data.amount} onChange= {amount=>setData({amount})} onSubmit={onSubmit} />
    </div>
  )
}
