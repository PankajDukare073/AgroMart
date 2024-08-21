import axios from "axios";
import config from "../../../config";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import NavbarOwner from "../../../components/navbarOwner";
import { toast } from "react-toastify";
const GetOwnerMenu = () => {
  const location = useLocation();

  const [shopMenu, setOwnerMenu] = useState([]);
  useEffect(() => {
    const { restaurentId } = location.state;

    getMenu(restaurentId);
  }, []);

  const getMenu = (id) => {
    axios
      .get(config.serverURL + "/menu/allMenuOfOwn/" + id)
      .then((response) => {
        const result = response.data;

        if (result.status == "success") {
          console.log("shop menu loaded")
          setOwnerMenu(result.data);
        } else {
          toast.error("error while loading list of shop details List");
        }
      });
  };
  return (
    <div className="container-fluid">
      <NavbarOwner/>
      <header style={{ textAlign: "center", fontSize: 30 }}>
        <b>Owner Menu</b>
      </header>
      <div className="row">
        {shopMenu.map((m) => {
          return (
            <div
              key={m.id}
              className="col-3"
              style={{
                position: "relative",
                padding: 20,
                display: "inline-block",
                cursor: "pointer",
              }}
            >
              <img
                alt="menu"
                style={{
                  height: 200,
                  width: "100%",
                  display: "block",
                  borderRadius: 10,
                }}

                src={config.serverURL + "/images/" + m.image}
              />
              <div style={{ marginTop: 20 }}>
                <h5 className="card-title">{m.productName}</h5>
                <p>
                  {m.description} <br />
                  Rs. {m.price}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default GetOwnerMenu;
