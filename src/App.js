import React, { Component, Suspense } from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'

import routes from './routes/config'
import Loading from './components/Loading'
import './App.css';

@connect(state => ({
  isLogin: state.demo.isLogin
}))
class Root extends Component {

  renderRoutes(routes, contextPath) {
    const children = []

    const renderRoute = (item, routeContextPath) => {
      if (item.protected && !this.props.isLogin) {
        item = {
          ...item,
          component: () => <Redirect to="/admin.login" />,
          children: []
        }
      }

      let newContextPath
      if (/^\//.test(item.path)) {
        newContextPath = item.path
      } else {
        newContextPath = `${routeContextPath}/${item.path}`
      }
      newContextPath = newContextPath.replace(/\/+/g, '/')
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
        <Suspense fallback={<Loading />} >{children}</Suspense>
      </BrowserRouter>

    )
  }
}

export default Root
