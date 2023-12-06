import { useDispatch, useSelector } from "react-redux"
import { goToWindow } from "../navigation/navigationAction"


export default function RoomRow (props) {

    const room = useSelector((state)=>state.rooms.entities[props.id])
    const friends = useSelector((state)=>state.friends.entities)
    const registeredMember = useSelector((state)=>state.auth.registeredMember)

    const dispatch = useDispatch()

    function memberName (memberid) {
      return (friends[memberid]?.displayName ? friends[memberid].displayName : friends[memberid].username.split('@')[0] )
    }

    function onClick (targetId)  {
      dispatch(goToWindow(targetId))
    }

    function roomName () {
        return room.members
        .reduce(
          (a, memberid) =>
           memberid === registeredMember.id ? a :a + memberName(memberid)  + ", " ,
            ''
            )
        .slice(0, -2)
      }

    return (<div className="room-icon spaceBetween" onClick={() => onClick(room.id)}>
                <div  className="room-icon-name">{roomName()}</div>
                <div className="room-icon-unread">{room.unread}</div>
                <div  className="room-icon-message">{room?.lastPost ? room.lastPost.content:"no message"}</div>
          </div>)
}