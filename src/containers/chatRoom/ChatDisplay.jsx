import { useDispatch, useSelector, useStore } from "react-redux";
import { fetchMessages, resetMessages } from "./messages/messagesAction";
import MessageRow from "./messages/MessageRow";
import { useEffect } from "react";
import { updateLastPost } from "../roomRow/lastPostAction";


export default function ChatDisplay () {
    const messages = useSelector(state=>state.chatMessages.messages)
    const dispatch = useDispatch()
    const store = useStore()
    
    useEffect( () => {
        dispatch(fetchMessages())

      return ()=>{
        const lastMessage = store.getState().chatMessages.messages.at(-1)
        lastMessage && dispatch(updateLastPost(lastMessage))
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