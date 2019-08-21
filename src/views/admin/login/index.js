import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { login } from '@/redux/user/actions'

import logo from '../../../assets/logo.png'
import { Icon, Input, Button, message } from 'antd'

import './index.scss'

@withRouter
@connect(
  state => state.user,
  { login }
)
class Login extends Component {

  state = {
    username: '',
    password: ''
  }

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  handleSubmit = async () => {
    // console.log(this.state)
    console.log('handleSubmit', this.props)
    await this.props.login(this.state)
    if (this.props.auth === 1) {
      this.props.history.push('/admin')
      message.success('登录成功')
    } else if (this.props.auth === 0) {
      message.warning('权限不足！')
    }
  }

  render() {
    console.log('login', this.props)

    return (
      <div className="login-app">
        <img className="img" src={logo} alt="" />
        <Input 
          size="large"
          prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
          style={{ marginBottom: 23 }}
          name="username"
          placeholder="Username"
          value={this.state.username}
          onChange={this.handleChange}
        />
        <Input 
        size="large"
        prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
        style={{ marginBottom: 23 }}
        type="password"
        name="password"
        placeholder="Password"
        value={this.state.password}
        onChange={this.handleChange}
        />
            <Button
              block
              size="large"
              type="primary"
              onClick={this.handleSubmit}
            >
              登录
            </Button>
      </div>
    )
  }
}


export default Login
