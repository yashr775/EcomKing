import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import "./App.css";
import Home from "./pages/home";
import Productpage from "./pages/productpage";
import Cartpage from "./pages/cartpage";
import Signin from "./pages/signin";
import Signup from "./pages/signup";
import Shippingaddresspage from "./pages/shippingaddresspage";
import Paymentmethodpage from "./pages/paymentmethodpage";
import Placeorderpage from "./pages/placeorderpage";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/product/:slug" element={<Productpage />} />
          <Route path="/cart" element={<Cartpage />} />
          <Route path="/signin" element={<Signin />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/shippingaddress" element={<Shippingaddresspage />} />
          <Route path="" element={<ProtectedRoute />}>
            <Route path="/placeOrder" element={<Placeorderpage />} />
            <Route path="/paymentpage" element={<Paymentmethodpage />} />
          </Route>
        </Routes>
      </Router>
    </>
  );
}

export default App;
