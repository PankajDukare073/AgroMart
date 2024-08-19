import axios from "axios";
import config from "../../../config";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import NavbarAdmin from "../../../components/navbarAdmin";
const GetRestaurantDetails = () => {
  const location = useLocation();
  const [restaurantList, setRestaurantList] = useState([]);

  useEffect(() => {
    const { restaurentId } = location.state;
    getDetails(restaurentId);
  }, []);

  const getDetails = (id) => {
    axios.get(config.serverURL + "/resto/allRatings/" + id).then((response) => {

      const result = response.data;
      console.log(result);

      if (result.status == "Success") {

        setRestaurantList(result.data);
      } else {
        alert("error while loading list of restaurant details List");
      }
    });
  };

  return (
    <div className="container-fluid">
      <NavbarAdmin/>
      <div style={{ textAlign: "center" }}>
        <h4>Restaurant reviews</h4>
      </div>
      <table
        className="table table-responsive table-striped table-hover table-bordered"
        style={{ marginTop: 60 }}
      >
        <thead>
          <tr>
            <th scope="col">Id</th>
            <th scope="col">Customer Name</th>
            <th scope="col">Comment</th>
            <th scope="col">Rating</th>
          </tr>
        </thead>
        <tbody>
          {restaurantList.map((user) => {
            return (
              <tr>
                <td scope="col">{user.id}</td>
                <td scope="col">{user.selectedCustomer.name}</td>
                <td scope="col">{user.comment}</td>
                <td scope="col">{user.rating}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default GetRestaurantDetails;