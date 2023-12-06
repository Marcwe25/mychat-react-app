import { useDispatch } from "react-redux"
import { ADD_TO_WINDOW_PATH } from "../containers/navigation/navigationReducer"

export default function GoHomeIcon () {

    const dispatch = useDispatch()
    
    const goHome = () => {
        dispatch({
            type:ADD_TO_WINDOW_PATH,
            payload: 0
        })
      }

    return  (          
    <div 
        onClick={goHome} 
        className=' menuButton HomeIcon'>
        </div>
    )
}

// listMenu