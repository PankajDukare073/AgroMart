import OwnerNav from "../../../components/OwnerNav";
import config from "../../../config";
import axios from "axios";
import { useState, useEffect } from "react";
import "../Style.css"
const farmerList = () => {
  const [farmerList, setfarmerList] = useState([]);
  
  useEffect(() => {
    getfarmerList();
  }, []);

  const getfarmerList = () => {
    axios.get(config.serverURL + "/Owner/getAllFarmer").then((response) => {

      const result = response.data;

      if (result.status === "Success") {
        setfarmerList(result.data);
        console.log(farmerList);
      } else {
        alert("error while loading list of DeliveryBoyList");
      }
    });
  };
  return (
    <div className="container-fluid">
  <OwnerNav />
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
            {farmerList.map((user) => {
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

export default farmerList;
