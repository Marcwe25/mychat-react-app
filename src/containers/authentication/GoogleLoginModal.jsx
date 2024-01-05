import { useDispatch } from "react-redux"
import { Modal } from "../../modal/Modal"

export default function GoogleLoginModal () {

    const dispatch = useDispatch()

    window.google.accounts.id.prompt((notification) => {

        if (notification.isNotDisplayed() || notification.isSkippedMoment()) {
                dispatch(logoutUser())
            }
    })

    return <Modal/>

}