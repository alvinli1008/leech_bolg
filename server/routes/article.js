const express = require('express')
const ArticleController = require('../controllers/article')
const router = express.Router({
  mergeParams: true // ?
})

router.post('/create', ArticleController.create)
router.put('/update/:id', ArticleController.update)
router.get('/get/:id', ArticleController.getArticleById)
router.get('/getList', ArticleController.getArticleList)
router.delete('/delete/:id', ArticleController.delete)

module.exports = router