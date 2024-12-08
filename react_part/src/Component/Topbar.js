import { Link } from "react-router-dom";

export default function Topbar() {
  return (
    <div className="d-flex container top-bar shadow"  >
    <h1>Store </h1>
     <Link to='/' className="register-nav">Go to website</Link>
    </div>
  );
}

