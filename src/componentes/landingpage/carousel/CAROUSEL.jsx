import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './HeroCarousel.css'; // Estilos personalizados opcionales
import { Link } from 'react-router-dom';

const HeroCarousel = () => {
  const images = [
    'https://via.placeholder.com/1600x500?text=Imagen+1',
    'https://via.placeholder.com/1600x500?text=Imagen+2',
    'https://via.placeholder.com/1600x500?text=Imagen+3',
    'https://via.placeholder.com/1600x500?text=Imagen+4'
  ];

  return (
    <div id="heroCarousel" className="carousel slide carousel-fade" data-bs-ride="carousel">
      <div className="carousel-inner">
        {images.map((src, idx) => (
          <div
            className={`carousel-item ${idx === 0 ? 'active' : ''}`}
            key={idx}
          >
            <div
              className="hero-slide d-flex align-items-center justify-content-center text-center"
              style={{ backgroundImage: `url(${src})` }}
            >
              <div className="overlay"></div>
              <div className="content">
                <h1 className="fw-bold text-dark">Cooperativa Ya</h1>
                <p className="text-dark">
                  cooperativa de credito, vivienda y consumo Ya LTDA
                </p>
                <Link to="/servicios" className="btn btn-outline-danger mt-2">
                  Ver nuestros servicios
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Controles */}
      <button className="carousel-control-prev" type="button" data-bs-target="#heroCarousel" data-bs-slide="prev">
        <span className="carousel-control-prev-icon" aria-hidden="true" />
      </button>
      <button className="carousel-control-next" type="button" data-bs-target="#heroCarousel" data-bs-slide="next">
        <span className="carousel-control-next-icon" aria-hidden="true" />
      </button>
    </div>
  );
};

export default HeroCarousel;
