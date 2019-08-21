import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Pagination } from 'antd'

@connect(state => ({
    windowWidth: state.common.windowWidth
}))
class BlogPagination extends Component {

    static defaultProps = {
        pageSize: 10
    }

    render() {
        const { total, current, onChange, pageSize } = this.props
        console.log('Pagination', this.props)
        console.log(this.props)
        return (
            <div className="pagination">
                <Pagination current={current} total={total}  onChange={onChange} pageSize={pageSize} simple={this.props.windowWidth < 736} />
            </div>
        )
    }
}
export default BlogPagination