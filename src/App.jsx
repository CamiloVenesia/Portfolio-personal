
import React, { useEffect } from "react";
import AOS from "aos";
import Lenis from "lenis";
import "aos/dist/aos.css";
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
import TopographicBackground from "./components/TopographicBackground/TopographicBackground";

function App() {
  useEffect(() => {
    AOS.init({
      duration: 800,
      once: true,
      easing: "ease-out-cubic"
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

    const refreshTimer = window.setTimeout(() => {
      AOS.refresh();
    }, 150);

    return () => {
      window.clearTimeout(refreshTimer);
      cancelAnimationFrame(animationFrame);
      lenis.destroy();
    };
  }, []);

  useEffect(() => {
    const markDecorativeSvgs = () => {
      document.querySelectorAll("svg").forEach((svg) => {
        const hasAccessibleName =
          svg.hasAttribute("aria-label") ||
          svg.hasAttribute("aria-labelledby") ||
          svg.querySelector("title");

        if (!hasAccessibleName) {
          svg.setAttribute("aria-hidden", "true");
          svg.setAttribute("focusable", "false");
        }
      });
    };

    markDecorativeSvgs();

    const observer = new MutationObserver(() => {
      markDecorativeSvgs();
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true
    });

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <>
      <TopographicBackground />

      <Header />

      <main id="main-content">
        <Hero />
        <Value />
        <Projects />
        <Skills />
        <Journey />
        <About />
        <Certifications />
        <Contact />
      </main>

      <Footer />
    </>
  );
}

export default App;
