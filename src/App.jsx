import { motion } from 'framer-motion';
import { useEffect } from 'react';
import './App.css';
import Footer from './componentes/landingpage/footer/FOOTER';
import Navbar from './componentes/landingpage/navbar/NAVBAR';
import RUTAS from './componentes/RUTAS';

function App() {
  // Inyectar el bootstrap script de Dialogflow
  useEffect(() => {
    const s = document.createElement('script');
    s.src = 'https://www.gstatic.com/dialogflow-console/fast/messenger-bootstrap.js?v=1';
    s.async = true;
    document.head.appendChild(s);
  }, []);

  const fadeIn = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8 } }
  };

  return (
    <>
      <Navbar />
      <RUTAS />
      <df-messenger
        intent="WELCOME"
        chat-title="COOPYA_AYUDANTE"
        agent-id="dfe21089-c83f-4e0a-892a-8bc085147f90"
        language-code="es">
      </df-messenger>
      <motion.div variants={fadeIn} initial="hidden" whileInView="visible" viewport={{ once: true }}>
        <Footer />
      </motion.div>
    </>
  );
}

export default App;