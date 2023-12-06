import GoHomeIcon from "../../icons/GoHomeIcon";
import SearchButton from "../../icons/searchButton";
import NotificationsDisplay from "./NotificationsDisplay";


export default function NotificationsPageMenu () {

    return <>
            <div className='flexHeader border1  '>
                <div className='headerItem headerTitle'>K</div> 
                <span>
                    <NotificationsDisplay/>
                    <SearchButton/>
                    <GoHomeIcon/>
                </span>
            </div>
    </>
}