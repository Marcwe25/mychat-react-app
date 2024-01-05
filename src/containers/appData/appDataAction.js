import axiosInstance from "../../axiosInstanceGenerator"
import { LOADING, SUCCEEDED } from "../../const/constNames"
import { all_notifications_url, all_rooms_url, friends_url } from "../../const/constsURL"
import { startWebSocket } from "../../websocket/clientState"
import { WS_DOWN } from "../../websocket/socketMiddleware"
import { FRIENDS_STATUS, SET_FRIENDS } from "../friends/friendsReducer"
import { NOTIFICATIONS_FETCH_SUCCESS } from "../notifications/notificationsReducer"
import { setLastPosts } from "../roomRow/lastPostAction"
import { setUnreads } from "../roomRow/unreadAction"
import { checkedRoomsName } from "../rooms/roomsAction"
import { ROOMS_STATUS, SET_ROOMS } from "../rooms/roomsReducer"
import { DATA_REFRESH, DATA_STATUS } from "./appDataRedfucer"


export function initData () {
    return async function (dispatch,getState) {
        if (getState().appData.status === LOADING) return (false)
        dispatch(setDataStatus(LOADING))
        dispatch(refreshDataNotNeeded())
        Promise.all([
            axiosInstance.get(friends_url),
            axiosInstance.get(all_rooms_url),
            axiosInstance.get(all_notifications_url),

        ]).then(([friendsResponse, roomsResponse, notificationsResponse]) => {
            dispatch({
                type: SET_FRIENDS,
                payload: friendsResponse.data
                })
            const rooms = checkedRoomsName(roomsResponse.data.rooms,getState)
            dispatch({
                type: SET_ROOMS,
                payload: rooms
            })
            dispatch(setLastPosts(roomsResponse.data.lastPosts))
            dispatch(setUnreads(roomsResponse.data.unreads))
        
            dispatch({
                type: NOTIFICATIONS_FETCH_SUCCESS,
                payload: notificationsResponse.data
                }) 
            dispatch(startWebSocket())
            dispatch({
                type:DATA_STATUS,
                payload: SUCCEEDED
            })
        })

    }
}

export function cleanupData () {
    return async function (dispatch) {
        dispatch({
            type: SET_FRIENDS,
            payload: null
            })

        dispatch({
            type: FRIENDS_STATUS,
            payload: null
            })
        dispatch({
            type: SET_ROOMS,
            payload: null
        })
        dispatch({
            type: ROOMS_STATUS,
            payload: null
        })

        dispatch(setLastPosts({}))

        dispatch(setUnreads({}))
    
        dispatch({
            type: NOTIFICATIONS_FETCH_SUCCESS,
            payload: {
                entities:{},
                types:[],
            }
            }) 
        dispatch({
            type:WS_DOWN
        })
        dispatch({
            type:DATA_STATUS,
            payload: null
        })
    }
}


export function setDataStatus(status){
    return function (dispatch) {
        dispatch({
            type:DATA_STATUS,
            payload: status
        })
    }
}

export function setDataRefresh(bol){
    return function (dispatch) {
        dispatch({
            type:DATA_REFRESH,
            payload: bol
        })
    }
}
export function refreshData(){
    return function (dispatch) {
        dispatch({
            type:DATA_REFRESH,
            payload: true
        })
    }
}
export function refreshDataNotNeeded(){
    return function (dispatch) {
        dispatch({
            type:DATA_REFRESH,
            payload: false
        })
    }
}