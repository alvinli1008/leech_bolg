import React, { Component, Fragment } from 'react'

import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { translateMarkdown, getCommentsCount } from '../../../lib'
import { openDrawer, closeDrawer, generateColorMap } from '../../../redux/common/actions'
import Loading from '../../../components/helper/Loading';
import Tags from '../Tags'
import { Drawer, Icon, Divider } from 'antd'


@withRouter
@connect(state => ({
    windowWidth: state.common.windowWidth,
    drawerVisible: state.common.drawerVisible
}),
    { openDrawer, closeDrawer, generateColorMap }
)
class ArticleDetail extends Component {
    state = {
        title: '',
        content: '',
        tags: [],
        categories: [],
        postTime: '',
        commentList: [],
        loading: false
    }

    componentDidMount() {
        const id = this.props.match.params.id
        console.log('componentDidMount', id)
     
        this.fetchData(id)
    }

    fetchData = id => {
        this.setState({ loading: true })
        this.axios.get(`/article/get/${id}`)
            .then(res => {
                console.log('res', res.data)
                const { title, tags, categories, comments, createAt } = res.data
                const content = translateMarkdown(res.data.content)
                this.setState({
                    title,
                    content,
                    tags,
                    categories,
                    loading: false
                })
            })
    }

    render() {
        const { title, content, tags, categories, loading, postTime, commentList } = this.state
        return (
            <div className="content-inner-wrapper article">
                Article
                {loading ? (
                    <Loading />
                ) : (
                    <React.Fragment>
                        <div>
                            <h1>{title}</h1>

                            <div>
                                <i className="iconfont icon-post" />
                                &nbsp; Posted on &nbsp;
                                <span>{postTime}</span>
                                <Tags type="tags" list={tags} />
                                <Tags type="categories" list={categories} />
                                <Divider type="vertical" />
                                <Icon type="message" style={{ marginRight: 7 }} />
                                {getCommentsCount(commentList)}
                            </div>
                        </div>
                        
                        <div className="article-detail" dangerouslySetInnerHTML={{ __html: content }} />

                    </React.Fragment>
                )}
            </div>
        )
    }
}
export default ArticleDetail