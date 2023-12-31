import type { FormEventHandler } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { Gradient } from '../components/Gradient'
import { Icon } from '../components/Icon'
import { TopNav } from '../components/TopNav'
import { useSignInStore } from '../stores/useSignInStore'
import { FormError, hasError, validate } from '../lib/validate'
import { useAjax } from '../lib/ajax'
import { Input } from '../components/Input'
import { AxiosError } from 'axios'

export const SignInPage: React.FC = () => {
  const { data, error, setData, setError } = useSignInStore()
  const nav = useNavigate()
  const { post } = useAjax({ showLoading: true })
  const onSubmitError = (err: AxiosError<{ errors: FormError<typeof data> }>) => {
    setError(err.response?.data?.errors ?? {})
    throw error
  }
  const [search] = useSearchParams()
  const onSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault()
    const error = validate(data, [
      { key: 'email', type: 'required', message: '请输入邮箱地址' },
      { key: 'email', type: 'pattern', regex: /.+@.+/, message: '邮箱格式不正确' },
      { key: 'code', type: 'required', message: '请输入验证码' },
      { key: 'code', type: 'length', min: 6, max: 6, message: '验证码必须是6位' },
    ])
    setError(error)
    if (!hasError(error)) {
      await post('/api/v1/session', data)
      // 保存 JWT 作为登录凭证
      const response = await post<{ jwt: string }>('http://121.196.236.94:8080/api/v1/session', data)
        .catch(onSubmitError)
      const jwt = response.data.jwt
      console.log('jwt', jwt)
      localStorage.setItem('jwt', jwt)
      const from = search.get('from') || '/items'
      nav(from)
    }
  }
  const sendSmsCode = async () =>{
    // 当点击发送验证码的时候，我们先校验一下邮箱地址格式是否正确
    const newError = validate({email:data.email},[
      {key: 'email', type:'pattern', regex: /^.+@.+$/, message:'邮箱地址格式不正确'}
    ])
    setError(newError)
    if(hasError(newError)){ throw new Error('表单出错')}
    const response = await post('http://121.196.236.94:8080/api/v1/validation_codes', {
      email:data.email
    })
    return response
  }
  return (
    <div>
      <Gradient>
        <TopNav title="登录" icon={<Icon name="back" />}/>
      </Gradient>
      <div text-center pt-40px pb-16px>
        <Icon name="mango" className='w-64px h-68px' />
        <h1 text-32px color="#9ccb3b" font-bold>芒果账本</h1>
      </div>
      <form j-form onSubmit={onSubmit}>
        <Input type="text" label='邮箱地址' placeholder='请输入邮箱，然后点击发送验证码'
          value={data.email} onChange={email => setData({ email })}
          error={error.email?.[0]} />
        <Input label='验证码' type="sms_code" placeholder='六位数字' value={data.code}
      onChange={value => setData({ code: value })}
      error={error.code?.[0]} request={sendSmsCode}/>
        <div mt-100px>
          <button j-btn type="submit">登录</button>
        </div>
      </form>
    </div>
  )
}
