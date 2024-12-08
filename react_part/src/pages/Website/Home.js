import { faPen, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { User } from "./context/context"; // تأكد من أن هذا هو السياق الصحيح

export default function Home() {
  const [product, setProduct] = useState([]);
  const [runuseeffect, setRun] = useState(0);

  const context = useContext(User); // تأكد من استخدام السياق الصحيح
  const token = context?.auth?.token; // استخدام optional chaining

  useEffect(() => {
    if (!token) {
      console.error("No token available");
      return; // إذا لم يكن هناك توكن، لا تستمر في تنفيذ fetch
    }

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
  }, [token, runuseeffect]); // إضافة token كمراقب

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

  const showProduct = product.map((i, index) => (
    <div className="col-md-4 mb-4" key={index}>
      <div className="card" style={{ backgroundColor: "rgb(166, 199, 215)" }}>
        {i.image && (
          <img
            src={i.image}
            alt={i.title}
            className="card-img-top"
            style={{ height: "200px" }}
          />
        )}
        <div className="card-body">
          <h5 className="card-title">{i.title}</h5>
          <p className="card-text">{i.description}</p>
        </div>
      </div>
    </div>
  ));

  return (
    <div className="container my-4">
      <div className="row">{showProduct}</div>
    </div>
  );
}
