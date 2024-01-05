import { useSelector,useDispatch } from 'react-redux'
import { ADD_TO_CHAT_PAGE, APP_MENU, MAIN_WINDOWS, NEW_ROOM, NOTIFICATION_LIST, PROFILE, REMOVE_ROOMS } from '../../const/constNames';
import { useEffect } from 'react';
import ChatUI from '../chatRoom/ChatUI';
import MainMenu from '../mainMenu/MainMenu';
import NewContact from '../mainMenu/NewContact';
import Profile from '../mainMenu/Profile';
import RoomUI from '../rooms/RoomsUI';
import AddToRoom from '../chatRoom/AddToRoom';
import NotificationsPageUI from '../notifications/NotificationsPageUI';
import RemoveRoom from '../mainMenu/RemoveRoom';

export default function NavigationRouter ()  {

    const dispatch = useDispatch();
    const target = useSelector((state) => state.navigation.windowPath.at(-1))
    const menuTarget = useSelector((state) => state.navigation.menuPath.at(-1))

    switch (true) {
        case !isNaN(target) && menuTarget===MAIN_WINDOWS :      return <RoomUI/>
        case menuTarget===PROFILE:
                                                                return <Profile/>
        case menuTarget===NEW_ROOM:
                                                                return <NewContact/>
        case menuTarget===APP_MENU:
                                                                return <MainMenu/>
        case menuTarget===ADD_TO_CHAT_PAGE:
                                                                return <AddToRoom/>
        case menuTarget===REMOVE_ROOMS:
                                                                return <RemoveRoom/>
        case typeof menuTarget === 'string' 
                && menuTarget.startsWith(NOTIFICATION_LIST):
                                                                return <NotificationsPageUI/>
        case !isNaN(target) && target>0:
                                                                return <ChatUI/>

        default:
            return <RoomUI/>
    }

}