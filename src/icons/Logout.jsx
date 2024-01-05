import { useDispatch } from "react-redux";
import './icons.css';
import { logoutUser } from "../containers/authentication/authActions";



export default function Logout () {

    const dispatch = useDispatch()

    function handleLogout () {
        dispatch(logoutUser())
    }

    return (
        <span className="buttonCompo" onClick={handleLogout}>
        <div className='logoutIcon menuButton' />
        <span className="buttonTxt">SIGN OUT</span>
        </span>

    )
}