import { SUCCEEDED } from "../../const/constNames"

export const FRIENDS_STATUS = "friends/state"
export const SET_FRIENDS = "friends/set_friends"

const initialState = {
    entities:null,
    status:null
}

const friendsReducer = (state=initialState, action) => {

    switch (action.type) {
        case SET_FRIENDS:
            return {...state,
                entities:{...action.payload}}
        case FRIENDS_STATUS:{
            return {...state,
                status:action.payload
            }
        }
        default:
            return state
    }
}

export default friendsReducer
