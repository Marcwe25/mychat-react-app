import { useSelector } from "react-redux";


export default function MessageRow ({post}) {

    const dateLocal = new Date(post.dateTime)
    const registeredMember = useSelector((state)=>state.auth.registeredMember)
    const friends = useSelector((state)=>state.friends.entities)

    const ti = new Date(dateLocal.getTime() - dateLocal.getTimezoneOffset() * 60 * 1000);

    const targetSide = () => {
        return registeredMember.id == post.from ?  'cancelRight' : 'alignRight'
    }
    return (

        <div className={`message-icon ${targetSide()}`}>
            <div className="message-header ">
                <div className="messageTitle">
                    <div className="messageFrom">{friends[post.from].username}</div>
                    <div className="messageTime ">`{ti.toLocaleString()}`</div>
                </div>

            </div>
            <div className="message-icon-content ">
                    {post.content}
            </div>

        </div>
    )
}