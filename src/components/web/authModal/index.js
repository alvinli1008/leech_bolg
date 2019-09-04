import React, { Component } from 'react'

import { connect } from 'react-redux'

import { Modal, Input, message, Button, Form, Alert, Checkbox } from 'antd'
import { login, register, } from '../../../redux/user/actions'

import { closeAuthModal, openAuthModal } from '../../../redux/common/actions'
import FormBuilder from '../../helper/FormBuilder'

const CheckboxGroup = Checkbox.Group

const options = [{ label: '用户名', value: 'changeUsername '}, { label: '密码', value: 'changePassword' }]

const formMeta = {
    colon: false, 
    labelCol: {
        xs: { span: 24 },
        sm: { span: 6 }
    },
    wrapperCol: {
        xs: { span: 24 },
        sm: { span: 18 }
    },
    elements: [
        {
            key: 'username',
            label: '用户名',
            widget: <Input placeholder="请输入用户名" />,
            rules: [{ required: true, message: 'Username is required' }]
        },
        {
            key: 'password',
            label: '密码',
            widget: <Input placeholder="请输入密码" type="password" />,
            rules: [{ required: true, message: 'Password is required' }]
        }
    ]
}

@connect(state => ({
    authModalVisible: state.common.authModalVisible,
    authModalType: state.common.authModalType,
    userInfo: state.user
}),
{
    login, register, closeAuthModal, openAuthModal
})
class AuthModal extends Component {
    state={
        type: 'login',
        checkboxList: [],
        formMeta: {
            elements: []
        }

    }

    componentDidMount() {
        if (this.props.authModalVisible) {
            this.props.form.resetFields()
            const formMeta = this.getFormMeta(this.props.authModalType)
            this.setState({
                formMeta,
                type: this.props.authModalType
            })
        }
    }

    handleSubmit = e => {
        e.preventDefault()
        this.props.form.validateFieldsAndScroll((errors, values) => {
          if (errors) return
          console.log('submit form:', values)
        const { authModalType, userInfo } = this.props
        console.log('handleSubmit', this.props)
        this.props[authModalType](values).then(res => {
            console.log(authModalType, res)
            if(res.code === 200) this.props.closeAuthModal()
        })
        })
      }

    handleClose = (type) => {
        console.log('handleClose', this.props)
        this.props.closeAuthModal(type)
    }
    render() {
        console.log('AuthModal', this.props)
        const { authModalVisible, authModalType, userInfo } = this.props
        const { type } = this.state
        const titleMap = {
            login: '登录',
            register: '注册',
            updateUser: '修改账户信息'
        }
        return (
           
            <Modal title={titleMap[authModalType]} width={460} footer={null} onCancel={this.handleClose} visible={authModalVisible}>
                <Form>
                    <FormBuilder meta={formMeta} form={this.props.form}/>
                    <Button type="primary" block htmlType="submit" onClick={this.handleSubmit} >
                        {titleMap[authModalType]}
                    </Button>
                </Form>
            </Modal>
        )
    }
}

export default Form.create()(AuthModal)