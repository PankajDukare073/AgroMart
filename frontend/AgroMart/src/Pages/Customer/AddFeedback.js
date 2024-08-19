import axios from "axios";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import Rating from "react-rating";
import config from "./../../config";
import CustHomeNv from "./../../components/CustHomeNv";

const AddFeedback = () => {
  const [comment, setComment] = useState("");
  const [rating, setRating] = useState("");
  const [restId, setRestaurantId] = useState("");
  const [restaurantList, setRestaurantList] = useState([]);

  const userId = sessionStorage.getItem("customerId");
  const navigate = useNavigate();

  useEffect(() => {
    getAllRestaurant();
    console.log(`Restaurants are loaded`);
  }, []);

  const getAllRestaurant = () => {
    axios.get(config.serverURL + "/admin/getAllRestaurant").then((Response) => {
      const result = Response.data;

      if (result["status"] === "Success") {
        console.log(result);
        setRestaurantList(result["data"]);
      } else {
        toast.error("ERROR OCCURED...");
      }
    });
  };

  const addRating = () => {
    if (rating.length == 0) {
      toast.warning("enter Rating");
    } else if (comment.length === 0) {
      toast.warning("enter comment");
    } else if (restId.length === 0) {
      toast.warning("enter restaurant");
    } else {
      console.log(rating);
      const body = { userId, restId, comment, rating };

      axios.post(config.serverURL + "/rating/add", body).then((Response) => {
        const result = Response.data;

        toast.success("Feedback posted successfully");
        navigate("/CustomerHomePage");
      });
    }
  };

  return (
    <div className="container-fluid">
      <CustHomeNv />
      <section class="myStyle1">
        <h3 className="mb-5" style={{ textAlign: "center" }}>
          Feedback
        </h3>

        <div className="form-outline mb-4">
          <label
            className="form-label"
            for="form3Example97"
            style={{ fontWeight: "bold" }}
          >
            Restaurant &nbsp;&nbsp;
          </label>
          <select
            className="form-select form-select mb-3"
            aria-label=".form-select-lg example"
            onChange={(e) => {
              setRestaurantId(e.target.value);
            }}
          >
            <option value="">Select Restaurant</option>

            {restaurantList.map((resto) => {
              return <option value={resto.id}>{resto.name}</option>;
            })}
          </select>
        </div>
        <div>
          <label
            className="form-label"
            for="form3Example97"
            style={{ fontWeight: "bold" }}
          >
            Rating :&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          </label>
          <Rating
            fractions={1}
            emptySymbol="fa fa-star-o fa-2x star"
            fullSymbol="fa fa-star fa-2x str"
            initialRating={rating}
            onClick={(rate) => setRating(rate)}
          />
        </div>
        <div className="form-outline mb-4" style={{ marginTop: 20 }}>
          <label
            className="form-label"
            for="form3Example97"
            style={{ fontWeight: "bold" }}
          >
            Comment
          </label>
          <textarea
            class="form-control"
            id="exampleFormControlTextarea1"
            rows="3"
            onChange={(e) => {
              setComment(e.target.value);
            }}
          />
        </div>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <button onClick={addRating} type="submit" className="btn btn-success">
            Submit
          </button>
        </div>
      </section>
    </div>
  );
};

export default AddFeedback;