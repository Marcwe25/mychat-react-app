import axiosInstance from "../../axiosInstanceGenerator";
import { LOADING, SUCCEEDED } from "../../const/constNames";
import { all_rooms_url } from "../../const/constsURL";
import { INCREMENT_UNREAD, RESET_UNREAD, ROOMS_STATUS, SET_ROOMS, UPDATE_LAST_POST } from "./roomsReducer";


export function fetchRooms () {
    console.log("running fetchrooms")
    return async function (dispatch,getState) {
        if (getState().rooms.status === LOADING) return (false)
        setRoomState(LOADING)
        axiosInstance
        .get(all_rooms_url)
        .then (
             (response) => {
                console.log("fetchRooms dispatch SET_ROOMS")

                response?.data && dispatch({
                    type: SET_ROOMS,
                    payload: response?.data.rooms
                    }) 
                }
        )
        .then (
            () => {
                console.log("fetchRooms dispatch SUCCEEDED")
                dispatch({
                    type: ROOMS_STATUS,
                    payload : SUCCEEDED
                })
            }
           
            )
        .catch(
            err => console.error(err)
        )
    }
}

export function setRoomState (state) {
    return function (dispatch) {
        dispatch ({
            type: ROOMS_STATUS,
            payload: state
        })
    }
}

export function setLastPost (message) {
    return function (dispatch) {
        dispatch({
            type: UPDATE_LAST_POST,
            payload: message
        })
    }
}

export function clearRooms () {
    return function (dispatch) {
        dispatch ({
            type: SET_ROOMS,
            payload: null
        })
        setRoomState(null)
    }
}

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
