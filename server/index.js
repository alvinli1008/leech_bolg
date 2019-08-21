const express = require('express')

const app = express()

app.use(require('cors')())
app.use(express.json())
app.use('/uploads', express.static(__dirname + '/uploads'))

require('./plugins/db')(app)
require('./routes/')(app)
require('./routes/test')(app)

app.listen(3001, () => {
  console.log('http://localhost:3001')
})
