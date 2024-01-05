import { addNotification } from "../containers/notifications/notificationsAction"
import { ADD_MESSAGE } from "../containers/chatRoom/messages/messagesReducer"
import { addisTypijng } from "../containers/notifications/isTypingAction"
import axiosInstance from "../axiosInstanceGenerator"
import { lastseen } from "../const/constsURL"
import { updateLastPost } from "../containers/roomRow/lastPostAction"
import { incrementUnread } from "../containers/roomRow/unreadAction"
import { removeRoom } from "../containers/rooms/roomsAction"


const subscription = {
    chatRoomId:null,
    client : null,

    initSubscription (client) {
        this.client = client
        this.chatRoomId = this.client.storeAPI.getState().navigation.windowPath.at(-1)
    },

    makeAllSubscription () {
        const roomList = this.client.storeAPI.getState().rooms.entities
        if (roomList) {
            Object.values(roomList).forEach(room => {
                if (room.enabled){
                    this.makeSubscription(room.id)
                    }
                }
            )
        }
        this.makeSystemSubscription()

      },

    makeSystemSubscription() {

        const newContactCallBack = (message) => {
            this.client.storeAPI.dispatch(addNotification(message))
        }

        const declineContactCallBack = (message) => {
            const roomid = message.message
            this.client.storeAPI.dispatch(removeRoom(roomid))
        }

        const acceptContactCallBack = (message) => {
            const roomid = message.message
            this.client.storeAPI.dispatch(confirmRoom(roomid))
        }

        const notificationCallBack = (message) => {
            switch (message.type) {
                case ContactDecline:
                    declineContactCallBack(message)
                    break;
                case ContactAccept:
                    acceptContactCallBack(message)
                    break;
                case NewContact:
                    newContactCallBack(message)
                    break;
                default:
                    break;
            }
        }

        // this.makeSubscribe(`/user/queue/newContact`, newContactCallBack)
        // this.makeSubscribe(`/user/queue/contactDecline`, declineContactCallBack)
        this.makeSubscribe(`/user/queue/notification`, notificationCallBack)

    },

    makeSubscribe (destination, callback) {
        const stompClient = this.client.socket.stompClient

        if (stompClient && stompClient.active) {
            let subscribtion = null
            try {
                subscribtion = stompClient.subscribe(
                    destination,
                    message => {callback(JSON.parse(message.body))},
                    { 'ack': `ack received for room ${destination}` }
                    )
            }
            catch (err) {console.error(err)}
            return subscribtion;
        }
    },
    
    chatMessageCallBack(message) {
        switch (message.type) {
            case "isTyping":
                break;
        
            default:
                axiosInstance.post(lastseen+"/"+message.room)
                this.client.storeAPI.dispatch({
                    type:ADD_MESSAGE,
                    payload:message
                })
                break;
        }
    },

    lastMessageCallBack(message) {
        switch (message.type) {
            case "isTyping":
                this.client.storeAPI.dispatch(addisTypijng(message))
                break;
        
            default:
                this.client.storeAPI.dispatch(updateLastPost(message))
                this.client.storeAPI.dispatch(incrementUnread(message.room))
                break;
        }
    },

    messageRoutingCallBack(message){
        this.lastMessageCallBack(message)
        if(message.room === this.chatRoomId){
            this.chatMessageCallBack(message)
        }
    },

    makeSubscription(roomId) {
        this.makeSubscribe(`/topic/${roomId}`,
      (message) => {
        this.messageRoutingCallBack(message)
      })
    },

    setToChat (roomId) {
        this.chatRoomId = roomId
    },

}

export default subscription