import { useDispatch, useSelector } from "react-redux";
import { fetchMessages, resetMessages } from "./messages/messagesAction";
import MessageRow from "./messages/MessageRow";
import { useEffect } from "react";


export default function ChatDisplay () {
    const messages = useSelector(state=>state.chatMessages.messages)
    const dispatch = useDispatch()


    useEffect( () => {
        dispatch(fetchMessages())
        return ()=>{
          dispatch(resetMessages())
        }
      },[])

      return (
        <div className="messageContainer border1 back_image scrolable">
            <div >
              {messages
                    .sort((a,b)=>{return a.dateTime - b.dateTime})
                    .map((post) => (
                      <MessageRow key={post.id} post={post} />
                    ))
              }
            </div>
            </div>
        );

}