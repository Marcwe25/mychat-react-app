import {useSelector} from "react-redux"
import RoomRow from "./RoomRow";
import { useEffect } from "react";
import RoomsMenu from "./RoomsMenu";

export default function Rooms () {

    const rooms =  useSelector((state)=>state.rooms.entities)

    const roomsMap = Object.keys(rooms).map(room=> 
        <RoomRow key={room} id={room}/>
    )




    return (<div className={`roomsContainer scrolable border1 back_image`}>
            
            {!!rooms && roomsMap}
        </div>)
    


}


    // const friends = useSelector((state)=>state.friends.entities)

    // useEffect (()=>{
    //     if(rooms && friends) getRooms ()
        
    // },[rooms,friends])

    // if(rooms && friends)  return getRooms ()






    // function getRooms () {
    //     return <div className={`roomsContainer scrolable border1 back_image`}>
    //     {!!rooms && roomsMap}
    // </div>
    // }