import axios from "axios";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import config from "../../config";
import { toast } from "react-toastify";
import OwnerNav from "../../components/OwnerNav";
import "./Own.css";

const Products = () => {
  const [menuList, setMenuList] = useState([]);
  const OwnId = sessionStorage.getItem("ownerId");
  const navigate = useNavigate();

  useEffect(() => {
    console.log("menus loaded");
    getMenus();
  }, []);

  const getMenus = () => {
    axios
      .get(`${config.serverURL}/stock/allStockOfShop/${OwnId}`)
      .then((response) => {
        const result = response.data;
        console.log(response.data);
        if (result.status === "success") {
          setMenuList(result.data);
        } else {
          toast.error("error while loading list of menus");
        }
      });
  };
  const EditStock = (menuId) => {
    navigate("/EditStock", { state: { menuId: menuId } });
  };

  return (
    <div className="container-fluid">
      <OwnerNav />
      <section className="container-fluid OwnStyle">
        <div>
          <table class="table table-responsive table-striped table-hover table-bordered">
            <thead class="thead-dark">
              <tr>
                <th scope="col">Product Name</th>
                <th scope="col">Category</th>
                <th scope="col">Status</th>
                <th scope="col">Price</th>
                <th scope="col">Actions</th>
              </tr>
            </thead>
            <tbody>
              {menuList.map((menu) => {
                const status =
                  menu.status === 1 ? "AVAILABLE" : "NOT-AVAILABLE";

                return (
                  <tr>
                    <td>{menu.productName}</td>
                    <td>{menu.category.name}</td>
                    <td>{status}</td>
                    <td>{menu.price}</td>
                    <td>
                      <button
                        onClick={() => EditStock(menu.id)}
                        type="button"
                        class="btn btn-warning"
                      >
                        EDIT
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Link to="/AddStock">
              <button type="button" className="btn btn-danger">
                ADD MENU
              </button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Products;