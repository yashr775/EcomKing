import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import "./App.css";
import Home from "./pages/home";
import Productpage from "./pages/productpage";
import Cartpage from "./pages/cartpage";
import Signin from "./pages/signin";
import Signup from "./pages/signup";

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
        </Routes>
      </Router>
    </>
  );
}

export default App;
