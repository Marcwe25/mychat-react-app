import SockJS from 'sockjs-client';
import { Client } from '@stomp/stompjs';
import { ws_url } from '../const/constsURL';
import { ACCESS_TOKEN, AUTHORIZATION, LOADING } from '../const/constNames';
import { ADD_MESSAGE } from '../containers/room/messages/messagesReducer';
import socket from './socket';
import subscription from './subscription';
import { SET_CLIENT_STATE } from './clientState';

const client = {

    socket : socket,
    storeAPI:null,
    subscription:subscription,

    initClient (storeAPI) {

        if (storeAPI.getState().clientState.status === LOADING) return (false)

        storeAPI.dispatch({
            type: SET_CLIENT_STATE,
            payload:LOADING
        })

        this.storeAPI = storeAPI

        this.socket.initStompClient(this)
        this.subscription.initSubscription(this)

        console.log("going to activate")
        this.socket.stompClient.activate()
    },

    sendMessage (message) {
        if (this.socket) {
          this.socket.publishMessage(message)
        }
      },
    

      onConnectCallBack () {
        console.log("onConnectCallBack this", this)

        console.log("onConnectCallBack stompClient",socket )
        console.log("onConnectCallBack this.storeAPI",client.storeAPI)
        console.log("onConnectCallBack makeAllSubscription",subscription.makeAllSubscription)

        subscription.makeAllSubscription(socket.stompClient,client.storeAPI)
    },

    down () {
      this.socket.stompClient.deactivate()
      this.subscription.onMessageCallback = null
      this.subscription.messagingSubscription = null
      this.subscription.systemSubscription = null
      this.subscription.chatRoomId = null
      this.subscription.client = null
    }
    

}

export default client