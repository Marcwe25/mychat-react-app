import { useState } from "react"
import MenuButton from "../../icons/MenuButton"
import SearchButton from "../../icons/searchButton"
import NotificationsDisplay from "../notifications/NotificationsDisplay"


export default function RoomsMenu () {

    const [isPrompt,setIsPrompt] = useState(false)

    function  togglePrompt(){}
    
    const menuComponent = <>
                            <div className='headerItem headerTitle'>K</div> 
                                <span>
                                    <NotificationsDisplay/>
                                    <SearchButton togglePrompt={togglePrompt}/>
                                    <MenuButton/>
                                </span>
                            </>

    return (
        <div className='flexHeader border1  '>
            {(!isPrompt) && (menuComponent) || (prompt)}
        </div>
    )

}