import { BsClock } from 'react-icons/bs'; // Ícono de reloj

const EstadisticaItem = ({ cantidad, descripcion }) => (
  <div className="col-12 col-md-4 mb-4">
    <div className="border rounded p-4 text-center shadow-sm h-100">
      <BsClock size={32} className="mb-2" />
      <h4 className="fw-bold">{cantidad}</h4>
      <p className="text-muted mb-0">{descripcion}</p>
    </div>
  </div>
);

export default EstadisticaItem;
