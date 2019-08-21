import React, { Component } from 'react'

export default class Layout extends Component {
    render() {
        return (
            <div>
                example
                {this.props.children}
            </div>
        )
    }
}
