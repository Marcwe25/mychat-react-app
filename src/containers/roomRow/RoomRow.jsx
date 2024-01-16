import { useDispatch, useSelector } from "react-redux"
import { goToWindow } from "../navigation/navigationAction"
import React from "react"
import Writing from "../../icons/Writing"


function RoomRow (props) {

    const room = useSelector((state)=>state.rooms.entities[props.id])
    const lastPost = useSelector((state)=>state.lastPosts.entities[props.id])
    const unread = useSelector((state)=>state.unreads.entities[props.id])
    const typing = props.typing


    const dispatch = useDispatch()

    function roomName () {
      return typing ? typing.split('@')[0] + " is writting" : room.name
    }

    function onClick (targetId)  {
      dispatch(goToWindow(targetId))
    }

    function typingClass(){
      if(typing) {
        return "gr" }
      else{
        return ""
      }
    }
    
    function disabledClass(){
      if(!room.enabled) {
        return "disabledRow" }
      else{
        return ""
      }
    }

    return (<div className={`room-icon spaceBetween ${disabledClass()} ${typingClass()}`} onClick={() => onClick(room.id)}>
                <div  className="room-icon-name">{roomName()}</div>{typing && <Writing/>}
                {room.enabled && <div className="room-icon-unread">{unread}</div>}
                {room.enabled && <div  className="room-icon-message">{lastPost ? lastPost.content:"no message"}</div>}
                {!room.enabled && <div  className="room-icon-message">contact/s not confirmed</div>}
          </div>)
}

export default React.memo(RoomRow);
