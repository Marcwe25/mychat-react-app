export const SET_MEMBER = "AUTHENTICATION/SET_MEMBER"
export const SET_ACCESS_TOKEN = "AUTHENTICATION/SET_ACCESS_TOKEN"
export const SET_REFRESH_TOKEN = "AUTHENTICATION/SET_REFRESH_TOKEN"
export const SET_TOKENS = "AUTHENTICATION/SET_TOKENS"
export const SET_AUTHENTICATION = "AUTHENTICATION/SET_AUTHENTICATION"
export const SET_REMEMBERME = "AUTHENTICATION/SET_REMEMBERME"
export const SET_TOKEN_STATUS = "AUTHENTICATION/SET_TOKEN_STATUS"
export const RESET_AUTHENTICATION = "AUTHENTICATION/RESET_AUTHENTICATION"
export const SET_GOOGLE_LOGIN = "AUTHENTICATION/SET_GOOGLE_LOGIN"
export const SET_ISS = "AUTHENTICATION/SET_ISS"


const authReducer = (

    state={
        registeredMember:null,
        accessToken:null,
        refreshToken:null,
        remberMe:null,
        iss:null,
    },
    action) => {

    switch (action.type) {
        case SET_MEMBER:
            return {...state,
                registeredMember:action.payload
            }

        case SET_ACCESS_TOKEN:
            return {...state,
                accessToken:action.payload
           }

        case SET_REFRESH_TOKEN:
            return {...state,
                refreshToken:action.payload
            }

        case SET_TOKENS:
            return {...state,
                refreshToken:action.payload.refresh_token,
                accessToken:action.payload.access_token
            }

        case SET_AUTHENTICATION:
            return {...action.payload}
        
        case SET_ISS:
            return {...state,
                iss:action.payload
            }
        case SET_REMEMBERME:
            return {...state,
                remberMe:action.payload
            }
        case SET_GOOGLE_LOGIN:
            return {
                registeredMember:null,
                accessToken:null,
                refreshToken:null,
                remberMe:null,
                iss:"GOOGLE"
            }
        default:
            return state
    }
}

export default authReducer
export const selectRegisteredMember = (state) => state.auth.registeredMember
export const selectAccessToken = (state) => state.auth.accessToken
export const selectRefreshToken = (state) => state.auth.refreshToken