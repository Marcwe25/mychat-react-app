import { useSelector, useDispatch } from 'react-redux'
import { useEffect, useState } from 'react';
import NavigationRouter from './navigation/NavigationRouter';
import { startWebSocket } from '../websocket/clientState';
import { fetchRooms } from './rooms/roomsAction';
import { fetchFriends } from './friends/friendsAction';
import { SUCCEEDED } from '../const/constNames';
import Loading from '../icons/Loading';
import { fetchNotifications } from './notifications/notificationsAction';

export default function AppData () {

    const friendsStatus = useSelector((state) => state.friends.status)
    const roomsStatus = useSelector((state) => state.rooms.status)
    const notificationsStatus = useSelector((state) => state.notifications.status)
    const clientStatus = useSelector((state) => state.clientState.status)
    const dispatch = useDispatch();

    const [dataReady,setDataReady] = useState(false)

    console.log("AppDatafriendsStatus",friendsStatus)
    console.log("AppDataroomsStatus",roomsStatus)
    console.log("AppDatanotificationsStatus",notificationsStatus)
    console.log("AppDataclientStatus",clientStatus)


    useEffect(()=>{
        initData()
    },[friendsStatus,roomsStatus,clientStatus,notificationsStatus])

    function initData () {

        switch (true) {
            case friendsStatus !== SUCCEEDED:
                dispatch(fetchFriends())
                break;

            case roomsStatus !== SUCCEEDED:
                dispatch(fetchRooms())
            break;

            case notificationsStatus !== SUCCEEDED:
                dispatch(fetchNotifications())
                break;
            case clientStatus !== SUCCEEDED:
                dispatch(startWebSocket())
                break;
            
            default:
                console.log("returning default ui")
                setDataReady(true)
        }
    }

    return (<>{ dataReady===true && <NavigationRouter/> || <Loading/> }</>)
}
