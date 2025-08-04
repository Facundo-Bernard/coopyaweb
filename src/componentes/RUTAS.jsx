import { Routes, Route } from 'react-router-dom';
import QUIENESSOMOSPAGE from './quienessomospage/QUIENESSOMOSPAGE';
import LANFINGPAGEMAIN from './landingpage/LANFINGPAGEMAIN';
import SERVICIOS from './servicios/SERVICIOS';

function RUTAS() {
  return (
    <Routes>
      <Route path="/servicios" element={<SERVICIOS />} />
      <Route path="/quienes-somos" element={<QUIENESSOMOSPAGE />} />
      <Route path="/" element={<LANFINGPAGEMAIN></LANFINGPAGEMAIN>} ></Route>
    </Routes>
  );
}

export default RUTAS;
