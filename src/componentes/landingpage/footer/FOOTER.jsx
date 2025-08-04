
const Footer = () => {
  return (
    <footer style={{ backgroundColor: '#4e1616', color: '#ddd', padding: '40px 0' }}>
      <div className="container">
        <div className="row text-center text-md-start">
          {/* Redes sociales */}
          <div className="col-12 col-md-3 mb-4 mb-md-0 d-flex flex-column align-items-center justify-content-center">
            <div className="mb-3">
              <img src="/logo192.png" alt="Logo" style={{ width: '30px', marginBottom: '10px' }} />
            </div>
            <div className="d-flex gap-3">
              <i className="bi bi-twitter-x fs-5"></i>
              <i className="bi bi-instagram fs-5"></i>
              <i className="bi bi-youtube fs-5"></i>
              <i className="bi bi-linkedin fs-5"></i>
            </div>
          </div>

          {/* Use cases */}
          <div className="col-12 col-md-3 mb-4 mb-md-0">
            <h6 className="text-white">Use cases</h6>
            <ul className="list-unstyled small">
              <li>UI design</li>
              <li>UX design</li>
              <li>Wireframing</li>
              <li>Diagramming</li>
              <li>Brainstorming</li>
              <li>Online whiteboard</li>
              <li>Team collaboration</li>
            </ul>
          </div>

          {/* Explore */}
          <div className="col-12 col-md-3 mb-4 mb-md-0">
            <h6 className="text-white">Explore</h6>
            <ul className="list-unstyled small">
              <li>Design</li>
              <li>Prototyping</li>
              <li>Development features</li>
              <li>Design systems</li>
              <li>Collaboration features</li>
              <li>Design process</li>
              <li>FigJam</li>
            </ul>
          </div>

          {/* Resources */}
          <div className="col-12 col-md-3 mb-4 mb-md-0">
            <h6 className="text-white">Resources</h6>
            <ul className="list-unstyled small">
              <li>Blog</li>
              <li>Best practices</li>
              <li>Colors</li>
              <li>Color wheel</li>
              <li>Support</li>
              <li>Developers</li>
              <li>Resource library</li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
