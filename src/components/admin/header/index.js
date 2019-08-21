import React, { Component } from 'react'
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom'
import { logout } from '@/redux/user/actions'

import './index.scss'
import AuthAvatar from '../../web/AuthAvatar'
import { Icon, Dropdown, Menu } from 'antd'

@connect(
    null,
    { logout }
)
@withRouter
class AdminHeader extends Component {

    handleLogout = ({ key }) => {
        this.props.logout()
        this.props.history.push('/login')
      };
      
       renderDropDownMenu = () => (
        <Menu className="menu">
          <Menu.Item key="1" >
              <span onClick={() =>  this.props.history.push('/')}>返回主页</span>
          </Menu.Item>
          <Menu.Item key="2">
              <span onClick={this.handleLogout}>退出登录</span>
          </Menu.Item>
          
        </Menu>
      );
    render() {
        // console.log('AdminHeader', this.props)
        return (
            <div className="admin-header-container">
               <Icon
                    className="trigger"
                    type={this.props.collapsed ? "menu-unfold" : "menu-fold"}
                    onClick={this.props.onToggle}
                />
                <div className="header-right">
                    <Dropdown placement="bottomRight" overlay={this.renderDropDownMenu()}>
                        <span>
                            <AuthAvatar size="large" />
                        </span>
                    </Dropdown>
                </div>
            </div>
        )
    }
}

export default AdminHeader
