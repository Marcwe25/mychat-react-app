import AddUserToChat from "../../icons/AddUserToChat";
import GoHomeIcon from "../../icons/GoHomeIcon";

export default function ChatMenu () {

    return (       
        
        <div className='flexHeader border1'>
            <AddUserToChat/>
            <div className='headerItem headerTitle'>
                <div >NAME</div>
            </div>
            <GoHomeIcon/>
       
        </div>

        )
    }