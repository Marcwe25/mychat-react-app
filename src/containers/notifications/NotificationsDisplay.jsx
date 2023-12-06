import { useSelector } from "react-redux"
import NotificationIcon from "../../icons/NotificationIcon"



export default function NotificationsDisplay () {

    const notificationList = useSelector((state) => state.notifications.entities)

    return (
        <div className='notificationMenu'>
        {notificationList && 
            Object.keys(notificationList.notifications)
                    .map(type=> <NotificationIcon key={type}
                                    notifications={notificationList.notifications[type]}
                                    ntype={type}
                                />)
        }
        </div>
    )

}