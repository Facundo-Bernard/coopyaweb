// UbicacionHeatmap.jsx
import React, { useLayoutEffect, useRef } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

// MarkerCluster (asegúrate de instalar: npm install leaflet.markercluster)
import "leaflet.markercluster/dist/MarkerCluster.css";
import "leaflet.markercluster/dist/MarkerCluster.Default.css";
import "leaflet.markercluster";

import dataRaw from "./ubicacioncantmin.json"; // [{ Localidad, Cantidad, Latitud, Longitud }, ...]

const STORAGE_KEY = "coopya_map_view_v1";

const UbicacionHeatmap = () => {
  const mapRef = useRef(null);

  useLayoutEffect(() => {
    let map;
    let resizeObserver;

    try {
      const container = mapRef.current;
      if (!container) return;

      // Prefer canvas renderer para performance de los círculos geográficos
      const renderer = L.canvas({ padding: 0.5 });

      // Cargar vista guardada
      const saved = loadView();
      map = L.map(container, {
        preferCanvas: true,
        renderer,
        zoomControl: true,
        attributionControl: true,
        center: saved?.center ?? [-38.4161, -63.6167],
        zoom: saved?.zoom ?? 4,
      });

      // Base maps (nombres en español)
      const baseOSM = L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: "&copy; OpenStreetMap contributors",
        maxZoom: 19,
      }).addTo(map);

      const basePositron = L.tileLayer(
        "https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png",
        {
          attribution: "&copy; OpenStreetMap, &copy; CARTO",
          maxZoom: 20,
        }
      );

      const baseLayers = {
        "OSM clásico": baseOSM,
        "Carto Positron": basePositron,
      };

      // ---- Limpieza y normalización de datos ----
      const puntos = Array.isArray(dataRaw)
        ? dataRaw
            .map((r, idx) => {
              const lat = Number(r.Latitud);
              const lng = Number(r.Longitud);
              const count = Number(r.Cantidad);
              const label = String(r.Localidad ?? "Sin localidad");
              const valid =
                Number.isFinite(lat) && Number.isFinite(lng) && Number.isFinite(count) && count > 0;
              if (!valid) {
                if (process.env.NODE_ENV !== "production")
                  console.warn(`Registro inválido [${idx}]`, r);
                return null;
              }
              return { lat, lng, count, label };
            })
            .filter(Boolean)
        : [];

      if (puntos.length === 0) {
        console.warn("No hay puntos válidos para mostrar.");
        return;
      }

      // Estadísticas
      const counts = puntos.map((p) => p.count);
      const minCount = Math.min(...counts);
      const maxCount = Math.max(...counts);

      // Pane para control z-index y blending
      map.createPane("circlesPane");
      map.getPane("circlesPane").style.zIndex = 450;
      map.getPane("circlesPane").style.mixBlendMode = "multiply";

      // Escalas
      const colorOf = (count) => rampColor(normalize(count, minCount, maxCount));
      const radiusPxOf = makeRadiusPxScale(counts, { minPx: 6, maxPx: 28 });
      const radiusMOf = makeRadiusMeterScale(counts, { minM: 2500, maxM: 35000 });

      // ----- CAPA GEOGRÁFICA (círculos en metros) -----
      const geoLayerGroup = L.layerGroup([], { pane: "circlesPane" });
      {
        const batch = [];
        for (const p of puntos) {
          const color = colorOf(p.count);
          const rm = radiusMOf(p.count);
          const c = L.circle([p.lat, p.lng], {
            radius: rm,
            color,
            weight: 1,
            opacity: 0.7,
            fillColor: color,
            fillOpacity: 0.35,
            renderer,
            interactive: true,
          })
            .bindTooltip(
              `<div class="tt">
                <strong>${escapeHtml(p.label)}</strong><br/>
                Socios: ${p.count.toLocaleString("es-AR")}
              </div>`,
              { direction: "top", offset: [0, -4], sticky: true, opacity: 0.95 }
            )
            .bindPopup(
              `<div class="pp">
                <h4>${escapeHtml(p.label)}</h4>
                <div><b>Socios:</b> ${p.count.toLocaleString("es-AR")}</div>
                <div><small>${p.lat.toFixed(4)}, ${p.lng.toFixed(4)}</small></div>
              </div>`,
              { maxWidth: 240 }
            );
          batch.push(c);
        }
        geoLayerGroup.addLayer(L.featureGroup(batch));
      }

      // ----- CLUSTER (agrupa marcadores y se divide al hacer zoom) -----
      const clusterOptions = {
        maxClusterRadius: 60,
        animate: true,
        iconCreateFunction: function (cluster) {
          const childMarkers = cluster.getAllChildMarkers();
          let sumCount = 0;
          for (const m of childMarkers) {
            sumCount += Number(m.options.data?.count || 0);
          }
          const r = Math.max(14, Math.round(radiusPxOf(Math.max(1, sumCount)) * 1.2));
          const diameter = r * 2;
          const color = colorOf(sumCount);
          return L.divIcon({
            html: `<div class="cluster-inner" style="
              width:${diameter}px;
              height:${diameter}px;
              line-height:${diameter}px;
              background:${color};
              border-radius:50%;
              display:flex;
              align-items:center;
              justify-content:center;
              font-weight:700;
              color:white;
              border:2px solid rgba(0,0,0,0.08);
              box-shadow:0 6px 18px rgba(0,0,0,0.12);
            ">${sumCount.toLocaleString("es-AR")}</div>`,
            className: "custom-cluster-icon",
            iconSize: L.point(diameter, diameter),
            iconAnchor: [r, r],
          });
        },
      };

      const markersCluster = L.markerClusterGroup(clusterOptions);

      for (const p of puntos) {
        const color = colorOf(p.count);
        const rpx = Math.max(4, Math.round(radiusPxOf(p.count)));
        const diameter = rpx * 2;

        const marker = L.marker([p.lat, p.lng], {
          icon: L.divIcon({
            className: "circle-marker",
            html: `<div class="circle-inner" style="
              width:${diameter}px;
              height:${diameter}px;
              border-radius:50%;
              background:${color};
              border:1.25px solid ${color};
              box-shadow: inset 0 0 0 1px rgba(255,255,255,0.06);
            "></div>`,
            iconSize: [diameter, diameter],
            iconAnchor: [rpx, rpx],
          }),
          title: p.label,
          data: { count: p.count },
        })
          .bindTooltip(
            `<div class="tt">
              <strong>${escapeHtml(p.label)}</strong><br/>
              Socios: ${p.count.toLocaleString("es-AR")}
            </div>`,
            { direction: "top", offset: [0, -4], sticky: true, opacity: 0.95 }
          )
          .bindPopup(
            `<div class="pp">
              <h4>${escapeHtml(p.label)}</h4>
              <div><b>Socios:</b> ${p.count.toLocaleString("es-AR")}</div>
              <div><small>${p.lat.toFixed(4)}, ${p.lng.toFixed(4)}</small></div>
            </div>`,
            { maxWidth: 240 }
          );

        markersCluster.addLayer(marker);
      }

      // ----- ETIQUETAS PERSONALIZADAS (p. ej. para renombrar Malvinas) -----
      // Esta capa contiene etiquetas que se muestran por encima del mapa (texto HTML),
      // permitiéndote mostrar "Islas Malvinas" sin tocar los tiles.
      const etiquetasGroup = L.layerGroup([], { pane: "circlesPane" });

      // Coordenadas aproximadas del archipiélago (centro aproximado)
      const malvinasCoords = [-51.7, -59.0]; // lat, lng (ajusta si querés)
      const malvinasMarker = L.marker(malvinasCoords, {
        icon: L.divIcon({
          className: "custom-label malvinas-label",
          html: `<div class="label-inner">Islas Malvinas</div>`,
          iconSize: [160, 28],
          iconAnchor: [80, 14],
        }),
        interactive: false, // no interactiva (solo visual)
      });
      etiquetasGroup.addLayer(malvinasMarker);

      // Añadir capas al mapa por defecto: cluster (visual)
      markersCluster.addTo(map);
      // La capa geo (círculos en metros) queda como overlay opcional
      // etiquetasGroup no se agrega por defecto para que el usuario elija; la ponemos en overlays
      // Si querés mostrarla por defecto, usa etiquetasGroup.addTo(map)
      //etiquetasGroup.addTo(map);

      // Control de capas (nombres en español)
      const overlays = {
        "Clusters (agrupados)": markersCluster,
        "Círculos (tamaño geográfico)": geoLayerGroup,
        "Etiquetas personalizadas": etiquetasGroup,
      };
      L.control.layers(baseLayers, overlays, { position: "topleft", collapsed: true }).addTo(map);

      // Controles y leyendas (en español)
      L.control.scale({ metric: true, imperial: false, position: "bottomleft" }).addTo(map);
      const legendColor = makeLegendColor(minCount, maxCount, colorOf);
      const legendSize = makeLegendSize(radiusPxOf);
      legendColor.addTo(map);
      legendSize.addTo(map);

      // Ajuste inicial a datos si no había vista guardada
      if (!saved) {
        const bounds = L.latLngBounds(puntos.map((p) => [p.lat, p.lng]));
        map.fitBounds(bounds, { padding: [24, 24] });
      }

      // Persistir vista
      map.on("moveend zoomend", () => {
        const center = map.getCenter();
        saveView({ center: [center.lat, center.lng], zoom: map.getZoom() });
      });

      // Responsivo
      resizeObserver = new ResizeObserver(() => {
        map.invalidateSize();
      });
      resizeObserver.observe(container);

      // Inyectar estilos (tooltip/popup/leyenda/cluster/etiquetas)
      injectStyles();
    } catch (err) {
      console.error("Error al montar el mapa:", err);
    }

    return () => {
      try {
        if (resizeObserver && mapRef.current) resizeObserver.unobserve(mapRef.current);
        if (map) map.remove();
      } catch {}
    };
  }, []);

  return (
    <section className="py-5 bg-light text-center" >
      <div className="container">
        <h2 className="mb-3 fw-bold">Nuestros socios</h2>
        <p className="text-muted" style={{ marginTop: -6 }}>
          Intensidad por color y tamaño proporcional a la cantidad
        </p>
        <div
          ref={mapRef}
          id="mapid"
          aria-label="Mapa de calor de socios"
          style={{
            width: "100%",
            maxWidth: 1100,
            height: 550,
            margin: "0 auto",
            borderRadius: 12,
            boxShadow: "0 10px 30px rgba(0,0,0,0.12)",
            overflow: "hidden",
          }}
        />
      </div>
    </section>
  );
};

