import axios from 'axios'
import { message } from 'antd'

const instance = axios.create({
    baseURL: 'http://localhost:3001/admin/api',
    timeout: 3000
})

let timer

// 拦截请求
instance.interceptors.request.use(
    config => {
        // console.log('config', config)
        const token = localStorage.getItem('token')
        // console.log('token', token)
        if (token) {
            config.headers.common['Authorization'] = 'Bearer ' + token
        }
        return config
    },
    error => {
        message.error('bad request')
        Promise.reject(error)
    }
)

// 拦截响应
instance.interceptors.response.use(
    response => {
        // console.log('response', response)
        if (response.status !== 200) {
            console.log('response.status', response)
            // response.data.message && message.warning(response.data.message)
            // return Promise.reject(response.data)
        }
        return response.data
    },
    err => {
        clearTimeout(timer)
        timer = setTimeout(() => {
            if(err && err.response) {
                console.log('timer-error', err.response, err.response.status)
                switch (err.response.status) {
                    case 400:
                        message.error(`${err.response.data.message}`)
                        break
                    default:
                        message.error(`连接错误${err.response.status}`)
                        break
                }
            }
            // if(err && err.response.status === 401) {
            //     this.props.history.push('/login')
            // }
            }, 200)
            return Promise.reject(err)
        }
)

export default instance