import  { useEffect } from "react";
import React from "react";

const MODALPOLITICA = ({ show = false, onClose = () => {} }) => {
  useEffect(() => {
    if (!show) return;
    const onKey = (e) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [show, onClose]);

  if (!show) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="d-flex align-items-center justify-content-center"
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 1050,
        background: "rgba(0,0,0,0.45)",
        padding: "1.25rem",
      }}
      onMouseDown={(e) => {
        // clic en backdrop cierra
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        className="bg-white rounded-3 shadow-sm"
        style={{
          width: "min(760px, 98%)",
          maxHeight: "85vh",
          overflow: "auto",
          padding: "1.5rem",
        }}
      >
        <h5 className="mb-3 text-dark">Política de Privacidad - 30/09/2025</h5>

        <ol className="ps-3 text-dark" >

          <li className="mb-2">
            <strong>Derechos sujetos a verificación.</strong> Los titulares pueden solicitar acceso, rectificación, supresión, oposición, limitación o portabilidad. Las solicitudes se atienden previa verificación de identidad y pueden requerir documentación mínima. El derecho de acceso se ejercerá en forma gratuita a intervalos no inferiores a seis meses, salvo que exista interés legítimo acreditado conforme la normativa aplicable.
          </li>
          <li className="mb-2">
            <strong>Seguridad razonable.</strong> Aplicamos medidas técnicas y organizativas razonables para proteger los datos. No garantizamos invulnerabilidad absoluta; en caso de incidente actuaremos según la ley.
          </li>
          <li className="mb-2">
            <strong>Limitación de responsabilidad.</strong> En la medida permitida por la ley, nuestra responsabilidad por daños derivados del tratamiento se limitará al daño directo probado y proporcional, excluyéndose daños indirectos o pérdidas de lucro cuando la ley lo permita.
          </li>
          <li className="mb-2">
            <strong>Cambios y publicación.</strong> Podemos actualizar esta política. Se publicará la versión vigente con su fecha de actualización.
          </li>
          <li className="mb-2">
            <strong>Reclamos.</strong> Los reclamos pueden dirigirse al órgano de control competente conforme a la normativa aplicable.
          </li>
        </ol>

        <div className="d-flex justify-content-end mt-3">
          <button
            type="button"
            className="btn btn-secondary"
            onClick={onClose}
            aria-label="Cerrar"
          >
            Cerrar
          </button>
        </div>
      </div>
    </div>
  );
};

export default MODALPOLITICA;
