import { useState, useEffect, useMemo, useRef } from "react";
import emailjs from "@emailjs/browser";
import { motion } from "framer-motion";
import "bootstrap/dist/css/bootstrap.min.css";

const fadeIn = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.45, ease: "easeOut" } },
};

const STORAGE_DRAFT_KEY = "contactoFormDraft_v1";

const initialForm = {
  documento: "",
  nombre: "",
  telefono: "",
  email: "",
  sucursal: "",
  mensaje: "",
  sitio: "",
};

const validators = {
  documento: (v) => /^\d{6,12}$/.test(v.trim()),
  nombre: (v) => v.trim().length >= 3,
  telefono: (v) => /^[+\d][\d\s().\-]{6,}$/.test(v.trim()),
  email: (v) => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.trim()),
  sucursal: (v) => v.trim().length >= 2,
  mensaje: (v) => v.trim().length >= 10 && v.trim().length <= 1200,
  sitio: (v) => v.trim().length === 0,
};

const PREFIX = "SOLICITUD DE BAJA";

export default function BAJAS() {
  const [formData, setFormData] = useState(initialForm);
  const [touched, setTouched] = useState({});
  const [status, setStatus] = useState(null); // "success" | "error" | null
  const [sending, setSending] = useState(false);
  const [charCount, setCharCount] = useState(0);
  const statusRef = useRef(null);

  useEffect(() => {
    const draftRaw = localStorage.getItem(STORAGE_DRAFT_KEY);
    if (draftRaw) {
      try {
        const draft = JSON.parse(draftRaw);
        setFormData({ ...initialForm, ...draft, sitio: "" });
        setCharCount((draft.mensaje || "").length);
      } catch {}
    }
  }, []);

  useEffect(() => {
    const { sitio, ...draft } = formData;
    localStorage.setItem(STORAGE_DRAFT_KEY, JSON.stringify(draft));
  }, [formData]);

  const errors = useMemo(() => {
    const e = {};
    for (const k of Object.keys(validators)) {
      if (!validators[k](formData[k] || "")) e[k] = true;
    }
    return e;
  }, [formData]);

  const isValid = useMemo(() => {
    return Object.keys(validators).every((k) => validators[k](formData[k] || ""));
  }, [formData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (name === "mensaje") setCharCount(value.length);
  };

  const handleBlur = (e) => {
    const { name } = e.target;
    setTouched((prev) => ({ ...prev, [name]: true }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus(null);

    if (!isValid) {
      const allTouched = Object.keys(initialForm).reduce((acc, k) => ((acc[k] = true), acc), {});
      setTouched(allTouched);
      return;
    }
    // Honeypot
    if (formData.sitio && formData.sitio.trim().length > 0) {
      setStatus("error");
      scrollToStatus();
      return;
    }

    try {
      setSending(true);

      const templateParams = {
        documento: String(formData.documento || ""),
        nombre: String(formData.nombre || ""),
        telefono: String(formData.telefono || ""),
        email: String(formData.email || ""),
        sucursal: String(formData.sucursal || ""),
        mensaje: `${PREFIX}\n\n${String(formData.mensaje || "")}`,
        submittedAt: new Date().toISOString(),
        userAgent: navigator.userAgent || "",
      };

      for (const k of Object.keys(templateParams)) {
        const v = templateParams[k];
        if (Array.isArray(v)) templateParams[k] = v.join(", ");
        else if (typeof v === "object" && v !== null) templateParams[k] = JSON.stringify(v);
      }

      console.log("Enviando EmailJS templateParams:", templateParams);

      await emailjs.send(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        templateParams,
        import.meta.env.VITE_EMAILJS_PUBLIC_KEY
      );

      setStatus("success");
      setFormData(initialForm);
      setCharCount(0);
      localStorage.removeItem(STORAGE_DRAFT_KEY);
    } catch (err) {
      console.error("EmailJS error:", err);
      setStatus("error");
    } finally {
      setSending(false);
      scrollToStatus();
    }
  };

  const scrollToStatus = () => {
    requestAnimationFrame(() => {
      if (statusRef.current) {
        statusRef.current.scrollIntoView({ behavior: "smooth", block: "center" });
      }
    });
  };

  return (
    <div style={{ backgroundColor: "#f8f9fa", minHeight: "100vh", paddingTop: 48 }}>
      <style>{styles}</style>

      <div className="container mb-2">
        <motion.div
          variants={fadeIn}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="mb-4 text-center"
        >
          <h1 className="fw-bold mb-1">Baja de producto o servicio</h1>
          <p className="text-muted mb-0">Estamos para ayudarte</p>
        </motion.div>

        {/* Single centered column */}
        <div className="row justify-content-center">
          <motion.div
            variants={fadeIn}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="col-12 col-md-10 col-lg-8"
          >
            <div className="card shadow-soft rounded-4 border-0 mx-auto">
              <div className="card-body p-4 p-md-5">
                <div ref={statusRef} aria-live="polite" aria-atomic="true" className="mb-2 text-center">
                  {status === "success" && (
                    <div className="alert alert-success rounded-3 mb-3">Mensaje enviado con éxito. ¡Gracias por escribirnos!</div>
                  )}
                  {status === "error" && (
                    <div className="alert alert-danger rounded-3 mb-3">Ocurrió un error al enviar. Intentá nuevamente.</div>
                  )}
                </div>

                <h2 className="h4 mb-3 fw-bold text-danger text-center">Enviar mensaje</h2>

                <form onSubmit={handleSubmit} noValidate>
                  <div className="row g-3">
                    <div className="col-md-6">
                      <label className="form-label">Nro Documento *</label>
                      <input
                        type="text"
                        name="documento"
                        inputMode="numeric"
                        autoComplete="off"
                        aria-required="true"
                        className={`form-control rounded-3 ${touched.documento && errors.documento ? "is-invalid" : ""}`}
                        value={formData.documento}
                        onChange={handleChange}
                        onBlur={handleBlur}
                      />
                      {touched.documento && errors.documento && <div className="invalid-feedback">Ingresá entre 6 y 12 dígitos.</div>}
                    </div>

                    <div className="col-md-6">
                      <label className="form-label">Nombre y Apellido *</label>
                      <input
                        type="text"
                        name="nombre"
                        autoComplete="name"
                        aria-required="true"
                        className={`form-control rounded-3 ${touched.nombre && errors.nombre ? "is-invalid" : ""}`}
                        value={formData.nombre}
                        onChange={handleChange}
                        onBlur={handleBlur}
                      />
                      {touched.nombre && errors.nombre && <div className="invalid-feedback">Ingresá al menos 3 caracteres.</div>}
                    </div>

                    <div className="col-md-6">
                      <label className="form-label">Teléfono *</label>
                      <input
                        type="tel"
                        name="telefono"
                        autoComplete="tel"
                        placeholder="+54 11 1234-5678"
                        aria-required="true"
                        className={`form-control rounded-3 ${touched.telefono && errors.telefono ? "is-invalid" : ""}`}
                        value={formData.telefono}
                        onChange={handleChange}
                        onBlur={handleBlur}
                      />
                      {touched.telefono && errors.telefono && <div className="invalid-feedback">Ingresá un teléfono válido.</div>}
                    </div>

                    <div className="col-md-6">
                      <label className="form-label">Email *</label>
                      <input
                        type="email"
                        name="email"
                        autoComplete="email"
                        aria-required="true"
                        className={`form-control rounded-3 ${touched.email && errors.email ? "is-invalid" : ""}`}
                        value={formData.email}
                        onChange={handleChange}
                        onBlur={handleBlur}
                      />
                      {touched.email && errors.email && <div className="invalid-feedback">Ingresá un email válido.</div>}
                    </div>

                    <div className="col-12">
                      <label className="form-label">Localidad *</label>
                      <input
                        type="text"
                        name="sucursal"
                        autoComplete="address-level2"
                        aria-required="true"
                        className={`form-control rounded-3 ${touched.sucursal && errors.sucursal ? "is-invalid" : ""}`}
                        value={formData.sucursal}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        list="dl-localidades"
                        placeholder="Ej: San Miguel de Tucumán"
                      />
                      <datalist id="dl-localidades">
                        <option value="Ciudad Autónoma de Buenos Aires" />
                        <option value="San Miguel de Tucumán" />
                        <option value="Mar del Plata" />
                        <option value="Rosario" />
                        <option value="Córdoba" />
                      </datalist>
                      {touched.sucursal && errors.sucursal && <div className="invalid-feedback">Indicanos tu localidad.</div>}
                    </div>

                    <div className="col-12">
                      <label className="form-label d-flex justify-content-between">
                        <span>Mensaje *</span>
                        <span className={`small ${charCount > 1000 ? "text-danger" : "text-muted"}`}>{charCount}/1200</span>
                      </label>

                      {/* Badge visible e inmutable */}
                      <div className="mb-2">
                        <span className="badge-prefijo">{PREFIX}</span>
                      </div>

                      <textarea
                        name="mensaje"
                        rows={6}
                        aria-required="true"
                        className={`form-control rounded-3 ${touched.mensaje && errors.mensaje ? "is-invalid" : ""}`}
                        value={formData.mensaje}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        placeholder="Contanos tu consulta..."
                      />
                      {touched.mensaje && errors.mensaje && <div className="invalid-feedback">Escribí entre 10 y 1200 caracteres.</div>}
                    </div>

                    <div className="visually-hidden" aria-hidden="true">
                      <label>Tu sitio web</label>
                      <input type="text" name="sitio" tabIndex={-1} autoComplete="off" value={formData.sitio} onChange={handleChange} />
                    </div>

                    <div className="col-12 text-center mt-3">
                      <button
                        type="submit"
                        className="btn btn-danger px-5 py-2 rounded-pill fw-bold shadow-sm position-relative"
                        disabled={sending || !isValid}
                        style={{ minWidth: 220 }}
                      >
                        {sending ? (
                          <>
                            <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true" />
                            Enviando...
                          </>
                        ) : (
                          "ENVIAR MENSAJE"
                        )}
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
            {/* small spacer */}
            <div style={{ height: 24 }} />
          </motion.div>
        </div>
      </div>
    </div>
  );
}

/* ---------- estilos locales: sombras, tarjetas suaves, etc. ---------- */
const styles = `
  .shadow-soft { box-shadow: 0 10px 30px rgba(0,0,0,0.08); }

  /* foco input */
  .form-control:focus {
    border-color: rgba(220,53,69,0.5) !important;
    box-shadow: 0 0 0 0.2rem rgba(220,53,69,0.15) !important;
  }

  .btn-danger {
    background: linear-gradient(180deg, #e84b5f 0%, #dc3545 100%);
    border: none;
  }
  .btn-danger:disabled { filter: grayscale(0.4); opacity: 0.8; }
  .card { border: 1px solid #e9ecef; }

  .card-body { padding: 1.75rem; }

  /* Badge prefijo (SOLICITUD DE BAJA) */
  .badge-prefijo {
    display: inline-block;
    padding: 6px 10px;
    background: #f8d7da;
    color: #842029;
    border-radius: 999px;
    font-weight: 700;
    font-size: 13px;
    border: 1px solid rgba(0,0,0,0.03);
  }

  /* Ajustes para centrar visualmente la card en pantallas pequeñas */
  @media (max-width: 767px) {
    .card { margin-left: 12px; margin-right: 12px; }
  }
`;
