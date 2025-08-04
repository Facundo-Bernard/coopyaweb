import React from 'react';
import { BsInfoCircle } from 'react-icons/bs'; // Icono Bootstrap (info)

const ServicioItem = ({ title, description }) => (
  <div className="col-12 col-sm-6 col-md-4 col-lg-2 mb-4 d-flex">
    <div className="d-flex">
      <BsInfoCircle size={24} className="me-2 mt-1" />
      <div>
        <h6 className="fw-bold mb-1">{title}</h6>
        <p className="text-muted mb-0" style={{ fontSize: '0.875rem' }}>{description}</p>
      </div>
    </div>
  </div>
);

export default ServicioItem;
