import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import "./App.css";
import Home from "./pages/home";
import Productpage from "./pages/productpage";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/product/:slug" element={<Productpage />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
