export const ADD_MESSAGE = "addMessage"
export const SET_MESSAGES = "setMessages"

const initialState = {
    messages:[]
}

const messagesReducers = (state=initialState, action) => {

    switch (action.type) {
        case ADD_MESSAGE:
            action.payload.dateTime = new Date(action.payload.dateTime)

            return {...state,
                messages:[...state.messages, action.payload]
            }
        case SET_MESSAGES:
            return {...state,
                messages:[...action.payload]
            }
        default:
            return state
    }
}

export default messagesReducers
