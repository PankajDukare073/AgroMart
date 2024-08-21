import axios from "axios";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import config from "./../../config";
import OwnerNav from "../../components/OwnerNav";
import { useNavigate } from "react-router-dom";

const Category = () => {
  const [catList, setCatList] = useState([]);
  const [name, setName] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    getAllCategories();
  }, []);

  const getAllCategories = () => {
    axios.get(config.serverURL + "/category/all").then((response) => {
      const result = response.data;

      console.log(response.data);
      if (result.status === "success") {
        setCatList(result.data);
      } else {
        toast.error("error while loading category list");
      }
    });
  };

  const addNewCategory = () => {
    if (name.length == 0) {
      toast.warning("Enter category name");
    } else {
      axios
        .post(`${config.serverURL}/category/add`, { name })
        .then((Response) => {
          const result = Response.data;

          if (result["status"] === "success") {
            toast.success("New category added");
            window.location.reload();
          } else {
            toast.error("ERROR OCCURED...");
          }
        });
    }
  };

  const editCategory = (catId) => {
    navigate("/editCategory", { state: { catId: catId } });
  };

  return (
    <div className="container-fluid">
 <OwnerNav />
      <section className="container-fluid mystyle1">
        <div style={{ textAlign: "center" }}>
          <h4>CATEGORY LIST</h4>
        </div>
        <div class="categoryStyle">
          <table
            className="table table-responsive table-striped table-hover table-bordered"
            style={{ marginTop: 40 }}
          >
            <thead class="thead-dark">
              <tr>
                <th scope="col">Id</th>
                <th scope="col">Name</th>
                <th scope="col"></th>
              </tr>
            </thead>
            <tbody>
              {catList.map((cat) => {
                return (
                  <tr>
                    <td scope="col">{cat.id}</td>
                    <td scope="col">{cat.name}</td>
                    <td scope="col"><button
                        onClick={() => editCategory(cat.id)}
                        type="button"
                        class="btn btn-warning btn-sm"
                      >Edit</button></td>
                  </tr>
                );
              })}
            </tbody>
          </table>

          <div style={{ textAlign: "center", marginTop: 50 }}>
            <h5>ADD NEW CATEGORY</h5>
          </div>
          <div className="form-outline mb-4">
            <label className="form-label" for="form3Example97">
              Category Name :
            </label>
            <input
              type="text"
              id="form3Example97"
              className="form-control form-control-lg"
              onChange={(e) => {
                setName(e.target.value);
              }}
            />
          </div>

          <button
            onClick={addNewCategory}
            type="submit"
            className="btn btn-success "
            style={{ marginLeft: 300 }}
          >
            ADD
          </button>
        </div>
      </section>
    </div >
  );
};

export default Category;