import { useSelector } from "react-redux"
import NotificationIcon from "../../icons/NotificationIcon"



export default function NotificationsDisplay () {
    const notifications = useSelector((state) => state.notifications.entities)
    return (
        <div className='notificationMenu'>
        {notifications && 
            Object.keys(notifications)
                    .map(type=> <NotificationIcon key={type}
                                    notifications={notifications[type]}
                                    ntype={type}
                                />)
        }
        </div>
    )

}