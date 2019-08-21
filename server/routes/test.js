module.exports = app => {
  const express = require('express')
  const router = express.Router({
    mergeParams: true // ?
  })

  router.get('/admin/test', async (req, res) => {
    res.send('hello test')
  })

  const TagModel = require('../models/Tag')
  // 创建一个tag
  router.post('/admin/api/tag/create', async (req, res) => {
    const { name } = req.body
    const model = await TagModel.create({
      name
    })
    res.send(model)
  })

  // 删除一个标签
  router.delete('/admin/api/tag/:id', async (req, res) => {
    await TagModel.findByIdAndDelete(req.params.id)
    res.send({
      success: true
    })
  })

  // 创建一条分类
  const CategoryModel = require('../models/Category')
  router.post('/admin/api/category/create', async (req, res) => {
    const { name } = req.body
    const model = await CategoryModel.create({
      name
    })
    res.send(model)
  })
  
   // 删除一个分类
   router.delete('/admin/api/category/:id', async (req, res) => {
    await CategoryModel.findByIdAndDelete(req.params.id)
    res.send({
      success: true
    })
  })
  app.use(router)
}
