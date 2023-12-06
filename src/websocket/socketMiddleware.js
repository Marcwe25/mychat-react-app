import SockJS from 'sockjs-client';
import { Client } from '@stomp/stompjs';
import { ws_url } from '../const/constsURL';
import { ACCESS_TOKEN, AUTHORIZATION } from '../const/constNames';
import client from './client';

// Middleware written as ES5 functions
export const WS_INIT = "WS/INIT"
export const WS_SEND_MESSAGE = "WS/SEND_MESSAGE"
export const WS_SWITCH_TO = "WS/SWITCH_TO"
export const WS_DOWN = "WS/DOWN"

// Outer function:
export function webSocketMiddleware(storeAPI) {

    let myClient = client

    return function wrapDispatch(next) {
      return function handleAction(action) {

        switch (action.type) {
            case WS_INIT:
                myClient.initClient(storeAPI)
                break;
            case WS_SEND_MESSAGE :
                myClient.socket.publishMessage(action.payload)
                break;
            case WS_SWITCH_TO :
                myClient.subscription.setChatRoom(action.payload)
                break;
            case WS_DOWN :
                myClient.down()

            default:
                break;
        }

        return next(action)}
    }
  }