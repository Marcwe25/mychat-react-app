import {useSelector} from "react-redux"
import AppData from "../appData/AppData"
import PublicRouter from "../public/PublicRouter"
import GoogleLogin from "../public/GoogleLogin"
import { Modal } from "../../modal/Modal"
import GoogleLoginModal from "./GoogleLoginModal"

export default function AuthRequired () {

    const registeredMember =  useSelector((state)=>state.auth.registeredMember)
    const iss =  useSelector((state)=>state.auth.iss)

    
    if(!registeredMember && iss==="GOOGLE") return (
        <>
            <GoogleLoginModal/>
        </>
    )
    
    return registeredMember ? <AppData/> : <PublicRouter/>

}