import * as constants from '../constans'
import axios from '@/lib/axios'
import { message } from 'antd'

// 登录
export const login = params => {
  console.log('aaa')
  return dispatch =>
    axios.post('/login', params).then(res => {
      // console.log('axios', res)
      if (res.status === 200) {
        localStorage.setItem('token', res.token)
        dispatch({ type: constants.USER_LOGIN, payload: { token: res.token } })
      } else {
        // console.log('err', res)
        message.error(res.message)
      }
      return res
    })
}

// 注销
export const logout = () => {
  localStorage.removeItem('token')
  return { type: constants.USER_LOGINOUT }
}
