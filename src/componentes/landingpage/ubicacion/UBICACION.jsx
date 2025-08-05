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
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3282.963964223847!2d-58.37720652425961!3d-34.60825247295125!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x95bccacd2f3e6e4f%3A0x2b3b6b5c1f6e3b6e!2sBartolom%C3%A9%20Mitre%20797%2C%20C1036AAO%20CABA!5e0!3m2!1ses!2sar!4v1693535997166!5m2!1ses!2sar"
            style={{
              border: 0,
              width: '100%',
              maxWidth: '1000px',
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