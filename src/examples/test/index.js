import React, { Component } from 'react'

export default class Test extends Component {
    componentDidMount() {
        this.axios.get('/article/getList', { params: { page: 1 } }).then(res => {
            console.log('list', res.responseData)
          })
        }    
    render() {
        console.log('aaa')
        return (
            <div>
                123
            </div>
        )
    }
}
