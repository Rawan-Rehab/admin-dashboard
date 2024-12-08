import { faPen, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import { useContext, useEffect } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { User } from "../../Website/context/context";
export default function Users() {
  const [user, setuser] = useState([]);
  const [runuseeffect, setrun] = useState(0);

  const context = useContext(User);
  const token = context.auth.token;
  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/api/user/show", {
        headers: {
          Accept: "Application/json",
          Authorization: "Bearer " + token, // bearer type of token
        },
      })

      .then((data) => setuser(data.data));
  }, [runuseeffect]);

  async function deleteuser(id) {
    try {
      const res = await axios.delete(
        `http://127.0.0.1:8000/api/user/delete/${id}`,
        {
          headers: {
            Accept: "Application/json",
            Authorization: "Bearer " + token, // bearer type of token
          },
        }
      );
      if (res.status === 200) {
        setrun((prev) => prev + 1);
      }
    } catch {
      console.log("hhhh");
    }
  }
  const showuser = user.map((i, index) => (
    <tr key={index}>
      <td>{index + 1}</td>
      <td>{i.name}</td>
      <td>{i.email}</td>
      <td>
        <Link to={`${i.id}`}>
          <FontAwesomeIcon
            icon={faPen}
            style={{ color: " rgb(157, 187, 204)" }}
            cursor={"pointer"}
          />
        </Link>
        <FontAwesomeIcon
          icon={faTrash}
          onClick={() => deleteuser(i.id)}
          style={{ color: "red", fontSize: "20px", paddingLeft: "7px" }}
          cursor={"pointer"}
        />
      </td>
    </tr>
  ));

  return (
    <div style={{ padding: "20px" }}>
      <table>
        <thead>
          <tr>
            <th>Id</th>
            <th>Username</th>
            <th>Email</th>
            <th>Action</th>
          </tr>
        </thead>

        {<tbody>{showuser}</tbody>}
      </table>
    </div>
  );
}
