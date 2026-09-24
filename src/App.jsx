import React, { useEffect } from "react";
import AOS from 'aos';
import 'aos/dist/aos.css';
import "./styles/global.css";
import Header from "./components/Header";
import Hero from "./sections/Hero/Hero";
import About from "./sections/About/About";
import Journey from "./sections/Journey/Journey";
import Skills from "./sections/Skills/Skills";
import Projects from "./sections/Projects/Projects";
import Certifications from "./sections/Certifications/Certifications";
import Contact from "./sections/Contact/Contact";
import Footer from "./components/Footer/Footer";

function App() {
  useEffect(() => {
    AOS.init({ duration: 800, once: true });
  }, []);

  return (
    <>
      <Header />
      <Hero />
      <About />
      <Journey />
      <Skills />
      <Projects />
      <Certifications />
      <Contact />
      <Footer />
    </>
  );
}

export default App;