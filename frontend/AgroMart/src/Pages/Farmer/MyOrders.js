import axios from "axios";
import { useState, useEffect } from "react";
import "./Address.css";
import config from "../../config";
import { toast } from "react-toastify";
import FarmerHomeNv from "../../components/FarmerHomeNv";

const MyOrders = () => {
  const [orderList, setOrderList] = useState([]);
  const [orderDetailsList, setOrderDetailsList] = useState([]);
  const userid = sessionStorage.getItem("farmerId");

  useEffect(() => {
    getOrderDetails();
  }, []);

  const getOrderDetails = () => {
    axios
      .get(`${config.serverURL}/order/myorders/${userid}`)
      .then((response) => {
        const result = response.data;
        if (result.status === "success") {
          setOrderList(result.data);
          console.log(result.data);
        } else {
          toast.error("error while loading order list");
        }
      });
  };

  const loadList = (list) => {
    setOrderDetailsList(list);
    return orderDetailsList;
  };

  return (
    <div className="container-fluid">
      <FarmerHomeNv />
      <section className="container-fluid mystyle">
        <div>
          <table class="table table-striped table-bordered">
            <thead class="thead-dark">
              <tr>
                <th scope="col">Details</th>
                <th scope="col">Total Bill</th>
                <th scope="col">Order status</th>
                <th scope="col">Pay Status</th>
              </tr>
            </thead>
            <tbody>
              {orderList.map((list) => {
                return (
                  <tr>
                    <td>
                      {list.orderDetails.map((details) => {
                        return (
                          <div>
                            {details.selectedProduct.productName}-
                            {details.quantity}
                          </div>
                        );
                      })}
                      
                    </td>
                    <td>{list.order.totalPrice}</td>
                    <td>{list.order.status}</td>
                    <td>{list.payment.paymentStatus}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
};

export default MyOrders;
