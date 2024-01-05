
export const SET_ROOMS = "rooms/setRooms"
export const ROOMS_STATUS = "rooms/setState"
export const ROOM_REMOVE = "rooms/ROOM_REMOVE"

const initialState = {
    entities:{},
    status:null
}

const roomsReducer = (state=initialState, action) => {

    switch (action.type) {
        case SET_ROOMS:
            return {...state,
                entities:{...action.payload}}
        case ROOM_REMOVE:
            const filtered = Object.entries(state.entities).filter(([key,value]) => key != action.payload)
            const entities = Object.fromEntries(filtered)
            return {...state,
                    entities:entities
                }
        case ROOMS_STATUS:{
            return {...state,
                status:action.payload
            }
        }

        default:
            return state
    }
}

export default roomsReducer
