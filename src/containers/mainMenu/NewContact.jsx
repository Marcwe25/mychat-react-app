import { useState, } from 'react';
import Confirm from '../../icons/Confirm';
import Cancel from '../../icons/Cancel';
import { useDispatch, useSelector } from 'react-redux';
import { room_url } from '../../const/constsURL';
import { goToPreviousMenu } from '../navigation/navigationAction';
import axiosInstance from '../../axiosInstanceGenerator';
import { setRoomState } from '../rooms/roomsAction';


export default function NewContact () {

    
    const [errorMess, setErrorMess] = useState("")
    const [successMessage,setSuccessMessage]=useState("")

    const [input, setInput] = useState({username:"",message:""})
    const registeredMember =  useSelector((state)=>state.auth.registeredMember)

    const dispatch = useDispatch()

    const handleChange = (event) => {
		const name = event.target.name;
		const value = event.target.value;
		setInput(values => ({...values, [name]: value}))
        setErrorMess(null)
	  }

      const successful = async () => {
        setSuccessMessage("user added successfully")
        setTimeout(() => {
            dispatch(setRoomState(null))
            dispatch(goToPreviousMenu())
        }, 2000);
    }

    const submitConfirm = (e) => {
      e.preventDefault();
        if(input.username.trim()===registeredMember.username) {
            setErrorMess("can't add yourself")
            return}
        if (input.username.trim().length > 0) {
            const contactRequest = {
                "from": registeredMember.id,
                "to": input.username,
                "message": input.message,
                "issued": new Date()
              }
            axiosInstance.post(room_url,contactRequest)
            setInput({username:"",message:""});
            successful()
        }
    };

    const submitCancel = () => {
        goBack()
    }

    return (
        <div >
            <div className='blockContainer'>
            <div className='flexHeader border1 inverseFlexDirection '>
                <span className='standart'>
                        <Cancel submitCancel={submitCancel}/>
                        <Confirm submitConfirm={submitConfirm}/>
                    </span>
                </div>
            <div className='border1 back_image roomsContainer'>
                <div className='formContainer'>
                    <form className=' border1 back_image'>
                        <input
                            type='email' 
                            name='username'
                            placeholder='username to add' 
                            className='standart field1'
                            value={input.username} 
                            onChange={handleChange}
                        />

                        <textarea 
                            rows="4" 
                            cols="30" 
                            name='message'
                            placeholder='message' 
                            className='standart field1 h40' value={input.message} 
                            onChange={handleChange}
                        />
                        {errorMess ? <div className='error'>{errorMess}</div>:null}
                        {successMessage ? <div className='success'>{successMessage}</div>:null}

                    </form>
                </div>
                
                </div>
            </div>

        </div>
    );
};

