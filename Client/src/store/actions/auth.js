import * as actionTypes from './actionsTypes'

export const setUser = (user = null) => {
  if (!user) return { type: actionTypes.SET_USER }
  return {
    type: actionTypes.SET_USER,
    user: user,
  }
}
