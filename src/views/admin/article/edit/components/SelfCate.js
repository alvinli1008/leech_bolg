import React, { Component, Fragment } from 'react'

import { Tag, Input, Tooltip, Icon } from 'antd'

class SeleCate extends Component {
  state = {
    list: [],
    inputVisible: false,
    inputValue: ''
  }

  handleClose = removedTag => {
    const list = this.state.list.filter(tag => tag !== removedTag)
    console.log(list)
    this.setState({ list })
  }

  showInput = () => {
    this.setState({ inputVisible: true }, () => this.input.focus())
  }

  handleInputChange = e => {
    this.setState({ inputValue: e.target.value })
  }

  handleInputConfirm = () => {
    let { inputValue, list } = this.state
    const CommonlyList = this.props.CommonlyList

    if (
      inputValue &&
      list.indexOf(inputValue) === -1 
      && !CommonlyList.includes(inputValue)
    ) {
      list = [...list, inputValue]
    }
    this.setState({
      list,
      inputVisible: false,
      inputValue: ''
    })
  }

  saveInputRef = input => (this.input = input)

  render() {
    const { list, inputVisible, inputValue } = this.state
    return (
      <Fragment>
        {list.map((tag, index) => {
          const isLongTag = tag.length > 20
          const tagElem = (
            <Tag
              key={tag}
              closable={index !== 0}
              onClose={() => this.handleClose(tag)}
              color="#1890ff"
            >
              {isLongTag ? `${tag.slice(0, 20)}...` : tag}
            </Tag>
          )
          return isLongTag ? (
            <Tooltip title={tag} key={tag}>
              {tagElem}
            </Tooltip>
          ) : (
            tagElem
          )
        })}
        {inputVisible && (
          <Input
            ref={this.saveInputRef}
            type="text"
            size="small"
            style={{ width: 78 }}
            value={inputValue}
            onChange={this.handleInputChange}
            onBlur={this.handleInputConfirm}
            onPressEnter={this.handleInputConfirm}
          />
        )}
        {!inputVisible && (
          <Tag
            onClick={this.showInput}
            style={{ background: '#fff', borderStyle: 'dashed' }} >
            <Icon type="plus" /> New Tag
          </Tag>
        )}
      </Fragment>
    )
  }
}

export default SeleCate
