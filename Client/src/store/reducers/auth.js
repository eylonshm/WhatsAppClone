import * as actionTypes from '../actions/actionsTypes'
import { udpateObject } from '../utility/utility'

const initialState = {
  user: null,
}

const setUser = (state, action) => {
  // if (action.user === null) return { user: null }
  console.log(`Setting User`)
  // console.log(action.user.uid)
  return udpateObject(state, { user: action.user })
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SET_USER:
      return setUser(state, action)
    default:
      return state
  }
}

export default reducer
