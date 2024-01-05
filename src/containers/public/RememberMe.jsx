import {  REMEMBERME } from "../../const/constNames"
import { useDispatch, useSelector } from "react-redux"
import { setRememberMe } from "../authentication/authActions"


export default function RememberMe   ()  {

	const dispatch = useDispatch()
    const rememberMe = useSelector((state)=>state.auth.remberMe)

    function getOnOffClass () {
        if(rememberMe==="yesdo") {
            return ("cOn cIn")
        }
        else {
            return ("cIn")
        }
    }

    const toggleRemember = () => {
        if(rememberMe==="yesdo"){
            localStorage.setItem(REMEMBERME,"donot")
            dispatch(setRememberMe("donot"))
        } else {
            localStorage.setItem(REMEMBERME,"yesdo")
            dispatch(setRememberMe("yesdo"))
        }
    }

    return  <div className="cContainer">
                remember me 
                <div className="cTop clickable2" onClick={toggleRemember}>
                    <div className={getOnOffClass ()}/>
                </div>
            </div>
       
}