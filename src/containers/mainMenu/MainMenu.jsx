import AddUser from "../../icons/AddUser";
import GoHomeIcon from "../../icons/GoHomeIcon";
import GoToProfile from "../../icons/GoToProfile";
import Logout from "../../icons/Logout";


export default function MainMenu () {

    return (
        <div className='blockContainer '> 
            <div className='flexHeader border1  '>
                <div className='headerItem headerTitle'>K</div> 
                <span>
                    <GoHomeIcon/>
                </span>
            </div>
            <div className="roomsContainer border1 back_image">
                <AddUser/>
                <GoToProfile />
                <Logout/>
            </div>
 
    </div>

    )
}
