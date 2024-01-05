import React,{useState} from 'react'
import './Login.css'
import { LOGIN_PAGE } from '../../const/constNames';
import { apiURL, registerURL } from '../../const/constsURL';
import Login from './Login';
import axios from 'axios';
  
function Registration({selectPage}) {
    const [registrationError, setRegistrationError] = useState(null);
	
   const axiosRegistration = axios.create(
        {
            baseURL: apiURL,
            headers: {
                "Content-Type": "application/json",
                    },
                    withCredentials: true
        }
    )

    const registerUser = async (inputs) => {
        if(isValid(inputs)) {
            const {userName,email,password} = {...inputs}
            return await axiosRegistration
            .post(
                registerURL,
                {userName,email,password}
                ,{withCredentials: true})
            .then(async () => {
                setRegistrationError("")
                goToLogin()
            })
            .catch((error) => {
                setRegistrationError("bad credential", error);})
        }

        }

    const isValid = (inputs) => {
        if (inputs.password===inputs.password_confirmation) return true
        setRegistrationError("passwords different")
        return false
    }



	const [inputs, setInputs] = useState({
		userName:"",
		email:"",
		password_confirmation:"",
		password:""})

	const handleChange = (event) => {
		const name = event.target.name;
		const value = event.target.value;
		setInputs(values => ({...values, [name]: value}))
	  }

	  
	const submitHandler = async (event) => {
		event.preventDefault();
		await registerUser(inputs)
	}

	function goToLogin  () {
		selectPage(LOGIN_PAGE)
	}  
    
	return (
		<div className="login-container back_image">
			<form method="post" onSubmit={submitHandler}>
			<p className='loginTitle'> <span className='big'>Register on </span><span className='bigger headerTitle '>K</span> <span className='big'>chat</span></p>
			
			<div className='inputField'>
					<div className='profileIcon iconPlacement'/>

					<input
						className='p0'
						type="userName"  
						name="userName" 
						placeholder='username'  
						value={inputs.userName} 
						onChange={handleChange}
						/>
				</div>


				<div className='inputField'>
					<div className='mailIcon iconPlacement'/>

					<input
						className='p0'
						type="email"  
						name="email" 
						placeholder='email'  
						value={inputs.email} 
						onChange={handleChange}
						/>
				</div>



		<div className='inputField'>
					<div className='lockIcon iconPlacement'/>

					<input
						className='p0'
						type="password"  
						name="password" 
						placeholder='password'  
						value={inputs.password} 
						onChange={handleChange}
						/>
				</div>




				<div className='inputField'>
					<div className='lockIcon iconPlacement'/>

					<input
						className='p0'
						type="password"  
						name="password_confirmation" 
						placeholder='confirm password'  
						value={inputs.password_confirmation} 
						onChange={handleChange}
						/>
				</div>


				<input type="submit" value="register" className="submit_button clickable"/>

		        
		        <input type="button" value="cancel" className="submit_button clickable"  onClick={goToLogin}/>

		        
				<p className='error'>{registrationError?.length>0?registrationError:""}</p>
		   </form>
		</div>
		)
}
export default Registration;