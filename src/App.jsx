import React, { useEffect } from "react";
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

function App() {
  useEffect(() => {
    const isMobile = window.matchMedia(
      "(max-width: 768px)"
    ).matches;

    /*
     * En mobile usamos scroll nativo y dejamos
     * desactivadas las animaciones AOS.
     *
     * Esto evita trabajo innecesario antes del
     * primer paint y mejora la experiencia en
     * dispositivos con menos potencia.
     */
    if (isMobile) {
      document.documentElement.classList.add(
        "mobile-performance"
      );

      return () => {
        document.documentElement.classList.remove(
          "mobile-performance"
        );
      };
    }

    let active = true;
    let lenis = null;
    let animationFrame = null;
    let idleHandle = null;

    const startDesktopEnhancements = async () => {
      const [
        aosModule,
        lenisModule
      ] = await Promise.all([
        import("aos"),
        import("lenis")
      ]);

      if (!active) return;

      const AOS = aosModule.default;
      const Lenis = lenisModule.default;

      AOS.init({
        duration: 800,
        once: true
      });

      lenis = new Lenis({
        duration: 1.05,
        smoothWheel: true,
        wheelMultiplier: 0.9,
        touchMultiplier: 1
      });

      const raf = (time) => {
        if (!active || !lenis) return;

        lenis.raf(time);
        animationFrame =
          requestAnimationFrame(raf);
      };

      animationFrame =
        requestAnimationFrame(raf);
    };

    /*
     * AOS y Lenis no forman parte del contenido
     * esencial. Los iniciamos después de que el
     * navegador tenga oportunidad de pintar.
     */
    if ("requestIdleCallback" in window) {
      idleHandle = window.requestIdleCallback(
        startDesktopEnhancements,
        {
          timeout: 1000
        }
      );
    } else {
      idleHandle = window.setTimeout(
        startDesktopEnhancements,
        0
      );
    }

    return () => {
      active = false;

      if (
        "cancelIdleCallback" in window &&
        typeof idleHandle === "number"
      ) {
        window.cancelIdleCallback(idleHandle);
      } else if (idleHandle) {
        window.clearTimeout(idleHandle);
      }

      if (animationFrame) {
        cancelAnimationFrame(animationFrame);
      }

      if (lenis) {
        lenis.destroy();
      }
    };
  }, []);

  return (
    <>
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