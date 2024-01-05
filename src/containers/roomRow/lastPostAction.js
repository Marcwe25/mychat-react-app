import { INCREMENT_UNREAD, RESET_UNREAD, SET_LASTPOSTS, UPDATE_LAST_POST } from "./lastPostReducer"

export function setLastPosts (lastPosts) {
    return function (dispatch) {
        dispatch({
            type: SET_LASTPOSTS,
            payload: lastPosts
        })
    }
}

export function updateLastPost (message) {
    return function (dispatch) {
        dispatch({
            type: UPDATE_LAST_POST,
            payload: message
        })
    }
}


