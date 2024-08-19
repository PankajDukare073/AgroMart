import RestoNav from "../../../components/RestoNav";
import config from "../../../config";
import axios from "axios";
import { useState, useEffect } from "react";
import "../Style.css"
const CustomerList = () => {
  const [customerList, setCustomerList] = useState([]);
  
  useEffect(() => {
    getCustomerList();
  }, []);

  const getCustomerList = () => {
    axios.get(config.serverURL + "/admin/getAllFarmer").then((response) => {

      const result = response.data;

      if (result.status === "Success") {
        setCustomerList(result.data);
        console.log(customerList);
      } else {
        alert("error while loading list of DeliveryBoyList");
      }
    });
  };
  return (
    <div className="container-fluid">
  <RestoNav />
      <div className="container-fluid mystyle ">
        <header style={{ textAlign: "center", fontSize: 30 }}>
          <b>Farmer List</b>
        </header>
        <table
          className="table table-responsive table-striped table-hover table-bordered"
          style={{ marginTop: 60 }}
        >
          <thead>
            <tr>
              <th scope="col">Id</th>
              <th scope="col">Name</th>
              <th scope="col">Email</th>
              <th scope="col">Contact</th>
            </tr>
          </thead>
          <tbody>
            {customerList.map((user) => {
              return (
                <tr>
                  <td scope="col">{user.id}</td>
                  <td scope="col">{user.name}</td>
                  <td scope="col">*******</td>
                  <td scope="col">*******</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CustomerList;
