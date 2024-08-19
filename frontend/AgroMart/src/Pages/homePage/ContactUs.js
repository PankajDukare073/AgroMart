import React from "react";
import RIYAJ from "../../images/RIYAJ.jpg";
import ROHAN from "../../images/ROHAN.jpg";
import YASHASHRI from "../../images/YASHASHRI.jpg";
import CustHomeNv from "../../components/CustHomeNv";
import RestoNav from "../../components/RestoNav";
import NavbarDeliveryBoy from "../../components/navbarDeliveryBoy";
import "./ContactUs.css";

const ContactUs = () => {
  return (
    <div className="container-fluid">
      {sessionStorage.getItem("role") === "CUSTOMER" && <CustHomeNv />}
      {sessionStorage.getItem("role") === "RESTAURANT" && <RestoNav />}
      {sessionStorage.getItem("role") === "DELIVERYBOY" && (
        <NavbarDeliveryBoy />
      )}
      <div className="container-fluid contactUsBackground">
        <h1
          className="display-4"
          style={{ color: "#5C41A8", textAlign: "center" }}
        >
          CloudCuisine
        </h1>
        <p
          className="mt-4"
          style={{
            textAlign: "justify",
            textIndent: "2em",
            fontFamily: "sans-serif",
            fontStyle: "italic",
          }}
        >
          This website can primarily be used for ordering food items from the
          kitchens at nearby location. This is achieved through an easy to use
          graphical interface menu options. It is managed by the admin.
          Restaurants can list their available food menus. Users can add number
          of items to the cart. Different payment options are available to
          continue the order. Deliveryboy can view the order assigned and its
          corresponding address of delivery.
        </p>
        <hr />
        <h2 className="mt-4" style={{ textAlign: "center" }}>
          Contact Us
        </h2>
        <div className="row mt-3 justify-content-center">
          {[
            {
              name: "RIYAJ BAGWAN",
              email: "rbagwan@gmail.com",
              phone: "7385118311",
              image: RIYAJ,
            },
            {
              name: "ROHAN RAIKWAR",
              email: "rohanraikwar@gmail.com",
              phone: "9889988899",
              image: ROHAN,
            },
            {
              name: "YASHASHRI GOSAVI",
              email: "yashashrigosavi@gmail.com",
              phone: "9404027890",
              image: YASHASHRI,
            },
          ].map((contact) => (
            <div className="col-md-4 text-center mt-3" key={contact.name}>
              <img
                src={contact.image}
                alt={contact.name}
                className="img-fluid rounded-circle"
                style={{
                  boxShadow: "0px 4px 18px 3px rgba(0,0,0,0.38)",
                  width: "200px",
                  height: "250px",
                }}
              />
              <h3 className="mt-2">{contact.name}</h3>
              <p className="text-primary">
                {contact.email}
                <br />
                {contact.phone}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ContactUs;