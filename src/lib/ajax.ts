import axios, { AxiosError, AxiosRequestConfig } from 'axios'
import { useLoadingStore } from '../stores/useLoadingStore'
import { useNavigate } from 'react-router-dom'

axios.defaults.baseURL = isDev ? '/' : 'http:1.1.1.1:8080/api/v1'
axios.defaults.headers.post['Content-Type'] = 'application/json'
axios.defaults.timeout = 1000

axios.interceptors.request.use((config)=>{
  const jwt = localStorage.getItem('jwt') || ''
  config.headers = config.headers || {}
  if (jwt) {config.headers.Authorization = `Bearer ${localStorage.getItem('jwt')}`}
  return config
})
type Options = {
  showLoading?: boolean
  handleError?: boolean
}
export const useAjax = (options?: Options) => {
  const table: Record<string, undefined | (() => void)> = {
    401: () => {
      nav('/sign_in')
    },
    402: () => {
      window.alert('请付费后观看')
    },
    403: () => {
      window.alert('没有权限')
    },
    unknown: () => {
      window.alert('未知错误')
    }
  }
  const showLoading = options?.showLoading || false
  const handleError = options?.handleError ?? true
  const { setVisible } = useLoadingStore()
  const nav = useNavigate()
  const onError = (error: AxiosError) => {
    if (error.response) {
      if (handleError) {
        const { status } = error.response
        const fn = table[status] || table.unknown
        fn?.()
      }
    }
    throw error
  }
  const ajax = {
    get: <T>(path: string, config?: AxiosRequestConfig<any>) => {
      return axios.get<T>(path, config).catch(onError)
    },
    post: <T>(path: string, data: JSONValue) => {
      if (showLoading) { setVisible(true) }
      return axios.post<T>(path, data).catch(onError).finally(() => {
        if (showLoading) { setVisible(false) }
      })
    },
    patch: () => { },
    delete: () => { },
  }
  return ajax
}
