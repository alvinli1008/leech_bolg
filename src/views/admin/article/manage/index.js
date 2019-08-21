import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import './index.scss'

import { random, getCommentsCount } from '../../../../lib'
import { Table, Divider, Tag, Badge, Button, Modal, message } from 'antd'
import QueryForm from './queryForm'
import moment from 'moment'

@connect(state => ({
  tagList: state.article.tagList,
  colorList: state.common.colorList
}))
class Manager extends Component {
  state = {
    colorMap: {},
    list: [],
    pagination: {},
    total: 0,
    loading: false
  }
  componentDidMount() {
    const { colorList, tagList } = this.props
    let colorMap = {}
    tagList.forEach(item => {
      colorMap[item.name] = colorList[random(colorList)]
    })
    this.setState({ colorMap }, () => this.fetchList({ page: 1 }))
    console.log('componentDidMount', this.state)
  }

  getColumuns = () => {
    return [
      {
        title: '标题',
        dataIndex: 'title'
      },
      {
        title: '标签',
        dataIndex: 'tags',
        render: (text, record) => {
          return text.map(d => (
            <Tag color={this.state.colorMap[d.name]} key={d.name}>
              {d.name}
            </Tag>
          ))
        }
      },
      {
        title: '分类',
        dataIndex: 'categories',
        render: (text, record) => {
          return text.map(d => (
            <Tag color={'#2db7f5'} key={d._id}>{d.name}</Tag>
          ))
        }
      },
      {
        title: '评论数',
        dataIndex: 'comments',
        render: text => {
            const count = getCommentsCount(text)
            return count !== 0 ? <Badge count={count} style={{ backgroundColor: '#52c41a'}} /> : count
        },
        sorter: (a, b) => getCommentsCount(a.comments) - getCommentsCount(b.comments)
      },
      {
        title: '发布时间',
        dataIndex: 'createAt',
        sorter: (a, b) => (moment(a.createdAt).isBefore(b.createdAt) ? 1 : -1)
      },
      {
        title: '修改时间',
        dataIndex: 'updateAt',
        sorter: (a, b) => (moment(a.updatedAt).isBefore(b.updatedAt) ? 1 : -1)
      },
      {
        title: '置顶',
        dataIndex: 'showOrder',
        render: (text, record) =>
          text ? (
            <Button
              size="small"
              type="danger"
              onClick={() => this.setTop(record)}
            >
              取消置顶
            </Button>
          ) : (
            <Button
              size="small"
              type="dashed"
              onClick={() => this.setTop(record)}
            >
              置顶文章
            </Button>
          )
      },
      {
        title: '操作',
        render: (text, record) => {
          return (
            <div className="action">
              <Link to={`/article/${record._id}`}>查看</Link>
              <Divider type="vertical" />
              <Link to={{ pathname: '/admin/articles/edit', state: { articleId: record._id }}}>编辑</Link>
              <Divider type="vertical" />
              <span className="btn-delete" onClick={() => this.handleDelete(record._id, record.title)}>删除</span>
            </div>
          )
        }
      }
    ]
  }

  /**
   * 设置置顶文章
   * @memberof Manager
   */
  setTop = record => {
    const showOrder = record.showOrder ? 0 : 1
    this.axios.put(`/article/update/${record._id}`, {
      showOrder
    }).then(() => {
      const list = this.state.list
      const target = list.find(d => d._id === record._id)
      target.showOrder = showOrder
      this.setState({ list })
    })
  }

  fetchList = ({ current = 1, pageSize = 10, ...query }) => {
    this.setState({ loading: true })
    this.axios.get('/article/getList', { params: { page: current, pageSize, ...query } }).then(res => {
      const { total, rows } = res.responseData
      const pagination = {
        current,
        pageSize,
        total: total
      }
      console.log('list', res.responseData)
      this.setState({ list: rows, pagination, loading: false })
    })
  }

  handleChange = pagination => {
    this.fetchList({ ...pagination, ...this.state.query })
  }

  handleDelete = (articleId, title) => {
    Modal.confirm({
      title: '您确定删除该文章吗？此操作不可恢复!',
      content: `文章: ${title}`,
      onOk: () => {
        this.axios.delete(`/article/delete/${articleId}`).then(res => {
          if (res.code === 200) {
            this.fetchList(this.state.pagination)
            message.success(res.message)
          }
        })
      }
    })
  }
  render() {
    const { list, pagination, loading } = this.state
    console.log('list', list)
    return (
      <div className="manager">
        <QueryForm />
        <Table
          // rowKey="id"
          rowKey={record => record._id}
          bordered
          loading={loading}
          columns={this.getColumuns()}
          dataSource={list}
          pagination={pagination}
          onChange={this.handleChange}
        />
      </div>
    )
  }
}

export default Manager
