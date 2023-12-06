import { useDispatch } from "react-redux"
import { NEW_ROOM } from "../const/constNames"
import { goToMenu } from "../containers/navigation/navigationAction"

export default function AddUser () {


  const dispatch = useDispatch()

  const handleClick = () => {
      dispatch(goToMenu(NEW_ROOM))
  }


  return (       
    <span className="buttonCompo" onClick={handleClick}>
        <div className='addUserIcon menuButton' />
        <span className="buttonTxt">ADD CONTACT</span>
    </span>
  )
}