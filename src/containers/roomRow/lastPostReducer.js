export const UPDATE_LAST_POST = "lastPosts/updateLastPost"
export const LASTPOST_STATUS = "lastPosts/LASTPOST_STATUS"

export const SET_LASTPOSTS = "lastPosts/SET_LASTPOSTS"

const initialState = {
    entities:{},
    status:null
}

const lastPostReducer = (state=initialState, action) => {

    switch (action.type) {
        case SET_LASTPOSTS:
            return {...state,
                entities:{...action.payload}}

        case UPDATE_LAST_POST:
            return {...state,
            entities: {
                ...state.entities,
                [action.payload.room]:action.payload
            }
        }

        case LASTPOST_STATUS:{
            return {...state,
                status:action.payload
            }
        }
        default:
            return state
    }
}

export default lastPostReducer
