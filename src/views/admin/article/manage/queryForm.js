import React, { Component } from 'react'

import { Button, Form, Input, Select, Checkbox } from 'antd'
import FormBuilder from '../../../../components/helper/FormBuilder'
import { connect } from 'react-redux'

// const RangePicker = DatePicker.RangePicker
const Option = Select.Option

@connect(state => state.article)
class QueryForm extends Component {
  getFormMeta = () => {
    return {
      colon: true,
      elements: [
        {
          key: 'title',
          label: '标题',
          widget: <Input placeholder="请输入文章标题" />
        },
        {
          key: 'tag',
          label: '标签',
          widget: (
            <Select className="form-select" allowClear>
              {this.props.tagList.map(item => (
                <Option key={item.name} value={item.name}>
                  {item.name}
                </Option>
              ))}
            </Select>
          )
        },
        {
          key: 'category',
          label: '分类',
          widget: (
            <Select className="form-select" allowClear>
              {this.props.categoryList.map(item => (
                <Option key={item.name} value={item.name}>
                  {item.name}
                </Option>
              ))}
            </Select>
          )
        },
        {
          key: 'fetchTop',
          label: '置顶文章',
          labelCol: 20,
          wrapperCol: 4,
          fromItemProps: { className: 'form-checkbox-wrap' },
          widget: <Checkbox />
        }
      ]
    }
  }

  handleSubmit = e => {
    e.preventDefault()
    this.props.form.validateFieldsAndScroll((errors, values) => {
      if (errors) return
      console.log('submit form:', values)
    })
  }
  render() {
    // console.log('querForm', this.props)
    return (
      <div className="query-form">
        <Form layout="inline" onSubmit={this.handleSubmit}>
          <FormBuilder meta={this.getFormMeta()} form={this.props.form}>
            <Button type="primary" htmlType="submit">
              检索
            </Button>
          </FormBuilder>
        </Form>
      </div>
    )
  }
}
export default Form.create()(QueryForm)
