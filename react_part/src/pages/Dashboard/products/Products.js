import { faPen, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { User } from "../../Website/context/context"; // تأكد من أن هذا هو السياق الصحيح

export default function Products() {
  const [product, setProduct] = useState([]);
  const [runuseeffect, setRun] = useState(0);

  const context = useContext(User); // تأكد من استخدام السياق الصحيح
  const token = context.auth.token;

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(
          "http://127.0.0.1:8000/api/product/show",
          {
            headers: {
              Accept: "Application/json",
              Authorization: "Bearer " + token,
            },
          }
        );
        setProduct(response.data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, [runuseeffect, token]);

  const deleteUser = async (id) => {
    try {
      const res = await axios.delete(
        `http://127.0.0.1:8000/api/product/delete/${id}`,
        {
          headers: {
            Accept: "Application/json",
            Authorization: "Bearer " + token,
          },
        }
      );
      if (res.status === 200) {
        setRun((prev) => prev + 1);
      }
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  const showproduct = product.map((i, index) => (
    <tr key={index}>
      <td>{index + 1}</td>
      <td>{i.title}</td>
      <td>{i.description}</td>
      <td>
        {/* إذا كان هناك صورة للمنتج */}
        {i.image && (
          <img src={i.image} alt={i.title} style={{ width: "50px" }} />
        )}
      </td>
      <td>
        <Link to={`${i.id}`}>
          <FontAwesomeIcon
            icon={faPen}
            style={{ color: "rgb(157, 187, 204)", cursor: "pointer" }}
          />
        </Link>
        <FontAwesomeIcon
          icon={faTrash}
          onClick={() => deleteUser(i.id)}
          style={{
            color: "red",
            fontSize: "20px",
            paddingLeft: "7px",
            cursor: "pointer",
          }}
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
            <th>Title</th>
            <th>Description</th>
            <th>Image</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>{showproduct}</tbody>
      </table>
    </div>
  );
}


