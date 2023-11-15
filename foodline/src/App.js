import "./App.css";
import Home from "./screens/Home";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./screens/Login";
import Signup from "./screens/Signup";
import { CartProvider } from "./components/ContextReducer";

import "../node_modules/bootstrap-dark-5/dist/css/bootstrap-dark.min.css";
import "../node_modules/bootstrap/dist/js/bootstrap.bundle";
import "../node_modules/bootstrap/dist/js/bootstrap.bundle.min.js";
import MyOrders from "./screens/MyOrders";
import AdminLogin from "./screens/admin/AdminLogin";
import AdminSingup from "./screens/admin/AdminSingup";
import AdminHome from "./screens/admin/AdminHome";
import AddFood from "./screens/admin/AddFood";

function App() {
  return (
    <CartProvider>
      <Router>
        <div>
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route exact path="/admin" element={<AdminHome />} />
            <Route exact path="/login" element={<Login />} />
            <Route exact path="/signup" element={<Signup />} />
            <Route exact path="/myorders" element={<MyOrders />} />
            <Route exact path="/adminlogin" element={<AdminLogin/>} />
            <Route exact path="/adminsignup" element={<AdminSingup/>} />
            <Route exact path="/addfood" element={<AddFood/>} />
          </Routes>
        </div>
      </Router>
    </CartProvider>
  );
}

export default App;
