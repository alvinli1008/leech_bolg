import React, { Component, Fragment } from 'react'
import './index.scss'

import { Link } from 'react-router-dom'
import { Timeline, Icon, Spin } from 'antd'
import BlogPagination from '../../../components/web/pagination'
import { groupBy } from '../../../lib'

class Archives extends Component {
  state = {
    list: [],
    total: 0,
    current: 1,
    loading: false
  }

  componentDidMount() {
    this.fetchList({ page: 1 })
  }

  fetchList = ({ page = 1 }) => {
    this.setState({ loading: true })
    this.axios
      .get('/article/getList', { params: { page, pageSize: 15 } })
      .then(res => {
        const { rows, total } = res.responseData
        // console.log('rows', rows)
        const list = groupBy(rows, item => item.createAt.slice(0, 4))
        console.log('list', list)
        this.setState({
          list,
          total,
          loading: false
        })
      })
      .catch(e => this.setState({ loading: false }))
  }

  handlePageChange = page => {
    // console.log('handlePageChange', page)
    this.setState({ page, current: page }, this.fetchList({ page }))
    // console.log('handlePagechange', this.state)
  }

  render() {
    // console.log('archives', this.state)
    const { list, page, total, loading, current } = this.state
    return (
      <div className="content-inner-wrapper archives">
        <Spin tip="Loading..." spinning={loading}>
          <Timeline>
            {list.map((d, i) => (
              <Fragment key={i}>
                {i === 0 && (
                  <Timeline.Item>
                    <span>{`Nice! ${total} posts in total. Keep on posting.`}</span>
                    <br />
                    <br />
                  </Timeline.Item>
                )}
                <Timeline.Item
                  dot={
                    <Icon type="clock-circle-o" style={{ fontSize: '16px' }} />
                  }
                  color="red"
                >
                  <div className="year">
                    {d[0]['createAt'].slice(0, 4)}
                    ...
                  </div>
                  <br />
                </Timeline.Item>

                {d.map(item => (
                  <Timeline.Item key={item._id}>
                    <span style={{ fontSize: '13px', marginRight: '16px' }}>
                      {item.createAt.slice(5, 10)}
                    </span>
                    <Link to={`/article/${item._id}`}>{item.title}</Link>
                  </Timeline.Item>
                ))}
              </Fragment>
            ))}
          </Timeline>

          {list.length < total && (
            <BlogPagination
              current={parseInt(current) || 1}
              onChange={this.handlePageChange}
              total={total}
              pageSize={15}
            />
          )}
        </Spin>
      </div>
    )
  }
}
export default Archives
