import { Link } from "react-router-dom";
import Header from "../../../components/header";
import config from "../../../config";
import { useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { setAuthorisationHeader } from "../../../security/SetAuthorisationHeader";
const SignIn = () => {
  let navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const signinUser = () => {
    if (email.length === 0) {
      toast.warning("please enter email");
    } else if (password.length === 0) {
      toast.warning("please enter password");
    } else {

      axios

      
        .post(
          config.serverURL + "/auth/login",
          { email: email, password: password },
          { "Content-Type": "application/json" }
        )
        .then((response) => {

          console.log(response);
          const result = response.data;
          const token = result.data.token;
          console.log("token "+token)
          sessionStorage.setItem("token", token);

          sessionStorage.setItem("isLoggedIn", true);

          setAuthorisationHeader();

          console.log(result.status);
          if (result.status === "Success") {
            console.log("login Successfull!!!!!");

            if (result.data.user.role === "FARMER") {
              sessionStorage.setItem("farmerId", result.data.user.id);
              sessionStorage.setItem("role", result.data.user.role);
              sessionStorage.setItem("farmerName", result.data.user.name);
              
              navigate("/CustomerHomePage");
              toast.success(`Welcome ${result.data.user.name}! Enjoy a delightful dining experience with us!`);
            } else if (result.data.user.role === "OWNER") {
              sessionStorage.setItem("ownerId", result.data.user.id);
              sessionStorage.setItem("role", result.data.user.role);
              sessionStorage.setItem("ownerName", result.data.user.name);

              navigate("/restaurantHome");
              toast.success(`Welcome ${result.data.user.name}, keep serving delicious meals to your customers!`);
            } else if (result.data.user.role === "DELIVERYBOY") {
              sessionStorage.setItem("deliveryBoyId", result.data.user.id);
              sessionStorage.setItem("role", result.data.user.role);
              sessionStorage.setItem("deliveryboyName", result.data.user.name);

              navigate("/deliveryBoyHome");
              toast.success(`Welcome ${result.data.user.name}, Let's deliver smiles! 😊`);
            }
          }

        })
        .catch((error) => {
          console.log("error");
          console.log(error);
          toast.error("invalid username or password");
        });
    }
  };

  return (
    <div className="container-fluid">
      <Header />
      <section className="container-fluid logsign">
        {/* Input fields */}
        <h1 className="text-center">login</h1>
        <div className="form-outline mb-4">
          <label className="form-label" htmlFor="form3Example3">
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
          <label className="form-label" htmlFor="form3Example4">
            Password
          </label>
          <input
            onChange={(e) => setPassword(e.target.value)}
            className="form-control"
            type="password"
            required=""
          />
        </div>

        {/* Sign In Button */}
        <div style={{ display: "flex", justifyContent: "center" }}>
          <button onClick={signinUser} className="btn btn-success">
            Sign In
          </button>
        </div>

        {/* Forgot Password Link
        <div style={{ marginBottom: "20px", textAlign: "center" }}>
          <Link to="/forgotPassword">Forgot your password?</Link>
        </div> */}

        {/* Register Link */}
        <div style={{ marginTop: "20px", textAlign: "center" }}>
          Don't have an account yet? <Link to="/signup">Register here</Link>
        </div>
      </section>
    </div>
  );
};

const styles = {
  container: {
    width: 400,
    height: 320,
    padding: 20,
    position: "relative",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    margin: "auto",
    borderColor: "#5C41A8",
    borderRadius: 10,
    broderWidth: 1,
    borderStyle: "solid",
    boxShadow: "1px 1px 20px 5px #C9C9C9",
  },
  signinButton: {
    position: "relative",
    width: "100%",
    height: 40,
    backgroundColor: "#5C41A8",
    color: "white",
    borderRadius: 5,
    border: "none",
    marginTop: 10,
  },
};

export default SignIn;
