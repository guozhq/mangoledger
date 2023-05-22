import type { FormEventHandler } from 'react'
import { useNavigate } from 'react-router-dom'
import { Gradient } from '../components/Gradient'
import { Icon } from '../components/Icon'
import { TopNav } from '../components/TopNav'
import { useSignInStore } from '../stores/useSignInStore'
import { hasError, validate } from '../lib/validate'
import { ajax } from '../lib/ajax'
import { Input } from '../components/Input'

export const SignInPage: React.FC = () => {
  const { data, error, setData, setError } = useSignInStore()
  const nav = useNavigate()
  const onSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault()
    const error = validate(data, [
      { key: 'email', type: 'required', message: '请输入邮箱地址' },
      { key: 'email', type: 'pattern', regex: /.+@.+/, message: '邮箱格式不正确' },
      { key: 'code', type: 'required', message: '请输入验证码' },
      { key: 'code', type: 'length', min: 4, max: 4, message: '验证码必须是4位' },
    ])
    setError(error)
    if (!hasError(error)) {
      await ajax.post('/api/v1/session', data)
      // 保存 JWT 作为登录凭证
      nav('/home')
    }
  }
  return (
    <div>
      <Gradient>
        <TopNav title="登录" icon={<Icon name="back" />}/>
      </Gradient>
      <div text-center pt-40px pb-16px>
        <Icon name="logo" className='w-64px h-68px' />
        <h1 text-32px color="#7878FF" font-bold>山竹记账</h1>
      </div>
      <form j-form onSubmit={onSubmit}>
        <Input label='邮箱地址' placeholder='请输入邮箱，然后点击发送验证码'
          value={data.email} onChange={value => setData({ email: value })}
          error={error.email?.[0]} />
        <div>
          <span j-form-label>验证码 {error.code?.[0] && <span>{error.code[0]}</span>}</span>
          <div flex gap-x-16px>
            <input max-w="[calc(40%-8px)]" j-input-text type="text" placeholder='六位数字'
            value={data.code} onChange={e => setData({ code: e.target.value })}/>
            <button max-w="[calc(60%-8px)]" j-btn>发送验证码</button>
          </div>
        </div>
        <div mt-100px>
          <button j-btn type="submit">登录</button>
        </div>
      </form>
    </div>
  )
}
