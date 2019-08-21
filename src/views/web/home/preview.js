import React, { Fragment } from 'react'
import { Link } from 'react-router-dom'
import { Divider } from 'antd'

const Previw = ({ list }) => {
  console.log('Previw', list)
  return (
    <ul className="preview">
      <Divider>预览</Divider>
      {list.map(item => (
        <li key={item._id}>
          <Link to={`/article/${item._id}`}>{item.title}</Link>
        </li>
      ))}
    </ul>
  )
}

export default Previw
