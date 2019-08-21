import React, { Component, Fragment } from 'react'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import './index.scss'

import { Icon, Divider, Empty, Drawer } from 'antd'
import { translateMarkdown, decodeQuery, getCommentsCount } from '../../../lib'
import { openDrawer, closeDrawer } from '../../../redux/common/actions'

import Tags from '../Tags'
import Preview from './preview'
import Loading from '../../../components/helper/Loading'
import BlogPagination from '../../../components/web/pagination'

const NoDataDesc = ({ keyword }) => (
    <Fragment>
        不存在标题中含义 <span className="keyword">{keyword}</span> 的文章！
    </Fragment>
)

@connect(state => ({
    drawerVisible: state.common.drawerVisible,
    windowWidth: state.common.windowWidth
}), 
    { openDrawer, closeDrawer }
)
@withRouter
class Home extends Component {
    state = {
        list: [],
        total: 0,
        current: 1,
        loading: false
    }

    componentDidMount() {
        console.log('componentDidMount', this.props)
        const params = decodeQuery(this.props.location.search)
        this.fetchList(params)
    }

    fetchList = ({ page, title: keyword }) => {
        this.setState({ loading: true })
        this.axios.get('/article/getList', { params: { page, pageSize: 10, title: keyword }})
            .then(res => {
                console.log('homeaxios', res)
                const list = res.responseData.rows
                list.forEach(item => {
                    let index = item.content.indexOf('!--more--')
                    item.description = translateMarkdown(item.content.slice(0, index))
                })
                this.setState({list, total: res.responseData.total, loading: false})
            })
            .catch(e => this.setState({ loading: false }))
    }
    // 跳转到文章详情
    jumpTo(id) {
        this.props.history.push(`article/${id}`)
    }

    handelPageChange = page =>  {
        document.querySelector('.content-wrapper').scrollTop = 0
        let params = { ...decodeQuery(this.props.location.search), page}
        console.log('handelPageChange', params)
        let url 
        Object.entries(params).forEach(item => {
            url = !url ? `?${item[0]}=${item[1]}` : `${url}&${item[0]}=${item[1]}`
        })
        console.log('url', url)
        this.setState({ page, current: page }, this.props.history.push(url))
        this.fetchList({ page })
    }
    render() {
        // console.log('home', this.state)
        // console.log('homeprops', this.props)
        const { list, loading, total, current } = this.state
        return (
            <div className="content-inner-wrapper home">
               {loading ? (
                   <Loading />
               ) : (
                   <Fragment>
                        <ul className="ul-list">
                            {list.map(item => (
                                <li key={item._id} className="ul-list-item">
                                    <Divider orientation="left">
                                        <span className="title" onClick={() => this.jumpTo(item._id)}>
                                            {item.title}
                                        </span>
                                    </Divider>

                                    <div 
                                        onClick={() => this.jumpTo(item._id)}
                                        className="article-detail description"
                                        dangerouslySetInnerHTML={{ __html: item.description }}
                                    />

                                    <div>
                                        <Icon type="message" style={{ marginRight: 7 }} />
                                        {getCommentsCount(item.comments)}
                                        <Tags type="tags" list={item.tags} />
                                        <Tags type="categories" list={item.categories} />
                                    </div>
                                </li>
                            ))}
                        </ul>
                        {list.length > 0 ? (
                       <Fragment>
                            {list.length < total && (
                                <BlogPagination current={parseInt(current) || 1} onChange={this.handelPageChange} total={total}  />
                            )}
                            {this.props.windowWidth > 1300 ? (
                                <Preview list={list} />
                            ) : (
                                <Fragment>
                                    <div className="drawer-btn" onClick={this.props.openDrawer}>
                                        <Icon type="menu-o" className="nav-phone-icon" />
                                    </div>
                                    <Drawer
                                        title="文章导航"
                                        placement="right"
                                        closable={false}
                                        onClose={this.props.closeDrawer}
                                        visible={this.props.drawerVisible}
                                    >
                                        <Preview list={list} />
                                    </Drawer>
                                </Fragment>
                            )}
                       </Fragment>
                   ) : (
                        <div className="no-data"> 
                            <Empty description={<NoDataDesc keyword={"aaa"} />} />
                        </div>
                   )}
                   </Fragment>
               )}
            </div>
        )
    }
}
export default Home