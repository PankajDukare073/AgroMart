import axios from "axios";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import config from "../../config";
import { toast } from "react-toastify";
import RestoNav from "../../components/RestoNav";
import "./Resto.css";

const Products = () => {
  const [menuList, setMenuList] = useState([]);
  const restoId = sessionStorage.getItem("ownerId");
  const navigate = useNavigate();

  useEffect(() => {
    console.log("menus loaded");
    getMenus();
  }, []);

  const getMenus = () => {
    axios
      .get(`${config.serverURL}/stock/allStockOfShop/${restoId}`)
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
  const editMenu = (menuId) => {
    navigate("/EditMenu", { state: { menuId: menuId } });
  };

  return (
    <div className="container-fluid">
      <RestoNav />
      <section className="container-fluid RestoStyle">
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
                        onClick={() => editMenu(menu.id)}
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
            <Link to="/AddMenu">
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