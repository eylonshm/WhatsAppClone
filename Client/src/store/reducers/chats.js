import * as actionTypes from '../actions/actionsTypes'
import { udpateObject } from '../utility/utility'

const initialState = {
    currentChatID: 'hhcMJFxzRBCp0kHPVtmZ',
}

const setCurrentChat = (state, action) => {
    console.log(action.currentChatID)
    return udpateObject(state, { currentChatID: action.currentChatID })
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.SET_CURRENT_CHAT:
            return setCurrentChat(state, action)
        default:
            return state
    }
}

export default reducer
