import axiosInstance from "../../../axiosInstanceGenerator"
import { posts_for_room_url } from "../../../const/constsURL"
import { ADD_MESSAGE, SET_MESSAGES } from "./messagesReducer"

export function addMessage (message) {
    return function nextWindow (dispatch) {
        dispatch({
            type:ADD_MESSAGE,
            payload:message
        })
    }
}

export function fetchMessages () {
    return async function (dispatch,getState) {
        const roomId = getState().navigation.windowPath.at(-1)
        axiosInstance
        .get(posts_for_room_url+`/${roomId}`)
        .then (
             (response) => {
                const messages = response?.data
                messages.forEach(message => message.dateTime = new Date(message.dateTime))
                response?.data && dispatch({
                    type: SET_MESSAGES,
                    payload: response?.data
                    })
                }
            
        )
        .catch(
            err => console.error(err)
        )
    }
}

export function resetMessages () {
    return function nextWindow (dispatch) {
        dispatch({
            type:SET_MESSAGES,
            payload:[]
        })
    }
}