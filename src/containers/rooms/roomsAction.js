import axiosInstance from "../../axiosInstanceGenerator";
import { LOADING, SUCCEEDED } from "../../const/constNames";
import { all_rooms_url } from "../../const/constsURL";
import {  setLastPosts } from "../roomRow/lastPostAction";
import {  setUnreads } from "../roomRow/unreadAction";
import { ROOMS_STATUS, ROOM_REMOVE, SET_ROOMS } from "./roomsReducer";


export function fetchRooms () {
    return async function (dispatch,getState) {
        if (getState().rooms.status === LOADING) return (false)
        if (getState().friends.status !== SUCCEEDED) return (false)
        setRoomState(LOADING)
        axiosInstance
        .get(all_rooms_url)
        .then (
             (response) => {
                const rooms = checkedRoomsName(response.data.rooms,getState)

                dispatch(setLastPosts(response.data.lastPosts))
                dispatch(setUnreads(response.data.unreads))
                response?.data && dispatch({
                    type: SET_ROOMS,
                    payload: rooms
                })    
                }  
        )
        .catch(
            err => console.error(err)
        )
    }
}

export function setRoomState (state) {
    return function (dispatch) {
        dispatch ({
            type: ROOMS_STATUS,
            payload: state
        })
    }
}

export function clearRooms () {
    return function (dispatch) {
        dispatch ({
            type: SET_ROOMS,
            payload: null
        })
        setRoomState(null)
    }
}

export function removeRoom (roomId) {
    return function (dispatch) {
        dispatch ({
            type: ROOM_REMOVE,
            payload: roomId
        })
        setRoomState(roomId)
    }
}

export function checkedRoomsName(rooms,getState){
    const registeredMember = getState().auth.registeredMember
    const friends = getState().friends.entities
    Object.keys(rooms).forEach((roomId) => {
        const room = rooms[roomId]
        if(!room.name) {
            room.name = roomName(room,friends,registeredMember)
        }
    })
    return rooms
}

export function roomName (room,friends,registeredMember) {
    
    return room.members
    .reduce(
      (a, memberid) =>
       memberid === registeredMember.id ? a :a + memberName(memberid,friends)  + ", " ,
        ''
        )
    .slice(0, -2)
  }

  function memberName (memberid,friends) {
    const friend = friends[memberid]
    const output = friend.displayName ? friend.displayName : friend.username.split('@')[0]
    return output
  }





