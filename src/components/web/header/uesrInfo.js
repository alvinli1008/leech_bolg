import React, { Component, Fragment } from 'react'

import { connect } from 'react-redux'
import { logout, register } from '../../../redux/user/actions'
import { openAuthModal } from '../../../redux/common/actions'

import { Button, Dropdown, Avatar, Menu } from 'antd'
import AuthModal from '../authModal'

@connect(
  state => ({
    username: state.user.username,
    avtarColor: state.user.avtarColor
  }),
  {
    register,
    logout,
    openAuthModal
  }
)
class UesrInfo extends Component {
  renderAvartarDropdownMenu = () => {
    return (
      <Menu>
        <Menu.Item>
          <span
            className="user-logout"
            onClick={() => this.props.openAuthModal('updateUser')}
          >
            修改账户信息
          </span>
        </Menu.Item>
        <Menu.Item>
          <span className="user-logout" onClick={this.props.logout}>
            退出登录
          </span>
        </Menu.Item>
      </Menu>
    )
  }
  render() {
    console.log('userinfo', this.props)
    const { username, avtarColor } = this.props
    return (
      <div id="header-userInfo">
        {username ? (
          <Dropdown
            placement="bottomCenter"
            overlay={this.renderAvartarDropdownMenu()}
            trigger={['click', 'hover']}
          >
            <Avatar
              className="user-avatar"
              size="large"
              style={{ backgroundColor: avtarColor }}
            >
              {username}
            </Avatar>
          </Dropdown>
        ) : (
          <Fragment>
            <Button
              ghost // ?
              type="primary"
              size="small"
              style={{ marginRight: 20 }}
              onClick={() => this.props.openAuthModal('login')}
            >
              登录
            </Button>
            <Button
              ghost // ?
              type="danger"
              size="small"
              onClick={() => this.props.openAuthModal('register')}
            >
              注册
            </Button>
          </Fragment>
        )}

        <AuthModal />
      </div>
    )
  }
}

export default UesrInfo
