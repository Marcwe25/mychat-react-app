import { useState } from 'react';
import axios from "axios";
import { apiURL,registerURL } from '../utility/constsURL';
import { LOGIN_PAGE } from '../utility/constNames';
import useData from './data-context'

export default function useRegistration(props) {
   
    const [registrationError, setRegistrationError] = useState(null);
	// const goToPage = props.goToPage
    const {chooseRoom} = useData()

   const axiosRegistration = axios.create(
        {
            baseURL: apiURL,
            headers: {
                "Content-Type": "application/json",
                    },
                    withCredentials: true
        }
    )

    //register user
    const registerUser = async (inputs) => {
        if(isValid(inputs)) {
            const {userName,email,password} = {...inputs}
            return await axiosRegistration
            .post(
                registerURL,
                {userName,email,password}
                ,{withCredentials: true})
            .then(async () => {
                setRegistrationError("")
                // goToPage(LOGIN_PAGE)
                chooseRoom(LOGIN_PAGE)
            })
            .catch((error) => {
                console.log("error",error)
                setRegistrationError("bad credential");})
        }

        }

    const isValid = (inputs) => {
        if (inputs.password===inputs.password_confirmation) return true
        setRegistrationError("passwords different")
        return false
    }

return {registerUser, registrationError}
}