import React from 'react';
import './QuienesSomos.css';

const QuienesSomos = () => {
  return (
    <section className="container py-5" id="quienes-somos">
      <div className="row align-items-center">
        {/* Imagen a la izquierda */}
        <div className="col-md-6 mb-4 mb-md-0">
          <div className="image-placeholder w-100 h-100" />
        </div>

        {/* Texto a la derecha */}
        <div className="col-md-6">
          <h2 className="fw-bold">Heading</h2>
          <h5 className="text-muted">Subheading</h5>
          <p className="mt-3 text-secondary">
            Excepteur efficient emerging, minim veniam anim aute carefully curated Ginza conversation exquisite perfect nostrud nisi intricate Content. Qui international first-class nulla ut. Punctual adipiscing, essential lovely queen tempor eiusmod irure.
            Exclusive izakaya charming Scandinavian impeccable aute quality of life soft power pariatur Melbourne occaecat discerning. Qui wardrobe aliquip, et Porter destination Toto remarkable officia Helsinki exceptuer Basset hound. Zürich sleepy perfect consectetur.
          </p>
        </div>
      </div>
    </section>
  );
};

export default QuienesSomos;
