import { useState, useEffect } from "react";
import emailjs from "@emailjs/browser";
import { motion } from "framer-motion";
import "bootstrap/dist/css/bootstrap.min.css";

const fadeIn = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

const ContactoForm = () => {
    const [formData, setFormData] = useState({
        documento: "",
        nombre: "",
        telefono: "",
        email: "",
        sucursal: "",
        mensaje: "",
    });

    const [status, setStatus] = useState(null);
    const [enviosRestantes, setEnviosRestantes] = useState(3);

    useEffect(() => {
        const stored = localStorage.getItem("enviosRestantes");
        if (stored !== null) {
            setEnviosRestantes(parseInt(stored));
        }
    }, []);

    const handleChange = (e) => {
        setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (enviosRestantes <= 0) {
            setStatus("limit");
            return;
        }

        emailjs
            .send(
                import.meta.env.VITE_EMAILJS_SERVICE_ID,
                import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
                formData,
                import.meta.env.VITE_EMAILJS_PUBLIC_KEY
            )
            .then(
                () => {
                    setStatus("success");
                    setFormData({
                        documento: "",
                        nombre: "",
                        telefono: "",
                        email: "",
                        sucursal: "",
                        mensaje: "",
                    });
                    const nuevoContador = enviosRestantes - 1;
                    setEnviosRestantes(nuevoContador);
                    localStorage.setItem("enviosRestantes", nuevoContador);
                },
                () => setStatus("error")
            );
    };

    return (
        <div style={{ backgroundColor: "#f8f9fa", minHeight: "100vh", paddingTop: "50px" }}>
            <div className="container">
                <motion.div
                    variants={fadeIn}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    className="p-4 rounded-4 shadow-lg"
                    style={{
                        backgroundColor: "#ffffff",
                        border: "1px solid #dee2e6",
                        maxWidth: "800px",
                        margin: "0 auto",
                    }}
                >
                    <h2 className="text-center text-danger mb-4 fw-bold">Enviar mensaje</h2>
                    <form onSubmit={handleSubmit}>
                        <div className="row g-3">
                            <div className="col-md-6">
                                <label className="form-label">Nro Documento *</label>
                                <input
                                    type="text"
                                    name="documento"
                                    className="form-control rounded-3"
                                    value={formData.documento}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div className="col-md-6">
                                <label className="form-label">Nombre y Apellido *</label>
                                <input
                                    type="text"
                                    name="nombre"
                                    className="form-control rounded-3"
                                    value={formData.nombre}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div className="col-md-6">
                                <label className="form-label">Teléfono *</label>
                                <input
                                    type="text"
                                    name="telefono"
                                    className="form-control rounded-3"
                                    value={formData.telefono}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div className="col-md-6">
                                <label className="form-label">Email *</label>
                                <input
                                    type="email"
                                    name="email"
                                    className="form-control rounded-3"
                                    value={formData.email}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div className="col-12">
                                <label className="form-label">Sucursal *</label>
                                <input
                                    type="text"
                                    name="sucursal"
                                    className="form-control rounded-3"
                                    value={formData.sucursal}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div className="col-12">
                                <label className="form-label">Mensaje *</label>
                                <textarea
                                    name="mensaje"
                                    rows="5"
                                    className="form-control rounded-3"
                                    value={formData.mensaje}
                                    onChange={handleChange}
                                    required
                                ></textarea>
                            </div>
                            <div className="col-12 text-center mt-4">
                                <button
                                    type="submit"
                                    className="btn px-5 py-2 rounded-pill fw-bold"
                                    style={{
                                        backgroundColor: enviosRestantes > 0 ? "#dc3545" : "#6c757d",
                                        color: "#fff",
                                        border: "2px solid #fff",
                                        transition: "0.3s",
                                    }}
                                    disabled={enviosRestantes <= 0}
                                >
                                    ENVIAR MENSAJE
                                </button>
                                <p className="mt-2 text-muted small">
                                    {enviosRestantes > 0
                                        ? `Podés enviar ${enviosRestantes} mensaje${enviosRestantes === 1 ? "" : "s"} más.`
                                        : "Límite de envíos alcanzado."}
                                </p>
                            </div>
                        </div>
                    </form>

                    {status === "success" && (
                        <div className="alert alert-success mt-4 text-center rounded-3">
                            Mensaje enviado con éxito.
                        </div>
                    )}
                    {status === "error" && (
                        <div className="alert alert-danger mt-4 text-center rounded-3">
                            Ocurrió un error. Intenta nuevamente.
                        </div>
                    )}
                    {status === "limit" && (
                        <div className="alert alert-warning mt-4 text-center rounded-3">
                            Has alcanzado el límite de envíos por sesión.
                        </div>
                    )}
                </motion.div>
            </div>
        </div>
    );
};

export default ContactoForm;