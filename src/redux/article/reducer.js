import * as constants from '../constans'

//state
const defaultState = {
  categoryList: [],
  tagList: [],
  recentList: []
}

// reducer
export const demoReducer = (state = defaultState, action) => {
  const { type, payload } = action
  switch (type) {
    case constants.CATEGORY_GETLIST:
      return { ...state, categoryList: payload }
    case constants.TAG_GETLIST:
      return { ...state, tagList: payload }

    default:
      return state
  }
}

export default demoReducer
