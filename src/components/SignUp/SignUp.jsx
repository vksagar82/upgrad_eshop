import React from 'react'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import '../SignUp/SignUp.css'

const SignUp = () => {
  return (
    <div className="signup">
        <ul>
            <li><div className="icon"><LockOutlinedIcon/></div></li>
            <li className='heading'><h2>Sign Up</h2></li>
            <li className='inputField'><input type='text' name='firstname' id='firstName' placeholder='First Name'/></li>
            <li className='inputField'><input type='text' name='lastname' id='lastName' placeholder='Last Name'/></li>
            <li className='inputField'><input type='email' name='email' id='email' placeholder='Email Address'/></li>
            <li className='inputField'><input type='password' name='password' id='password' placeholder='Password'/></li>
            <li className='inputField'><input type='password' name='confirmation' id='confirmPassword' placeholder='Confirm Password'/></li>
            <li className='inputField'><input type='tel' name='phoneNumber' id='contact' placeholder='Contact Number'/></li>
            <li ><button className='signup' onClick={submit}>Sign Up!</button></li>
            <li className='bottomtext'><a href='#'>Already have an account? Sign In</a></li>
        </ul>
        <div className="bottomtext">Copyright © <a href="#">xyz</a> 2023</div>
    </div>
  )
}


const submit = () => {
    /* FUnction yet to be implemented */
}

export default SignUp