
import React from 'react';
import Tilt from 'react-parallax-tilt';
import styles from './Hero.module.css';
import { scrollToSection } from '../../utils/scrollToSection';

const Hero = () => {
  return (
    <section className={styles.hero} id="home">
      <div className={styles.gridBackground}></div>
      <div className={`${styles.glow} ${styles.glowLeft}`}></div>
      <div className={`${styles.glow} ${styles.glowRight}`}></div>

      <div className={styles.container}>
        <div className={styles.content}>
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
            {/* VER PROYECTOS */}
            <a
              href="#projects"
              className={styles.primaryBtn}
              onClick={(e) => scrollToSection(e, 'projects')}
            >
              Ver proyectos

              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <line x1="12" y1="5" x2="12" y2="19"></line>
                <polyline points="5 12 12 19 19 12"></polyline>
              </svg>
            </a>

            {/* LINKEDIN */}
            <a
              href="https://www.linkedin.com/in/camilovenesia/"
              className={`${styles.socialBtn} ${styles.linkedinBtn}`}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Abrir perfil de LinkedIn de Camilo Venesia"
            >
              <svg
                className={styles.socialIcon}
                viewBox="0 0 24 24"
                fill="currentColor"
                aria-hidden="true"
              >
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.35V9h3.414v1.561h.049c.476-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286ZM5.337 7.433a2.062 2.062 0 1 1 0-4.124 2.062 2.062 0 0 1 0 4.124ZM7.114 20.452H3.56V9h3.554v11.452ZM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003Z" />
              </svg>

              <span className={styles.socialLabel}>LinkedIn</span>

              <svg
                className={styles.socialExternal}
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="M14 3h7v7" />
                <path d="M10 14 21 3" />
                <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
              </svg>
            </a>

            {/* GITHUB */}
            <a
              href="https://github.com/CamiloVenesia"
              className={`${styles.socialBtn} ${styles.githubBtn}`}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Abrir perfil de GitHub de Camilo Venesia"
            >
              <svg
                className={styles.socialIcon}
                viewBox="0 0 24 24"
                fill="currentColor"
                aria-hidden="true"
              >
                <path d="M12 .9C5.87.9.9 5.87.9 12c0 4.9 3.17 9.06 7.57 10.53.55.1.75-.24.75-.53v-1.87c-3.08.67-3.73-1.31-3.73-1.31-.5-1.28-1.23-1.62-1.23-1.62-1-.68.08-.67.08-.67 1.1.08 1.68 1.13 1.68 1.13.98 1.68 2.58 1.2 3.21.92.1-.72.38-1.2.7-1.48-2.46-.28-5.05-1.23-5.05-5.48 0-1.21.43-2.2 1.13-2.97-.11-.28-.49-1.4.11-2.92 0 0 .92-.29 3.02 1.13a10.5 10.5 0 0 1 5.5 0c2.1-1.42 3.02-1.13 3.02-1.13.6 1.52.22 2.64.11 2.92.7.77 1.13 1.76 1.13 2.97 0 4.26-2.6 5.2-5.07 5.47.4.35.75 1.02.75 2.06V22c0 .29.2.63.76.52A11.1 11.1 0 0 0 23.1 12C23.1 5.87 18.13.9 12 .9Z" />
              </svg>

              <span className={styles.socialLabel}>GitHub</span>

              <svg
                className={styles.socialExternal}
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="M14 3h7v7" />
                <path d="M10 14 21 3" />
                <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
              </svg>
            </a>
          </div>
        </div>

        <div className={styles.visual}>
          <div className={styles.visualGlow}></div>

          <Tilt
            perspective={1200}
            tiltMaxAngleX={3}
            tiltMaxAngleY={3}
            glareEnable={true}
            glareMaxOpacity={0.1}
            glareColor="#00abf0"
            glarePosition="all"
            scale={1}
            transitionSpeed={450}
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
                  src="/assets/yoformal-optimized.webp"
                  alt="Retrato de Camilo Venesia, desarrollador Full Stack"
                  className={styles.heroImage}
                  loading="eager"
                  decoding="async"
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
