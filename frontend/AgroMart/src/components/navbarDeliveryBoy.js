import { Link } from 'react-router-dom';
import { removeAuthorisationHeader } from "../security/RemoveAuthorisationHeader";

const NavbarDeliveryBoy = () => {

  const logoutMethod = () => {
    sessionStorage.clear();
    removeAuthorisationHeader();
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-success shadow-sm">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/deliveryBoyHome">
          <b className="logoname">AgroMart</b>
        </Link>
        <button
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
          className="navbar-toggler"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div id="navbarSupportedContent" className="collapse navbar-collapse">
          <ul className="navbar-nav ml-auto">
            <li className="nav-item active">
              <Link to="/deliveryBoyHome" className="nav-link">
                Accept Order
              </Link>
            </li>
            <li className="nav-item active">
              <Link to="/acceptedOrder" className="nav-link">
                My Orders
              </Link>
            </li>

            <div className="btn-group mybtn-right">
              <button
                type="button"
                className="btn btn-dark dropdown-toggle"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                <i className="fas fa-user"></i>
                &nbsp; {sessionStorage.getItem("deliveryboyName")}
              </button>
              <ul className="dropdown-menu dropdown-menu-end">
                <li>
                  <Link className="dropdown-item" to="/updateProfile">
                    Update Profile
                  </Link>
                </li>
                <li>
                  <Link className="dropdown-item" to="/signin" onClick={logoutMethod}>
                    LogOut
                  </Link>
                </li>
              </ul>
            </div>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default NavbarDeliveryBoy;
