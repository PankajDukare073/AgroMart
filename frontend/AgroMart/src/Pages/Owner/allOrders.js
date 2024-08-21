import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import config from "../../config";
import { toast } from "react-toastify";
import OwnerNav from "../../components/OwnerNav";
const AllOrders = () => {
  let navigate = useNavigate();
  const [orderList, setOrderList] = useState([]);

  useEffect(() => {
    console.log(`orderlist is loaded`);
    getOrderList();
  }, []);

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

  const getOrderList = () => {
    const id = sessionStorage.getItem("ownerId");
    axios.get(config.serverURL + "/shop/allOrders/" + id).then((response) => {

      const result = response.data;

      if (result.status === "success") {
        setOrderList(result.data);
      } else {
        alert("error while loading list of OrderList");
      }
    });
  };

  const acceptOrder = (Id) => {
    console.log("incart method");

    axios
      .put(config.serverURL + "/shop/updateStatus/" + Id + "/ACCEPTED")
      .then((Response) => {
        const result = Response.data;

        if (result["status"] === "success") {
          console.log(result);

          toast.success("Order Accepted");
          window.location.reload();

        } else {
          toast.error("ERROR OCCURED...");
        }
      });
  };

  return (
    <div className="container-fluid">
      <OwnerNav />
      <div className="container-fluid OwnStyle">
        <header style={{ textAlign: "center", fontSize: 30 }}>
          <b>New Orders</b>
        </header>
        <table
          className="table table-responsive table-striped table-hover table-bordered"
          style={{ marginTop: 60 }}
        >
          <thead>
            <tr>
              <th scope="col">Id</th>
              <th scope="col">Farmer name</th>
              <th scope="col">Address</th>
              <th scope="col">Contact</th>
              <th scope="col">Product</th>
              <th scope="col">Quantity</th>
              <th scope="col">Order Date</th>
              <th scope="col">Order Time</th>
              <th scope="col">Status</th>
            </tr>
          </thead>
          <tbody>
            {orderList.map((order) => {
              return (
                <tr>
                  <td scope="col">{order.currentOrder.id}</td>
                  <td scope="col">{order.currentOrder.farmer.name}</td>
                  <td scope="col">
                    <p>
                      {order.currentOrder.address.city},
                      {order.currentOrder.address.state}{" "}
                      {order.currentOrder.address.pincode}
                    </p>
                  </td>
                  <td scope="col">{order.currentOrder.address.contactNo}</td>
                  <td scope="col">{order.selectedProduct.productName}</td>
                  <td scope="col">{order.quantity}</td>
                  <td scope="col">{getDate(order.currentOrder.orderTime)}</td>
                  <td scope="col">{getTime(order.currentOrder.orderTime)}</td>
                  <td scope="col">{order.currentOrder.status}</td>
                  <td>
                    <button
                      onClick={() => acceptOrder(order.currentOrder.id)}
                      className="btn"
                      style={{
                        backgroundColor: "#5C41A8",
                        color: "white",
                        fontSize: 15,
                      }}
                    >
                      Accept
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
export default AllOrders;
