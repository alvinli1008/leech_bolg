import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { login } from '../../../redux/demo/actions'

@withRouter
@connect(
    null,
    { login }
)
class Login extends Component {
    login = async () => {
        
        await this.props.login()
        this.props.history.push('/')
    }

    render() {
        return (
            <div>
                Click button to login
                <button onClick={this.login}>login</button>
            </div>
        )
    }
}

export default Login