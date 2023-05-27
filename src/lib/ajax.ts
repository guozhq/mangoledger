import axios, { AxiosRequestConfig } from 'axios'

axios.defaults.baseURL = isDev ? '/' : 'http:1.1.1.1:8080/api/v1'
axios.defaults.headers.post['Content-Type'] = 'application/json'
axios.defaults.timeout = 1000

axios.interceptors.request.use((config)=>{
  const jwt = localStorage.getItem('jwt') || ''
  config.headers = config.headers || {}
  if (jwt) {config.headers.Authorization = `Bearer ${localStorage.getItem('jwt')}`}
  return config
})

export const ajax = {
  get: <T>(path: string,config?: AxiosRequestConfig<any>) => {
    return axios.get<T>(path,config)
  },
  post: <T>(path: string, data: JSONValue) => {
    return axios.post<T>(path, data)
  },
  patch: () => {},
  delete: () => {},
}
