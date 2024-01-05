import { useSelector } from "react-redux"
import { NOTIFICATION_LIST } from "../../const/constNames"
import NotificationRow from "./NotificationRow"

export default function Notifications () {

    const roomId = useSelector((state) => state.navigation.menuPath.at(-1))
    const notificationsByType = useSelector((state) => state.notifications.entities)

    const type = typeof roomId === 'string' && roomId.startsWith(NOTIFICATION_LIST) ? roomId.split("_")[1] : null

    function getNotificationsForType () {

        if (!notificationsByType || !notificationsByType.hasOwnProperty(type) || notificationsByType[type].length ===0 ) {
                return (<div className="room-icon icon-container spaceBetween icon10">no notifications to show</div>)
        }

        const typedNotification = notificationsByType[type]

        return typedNotification
                .sort((a,b) => {return a.enabled - b.enabled})
                .map((notification) => {return (<NotificationRow  key={notification.id}  notification={notification}/>)})

    }

       
    return  <div className={`roomsContainer border1 back_image`}>
                {getNotificationsForType ()}
             </div>
}