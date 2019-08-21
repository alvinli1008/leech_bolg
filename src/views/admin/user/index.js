import React, { Component } from 'react'
import { getCommentsCount } from '../../../lib'
import moment from 'moment'
import { Table, Button, Modal, message, Badge } from 'antd'

class UserManage extends Component {
    state = {
        list: [],
        pagination: {},
        loading: false
    }

    componentDidMount() {
        console.log('componentDidMount, user')
        this.fetchList({ page: 1 })
    }

    getColumns = () => {
        return [
            {
                title: '用户名',
                dataIndex: 'username'
            },
            {
                title: '评论数',
                dataIndex: 'comments',
                render: (text, record) => {
                    console.log('text', record)
                    // const count = getCommentsCount(text)
                    // return count !== 0 ? <Badge count={count} style={{ backgroundColor: '#52c41a' }} /> : count
                },
                sorter: (a, b) => getCommentsCount(a.comments) - getCommentsCount(b.comments)
            },
            {
                title: '注册时间',
                dataIndex: 'createdAt',
                sorter: (a, b) => (moment(a.createdAt).isBefore(b.createdAt) ? 1 : 0)
            },
            {
                title: '操作',
                render: (text, record) => (
                    <Button type="danger" onClick={() => this.handleDelete(record._id, record.username)}>
                        删除
                    </Button>
                )
            }
        ]
    }

    fetchList = ({ current = 1, pageSize = 10, ...query }) => {
        this.setState({ loading: true })
        this.axios.get('/user/getUserList', { params: { page: current, pageSize, ...query } }).then(res => {
            const { total, rows } = res.responseData
            console.log('rows', rows)
            const pagination = {
                current,
                pageSize,
                total
            }
            this.setState({ list: rows, pagination, loading: false })
        })
    }

    handleChange = pagination => {
        this.fetchList({ ...pagination, ...this.state.query })
    }

    handleDelete = (userId, username) => {
        Modal.confirm({
            title: '您确定删除该用户？此操作不可恢复！',
            content: `用户, ${username}`,
            onOk: () => {
                this.axios.delete(`/user/delete/${userId}`).then(res => {
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
        return (
            <div>
               <Table 
                    rowKey={record => record._id}
                    bordered
                    columns={this.getColumns()}
                    loading={loading}
                    dataSource={list}
                    pagination={pagination}
                    onChange={this.handleChange}
               />
            </div>
        )
    }
}
export default UserManage