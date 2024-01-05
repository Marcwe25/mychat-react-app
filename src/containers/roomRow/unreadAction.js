import { INCREMENT_UNREAD, RESET_UNREAD, SET_UNREAD } from "./unreadReducer"

export function incrementUnread (roomid) {
    return function (dispatch) {
        dispatch ({
            type: INCREMENT_UNREAD,
            payload: roomid
        })
    }
}

export function resetUnread (roomid) {
    return function (dispatch) {
        dispatch ({
            type: RESET_UNREAD,
            payload: roomid
        })
    }
}

export function setUnreads (unreads) {
    return function (dispatch) {
        dispatch ({
            type: SET_UNREAD,
            payload: unreads
        })
    }
}