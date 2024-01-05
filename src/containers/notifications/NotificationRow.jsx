import { useDispatch } from "react-redux";
import axiosInstance from "../../axiosInstanceGenerator";
import Decline from "../../icons/Decline";
import Confirm from "../../icons/Confirm";
import { linkToRoom_url, unlinkFromRoom_url } from '../../const/constsURL'
import { fetchNotifications } from "./notificationsAction";
import { WS_SUBSCRIBE_TO } from "../../websocket/socketMiddleware";

export default function NotificationRow  (prop) {

    const notification = prop.notification

    const dispatch = useDispatch()

    const submitCancel = async () => {
      await axiosInstance.put(unlinkFromRoom_url+"/" +notification.id)
      dispatch(fetchNotifications())
      }

    const submitConfirm = async() => {
      const response = await axiosInstance.put(linkToRoom_url+"/" +notification.id)
      const room = response.data
      dispatch({
        type: WS_SUBSCRIBE_TO,
        payload: room.id
      })
      dispatch(fetchNotifications())
      }

    return (
      <div className="room-icon icon-container spaceBetween icon10">
        {/* <div className='disable-room justifyContentRight icon-container icon10'> */}
        <div className="room-icon-name">friend request</div>
            
            <div className="room-icon-message">{prop.notification.from.username}</div>
            <div className="icon-container">
            <Decline
              callBack={submitCancel}
              />
            <Confirm
              submitConfirm={submitConfirm}
              />
            </div>

        {/* </div> */}
      </div>
    );
  };
