
import "./index.css";
import axios from "axios";
import { useContext, useState, useEffect } from "react";
import "./index.css";
import { User } from "../../pages/Website/context/context";
import { useNavigate } from "react-router-dom";
import Cookies from 'universal-cookie';

export default function Form(props) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordR, setPasswordR] = useState("");
  const [accept, setAccept] = useState(false);
  //emailerror  422 email taken before 
  const [emailError, setEmailError] = useState(false);
  const ner = useContext(User);
  const nav = useNavigate();
 const cookie =new Cookies();
  const buttonStyle = {
    width: "100%",
  };
const styleregister = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  marginTop: "40px",
};
const form = {
  boxShadow: "0px 2px 15px rgba(0, 0, 0, 0.1)",
  width: "400px",
};

  useEffect(() => {
    setName(props.name || "");
    setEmail(props.email || "");
  }, [props.name, props.email]);

  async function submit(e) {
    e.preventDefault();
    setAccept(true); // تنشيط قبول المدخلات

    try {
      let res = await axios.post(
        `http://127.0.0.1:8000/api/${props.endpoint}`,
        {
          name,
          email,
          password,
          password_confirmation: passwordR,
        }
      );

      if (res.status === 200) {
        
        const token = res.data.data.token;
        cookie.set("Bearer",token)
        const userDetails = res.data.data.user;
        
        ner.setauth({ token, userDetails });
        nav(props.navigate); // توجيه المستخدم إلى الصفحة المحددة
      }
    } catch (err) {
      if (err.response && err.response.status === 422) {
        setEmailError(true);
      }
    }
  }
  return (
    <div className="register" style={props.styleregister && styleregister}>
      <form onSubmit={submit} style={props.styleregister && form}>
        <label htmlFor="name">Name:</label>
        <input
          id="name"
          type="text"
          placeholder="name..."
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        {name && name.length < 2 && accept && (
          <p className="error">Name must be more than 2 characters.</p>
        )}

        <label htmlFor="email">Email:</label>
        <input
          id="email"
          type="email"
          placeholder="email..."
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        {accept && emailError && (
          <p className="error">Email has already been taken.</p>
        )}

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

        <label htmlFor="repeat">Repeat password:</label>
        <input
          id="repeat"
          type="password"
          placeholder="Repeat password"
          value={passwordR}
          onChange={(e) => setPasswordR(e.target.value)}
        />
        {passwordR !== password && accept && (
          <p className="error">Passwords do not match.</p>
        )}

        <div style={{ textAlign: "center" }}>
          <button type="submit" style={props.buttonstyle && buttonStyle}>
            {props.button}
          </button>
        </div>
      </form>
    </div>
  );
}












