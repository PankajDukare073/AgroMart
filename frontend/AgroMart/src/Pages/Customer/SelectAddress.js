import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Address.css"; 
import config from "../../config";
import { toast } from "react-toastify";
import CustHomeNv from "./../../components/CustHomeNv";

const SelectAddress = () => {
  const [address, setAddress] = useState([]);
  const userid = sessionStorage.getItem("farmerId");
  let navigate = useNavigate();

  useEffect(() => {
    getAllAddress();
    console.log("address is loaded");
  }, []);

  const getAllAddress = () => {
    axios.get(`${config.serverURL}/address/show/${userid}`).then((response) => {
      const result = response.data;
      if (result.status === "Success") {
        setAddress(result.data);
      } else {
        toast.error("error while loading list of addresses");
      }
    });
  };

  const nextPage = () => {
    var form = document.getElementById("FORM");
    const formData = new FormData(form);
    const addId = formData.get("radio");

    if (!addId) {
      toast.warning("Please select an address");
    } else {
      navigate("/Payment", { state: { addressId: addId } });
    }
  };

  const goToPage = () => {
    navigate("/AddAddress");
  };

  return (
    <div className="container-fluid">
      <CustHomeNv />
      <div className="myStyle1">
        <form id="FORM">
          <h3 className="mb-5" style={{ textAlign: "center" }}>
            Address
          </h3>
          {address.map((add) => (
            <div className="form-check" key={add.id}>
              <input
                className="form-check-input"
                type="radio"
                name="radio"
                id={address-`${add.id}`}
                value={add.id}
              />
              <label className="form-check-label" htmlFor={address-`${add.id}`}>
                {add.line1}, {add.line2}, {add.city}, {add.state}
                <br />
                Pincode: {add.pincode}
                <br />
                Contact: {add.contactNo}
                <br /><br />
              </label>
            </div>
          ))}
          <div
            style={{
              marginTop: 50,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <button onClick={nextPage} className="btn btn-success mb-3">
              Proceed
            </button>
            <button onClick={goToPage} className="btn btn-dark">
              Add Address
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SelectAddress;