import { useSelector,useDispatch } from 'react-redux'
import { ADD_TO_CHAT_PAGE, APP_MENU, MAIN_WINDOWS, NEW_ROOM, NOTIFICATION_LIST, PROFILE, REMOVE_ROOMS } from '../../const/constNames';
import ChatUI from '../chatRoom/ChatUI';
import MainMenu from '../mainMenu/MainMenu';
import NewContact from '../mainMenu/NewContact';
import Profile from '../mainMenu/Profile';
import AddToRoom from '../chatRoom/AddToRoom';
import NotificationsPageUI from '../notifications/NotificationsPageUI';
import RemoveRoom from '../mainMenu/RemoveRoom';
import { useEffect } from 'react';
import { syncWithHistory } from './navigationAction';
import RoomsUI from '../rooms/RoomsUI';
import { selectTargetWindow } from './navigationReducer';

export default function NavigationRouter ()  {

    const dispatch = useDispatch()

    useEffect(() => {

        const handlePopState = (event) => {
            dispatch(syncWithHistory(event.state.browserIndex))
        };
        window.addEventListener('popstate', handlePopState);
        return () => {window.removeEventListener('popstate', handlePopState)}
    }, []);
    
    const target = useSelector(selectTargetWindow)

    switch (true) {
        case !isNaN(target) && target>0:                        return <ChatUI/>

        case target===MAIN_WINDOWS:                             return <RoomsUI/>

        case target===PROFILE:                                  return <Profile/>

        case target===NEW_ROOM:                                 return <NewContact/>

        case target===APP_MENU:                                 return <MainMenu/>

        case target===ADD_TO_CHAT_PAGE:                         return <AddToRoom/>

        case target===REMOVE_ROOMS:                             return <RemoveRoom/>

        case typeof target === 'string' 
                && target.startsWith(NOTIFICATION_LIST):        return <NotificationsPageUI/>

        default:
            return <RoomsUI/>
    }

}