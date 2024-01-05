import { useState, } from 'react';
import { removeRooms_url } from '../../const/constsURL';
import Confirm from '../../icons/Confirm';
import Cancel from '../../icons/Cancel';
import axiosInstance from '../../axiosInstanceGenerator';
import { useDispatch, useSelector } from 'react-redux';
import { initData } from '../appData/appDataAction';
import GoHomeIcon from "../../icons/GoHomeIcon";


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

const RemoveRoom = () => {
    const rooms =  useSelector((state)=>state.rooms.entities)
    const [selectedRooms, setSelectedRooms] = useState(getInitialSelectedState());

    const dispatch = useDispatch()

    function getInitialSelectedState  () {

        const initialState = {}

        Object
            .keys(rooms)
            .forEach(roomId => {
                initialState[roomId]=true
            })

        return initialState
    }

    const submitConfirm = async () => {    
        const rooms = []
        Object.keys(selectedRooms).forEach(roomId=>{
            !selectedRooms[roomId] && rooms.push(roomId)
        })
        await axiosInstance.put( removeRooms_url, rooms)

        setTimeout(() => {
            setSelectedRooms(null)
            dispatch(initData())

        }, 2000);
        
    };
    const updateCheckStatus = uid => {
        setSelectedRooms(prevSelectedRooms => {
            return {...prevSelectedRooms, [uid]:!prevSelectedRooms[uid]}} )
    }

    return (
        < >
            <div className='blockContainer'>
                <div className='flexHeader border1  '>
                    <span>
                        <GoHomeIcon/>
                    </span>
                    <span className='standart inverseFlexDirection'>
                        <Cancel />
                        <Confirm submitConfirm={submitConfirm} nextPage={null}/>
                    </span>
                </div>

                <div className='roomsContainer back_image border1 scrolable'>
                    <form className='appMenu'>
                        {Object.keys(rooms).map((uid) => (
                            <div key={uid} className='pickerCompo '>
                                <Checkbox
                                    isChecked={selectedRooms[uid]}
                                    checkHandler={() => updateCheckStatus(uid)}
                                    label={rooms[uid].name + (rooms[uid].enabled?"":" - not confirmed by contact")}
                                    index={rooms[uid].id}

                                />
                            </div >

                        ))}
                    </form>
                </div>


            </div>

        </>
    );

};

export default RemoveRoom
