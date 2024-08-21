import axios from "axios";
import { useState, useEffect } from "react";
import config from "../../../config";
import NavbarOwner from "../../../components/navbarOwner";
import { useNavigate } from "react-router-dom";
import "../Style.css"

const shopList = () => {
  const navigate = useNavigate();
  const [shopList, setshopList] = useState([]);

  useEffect(() => {
    console.log(`list is loaded`);
    getshopList();
  }, []);

  const getshopList = () => {
    axios.get(config.serverURL + "/Owner/getAllOwner").then((response) => {
      
      const result = response.data;

      if (result.status === "Success") {
        setshopList(result.data);
      } else {
        alert("error while loading list of Owner List");
      }
    });
  };

  const GetDetails = (id,name) => {
    navigate("/getOwnerDetails", { state: { restaurentId: id ,shopName : name} });
  };

  const GetMenu = (id) => {
    navigate("/getOwnerMenu", { state: { restaurentId: id } });
  };

  const handleButtonClick = (id,status) => {
 
      const bool1 = status==="ACTIVE"?"1":"0"
      axios.put(config.serverURL + "/Owner/changeStatus/"+id+"/"+bool1).then((response) => {
        const result1 = response.data;

      if (result1.status === "Success") {
        getshopList()
      } else {
        alert("error while updating list of Owner List");
      }
    });

    // console.log(`Button clicked for shop with ID: ${id} and ${status}` );
  };


  return (
    <div className="container-fluid">
      <NavbarOwner/>
      <div className="container-fluid mystyle">
        <header style={{ textAlign: "center", fontSize: 30 }}>
          <b>Owners List</b>
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
              <th scope="col">Status</th>
            </tr>
          </thead>
          <tbody>
            {shopList.map((user) => {
              return (
                <tr>
                  <td scope="col">{user.id}</td>
                  <td scope="col">{user.name}</td>
                  <td scope="col">{user.email}</td>
                  <td scope="col">{user.contact}</td>
                  <td scope="col">{user.status}</td>
                  <td>
                    <button
                      onClick={() => GetDetails(user.id,user.name)}
                      className="btn"
                      style={{ backgroundColor: "#5C41A8", color: "white" }}
                    >
                      Reviews
                    </button>
                    </td><td>
                    <button
                      onClick={() => GetMenu(user.id)}
                      className="btn"
                      style={{ backgroundColor: "#5C41A8", color: "white" }}
                    >
                      Menu
                    </button>
                  </td>     
                  <td>
                  <button
                      onClick={() => handleButtonClick(user.id, user.status)}
                      className="btn"
                      style={{ backgroundColor: "#5C41A8", color: "white" }}
                    >
                      {user.status === "ACTIVE" ? "Disable" : "Enable"}
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

export default shopList;
