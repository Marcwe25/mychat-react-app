import { useDispatch } from 'react-redux';
import { APP_MENU } from '../const/constNames';
import './icons.css';
import { goToWindow } from '../containers/navigation/navigationAction';

export default function MenuButton () {

    const dispatch = useDispatch()

    const goToAppMenu = () => {
        dispatch(goToWindow(APP_MENU))
    }

    return (       
            <div 
            className='menuIcon menuButton' 
            onClick={goToAppMenu}
            />
    )
}