import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux'
import store from './redux'
import axios from './lib/axios'

import './index.css';
import App from './App';

import './style/reset.scss'
import './assets/iconfont/iconfont.css'
import './style/index.scss'


// 绑定 全局方法 axios
React.Component.prototype.axios = axios

ReactDOM.render(
    <Provider store={store} >
       <App />
    </Provider>,
    document.getElementById('root')
);
