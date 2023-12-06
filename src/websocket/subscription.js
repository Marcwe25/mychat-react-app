import { SUCCEEDED } from "../const/constNames"
import { addNotification } from "../containers/notifications/notificationsAction"
import { ADD_MESSAGE } from "../containers/room/messages/messagesReducer"
import { incrementUnread, setLastPost } from "../containers/rooms/roomsAction"
import { UPDATE_LAST_POST } from "../containers/rooms/roomsReducer"
import { SET_CLIENT_STATE } from "./clientState"


const subscription = {

    onMessageCallback : null,
    messagingSubscription : null,
    systemSubscription : null,
    chatRoomId:null,
    client : null,

    initSubscription (client) {
        this.client = client
    },

    makeAllSubscription () {
        console.log("state",this.client.storeAPI.getState())
        const roomList = this.client.storeAPI.getState().rooms.entities

        console.log("makeAllSubscription roomList",roomList)

        if (roomList) {
            this.checkStore ()
            Object.values(roomList).forEach(room => {
                if (room.memberRoomEnable){
                    console.log("calling message subscription")
                    this.makeSubscription(room.id)
                    }

                }   
            )
        }
        if (!this.systemSubscription) {
            this.makeSystemSubscription()
        }
        this.client.storeAPI.dispatch({
            type: SET_CLIENT_STATE,
            payload:SUCCEEDED
        })
      },

    

    makeSystemSubscription() {
        console.log("makeSystemSubscription this", this)

        // const systemCallBack = (message => addNotification(message))

        const systemCallBack = (message => addNotification(message))

        this.makeSubscribe(`/user/queue/to-user${this.client.socket.getSessionId()}`, systemCallBack)
    },

    checkStore () {

        if (!this.messagingSubscription) {
            this.messagingSubscription = {}
          }
          if (!this.onMessageCallback) {
            this.onMessageCallback = []
          }
    },

    makeSubscribe (destination, callback) {
        const stompClient = this.client.socket.stompClient
        // console.log("sending subscribe, stompclient :",stompClient)
        // console.log("sending subscribe, this.client.stompClient :",this.client.stompClient)

        if (stompClient && stompClient.active) {
            let subscribtion = null
            try {
                console.log("try subscribe, stompclient :",stompClient)
                subscribtion = stompClient.subscribe(
                    destination,
                    message => {callback(JSON.parse(message.body))},
                    { 'ack': `ack received for room ${destination}` }
                    )
            }
            catch (err) {console.err(err)}
            return subscribtion;
        }
    },
    
    
    chatMessageCallBack(message) {
        console.log("chatMessageCallBack this :",this)
        this.client.storeAPI.dispatch({
            type:ADD_MESSAGE,
            payload:message
        })
    },

    lastMessageCallBack(message) {
        console.log("lastMessageCallBack this :",this)
        this.client.storeAPI.dispatch(setLastPost(message))
        this.client.storeAPI.dispatch(incrementUnread(message.room))

        // this.client.storeAPI.dispatch({
        //     type:UPDATE_LAST_POST,
        //     payload: message
        // })
        },
    
    setLastMessageCallBack(roomId) {
        if (this.onMessageCallback) {
        this.onMessageCallback[roomId] = this.lastMessageCallBack.bind(this)
        }
    },
    
    setChatMessageCallBack(roomId) {
    if (this.onMessageCallback) {
      this.onMessageCallback[roomId] = this.chatMessageCallBack.bind(this)
    }
    },
    
    makeSubscription(roomId) {
        console.log("running makeSubscription")
        this.setLastMessageCallBack(roomId)
        this.messagingSubscription[roomId] = this.makeSubscribe(`/topic/${roomId}`,
      (message) => {
        this.onMessageCallback[roomId](message)
      })
    },



    setChatRoom (roomTarget) {
        if (this.onMessageCallback) {
            const previousRoom = this.chatRoomId
            this.onMessageCallback[roomTarget] = this.chatMessageCallBack.bind(this)
            // this.onMessageCallback[roomTarget] = this.chatMessageCallBack

            if(previousRoom && previousRoom>0){
                this.onMessageCallback[previousRoom] = this.lastMessageCallBack.bind(this)
                // this.setLastMessageCallBack(previousRoom)
                
            }
            this.chatRoomId = roomTarget
          }
    }

}

export default subscription