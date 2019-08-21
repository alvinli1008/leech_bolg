import React, { Component } from 'react'
import { NavLink, withRouter } from 'react-router-dom'
import routes from '@/views/admin/routes'

import { Menu, Icon } from 'antd'

const { SubMenu } = Menu

@withRouter
class SiderNav extends Component {
  state = {
    openKeys: [],
    selectedKeys: []
  }

  componentDidMount() {
    const pathname = this.props.location.pathname
    console.log('pathname', pathname)

    let index = pathname.lastIndexOf('/')
    const openKeys = [pathname.slice(0, index)]
    this.setState({
      selectedKeys: [pathname],
      openKeys
    })
  }

  renderMenu = data => {
    const renderRoute = (item, routeContextPath) => {
      let newContextPath = item.path
        ? `${routeContextPath}/${item.path}`
        : routeContextPath

      //   console.log('newContextPath', newContextPath)
      if (item.childRoutes) {
        return (
          <SubMenu
            title={
              <span>
                {' '}
                {item.icon && <Icon type={item.icon} />}{' '}
                <span> {item.name} </span>{' '}
              </span>
            }
            key={newContextPath}
          >
            {item.childRoutes.map(r => renderRoute(r, newContextPath))}{' '}
          </SubMenu>
        )
      } else {
        return (
          item.name && (
            <Menu.Item key={newContextPath}>
              <NavLink to={newContextPath}>
                {' '}
                {item.icon && <Icon type={item.icon} />}{' '}
                <span> {item.name} </span>{' '}
              </NavLink>{' '}
            </Menu.Item>
          )
        )
      }
    }
    return data.childRoutes.map(d => renderRoute(d, '/admin'))
  }

  onOpenChange = openKeys => {
    const latestOpenKey = openKeys.find(key => this.state.openKeys.indexOf(key) === -1)
    if(openKeys.indexOf(latestOpenKey) === -1) {
      this.setState({ openKeys })
    } else {
      this.setState({
        openKeys: latestOpenKey ? [latestOpenKey] : []
      })
    }
  }

  render() {
    const { openKeys, selectedKeys } = this.state
    // console.log("this.props", this.props);
    // console.log('render', selectedKeys)

    return (
      <div
        style={{
          height: '100vh',
          marginTop: '.6vh'
        }}
      >
        <Menu
          openKeys={openKeys} // 当前展开的 SubMenu 菜单项 key 数组
          selectedKeys={selectedKeys} // 当前选中的菜单项 key 数组
          onOpenChange={this.onOpenChange} // SubMenu 展开/关闭的回调
          onClick={({ key }) =>
            this.setState(
              {
                selectedKeys: [key]
              },
              () => {
                console.log('setState', this.state.selectedKeys)
              }
            )
          }
          theme="dark"
          mode="inline"
        >
          {this.renderMenu(routes)}{' '}
        </Menu>{' '}
      </div>
    )
  }
}

export default SiderNav
