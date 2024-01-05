import axiosInstance from "../../axiosInstanceGenerator"
import { SUCCEEDED ,LOADING,FAILED} from "../../const/constNames"
import { all_notifications_url } from "../../const/constsURL"
import { NOTIFICATIONS_ADD_NOTIFICATION, NOTIFICATIONS_FETCH_SUCCESS, NOTIFICATIONS_SET_STATUS } from "./notificationsReducer"


  export function fetchNotifications () {
    return async function (dispatch,getState) {
        if (getState().notifications.status === LOADING) return (false)
        setNotificationsStatus(LOADING)
        axiosInstance
        .get(all_notifications_url)
        .then (
             (response) => {
                response?.data && dispatch({
                    type: NOTIFICATIONS_FETCH_SUCCESS,
                    payload: response?.data
                    }) 
                }
        )
        .then (
            () => {
                dispatch({
                    type:NOTIFICATIONS_SET_STATUS,
                    payload: SUCCEEDED
                })
            }
           
            )
        .catch(
            
            err => {
                dispatch(setNotificationsStatus(FAILED))
                console.error(err)
            }
        )
    }
}

  export function addNotification (notification)  {
    return async function dispatchNotification (dispatch) {
        dispatch({
            type:NOTIFICATIONS_ADD_NOTIFICATION,
            payload:notification
        })
    }
}

export function setNotificationsStatus (status) {
    return function (dispatch) {
        dispatch({
            type:NOTIFICATIONS_SET_STATUS,
            payload: status
        })
    }
}
