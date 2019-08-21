import { combineReducers } from 'redux'

import demo from './demo/reducer'
import user from './user/reducer'
import article from './article/reducer'
import common from './common/reducer'

export default combineReducers({
    demo,
    user,
    common,
    article
})