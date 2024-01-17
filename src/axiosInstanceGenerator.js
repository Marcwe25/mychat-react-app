import axios from "axios";
import { apiURL, refresh_token_url} from './const/constsURL';
import {BEARER} from "./const/constNames"
import {store} from "./reduxConfig/store"
import { RESET_AUTHENTICATION, SET_GOOGLE_LOGIN, SET_TOKENS } from "./containers/authentication/authReducer";
import { logoutUser } from "./containers/authentication/authActions";

    const axiosRefresh = axios.create(
        {
            baseURL: apiURL,
            headers: {
                "Content-Type": "application/json",
                    },
                    withCredentials: true
        }
    )

    const axiosInstance = axios.create(
        {
            baseURL: apiURL,
            headers: {
                "Content-Type": "application/json",
                    },
                    withCredentials: true
        }
    )

    var refreshing = false

    function createAxiosResponseInterceptor() {
        const responseInterceptor = axiosInstance.interceptors.response.use(
            response => {
                return response
            },
            async (error) => {
                const prevRequest = error?.config
                if (error?.response?.status === 401 && !prevRequest.sent) {
                    if(refreshing){
                        setTimeout(500,()=>{
                            return axiosInstance(prevRequest);
                        })
                    }
                    refreshing=true
                    prevRequest.sent = true
                    //getting new tokens
                    const response = await axiosRefresh.post(refresh_token_url)
                    const tokens = response.data
                    // setting new tokens
                    store.dispatch({
                        type:SET_TOKENS,
                        payload:tokens
                    })
                    prevRequest.headers['Authorization'] = `Bearer ${tokens.access_token}`
                    refreshing=false
                    return axiosInstance(prevRequest);
                    
                }
                const iss = store.getState().auth?.registeredMember?.iss

                switch (iss) {
                    case "KCHAT":
                        store.dispatch(logoutUser())
                        break
                    case "GOOGLE":
                            store.dispatch({
                            type:SET_GOOGLE_LOGIN,
                            })
                    default:
                        return Promise.reject(error);
                    }
                
            }
        );
    }
    
    function createAxiosRequestInterceptor() {
        const requestInterceptor = axiosInstance.interceptors.request.use(
            (config) => {
                const accessToken = store.getState().auth.accessToken
                return {
                  ...config,
                  headers: {
                    ...(accessToken !== null && { Authorization: `Bearer ${accessToken}` }),
                    ...config.headers,
                  },
                };
              }, (error) => Promise.reject(error)
        );

    }

    createAxiosRequestInterceptor()
    createAxiosResponseInterceptor()

    export default axiosInstance
