// const { Article: ArticleModel, Category: CatetoryModel } = require('../models')

const ArticleModel = require('../models/Article')
const CatetoryModel = require('../models/Category')

module.exports = {
    async getCategories(req, res) {
        const Categories = await CatetoryModel.find().populate('count')
        const data = Categories.map(item => {
            return {
                id: item._id,
                name: item.name,
                count: item.count.length
            }
        })
        return res.send({
            code: 200,
            data
        })
    },

    async getArticlesByCate(req, res) {
        console.log('getArticlesByCate', req.query)
        let { page = 1, pageSize = 15, name } = req.query,
        offset = (page - 1) * pageSize

        pageSize = parseInt(pageSize)
        let responseData = {
            total: 0,
            rows: []
          }
        // 根据 name 找 CatetoryModel 的 _id
        const cate = await CatetoryModel.findOne({ name })
        console.log('cate', cate)

        await ArticleModel.find()
            .where({ categories: { $in: [`${cate._id}`]}})  // .where('tags').in([`${tag._id}`])
            .count().then(count => {
                console.log('count', count)
                responseData.total = count
                ArticleModel.find()
                    .where({ categories: { $in: [`${cate._id}`]}})
                    .populate(['tags', 'categories'])
                    .skip(offset)
                    .limit(parseInt(pageSize))
                    .then(result => {
                        console.log('result', result)
                        responseData.rows = result
                        res.send({ responseData })
                    })
            })
    }
}