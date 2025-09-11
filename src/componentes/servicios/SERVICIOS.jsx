import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";

const SERVICIOS = () => {
  const [activeIndex, setActiveIndex] = useState(null);
  const [openPlanForService, setOpenPlanForService] = useState({}); // { serviceIdx: planIdx }

  const servicios = [
    {
      icon: "💳",
      title: "Préstamos",
      desc: "Como socio y con tu cuota social al día, podés sacar préstamos personales.",
      secciones: [
        {
          titulo: "¿Cómo obtener?",
          items: [
            "Adherite a nuestra cooperativa.",
            "Enviá recibo y últimos movimientos para evaluar afectación (adjuntar fotos).",
            "Nosotros evaluamos y te contactamos.",
          ],
        },
      ],
      contacto: "/contacto/vivienda",
    },
    {
      icon: "🏠",
      title: "Vivienda",
      desc: "Adherite y mejora tu vivienda y calidad de vida con nuestros servicios de adquisición, construcción y gestión.",
      secciones: [
        {
          titulo: "¿Qué podemos hacer?",
          items: [
            "Adquirir viviendas individuales o colectivas y entregarlas a asociados (según reglamento).",
            "Adquirir terrenos destinados a vivienda propia para asociados.",
            "Gestionar y ejecutar obras por administración o con terceros.",
            "Adquirir materiales para uso de asociados.",
          ],
        },
      ],
      contacto: "/contacto/credito",
    },
    {
      icon: "🤝",
      title: "Servicios Sociales",
      desc: "Con tu cuota social accedés a varios planes de asistencia (traslados médicos, telemedicina, asistencia en el hogar, viajes y subsidios por fallecimiento).",
      // Planes resumidos a partir de tus documentos
      planes: [
        {
          id: "plan-50",
          name: "Plan 50",
          price: "$17.129",
          short: "Traslados médicos programados, asistencia al viajero y subsidio por fallecimiento hasta $50.000.",
          bullets: [
            "Premium Transfers nacional: traslados médicos (1 evento/año, hasta $500.000).",
            "Asistencia al viajero (nacional, hasta 60 días por viaje).",
            "Subsidio por fallecimiento: hasta $50.000.",
            "Solicitud y gestión vía ASISTODO (líneas indicadas en la documentación).",
          ],
          file: "Plan50.doc",
        },
        {
          id: "plan-75",
          name: "Plan 75",
          price: "$25.750",
          short: "Similar al Plan 50 con mayor tope de subsidio por fallecimiento ($75.000) y telemedicina incluida.",
          bullets: [
            "Traslados médicos y asistencia al viajero (nacional).",
            "Telemedic: video consultas (hasta 12 eventos/año).",
            "Subsidio por fallecimiento: hasta $75.000.",
          ],
          file: "Plan75.doc",
        },
        {
          id: "plan-100",
          name: "Plan 100",
          price: "$30.985",
          short: "Incluye traslados, telemedicina, asistencia en el hogar y asistencia en vía pública; subsidio por fallecimiento hasta $100.000.",
          bullets: [
            "Premium Transfers nacional: traslados médicos (1 evento/año, hasta $500.000).",
            "Telemedic: video consulta (12 eventos/año).",
            "Asistencia en el hogar (plomería, gasista, cerrajería, vidriería, electricista) - topes y eventos por año.",
            "Asistencia en vía pública y asistencias administrativas.",
            "Subsidio por fallecimiento: hasta $100.000.",
          ],
          file: "Plan100.doc",
        },
        {
          id: "plan-120",
          name: "Plan 120",
          price: "$37.183",
          short: "Amplía coberturas (incluye países limítrofes, mayor cobertura de hotel y subsidio hasta $120.000).",
          bullets: [
            "Cobertura de asistencia al viajero extendida a países limítrofes.",
            "Gastos de hotel y convalecencia con topes específicos por día y total.",
            "Subsidio por fallecimiento: hasta $120.000.",
            "Telemedic y traslados médicos incluidos.",
          ],
          file: "Plan120.doc",
        },
        {
          id: "plan-150",
          name: "Plan 150",
          price: "$40.365",
          short: "Plan tope: incluye telepsicología con descuento, traslados, asistencia en viajes y subsidio hasta $150.000.",
          bullets: [
            "Premium Transfers y asistencia al viajero (nacional y limítrofes según detalle).",
            "Telepsicología: 50% de descuento en sesiones (12 eventos/año).",
            "Subsidio por fallecimiento: hasta $150.000.",
          ],
          file: "Plan150.doc",
        },
      ],
      contacto: "/contacto/servicios-sociales",
    },
  ];

  const toggleCard = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  const togglePlan = (serviceIdx, planIdx) => {
    setOpenPlanForService((prev) => {
      const current = prev[serviceIdx];
      return { ...prev, [serviceIdx]: current === planIdx ? null : planIdx };
    });
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
        <motion.div variants={fadeIn} initial="hidden" whileInView="visible" viewport={{ once: true }}>
          <div className="text-center mb-5">
            <h1 className="fw-bold display-4">Nuestros Servicios</h1>
            <p className="lead text-secondary mx-auto" style={{ maxWidth: "700px" }}>
              Para ser socio solo debés abonar una acción social de $10 y una cuota social de $3500.
              Con eso vas a poder acceder a los servicios y planes detallados abajo.
            </p>
            <p>Para descargar solicitud de ingreso haz clic acá</p>

            {/* Botón de descarga con href absoluto */}
            <a
              href={`${window.location.origin}/SolicitudIngreso.doc`}
              download="SolicitudIngreso.doc"
              className="btn btn-success"
            >
              Descargar Solicitud
            </a>
          </div>

          <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
            {servicios.map((servicio, idx) => (
              <div className="col" key={idx}>
                <motion.div layout className="card h-100 border-0 shadow-sm rounded-4 text-center p-4" style={{ backgroundColor: "#ffffff" }}>
                  <div className="fs-1">{servicio.icon}</div>
                  <h5 className="mt-3 text-danger">{servicio.title}</h5>
                  <p className="text-secondary">{servicio.desc}</p>

                  <div className="d-flex justify-content-center gap-2">
                    <button
                      className="btn btn-outline-danger mt-2"
                      onClick={() => toggleCard(idx)}
                      aria-expanded={activeIndex === idx}
                      aria-controls={`panel-${idx}`}
                    >
                      {activeIndex === idx ? "Cerrar detalles" : "Ver más"}
                    </button>
                  </div>

                  <AnimatePresence>
                    {activeIndex === idx && (
                      <motion.div id={`panel-${idx}`} variants={expandAnim} initial="hidden" animate="visible" exit="exit" className="mt-4 text-start">
                        {/* Si el servicio tiene 'secciones' las mostramos */}
                        {servicio.secciones &&
                          servicio.secciones.map((sec, i) => (
                            <div key={i} className="mb-3">
                              <h6 className="text-danger">{sec.titulo}</h6>
                              <ul className="text-secondary">
                                {sec.items.map((item, j) => (
                                  <li key={j}>{item}</li>
                                ))}
                              </ul>
                            </div>
                          ))}

                        {/* Si el servicio tiene 'planes' los mostramos como accordions */}
                        {servicio.planes && (
                          <div className="mb-2">
                            <h6 className="text-danger">Planes disponibles</h6>
                            <div className="text-secondary">
                              {servicio.planes.map((plan, pIdx) => {
                                const isOpen = openPlanForService[idx] === pIdx;
                                return (
                                  <div key={plan.id} className="mb-2">
                                    <div className="d-flex justify-content-between align-items-center">
                                      <div>
                                        <strong>{plan.name}</strong> <span className="text-muted">- {plan.price}</span>
                                        <div className="small">{plan.short}</div>
                                      </div>
                                      <div>
                                        <button
                                          className="btn btn-sm btn-outline-primary"
                                          onClick={() => togglePlan(idx, pIdx)}
                                          aria-expanded={isOpen}
                                        >
                                          {isOpen ? "Ocultar" : "Más"}
                                        </button>
                                      </div>
                                    </div>

                                    <AnimatePresence>
                                      {isOpen && (
                                        <motion.div
                                          initial={{ opacity: 0, height: 0 }}
                                          animate={{ opacity: 1, height: "auto" }}
                                          exit={{ opacity: 0, height: 0 }}
                                          transition={{ duration: 0.35 }}
                                          className="mt-2 ps-3"
                                        >
                                          <ul className="text-secondary">
                                            {plan.bullets.map((b, bi) => (
                                              <li key={bi}>{b}</li>
                                            ))}
                                          </ul>
                                        </motion.div>
                                      )}
                                    </AnimatePresence>
                                  </div>
                                );
                              })}
                            </div>
                          </div>
                        )}

                        {/* Botón de contactar (devuelto abajo en el panel) */}

              <Link
                className="btn btn-danger mt-3"
                to="/contactanos"
              >
                Contáctanos
              </Link>
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
