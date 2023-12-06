import { useDispatch } from "react-redux"
import { ADD_TO_CHAT_PAGE } from "../const/constNames"
import { goToMenu } from "../containers/navigation/navigationAction"


export default function AddUserToChat () {

  const dispatch = useDispatch()


  const handleClick = () => {
    dispatch(goToMenu(ADD_TO_CHAT_PAGE))
  }

    return (       
        <div 
        className= 'addUserIcon menuButton' 
        onClick={handleClick}>
        </div>
    )
}