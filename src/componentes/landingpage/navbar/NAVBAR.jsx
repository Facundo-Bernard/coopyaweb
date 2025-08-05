import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import logo from './../../../assets/logo.png'
const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation(); // Detecta la ruta actual

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="navbar navbar-expand-lg navbar-dark" style={{
    backgroundColor: '#ff3b3b',
    paddingTop: '0',
    paddingBottom: '0'
  }}
>
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">
  <img
    src={logo}
    alt="Logo"
    className="d-inline-block align-text-top"
    style={{
      objectFit: "cover",       // Ensures the image fills the container
      objectPosition: "center", // Vertically centers the cropped area
      height: "80px",           // Adjust height as needed
      width: "150px",            // Keeps aspect ratio
      overflow: "hidden",       // Ensures cropped content is hidden
      borderRadius: "4px"       // Optional: adds subtle rounding
    }}
  />
</Link>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto align-items-center">
            <li className="nav-item">
              <button
                className={`btn me-2 ${isActive("/quienes-somos") ? "btn-outline-light active" : "btn-light"}`}
                onClick={() => navigate("/quienes-somos")}
              >
                ¿Quiénes somos?
              </button>
            </li>
            <li className="nav-item">
              <Link
                className={`btn me-2 ${isActive("/servicios") ? "btn-outline-light active" : "btn-light"}`}
                to="/servicios"
              >
                Servicios
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className={`btn me-2 ${isActive("/contactanos") ? "btn-outline-light active" : "btn-light"}`}
                to="/contactanos"
              >
                Contáctanos
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;