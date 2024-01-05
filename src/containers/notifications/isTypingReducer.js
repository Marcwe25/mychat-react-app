export const ADD_IS_TYPING = "TYPING/ADD_IS_TYPING"
export const REMOVE_IS_TYPING = "TYPING/REMOVE_IS_TYPING"



function filterObject (obj, t) {



    return Object.keys(obj)
          .filter( key => key!=t )
          .reduce( (res, key) => Object.assign(res, { [key]: obj[key] }), {} );
}


const initialState = {
    isTypingNotifications:{},
        status:null
    }

const isTypingReducer = (state=initialState, action) => {
    switch (action.type) {

    
    case ADD_IS_TYPING :
        if(!state.isTypingNotifications.hasOwnProperty(action.payload.to)) return {
            ...state,
            isTypingNotifications:{
                ...state.isTypingNotifications,
                [`${action.payload.to}`]:action.payload.from.username
            }
        }

        return state
    
    case REMOVE_IS_TYPING :
        if(state.isTypingNotifications.hasOwnProperty(action.payload.to)) return {
            ...state,
            isTypingNotifications: filterObject(state.isTypingNotifications,action.payload.to)
        }
        return state

    default:
        return state
    }
}

export default isTypingReducer 
