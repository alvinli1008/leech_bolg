import React, { Component } from 'react'

import { Link, withRouter } from 'react-router-dom'
import { Menu, Icon } from 'antd'

@withRouter
class Nav extends Component {
  static defaultProps = {
    mode: 'horizontal'
  }
  render() {
    const { navList, mode } = this.props
    return (
      <Menu
        mode={mode}
        selectedKeys={[this.props.location.pathname]}
        className="header-nav"
      >
        {navList.map(nav => (
          <Menu.Item key={nav.link}>
            <Link to={nav.link}>
              {nav.icon && <Icon type={nav.icon} />}
              <span>{nav.title}</span>
            </Link>
          </Menu.Item>
        ))}
      </Menu>
    )
  }
}

export default Nav
