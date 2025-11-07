import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light p-3">
      <div className="container">
        <Link className="navbar-brand" to="/">
          🛍️ Bazar Universal
        </Link>
        <div className="d-flex">
          <Link className="btn btn-success" to="/sales">
            Ver Compras
          </Link>
        </div>
      </div>
    </nav>
  );
}
