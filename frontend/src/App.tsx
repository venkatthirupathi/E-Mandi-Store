import { SnackbarProvider } from "notistack";
import { ReactNode } from "react";
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

function Layout(children: ReactNode) {
  return (
    <>
      <Navbar />
      {children}
      <FooterComponent />
    </>
  );
}

function App() {
  return (
    <AuthProvider>
      <SnackbarProvider />
      <Router>
        <Routes>
          <Route path="/" element={Layout(<Home />)} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/profile" element={Layout(<Profile />)} />
          <Route path="/search" element={Layout(<Search />)} />
          <Route
            path="/seller/dashboard"
            element={Layout(<SellerDashboard />)}
          />
          <Route path="/cart" element={Layout(<Cart />)} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
