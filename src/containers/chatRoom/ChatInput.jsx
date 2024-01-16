import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { WS_SEND_MESSAGE } from "../../websocket/socketMiddleware";
import { selectTargetWindow } from "../navigation/navigationReducer";

export default function ChatInput () {
    const dispatch = useDispatch()
    const [message, setMessage] = useState('');

    const roomId = useSelector(selectTargetWindow)
    const registeredMember = useSelector((state) => state.auth.registeredMember)

    useEffect(()=>{
        if(message && message.length>0) {
            const destination = `/app/istyping/${roomId}`;
            dispatch({
                type: WS_SEND_MESSAGE,
                payload : {
                    destination: destination,
                    message:{
                        "dateTime": new Date(),
                        "from":registeredMember,
                        "content": "",
                        "enabled": true.toString,
                    }
                }
            })

        }

    },[message])



    const handleMessageSubmit = (e) => {
        e.preventDefault();
        if (message.trim().length > 0) {
            const destination = `/app/${roomId}`;
            dispatch({
                type: WS_SEND_MESSAGE,
                payload : {
                    destination: destination,
                    message:{
                        "dateTime": new Date(),
                        "from":registeredMember,
                        "content": message,
                        "enabled": true.toString,
                    }
                }
            })
            setMessage('')
        }
    }

    return (
        <div className='listFoother'>
             <form onSubmit={handleMessageSubmit} className='chatInputForm back_image'>
                <textarea className='back_image fborder newRoomTextArea' rows="4" cols="30" value={message} onChange={(e) => setMessage(e.target.value)}/> 
                <div className='sendIcon sendMessageButton' onClick={handleMessageSubmit}></div>
            </form>
        </div>
    );

}