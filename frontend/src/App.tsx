import { SnackbarProvider } from "notistack";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import "./App.css";
import AuthProvider from "./AuthProvider";
import FooterComponent from "./components/FooterComponent";
import Navbar from "./components/Navbar";
import Cart from "./pages/Cart";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import Search from "./pages/Search";
import SellerDashboard from "./pages/SellerDashboard";
import Signup from "./pages/Signup";

function App() {
  return (
    <AuthProvider>
      <SnackbarProvider />
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/search" element={<Search />} />
          <Route path="/seller/dashboard" element={<SellerDashboard />} />
          <Route path="/cart" element={<Cart />} />
        </Routes>
        <FooterComponent />
      </Router>
    </AuthProvider>
  );
}

export default App;
