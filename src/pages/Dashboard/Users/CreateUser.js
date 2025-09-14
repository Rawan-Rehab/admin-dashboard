import axios from "axios";
import { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
// import Cookies from 'universal-cookie';
import { User } from "../../Website/context/context";
export default function CreateUser() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordR, setPasswordR] = useState("");
  const [accept, setAccept] = useState(false);
  //emailerror  422 email taken before
  const [emailError, setEmailError] = useState(false);

  const nav = useNavigate();
  const context = useContext(User);
  const token = context.auth.token;

  useEffect(() => {
    setName(name || "");
    setEmail(email || "");
  }, [name, email]);

  async function submit(e) {
    e.preventDefault();
    setAccept(true); // تنشيط قبول المدخلات

    try {
      let res = await axios.post(
        `http://127.0.0.1:8000/api/user/create`,

        {
          name,
          email,
          password,
          password_confirmation: passwordR,
        },
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      );

      if (res.status === 200) {
        nav("/dashboard/users"); // توجيه المستخدم إلى الصفحة المحددة
      }
    } catch (err) {
      if (err.response && err.response.status === 422) {
        setEmailError(true);
      }
    }
  }
  return (
    <>
      <h1>New User</h1>
      <div className="register">
        <form onSubmit={submit}>
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
            <button type="submit">Create</button>
          </div>
        </form>
      </div>
    </>
  );
}


