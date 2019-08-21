const express = require('express')
const UserController = require('../controllers/user')
const router = express.Router({
  mergeParams: true // ?
})

// router.post('/comment', UserController.comment)  // 创建评论
// router.post('/reply', UserController.reply)  // 创建回复
// router.put('/:id', UserController.updateUser)  // 更新账户信息
router.get('/getUserList', UserController.getUserList)  // 获取用户列表
router.delete('/delete/:id', UserController.delete)  // 删除用户

module.exports = router