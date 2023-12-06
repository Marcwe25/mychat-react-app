import { useDispatch } from 'react-redux';
import './icons.css';

export default function Confirm (props) {

    const dispatch = useDispatch()

    const handleConfirm = (e) => {
        typeof (props.submitConfirm) === 'function' && props.submitConfirm(e)
        props.nextPage && dispatch(props.nextPage)
    }

    return (       
            <div className='confirmIcon menuButton' onClick={handleConfirm}/>
    )
}