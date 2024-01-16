import { MAIN_WINDOWS } from "../../const/constNames"
import { ADD_TO_NAVIGATION_PATH, BROWSER_HISTORY_INCREMENT, GO_TO_WINDOW, POSITIONN_DECREMENT, POSITIONN_INCREMENT, SET_BROWSER_HISTORY_INDEX, SET_NAVIGATION_PATH, selectPreviousWindow } from "./navigationReducer"


export function goToWindow (n) {
    return function nextWindow (dispatch) {
        dispatch({
            type:BROWSER_HISTORY_INCREMENT
        })
        dispatch({
            type:GO_TO_WINDOW,
            payload:n
        })
    }
}

export function goToPreviousWindow () {
    return async function nextWindowThunk (dispatch,getState) {
        dispatch({
            type:POSITIONN_DECREMENT,
        })
        const targetWindow = selectPreviousWindow(getState())
        dispatch({
            type:ADD_TO_NAVIGATION_PATH,
            payload:targetWindow
        })
        dispatch({
            type:POSITIONN_DECREMENT,
        })
    }
}

export function goToNextWindow () {
    return async function nextWindowThunk (dispatch,getState) {
        dispatch({
            type:POSITIONN_INCREMENT,
        })
        const targetWindow = selectPreviousWindow(getState())
        dispatch({
            type:ADD_TO_NAVIGATION_PATH,
            payload:targetWindow
        })
        dispatch({
            type:POSITIONN_INCREMENT,
        })
    }
}

export function resetNavigation () {
    return async function nextWindowThunk (dispatch) {
        dispatch({
            type:SET_NAVIGATION_PATH,
            payload:{
                navigationPath:[MAIN_WINDOWS],
                navigationPosition:-1
            }
        }
        )
    }
}

export function syncWithHistory (historyIndex) {
    return function syncThunk (dispatch,getState) {
        const browserIndex = getState().navigation.browserIndex

        if(browserIndex>historyIndex) {
            dispatch(goToPreviousWindow())
        }
        if(browserIndex<historyIndex) {
            dispatch(goToNextWindow())
        }
        dispatch({
            type:SET_BROWSER_HISTORY_INDEX,
            payload: historyIndex
        })
    }
}
