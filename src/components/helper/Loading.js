import React from 'react'
import ReactDOM from 'react-dom'
import { Spin, Icon } from 'antd'

const loadingRoot = document.getElementById('component-loading')
const antIcon = <Icon type="loading" style={{ fontSize: 24 }} spin />

const SpinStype = {
  position: 'absolute',
  right: '20px',
  top: '20px'
}

export const SpinLoading = () => {
  return ReactDOM.createPortal(
    <Spin indicator={antIcon} style={SpinStype} />,
    loadingRoot
  )
}

const Loading = () => <div>loading...</div>

export default Loading
