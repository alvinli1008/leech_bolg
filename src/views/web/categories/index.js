import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Badge, Tag } from 'antd'

import './index.scss'
import { Link } from 'react-router-dom'

@connect(state => ({
  categoryList: state.article,
  colorList: state.common.colorList
}))
class Categories extends Component {
  render() {
    console.log('categoryList', this.props)

    const { categoryList, colorList } = this.props
    console.log('cateList', categoryList)
    const cateList = categoryList.categoryList
    return (
      <div className="content-inner-wrapper categories">
        <h2 className="title">Categories</h2>
        <p className="category-all-title">{`${
          cateList.length
        } categories in total`}</p>

        <div className="categories-list">
          {cateList.map((item, i) => (
            <Badge count={item.count} key={item.name}>
              <Tag color={colorList[i]}>
                <Link to={`/categories/${item.name}`}>{item.name}</Link>
              </Tag>
            </Badge>
          ))}
        </div>
      </div>
    )
  }
}

export default Categories
