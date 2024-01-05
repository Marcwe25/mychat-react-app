export const DATA_STATUS = "DATA/STATUS"
export const DATA_REFRESH = "DATA/REFRESH"

const initialState = {
    status:null,
    refresh:false
}

const appDataReducer = (state=initialState, action) => {

    switch (action.type) {
        case DATA_STATUS:{
            return {...state,
                status:action.payload
            }
        }
        case DATA_REFRESH:{
            return {...state,
                refresh:action.payload
            }
        }

        default:
            return state
    }
}

export default appDataReducer
