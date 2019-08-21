import React, { Component } from 'react'
import SimpleMDE from 'simplemde'
import 'simplemde/dist/simplemde.min.css'
import { translateMarkdown } from '@/lib/index'

import { Input, Button, Modal } from 'antd'

import SelectCate from './components/Cate'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

@withRouter
@connect(state => state.article)
class Edit extends Component {
    state = {
      value: '',
      title: '',
      tagList: [],
      categoryList: [],
      isEdit: false  // 组件状态 更新或创建
    }
  componentDidMount() {
    this.smde = new SimpleMDE({
      element: document.getElementById('editor').childElementCount,
      autofocus: true,
      autosave: {
        enabled: true,
        uniqueId: 'demo', //必须设置
        delay: 1000 //时间间隔默认 10s
      },
      renderingConfig: {
        codeSyntaxHighlighting: true
      },
      previewRender: translateMarkdown,
    })

    if (this.props.history.location.state) {
      console.log('收到了', this.props.history)
      const { articleId } = this.props.history.location.state
      this.axios.get(`/article/get/${articleId}`).then(res => {
        console.log('res', res)        
        const { title, tags, categories, content } = res.data
        this.smde.value(content)
        const tagList = tags.map(d => d.name)
        const categoryList = categories.map(d => d.name)
        this.setState({ title, tagList, categoryList, isEdit: true, articleId })
      })
    }
  }

  handleSubmit = () => {
    const tags = this.$tagRef.getResult()
    const categories = this.$categoryRef.getResult()
    let params = {
      title: this.state.title,
      content: this.smde.value(),
      categories,
      tags
    }
    console.log('handleSubmit', params)
    if(this.state.isEdit) {
      const { articleId } = this.state
      this.axios.put(`article/update/${articleId}`, { ...params }).then(res => {
        Modal.confirm({
          'title': '文章修改成功！是否查看详情？',
          onOk: () => this.props.history.push(`/article/${articleId}`)
        })
      })
    } else {
      console.log('else')
      this.axios.post('/article/create', params).then(res => {
        console.log('create', res)
        Modal.confirm({
          title: '文章创建成功！是否立即查看？',
          onOk: () => this.props.history.push(`/article/${res._id}`)
        })
        console.log('create final', res)
      })
    }
  }


  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value })
  }
  render() {
    const { title, value, categoryList, tagList, isEdit } = this.state

    return (
      <div className="edit">
        <div className="blog-formItem">
          <span className="label">标题:</span>
          <Input 
            placeholder="请输入文章标题"
            className="title-input"
            name="title"
            value={title}
            onChange={this.handleChange}
          />
        </div>
        <SelectCate 
          type="category"
          showNum={10}
          onRef={el => (this.$categoryRef = el)}
          list={categoryList}
          isEdit={isEdit}
        />
        <SelectCate 
          type="tag"
          showNum={12}
          onRef={el => (this.$tagRef = el)}
          list={tagList}
          isEdit={isEdit}
        />
        <br />
        <textarea id="editor" defaultValue={value} />
        <Button onClick={this.handleSubmit} type="primary">
          {isEdit ? '更新' : '创建'}
        </Button>
      </div>
    )
  }
}

export default Edit