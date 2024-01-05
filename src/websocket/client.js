import { LOADING, SUCCEEDED } from '../const/constNames';
import socket from './socket';
import subscription from './subscription';
import { setClientState } from './clientState';

const client = {

    socket : null,
    storeAPI:null,
    subscription:null,

    async initClient (storeAPI) {
      if (storeAPI.getState().clientState.status === LOADING) return (false)
      storeAPI.dispatch(setClientState(LOADING))
      this.socket = socket
      this.subscription = subscription
      this.storeAPI = storeAPI
      this.socket.initStompClient(this)
      this.subscription.initSubscription(this)
      if (!this.socket.stompClient.active) await this.socket.stompClient.activate()
      storeAPI.dispatch(setClientState(SUCCEEDED))
    },

    sendMessage (message) {
        if (this.socket) {
          this.socket.publishMessage(message)
        }
      },
    
      onConnectCallBack () {
        subscription.makeAllSubscription(socket.stompClient,client.storeAPI)
    },

    async down () {
      if(this.socket?.stompClient){
        await this.socket.stompClient?.deactivate()
        this.socket.stompClient = null
      }
      this.subscription && this.removeSubscribtion()
      this.storeAPI?.dispatch(setClientState(null))
    },
    
    removeSubscribtion () {
      if(this.subscription){
        this.subscription.onMessageCallback = null
        this.subscription.messagingSubscription = null
        this.subscription.systemSubscription = null
        this.subscription.chatRoomId = null
        this.subscription.client = null
        this.subscription = null
      }

    }
}

export default client