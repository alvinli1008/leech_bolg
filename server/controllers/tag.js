// const { Tag: TagModel, Article: ArticleModel, Category: CategoryModel } = require('../models')

const TagModel = require('../models/Tag')
const ArticleModel = require('../models/Article')

module.exports = {
    async getTags(req, res) {
        const Tags = await TagModel.find().populate('count')
        const data = Tags.map(item => {
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

    async getArticlesByTag(req, res) {
        console.log('getArticlesByTag', req.query)
        let { page = 1, pageSize = 15, name } = req.query,
        offset = (page - 1) * pageSize

        pageSize = parseInt(pageSize)
        let responseData = {
            total: 0,
            rows: []
          }
        // 根据 name 找 tag 的 _id
        const tag = await TagModel.findOne({ name })

        await ArticleModel.find()
            .where({ tags: { $in: [`${tag._id}`]}})  // .where('tags').in([`${tag._id}`])
            .count().then(count => {
                responseData.total = count
                ArticleModel.find()
                    .where({ tags: { $in: [`${tag._id}`]}})
                    .populate(['tags', 'categories'])
                    .skip(offset)
                    .limit(parseInt(pageSize))
                    .then(result => {
                        // console.log('result', result)
                        responseData.rows = result
                        res.send({ responseData })
                    })
            })
    }
}