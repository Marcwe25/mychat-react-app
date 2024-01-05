import { ADD_IS_TYPING, REMOVE_IS_TYPING } from "./isTypingReducer"


export function addisTypijng (notification)  {

    const TIMEOUT_LENGHT = 5000

    return async function dispatchisTyping (dispatch) {
        dispatch({
            type:ADD_IS_TYPING,
            payload:notification
        })
    
        setTimeout(()=>{
            dispatch({
                type:REMOVE_IS_TYPING,
                payload:notification
            })
        },TIMEOUT_LENGHT)
    }
}



