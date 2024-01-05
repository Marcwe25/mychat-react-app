import Loading from "./Loading";
import { useState } from "react";


export default function Waiting () {
    const timeoutLenght = 3000

    const [isLoading, setLoading] = useState(true);

    const letMeTry = () => {
        setTimeout(
            ()=>{
                if(isLoading){
                    setLoading(false)}
                },
            timeoutLenght
        )
    }

    letMeTry ()

    return  <Loading />

}