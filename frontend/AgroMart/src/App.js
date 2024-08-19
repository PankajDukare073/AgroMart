import SignIn from "./Pages/User/SignIn/signin";
import Home from "./Pages/homePage/Home";
import Signup from "./Pages/User/SignUp/signup";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import GetRestaurantMenu from "./Pages/Admin/restaurantList/getRestaurantMenu";
import AcceptedOrder from "./Pages/DeliveryBoy/acceptedOrder";
import UpdateProfile from "./Pages/User/UpdateProfile/UpdateProfile";
import ForgotPassword from "./Pages/User/forgot_password/forgotPassword";
import AdminHome from "./Pages/Admin/adminHome";
import RestaurantHome from "./Pages/Restaurant/restaurantHome";
import DeliveryBoyHome from "./Pages/DeliveryBoy/deliveryBoyHome";
import RegisterRestaurant from "./Pages/Restaurant/registerRestaurant";
import DeliveryBoyList from "./Pages/Admin/DeliveryBoylist/deliveryBoyList";
import CustomerList from "./Pages/Admin/CustomerList/customerList";
import RestaurantList from "./Pages/Admin/restaurantList/restaurantList";
import GetRestaurantDetails from "./Pages/Admin/restaurantList/getRestaurantDetails";
import AddAddress from "./Pages/Customer/AddAddress";
import Cart from "./Pages/Customer/Cart";
import SelectAddress from "./Pages/Customer/SelectAddress";
import Payment from "./Pages/Customer/Payment";
import Products from "./Pages/Restaurant/Products";
import CustomerHome from "./Pages/homePage/CustomerHome";
import AddMenu from "./Pages/Restaurant/AddMenu";
import EditMenu from "./Pages/Restaurant/EditMenu";
import ShowFeedbacks from "./Pages/Restaurant/ShowFeedbacks";
import AddFeedback from "./Pages/Customer/AddFeedback";
import MyOrders from "./Pages/Customer/MyOrders";
import Category from "./Pages/Admin/Category";
import AllOrders from "./Pages/Restaurant/allOrders";
import AllAcceptedOrders from "./Pages/Restaurant/allAcceptedOrders";
import ContactUs from "./Pages/homePage/ContactUs";
import { useEffect } from "react";
import { setAuthorisationHeader } from "./security/SetAuthorisationHeader";
import EditCategory from "./Pages/Admin/EditCategory";

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


  if (sessionStorage.getItem("role") != null && sessionStorage.getItem("customerName") != null) {
    document.title = sessionStorage.getItem("role") + " - " + sessionStorage.getItem("customerName")
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
          <Route path="/adminHome" element={<AdminHome />}></Route>
          <Route path="/restaurantHome" element={<RestaurantHome />}></Route>
          <Route path="/deliveryBoyHome" element={<DeliveryBoyHome />}></Route>
          <Route path="/acceptedOrder" element={<AcceptedOrder />}></Route>
          <Route
            path="/registerRestaurant"
            element={<RegisterRestaurant />}
          ></Route>
          <Route path="/deliveryBoyList" element={<DeliveryBoyList />}></Route>
          <Route path="/customerList" element={<CustomerList />}></Route>
          <Route path="/restaurantList" element={<RestaurantList />}></Route>
          <Route
            path="/getRestaurantDetails"
            element={<GetRestaurantDetails />}
          ></Route>
          <Route
            path="/getRestaurantMenu"
            element={<GetRestaurantMenu />}
          ></Route>
          <Route exact path="/CustomerHomePage" element={<CustomerHome />} />
          <Route exact path="/AddAddress" element={<AddAddress />} />
          <Route exact path="/Cart" element={<Cart />} />
          <Route exact path="/SelectAddress" element={<SelectAddress />} />
          <Route exact path="/Payment" element={<Payment />} />
          <Route exact path="/Products" element={<Products />} />
          <Route exact path="/AddMenu" element={<AddMenu />} />
          <Route exact path="/EditMenu" element={<EditMenu />} />
          <Route exact path="/ShowFeedbacks" element={<ShowFeedbacks />} />
          <Route exact path="/AddFeedback" element={<AddFeedback />} />
          <Route exact path="/MyOrders" element={<MyOrders />} />
          <Route exact path="/Category" element={<Category />} />
          <Route exact path="/editCategory" element={<EditCategory/>} />
          <Route exact path="/allOrders" element={<AllOrders />} />
          <Route
            exact
            path="/allAcceptedOrders"
            element={<AllAcceptedOrders />}
          />
          <Route exact path="/contactUs" element={<ContactUs />} />
        </Routes>

        {/* this container is used to show toast messages */}
        <ToastContainer position="top-center" autoClose={1500} />
      </BrowserRouter>
    </div>
  );
}
export default App;