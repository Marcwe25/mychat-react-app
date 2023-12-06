import { useSelector } from "react-redux"
import { NOTIFICATION_LIST } from "../../const/constNames"
import NotificationRow from "./NotificationRow"


export default function Notifications () {

    const roomId = useSelector((state) => state.navigation.menuPath.at(-1))
    const notifications = useSelector((state) => state.notifications.entities.notifications)
    const type = typeof roomId === 'string' && roomId.startsWith(NOTIFICATION_LIST) ? roomId.split("_")[1] : null



    return  <div className={`roomsContainer border1 back_image`}>
                {
                !!notifications && notifications.hasOwnProperty(type) && notifications[type]
                .sort((a,b) => {return a.memberRoomEnable - b.memberRoomEnable})
                .map((notification) =>  {return (
                                <NotificationRow  key={notification.id}  notification={notification}/>

                )}
                            
                            

                        )
                }
             </div>
}