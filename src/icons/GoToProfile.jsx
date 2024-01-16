import { useDispatch } from 'react-redux';
import './icons.css';
import { PROFILE } from '../const/constNames';
import { goToWindow } from '../containers/navigation/navigationAction';



export default function GoToProfile () {

  const dispatch = useDispatch()

  const handleClick = () => {
      dispatch(goToWindow(PROFILE))
  }


    return (       
            <span className="buttonCompo" onClick={handleClick}>
                <div className='profileIcon menuButton' />
                <span className="buttonTxt">PROFILE</span>
            </span>

    )

}