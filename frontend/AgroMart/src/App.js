import SignIn from "./Pages/User/SignIn/signin";
import Home from "./Pages/homePage/Home";
import Signup from "./Pages/User/SignUp/signup";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import GetOwnerMenu from "./Pages/Owner/shopList/getOwnerMenu";
import AcceptedOrder from "./Pages/DeliveryBoy/acceptedOrder";
import UpdateProfile from "./Pages/User/UpdateProfile/UpdateProfile";
import ForgotPassword from "./Pages/User/forgot_password/forgotPassword";
import OwnerHome from "./Pages/Owner/OwnerHome";
import OwnerHome from "./Pages/Owner/OwnerHome";
import DeliveryBoyHome from "./Pages/DeliveryBoy/deliveryBoyHome";
import registerDeliveryBoy from "./Pages/Owner/registerDeliveryBoy";
import DeliveryBoyList from "./Pages/Owner/DeliveryBoylist/deliveryBoyList";
import farmerList from "./Pages/Owner/farmerList/farmerList";
import shopList from "./Pages/Owner/shopList/shopList";
import GetOwnerDetails from "./Pages/Owner/shopList/getOwnerDetails";
import AddAddress from "./Pages/farmer/AddAddress";
import Cart from "./Pages/farmer/Cart";
import SelectAddress from "./Pages/farmer/SelectAddress";
import Payment from "./Pages/farmer/Payment";
import Products from "./Pages/Owner/Products";
import FarmerHome from "./Pages/homePage/FarmerHome";
import AddStock from "./Pages/Owner/AddStock";
import EditStock from "./Pages/Owner/EditStock";

import MyOrders from "./Pages/farmer/MyOrders";
import Category from "./Pages/Owner/Category";
import AllOrders from "./Pages/Owner/allOrders";
import AllAcceptedOrders from "./Pages/Owner/allAcceptedOrders";

import { useEffect } from "react";
import { setAuthorisationHeader } from "./security/SetAuthorisationHeader";
import EditCategory from "./Pages/Owner/EditCategory";

function App() {

  useEffect(() => {
    const isLoggedIn = sessionStorage.getItem('isLoggedIn');

    if (!isLoggedIn && window.location.pathname !== '/signin' && window.location.pathname !== '/signup' && window.location.pathname !== '/' && window.location.pathname !== '/contactUs') {
      window.location.href = '/signin';
    }

    if(isLoggedIn){
      setAuthorisationHeader();
    }
  }, []);


  if (sessionStorage.getItem("role") != null && sessionStorage.getItem("farmerName") != null) {
    document.title = sessionStorage.getItem("role") + " - " + sessionStorage.getItem("farmerName")
  }
  else {
    document.title = "Welcome";
  }

  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/signin" element={<SignIn />}></Route>
          <Route path="/signup" element={<Signup />}></Route>
          <Route path="/forgotPassword" element={<ForgotPassword />}></Route>
          <Route path="/updateProfile" element={<UpdateProfile />}></Route>
          <Route path="/OwnerHome" element={<OwnerHome />}></Route>
          <Route path="/OwnerHome" element={<OwnerHome />}></Route>
          <Route path="/deliveryBoyHome" element={<DeliveryBoyHome />}></Route>
          <Route path="/acceptedOrder" element={<AcceptedOrder />}></Route>
          <Route
            path="/registerDeliveryBoy"
            element={<registerDeliveryBoy />}
          ></Route>
          <Route path="/deliveryBoyList" element={<DeliveryBoyList />}></Route>
          <Route path="/farmerList" element={<farmerList />}></Route>
          <Route path="/shopList" element={<shopList />}></Route>
          <Route
            path="/getOwnerDetails"
            element={<GetOwnerDetails />}
          ></Route>
          <Route
            path="/getOwnerMenu"
            element={<GetOwnerMenu />}
          ></Route>
          <Route exact path="/FarmerHomePage" element={<FarmerHome />} />
          <Route exact path="/AddAddress" element={<AddAddress />} />
          <Route exact path="/Cart" element={<Cart />} />
          <Route exact path="/SelectAddress" element={<SelectAddress />} />
          <Route exact path="/Payment" element={<Payment />} />
          <Route exact path="/Products" element={<Products />} />
          <Route exact path="/AddStock" element={<AddStock />} />
          <Route exact path="/EditStock" element={<EditStock />} />
          <Route exact path="/MyOrders" element={<MyOrders />} />
          <Route exact path="/Category" element={<Category />} />
          <Route exact path="/editCategory" element={<EditCategory/>} />
          <Route exact path="/allOrders" element={<AllOrders />} />
          <Route
            exact
            path="/allAcceptedOrders"
            element={<AllAcceptedOrders />}
          />
         
        </Routes>

        {/* this container is used to show toast messages */}
        <ToastContainer position="top-center" autoClose={1500} />
      </BrowserRouter>
    </div>
  );
}
export default App;