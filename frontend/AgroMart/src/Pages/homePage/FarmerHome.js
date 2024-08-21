import FarmerHomeNv from "../../components/FarmerHomeNv";
import axios from "axios";
import { useState, useEffect } from "react";
import config from "../../config";
import { toast } from "react-toastify";
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import ToggleButton from 'react-bootstrap/ToggleButton';
import ToggleButtonGroup from 'react-bootstrap/ToggleButtonGroup';
import { setAuthorisationHeader } from "../../security/SetAuthorisationHeader";

const FarmerHome = () => {
  const [category, setCategory] = useState([]);
  const [type, setType] = useState([]);
  const [menu, setMenu] = useState([]);
  const [quantity, setQuantity] = useState(0);
  const [radioValue, setRadioValue] = useState('0');
  const [selectedCategory, setSelectedCategory] = useState(null);

  const radios = [
    { name: 'ALL', value: '0' },
    { name: 'SEED', value: '1' },
    { name: 'NPK', value: '2' },
  ];

  useEffect(() => {
    allCategories();
    allMenus();
    allTypes();
  }, []);

  useEffect(() => {
    menuByType(radioValue);
  }, [radioValue]);

  const handleCategorySelect = (cat) => {
    if (selectedCategory === cat) {
      setSelectedCategory(null);
    } else {
      setSelectedCategory(cat);
    }
  };

  const allCategories = () => {
    setAuthorisationHeader();
    axios.get(`${config.serverURL}/category/all`).then((response) => {
      const result = response.data;
      if (result.status === "success") {
        setCategory(result.data);
      } else {
        toast.error("ERROR OCCURED...");
      }
    });
  };

  const allTypes = () => {
    setAuthorisationHeader();
    axios.get(`${config.serverURL}/category/allTypes`).then((response) => {
      const result = response.data;
      if (result.status === "success") {
        setType(result.data);
      } else {
        toast.error("ERROR OCCURED...");
      }
    });
  };

  const allMenus = () => {
    setAuthorisationHeader();
    axios.get(`${config.serverURL}/stock/allStocks`).then((response) => {
      const result = response.data;
      if (result.status === "success") {
        setMenu(result.data);
      } else {
        toast.error("ERROR OCCURED...");
      }
    });
  };

  const addToCart = (id) => {
    const userId = sessionStorage.getItem("farmerId");
    if (quantity === 0) {
      toast.warning("Enter Quantity to add into cart");
    } else {
      axios
        .post(
          `${config.serverURL}/cart/add`,
          { stockId: id, userId: userId, quantity: quantity },
          { "Content-Type": "application/json" }, {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem('token')}`
          }
        })
        .then((response) => {
          const result = response.data;
          if (result.status === "success") {
            toast.success("Menu added to cart");
            setQuantity(0);
          } else {
            toast.error("ERROR OCCURED...");
          }
        });
    }
  };

  const menuByCategory = (catId) => {
    setRadioValue('0');
    axios.get(`${config.serverURL}/menu/allMenuByType/${catId}`, {
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem('token')}`
      }
    })
      .then((response) => {
        const result = response.data;
        if (result.status === "success") {
          setMenu(result.data);
        } else {
          toast.error("ERROR OCCURED...");
        }
      });
  };

  const menuByType = (id) => {
    if (id === '0') {
      allMenus();
    } else {
      setSelectedCategory(null);
      axios
        .get(`${config.serverURL}/menu/allMenuByTypeVnV/${id}`, {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem('token')}`
          }
        })
        .then((response) => {
          const result = response.data;
          if (result.status === "success") {
            setMenu(result.data);
          } else {
            toast.error("ERROR OCCURED...");
          }
        });
    }
  };

  return (
    <div className="container-fluid">
      <FarmerHomeNv />
      <div className="row">
        <ButtonGroup className="mt-3 ms-4 col-3">
          {radios.map((radio, idx) => (
            <ToggleButton
              key={idx}
              id={`radio-${idx}`}
              type="radio"
              variant={idx % 2 ? 'outline-success' : idx === 0 ? 'outline-secondary' : 'outline-danger'}
              name="radio"
              value={radio.value}
              checked={radioValue === radio.value}
              onChange={(e) => setRadioValue(e.currentTarget.value)}
            >
              {radio.name}
            </ToggleButton>
          ))}
        </ButtonGroup>
        <div className="col-6"></div>
        <div className="mt-3 col-2">
          <ToggleButtonGroup value={selectedCategory} type="radio" name="options" defaultValue={1} onChange={handleCategorySelect}>
            {category.map((cat) => (
              <ToggleButton variant={selectedCategory === cat ? "secondary" : "outline-secondary"} key={cat.id} id={`tbg-radio-${cat.id}`} value={cat} onClick={() => menuByCategory(cat.id)}>
                {cat.name}
              </ToggleButton>
            ))}
          </ToggleButtonGroup>
        </div>
      </div>
      <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 g-4">
        {menu.map((m) => {
          const shopName = m.shop ? m.shop.name : "Unknown Shop";
          return (
            <div
              key={m.id}
              className="col-3"
              style={{
                position: "relative",
                padding: 20,
                margin: "50px 50px",
                display: "inline-block",
                cursor: "pointer",
                border: "1px solid black",
                borderRadius: "10px",
                boxShadow: "5px 4px 8px black",
                transition: "transform 0.3s ease, box-shadow 0.3s ease",
                backgroundColor: "#fff",
                overflow: "hidden",
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
                <h5 className="card-title">{m.productName} <span><h6>[{shopName}]</h6></span></h5>
                <p>
                  {m.description} <br />
                  Rs. {m.price}
                </p>
              </div>

              <div className="row">
                <div className="col">
                  <input
                    type="number"
                    id="form3Example97"
                    className="form-control form-control-sm"
                    placeholder="Enter Qty"
                    onChange={(e) => {
                      setQuantity(e.target.value);
                    }}
                  />
                </div>
                <div className="col">
                  <button
                    onClick={() => addToCart(m.id)}
                    type="button"
                    className="btn btn-success btn-sm"
                    style={{ marginTop: 5 }}
                  >
                    Add To Cart
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default FarmerHome;
