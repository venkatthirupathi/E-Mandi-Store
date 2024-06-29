import CheckIcon from "@mui/icons-material/Check";
import Alert from "@mui/material/Alert";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../component.css/LoginStyle.css"; // Make sure to create this CSS file

const LoginComponent: React.FC = () => {
  const navigate = useNavigate();

  const [user, verifyUser] = useState({
    email: "",
    password: "",
  });
  const [valid, setValid] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    verifyUser({
      ...user,
      [name]: value,
    });
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const { email, password } = user;

    if (email == "" || password == "") {
      console.log("Incorrect email or password.");
      return;
    }

    if (email === "test@example.com" && password === "password123") {
      setValid(true);
      setTimeout(() => {
        navigate("/home");
      }, 2000);
    } else {
      setValid(false);
      console.log("Invalid email or password.");
    }
  };

  return (
    <div className="login-container">
      <h1 className="login-title">Login</h1>
      <div className="login-box">
        <form onSubmit={handleLogin}>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            onChange={handleChange}
            placeholder="Enter your email"
            required
          />
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            name="password"
            onChange={handleChange}
            placeholder="Enter your password"
            required
          />
          <button type="submit" className="login-button">
            Login
          </button>
        </form>
      </div>
      {valid ? (
        <Alert icon={<CheckIcon fontSize="inherit" />} severity="success">
          Here is a gentle confirmation that your action was successful.
        </Alert>
      ) : (
        ""
      )}
    </div>
  );
};

export default LoginComponent;
