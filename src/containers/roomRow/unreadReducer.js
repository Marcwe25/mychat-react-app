export const SET_UNREAD = "unread/SET_UNREAD"
export const SET_UNREAD_STATUS = "unread/setState"
export const RESET_UNREAD = "unread/RESET_UNREAD"
export const INCREMENT_UNREAD = "unread/INCREMENT_UNREAD"

const initialState = {
    entities:{},
    status:null
}

const unreadsReducer = (state=initialState, action) => {

    switch (action.type) {
        case SET_UNREAD:
            return {...state,
                entities:{...action.payload}}

        case RESET_UNREAD:
            return {...state,
                entities:{...state.entities,
                [action.payload]:0
                }}

        case SET_UNREAD_STATUS:{
            return {...state,
                status:action.payload
            }
        }

        case INCREMENT_UNREAD:
            return {...state,
                entities:{...state.entities,
                    [action.payload] : state.entities[action.payload]+1
                }
            }
        default:
            return state
    }
}

export default unreadsReducer
