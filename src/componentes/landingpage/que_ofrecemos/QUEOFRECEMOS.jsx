import React from 'react';
import ServicioItem from './ServicioItem';

const QueOfrecemos = () => {
  const servicios = [
    {
      title: 'Préstamos',
      description: "En la cooperativa vas a tener la oportunidad de sacar un préstamo. La cooperativa otorga préstamos a sus asociados desarrollando la operatoria financiera y de servicios que no este prohibida por la ley de entidades financieras.",
    },
    // Puedes duplicar o cambiar más ítems
    {
      title: 'Vivienda',
      description: "La cooperativa cuenta con la capacidad de adquirir / construir viviendas individuales / colectivas para entregarlas en uso / propiedad a los asociados. Esto junto con la capacidad de mejorar la vivienda de los ",
    },
    {
      title: 'Consumo',
      description: "Body text for whatever you'd like to say. Add main takeaway points, quotes, anecdotes, or even a very very short story.",
    },
    {
      title: 'Servicios Sociales',
      description: "Brindamos asesoría y servicios técnicos en todo lo relacionado con el objeto social, recreación, turismo, Hotelería y gastronomía, sepelio, asistencia medica y farmacia, descuentos en comercios, asesoramiento jurídico entre otros.",
    },
    {
      title: 'Servicios administrativos',
      description: "Contamos con la capacidad de brindar servicios administrativos a socios y no socios, utilizando todas las areas de la cooperativa",
    },

  ];

  return (
    <section className="container py-5" id="servicios">
      <h4 className="fw-bold">¿Qué ofrecemos ?</h4>
      <p className="text-muted">Uniendote a la cooperativa vas a poder acceder a:</p>
      <div className="row">
        {servicios.map((servicio, index) => (
          <ServicioItem
            key={index}
            title={servicio.title}
            description={servicio.description}
          />
        ))}
      </div>
    </section>
  );
};

export default QueOfrecemos;
