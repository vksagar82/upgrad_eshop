import "./App.css";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { ThemeProvider, createTheme } from "@mui/material";
import { AuthContextProvider } from "../src/common/Auth/AuthContext";
import ProductDetail from "../src/components/ProductDetails/ProductDetail";
import ProductsContainer from "../src/components/Products/Products";
import LogIn from "../src/components/LogIn/LogIn";
import SignUp from "../src/components/SignUp/SignUp";
import AddEditProduct from "../src/components/addProduct/AddEditProduct";
import Orders from "../src/components/Orders/Orders";

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
            <Route path="/edit-product/:id" element={<AddEditProduct />} />
            <Route path="/add-product" element={<AddEditProduct />} />
            <Route path="/login" element={<LogIn />} />
            <Route path="/products/:id" element={<ProductDetail />} />
            <Route exact path="/products" element={<ProductsContainer />} />
            <Route exact path="/" element={<Navigate to="/login" />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/order" element={<Orders />} />
          </Routes>
        </BrowserRouter>
      </ThemeProvider>
    </AuthContextProvider>
  );
}

export default App;
