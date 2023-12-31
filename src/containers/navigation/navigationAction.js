import { MAIN_WINDOWS } from "../../const/constNames"
import { ADD_TO_MENU_PATH, ADD_TO_WINDOW_PATH, REMOVE_FROM_MENU_PATH, REMOVE_FROM_WINDOW_PATH, SET_MENU_PATH, SET_WINDOW_PATH } from "./navigationReducer"


export function goToWindow (n) {
    return function nextWindow (dispatch) {
        dispatch({
            type:ADD_TO_WINDOW_PATH,
            payload:n
        })
    }
}

export function goToreviousWindow () {
    return async function nextWindowThunk (dispatch) {
        dispatch({
            type:REMOVE_FROM_WINDOW_PATH,
        })

    }
}

export function goToMenu (n) {
    return async function nextMenu (dispatch) {
        dispatch({
            type:ADD_TO_MENU_PATH,
            payload:n
        })
        
    }
}

export function goToPreviousMenu () {
    return async function previousMenu (dispatch) {
        dispatch({type:REMOVE_FROM_MENU_PATH})

    }
}

export function resetWindowPath () {
    return async function nextWindowThunk (dispatch) {
        dispatch({type:SET_WINDOW_PATH, payload:[]})

    }
}

export function resetMenuPath () {
    return async function nextWindowThunk (dispatch) {
        dispatch({type:SET_MENU_PATH, payload:[MAIN_WINDOWS]})

    }
}