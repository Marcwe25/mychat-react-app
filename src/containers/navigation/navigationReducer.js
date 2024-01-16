

export const NAVIGATION_PREFIX          = "nav_igation_"
export const BROWSER_PREFIX          = "br_ow_ser"

export const SET_NAVIGATION             = NAVIGATION_PREFIX+"SET_NAVIGATION"
export const ADD_TO_NAVIGATION_PATH     = NAVIGATION_PREFIX+"ADD_TO_NAVIGATION_PATH"
export const SET_NAVIGATION_PATH        = NAVIGATION_PREFIX+"SET_NAVIGATION_PATH"
export const SET_POSITION               = NAVIGATION_PREFIX+"SET_POSITION"
export const POSITIONN_INCREMENT        = NAVIGATION_PREFIX+"POSITIONN_INCREMENT"
export const POSITIONN_DECREMENT        = NAVIGATION_PREFIX+"POSITIONN_DECREMENT"
export const GO_TO_WINDOW                     = NAVIGATION_PREFIX+"GO_TO_WINDOW"
export const SET_BROWSER_HISTORY_INDEX        = BROWSER_PREFIX+"BROWSER_POSITION"
export const BROWSER_HISTORY_INCREMENT        = BROWSER_PREFIX+"BROWSER_HISTORY_INCREMENT"
export const BROWSER_HISTORY_DECREMENT        = BROWSER_PREFIX+"BROWSER_HISTORY_DECREMENT"

const initialState = {
    navigationPath:[],
    navigationPosition:-1,
    browserIndex:0
}

const navigationReducer = (state=initialState, action) => {
    switch (action.type) {
        case ADD_TO_NAVIGATION_PATH:
            return {...state,
                navigationPath:[...state.navigationPath,action.payload],
            }
        case GO_TO_WINDOW:
            return {...state,
                navigationPath:[...state.navigationPath,action.payload],
                navigationPosition:-1
            }
        case SET_NAVIGATION_PATH:
            return {...state,
                navigationPath:action.payload.navigationPath,
                navigationPosition:action.payload.navigationPosition
            }
        case SET_POSITION:
            return {...state,
                navigationPosition:action.payload
            }
        case POSITIONN_INCREMENT:
            return {...state,
                navigationPosition:state.navigationPosition+1
            }
        case POSITIONN_DECREMENT:
            return {...state,
                navigationPosition:state.navigationPosition-1
            }
        case SET_BROWSER_HISTORY_INDEX:
            return {...state,
                browserIndex:action.payload
            }
        case BROWSER_HISTORY_INCREMENT:
            const incr_index = state.browserIndex+1
            return {...state,
                browserIndex:incr_index
            }
        case BROWSER_HISTORY_DECREMENT:
            const dec_index = state.browserIndex-1
            return {...state,
                browserIndex:dec_index
            }
        default:
            return state
    }
}

export default navigationReducer


export const selectPreviousWindow = (state) => state.navigation.navigationPath.at(state.navigation.navigationPosition);

export const selectTargetWindow = (state) => state.navigation.navigationPath.at(-1);


