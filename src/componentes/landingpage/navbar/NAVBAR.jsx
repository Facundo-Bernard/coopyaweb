import 'bootstrap/dist/css/bootstrap.min.css';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import logo from './../../../assets/ticwhite.png';

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  return (
    <nav
      className="navbar navbar-expand-lg navbar-dark"
      style={{
        backgroundColor: '#ff3b3b',
        padding: '0.5rem 1rem',
      }}
    >
      <div className="container-fluid">
        {/* Logo + texto */}
        <div className="d-flex align-items-center flex-wrap flex-lg-nowrap">
          <Link className="navbar-brand me-2" to="/">
            <img
              src={logo}
              alt="Logo"
              style={{
                height: '60px',
                width: 'auto',
                borderRadius: '4px',
              }}
            />
          </Link>
          <div
            className="text-white d-none d-sm-block"
            style={{ lineHeight: '1.3', maxWidth: '400px' }}
          >
            <p className="fw-semibold mb-1 small">
              Cooperativa de crédito, vivienda y consumo
            </p>
            <p className="fw-semibold mb-0 small">
              Servicios sociales y administrativos YA Ltda
            </p>
          </div>
        </div>

        {/* Botón hamburguesa */}
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

        {/* Links */}
        <div className="collapse navbar-collapse mt-3 mt-lg-0" id="navbarNav">
<ul className="navbar-nav ms-auto d-flex flex-column flex-lg-row gap-2 gap-lg-3">
            <li className="nav-item">
              <button
                className={`btn w-100 w-lg-auto ${
                  isActive('/quienes-somos')
                    ? 'btn-outline-light active'
                    : 'btn-light'
                }`}
                onClick={() => navigate('/quienes-somos')}
              >
                ¿Quiénes somos?
              </button>
            </li>
            <li className="nav-item">
              <Link
                className={`btn w-100 w-lg-auto ${
                  isActive('/servicios')
                    ? 'btn-outline-light active'
                    : 'btn-light'
                }`}
                to="/servicios"
              >
                Servicios
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className={`btn w-100 w-lg-auto ${
                  isActive('/contactanos')
                    ? 'btn-outline-light active'
                    : 'btn-light'
                }`}
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
