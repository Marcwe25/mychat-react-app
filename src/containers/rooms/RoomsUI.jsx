import Rooms from "./Rooms";
import RoomsMenu from "./RoomsMenu";


export default function RoomUI () {

    return (
        <div className='blockContainer '>
            <RoomsMenu/> 
            {/* <RoomListMenu notificationList={notificationList} setSearchInput={setSearchInput} searchInput={searchInput} /> */}
            {/* <div className={`roomsContainer scrolable border1 back_image`}> */}
            <Rooms/>
      </div>
      )
}