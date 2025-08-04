import { motion } from "framer-motion";
import Navbar from "./navbar/NAVBAR";
import HeroCarousel from "./carousel/CAROUSEL";
import QuienesSomos from "./quienes _somos/QUIENESSOMOS";
import QueOfrecemos from "./que_ofrecemos/QUEOFRECEMOS";
import Estadisticas from "./estadisticas/ESTADISTICAS";
import Ubicacion from "./ubicacion/UBICACION";
import Footer from "./footer/FOOTER";

const fadeIn = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8 } },
};

function LANFINGPAGEMAIN() {
  return (
    <>

        <HeroCarousel />

      <motion.div variants={fadeIn} initial="hidden" whileInView="visible" viewport={{ once: true }}>
        <QuienesSomos />
      </motion.div>

      <motion.div variants={fadeIn} initial="hidden" whileInView="visible" viewport={{ once: true }}>
        <QueOfrecemos />
      </motion.div>

      <motion.div variants={fadeIn} initial="hidden" whileInView="visible" viewport={{ once: true }}>
        <Estadisticas />
      </motion.div>

      <motion.div variants={fadeIn} initial="hidden" whileInView="visible" viewport={{ once: true }}>
        <Ubicacion />
      </motion.div>

      
    </>
  );
}

export default LANFINGPAGEMAIN;
