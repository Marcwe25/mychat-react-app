import { useState } from "react";
import { LOGIN_PAGE, REGISTRATION_PAGE } from "../../const/constNames";
import Login from "./Login";
import Registration from "./Registration";


export default function PublicRouter () {

    const [page,setPage] = useState(LOGIN_PAGE)


    function getChild () {
        switch (true) {
            case page === REGISTRATION_PAGE :
                return <Registration selectPage={setPage}/>
    
            default:
                return <Login selectPage={setPage}/>
        }
    }

    return getChild()


}