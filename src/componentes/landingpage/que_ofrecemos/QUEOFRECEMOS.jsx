import React from 'react';
import ServicioItem from './ServicioItem';

const QueOfrecemos = () => {
  const servicios = [
    {
      title: 'Title',
      description: "Body text for whatever you'd like to say. Add main takeaway points, quotes, anecdotes, or even a very very short story.",
    },
    // Puedes duplicar o cambiar más ítems
    {
      title: 'Title',
      description: "Body text for whatever you'd like to say. Add main takeaway points, quotes, anecdotes, or even a very very short story.",
    },
    {
      title: 'Title',
      description: "Body text for whatever you'd like to say. Add main takeaway points, quotes, anecdotes, or even a very very short story.",
    },
    {
      title: 'Title',
      description: "Body text for whatever you'd like to say. Add main takeaway points, quotes, anecdotes, or even a very very short story.",
    },
    {
      title: 'Title',
      description: "Body text for whatever you'd like to say. Add main takeaway points, quotes, anecdotes, or even a very very short story.",
    },
    {
      title: 'Title',
      description: "Body text for whatever you'd like to say. Add main takeaway points, quotes, anecdotes, or even a very very short story.",
    },
  ];

  return (
    <section className="container py-5" id="servicios">
      <h4 className="fw-bold">¿Qué ofrecemos ?</h4>
      <p className="text-muted">nuestros servicios:</p>
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
