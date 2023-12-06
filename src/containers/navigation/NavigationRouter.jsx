import { useSelector,useDispatch } from 'react-redux'
import { ADD_TO_CHAT_PAGE, APP_MENU, NEW_ROOM, NOTIFICATION_LIST, PROFILE } from '../../const/constNames';
import { WS_SWITCH_TO } from '../../websocket/socketMiddleware';
import { useEffect } from 'react';
import ChatUI from '../room/ChatUI';
import MainMenu from '../mainMenu/MainMenu';
import NewContact from '../mainMenu/NewContact';
import Profile from '../mainMenu/Profile';
import RoomUI from '../rooms/RoomsUI';
import AddToRoom from '../room/AddToRoom';
import NotificationsPageUI from '../notifications/NotificationsPageUI';

export default function NavigationRouter ()  {

    const dispatch = useDispatch();
    const target = useSelector((state) => state.navigation.windowPath.at(-1))
    const menuTarget = useSelector((state) => state.navigation.menuPath.at(-1))

    useEffect(()=>{
        console.log("get window" ,target)
        if (!isNaN(target) && target>0) dispatch({type:WS_SWITCH_TO,payload:target})
        },[target])

    switch (true) {
        case menuTarget===PROFILE:
                                                                return <Profile/>
        case menuTarget===NEW_ROOM:
                                                                return <NewContact/>
        case menuTarget===APP_MENU:
                                                                return <MainMenu/>
        case menuTarget===ADD_TO_CHAT_PAGE:
                                                                return <AddToRoom/>
        case typeof menuTarget === 'string' 
                && menuTarget.startsWith(NOTIFICATION_LIST):
                                                                return <NotificationsPageUI/>
        case !isNaN(target) && target>0:
                                                                return <ChatUI/>
        case !isNaN(target) && target===0 :
                                                                return <RoomUI/>
        default:
            return <RoomUI/>
    }

    

}
    // useEffect(()=>{
    //     getMenu(menuTarget)
    //     },[menuTarget])

    // return (<>
            
    //         {menuTarget===PROFILE && <PROFILE/>}

    //         {menuTarget===NEW_ROOM && <NewContact/>}

    //         {menuTarget===APP_MENU && <AppMenu/>}

    //         {menuTarget===ADD_TO_CHAT_PAGE && <A/>}

    //         {menuTarget === 'string' && menuTarget.startsWith(NOTIFICATION_LIST) && <A/>}

    //         {!isNaN(target) && target>0 && <ChatUI/> }

    //         {!isNaN(target) && target===0 && <Rooms/> }
    //         </>)


    // function getMenu(menuTarget){
    //     console.log("getMenu" ,menuTarget)
    //     switch (true) {
    //         case menuTarget===PROFILE:
    //             return <A/>
    //         case menuTarget===NEW_ROOM:
    //             return <A/>
    //         case menuTarget===APP_MENU:
    //             return <A/>
    //         case menuTarget===ADD_TO_CHAT_PAGE:
    //             return <A/>
    //         case typeof menuTarget === 'string' && menuTarget.startsWith(NOTIFICATION_LIST):
    //             return <A/>
    //         default:
    //             break;
    //     }
    // }