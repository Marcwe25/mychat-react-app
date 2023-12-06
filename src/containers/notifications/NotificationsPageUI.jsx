import { NOTIFICATION_LIST } from "../../const/constNames"
import Notifications from "./Notifications"
import NotificationsPageMenu from "./NotificationsPageMenu"


export default function NotificationsPageUI ( ) {
  return <div className='blockContainer '> 
            <NotificationsPageMenu/>
            <Notifications/>
        </div>
}
