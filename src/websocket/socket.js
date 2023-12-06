import SockJS from 'sockjs-client';
import { Client } from '@stomp/stompjs';
import { ws_url } from '../const/constsURL';
import { AUTHORIZATION } from '../const/constNames';

const socket = {

    stompClient : null,
    client:null,
    
    getConnectionURL () {
        return `${ws_url}?accesstoken=${this.client.storeAPI.getState().auth.accessToken}`
    },

    initStompClient (client) {

        this.client = client
        this.configStompClient ()
        console.log("done init",this.stompClient,this.client.storeAPI.getState())
        },

    
    configStompClient () {
        const socket        = new SockJS(this.getConnectionURL ());
        this.stompClient    = new Client({ webSocketFactory: () => socket })

        // this.stompClient.connectHeaders = {[`${AUTHORIZATION}`]: `Bearer ${accessToken}`}

        this.stompClient.onChangeState  = (state) => {console.warn("stomp clien change status to : ", state)}
        this.stompClient.onDisconnect   = () => {console.warn("stomp client disconnected")}
        this.stompClient.onConnect      = this.client.onConnectCallBack
        this.stompClient.reconnect_delay = 5000;

        console.log("configStompClient done",this.stompClient,this.client.storeAPI.getState())

        },

    getSessionId () {
        const arr = this.stompClient
            .webSocket
            ._transport.ws.url
            .split("?")[0]
            .split("/")
        const i1 = arr.indexOf("websocket")
        const sessionId = arr[i1 - 1]
        return sessionId
    },

    publishMessage ({destination, message}) {
        
        if (this.stompClient.active) {
          this.stompClient.publish({ destination: destination, body: JSON.stringify(message) });
        }
      },


    }



    export default socket