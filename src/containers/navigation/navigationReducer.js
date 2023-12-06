import { APP_MENU } from "../../const/constNames"

export const ADD_TO_WINDOW_PATH = "addToWindowPath"
export const REMOVE_FROM_WINDOW_PATH = "removeFromWindowPath"
export const ADD_TO_MENU_PATH = "addToMenuPath"
export const REMOVE_FROM_MENU_PATH = "removeFromMenuPath"
export const SET_WINDOW_PATH = "setWindowPath"
export const SET_MENU_PATH = "setMenuPath"

const initialState = {
    windowPath:[0],
    menuPath:[]
}

const navigationReducer = (state=initialState, action) => {

    switch (action.type) {
        case ADD_TO_WINDOW_PATH:
            const newPath = [...state.windowPath,action.payload]
            return {...state,
                windowPath:newPath,
                menuPath:[],
            }

        case SET_WINDOW_PATH:
            return {...state,
                windowPath:action.payload,
            }
        case SET_MENU_PATH:
            return {...state,
                menuPath:action.payload,
            }
        case ADD_TO_MENU_PATH:
            const newMenuPath = [...state.menuPath,action.payload]
            return {...state,
                menuPath:newMenuPath
            }
        case REMOVE_FROM_WINDOW_PATH:
            return { ...state,
                windowPath: state.windowPath.slice(0,-1)
            }
        case REMOVE_FROM_MENU_PATH:
            return { ...state,
                menuPath: state.menuPath.slice(0,-1)
            }
        default:
            return state
    }
}

export default navigationReducer
