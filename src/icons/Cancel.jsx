import { useDispatch } from 'react-redux';
import './icons.css';
import { APP_MENU } from '../const/constNames';
import { goToWindow } from '../containers/navigation/navigationAction';


export default function Cancel () {

    const dispatch = useDispatch()

    const handleCancel = () => {
        dispatch(goToWindow(APP_MENU))

    }

    return (       
            <div className='cancelIcon menuButton' 
            onClick={handleCancel}/>
    )
}