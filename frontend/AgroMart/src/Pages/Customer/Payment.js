import CustHomeNv from "./../../components/CustHomeNv";
import axios from "axios";
import { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import config from "../../config";
import { toast } from "react-toastify";

const Payment = () => {
  const userId = sessionStorage.getItem("farmerId");

  const location = useLocation();
  const navigate = useNavigate();
  const { addressId } = location.state;

  const makePayment = () => {
    var form = document.getElementById("FORM");
    const formData = new FormData(form);
    const payMode = formData.get("paymentMode");
    console.log("paymentMode :" + payMode);
    if (payMode.length == 0) {
      toast.warning("please select payment mode");
    } else {
      axios
        .post(
          `${config.serverURL}/order/place`,
          { userId: userId, addressId: addressId, paymentMode: payMode },
          { "Content-Type": "application/json" }
        )
        .then((Response) => {
          toast.success("Order placed Successfully !!!");
          navigate("/MyOrders");
        });
    }
  };

  return (
    <div className="container-fluid">
      <CustHomeNv />
      <section className="h-100 bg-dark" class="myStyle1">
        <h3 className="mb-5" style={{ textAlign: "center" }}>
          Payment
        </h3>

        <form id="FORM" action="/MyOrders">
          <div class="form-check" style={{ marginLeft: 100, marginTop: 20 }}>
            <input
              class="form-check-input"
              type="radio"
              name="paymentMode"
              id="flexRadioDefault1"
              value="COD"
            />
            <label class="form-check-label" for="flexRadioDefault1">
              <h6>COD </h6>
            </label>
          </div>
          <div class="form-check" style={{ marginLeft: 100, marginTop: 20 }}>
            <input
              class="form-check-input"
              type="radio"
              name="paymentMode"
              id="flexRadioDefault1"
              value="CREDIT_CARD"
             
            />
            <label class="form-check-label" for="flexRadioDefault1">
              <h6>CREDIT CARD</h6>{" "}
            </label>
          </div>
          <div class="form-check" style={{ marginLeft: 100, marginTop: 20 }}>
            <input
              class="form-check-input"
              type="radio"
              name="paymentMode"
              id="flexRadioDefault1"
              value="DEBIT_CARD"
             
            />
            <label class="form-check-label" for="flexRadioDefault1">
              <h6>DEBIT CARD</h6>{" "}
            </label>
          </div>
          <div class="form-check" style={{ marginLeft: 100, marginTop: 20 }}>
            <input
              class="form-check-input"
              type="radio"
              name="paymentMode"
              id="flexRadioDefault1"
              value="UPI"
            
            />
            <label class="form-check-label" for="flexRadioDefault1">
              <h6>UPI</h6>{" "}
            </label>
          </div>
          <div class="form-check" style={{ marginLeft: 100, marginTop: 20 }}>
            <input
              class="form-check-input"
              type="radio"
              name="paymentMode"
              id="flexRadioDefault1"
              value="NETBANKING"
              disabled
            />
            <label class="form-check-label" for="flexRadioDefault1">
              <h6>NETBANKING</h6>{" "}
            </label>
          </div>
        </form>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <button
            onClick={makePayment}
            type="submit"
            className="btn btn-success"
          >
            Place Order
          </button>
        </div>
      </section>
    </div>
  );
};

export default Payment;