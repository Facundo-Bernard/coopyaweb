import { useState } from "react";
import logo from './../../../assets/logo.png'
import { Link } from "react-router-dom";
import { color } from "framer-motion";
const Footer = () => {
  const [openSection, setOpenSection] = useState(null);

  const toggleSection = (section) => {
    setOpenSection(openSection === section ? null : section);
  };

  return (
    <footer style={{ backgroundColor: '#4e1616', color: '#ddd' }}>
      <div className="container">
        <div className="row row-cols-1 row-cols-md-4 g-4 text-center text-md-start">
          {/* Logo y redes */}
          <div className="col d-flex flex-column align-items-center align-items-md-start">
            <img src={logo} alt="Logo" style={{ width: '50%', marginBottom: '15px' }} />
            <div className="d-flex gap-3 justify-content-center justify-content-md-start">
              <i className="bi bi-twitter-x fs-5"></i>
              <i className="bi bi-instagram fs-5"></i>
              <i className="bi bi-youtube fs-5"></i>
              <i className="bi bi-linkedin fs-5"></i>
            </div>
          </div>

          {/* Use cases dropdown */}
          <div className="col">
           
              <Link onClick={() => toggleSection("use")} className="btn btn-sm btn-outline-light w-100 mb-2" to="/bajas">
              Boton de arrepentimiento
              </Link>
              <ul className="list-unstyled small">
                                En virtud a lo dispuesto en el Art 34 de la ley 24.240, el aceptante de la asistencia crediticia tiene el derecho de arrepentirse de la misma, y revocar su aceptación dentro del plazo de los diez (10) días corridos, contados a partir de la fecha en que se desembolse la asistencia crediticia o que se celebre el contrato, lo último que ocurra, sin responsabilidad alguna para su persona.
              </ul>
          
          </div>

          {/* Explore dropdown */}
          <div className="col">
            <button
              className="btn btn-sm btn-outline-light w-100 mb-2"
              onClick={() => toggleSection("explore")}
            >
              Links de interes
            </button>
            {openSection === "explore" && (
              <ul className="list-unstyled small">
                <li>politica de privacidad</li>
                <li>info us financiero</li>
                <li>Medios de pago</li>
                <li>Contrato de Adhesion servicios - Ley 24.240 de Defensa del consumidor</li>
                <li>defensa del Consumidor Ciudad Autonoma de Buenos Aires</li>
                <li>Legislacion Derecho del Consumidor</li>
                <li><a href="https://www.argentina.gob.ar/aaip" style={{color:'white'}}>accede a toda la información necesaria para ejercer tus derechos, ley 25.326</a></li>
              </ul>
            )}
          </div>


        </div> 

        {/* Contacto directo */}
        <div className="row mt-5 text-center text-md-start">
          <div className="col-12">
            <h5 className="text-white mb-3">Contacto</h5>
            <div className="d-flex flex-column flex-md-row justify-content-between align-items-center gap-3">
              <div>
                <i className="bi bi-envelope me-2"></i>
                coopya@coopya.com.ar
              </div>
              <div>
                <i className="bi bi-telephone me-2"></i>
                +54 11 4328-8680
              </div>
              <div>
                <i className="bi bi-geo-alt me-2"></i>
                Bartolome mitre 797 piso 3, Buenos Aires - codigo postal 1036
              </div>
              <div>
                <i className="bi bi-lock me-2"></i>
                Matrícula INAES 18.213 CUIT: 30-69075438-6 
              </div>
            </div>
            <br></br>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;