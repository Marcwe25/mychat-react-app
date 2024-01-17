import {useSelector} from "react-redux"
import AppData from "../appData/AppData"
import PublicRouter from "../public/PublicRouter"
import GoogleLoginModal from "./GoogleLoginModal"

export default function AuthRequired () {
    const registeredMember =  useSelector((state)=>state.auth.registeredMember)
    const iss =  useSelector((state)=>state.auth?.registeredMember?.iss)
    if(!registeredMember && iss==="GOOGLE") return (
        <>
            <GoogleLoginModal/>
        </>
    )
    
    return registeredMember ? <AppData/> : <PublicRouter/>

}