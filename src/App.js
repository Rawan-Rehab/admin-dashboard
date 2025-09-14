
import { Routes } from "react-router-dom";
import { Route } from "react-router-dom";
import React from "react";
import "./App.css";
import "./style.css";
import RequireAuth from "./pages/Website/Auth/RequireAuth.js";
import "./pages/Dashboard/dashboard.css";
import SignUp from "./pages/Website/Auth/SignUp.js";
import Login from "./pages/Website/Auth/Login.js";
import Home from "./pages/Website/Home.js";
import Dashboard from "./pages/Dashboard/Dashboard.js";
import Updateuser from "./pages/Dashboard/Users/Updateuser.js";
import Users from "./pages/Dashboard/Users/Users.js";
import CreateUser from "./pages/Dashboard/Users/CreateUser.js";

import Userprovider from "./pages/Website/context/context.js";
import Products from "./pages/Dashboard/products/Products.js";
import CreateProduct from "./pages/Dashboard/products/Newproduct.js";
import UpdateProduct from "./pages/Dashboard/products/updateproduct.js";

function App() {
  return (
    <div className="App">
      <Userprovider>
        <Routes>
          {/* public Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/Home" element={<Home />} />
          <Route path="/register" element={<SignUp />} />
          <Route path="/login" element={<Login />} />
          {/* protected Routes */}
          {/* <Route element={<PersistLogin/>}> */}
          <Route element={<RequireAuth />}>
            <Route path="/Dashboard" element={<Dashboard />}>
              <Route path="users" element={<Users />} />
              <Route path="user/create" element={<CreateUser/>} />
              <Route path="users/:id" element={<Updateuser />} />
              <Route path="products" element={<Products />} />
              <Route path="product/create" element={<CreateProduct />} />
              <Route path="products/:id" element={<UpdateProduct />} />
            </Route>
            </Route>
          {/* </Route> */}
        </Routes>
      </Userprovider>
    </div>
  );
}

export default App;
