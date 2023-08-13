import "./App.css";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { ThemeProvider, createTheme } from "@mui/material";
import { AuthContextProvider } from "../src/common/Auth/AuthContext";
import ProductsContainer from "../src/components/Products/Products";
import LogIn from "../src/components/LogIn/LogIn";

const appTheme = createTheme({
  palette: {
    primary: {
      main: "#3f51b5",
    },
    secondary: {
      main: "#f44336",
    },
  },
});

function App() {
  return (
    <AuthContextProvider>
      <ThemeProvider theme={appTheme}>
        <BrowserRouter>
          <Routes>
            <Route path="/login" element={<LogIn />} />
            <Route exact path="/" element={<Navigate to="/LogIn" />} />
            <Route path="/products/:id" element={<ProductDetail />} />
            <Route exact path="/products" element={<ProductsContainer />} />
          </Routes>
        </BrowserRouter>
      </ThemeProvider>
    </AuthContextProvider>
  );
}

export default App;
