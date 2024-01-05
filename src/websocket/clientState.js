import { WS_CONFIRM_STATUS, WS_INIT, WS_SET_TO_CHAT } from "./socketMiddleware"

export const SET_CLIENT_STATE = "client/set_state"

const initialState = {
    status: null
}

const clientState = (state=initialState, action) => {
    switch (action.type) {
        case SET_CLIENT_STATE:
            return {
                status:action.payload
            }
        default:
            return state
    }
}

export default clientState

export function setClientState (state) {
    return function setClientStateAction (dispatch) {
        return dispatch({
            type: SET_CLIENT_STATE,
            payload:state
        })
    }
}

export function startWebSocket () {
    return function startWebSocketAction (dispatch) {
        return dispatch({
            type: WS_INIT
        })
    }
}

export function setSocketChatRoomId (roomId) {
    return function startWebSocketAction (dispatch) {
        return dispatch({
            type: WS_SET_TO_CHAT,
            payload:roomId
        })
    }
}

export function confirmSocketState () {
    return function startWebSocketAction (dispatch) {
        return dispatch({
            type: WS_CONFIRM_STATUS
        })
    }
}

