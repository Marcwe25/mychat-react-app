import { LOGIN_PAGE, REGISTRATION_PAGE } from "../utility/constNames"
import Login from "./Login"
import Registration from "./Registration"
import { useState } from "react"
import useData from '../hooks/data-context'

export default function Public () {

    const [page,setPage] = useState(LOGIN_PAGE)
    const {roomId} = useData()
    
    const goToPage = (p) =>{
        setPage(p)
    }
    if(roomId === LOGIN_PAGE) return <Login goToPage={goToPage}/>

    if(roomId === REGISTRATION_PAGE) return <Registration goToPage={goToPage}/>

}