import axios from "axios"
import {refresh_token_url} from "../../const/constsURL"
import {BEARER} from "../../const/constNames"


const axiosRefresh = axios.create(
    {
        baseURL: apiURL,
        headers: {
            "Content-Type": "application/json",
                },
                withCredentials: true
    }
)


export const refreshToken = () => {
    return async function (dispatch,getState) {
        const refreshToken = getState().auth.refreshToken
        const headerValue = BEARER + refreshToken
        const tokens = await axiosRefresh.post(refresh_token_url,{ "token" : headerValue })
        dispatch({type:"setTokens",payload: tokens})
        dispatch({type:UPDATE_ACCESS_TOKEN, payload: tokens.access_token})
        
    }
}

