import axios from "axios";
import { useState, useEffect } from "react";
import config from "../../config";
import RestoNav from "../../components/RestoNav";

const ShowFeedbacks = () => {
  const [ratingList, setRatingList] = useState([]);
  const restoId = sessionStorage.getItem("restaurentId");

  useEffect(() => {
    getDetails();
  }, []);

  const getDetails = () => {
    axios
      .get(config.serverURL + "/resto/allRatings/" + restoId)
      .then((response) => {

        const result = response.data;

        console.log(result);

        if (result.status == "Success") {

          setRatingList(result.data);
        } else {
          alert("error while loading list of restaurant details List");
        }
      });
  };

  return (
    <div className="container-fluid">
      <RestoNav/>
      <section className="container-fluid RestoStyle">
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
            {ratingList.map((user) => {
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
      </section>
    </div>
  );
};

export default ShowFeedbacks;
