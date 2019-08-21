const UserModel = require('../models/User')
const { createToken, checkAuth } = require('../lib/token')
// const require('http-')

module.exports = {
  async login(req, res) {
    const { username, password } = req.body
    console.log('req.body', username, password)
    // 1.根据用户名找用户
    const user = await UserModel.findOne({ username }).select('+password') // 加上 .select()让其返回 密码
    if (!user) {
      return res.status(400).send({
        message: '用户不存在'
      })
    }
    console.log('user', user)
    // 2.校验密码
    const isMatch = require('bcrypt').compareSync(password, user.password) // .compareSync()比较用户传过来的密码明文，数据库密文
    if (!isMatch) {
      return res.status(400).send({
        message: '密码错误'
      })
    }
    // 3.返回token
    const { auth } = user
    const token = createToken({ id: user._id, username: user.username, auth })
    res.send({
      message: '登录成功',
      status: 200,
      token
    })
  },

  async register(req, res) {
    const { username, password, auth } = req.body
    console.log(req.body)
    const user = await UserModel.findOne({ username }).select('+password')
    if (user) {
      res.send('用户已存在')
    } else {
      const model = await UserModel.create({
        username,
        password,
        auth
      })
      res.send(model)
    }
  },

  async getUserList(req, res) {
    const isAuth = checkAuth(req, res)
    if (isAuth) {
      let { page = 1, pageSize = 10 } = req.query

      let skip = page - 1 < 0 ? 0 : (page - 1) * 10
      let responseData = {
        total: 0,
        rows: []
      }
      await UserModel.count().then(count => {
        responseData.total = count
        UserModel.find()
          .skip(skip)
          .limit(parseInt(pageSize))
          .then(result => {
            responseData.rows = result
            res.send({ code: 200, responseData })
          })
      })
    }

    // let { page = 1, pageSize = 10 } = req.query

    // let skip = page - 1 < 0 ? 0 : (page - 1) * 10
    // let responseData = {
    //   total: 0,
    //   rows: []
    // }
    // await UserModel.count().then(count => {
    //   responseData.total = count
    //   UserModel.find()
    //     .skip(skip)
    //     .limit(parseInt(pageSize))
    //     .then(result => {
    //       responseData.rows = result
    //       res.send({ code: 200, responseData })
    //     })
    // })
  },

  async delete(req, res) {
    console.log('delete', req.params)

    const isAuth = checkAuth(req, res)
    if (isAuth) {

      await UserModel.findByIdAndDelete(req.params.id)
      res.send({
        code: 200,
        message: '成功删除用户'
      })
    }
  }
}
