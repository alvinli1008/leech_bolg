import React, { Component } from 'react'
import './index.scss'

import { connect } from 'react-redux'
import avatar from '../../../assets/author_avatar.jpg'
import { Link }from 'react-router-dom'
import { Divider, Tag, Icon } from 'antd'

function random(colorList) {
    const len = colorList.length
    return Math.floor(Math.random() * len)
    
}

@connect( state => ({
    tagList: state.article.tagList,
    colorList: state.common.colorList
  }))
class BogSider extends Component {
    state = { showList: [] }

    async componentDidMount() {
        let showList = []
        const list = await this.fetchList(2)
        showList = list.length > 0 ? list: await this.fetchList(1)
        this.setState({ showList })
    }

    fetchList = async mode => {
        const queryParams = 
            mode === 1 ? { params: {page: 1, pageSize: 6 } } : { params: { page: 1, pageSize: 4, fetchTop: true } }
        const result = await this.axios.get('/article/getList', queryParams)
        // console.log('result', result.responseData)
        return result.responseData.rows
    }
    render() {
        // console.log('BogSider', this.props)
        const { tagList, colorList } = this.props
        const { showList } = this.state
        let title = showList[0] && showList[0].showOrder ? '热门文章' : '最近文章' 

        return (
            <div className="sider-wrapper">
                <img src={avatar} className="sider-avatar" alt="" />
                <h2 className="name">Leech</h2>
                <div>前端打造人员，威设宏伟！</div>
                <ul className="link-list">
                    <li>
                        <Icon type="github" />
                        <a target="_blank" rel="noreferrer noopener" href="https://github.com/leech">
                            github
                        </a>
                    </li>
                    <li>
                        <i className="iconfont icon-juejin" />
                        <a target="_blank" rel="noreferrer noopener" href="https://juejin.im/user/leech">
                            juejin
                        </a>
                    </li>
                </ul>

                <Divider orientation="left">{title}</Divider>
                <ul>
                    {showList.map(d => (
                        <li key={d._id}>
                            <Link to={`/article/${d._id}`}>{d.title}</Link>
                        </li>
                    ))}
                </ul>
                <Divider orientation="left">标签</Divider>
                <div>
                    {tagList.map((tag, i) => (
                        <Tag key={i} color={colorList[i] ? colorList[i] : colorList[random(colorList)]}>
                            <Link to={`/tags/${tag.name}`}>{tag.name}</Link>
                        </Tag>
                    ))}
                </div>
            </div>
        )
    }
}
export default BogSider