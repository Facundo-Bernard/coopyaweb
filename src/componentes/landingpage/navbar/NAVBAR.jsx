import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation(); // Detecta la ruta actual

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="navbar navbar-expand-lg navbar-dark" style={{ backgroundColor: '#ff3b3b' }}>
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">
          <img
            src="https://via.placeholder.com/30"
            alt="Logo"
            className="d-inline-block align-text-top"
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
                className={`btn me-2 ${isActive("/") ? "btn-outline-light active" : "btn-light"}`}
                to="/"
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