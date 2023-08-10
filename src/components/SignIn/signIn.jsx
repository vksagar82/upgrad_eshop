import React from "react";
import '../SignIn/signIn.css'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';


const SignIn = () => {
  return (
    <div className="signIn">
        <ul>
          <li className="icon"><LockOutlinedIcon/></li>
          <li className="heading"><h2>Sign In</h2></li>
          <li className="textbox"><input type="email" name="email" id="username" placeholder="Email@example.com" /></li>
          <li className="textbox"><input type="password" name="password" id="password" placeholder="Password" /></li>
          <li className="button"><button onClick={submit}>Sign In</button></li>
          <li className="signuplink"><a href="#">Don't have an account? SignUp</a></li>
        </ul>
        
        <div className="bottomtext">Copyright © <a href="#">xyz</a> 2023</div>
    </div>
  )
}


const submit = ()=>{
  const username = document.getElementById('username');
  const password =document.getElementById('password');
  console.log(username.value+'\n'+password.value);
  let data=JSON.stringify({
    username: username.value,
    password: password.value
})
console.log(data);
  //call the api here
  fetch('http://localhost:8080/api/auth/signin',{
            method:'POST',
            body: JSON.stringify({
              "username" : username.value,
              "password" : password.value
          })

        })
            .then(res=>res.json())
            .then(json=>console.log(json))
}

export default SignIn