import {createStore, applyMiddleware,compose} from "redux"
import reducers from "./reducersIndex"
import thunk from "redux-thunk"
import { webSocketMiddleware } from "../websocket/socketMiddleware";
import historyMiddleware from "../containers/navigation/historyMiddleWare";


const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export const store = createStore(
    reducers, 
    composeEnhancers(
    applyMiddleware(thunk,webSocketMiddleware, historyMiddleware)
  ));


