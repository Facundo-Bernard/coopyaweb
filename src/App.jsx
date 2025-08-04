import './App.css'
import Footer from './componentes/landingpage/footer/FOOTER'
import LANFINGPAGEMAIN from './componentes/landingpage/LANFINGPAGEMAIN'
import Navbar from './componentes/landingpage/navbar/NAVBAR'
import RUTAS from './componentes/RUTAS'
import { motion } from "framer-motion"


function App() {

  const fadeIn = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8 } },
};

  return (
    <>
    <Navbar></Navbar>
    <RUTAS></RUTAS>
    <motion.div variants={fadeIn} initial="hidden" whileInView="visible" viewport={{ once: true }}>
        <Footer />
      </motion.div>

    </>
  )
}

export default App
