import { useDispatch } from 'react-redux';
import './icons.css';
import { refreshData } from '../containers/appData/appDataAction';

export default function Confirm (props) {

    const dispatch = useDispatch()

    const handleConfirm = (e) => {
        typeof (props.submitConfirm) === 'function' && props.submitConfirm(e)
        props.withUserDataReset && dispatch(refreshData())
        props.nextPage && dispatch(props.nextPage)
    }

    return (       
            <div className='confirmIcon menuButton' onClick={handleConfirm}/>
    )
}