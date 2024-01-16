import { useDispatch } from "react-redux"
import { MAIN_WINDOWS } from "../const/constNames"
import { refreshData } from "../containers/appData/appDataAction"
import { goToWindow } from "../containers/navigation/navigationAction"

export default function GoHomeIcon ({withUserDataReset}) {

    const dispatch = useDispatch()
    const goHome = () => {
        withUserDataReset && dispatch(refreshData())
        dispatch(goToWindow(MAIN_WINDOWS))
      }

    return  (          
    <div 
        onClick={goHome} 
        className=' menuButton HomeIcon'>
        </div>
    )
}
