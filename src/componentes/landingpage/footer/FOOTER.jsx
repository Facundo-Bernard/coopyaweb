import { useState } from "react";
import logo from './../../../assets/logo.png'
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
            <button
              className="btn btn-sm btn-outline-light w-100 mb-2"
              onClick={() => toggleSection("use")}
            >
              Use cases
            </button>
            {openSection === "use" && (
              <ul className="list-unstyled small">
                <li>UI design</li>
                <li>UX design</li>
                <li>Wireframing</li>
                <li>Diagramming</li>
                <li>Brainstorming</li>
                <li>Online whiteboard</li>
                <li>Team collaboration</li>
              </ul>
            )}
          </div>

          {/* Explore dropdown */}
          <div className="col">
            <button
              className="btn btn-sm btn-outline-light w-100 mb-2"
              onClick={() => toggleSection("explore")}
            >
              Explore
            </button>
            {openSection === "explore" && (
              <ul className="list-unstyled small">
                <li>Design</li>
                <li>Prototyping</li>
                <li>Development features</li>
                <li>Design systems</li>
                <li>Collaboration features</li>
                <li>Design process</li>
                <li>FigJam</li>
              </ul>
            )}
          </div>

          {/* Resources dropdown */}
          <div className="col">
            <button
              className="btn btn-sm btn-outline-light w-100 mb-2"
              onClick={() => toggleSection("resources")}
            >
              Resources
            </button>
            {openSection === "resources" && (
              <ul className="list-unstyled small">
                <li>Blog</li>
                <li>Best practices</li>
                <li>Colors</li>
                <li>Color wheel</li>
                <li>Support</li>
                <li>Developers</li>
                <li>Resource library</li>
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
                Bartolome mitre 797, Buenos Aires
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;