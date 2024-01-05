import { useDispatch } from "react-redux"
import { NOTIFICATION_LIST } from "../const/constNames"
import { goToMenu } from "../containers/navigation/navigationAction"

export default function NotificationIcon (props) {

    const n = props.notifications.length
    const dispatch = useDispatch()

    const handleClick = () => {
        dispatch(goToMenu(NOTIFICATION_LIST+"_"+props.ntype))
      }

    const cssClass = `menuButton ${props.ntype}`

    return (
        <span className="notificationCompo" onClick={handleClick}>
            <div className={cssClass} />
                <span className="notificationTxt">{n}</span>
        </span>
    )
}