/* ---------- Utilidades de escala y estilos ---------- */

// Normaliza a [0,1]
function normalize(v, min, max) {
  if (!isFinite(v) || !isFinite(min) || !isFinite(max) || max <= min) return 0;
  const t = (v - min) / (max - min);
  return Math.max(0, Math.min(1, t));
}

// Ramp de color HSL de azul (220º) -> rojo (0º)
function rampColor(t) {
  const h = 220 * (1 - t);
  const s = 90;
  const l = 55;
  return `hsl(${h.toFixed(1)} ${s}% ${l}%)`;
}

// r_px = k * sqrt(count) con límites [minPx, maxPx]
function makeRadiusPxScale(counts, { minPx = 6, maxPx = 28 } = {}) {
  const minC = Math.min(...counts);
  const maxC = Math.max(...counts);
  const sqrtMin = Math.sqrt(Math.max(1, minC));
  const sqrtMax = Math.sqrt(Math.max(1, maxC));
  const denom = sqrtMax - sqrtMin || 1;
  return (count) => {
    const t = (Math.sqrt(Math.max(1, count)) - sqrtMin) / denom;
    return Math.round(minPx + t * (maxPx - minPx));
  };
}

// r_m = K * sqrt(count) con límites [minM, maxM]
function makeRadiusMeterScale(counts, { minM = 2500, maxM = 35000 } = {}) {
  const minC = Math.min(...counts);
  const maxC = Math.max(...counts);
  const sqrtMin = Math.sqrt(Math.max(1, minC));
  const sqrtMax = Math.sqrt(Math.max(1, maxC));
  const denom = sqrtMax - sqrtMin || 1;
  return (count) => {
    const t = (Math.sqrt(Math.max(1, count)) - sqrtMin) / denom;
    return minM + t * (maxM - minM);
  };
}

