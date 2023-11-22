import "../css/ChatClient.css"
import useAuth from "../hooks/auth-context";

const MessageIcon = ({ post }) => {
    const dateLocal = new Date(post.dateTime)
    const { registeredMember } = useAuth()
    const ti = new Date(dateLocal.getTime() - dateLocal.getTimezoneOffset() * 60 * 1000);

    const targetSide = () => {
        return registeredMember.id == post.from.id ?  'cancelRight' : 'alignRight'
    }

    return (

        <div className={`message-icon ${targetSide()}`}
        >
            <div className="message-header ">
                <div className="messageTitle">
                    <div className="messageFrom">{post.from.username}</div>
                    <div className="messageTime ">`{ti.toUTCString()}`</div>
                </div>

            </div>
            <div className="message-icon-content ">
                    {post.content}
            </div>

        </div>
    )
}

export default MessageIcon


