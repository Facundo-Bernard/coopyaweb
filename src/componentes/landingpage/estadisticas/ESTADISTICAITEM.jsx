import { BsClock } from "react-icons/bs";
import CountUp from "react-countup";

const EstadisticaItem = ({ cantidad, descripcion }) => (
  <div className="col-12 col-md-4 mb-4">
    <div className="border rounded-4 p-4 text-center shadow-sm h-100 bg-white hover:shadow-lg transition-shadow">
      <BsClock size={32} className="mb-2 text-secondary" />
      <h4 className="fw-bold display-6">
        <CountUp end={cantidad} duration={1.2} separator="." enableScrollSpy scrollSpyOnce/>
      </h4>
      <p className="text-muted mb-0">{descripcion}</p>
    </div>
  </div>
);

export default EstadisticaItem;
