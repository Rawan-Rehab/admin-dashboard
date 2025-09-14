import axios from "axios";
import { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
// import Cookies from 'universal-cookie';
import { User } from "../../Website/context/context";
export default function Updateproduct() {
  const [title, settitle] = useState("");
  const [description, setdescription] = useState("");
  const [image, setimage] = useState("");
  const [accept, setAccept] = useState(false);
  //emailerror  422 email taken before
  const id = window.location.pathname.split("/").slice(-1)[0];
  const nav = useNavigate();
  const context = useContext(User);
  const token = context.auth.token;

  useEffect(() => {
    const fetchProducts = async () => {
      try {
         await axios.get(
          `http://127.0.0.1:8000/api/product/showbyid/${id}`,
          {
            headers: {
              Accept: "Application/json",
              Authorization: "Bearer " + token,
            },
          }
        )
       .then((data)=>{
      console.log(data)
        settitle(data.data[0].title)
        setdescription(data.data[0].description)
      
       })
      } catch (error) {
        console.error("Error fetching products:", error);
    }
    }
    fetchProducts()
},[])
  async function submit(e) {
    e.preventDefault();
    setAccept(true); // تنشيط قبول المدخلات

    try {
      //way to send image FormData
        const formdata=new FormData()
        formdata.append('title',title);
        formdata.append('description',description);
        formdata.append('image',image)
        console.log(formdata)
      let res = await axios.post(
        `http://127.0.0.1:8000/api/product/update/${id}`,
        
            formdata,
        
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      );

      if (res.status === 200) {
        nav("/dashboard/products"); // توجيه المستخدم إلى الصفحة المحددة
      }
    } catch (err) {}
  }

  return (
    <>
      <h1>Update product</h1>
      <div className="register">
        <form onSubmit={submit}>
          <label htmlFor="name">Title:</label>
          <input
            id="name"
            type="text"
            placeholder="title..."
            value={title}
            onChange={(e) => settitle(e.target.value)}
          />
          {title && title.length < 1 && accept && (
            <p className="error">Title must be more than 2 characters.</p>
          )}

          <label htmlFor="email">Description</label>
          <input
            id="email"
            type="text"
            placeholder="Description..."
            required
            value={description}
            onChange={(e) => setdescription(e.target.value)}
          />
        

          <label htmlFor="password">Image:</label>
          <input
            id="password"
            type="file"
            placeholder="image..."
            onChange={(e) => setimage(e.target.files.item(0))}
          />
          <div style={{ textAlign: "center" }}>
            <button type="submit">Update</button>
          </div>
        </form>
      </div>
    </>
  );
}


