    export const NOTIFICATIONS_SET_STATUS = "NOTIFICATIONS/SET_STATUS"
    export const NOTIFICATIONS_FETCH_SUCCESS = "NOTIFICATIONS/FETCH_SUCCESS"
    export const NOTIFICATIONS_ADD_NOTIFICATION = "NOTIFICATIONS/ADD_NOTIFICATION"

    const initialState = {
            entities:[],
            status:null
        }
    const notificationsReducer = (state=initialState, action) => {
        switch (action.type) {

        case NOTIFICATIONS_FETCH_SUCCESS :{
            return { ...state, entities: action.payload
            
            }
        }

        case NOTIFICATIONS_ADD_NOTIFICATION :{
            const type = action.payload.type
            return {
            ...state,entities:{
                ...state.entities, [type]: !state.entities.hasOwnProperty(type) ?[action.payload]:[...state.entities[type],action.payload]}
            }
        }

        case NOTIFICATIONS_SET_STATUS :
            console.log("NOTIFICATIONS_SET_STATUS",action.payload )
            return {...state,status:action.payload}

        default:
            return state
        }
    }



    export default notificationsReducer
