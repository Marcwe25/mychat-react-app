
import axios from "axios";
import {loginURL,apiURL,member_url} from '../../const/constsURL'
import axiosInstance from "../../axiosInstanceGenerator";
import { SET_AUTHENTICATION, SET_MEMBER, SET_TOKENS } from "./authReducer";
import { resetMenuPath, resetWindowPath } from "../navigation/navigationAction";
import { clearRooms } from "../rooms/roomsAction";
import { USER_LOGOUT } from "../../reduxConfig/reducersIndex";
import { WS_DOWN } from "../../websocket/socketMiddleware";

const axiosAuth = axios.create(
    {
        baseURL: apiURL,
        headers: {
            "Content-Type": "application/json",
                },
                withCredentials: true
    }
)

export const loginUser = (inputs) => {
        return async function loginUserThunk (dispatch) {
            const response = await axiosAuth.post(loginURL,inputs )
            dispatch(
                {
                type:SET_TOKENS,
                payload:response.data
                }
            )
            dispatch(resetWindowPath())
            dispatch(resetMenuPath())
            dispatch(fetchRegisteredMember())

        }
}        

export const logoutUser = () => {
    return async function logout (dispatch) {
        dispatch({
            type:SET_AUTHENTICATION,
            payload:{
                registeredMember:null,
                accessToken:null,
                refreshToken:null
            }
        })
        // dispatch(clearRooms())
        dispatch({type:USER_LOGOUT})
        dispatch({type:WS_DOWN})

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
                err => console.error(err)
            )
        }
}

