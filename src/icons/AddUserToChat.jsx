import { useDispatch } from "react-redux"
import { ADD_TO_CHAT_PAGE } from "../const/constNames"
import { goToWindow } from "../containers/navigation/navigationAction"


export default function AddUserToChat () {

  const dispatch = useDispatch()


  const handleClick = () => {
    dispatch(goToWindow(ADD_TO_CHAT_PAGE))
  }

    return (       
        <div 
        className= 'addUserIcon menuButton' 
        onClick={handleClick}>
        </div>
    )
}