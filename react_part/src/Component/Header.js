import { Link } from "react-router-dom";
import Home from "../pages/Website/Home";

import axios from "axios";
import Cookies from "universal-cookie";
export default function Header() {
  
  const cookie = new Cookies();
  const token = cookie.get("Bearer");

  async function handleout() {
    try {
      ///انحذف التوكن من الباك
      await axios.post("http://127.0.0.1:8000/api/logout", null, {
        headers: {
          Authorization: "Bearer " + token,
        },
      });
    } catch (err) {
      console.log(err);
    }
    cookie.remove("Bearer"); //انجذف التوكن من الفروهنت
    window.location.pathname = "/";
  }

  return (
    <div className="container shadow">
      <nav className="d-flex p-2">
        <div className="head">
          <Link to="/" className="link1">
            Home
          </Link>
          <Link to="/About" className="link2">
            About
          </Link>
        </div>
        <div className="d-flex">
          {!token ? ( // استخدم ? لاختبار وجود المستخدم
            <>
              <div>
                <Link
                  to="/register"
                  style={{ textAlign: "center", marginRight: "5px" }}
                  className="register-nav"
                >
                  Register
                </Link>
                <Link
                  to="/login"
                  style={{ textAlign: "center" }}
                  className="register-nav"
                >
                  Login
                </Link>
              </div>
            </>
          ) : (
            // استخدم : لتحديد ما يجب عرضه إذا لم يكن هناك مستخدم
            <>
              <Link
                to="/Dashboard"
                style={{ textAlign: "center" }}
                className="register-nav"
              >
                Dashboard
              </Link>
              <div className="register-nav" onClick={handleout}>
                logout
              </div>
            </>
          )}
        </div>
      </nav>
    </div>
  );
}
