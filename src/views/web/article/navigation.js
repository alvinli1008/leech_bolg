import React from 'react'
import { Anchor } from 'antd'
const { Link } = Anchor

// 转化为锚点可跳转的路径
function transferHref(str) {
    let v1 = str.replace(/(\s)|(,)/g, '-')
    let v2 = v1.replace(/[./()]/g, '')
    return `#${v2.replace(/-+/g, '-')}`
}