import { useDispatch } from 'react-redux';
import { APP_MENU } from '../const/constNames';
import './icons.css';
import {ADD_TO_MENU_PATH} from '../containers/navigation/navigationReducer'

export default function MenuButton () {

    const dispatch = useDispatch()

    const goToAppMenu = () => {
        dispatch({
            type:ADD_TO_MENU_PATH,
            payload: APP_MENU
        })
    }

    return (       
            <div 
            className='menuIcon menuButton' 
            onClick={goToAppMenu}
            />
    )
}