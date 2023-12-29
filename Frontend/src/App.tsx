import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import "./App.css";
import Home from "./pages/home";
import Productpage from "./pages/productpage";
import Cartpage from "./pages/cartpage";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/product/:slug" element={<Productpage />} />
          <Route path="/cart" element={<Cartpage />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
