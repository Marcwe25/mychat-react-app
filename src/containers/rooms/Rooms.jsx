import {useSelector} from "react-redux"
import RoomRow from "../roomRow/RoomRow";

export default function Rooms () {

    const rooms =  useSelector((state)=>state.rooms.entities)
    const isTyping =  useSelector((state)=>state.isTyping.isTypingNotifications)

    const roomsMap = Object.keys(rooms).map(room_id=> 
        <RoomRow key={room_id} id={room_id} typing={isTyping[room_id]}/>
    )

    return (<div className={`roomsContainer scrolable border1 back_image`}>
            
            {!!roomsMap && roomsMap}
        </div>)
    
}

