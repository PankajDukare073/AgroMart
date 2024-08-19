import NavbarDeliveryBoy from "../../components/navbarDeliveryBoy";
import axios from "axios";
import { useState, useEffect } from "react";
import config from "../../config";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import "./Delivery.css"

const DeliveryBoyHome = () => {
  let navigate = useNavigate();
  const [orderList, setOrderList] = useState([]);

  useEffect(() => {
    console.log(` is loaded`);
    getOrderList();
  }, []);

  const getOrderList = () => {
    axios.get(config.serverURL + "/delivery/placedOrders").then((response) => {

      const result = response.data;
console.log(result);
      if (result.status === "success") {
        console.log(result.data);
        setOrderList(result.data);
      } else {
        alert("error while loading list of OrderList");
      }
    });
  };

  const acceptOrder = (Id) => {
    console.log("incart method");
    const deliveryBoyId = sessionStorage.getItem("deliveryBoyId");

    axios
      .put(
        `${config.serverURL}/delivery/update`,
        { orderId: Id, userId: deliveryBoyId },
        { "Content-Type": "application/json" }
      )
      .then((Response) => {
        const result = Response.data;

        if (result["status"] === "success") {
          console.log(result);
          navigate("/acceptedOrder");

          toast.success("Order Accepted");
          
        } else {
          toast.error("ERROR OCCURED...");
        }
      });
  };

  function getDate(datetime) {
    const dateTime = new Date(datetime);

    const date = dateTime.toLocaleDateString();
    return date;
  }

  function getTime(datetime) {
    const dateTime = new Date(datetime);

    const time = dateTime.toLocaleTimeString();
    return time;
  }

  return (
    <div className="container-fluid">
      <NavbarDeliveryBoy />
      <div className="container-fluid DeliveryStyle">
        <header style={{ textAlign: "center", fontSize: 30 }}><b>New Orders</b></header>
        <table className='table table-responsive table-striped table-hover table-brodered'
          style={{ marginTop: 60 }}>
          <thead>
            <tr>
              <th scope="col">Id</th>
              <th scope="col">farmer name</th>
              <th scope="col">Address</th>
              <th scope="col">Contact</th>
              <th scope="col">Price</th>
              <th scope="col">Order Date</th>
              <th scope="col">Order Time</th>
            </tr>
          </thead>
          <tbody>
            {orderList.map((order) => {
              return (<tr key={order.id}>
                <td scope="col">{order.id}</td>
                <td scope="col">{order.farmer.name}</td>

                <td scope="col"><p>
                  {order.address.city},{order.address.state} {order.address.pincode}</p></td>
                <td scope="col">{order.address.contactNo}</td>
                <td scope="col">Rs : {order.totalPrice}</td>
                <td scope="col">{getDate(order.orderTime)}</td>
                <td scope="col">{getTime(order.orderTime)}</td>


                <td><button
                  onClick={() => acceptOrder(order.id)}
                  className='btn' style={{ backgroundColor: '#5C41A8', color: 'white' }}>Accept</button></td>
              </tr>)
            })}
          </tbody>
        </table>
      </div>
    </div>
  )
}


export default DeliveryBoyHome;
