import SockJS from 'sockjs-client';
import { Client } from '@stomp/stompjs';
import { csrfURL, ws_url } from '../const/constsURL';
import { AUTHORIZATION, CSRF_HEADER_NAME, FAILED } from '../const/constNames';
import { SET_CLIENT_STATE } from './clientState';
import axiosInstance from '../axiosInstanceGenerator';

const socket = {

    stompClient : null,
    client:null,
    
    getConnectionURL () {
        return `${ws_url}?accesstoken=${this.client.storeAPI.getState().auth.accessToken}`
    },

    async get_csrsf () {
      const csrf = await axiosInstance.get(csrfURL)
      return csrf
    },

    initStompClient (client) {
        this.client = client
        this.configStompClient ()
        },

    configStompClient () {
        if(this.stompClient == null) {
          const socket        = new SockJS(ws_url);
          this.stompClient    = new Client({ webSocketFactory: () => socket })
          
          this.stompClient.connectHeaders = {
            access_token : `${this.client.storeAPI.getState().auth.accessToken}`,
          }
          this.stompClient.onChangeState  = (state) => {console.warn("stomp clien change status to : ", state)}
          this.stompClient.onDisconnect   = () => {
              this.client.storeAPI.dispatch({type:SET_CLIENT_STATE,payload:FAILED})
          }
          this.stompClient.onConnect      = this.client.onConnectCallBack
          this.stompClient.reconnect_delay = 5000;
        };
        
        },

    publishMessage ({destination, message}) {
        
        if (this.stompClient.active) {
          try {
            this.stompClient.publish({ destination: destination, body: JSON.stringify(message) });
          } catch (error) {
            console.error(error)
            throw error
          }
        }
      },


    }

    export default socket