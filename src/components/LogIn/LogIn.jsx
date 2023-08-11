import { useContext, useState } from "react";
import { Avatar, Typography } from "@mui/material";
import LockIcon from "@mui/icons-material/Lock";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../../common/Auth/AuthContext";
import NavigationBar from "../../common/NavBar/NavBar";
import React from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

//MUI Components
import MuiButtonSignIn from "../MuiComponents/Buttons/MuiButtonSignIn";
import MuiTextLogin from "../MuiComponents/TextField/MuiTextLogin";

import "./Login.css";

//Toasts
const LoginErrorToast = (message) => {
  toast.error(message, {
    position: "top-center",
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "colored",
  });
};

function Login() {
  const navigate = useNavigate();
  const { setToken, setUserId, setIsAdmin } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();

    setEmailError(false);
    setPasswordError(false);

    if (email === "") {
      setEmailError(true);
    }
    if (password === "") {
      setPasswordError(true);
    }
    const body = JSON.stringify({
      password: password,
      username: email,
    });
    const header = { headers: { "Content-Type": "application/json" } };

    if (email && password) {
      let request = await axios
        .post("http://localhost:8080/api/auth/signin", body, header)
        .then((response) => {
          const token = response.data.token;
          //set user details to null so that it can be verified later
          let user = null;
          if (token) {
            setToken(response.data.token);

            //call the users API to see if user is normal/admin
            axios
              .get("http://localhost:8080/api/users", {
                headers: { Authorization: `Bearer ${token}` },
              })
              .then((response) => {
                //get the userDetails using the filter method
                user = response.data.filter((user) => user.email === email);
                if (user != null) {
                  //set the role to admin if the roles contain ADMIN, setAdmin using authContext
                  if (user[0].roles[0].name === "ADMIN") setIsAdmin(true);
                  //set the userID using authContext
                  setUserId(user[0].id);
                }
                navigate("/products");
              })
              .catch(() => {
                //this catch will handle and navigate when user is not admin and show details as per normal user
                //authToken ensures that the user is present, just an additional validation but would never encouter as the
                //outer API will catch the error and throw

                setIsAdmin(false);
                setUserId(null);
                navigate("/products");
              });
          }
        })
        .catch((error) => {
          LoginErrorToast("Invalid Credentials");
        });
    }
  };

  return (
    <>
      <NavigationBar />
      <div className="loginContainer">
        <form autoComplete="off" onSubmit={handleSubmit}>
          <Avatar className="avatarStyle">
            <LockIcon />
          </Avatar>
          <Typography gutterBottom variant="h5" component="p">
            Sign in
          </Typography>

          <MuiTextLogin
            label="Email Address"
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            value={email}
            error={emailError}
          />
          <MuiTextLogin
            label="Password"
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            value={password}
            error={passwordError}
          />

          <MuiButtonSignIn value="Sign In" />
        </form>
        {/* below the signup option to signup */}
        <div className="signuplink">
          <Link to="/signup">Don't have an account? SignUp</Link>
        </div>
      </div>
      <div className="loginFooter">
        Copyright &copy; <Link href="https://www.upgrad.com/">upGrad</Link> 2023
      </div>
    </>
  );
}

export default Login;