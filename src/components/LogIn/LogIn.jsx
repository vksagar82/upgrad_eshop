import { useContext, useState } from "react";
import { Avatar, Typography } from "@mui/material";
import LockIcon from "@mui/icons-material/Lock";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../../common/Auth/AuthContext";
import NavigationBar from "../../common/NavBar/NavBar";
import React from "react";

//MUI Components
import MuiButtonSignIn from "../MuiComponents/Buttons/MuiButtonSignIn";
import MuiTextLogin from "../MuiComponents/TextField/MuiTextLogin";

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

const getAdminToken = async () => {
  const adminBody = JSON.stringify({
    username: "admin@upgrad.com",
    password: "admin123",
  });
  const header = { headers: { "Content-Type": "application/json" } };
  try {
    const response = await axios.post(
      "http://localhost:8080/api/auth/signin",
      adminBody,
      header
    );
    if (response.status === 200) {
      return response;
    }
  } catch {}
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
    //this is needed because the users api works only with admin tokens
    //we need the userID in case of orders so we have to access the userID for normal users via an admin token
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
    const header = { headers: { "Content-Type": "application/json" } };

    if (email && password) {
      await axios
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
                let adminToken = "";
                let user = null;
                getAdminToken().then((responseVal) => {
                  adminToken = responseVal.data.token;
                  //call the usersAPI using the admin token to set the userID
                  axios
                    .get("http://localhost:8080/api/users", {
                      headers: { Authorization: `Bearer ${adminToken}` },
                    })
                    .then((response) => {
                      user = response.data.filter(
                        (user) => user.email === email
                      );
                      if (user != null) {
                        //set the role to admin if the roles contain ADMIN, setAdmin using authContext
                        if (user[0].roles[0].name === "ADMIN") setIsAdmin(true);
                        //set the userID using authContext
                        setUserId(user[0].id);
                      }
                      navigate("/products");
                    });
                });
              });
          } else {
            ErrorToast("Invalid Credentials");
          }
        })
        .catch((error) => {
          ErrorToast("Something Went Wrong Retrieving User Details");
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
