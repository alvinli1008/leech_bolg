import React, { Component } from 'react'
import { SpinLoading } from './Loading'

export const asyncComponent = importComponent =>
  class AsyncComponent extends Component {
    constructor(props) {
      super(props)
      this.state = { component: null }
    }

    async componentDidMount() {
      const { default: component } = await importComponent()
      this.setState({ component })
    }

    render() {
      const RenderComponent = this.state.component
      return RenderComponent ? (
        <RenderComponent {...this.props} />
      ) : (
        <SpinLoading />
      )
    }
  }

export default asyncComponent
