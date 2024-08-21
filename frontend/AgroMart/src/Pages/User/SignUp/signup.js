import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import validator from "validator";
import Header from "../../../components/header"; 
import config from "../../../config";

const Signup = () => {
  const [name, setName] = useState("");
  const [role, setRole] = useState("");
  const [email, setEmail] = useState("");
  const [contact, setContact] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [emailMessage, setEmailMessage] = useState("");
  const [passwordMessage, setPasswordMessage] = useState("");

  const navigate = useNavigate();

  const handleEmailChange = (e) => {
    const emailValue = e.target.value;
    if (validator.isEmail(emailValue)) {
      setEmail(emailValue);
      setEmailMessage("Valid Email!");
    } else {
      setEmailMessage("Please enter a valid email.");
    }
  };

  const handlePasswordChange = (e) => {
    const passwordValue = e.target.value;
    if (validator.isStrongPassword(passwordValue, {
      minLength: 8, minLowercase: 1,
      minUppercase: 1, minNumbers: 1, minSymbols: 1
    })) {
      setPassword(passwordValue);
      setPasswordMessage("Strong Password!");
    } else {
      setPasswordMessage("Password is not strong enough.");
    }
  };

  const signup = () => {
    if (name && email && contact && password && confirmPassword && role && password === confirmPassword && validator.isEmail(email) && validator.isStrongPassword(password, {
      minLength: 8, minLowercase: 1,
      minUppercase: 1, minNumbers: 1, minSymbols: 1
    })) {
      // API call to signup
      console.log({
        name,
        email,
        contact,
        password,
        role,
      });
      axios.post(`${config.serverURL}/auth/signup`, {
        name,
        email,
        contact,
        password,
        role,
      })
      .then((response) => {
        const result = response.data;
        if (result.status === "Success") {
          toast.success("Successfully signed up new user");
          navigate("/signin");
        } else {
          toast.error(result.error);
        }
      })
      .catch((error) => {
        console.log(error);
        toast.error("An error occurred during signup.");
        console.error("Signup error:", error);
      });
    } else {
      if (password !== confirmPassword) {
        toast.error("Passwords do not match.");
      } else {
        toast.error("Please ensure all fields are correctly filled out.");
      }
    }
  };

  return (
    <div className="container-fluid">
      <Header />
      <section className="container-fluid logsign">
        {/* Input fields */}
        <div className="form-outline mb-4">
          <label className="form-label" htmlFor="name">Name</label>
          <input
            onChange={(e) => setName(e.target.value)}
            className="form-control"
            type="text"
            id="name"
            required=""
          />
        </div>

        <div className="form-outline mb-4">
          <label className="form-label" htmlFor="phoneNumber">Phone Number</label>
          <input
            onChange={(e) => setContact(e.target.value)}
            className="form-control"
            type="tel"
            id="phoneNumber"
            required=""
          />
        </div>

        <div className="form-outline mb-4">
          <label className="form-label" htmlFor="email">Email</label>
          <input
            onChange={handleEmailChange}
            className="form-control"
            type="email"
            id="email"
            required=""
          />
          <small style={{color: emailMessage === "Valid Email!" ? "green" : "red"}}>{emailMessage}</small>
        </div>

        <div className="form-outline mb-4">
          <label className="form-label" htmlFor="password">Password</label>
          <input
            onChange={handlePasswordChange}
            className="form-control"
            type="password"
            id="password"
            required=""
            placeholder="Min 8 characters"
          />
          <small style={{color: passwordMessage === "Strong Password!" ? "green" : "red"}}>{passwordMessage}</small>
        </div>

        <div className="form-outline mb-4">
          <label className="form-label" htmlFor="confirmPassword">Confirm Password</label>
          <input
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="form-control"
            type="password"
            id="confirmPassword"
            required=""
          />
        </div>

        <div className="form-outline mb-4">
          <label className="form-label" htmlFor="role">Role</label>
          <select
            className="form-select form-select mb-3"
            id="role"
            required=""
            onChange={(e) => setRole(e.target.value)}
          >
            <option value="">Select Role</option>
            <option value="FARMER">Farmer</option>
            <option value="OWNER">Shop Owner</option>
          </select>
        </div>

        <div style={{ display: "flex", justifyContent: "center", marginTop: "20px" }}>
          <button onClick={signup} className="btn btn-success">
            Signup
          </button>
        </div>

        <div style={{ textAlign: "center", marginTop: "20px" }}>
          Already have an account? <Link to="/signin">Sign in here</Link>
        </div>
      </section>
    </div>
  );
};

export default Signup;