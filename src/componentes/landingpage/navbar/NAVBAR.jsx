import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import logo from './../../../assets/ticwhite.png'
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
        <div style={{
  display: "flex",
  alignItems: "center",
  gap: "24px", // Espacio entre logo y texto
  flexWrap: "wrap" // Permite que se acomode en pantallas más chicas
}}>
  <Link className="navbar-brand" to="/">
    <img
      src={logo}
      alt="Logo"
      className="d-inline-block align-text-top"
      style={{
        objectFit: "cover",
        objectPosition: "center",
        height: "80px",
        overflow: "hidden",
        borderRadius: "4px"
      }}
    />
  </Link>
  <div style={{
    color: "white",
    maxWidth: "500px", // Más ancho para que no se vea apretado
    lineHeight: "1.4"
  }}>
    <p className="fw-semibold mb-1">
      Cooperativa de crédito, vivienda y consumo
    </p>
    <p className="fw-semibold mb-0">
      Servicios sociales y administrativos YA Ltda
    </p>
  </div>
</div>

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
            <br></br>
            <li className="nav-item">
              <Link
                className={`btn me-2 ${isActive("/servicios") ? "btn-outline-light active" : "btn-light"}`}
                to="/servicios"
              >
                Servicios
              </Link>
            </li>
            <br></br>
            <li className="nav-item">
              <Link
                className={`btn me-2 ${isActive("/contactanos") ? "btn-outline-light active" : "btn-light"}`}
                to="/contactanos"
              >
                Contáctanos
              </Link>
            </li>
            <br></br>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;