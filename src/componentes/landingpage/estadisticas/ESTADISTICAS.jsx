import React from 'react';
import EstadisticaItem from './ESTADISTICAITEM';

const Estadisticas = () => {
  const data = [
    { cantidad: '30000', descripcion: 'Socios actuales' },
    { cantidad: '29', descripcion: 'años en el mercado' },
  ];

  return (
    <section className="container py-5">
      <div className="row justify-content-center">
        {data.map((item, index) => (
          <EstadisticaItem
            key={index}
            cantidad={item.cantidad}
            descripcion={item.descripcion}
          />
        ))}
      </div>
    </section>
  );
};

export default Estadisticas;
