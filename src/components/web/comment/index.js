import React, { Component } from 'react'

import {} from 'react-redux'
import { getCommentsCount } from '../../../lib'

import { Comment, Avatar, Form, Button, Divider, Input, Icon, Menu, Dropdown, message, Modal } from 'antd'
// import CommentList from 'list'

const { TextArea } = Input

const Editor = ({ onChange, onSubmit, submitting, value, articleId }) => (
    <div>
        <Form.Item>
            <TextArea rows={4} placeholder="说点什么..." onChange={onChange} value={value} />
        </Form.Item>
        <Form.Item>
            <div className="controls" >
                <i className="iconfont icon-tips" />
                <span>支持Markdown 语法</span>
                <Button className="" htmlType="submit" loading={submitting} onClick={onSubmit} type="primary" >
                    { articleId !== -1 ? '添加评论' : '留言'}
                </Button>
            </div>
        </Form.Item>
    </div>
)

class ArticleComment extends Component {
    render() {
        return (
            <div className="comment-wrapper">
                <div>
                    <span>{} 条评论</span>
                </div>
                
                <Comment 
                    content={
                        <Editor 
                            onChange={e => this.setState({value: e.target.value})}
                        //     onSubmit={handleSubmit}
                        //     submitting={submitting}
                        //     value={value}
                        //     articleId={articleId}
                        />
                    }
                />
            </div>
        )
    }
}
export default ArticleComment