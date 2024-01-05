import axiosInstance from "../../axiosInstanceGenerator";
import { LOADING, } from "../../const/constNames";
import { friends_url } from "../../const/constsURL";
import { FRIENDS_STATUS, SET_FRIENDS } from "./friendsReducer";


export function fetchFriends () {
    return async function (dispatch,getState) {
        if (getState().friends.status === LOADING) return (false)
        dispatch(setFriendsStatus(LOADING))
        axiosInstance
        .get(friends_url)
        .then (
             (response) => {
                response?.data && dispatch({
                    type: SET_FRIENDS,
                    payload: response?.data
                    })
                }
            
        )
        .catch(
            err => console.error(err)
        )
    }
}


export function setFriendsStatus (state) {
    return function (dispatch) {
        dispatch ({
            type: FRIENDS_STATUS,
            payload: state
        })
    }
}