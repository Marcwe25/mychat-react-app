import { useDispatch } from 'react-redux';
import './icons.css';
import { goToPreviousMenu } from '../containers/navigation/navigationAction';


export default function Cancel (props) {

    const dispatch = useDispatch()

    const handleCancel = () => {
        dispatch(goToPreviousMenu())
        // if (typeof props.submitCancel === 'function') {
        //     dispatch(goToPreviousMenu())
        // }
        // if(!props.isRedirect) dispatch(goToPreviousMenu())
    }

    return (       
            <div className='cancelIcon menuButton' 
            onClick={handleCancel}/>
    )
}