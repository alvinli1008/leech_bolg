import * as constants from '../constans'

const defaultState = {
    isLogin: false
}

export const Reducer = (state = defaultState, action) => {
    switch (action.type) {
        case constants.LOGIN: 
            return { ...state, isLogin: true }
        case constants.LOGINOUT:
            return { ...state, isLogin: false }

        default:
            return state
    }
}

export default Reducer