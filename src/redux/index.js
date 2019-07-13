import { createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import { createLogger } from 'redux-logger'

import rootReducer from './rootReducers'
const initialState = {}

const middleware = [ thunk ]
if (process.env.NODE_ENV !== 'production') {
    middleware.push(createLogger())
}

const store = createStore(
    rootReducer,
    initialState,
    compose(
        composeWithDevTools(applyMiddleware(...middleware))
    )
)

export default store