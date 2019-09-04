import * as constants from '../constans'
import { groupBy, random } from '../../lib'

// state
const defaultState = {
  colorList: [
    'magenta',
    'blue',
    'red',
    'volcano',
    'orange',
    'gold',
    'lime',
    'green',
    'cyan',
    'geekblue',
    'purple'
  ], // 标签颜色
  colorMap: {},
  windowWidth: 0,
  drawerVisible: false,
  authModalVisible: false,
  authModalType: ''
}

// reducer
export const commonReducer = (state = defaultState, action) => {
  const { type, payload } = action
  switch (type) {
    case constants.COMMON_COLOR_MAP:
      const list = groupBy(payload, item => item.userId)
      const colorList = state.colorList
      let colorMap = {}
      list.forEach(item => {
        colorMap[item[0].userId] = colorList[random(colorList)]
        item[0]['replies'].forEach(d => {
          if (!colorMap[d.userId])
            colorMap[d.userId] = colorList[random(colorList)]
        })
      })
      return { ...state, colorMap }
    case constants.COMMON_GET_WINDOW_WIDTH:
      return {...state, windowWidth: payload}

    case constants.COMMON_OPEN_DRAWER:
      return { ...state, drawerVisible: true }
    case constants.COMMON_CLOSE_DRAWER:
      return { ...state, drawerVisible: false }
    case constants.AUTH_OPEN_AUTHMODAL:
      return { ...state, authModalVisible: true, authModalType: payload }
    case constants.AUTH_CLOSE_AUTHMODAL:
      return { ...state, authModalVisible: false, authModalType: ''}
    default:
      return state
  }
}

export default commonReducer
