import React, { useEffect } from "react";
import AOS from 'aos';
import 'aos/dist/aos.css';
import "./styles/global.css";
import Header from "./components/Header";
import Hero from "./sections/Hero/Hero";
import About from "./sections/About/About";
import Journey from "./sections/Journey/Journey";
import Projects from "./sections/Projects/Projects";
import Contact from "./sections/Contact/Contact";
import Footer from "./components/Footer/Footer";

function App() {
  useEffect(() => {
    AOS.init({ duration: 800, once: true });
  }, []);

  return (
    /* ¡Fuera el div restrictivo! Volvemos a los fragmentos de React puros */
    <>
      <Header />
      <Hero />
      <About />
      <Journey />
      <Projects />
      <Contact />
      <Footer />
    </>
  );
}

export default App;