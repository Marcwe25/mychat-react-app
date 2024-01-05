import { useEffect } from "react"
import PublicRouter from "../containers/public/PublicRouter"


export default function Loading () {

    const TIME_TO_WAIT = 10000

    useEffect(()=>{
        const tid = setTimeout(()=>{
            return <PublicRouter/>
        },TIME_TO_WAIT)

        return ()=>{clearTimeout(tid)}


    },[])

    return <div className="bouncingBallIcon iconThird"/>
}


