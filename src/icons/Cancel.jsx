import { useDispatch } from 'react-redux';
import './icons.css';
import { goToPreviousMenu } from '../containers/navigation/navigationAction';


export default function Cancel () {

    const dispatch = useDispatch()

    const handleCancel = () => {
        dispatch(goToPreviousMenu())

    }

    return (       
            <div className='cancelIcon menuButton' 
            onClick={handleCancel}/>
    )
}