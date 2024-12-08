import {
  faUser,
  faUserPlus,
  faUsers,
  faProductHunt,
  faPlus,
  faCartShopping,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { NavLink } from "react-router-dom";

//  NAVLINK TO ACTIVE
export default function Sidebar() {
  return (
    <div className="side-bar">
      <NavLink
        activeClassName="active"
        to="/dashboard/users"
        className="item-link"
        style={{ paddingRight: "40px" }}
      >
        <FontAwesomeIcon icon={faUsers} style={{ paddingRight: "2px" }} /> Users
      </NavLink>

      <NavLink
        activeClassName="actve"
        to="/dashboard/user/create"
        className="item-link"
      >
        <FontAwesomeIcon icon={faUserPlus} /> New User
      </NavLink>

      <NavLink
        activeClassName="actve"
        to="/Dashboard/products"
        className="item-link"
      >
        <FontAwesomeIcon icon={faCartShopping} /> products
      </NavLink>
      <NavLink
        activeClassName="actve"
        to="/Dashboard/product/create"
        className="item-link"
      >
        <FontAwesomeIcon icon={faPlus} />
        New product
      </NavLink>
    </div>
  );
}
