import React,{useState} from 'react'
import { useDispatch} from "react-redux"
import {bindActionCreators} from "redux"
import {authenticationActionsCreators} from "../../reduxConfig/creatorsIndex"
import './Login.css'


function Login() {
	const dispatch = useDispatch()
    const {loginUser} = bindActionCreators(authenticationActionsCreators,dispatch)

    // const [remember, setRemember] = useState()
	const [inputs, setInputs] = useState({email:"",password:""})

	const handleChange = (event) => {
		const name = event.target.name;
		const value = event.target.value;
		setInputs(values => ({...values, [name]: value}))
	  }

	  
	const submitHandler = async (event) => {
		event.preventDefault();
		loginUser(inputs)
	}

	const goToRegistration = () => {
		// chooseRoom(REGISTRATION_PAGE)
	}
 
	return (
		<div >
			<div className="login-container back_image">

			<form method="post" onSubmit={submitHandler} className='loginForm'>	

							<div className='titleBack'>
							<p className='loginTitle'><span className='bigger headerTitle '>K</span> <span className='big'>chat</span></p>

				</div>


				<div className='inputField'>
					<div className='profileIcon iconPlacement'/>

					<input
						className='p0'
						type="email"  
						name="email" 
						placeholder='username'  
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

				<input type="submit" value="login" className="submit_button clickable"/>


		        <div className='loginLinks1'>
					{/* <RememberMe setRemember={setRemember} remember={remember}/> */}
					<div className='clickable2' onClick={goToRegistration}>forgot password</div>
		        </div>

		        <div className='loginLinks1'>
					<div className='clickable2' onClick={goToRegistration}>register</div>
					<div className='clickable2' onClick={goToRegistration}>contact us</div>
		        </div>

				<div className='loginLinks1 m10'>
				<div className='q2'/>
				<span className='q1'>
					or 
				</span>
				<div className='q2'/>
				</div>



				{/* <GoogleLogin/> */}

				{/* <p className='error'>{authenticationError?.length>0?authenticationError:""}</p> */}
		   </form>
		   </div>

		</div>
		)
}

export default Login