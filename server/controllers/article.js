const ArticleModel = require('../models/Article')
const CategoryModel = require('../models/Category')
const TagModel = require('../models/Tag')

const { checkAuth } = require('../lib/token')

module.exports = {
  // 创建一条文章
  async create(req, res) {
    const isAuth = checkAuth(req, res)
    if (isAuth) {
      const { title, content, categories, tags } = req.body
      const categoriesId = [],
        tagsId = []
      for (let i = 0; i < categories.length; i++) {
        const findCategory = await CategoryModel.findOne({
          name: categories[i]
        })
        categoriesId.push(findCategory._id)
      }
      for (let i = 0; i < tags.length; i++) {
        const findtag = await TagModel.findOne({ name: tags[i] })
        tagsId.push(findtag._id)
      }
      const model = await ArticleModel.create({
        title,
        content,
        tags: tagsId,
        categories: categoriesId
      })
      res.send(model)
    }
  },

  // 更新文章
  async update(req, res) {
    const isAuth = checkAuth(req, res)
    if (isAuth) {
      const { showOrder, title, content, categories, tags } = req.body
      if (showOrder !== undefined) {
        // 文章设置置顶
        await ArticleModel.update({ _id: req.params.id }, { showOrder })
        res.send({ code: 200, message: '文章置顶设置成功' })
      } else {
        console.log('修改文章', req.body)
        const categoriesId = [],
          tagsId = []
        for (let i = 0; i < categories.length; i++) {
          const findCategory = await CategoryModel.findOne({
            name: categories[i]
          })
          categoriesId.push(findCategory._id)
        }
        for (let i = 0; i < tags.length; i++) {
          const findtag = await TagModel.findOne({ name: tags[i] })
          tagsId.push(findtag._id)
        }

        await ArticleModel.findOneAndUpdate(
          { _id: req.params.id },
          {
            title,
            content,
            tags: tagsId,
            categories: categoriesId
          }
        )
        res.send({ code: 200, message: '文章修改成功' })
      }
    }
  },

  // 根据id获取文章详情
  async getArticleById(req, res) {
    const data = await ArticleModel.findById(req.params.id).populate([
      'categories',
      'tags'
    ])
    res.send({ data })
  },

  // 获取所有文章列表
  async getArticleList(req, res) {
    let { page = 1, pageSize = 10, title, tag, category, fetchTop } = req.query

    let skip = page - 1 < 0 ? 0 : (page - 1) * 10
    let responseData = {
      total: 0,
      rows: []
    }
    await ArticleModel.count().then(count => {
      responseData.total = count
      ArticleModel.find()
        .populate(['categories', 'tags'])
        .skip(skip)
        .limit(Number(pageSize))
        .then(result => {
          responseData.rows = result
          res.send({ code: 200, responseData })
        })
    })
  },

  // 删除一条文章
  async delete(req, res) {
    const isAuth = checkAuth(req, res)
    if (isAuth) {
      // console.log('isAuth')
      await ArticleModel.findByIdAndDelete(req.params.id)
      res.send({
        code: 200,
        message: '文章删除成功'
      })
    }
  }
}
