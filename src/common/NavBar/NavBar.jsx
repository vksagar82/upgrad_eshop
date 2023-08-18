import { useContext } from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";

import { Grid } from "@mui/material";
import SearchInput from "../../components/Search/Search";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../common/Auth/AuthContext";
import React from "react";

//MUI Components
import MuiButtonNavBarLoggedIn from "../../components/MuiComponents/Buttons/MuiButtonNavBarLoggedIn";
import MuiNavBarButtonLogout from "../../components/MuiComponents/Buttons/MuiButtonNavBarLogout";
import MuiIconButton from "../../components/MuiComponents/IconButton/MuiIconButton";

function NavigationBar(props) {
  const { isLogged, isAdmin, searchTerm, onSearchChange } = props;
  const { setToken, setUserId, setIsAdmin } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    setToken(null);
    setUserId(null);
    setIsAdmin(false);
    navigate("/login");
  };

  return (
    <AppBar position="static" className="app-primary-color">
      <Toolbar>
        <Grid container spacing={2}>
          <Grid item xs={5}>
            <MuiIconButton
              onClick={() => navigate(isLogged ? "/products" : "/login")}
            />
          </Grid>
          <Grid item xs={3}>
            <SearchInput
              searchText={searchTerm}
              onSearchChange={onSearchChange}
            />
          </Grid>
          <Grid item xs={4} textAlign={"right"} justifyContent="flex-end">
            {isLogged ? (
              isAdmin ? (
                <div>
                  <MuiButtonNavBarLoggedIn
                    onClick={() => navigate(isLogged ? "/products" : "/login")}
                    value="Home"
                  />
                  <MuiButtonNavBarLoggedIn
                    onClick={() => navigate("/add-product")}
                    value="Add Product"
                  />
                  <MuiNavBarButtonLogout
                    onClick={handleLogout}
                    value="Logout"
                  />
                </div>
              ) : (
                <div>
                  <MuiButtonNavBarLoggedIn
                    onClick={() => navigate(isLogged ? "/products" : "/login")}
                    value="Home"
                  />
                  <MuiNavBarButtonLogout
                    onClick={handleLogout}
                    value="Logout"
                  />
                </div>
              )
            ) : (
              <div>
                <MuiButtonNavBarLoggedIn
                  onClick={() => navigate("/login")}
                  value="Login"
                />
                <MuiButtonNavBarLoggedIn
                  onClick={() => navigate("/signup")}
                  value="Sign Up"
                />
              </div>
            )}
          </Grid>
        </Grid>
      </Toolbar>
    </AppBar>
  );
}

export default NavigationBar;
