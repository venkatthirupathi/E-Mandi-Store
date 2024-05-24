import React, {useState} from "react";
import { useNavigate } from "react-router-dom";
import "../component.css/SignUpComponent.css";
import Alert from '@mui/material/Alert';
import CheckIcon from '@mui/icons-material/Check';

const SignUpComponent: React.FC = () => {

    const navigate = useNavigate()

    const[user, setUser] = useState({
        "email" : "",
        "password" : "",
        "username" : "",
        "active" : "",
        "role" : ""
    })

    const[valid,setValid] = useState(true)

    const handleChange = (e: React.ChangeEvent<HTMLInputElement  | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setUser({
          ...user,
          [name]: value,
        });
    };


    const handleSignup = async (e: React.FormEvent) => {
        e.preventDefault();
        
        try {
            const response = await fetch('http://localhost:5173/api/user/signup', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify(user),
            });

            if (response.ok) {
                setValid(true)
                navigate('/api/user/login')
            }
        }
        catch(error){
            console.log("Error")
        }

    }

  return (
    <div className="signup-container">
      <h1 className="signup-title">Register</h1>
      <div className="signup-box">
        <form onSubmit = {handleSignup}>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            onChange = {handleChange}
            placeholder="Enter your email"
            required
          />
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            name="password"
            onChange = {handleChange}
            placeholder="Enter your password"
            required
          />
          <label htmlFor="username">Username:</label>
          <input
            type="username"
            id="username"
            name="username"
            onChange = {handleChange}
            placeholder="Enter your username"
            required
          />
          
            <label htmlFor="role">Role:</label>
            <select id="role" name="role" onChange = {handleChange} required>
                <option value="">Select your role</option>
                <option value="customer">Customer</option>
                <option value="farmer">Farmer</option>
                <option value="retailer">Retailer</option>
                <option value="wholesaler">Wholesaler</option>
            </select>
            <div className="radio-group">
                <label htmlFor="active">Active:</label>
                <div className="radio-options">
                <input
                    type="radio"
                    id="active-yes"
                    name="active"
                    value="yes"
                    onChange = {handleChange}
                    required
                />
                <label htmlFor="active-yes">Yes</label>
                <input
                    type="radio"
                    id="active-no"
                    name="active"
                    value="no"
                    onChange = {handleChange}
                    required
                />
                <label htmlFor="active-no">No</label>
            </div>
          </div>
          <button type="submit" className="signup-button">Register</button>
        </form>
      </div>
      {/* { !valid? 
        <Alert icon={<CheckIcon fontSize="inherit" />} severity="success">
          "Registration failed. Please try again."
        </Alert> : ""
      } */}
    </div>
  );
};

export default SignUpComponent;
