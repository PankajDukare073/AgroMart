import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import config from "../../config";
import { toast } from "react-toastify";
import RestoNav from "../../components/RestoNav";

const AddMenu = () => {
  const [menuName, setMenuName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [file, setFile] = useState("");

  const [categoryList, setCategoryList] = useState([]);
  const [type, setType] = useState("SEED");

  const restoId = sessionStorage.getItem("ownerId");
  const navigate = useNavigate();

  useEffect(() => {
    allCategories();
  }, []);

  const allCategories = () => {
    axios.get(`${config.serverURL}/category/all`).then((Response) => {
      const result = Response.data;

      if (result["status"] === "success") {

        setCategoryList(result["data"]);
      } else {
        toast.error("ERROR OCCURED...");
      }
    });
  };

  const addNewMenu = () => {
    if (menuName.length === 0) {
      toast.warning("enter name");
    } else if (description.length === 0) {
      toast.warning("enter description");
    } else if (price.length === 0) {
      toast.warning("enter prive");
    } else if (categoryId.length === 0) {
      toast.warning("choose Category");
    } else if (file.length === 0) {
      toast.warning("choose image");
    } else {
      const body = new FormData();
      body.set("stockName", menuName);
      body.set("description", description);
      body.set("price", price);
      body.set("shop", restoId);
      body.set("catagory", categoryId);
      body.set("imageName", file);
      body.set("type", type);

      console.log(body);
      axios.post(`${config.serverURL}/stock/add`, body).then((Response) => {
        const result = Response.data;

        if (result["status"] === "Success") {
          toast.success("New Stock added");
          navigate("/Products");
        } else {
          toast.error("ERROR OCCURED...");
        }
      });
    }
  };

  return (
    <div className="container-fluid">
      <RestoNav />
      <section className="container-fluid RestoStyle1">
        <div className="form-outline mb-4">
          <label className="form-label" for="form3Example97">
            Name
          </label>
          <input
            type="text"
            id="form3Example97"
            className="form-control form-control-lg"
            onChange={(e) => {
              setMenuName(e.target.value);
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
            onChange={(e) => {
              setDescription(e.target.value);
            }}
          />
        </div>
        <div className="form-outline mb-4">
          <label className="form-label" for="form3Example97">
            Price
          </label>
          <input
            type="number"
            id="form3Example97"
            className="form-control form-control-lg"
            onChange={(e) => {
              setPrice(e.target.value);
            }}
          />
        </div>
        <div className="form-outline mb-4">
          <label className="form-label" for="form3Example97">
            Category &nbsp;&nbsp;
          </label>
          <select
            className="form-select form-select mb-3"
            aria-label=".form-select-lg example"
            onChange={(e) => {
              setCategoryId(e.target.value);
            }}
          >
            <option value="">select Category</option>
            {categoryList.map((cat) => {
              return <option value={cat.id}>{cat.name}</option>;
            })}
          </select>
        </div>

        <div className="form-outline mb-4">
          {" "}
          <input
            type="radio"
            id="SEED"
            name="fertitype"
            value="SEED"
            checked="checked"
            onChange={(e) => {
              setType(e.target.value);
            }}
          ></input>{" "}
          SEED{" "}
          <input
            type="radio"
            id="FERTILIZER"
            name="fertitype"
            value="FERTILIZER"
            onChange={(e) => {
              setType(e.target.value);
            }}
          ></input>{" "}
          FERTILIZER{" "}
          <input
            type="radio"
            id="NPK"
            name="fertitype"
            value="NPK"
            onChange={(e) => {
              setType(e.target.value);
            }}
          ></input>{" "}
          NPK
        </div>

        <div className="form-outline mb-4">
          <label className="form-label" for="form3Example97">
            Image
          </label>
          <input
            type="file"
            id="form3Example97"
            className="form-control form-control-lg"
            onChange={(e) => {
              setFile(e.target.files[0]);
            }}
          />
          <small>
            <i>max size 10MB</i>
          </small>
        </div>

        <div
          className="button-container"
          style={{
            display: "flex",
            justifyContent: "center",
            marginTop: "20px",
          }}
        >
          <button
            onClick={addNewMenu}
            type="submit"
            className="btn btn-success"
          >
            Submit
          </button>
        </div>
      </section>
    </div>
  );
};

export default AddMenu;
