import { useState } from 'react';
import {loginURL} from '../utility/constsURL'
import { ACCESS_TOKEN, REFRESH_TOKEN } from '../utility/constNames';
import axios from "axios";
import { apiURL } from '../utility/constsURL';
import useAuth from './auth-context';
import { useApi } from "./useApi";
import {  member_url } from "../utility/constsURL";

export default function useAuthentication() {

    const {registeredMember,login,logout} = useAuth()
    const [authenticationError, setauthenticationError] = useState(null);
    const {axiosInstance} = useApi()

    const axiosAuth = axios.create(
        {
            baseURL: apiURL,
            headers: {
                "Content-Type": "application/json",
                    },
                    withCredentials: true
        }
)

    //register user

    //login user
    const loginUser = async (inputs) => {
        return await axiosAuth
            .post(loginURL, inputs,{withCredentials: true})
            .then(async (response) => {
                const localAccessToken = response?.data?.access_token
                const localRefreshToken = response?.data?.refresh_token
                if(localAccessToken && localRefreshToken ){
                    localStorage.setItem(ACCESS_TOKEN,localAccessToken)
                    localStorage.setItem(REFRESH_TOKEN,localRefreshToken)
                    await setUserDetail()
                }
            })
            .catch(() => {setauthenticationError("bad credential");})
        }

    const setUserDetail = async () => {
        await axiosInstance.get(member_url)
                .then(res => {
                    login(res?.data);
            }
            )
    }

    //validate authentication
    const isAuthenticated = async () => {
       return registeredMember !== null
    }

    const logoutUser = () => {
        localStorage.removeItem(ACCESS_TOKEN)
        localStorage.removeItem(REFRESH_TOKEN)
        logout()
    }

return { loginUser, authenticationError, isAuthenticated, logoutUser, setUserDetail}
}