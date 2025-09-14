import React from "react";
import ReactDOM from "react-dom/client";
import "./Component/Forms/index.css";
import App from "./App";
import { BrowserRouter as Router } from "react-router-dom";
import Userprovider from "./pages/Website/context/context";
import 'bootstrap/dist/css/bootstrap.min.css';
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
   
  <Router>
    <Userprovider>
    <App />
    </Userprovider>
  </Router>
  
);

