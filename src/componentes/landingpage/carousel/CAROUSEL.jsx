import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from 'react-router-dom';
import carousel2 from '../../../assets/LAVIDAEUNCAROUSEL2.png';
import carousel1 from '../../../assets/LAVIDAEUNCAROUSEL.jpg';



const HeroCarousel = () => {
  const images = [
    carousel1,
    carousel2,

  ];

  return (
    <div id="heroCarousel" className="carousel slide carousel-fade" data-bs-ride="carousel">
      <div className="carousel-inner">
        {images.map((src, idx) => (
          <div className={`carousel-item ${idx === 0 ? 'active' : ''}`} key={idx}>
            <div
              className="hero-slide position-relative d-flex align-items-center justify-content-center"
              style={{
                height: '500px',
                overflow: 'hidden',
                backgroundColor: '#f8f9fa'
              }}
            >
              {/* Capa difuminada */}
              <div
                className="blur-layer"
                style={{
                  backgroundImage: `url(${src})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  position: 'absolute',
                  inset: 0,
                  filter: 'blur(10px) brightness(1.1)',
                  opacity: 0.5,
                  transform: 'scale(1.02)',
                  zIndex: 0,
                  animation: 'gentleFade 2s ease-out forwards'
                }}
              />

              {/* Recuadro blanco con contenido */}
              <div
  className="text-center p-4 p-md-5 rounded-4 shadow-lg mx-auto my-3 my-md-5"
  style={{
    maxWidth: "600px",
    background: "rgba(255, 255, 255, 0.8)",
    backdropFilter: "blur(10px)",
    border: "1px solid rgba(255, 0, 0, 0.3)",
    transform: "translateY(-20px)"
  }}
>
  <h1
    className="fw-bold mb-3 text-danger"
    style={{ fontSize: "2rem", fontSize: "clamp(1.5rem, 5vw, 2.5rem)", textShadow: "1px 1px 3px rgba(0,0,0,0.2)" }}
  >
    Cooperativa Ya
  </h1>
  <p className="mb-4 text-dark fs-6 fs-md-5 lh-lg">
    Cooperativa de crédito, vivienda, consumo, servicios sociales y administrativos YA limitada.
  </p>
  <Link
    to="/servicios"
    className="btn btn-danger rounded-pill px-4 py-2 fw-semibold"
  >
    Ver nuestros servicios
  </Link>
</div>

            </div>
          </div>
        ))}
      </div>

      {/* Controles */}
      <button
        className="carousel-control-prev"
        type="button"
        data-bs-target="#heroCarousel"
        data-bs-slide="prev"
      >
        <span className="carousel-control-prev-icon" aria-hidden="true" />
      </button>
      <button
        className="carousel-control-next"
        type="button"
        data-bs-target="#heroCarousel"
        data-bs-slide="next"
      >
        <span className="carousel-control-next-icon" aria-hidden="true" />
      </button>

      {/* Estilos internos */}
      <style>{`
        @keyframes gentleFade {
          from {
            opacity: 0.3;
            transform: scale(1.03);
          }
          to {
            opacity: 0.5;
            transform: scale(1.02);
          }
        }

        .content-box {
          background: rgba(255, 255, 255, 0.85);
          max-width: 600px;
          animation: fadeInText 1.5s ease-out forwards;
        }

        @keyframes fadeInText {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
};

export default HeroCarousel;