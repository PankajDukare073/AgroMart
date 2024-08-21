import { Link } from "react-router-dom";
const Header = () => {
  return (
    <div
      className="container-fluid"
      style={{ textAlign: "center", backgroundColor: "#4caf50" }}
    >
      <Link
        to="/"
        className="navbar-brand"
        style={{ textDecoration: "none" }}
      >
        <b style={{ color: "#ff9f43", fontSize: "40px" }}>AgroMart</b>
      </Link>
    </div>
  );
};

export default Header;