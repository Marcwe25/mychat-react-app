import React,{useState} from 'react'
import axiosInstance from '../../axiosInstanceGenerator'
import { useDispatch, useSelector } from 'react-redux'
import Cancel from '../../icons/Cancel'
import Confirm from '../../icons/Confirm'
import { member_url } from '../../const/constsURL'
import { fetchRegisteredMember } from '../authentication/authActions'

export default function Profile () {

    const [success,setSuccess] = useState(false)

    const registeredMember =  useSelector((state)=>state.auth.registeredMember)

	const dispatch = useDispatch()

	const [inputs, setInputs] = useState({username:"",displayName:""})

	const handleChange = (event) => {
		
		const name = event.target.name;
		const value = event.target.value;
		setInputs(values => ({...values, [name]: value}))
	  }


	const onSuccess = () => {
        setSuccess("updated successfully")
		dispatch(fetchRegisteredMember())

    }


    const UpdateUser = async (e) => {
		e.preventDefault();
        await axiosInstance.put(member_url, inputs,{withCredentials: true})
        onSuccess()
        }


		return (
		<div className="blockContainer ">
			<div className='flexHeader border1  '>
				<div className='headerItem headerTitle'>K</div> 
				{/* <span className='standart'> <h3>PROFILE</h3></span> */}
                <span className='standart'>
                        <Cancel/>
                        <Confirm submitConfirm={UpdateUser}/>
                    </span>
                </div>
			<form method="post"  className='userData'>			
		        {/* <h1>Profile</h1> */}
                <p className="item">
		          <input 
				  	className='field1'
				  	readOnly="readonly"
				  	type="email" 
					name="email"  
					value={inputs.username}
					placeholder= {registeredMember?.username }
					onChange={handleChange}/>
		        </p>
		        <p className="item">
		          <input 
				  	className='field1'
				  	type="text" 
					name="displayName"  
					value={inputs.displayName} 
					placeholder= {registeredMember?.displayName ? registeredMember.displayName : "choose display name" }
					onChange={handleChange}/>
		        </p>

				{success && (<div className='success'>updated successfully</div>)}

		   </form>

		   		</div>
		)
    
}