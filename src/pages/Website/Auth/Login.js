import axios from "axios";
import React, { useContext, useState } from "react";
import Header from "../../../Component/Header";
import { User } from "../context/context";
import { useNavigate } from "react-router-dom";
import Cookies from "universal-cookie";

function Login(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [accept, setAccept] = useState(false);
  const [errorr, seterror] = useState("");
  const userlogin = useContext(User);
  const nav = useNavigate();

  const cookie = new Cookies();

  async function submit(e) {
    e.preventDefault();
    setAccept(true);

    try {
      let res = await axios.post("http://127.0.0.1:8000/api/login", {
        email: email,
        password: password,
      });
      if (res.status === 200) {
        const token = res.data.data.token;
        cookie.set("Bearer", token);
        const userDetails = res.data.data.user;
        userlogin.setauth({ token, userDetails });
        nav("/dashboard"); // توجيه المستخدم إلى الصفحة المحددة
      }
      //error 401 Unauthorized  البيانات المقدمة (مثل اسم المستخدم وكلمة المرور) غير صحيحة
    } catch (err) {
      if (err.response.status === 401) {
        seterror(true);
      }
    }
  }

  return (
    <div>
      {" "}
      <Header />
      <div className="parent">
        <div
          className="register "
          style={{
            width: "400px",
            justifyContent: "center",
            marginTop: "200PX",
            marginLeft: "550px",
          }}
        >
          <form onSubmit={submit}>
            <label htmlFor="email">Email:</label>
            <input
              id="email"
              type="email"
              placeholder="email..."
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <label htmlFor="password">Password:</label>
            <input
              id="password"
              type="password"
              placeholder="password..."
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            {password.length < 8 && accept && (
              <p className="error">Password must be more than 8 characters.</p>
            )}

            <div style={{ textAlign: "center" }}>
              <button type="submit">Log in</button>
            </div>
            {accept && errorr && (
              <p className="error"> wrong email or password</p>
            )}
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
