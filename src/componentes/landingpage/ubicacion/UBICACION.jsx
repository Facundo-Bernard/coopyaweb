import React from 'react';

const Ubicacion = () => {
  return (
    <section className="py-5 bg-light text-center">
      <div className="container">
        <h2 className="mb-4 fw-bold">Dónde encontrarnos</h2>
        <div
          style={{
            width: '100%',
            display: 'flex',
            justifyContent: 'center',
          }}
        >
          <iframe
            title="Ubicación - Cooperativa"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d13135.517826142678!2d-58.3873694!3d-34.5996246!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x95bccb2b7c1f1f95%3A0x3fa92a3c6258b922!2sEl%20Hogar%20Obrero!5e0!3m2!1ses!2sar!4v1693535997166!5m2!1ses!2sar"
            style={{
              border: 0,
              width: '1000px',
              height: '350px',
              borderRadius: '8px',
              boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
            }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
      </div>
    </section>
  );
};

export default Ubicacion;
