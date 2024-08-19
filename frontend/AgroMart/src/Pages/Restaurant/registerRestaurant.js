import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import validator from "validator";
import RestoNav from "../../components/RestoNav";
import config from "../../config";

const RegisterRestaurant = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [contact, setContact] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const navigate = useNavigate();

  const signup = () => {
    let valid = true; // Flag to check if all validations pass

    // Name Validation
    if (!name.trim()) {
      toast.error("Please enter a name");
      valid = false;
    }

    if (!/^\d{10}$/.test(contact)) {
      toast.error("Please enter a 10-digit phone number");
      valid = false;
    }

    if (!validator.isEmail(email)) {
      toast.error("Please enter a valid email");
      valid = false;
    }

    if (
      !validator.isStrongPassword(password, {
        minLength: 8,
        minLowercase: 1,
        minUppercase: 1,
        minNumbers: 1,
        minSymbols: 1,
      })
    ) {
      toast.error(
        "Password must be strong (At least 8 characters, including a number, a symbol, an uppercase and a lowercase letter)"
      );
      valid = false;
    } else if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      valid = false;
    }


    if (valid) {
      axios
        .post(`${config.serverURL}/user/signup`, {
          name,
          email,
          contact,
          password,
          role: "DELIVERYBOY",
        })
        .then((response) => {
          const result = response.data;
          if (result.status === "Success") {
            toast.success("Successfully signed up new restaurant");
            navigate("/deliveryboylist");
          } else {
            toast.error(result.error);
          }
        })
        .catch((error) => {
          toast.error("An error occurred");
          console.error("Signup error:", error);
        });
    }
  };

  return (
    <div className="container-fluid">
      <RestoNav />
      <section className="container-fluid RestoStyle1">
        {/* Input fields */}
        <div className="form-outline mb-4">
          <label className="form-label" for="form3Example97">
            Enter Dilevery Boy Name
          </label>
          <input
            onChange={(event) => {
              setName(event.target.value);
            }}
            className="form-control"
            type="text"
            required=""
          />
        </div>
        <div className="form-outline mb-4">
          <label className="form-label" for="form3Example97">
            Phone Number
          </label>
          <input
            onChange={(event) => {
              setContact(event.target.value);
            }}
            className="form-control"
            type="tel"
            required=""
          />
        </div>

        <div className="form-outline mb-4">
          <label className="form-label" for="form3Example97">
            Email
          </label>
          <input
            onChange={(e) => setEmail(e.target.value)}
            className="form-control"
            type="email"
            required=""
          />
        </div>

        <div className="form-outline mb-4">
          <label className="form-label" for="form3Example97">
            Password
          </label>
          <input
            onChange={(e) => setPassword(e.target.value)}
            className="form-control"
            type="password"
            required=""
            placeholder="Min 8 charactors"
          />
        </div>

        <div className="form-outline mb-4">
          <label className="form-label" for="form3Example97">
            Confirm Password
          </label>
          <input
            onChange={(event) => {
              setConfirmPassword(event.target.value);
            }}
            className="form-control"
            type="password"
            required=""
          />
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            marginTop: "20px",
          }}
        >
          <button onClick={signup} className="btn btn-success">
            Add DELIVERYBOY
          </button>
        </div>
      </section>
    </div>
  );
};

export default RegisterRestaurant;