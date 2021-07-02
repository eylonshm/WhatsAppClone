import * as actionTypes from './actionsTypes'

export const setCurrentChat = (chatID) => {
    return {
        type: actionTypes.SET_CURRENT_CHAT,
        currentChatID: chatID,
    }
}
