// status: 'idle' | 'loading' | 'succeeded' | 'failed'
export const SET_ROOMS = "rooms/setRooms"
export const UPDATE_LAST_POST = "rooms/updateLastPost"
export const ROOMS_STATUS = "rooms/setState"
export const RESET_UNREAD = "rooms/RESET_UNREAD"
export const INCREMENT_UNREAD = "rooms/INCREMENT_UNREAD"

const initialState = {
    entities:{},
    status:null
}

const roomsReducer = (state=initialState, action) => {

    switch (action.type) {
        case SET_ROOMS:
            return {...state,
                entities:{...action.payload}}

        case UPDATE_LAST_POST:
            const roomid = action.payload.room
            const rooms = state.entities
            const newRoom = {...rooms[roomid],lastPost:action.payload}
            return {...state,
                entities:{...rooms,
                    [roomid] : newRoom
                }
            }
        case RESET_UNREAD:
            return {...state,
                entities:{...state.entities,
                    [action.payload] : {...state.entities[action.payload], unread:0}
                }
            }
        case INCREMENT_UNREAD:
            return {...state,
                entities:{...state.entities,
                    [action.payload] : {...state.entities[action.payload], unread:state.entities[action.payload].unread+1}
                }
            }
        case ROOMS_STATUS:{
            console.log("roomsReducer ROOMS_STATE", action.payload)

            return {...state,
                status:action.payload
            }
        }
        default:
            return state
    }
}

export default roomsReducer
