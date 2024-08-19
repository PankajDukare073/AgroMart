import "./navbar.css";
import { removeAuthorisationHeader } from "../security/RemoveAuthorisationHeader";

const RestoNav = () => {

  const logoutMethod = () => {
    sessionStorage.clear();
    removeAuthorisationHeader();
  };

  return (
    <nav class="navbar navbar-expand-lg py-2 navbar-dark  shadow-sm" style={{ textAlign: "center", backgroundColor: "#4caf50" }}>
      <div class="container-fluid">
        <a className="navbar-brand" href="/restaurantHome">
          <b className="logoname" style={{ color: "#ff9f43", fontSize: "30px" }}>AgroMart</b>
        </a>
        <button
          type="button"
          data-toggle="collapse"
          data-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
          class="navbar-toggler"
        >
          <span class="navbar-toggler-icon"></span>
        </button>

        <div id="navbarSupportedContent" class="collapse navbar-collapse">

          <ul class="navbar-nav ml-auto">
          <li class="nav-item">
              <a href="/Category" class="nav-link">
                Categories
              </a>
            </li>
            <li class="nav-item">
              <a href="/Products" class="nav-link">
                Products
              </a>
            </li>
            <li className="nav-item" >
                  <a href="/registerRestaurant" class="nav-link"> Add Deliverboy</a>
            </li>
            <li class="nav-item">
              <a href="/customerList" class="nav-link">
                Farmer List
              </a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="/allAcceptedOrders">
                Accepted Orders
              </a>
            </li>
            <li class="nav-item">
              <a href="/deliveryBoyList" class="nav-link">
                DeliveryBoy-List
              </a>
            </li>
           
            
            <div className="btn-group" class="mybtn-right">
              <button
                type="button"
                class="btn btn-dark dropdown-toggle mt-2"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                <i class="fas fa-user"></i>
                &nbsp; {sessionStorage.getItem("ownerName")}
              </button>
              <ul class="dropdown-menu dropdown-menu-end">
                <li>
                  <a class="dropdown-item" href="/updateProfile">
                    Update Profile
                  </a>
                </li>
                <li>
                  <a class="dropdown-item" href="/signin" onClick={logoutMethod}>
                    Log Out
                  </a>
                </li>
              </ul>
            </div>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default RestoNav;
