import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import config from "../../config";
import { toast } from "react-toastify";
import RestoNav from "../../components/RestoNav";
import Category from "./Category";

const EditCategory = () => {
  const [category, setCategory] = useState("");
  const [categoryName, setCategoryName] = useState("");
  const location = useLocation();
  const { catId } = location.state;

  const navigate = useNavigate();

  useEffect(() => {
    getDetails(catId);
  }, []);

  const getDetails = (id) => {
    axios.get(config.serverURL + "/category/getById/" + id).then((response) => {
      const result = response.data;
      if (result["status"] === "success") {
        
        setCategory(result["data"]);
        setCategoryName(result.data.name)
        console.log(result["data"]);
      } else {
        toast.error("category not found");
      }
    });
  };

  const editCategoryNow = () => {
 
    if (categoryName.length === 0) {
      setCategoryName(category.name);
    } else {   
      axios
        .put(
          `${config.serverURL}/category/update/${catId}`,
          { id: catId, name: categoryName }
        )
        .then((Response) => {
          const result = Response.data;

          if (result["status"] === "success") {
            toast.success("category edited successfully");
            navigate("/Category");
          } else {
            toast.error("ERROR OCCURED...");
          }
        });
      }
  };

  return (
    <div className="container-fluid">
      <RestoNav />
      <section className="container-fluid mystyle1">
        <h4 style={{ textAlign: "center" }}>
          {" "}
          EDIT CATEGORY{" "}
        </h4>
        <div className="form-outline mb-4">
          <label className="form-label" for="form3Example97">
            Category
          </label>
          <input
            type="text"
            id="form3Example97"
            className="form-control form-control-lg"
            defaultValue={categoryName}
            onChange={(e) => {
              setCategoryName(e.target.value);
            }}
          />
        </div>

        <button
          onClick={editCategoryNow}
          type="submit"
          className="btn btn-success "
          style={{ marginLeft: 220 }}
        >
          SAVE
        </button>
      </section>
    </div>
  );
};

export default EditCategory;
