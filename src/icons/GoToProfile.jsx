import { useDispatch } from 'react-redux';
import './icons.css';
import { PROFILE } from '../const/constNames';
import {ADD_TO_MENU_PATH} from '../containers/navigation/navigationReducer'



export default function GoToProfile () {

  const dispatch = useDispatch()

  const handleClick = () => {
      dispatch({
          type:ADD_TO_MENU_PATH,
          payload: PROFILE
      })
  }


    return (       
            <span className="buttonCompo" onClick={handleClick}>
                <div className='profileIcon menuButton' />
                <span className="buttonTxt">PROFILE</span>
            </span>

    )

}