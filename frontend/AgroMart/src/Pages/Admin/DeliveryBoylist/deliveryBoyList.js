import axios from 'axios'
import { useState, useEffect } from 'react'
import RestoNav from '../../../components/RestoNav';
import config from '../../../config';
import "../Style.css"

const DeliveryBoyList = () => {

  const [deliveryBoyList, setDeliveryBoyList] = useState([])

  useEffect(() => {
    getDeliveryBoyList()
  }, [])

  const getDeliveryBoyList = () => {
    axios.get(config.serverURL + '/admin/getAllDeliveryBoy').then((response) => {
      const result = response.data

      if (result.status === 'Success') {
        setDeliveryBoyList(result.data)
      } else {
        alert('error while loading list of DeliveryBoyList')
      }
    })
  }

  return (

    <div className='container-fluid'>
     <RestoNav />
      <div className="container-fluid mystyle">
        <header style={{ textAlign: "center", fontSize: 30 }}><b>DeliveryBoy List</b></header>
        <table className='table table-responsive table-striped table-hover table-bordered'
          style={{ marginTop: 60 }}>
          <thead>
            <tr>
              <th scope="col">Id</th>
              <th scope="col">Name</th>
              <th scope="col">Email</th>
              <th scope="col">Contact</th>
            </tr>
          </thead>
          <tbody>
            {deliveryBoyList.map((user) => {
              return (<tr>
                <td scope="col">{user.id}</td>
                <td scope="col">{user.name}</td>
                <td scope="col">{user.email}</td>
                <td scope="col">{user.contact}</td>
              </tr>)
            })}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default DeliveryBoyList;