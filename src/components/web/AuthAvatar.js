import React from 'react'
import { Avatar } from 'antd';
import avatar from '../../assets/author_avatar.jpg'

const AuthAvatar = ({ size = 'defalut' }) => {
    return <Avatar src={avatar} size={size} />
}
export default AuthAvatar