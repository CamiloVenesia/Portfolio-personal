import React, { useEffect } from "react";
import AOS from 'aos';
import Lenis from 'lenis';
import 'aos/dist/aos.css';
import "./styles/global.css";
import Header from "./components/Header";
import Hero from "./sections/Hero/Hero";
import Value from "./sections/Value/Value";
import Projects from "./sections/Projects/Projects";
import Skills from "./sections/Skills/Skills";
import Journey from "./sections/Journey/Journey";
import About from "./sections/About/About";
import Certifications from "./sections/Certifications/Certifications";
import Contact from "./sections/Contact/Contact";
import Footer from "./components/Footer/Footer";

function App() {
  useEffect(() => {
    AOS.init({
      duration: 800,
      once: true
    });

    const lenis = new Lenis({
      duration: 1.05,
      smoothWheel: true,
      wheelMultiplier: 0.9,
      touchMultiplier: 1
    });

    let animationFrame;

    const raf = (time) => {
      lenis.raf(time);
      animationFrame = requestAnimationFrame(raf);
    };

    animationFrame = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(animationFrame);
      lenis.destroy();
    };
  }, []);

  return (
    <>
      <Header />
      <Hero />
      <Value />
      <Projects />
      <Skills />
      <Journey />
      <About />
      <Certifications />
      <Contact />
      <Footer />
    </>
  );
}

export default App;