import { Link } from "react-router-dom";
import { Icon } from "../../components/Icon";
import { useTagsStore } from "../../stores/useTagsStore";
import useSWR from "swr";
import { useAjax } from "../../lib/ajax";
import useSWRInfinite from "swr/infinite";
import styled from "styled-components";

type Props = {
  kind: Item['kind']
  value?: Item['tag_ids']
  onChange?: (ids:Item['tag_ids']) => void
}
const Div = styled.div`
  padding:16px;
  text-align: center;
`
const getKey = (pageIndex: number, prev: Resources<Item>) => {
  if (prev) {
    const sendCount = (prev.pager.page - 1) * prev.pager.per_page + prev.resources.length
    const count = prev.pager.count
    if (sendCount >= count) { return null }
  }
  return `/api/v1/tags?page=${pageIndex + 1}`
}
export const Tags: React.FC<Props> =(props)=>{
  const {kind} = props
  const {get} = useAjax({showLoading:true, handleError:true})
  const {data, error, size, setSize} = useSWRInfinite(
    getKey,
    async path => (await get<Resources<Tag>>(path)).data,
    { revalidateFirstPage:false}
  )
  const onLoadMore = () => {
    setSize(size + 1)
  }
  const isLoadingInitialData = !data && !error
  const isLoadingMore = data?.[size - 1] === undefined && !error
  const isLoading = isLoadingInitialData || isLoadingMore
  if(!data){
    return <div>空</div>
  } else{
    const last = data[data.length - 1]
    const { page, per_page, count } = last.pager
    const hasMore = (page - 1) * per_page + last.resources.length < count
    return (
    <div>
      <ol grid grid-cols="[repeat(auto-fit,48px)]" justify-center gap-x-32px
      gap-y-16px py-16px px-8px>
        <li>
          <Link to={`/tags/news?kind=${kind}`}>
          <span block w-48px h-48px rounded="24px" bg="#EFEFEF"
            flex justify-center items-center text-24px color="#8F4CD7"
            ><Icon name="add" className="text-32px" /></span>
          </Link>
        </li>
        {data.map(({resources}, index) =>{
          return resources.map((tag, index) =>
          <li key={index} w-48px flex justify-center items-center flex-col gap-y-8px
        onClick={()=>{props.onChange?.([tag.id])}}>
          {props.value?.includes(tag.id)
          ? <span block w-48px h-48px rounded="24px" bg="#EFEFEF" flex justify-center items-center text-24px b-1 b="#8F4CD7">😶</span>
          : <span block w-48px h-48px rounded="24px" bg="#EFEFEF"
              flex justify-center items-center text-24px b-1 b-transparent>😶</span>
          }
          <span text-12px color="#666">{tag.name}</span>
        </li>
          )
        }
        )}
      </ol>
      {error && <Div>数据加载失败，请刷新页面</Div>}
      {hasMore
        ? isLoading
          ? <Div>数据加载中。。。</Div>
          : <Div><button j-btn onClick={onLoadMore}>加载更多</button></Div>
        : <Div>没有更多数据了</Div>
      }
    </div>)
  }
};