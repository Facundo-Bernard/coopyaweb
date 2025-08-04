import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Footer from "../landingpage/footer/FOOTER";
import Navbar from "../landingpage/navbar/NAVBAR";

const SERVICIOS = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const servicios = [
    {
      icon: "🏠",
      title: "Vivienda",
      desc: "Soluciones habitacionales accesibles y solidarias para nuestros miembros.",
      beneficios: [
        "Planes de ahorro para vivienda",
        "Acceso a créditos hipotecarios cooperativos",
        "Asesoramiento legal y técnico",
      ],
      testimonios: [
        "“Gracias a la cooperativa, hoy tengo mi casa propia.” – Marta G.",
        "“El acompañamiento fue clave en todo el proceso.” – Luis R.",
      ],
      contacto: "/contacto/vivienda",
    },
    {
      icon: "🏠",
      title: "Vivienda",
      desc: "Soluciones habitacionales accesibles y solidarias para nuestros miembros.",
      beneficios: [
        "Planes de ahorro para vivienda",
        "Acceso a créditos hipotecarios cooperativos",
        "Asesoramiento legal y técnico",
      ],
      testimonios: [
        "“Gracias a la cooperativa, hoy tengo mi casa propia.” – Marta G.",
        "“El acompañamiento fue clave en todo el proceso.” – Luis R.",
      ],
      contacto: "/contacto/vivienda",
    },
    {
      icon: "💳",
      title: "Crédito",
      desc: "Financiamiento responsable para proyectos personales y comunitarios.",
      beneficios: [
        "Tasas preferenciales para socios",
        "Créditos para emprendimientos",
        "Educación financiera personalizada",
      ],
      testimonios: [
        "“Pude lanzar mi emprendimiento con su ayuda.” – Carla M.",
        "“Transparencia y confianza en cada paso.” – Diego F.",
      ],
      contacto: "/contacto/credito",
    },
    // ...otros servicios
  ];

  const toggleCard = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  const fadeIn = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  const expandAnim = {
    hidden: { opacity: 0, height: 0 },
    visible: { opacity: 1, height: "auto", transition: { duration: 0.5 } },
    exit: { opacity: 0, height: 0, transition: { duration: 0.3 } },
  };

  return (
    <>

      <div className="container-fluid py-5 px-4" style={{ backgroundColor: "#ffffffff" }}>
        <motion.div
          variants={fadeIn}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <div className="text-center mb-5">
            <h1 className="fw-bold  display-4">Nuestros Servicios</h1>
            <p className="lead text-secondary mx-auto" style={{ maxWidth: "700px" }}>
              Cada servicio nace del compromiso con el bienestar colectivo. Soluciones que empoderan, conectan y transforman vidas.
            </p>
          </div>

          <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
            {servicios.map((servicio, idx) => (
              <div className="col" key={idx}>
                <motion.div
                  layout
                  className="card h-100 border-0 shadow-sm rounded-4 text-center p-4"
                  style={{ backgroundColor: "#ffffff" }}
                >
                  <div className="fs-1">{servicio.icon}</div>
                  <h5 className="mt-3 text-danger">{servicio.title}</h5>
                  <p className="text-secondary">{servicio.desc}</p>
                  <button
                    className="btn btn-outline-danger mt-2"
                    onClick={() => toggleCard(idx)}
                    aria-expanded={activeIndex === idx}
                    aria-controls={`panel-${idx}`}
                  >
                    {activeIndex === idx ? "Cerrar detalles" : "Ver más"}
                  </button>

                  <AnimatePresence>
                    {activeIndex === idx && (
                      <motion.div
                        id={`panel-${idx}`}
                        variants={expandAnim}
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                        className="mt-4 text-start"
                      >
                        <h6 className="text-danger">Beneficios</h6>
                        <ul className="text-secondary">
                          {servicio.beneficios.map((b, i) => (
                            <li key={i}>{b}</li>
                          ))}
                        </ul>

                        <h6 className="text-danger mt-3">Testimonios</h6>
                        <ul className="fst-italic text-secondary">
                          {servicio.testimonios.map((t, i) => (
                            <li key={i}>{t}</li>
                          ))}
                        </ul>

                        <a
                          href={servicio.contacto}
                          className="btn btn-danger mt-3"
                        >
                          Contactar
                        </a>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

    </>
  );
};

export default SERVICIOS;