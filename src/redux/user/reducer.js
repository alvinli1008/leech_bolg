import * as constants from '../constans'
import jwtDecode from 'jwt-decode'

let defaultState = {
    username: '',
    auth: 0,
    avtarColor: '#52c41a'  // 用户头像颜色
}

// 从本地localStorage取出 token
if (!!localStorage.getItem('token') && localStorage.getItem('token') !== 'undefined') {
    const { username, auth } = jwtDecode(localStorage.token)
    defaultState = Object.assign(defaultState, { username, auth })
}

// 
export const demoReudcer = (state = defaultState, action) => {
    // console.log('action', action)
    const { type, payload } = action
    switch (type) {
        case constants.USER_LOGIN:
            const { username, auth, } = jwtDecode(payload.token)  // token 解析出username, auth
            console.log('demoReudcer', auth)
            return { ...state, username, auth }
        case constants.USER_LOGINOUT:
            return { username: '', auth: 0, avtarColor: '#52c41a' }
            
        default:
            return state
    }
} 

export default demoReudcer