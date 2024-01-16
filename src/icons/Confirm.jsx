import { useDispatch } from 'react-redux';
import './icons.css';
import { refreshData } from '../containers/appData/appDataAction';
import { APP_MENU } from '../const/constNames';

export default function Confirm (props) {

    const dispatch = useDispatch()

    const handleConfirm = async (e) => {
        if(typeof (props.submitConfirm) === 'function') {
            await props.submitConfirm(e)
        }
        if(props.withUserDataReset) {
            dispatch(refreshData())
        }
        if(props.nextPage) {
            dispatch(goToWindow(props.nextPage))
        } else {
            dispatch(goToWindow(APP_MENU))
        }
    }

    return (       
            <div className='confirmIcon menuButton' onClick={handleConfirm}/>
    )
}