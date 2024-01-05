import { SUCCEEDED } from "../../const/constNames"

    export const NOTIFICATIONS_SET_STATUS = "NOTIFICATIONS/SET_STATUS"
    export const NOTIFICATIONS_FETCH_SUCCESS = "NOTIFICATIONS/FETCH_SUCCESS"
    export const NOTIFICATIONS_ADD_NOTIFICATION = "NOTIFICATIONS/ADD_NOTIFICATION"

    const initialState = {
            entities:{},
            types:[],
            status:null
        }

    const notificationsReducer = (state=initialState, action) => {
        switch (action.type) {
        case NOTIFICATIONS_FETCH_SUCCESS :
            return { ...state,
                 entities: action.payload.notifications,
                 types: action.payload.notificationType,
            }
        
        case NOTIFICATIONS_ADD_NOTIFICATION :
            const notification = action.payload
            const ntype = notification.type

            return { ...state,
                entities: {
                    ...state.entities,
                    [`${ntype}`]:
                        state.entities.hasOwnProperty(ntype) ?  [...state.entities[`${ntype}`], notification] : [notification]

                },
           } 
        

        case NOTIFICATIONS_SET_STATUS :
            return {...state,status:action.payload}

        default:
            return state
        }
    }

    export default notificationsReducer


