import axios from "axios";
import config from "../../../config";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import NavbarOwner from "../../../components/navbarOwner";
const GetOwnerDetails = () => {
  const location = useLocation();
  const [shopList, setshopList] = useState([]);

  useEffect(() => {
    const { restaurentId } = location.state;
    getDetails(restaurentId);
  }, []);

  const getDetails = (id) => {
    axios.get(config.serverURL + "/Own/allRatings/" + id).then((response) => {

      const result = response.data;
      console.log(result);

      if (result.status == "Success") {

        setshopList(result.data);
      } else {
        alert("error while loading list of shop details List");
      }
    });
  };

  return (
    <div className="container-fluid">
      <NavbarOwner/>
      <div style={{ textAlign: "center" }}>
        <h4>Owner reviews</h4>
      </div>
      <table
        className="table table-responsive table-striped table-hover table-bordered"
        style={{ marginTop: 60 }}
      >
        <thead>
          <tr>
            <th scope="col">Id</th>
            <th scope="col">farmer Name</th>
            <th scope="col">Comment</th>
            <th scope="col">Rating</th>
          </tr>
        </thead>
        <tbody>
          {shopList.map((user) => {
            return (
              <tr>
                <td scope="col">{user.id}</td>
                <td scope="col">{user.selectedfarmer.name}</td>
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

export default GetOwnerDetails;