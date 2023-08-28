import { useContext, useState } from "react";
import { Avatar, Typography } from "@mui/material";
import LockIcon from "@mui/icons-material/Lock";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../../common/Auth/AuthContext";
import NavigationBar from "../../common/NavBar/NavBar";
import React from "react";

//MUI Components
import MuiButtonSignIn from "../../common/MuiComponents/Buttons/MuiButtonSignIn";
import MuiTextLogin from "../../common/MuiComponents/TextField/MuiTextLogin";

import "./LogIn.css";

//Toasts
import { ErrorToast } from "../../common/Toasts/Toasts";

const adminCreate = async () => {
  const adminBody = JSON.stringify({
    email: "admin@upgrad.com",
    role: ["admin"],
    password: "admin123",
    firstName: "admin",
    lastName: "admin",
    contactNumber: "1234567890",
  });
  const header = { headers: { "Content-Type": "application/json" } };
  try {
    const response = await axios.post(
      "http://localhost:8080/api/auth/signup",
      adminBody,
      header
    );
    if (response.status === 200) {
      console.log("admin created");
    }
  } catch (e) {
    if (e.response.data.message === "Error: Email is already in use!") {
      console.log("admin account exists");
    } else {
      console.log("Something went wrong creating admin account");
    }
  }
};

function LogIn() {
  const navigate = useNavigate();
  const { setToken, setUserId, setIsAdmin } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    //Create dummy admin account
    //to make it easier for testing
    adminCreate();

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
    const header = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    if (email && password) {
      await axios
        .post("http://localhost:8080/api/auth/signin", body, header)
        .then((response) => {
          const token = response.headers.get("x-auth-token");
          //set user details to null so that it can be verified later
          let user = null;
          if (token) {
            setToken(token);
          }
          user = response.data;
          if (user != null) {
            //set the role to admin if the roles contain ADMIN, setAdmin using authContext
            if (user.roles[0] === "ADMIN") {
              setIsAdmin(true);
            }
            //set the userID using authContext
            setUserId(user.id);
            navigate("/products");
          }
        })
        .catch(() => {
          ErrorToast("Invalid Credentials");
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

export default LogIn;
