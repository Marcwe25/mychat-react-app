import { useDispatch, useSelector } from "react-redux";
import ChatDisplay from "./ChatDisplay";
import ChatInput from "./ChatInput";
import ChatMenu from "./ChatMenu";
import { confirmSocketState, setSocketChatRoomId } from "../../websocket/clientState";
import { useEffect } from "react";
import { resetUnread } from "../roomRow/unreadAction";


export default function ChatUI ()  {
    const dispatch = useDispatch();
    const roomId = useSelector((state) => state.navigation.windowPath.at(-1))
    const roomName = useSelector((state) => state.rooms.entities[roomId].name)

    useEffect(()=>{
        dispatch(confirmSocketState())
        dispatch(setSocketChatRoomId(roomId))
        return () => {
            dispatch(setSocketChatRoomId(0))
            dispatch(resetUnread(roomId))
        }
    },[])

    return  <div className='blockContainer'>
                <ChatMenu title={roomName}/>
                <ChatDisplay/>
                <ChatInput/>
            </div>
}