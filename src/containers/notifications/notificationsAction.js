import axiosInstance from "../../axiosInstanceGenerator"
import { SUCCEEDED ,LOADING,FAILED} from "../../const/constNames"
import { all_notifications_url } from "../../const/constsURL"
import { NOTIFICATIONS_FETCH_SUCCESS, NOTIFICATIONS_SET_STATUS } from "./notificationsReducer"

// export function aaa() {
//     dispatch(setNotificationsStatus(LOADING))
//     axiosInstance.get(all_notifications_url)
//     .then(response => {
//         console.log("notificationlistresponse.data",response.data)
//         let notificationlist = response.data
//             dispatch({
//                 type:NOTIFICATIONS_FETCH_SUCCESS,
//                 payload: notificationlist})
//             dispatch(setNotificationsStatus(SUCCEEDED))


//       })
//       .catch(() => {
//         dispatch(setNotificationsStatus(FAILED))

//       })
//   }


  export function fetchNotifications () {
    return async function (dispatch,getState) {
        if (getState().notifications.status === LOADING) return (false)
        setNotificationsStatus(LOADING)
        axiosInstance
        .get(all_notifications_url)
        .then (
             (response) => {
                console.log("fetchNotifications dispatch SET_ROOMS" , response?.data)
                response?.data && dispatch({
                    type: NOTIFICATIONS_FETCH_SUCCESS,
                    payload: response?.data
                    }) 
                }
        )
        .then (
            () => {
                console.log("fetchRooms dispatch SUCCEEDED")
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
    dispatch({
        type:"ADD_NOTIFICATION", 
        payload: notification})
}

export function setNotificationsStatus (status) {
    console.log("setNotificationsStatus return dispatch",status)
    return function (dispatch) {
        console.log("setNotificationsStatus",status )
        dispatch({
            type:NOTIFICATIONS_SET_STATUS,
            payload: status
        })
    }
}
