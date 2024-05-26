import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import "./App.css";
import HomeComponent from "./components/HomeComponent";
import HeaderComponent from "./components/HeaderComponent";
import FooterComponent from "./components/FooterComponent";
import LoginComponent from "./components/LoginComponent";
import SignUpComponent from "./components/SignUpComponent";
import { Box } from "@mui/material";
import CustomerDashComponent from "./components/CustomerDashComponent";
import { AdminDashComponent } from "./components/AdminDashComponent";
import AdminProducts from "./components/AdminProducts";
import CustomerProducts from "./components/CustomerProducts";
import CartComponent from "./components/CartComponent";
import CustomerOrders from "./components/CustomerOrders";
import AdminOrders from "./components/AdminOrders";

function App() {
  // const [count, setCount] = useState(0)

  return (
    <>
      <Router>
        <HeaderComponent />
        <Routes>
          <Route path="/" element={<HomeComponent />} />
          <Route path="/api/user/login" element={<LoginComponent />} />
          <Route path="/api/user/signup" element={<SignUpComponent />} />
          <Route path="/home" element = {<HomeComponent/>}/>
          <Route path="/api/user/dashboard" element = {<CustomerDashComponent/>}/>
          <Route path="/api/admin/dashboard" element = {<AdminDashComponent/>}/>
          <Route path="/api/admin/products" element = {<AdminProducts/>}/>
          <Route path="/api/user/products" element = {<CustomerProducts/>}/>
          <Route path="/api/user/cart" element = {<CartComponent/>}/>
          <Route path="/api/user/orders" element = {<CustomerOrders/>}/>
          <Route path="/api/admin/orders" element = {<AdminOrders/>}/>
        </Routes>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              minHeight: "100vh",
            }}
          >
            <Box
              component="main"
              sx={{
                flexGrow: 1,
              }}
            >
              {/* Your main content goes here */}
            </Box>
            <FooterComponent />
        </Box>
      </Router>
    </>
  );
}

export default App;
