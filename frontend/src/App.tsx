import { SnackbarProvider } from "notistack";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import "./App.css";
import { AdminDashComponent } from "./components/AdminDashComponent";
import AdminOrders from "./components/AdminOrders";
import AdminProducts from "./components/AdminProducts";
import CartComponent from "./components/CartComponent";
import CustomerDashComponent from "./components/CustomerDashComponent";
import CustomerOrders from "./components/CustomerOrders";
import CustomerProducts from "./components/CustomerProducts";
import FooterComponent from "./components/FooterComponent";
import Navbar from "./components/HeaderComponent";
import HomeComponent from "./components/HomeComponent";
import LoginComponent from "./components/LoginComponent";
import Signup from "./pages/Signup";

function App() {
  return (
    <>
      <SnackbarProvider />
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<HomeComponent />} />
          <Route path="/login" element={<LoginComponent />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/user/dashboard" element={<CustomerDashComponent />} />
          <Route path="/admin/dashboard" element={<AdminDashComponent />} />
          <Route path="/admin/products" element={<AdminProducts />} />
          <Route path="/user/products" element={<CustomerProducts />} />
          <Route path="/user/cart" element={<CartComponent />} />
          <Route path="/user/orders" element={<CustomerOrders />} />
          <Route path="/admin/orders" element={<AdminOrders />} />
        </Routes>
        <FooterComponent />
      </Router>
    </>
  );
}

export default App;
