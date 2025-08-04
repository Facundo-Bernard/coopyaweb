import { motion } from "framer-motion";

const fadeIn = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

function QUIENESSOMOSPAGE() {
  return (
    <>

      <div className="container mt-4 mb-5 py-5 px-3 rounded-4" style={{ backgroundColor: "#fff5f5" }}>
        <motion.div
          variants={fadeIn}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {/* Introducción */}
          <div className="text-center mb-5">
            <h1 className="fw-bold ">¿QUIÉNES SOMOS?</h1>
            <p className="lead text-secondary">
              Somos una comunidad que cree en la fuerza de la colaboración, en el valor de cada persona y en el poder de construir juntos un futuro más justo. Nuestra cooperativa nace del compromiso, la solidaridad y el deseo de transformar necesidades en oportunidades compartidas.
            </p>
          </div>

          {/* Principios y valores */}
          <div className="row g-4 mb-5">
            <div className="col-md-6">
              <div className="card h-100 border-0 shadow-sm rounded-4">
                <div className="card-body">
                  <h5 className="card-title text-danger"> Principios Cooperativos</h5>
                  <ul className="list-unstyled">
                    <li>🔓 Membresía abierta y voluntaria</li>
                    <li>🗳️ Control democrático</li>
                    <li>💰 Participación económica</li>
                    <li>🛡️ Autonomía e independencia</li>
                    <li>📚 Educación y formación</li>
                    <li>🤝 Cooperación entre cooperativas</li>
                    <li>🌍 Compromiso con la comunidad</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="col-md-6">
              <div className="card h-100 border-0 shadow-sm rounded-4">
                <div className="card-body">
                  <h5 className="card-title text-danger"> Valores Cooperativos</h5>
                  <ul className="list-unstyled">
                    <li>🤝 Ayuda mutua</li>
                    <li>🧭 Responsabilidad</li>
                    <li>❤️ Solidaridad</li>
                    <li>🗳️ Democracia</li>
                    <li>⚖️ Igualdad</li>
                    <li>📏 Equidad</li>
                    <li>🌟 Ética: Honestidad, Transparencia, Responsabilidad Social</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* Qué es una cooperativa */}
          <div className="card mb-5 border-0 shadow-sm rounded-4">
            <div className="card-body">
              <h5 className="card-title text-danger"> ¿Qué es una cooperativa?</h5>
              <p>
                Es una asociación autónoma de personas que se unen voluntariamente para satisfacer necesidades económicas, sociales y culturales comunes mediante una empresa de propiedad conjunta y control democrático.
              </p>
            </div>
          </div>

          {/* Bandera del cooperativismo */}
          <div className="card mb-5 border-0 shadow-sm rounded-4">
            <div className="card-body">
              <h5 className="card-title text-danger"> Bandera del Cooperativismo</h5>
              <p>
                Desde 1921, la ACI usa los colores del arco iris como símbolo de unidad, diversidad y esperanza en un mundo mejor.
              </p>
              <div className="row row-cols-2 row-cols-md-3 g-2 mt-3">
                {[
                  { color: "🔴", label: "Rojo", desc: "Coraje" },
                  { color: "🟠", label: "Naranja", desc: "Visión de posibilidades" },
                  { color: "🟡", label: "Amarillo", desc: "Desafío" },
                  { color: "🟢", label: "Verde", desc: "Conocimiento y comprensión" },
                  { color: "🔵", label: "Índigo", desc: "Ayuda a los menos afortunados" },
                  { color: "🟣", label: "Violeta", desc: "Calidad, belleza y amistad" },
                ].map((item, idx) => (
                  <div className="col" key={idx}>
                    <div className="border rounded-3 p-2 text-center bg-light">
                      <strong>{item.color} {item.label}</strong>
                      <div>{item.desc}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>


        </motion.div>
      </div>

    </>
  );
}

export default QUIENESSOMOSPAGE;