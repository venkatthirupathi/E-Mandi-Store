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
        </Routes>
        {/* <HomeComponent /> */}
        <FooterComponent />
      </Router>
    </>
  );
}

export default App;
