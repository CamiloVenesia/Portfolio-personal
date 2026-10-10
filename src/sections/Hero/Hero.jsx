import React from 'react';
import Tilt from 'react-parallax-tilt';
import styles from './Hero.module.css';
import { scrollToSection } from '../../utils/scrollToSection';

const Hero = () => {
  return (
    <section className={styles.hero} id="home">
      <div className={styles.gridBackground}></div>
      <div className={styles.glow + ' ' + styles.glowLeft}></div>
      <div className={styles.glow + ' ' + styles.glowRight}></div>

      <div className={styles.container}>
        <div className={styles.content} data-aos="fade-right">
          <div className={styles.eyebrow}>
            <span className={styles.statusDot}></span>
            FULL-STACK DEVELOPER
            <span className={styles.separator}>/</span>
            ROSARIO, ARGENTINA
          </div>

          <h1 className={styles.title}>
            Construyo experiencias web
            <span> completas.</span>
          </h1>

          <p className={styles.lead}>
            Frontend sólido. Backend funcional. Producto de punta a punta.
          </p>

          <p className={styles.description}>
            Desarrollo aplicaciones web modernas con especial foco en interfaces,
            experiencia de usuario y frontend con React. También construyo APIs,
            lógica de negocio, autenticación, bases de datos y despliegues para
            llevar cada proyecto desde la idea hasta producción.
          </p>

          <p className={styles.stackLine}>
            React <span>·</span> JavaScript <span>·</span> CSS <span>·</span> Vite
            <span>·</span> Node.js <span>·</span> MongoDB
          </p>

          <div className={styles.actions}>
            <a
              href="#projects"
              className={styles.primaryBtn}
              onClick={(e) => scrollToSection(e, 'projects')}
            >
              Ver proyectos
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="5" y1="12" x2="19" y2="12"></line>
                <polyline points="12 5 19 12 12 19"></polyline>
              </svg>
            </a>

            <a
              href="#contact"
              className={styles.secondaryBtn}
              onClick={(e) => scrollToSection(e, 'contact')}
            >
              Contactarme
            </a>
          </div>

          <div className={styles.specialties}>
            <div>
              <span>01</span>
              <div>
                <strong>Frontend & UX</strong>
                <p>Interfaces modernas, responsive y orientadas al producto.</p>
              </div>
            </div>

            <div>
              <span>02</span>
              <div>
                <strong>Full-Stack</strong>
                <p>Frontend, APIs, autenticación, datos y lógica de negocio.</p>
              </div>
            </div>

            <div>
              <span>03</span>
              <div>
                <strong>Producción</strong>
                <p>Aplicaciones desplegadas y preparadas para usuarios reales.</p>
              </div>
            </div>
          </div>
        </div>

        <div className={styles.visual} data-aos="fade-left">
          <div className={styles.visualGlow}></div>

          <Tilt
            perspective={1200}
            tiltMaxAngleX={3}
            tiltMaxAngleY={3}
            glareEnable={true}
            glareMaxOpacity={0.1}
            glareColor="#00abf0"
            glarePosition="all"
            scale={1.01}
            transitionSpeed={1200}
            className={styles.tiltCard}
          >
            <div className={styles.photoCard}>
              <div className={styles.photoTop}>
                <div className={styles.windowDots}>
                  <span></span>
                  <span></span>
                  <span></span>
                </div>

                <span>camilo.venesia</span>
              </div>

              <div className={styles.photoWrapper}>
                <img
                  src="/assets/yoformal.jpg"
                  alt="Camilo Venesia"
                  className={styles.heroImage}
                />

                <div className={styles.imageOverlay}></div>

                <div className={styles.identity}>
                  <span>FULL-STACK DEVELOPER</span>
                  <strong>Camilo Venesia</strong>
                  <p>Frontend · Backend · Producto</p>
                </div>
              </div>
            </div>
          </Tilt>

          <div className={styles.techPanel}>
            <div className={styles.techHeader}>
              <span className={styles.techStatus}></span>
              CAPACIDADES
            </div>

            <div className={styles.techRow}>
              <span>Frontend</span>
              <strong>React · JS · CSS · Vite</strong>
            </div>

            <div className={styles.techRow}>
              <span>Backend</span>
              <strong>Node · Express · REST</strong>
            </div>

            <div className={styles.techRow}>
              <span>Datos</span>
              <strong>MongoDB · Firestore · SQL</strong>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;