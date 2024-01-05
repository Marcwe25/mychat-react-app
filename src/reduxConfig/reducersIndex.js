import {combineReducers} from "redux";
import authReducer from "../containers/authentication/authReducer";
import navigationReducer from "../containers/navigation/navigationReducer";
import roomsReducer from "../containers/rooms/roomsReducer";
import friendsReducer from "../containers/friends/friendsReducer";
import messagesReducers from "../containers/chatRoom/messages/messagesReducer"
import clientState from "../websocket/clientState";
import notificationsReducer from "../containers/notifications/notificationsReducer";
import isTypingReducer from "../containers/notifications/isTypingReducer";
import lastPostReducer from "../containers/roomRow/lastPostReducer";
import unreadsReducer from "../containers/roomRow/unreadReducer";
import appDataReducer from "../containers/appData/appDataRedfucer";

export const USER_LOGOUT = "USER_LOGOUT"

const appReducer = combineReducers({
    auth:authReducer,
    navigation: navigationReducer,
    rooms: roomsReducer,
    friends: friendsReducer,
    chatMessages: messagesReducers,
    clientState: clientState,
    notifications: notificationsReducer,
    isTyping: isTypingReducer,
    lastPosts : lastPostReducer,
    unreads: unreadsReducer,
    appData:appDataReducer
})


const reducers = (state, action) => {
    if (action.type === 'USER_LOGOUT') {
      return appReducer(undefined, action)
    }
    return appReducer(state, action)
  }

export default reducers;