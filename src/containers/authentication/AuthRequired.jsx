import {useSelector} from "react-redux"
import Login from "./Login"
import AppData from "../AppData"

export default function AuthRequired () {

    const registeredMember =  useSelector((state)=>state.auth.registeredMember)

    return registeredMember ? <AppData/> : <Login/>

}