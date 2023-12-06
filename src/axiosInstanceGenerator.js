import axios from "axios";
import { apiURL, refresh_token_url} from './const/constsURL';
import {BEARER} from "./const/constNames"
import {store} from "./reduxConfig/store"

    const n= Math.random()

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


    // setAuthorizationHeader("Bearer ")

    function createAxiosResponseInterceptor() {
        const responseInterceptor = axiosInstance.interceptors.response.use(
            response => {
                return response
            },
            async (error) => {   
                const prevRequest = error?.config
                if (error?.response?.status === 401 && !prevRequest.sent) {
                    prevRequest.sent = true
                    //getting new tokens
                    const state = store.getState()
                    const refreshToken = state.auth.refreshToken
                    const headerValue = BEARER + refreshToken
                    const response = await axiosRefresh.post(refresh_token_url,{ "token" : headerValue })
                    const tokens = response.data
                    // setting new tokens
                    store.dispatch({
                        type:"setTokens",
                        payload:tokens
                    })
                    console.log("responseInterceptor axiosInstance",axiosInstance)
                    console.log("responseInterceptor tokens",`Bearer ${tokens.access_token}`)

                    prevRequest.headers['Authorization'] = `Bearer ${tokens.access_token}`
                    return axiosInstance(prevRequest);
                }

                return Promise.reject(error);
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
                    // ...(accessToken !== null && { Authorization: `Bearer abc` }),
                    ...config.headers,
                  },
                };
              }, (error) => Promise.reject(error)
        );

    }

    // function setAuthorizationHeader (token_param1) {
    //     const headerValue = "Bearer " + token_param1
    //     axiosInstance.defaults.headers.common['Authorization'] = headerValue    
    // }

    createAxiosRequestInterceptor()
    createAxiosResponseInterceptor()

    export default axiosInstance

