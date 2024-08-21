import { removeAuthorisationHeader } from "../security/RemoveAuthorisationHeader";
import "./navbar.css";

const FarmerHomeNv = () => {
  var x = sessionStorage.getItem("farmerName");

  const logoutMethod = () => {
    sessionStorage.clear();
    removeAuthorisationHeader();
  };
  return (
    <nav className="navbar navbar-expand-lg py-2 navbar-dark  shadow-sm" style={{ textAlign: "center", backgroundColor: "#4caf50" }}>
      <div className="container-fluid">
        <a className="navbar-brand" href="/FarmerHomePage">
          <b className="logoname" style={{ color: "#ff9f43", fontSize: "30px" }}>AgroMart</b>
        </a>
        <div id="navbarSupportedContent" className="collapse navbar-collapse">
          <ul className="navbar-nav ml-auto">
            <li className="nav-item">
              <a href="/FarmerHomePage" className="nav-link text-white fw-bold">
              <i className="fas fa-store"></i>
                &nbsp; products
              </a>
            </li>
            <li className="nav-item">
              <a href="/Cart" className="nav-link text-white fw-bold">
                <i className="fas fa-shopping-cart"></i>
                &nbsp; Cart
              </a>
            </li>
            <li className="nav-item">
              <a href="/MyOrders" className="nav-link text-white fw-bold">
                <i className="fas fa-concierge-bell"></i>
                &nbsp; MyOrders
              </a>
            </li>
            <div className="btn-group mybtn-right">
              <button
                type="button"
                className="btn btn-dark dropdown-toggle mt-2"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                <i className="fas fa-user"></i>
                &nbsp; {x ? x : "Welcome"}
              </button>
              <ul className="dropdown-menu dropdown-menu-end">
                <li>
                  <a className="dropdown-item" href="/updateProfile">
                    Update Profile
                  </a>
                </li>
                <li>
                  <a className="dropdown-item" href="/signin" onClick={logoutMethod}>
                    LogOut
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

export default FarmerHomeNv;
