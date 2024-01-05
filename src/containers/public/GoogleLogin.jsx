import { useEffect } from "react"
import { googleClientId } from "../../const/ids"
import { useDispatch } from "react-redux"
import axiosInstance from "../../axiosInstanceGenerator"
import { setAccessToken, setMemberFromGoogle, setRefreshToken, setRegisteredMember } from "../authentication/authActions"
import { setDataStatus } from "../appData/appDataAction"

const loadScript = (src) =>
    new Promise((resolve, reject) => {
        if (document.querySelector(`script[src="${src}"]`)) return resolve()
        const script = document.createElement('script')
        script.src = src
        script.onload = () => resolve()
        script.onerror = (err) => reject(err)
        document.body.appendChild(script)
    })

export default function GoogleLogin() {

    const dispatch = useDispatch()

    async function handleGoogleCallbackResponse(googleResponse) {

        // getting member
        dispatch(setAccessToken(googleResponse.credential))
        const response = await axiosInstance.get("/Oauth2/member/google")

        //setting in store
        const member = response.data.member
        const tokens = response.data.authorization
        dispatch(setMemberFromGoogle())
        dispatch(setRegisteredMember(member))
        dispatch(setAccessToken(tokens.access_token))
        dispatch(setRefreshToken(tokens.refresh_token))

        //reload user data
        dispatch(setDataStatus(null))
    }

    const initGoogleLogin = async () => {
        await google.accounts.id.initialize({
            client_id: `${googleClientId}`,
            callback: handleGoogleCallbackResponse,

        })
        await google.accounts.id.renderButton(
            document.getElementById("googleOADiv"),
            {
                theme: "filled_black",
                shape: "pill",
                width: 300,
                locale : "en-US"
            })
    }

    useEffect(() => {
        const src = 'https://accounts.google.com/gsi/client?hl=en-US'
        loadScript(src)
        .then(() => {
            initGoogleLogin()
        })
        .catch(console.error)
    }, [])


    return <div id="googleOADiv"  />
}