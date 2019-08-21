import React, { Component } from 'react'
import { Input, Icon, Row, Col } from 'antd'
import { withRouter } from 'react-router-dom'

@withRouter
class SearchButton extends Component {
  state = {
    value: ''
  }

  handleSubmit = () => {
    // if (keyword) props.history.push(`/?page=1&keyword=${keyword}`)
  }

  handleChange = e => {
    this.setState({
      value: e.target.value
    })
  }

  handlePressEnter = e => {
    e.target.blur()
  }

  render() {
    return (
      <Row id="search-box">
        <Col>
          <Icon type="serch" className="anticon" />
          <Input
            type="text"
            value={this.state.value}
            onChange={this.handleChange}
            onBlur={this.handleSubmit}
            onPressEnter={this.handlePressEnter}
            className="header=search"
            placeholder="搜素文章"
            style={{ width: 200 }}
          />
        </Col>
      </Row>
    )
  }
}

export default SearchButton
