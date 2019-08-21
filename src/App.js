import React, { Component, Suspense } from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'

import routes from './routes/config'
import Loading from './components/helper/Loading'
import { getTags, getCategories } from './redux/article/actions'
import { getWindowWidth } from './redux/common/actions'
import './App.css';

@connect(state => state.user,
  { getTags, getCategories, getWindowWidth }
)
class Root extends Component {
  /**
   * 根据路由表生成路由组件
   * @param {Array} routes - 路由配置表
   * @param {String} contextPath - 父级路径。比如后台 admin...
   */
  componentDidMount() {
    this.props.getTags()
    this.props.getCategories()
    this.props.getWindowWidth()
  }
  renderRoutes(routes, contextPath) {
    const children = []

    const renderRoute = (item, routeContextPath) => {
    // console.log('renderRoute', this.props)
      let newContextPath = item.path ? `${routeContextPath}/${item.path}` : routeContextPath
      newContextPath = newContextPath.replace(/\/+/g, '/')

      if (newContextPath.includes('admin') && this.props.auth !== 1) {
        console.log('redirect', this.props.auth)
        item = {
          ...item,
          component: () => <Redirect to="/login" />,
          children: []
        }
      }

      if (item.component && item.childRoutes) {
        const childRoutes = this.renderRoutes(item.childRoutes, newContextPath)
        children.push(
          <Route
            key={newContextPath}
            render={props => <item.component {...props}>{childRoutes}</item.component>}
            path={newContextPath}
          />
        )
      } else if (item.component) {
        if (typeof item.component === 'function') {
          children.push(<Route key={newContextPath} component={item.component} path={newContextPath} exact/>)
        } else {
          children.push(<Route key={newContextPath} component={() => <item.component />} path={newContextPath} exact/>)
        }
      } else if (item.childRoutes) {
        item.childRoutes.forEach(r => renderRoute(r, newContextPath))
      }
    }

    routes.forEach(item => renderRoute(item, contextPath))

    return <Switch>{children}</Switch>
  }
  render() {
    const children = this.renderRoutes(routes, '/')    
    return (
      <BrowserRouter>
        <Suspense fallback={<Loading />}>{children}</Suspense>
      </BrowserRouter>
    )
  }
}

export default Root
