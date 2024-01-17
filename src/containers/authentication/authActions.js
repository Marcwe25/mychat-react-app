
import axios from "axios";
import {loginURL,apiURL,member_url} from '../../const/constsURL'
import axiosInstance from "../../axiosInstanceGenerator";
import { SET_ACCESS_TOKEN, SET_AUTHENTICATION, SET_MEMBER, SET_REFRESH_TOKEN, SET_REMEMBERME, SET_TOKENS, SET_TOKEN_STATUS } from "./authReducer";
import { resetNavigation } from "../navigation/navigationAction";
import { USER_LOGOUT } from "../../reduxConfig/reducersIndex";
import { WS_DOWN } from "../../websocket/socketMiddleware";
import { IDLE, REFRESH_TOKEN, REMEMBERME } from "../../const/constNames";
import { setRoomState } from "../rooms/roomsAction";
import { setFriendsStatus } from "../friends/friendsAction";
import { setNotificationsStatus } from "../notifications/notificationsAction";

const axiosAuth = axios.create(
    {
        baseURL: apiURL,
        headers: {
            "Content-Type": "application/json",
                },
                withCredentials: true
    }
)

export const loginUser = (inputs,setAuthenticationError) => {
        return async function loginUserThunk (dispatch,getstate) {
            dispatch(setRoomState(IDLE))
            dispatch(setFriendsStatus(IDLE))
            dispatch(setNotificationsStatus(IDLE))
            try {
                const response = await axiosAuth.post(loginURL,inputs)
                dispatch({type:SET_TOKENS,payload:response.data})

                const state = getstate()
                const remberMe = state.auth.remberMe

                remberMe && localStorage.setItem(REFRESH_TOKEN,response.data[REFRESH_TOKEN]) && localStorage.setItem(REMEMBERME,"yesdo")
                dispatch(resetNavigation())
            dispatch(fetchRegisteredMember())
            } catch (error) {
                setAuthenticationError("invalid credential, please try again")
            }
            
        }
}

export const loginRemebered = () => {
    return async function loginUserThunkRemembered (dispatch) {
        await dispatch(resetNavigation())
        const refreshToken = localStorage.getItem(REFRESH_TOKEN)
        await dispatch(setRefreshToken(refreshToken))
        await dispatch(fetchRegisteredMember())
    }
}

export const setRememberMe = (rememberMe) => {
    return function (dispatch) {
        dispatch({
            type:SET_REMEMBERME,
            payload:rememberMe
            })
    }
}

export const setRefreshToken = (refreshToken) => {
    return function (dispatch) {
        dispatch({
            type:SET_REFRESH_TOKEN,
            payload:refreshToken
            })
    }
}

export const setAccessToken = (accessToken) => {
    return function (dispatch) {
        dispatch({
            type:SET_ACCESS_TOKEN,
            payload:accessToken
            })
    }
}
export const setRegisteredMember = (member) => {
    return function (dispatch) {
        dispatch({
            type:SET_MEMBER,
            payload:member
            })
    }
}


export const logoutUser = () => {
    return async function logout (dispatch) {
        dispatch({
            type:SET_AUTHENTICATION,
            payload:{
                registeredMember:null,
                accessToken:null,
                refreshToken:null,
                rememberMe:null,
            }
        })
        dispatch({type:WS_DOWN})
        localStorage.clear()
        dispatch({type:USER_LOGOUT})
        

        }      
}
export const fetchRegisteredMember = ()=>{
        return async function fetchRegisteredMemberThunk (dispatch) {
            axiosInstance
            .get(member_url)
            .then (
                 (response) => {
                    response?.data && dispatch({
                        type: SET_MEMBER,
                        payload: response?.data
                        })
                    } 
                
            )
            .catch(
                err => dispatch(logoutUser())
            )
        }
}
