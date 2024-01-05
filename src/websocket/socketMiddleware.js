import client from './client';

export const WS_INIT = "WS/INIT"
export const WS_SEND_MESSAGE = "WS/SEND_MESSAGE"
export const WS_SWITCH_TO = "WS/SWITCH_TO"
export const WS_DOWN = "WS/DOWN"
export const WS_CONFIRM_STATUS = "WS/CONFIRM_STATUS"
export const WS_SUBSCRIBE_TO = "WS/SUBSCRIBE_TO"
export const WS_SET_TO_CHAT = "WS/SET_TO_CHAT"

export function webSocketMiddleware(storeAPI) {

    let myClient = client
    return function wrapDispatch(next) {
      return function handleAction(action) {

        switch (action.type) {
            case WS_INIT:
                if(storeAPI.getState().auth.accessToken == null) {
                    break;
                }
                myClient.initClient(storeAPI)
                break;
            case WS_SEND_MESSAGE :
                myClient.socket.publishMessage(action.payload)
                break;
            case WS_SUBSCRIBE_TO :
                myClient.subscription.makeSubscription(action.payload)
                break;
            case WS_SET_TO_CHAT :
                myClient.subscription.setToChat(action.payload)
                break;
            case WS_DOWN :
                myClient.down()
            case WS_CONFIRM_STATUS :
                confirmSocketIsActive()
            default:
                break;
        }

        function confirmSocketIsActive () {
            switch (true) {
                case myClient==null:
                    myClient == client
                case myClient.socket == null:
                    storeAPI.dispatch({type:WS_INIT})
                case !myClient.socket.stompClient.active:
                    storeAPI.dispatch({type:WS_INIT})
                default:
                    break;
                }     
        }
        return next(action)
    }
    }
  }