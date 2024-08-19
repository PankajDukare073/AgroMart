import axios from "axios";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Address.css";
import config from "../../config";
import { toast } from "react-toastify";
import CustHomeNv from "./../../components/CustHomeNv";

const Cart = () => {
  const [cart, setCart] = useState([]);

  let total = 0;
  const userid = sessionStorage.getItem("farmerId");

  useEffect(() => {
    console.log(`Cart is loaded`);
    getCart();
  }, []);

  const getCart = () => {
    axios.get(`${config.serverURL}/cart/all/${userid}`).then((response) => {
      const result = response.data;

      if (result.status === "success") {
        setCart(result.data);
      } else {
        toast.error("error while loading list of cart");
      }
    });
  };
  const removeItem = (cartId) => {
    axios
      .delete(`${config.serverURL}/cart/delete/${cartId}`)
      .then((response) => {
        const result = response.data;
        if (result.status === "success") {
          toast.success(result.data);

          setTimeout(() => {
            window.location.reload();
          }, 2500);
        } else {
          toast.error("error while deleteing cart");
        }
      });
  };

  return (
    <div className="container-fluid">
      <CustHomeNv />
      <section className="h-100 bg-dark" class="myStyle">
        <div>
          <table class="table table-striped table-bordered">
            <thead>
              <tr>
                <th scope="col">Stock Name</th>
                <th scope="col">Qty</th>
                <th scope="col">Price</th>
                <th scope="col">Total</th>
                <th scope="col">Action</th>
              </tr>
            </thead>
            <tbody>
              {cart.map((cart) => {
                total = total + cart.selectedStock.price * cart.quantity;
                return (
                  <tr>
                    <td>{cart.selectedStock.productName}</td>
                    <td>{cart.quantity}</td>
                    <td>{cart.selectedStock.price}</td>
                    <td>{cart.selectedStock.price * cart.quantity}</td>
                    <td>
                      <button
                        onClick={() => removeItem(cart.id)}
                        type="button"
                        className="btn btn-danger"
                        style={{ marginTop: 5 }}
                      >
                        Remove
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          <div style={{ marginLeft: 0, textAlign: "center" }}>
            <br />
            <h6>
              Order total : <strong>{total} </strong>
              {total < 500 &&
                `+ 50 Rs | Add items worth ${
                  500 - total
                } to get free delivery`}{" "}
              <i>{total >= 500 && `Rs. WOW!! you got free delivery!!`}</i>
            </h6>
          </div>
        </div>
        <div
          style={{ display: "flex", justifyContent: "center", marginTop: 50 }}
        >
          <Link to="/SelectAddress" style={{ marginRight: 10 }}>
            <button type="button" className="btn btn-success">
              Proceed
            </button>
          </Link>
          <Link to="/CustomerHomePage">
            <button type="button" className="btn btn-dark">
              Back
            </button>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Cart;