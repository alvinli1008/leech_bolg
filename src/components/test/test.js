
const axios = require('axios')
const params = {
    "username": "admin",
    "password": "123456"
}

axios.post('http://localhost:3001/admin/api/login', params).then(res => {
    console.log('axios.post', res.status)
  })