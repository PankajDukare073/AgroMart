import axios from "axios";
import { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import config from "../../config";
import { toast } from "react-toastify";
import OwnerNav from "../../components/OwnerNav";

const EditStock = () => {
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [status, setStatus] = useState("");

  const [menu, setMenu] = useState("");

  const location = useLocation();
  const { menuId } = location.state;

  const navigate = useNavigate();

  useEffect(() => {
    getDetails(menuId);
  }, []);

  const getDetails = (id) => {
    axios.get(config.serverURL + "/stock/getById/" + id).then((response) => {
      const result = response.data;
      if (result["status"] === "success") {
        // set the details
        setMenu(result["data"]);

        setStatus(menu.status);
        console.log(result["data"]);
      } else {
        toast.error("menu not found");
      }
    });
  };

  const EditStock = () => {
 toast.error("menu click");
    if (status.length === 0) 
      {
      setStatus(menu.status);
    } 
    else {   
      console.log("psankshd"+ { description: menu.description, price: menu.price, status: status  });
      axios
        .put(
          `${config.serverURL}/stock/edit/${menuId}`,
          { description: menu.description, price: menu.price, status: status  }
        )
        .then((Response) => {
          const result = Response.data;

          if (result["status"] === "Success") {
            toast.success("menu edited successfully");
            navigate("/Products");
          } else {
            toast.error("ERROR OCCURED...");
          }
        });
      }
  };

  return (
    <div className="container-fluid">
      <OwnerNav />
      <section className="container-fluid OwnStyle1">
        <div className="form-outline mb-4">
          <label className="form-label" for="form3Example97">
            Product Name
          </label>
          <input
            type="text"
            id="form3Example97"
            className="form-control form-control-lg"
            defaultValue={menu.productName}
            onChange={(e) => {
              setDescription(e.target.value);
            }}
          />
        </div>

        <div className="form-outline mb-4">
          <label className="form-label" for="form3Example97">
            Description
          </label>
          <input
            type="text"
            id="form3Example97"
            className="form-control form-control-lg"
            defaultValue={menu.description}
            onChange={(e) => {
              setDescription(e.target.value);
            }}
          />
        </div>
        <div className="form-outline mb-4">
          <label className="form-label" for="form3Example97">
            price
          </label>
          <input
            type="number"
            id="form3Example97"
            className="form-control form-control-lg"
            defaultValue={menu.price}
            onChange={(e) => {
              setPrice(e.target.value);
            }}
          />
        </div>
        <div className="form-outline mb-4">
          <label className="form-label" for="form3Example97">
            Status &nbsp;&nbsp;
          </label>
          <select
            className="form-select form-select mb-3"
            aria-label=".form-select-lg example"
            defaultValue={menu.status}
            onChange={(e) => {
              setStatus(e.target.value);
            }}
          >
            <option value="">select</option>
            <option value="1">AVAILABLE</option>
            <option value="0">NOT-AVAILABLE</option>
          </select>
        </div>

        <div
          className="button-container"
          style={{
            display: "flex",
            justifyContent: "center",
            marginTop: "20px",
          }}
        >
          <button onClick={EditStock} type="submit" className="btn btn-success">
            Save
          </button>
        </div>
      </section>
    </div>
  );
};

export default EditStock;
