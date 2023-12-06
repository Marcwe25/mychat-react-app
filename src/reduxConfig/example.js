const createMySocketMiddleware = (url) => {
    return storeAPI => {
        let socket = createMyWebsocket(url);

        socket.on("message", (message) => {
            storeAPI.dispatch({
                type : "SOCKET_MESSAGE_RECEIVED",
                payload : message
            });
        });

        return next => action => {
            if(action.type == "SEND_WEBSOCKET_MESSAGE") {
                socket.send(action.payload);
                return;
            }

            return next(action);
        }
    }
}

// later, in your app
function sendSocketMessage(message) {
    return {
        type : "SEND_WEBSOCKET_MESSAGE",
        payload : message
    }
}

class MyComponent extends React.Component {
    handleClick = () => {
        this.props.sendSocketMessage("This goes to the server");
    }
}

export default connect(null, {sendSocketMessage})(MyComponent)