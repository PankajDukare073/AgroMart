import NavbarDeliveryBoy from "../../components/navbarDeliveryBoy";
import axios from "axios";
import { useState, useEffect } from "react";
import config from "../../config";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import "./Delivery.css"
const AcceptedOrder = () => {
  const navigate = useNavigate();
  const [orderList, setOrderList] = useState([]);
  const [status, setStatus] = useState("");

  useEffect(() => {
    console.log(` is loaded`);
    getOrderList();
  }, []);

  const getOrderList = () => {
    const deliveryBoyId = sessionStorage.getItem("deliveryBoyId");
    axios
      .get(`${config.serverURL}/order/assigned/${deliveryBoyId}`)
      .then((response) => {

        const result = response.data;

        if (result.status === "success") {
          setOrderList(result.data);
          navigate("/acceptedOrder");
          //window.location.reload();
        } else {
          toast.error("ERROR OCCURED...");
        }
      });
  };

  const UpdateStatus = (id) => {
    axios
      .put(`${config.serverURL}/delivery/updateStatus/${id}/${status}`)
      .then((response) => {
        const result = response.data;

        if (result.status === "success") {

          window.location.reload();
          window.onload = function () {

            toast.success("Status Updated Successfully");
          };

        } else {
          toast.error("ERROR OCCURED...");
        }
      });
  };

  function getDate(datetime) {
    const dateTime = new Date(...datetime);

    const date = dateTime.toLocaleDateString();
    return date;
  }

  function getTime(datetime) {
    const dateTime = new Date(...datetime);

    const time = dateTime.toLocaleTimeString();
    return time;
  }

  return (
    <div className="container-fluid">
      <NavbarDeliveryBoy />
      <div className="container-fluid DeliveryStyle">
        <header style={{ textAlign: "center", fontSize: 30 }}>
          <b>Assigned Orders</b>
        </header>
        <table
          className="table table-responsive table-striped table-hover table-bordered"
          style={{ marginTop: 60, fontSize: 12 }}
        >
          <thead>
            <tr>
              <th scope="col">Id</th>
              <th scope="col">farmer name</th>
              <th scope="col">Address</th>
              <th scope="col">Contact</th>
              <th scope="col">Price</th>
              <th scope="col">Payment Status</th>
              <th scope="col">Order Date</th>
              <th scope="col">Order Time</th>
              <th scope="col">Status</th>
            </tr>
          </thead>
          <tbody>
            {orderList.map((order) => {
              return (
                <tr key={order.order.id}>
                  <td scope="col">{order.order.id}</td>
                  <td scope="col">{order.order.farmer.name}</td>

                  <td scope="col">
                    <p>
                      {order.order.address.line1},{order.order.address.line2},
                      {order.order.address.city},{order.order.address.state}{" "}
                      {order.order.address.pincode}
                    </p>
                  </td>
                  <td scope="col">{order.order.address.contactNo}</td>
                  <td scope="col">Rs : {order.payment.ammount}</td>
                  <td scope="col">{order.payment.paymentStatus}</td>
                  <td scope="col">{getDate(order.payment.currentOrder.orderTime)}</td>
                  <td scope="col">{getTime(order.payment.currentOrder.orderTime)}</td>
                  <td scope="col">{order.payment.currentOrder.status}</td>

                  <td>
                    <select
                      className="form-select form-select mb-3"
                      aria-label=".form-select-lg example"
                      required=""
                      onChange={(event) => {
                        setStatus(event.target.value);
                      }}
                    >

                      <option value="">select</option>
                      <option value="OUT_FOR_DELIVERY">Out For Delivery</option>
                      <option value="DELIVERED">Delivered</option>
                      <option value="CANCELLED">Cancelled</option>
                    </select>
                  </td>

                  <td>
                    <button
                      onClick={() => UpdateStatus(order.order.id)}
                      className="btn"
                      style={{ backgroundColor: "#5C41A8", color: "white" }}
                    >
                      Update
                    </button>
                  </td>

                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};
export default AcceptedOrder;

