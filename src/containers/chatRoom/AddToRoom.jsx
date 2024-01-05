import { useState, } from 'react';
import { editUsersInRoom_url } from '../../const/constsURL';
import Confirm from '../../icons/Confirm';
import Cancel from '../../icons/Cancel';
import axiosInstance from '../../axiosInstanceGenerator';
import { useDispatch, useSelector } from 'react-redux';
import { setRoomState } from '../rooms/roomsAction';
import { goToPreviousMenu } from '../navigation/navigationAction';


export const Checkbox = ({ isChecked, label, checkHandler, index }) => {
    return (
        <>
            <input
                type="checkbox"
                id={`checkbox-${index}`}
                checked={isChecked}
                onChange={checkHandler}
                className='myCheckbox heigher'
            />
            <label className='heigher' htmlFor={`checkbox-${index}`}>

                <div className='checkBoxDiv'/>
                {label}

                </label>
        </>
    )
}

const AddToRoom = () => {
    const registredMemberId = useSelector((state) => state.auth.registeredMember.id)
    const roomId = useSelector((state) => state.navigation.windowPath.at(-1))
    const rooms =  useSelector((state)=>state.rooms.entities)
    const members = useSelector((state) => state.friends.entities)
    const [selectedContact, setSelectedContact] = useState(getInitialSelectedState());

    const dispatch = useDispatch()

    function getInitialSelectedState  () {
        const room = rooms[roomId]
        const initialState = (
            Object
            .keys(members)
            .filter(memberid => memberid != registredMemberId)
            .reduce(( accumulator, memberid ) => (
                { ...accumulator,[memberid] : room.members.includes(Number(memberid)) }
                ),{})
                )
        return initialState

    }
    const submitConfirm = async () => {        
        await axiosInstance.put(editUsersInRoom_url+"/"+roomId, selectedContact)

        setTimeout(() => {
            dispatch(setRoomState(null))
            dispatch(goToPreviousMenu())
            setSelectedContact(null)

        }, 2000);
        
    };
    const updateCheckStatus = uid => {
        setSelectedContact(prevSelectedContact => {
            return {...prevSelectedContact, [uid]:!prevSelectedContact[uid]}} )
    }

    return (
        < >
            <div className='blockContainer'>
                <div className='flexHeader border1 inverseFlexDirection '>
                    <span className='standart'>
                        <Cancel />
                        <Confirm submitConfirm={submitConfirm} nextPage={null} withUserDataReset={true}/>
                    </span>
                </div>

                <div className='roomsContainer back_image border1'>
                    <form className='appMenu'>
                        {Object.keys(selectedContact).map((uid) => (
                            <div key={uid} className='pickerCompo '>
                                <Checkbox
                                    isChecked={selectedContact[uid]}
                                    checkHandler={() => updateCheckStatus(uid)}
                                    label={members[uid].username + members[uid].id}
                                    index={members[uid].id}

                                />
                            </div >

                        ))}
                    </form>
                </div>


            </div>

        </>
    );

};

export default AddToRoom