function escapeHtml(s) {
  return String(s)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

/* ---------- Leyendas (arregladas para devolver control) ---------- */

function makeLegendColor(min, max, colorOf) {
  const ctrl = L.control({ position: "bottomright" });
  ctrl.onAdd = function () {
    const div = L.DomUtil.create("div", "legend legend-color");
    const steps = 6;
    const values = Array.from({ length: steps }, (_, i) =>
      Math.round(min + (i / (steps - 1)) * (max - min))
    );
    div.innerHTML = `
      <div class="legend-title">Intensidad (color)</div>
      <div class="legend-ramp">
        ${values
          .map(
            (v) =>
              `<span class="swatch" style="background:${colorOf(v)}" title="${v.toLocaleString(
                "es-AR"
              )}"></span>`
          )
          .join("")}
      </div>
      <div class="legend-scale">
        <span>${values[0].toLocaleString("es-AR")}</span>
        <span>${values[values.length - 1].toLocaleString("es-AR")}</span>
      </div>`;
    return div;
  };
  return ctrl;
}

function makeLegendSize(radiusPxOf) {
  const ctrl = L.control({ position: "bottomright" });
  ctrl.onAdd = function () {
    const div = L.DomUtil.create("div", "legend legend-size");
    const samples = [5, 20, 80].map((c) => ({ c, r: Math.round(radiusPxOf(c)) }));
    const maxR = Math.max(...samples.map((s) => s.r));
    div.innerHTML = `
      `;
    return div;
  };
  return ctrl;
}

/* ---------- Persistencia de vista ---------- */
function saveView({ center, zoom }) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ center, zoom }));
  } catch {}
}
function loadView() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    if (
      Array.isArray(parsed.center) &&
      parsed.center.length === 2 &&
      typeof parsed.zoom === "number"
    ) {
      return parsed;
    }
  } catch {}
  return null;
}

/* ---------- Inyección de estilos ---------- */
function injectStyles() {
  if (document.getElementById("map-styles-coopya")) return;
  const style = document.createElement("style");
  style.id = "map-styles-coopya";
  style.textContent = `
    .leaflet-container { background: #f7f9fb; }
    .leaflet-control-layers { border-radius: 8px; overflow: hidden; }
    .legend { 
      background: rgba(255,255,255,0.92); 
      backdrop-filter: saturate(1.2) blur(6px);
      border: 1px solid rgba(0,0,0,0.07);
      border-radius: 10px; 
      padding: 10px 12px; 
      margin: 8px; 
      box-shadow: 0 6px 20px rgba(0,0,0,0.08);
      font: 12px/1.3 system-ui, -apple-system, Segoe UI, Roboto, Ubuntu, sans-serif;
      color: #333;
    }
    .legend-title { font-weight: 700; font-size: 12px; margin-bottom: 6px; color: #222; }
    .legend-color .legend-ramp { display: grid; grid-template-columns: repeat(6, 1fr); gap: 4px; }
    .legend-color .swatch { display: block; height: 10px; border-radius: 4px; box-shadow: inset 0 0 0 1px rgba(0,0,0,0.08); }
    .legend-scale { display: flex; justify-content: space-between; margin-top: 4px; font-size: 11px; color: #666; }

    .legend-size .legend-bubbles { position: relative; width: 140px; }
    .legend-size .bubble { 
      position: absolute; 
      left: 6px; 
      border-radius: 50%; 
      background: radial-gradient(ellipse at 30% 30%, rgba(255,255,255,0.65), rgba(0,0,0,0.08)),
                  rgba(56, 132, 255, 0.25);
      border: 1px solid rgba(0,0,0,0.1);
    }
    .legend-size .bubble span { position: absolute; left: calc(100% + 8px); top: 50%; transform: translateY(-50%); font-size: 11px; color: #444; }

    .leaflet-tooltip .tt { font: 12px/1.3 system-ui; }
    .leaflet-popup-content .pp { font: 13px/1.45 system-ui; }
    .leaflet-popup-content .pp h4 { margin: 0 0 6px; font-size: 14px; }

    /* Hover focus ring */
    .leaflet-interactive:hover { filter: brightness(1.02) saturate(1.05); stroke-width: 1.5 !important; }

    /* Pane blending para densidad */
    .leaflet-pane.circlesPane { mix-blend-mode: multiply; z-index:450; }

    /* Marcador individual simulado (divIcon) */
    .circle-marker { pointer-events: auto; }
    .circle-marker .circle-inner { display:block; }

    /* Cluster custom */
    .custom-cluster-icon { display: block; text-align: center; }
    .custom-cluster-icon .cluster-inner { font-family: system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial; }
    .custom-cluster-icon { cursor: pointer; }

    /* Etiqueta personalizada (ej. Islas Malvinas) */
    .custom-label .label-inner {
      display:inline-block;
      padding:6px 10px;
      background: rgba(0,0,0,0.65);
      color: #fff;
      font-weight:700;
      font-size:13px;
      border-radius:999px;
      box-shadow: 0 6px 18px rgba(0,0,0,0.25);
      transform: translateY(-6px);
      white-space: nowrap;
      pointer-events: none;
    }
  `;
  document.head.appendChild(style);
}

export default UbicacionHeatmap;
