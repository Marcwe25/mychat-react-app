import { useDispatch } from "react-redux"
import { ADD_TO_MENU_PATH } from "../containers/navigation/navigationReducer"
import { MAIN_WINDOWS } from "../const/constNames"
import { refreshData } from "../containers/appData/appDataAction"

export default function GoHomeIcon ({withUserDataReset}) {

    const dispatch = useDispatch()
    const goHome = () => {
        withUserDataReset && dispatch(refreshData())
        dispatch({
            type:ADD_TO_MENU_PATH,
            payload: MAIN_WINDOWS
        })
      }

    return  (          
    <div 
        onClick={goHome} 
        className=' menuButton HomeIcon'>
        </div>
    )
}
