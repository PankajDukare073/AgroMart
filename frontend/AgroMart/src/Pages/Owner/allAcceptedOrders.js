import axios from 'axios'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import config from '../../config'
import { toast } from 'react-toastify'
import OwnerNav from '../../components/OwnerNav'
const AllAcceptedOrders = () => {

  const navigate = useNavigate()
  const [orderList, setOrderList] = useState([]);
  const [paymentState, setPaymentState] = useState([]);

  const [status, setStatus] = useState('')

  useEffect(() => {
    getOrderList()
    getPaymentState()
  }, [])

  function getDate(datetime) {
    const dateTime = new Date(...datetime);

    console.log(dateTime);

    const date = dateTime.toLocaleDateString();
    return date;
  }

  function getTime(datetime) {

    const dateTime = new Date(...datetime);
    //console.log(dateTime);
    const time = dateTime.toLocaleTimeString();
    return time;
  }

  const getPaymentState = () => {
    const id = sessionStorage.getItem("ownerId");
    axios.get(config.serverURL + '/shop/allAcceptedOrdersPayment/' + id).then((response) => {
      const result = response.data

      console.log(paymentState)
      console.log(response.data)
      if (result.status === 'success') {
        setPaymentState(result.data)
        console.log(paymentState)
      } else {
        alert('error while loading list of paymentstate')
      }
    })
  }
  const getOrderList = () => {
    const id = sessionStorage.getItem("ownerId");
    axios.get(config.serverURL + '/shop/allAcceptedOrders/' + id).then((response) => {

      const result = response.data

      if (result.status === 'success') {
        setOrderList(result.data)
      } else {
        alert('error while loading list of OrderList')
      }
    })
  }

  const getPaymentStateById = (id) => {
    const status = paymentState.find(payment => payment.currentOrder.id === id);
    return status ? status.paymentStatus.toString() : null;
  };

  const UpdateStatus = (id) => {

    axios.put(`${config.serverURL}/shop/updateStatus/${id}/${status}`).then((response) => {

      const result = response.data

      if (result.status === 'success') {

        window.location.reload();
        toast.success('Status Updated Successfully')
      } else {
        toast.error('ERROR OCCURED...')
      }
    })
  }

  return (<div className="container-fluid">
    <OwnerNav />
    <div className="container-fluid OwnStyle">
      <header style={{ textAlign: "center", fontSize: 30 }}><b>Accepted Orders</b></header>
      <table className='table table-responsive table-striped table-hover table-bordered'
        style={{ marginTop: 60, fontSize: 12 }}>
        <thead>
          <tr>
            <th scope="col">Id</th>
            <th scope="col">farmer name</th>
            <th scope="col">Address</th>
            <th scope="col">Contact</th>
            <th scope="col">Product</th>
            <th scope="col">Quantity</th>
            <th scope="col">Order Date</th>
            <th scope="col">Order Time</th>
            <th scope="col">Payment Status</th>
            <th scope="col">Status</th>

          </tr>
        </thead>
        <tbody>
          {orderList.map((order) => {
            console.log(order.currentOrder.orderTime)
            return (<tr>
              <td scope="col">{order.currentOrder.id}</td>
              <td scope="col">{order.currentOrder.farmer.name}</td>

              <td scope="col"><p>{order.currentOrder.address.line1},{order.currentOrder.address.line2},
                {order.currentOrder.address.city},{order.currentOrder.address.state} {order.currentOrder.address.pincode}</p></td>
              <td scope="col">{order.currentOrder.address.contactNo}</td>

              <td scope="col">{order.selectedProduct.productName}</td>
              <td scope="col">{order.quantity}</td>
              <td scope="col">{getDate(order.currentOrder.orderTime)}</td>
              <td scope="col">{getTime(order.currentOrder.orderTime)}</td>
              <td scope="col">{getPaymentStateById(order.currentOrder.id)}</td>
              <td scope="col">{order.currentOrder.status}</td>

              {order.currentOrder.status !== 'DELIVERY_ASSIGNED' && order.currentOrder.status !== 'OUT_FOR_DELIVERY' && order.currentOrder.status !== 'CANCELLED'
                && order.currentOrder.status !== 'DELIVERED' &&
                <td>
                  <select className="form-select form-select mb-3" aria-label=".form-select-lg example"
                    required=''
                    onChange={(event) => {
                      setStatus(event.target.value)
                    }}>
                    <option value="">select</option>
                    <option value="PACKING">Packing</option>
                    <option value="READY">Ready</option>
                  </select>
                </td>}
              {order.currentOrder.status !== 'DELIVERY_ASSIGNED' && order.currentOrder.status !== 'OUT_FOR_DELIVERY' && order.currentOrder.status !== 'CANCELLED'
                && order.currentOrder.status !== 'DELIVERED' &&
                <td><button
                  onClick={() => UpdateStatus(order.currentOrder.id)}
                  className='btn' style={{ backgroundColor: '#5C41A8', color: 'white' }}>Update</button></td>
              }
            </tr>)
          })}
        </tbody>
      </table>
    </div>
  </div>)
}
export default AllAcceptedOrders