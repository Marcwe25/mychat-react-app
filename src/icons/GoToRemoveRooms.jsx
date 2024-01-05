import { useDispatch } from "react-redux"
import { REMOVE_ROOMS } from "../const/constNames"
import { goToMenu } from "../containers/navigation/navigationAction"

export default function GoToRemoveRooms () {


  const dispatch = useDispatch()

  const handleClick = () => {
      dispatch(goToMenu(REMOVE_ROOMS))
  }


  return (       
    <span className="buttonCompo" onClick={handleClick}>
        <div className='addUserIcon menuButton' />
        <span className="buttonTxt">REMOVE ROOMS</span>
    </span>
  )
}