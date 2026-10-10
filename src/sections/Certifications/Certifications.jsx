import React, { useState, useEffect, useCallback, useMemo } from 'react';
import Tilt from 'react-parallax-tilt';
import {
  SiReact,
  SiJavascript,
  SiHtml5,
  SiCss,
  SiTailwindcss,
  SiSass,
  SiNodedotjs,
  SiExpress,
  SiMysql,
  SiMongodb,
  SiGit,
  SiGithub,
  SiPostman
} from 'react-icons/si';
import { VscDebugConsole, VscVscode } from 'react-icons/vsc';
import { BsBroadcast } from 'react-icons/bs';
import styles from './Certifications.module.css';

const certsData = [
  {
    id: 1,
    title: "Programación Backend III: Testing y Escalabilidad",
    institution: "Coderhouse · Certificado por MongoDB",
    date: "Septiembre 2026",
    hours: 16,
    badge: "★ Mejor calificado",
    image: "/assets/certs/cert-11-backend-iii.png"
  },
  {
    id: 2,
    title: "Carrera de Desarrollo Full Stack",
    institution: "Coderhouse",
    date: "Septiembre 2026",
    hours: 0,
    image: "/assets/certs/cert-12-fullstack-carrera.png"
  },
  {
    id: 3,
    title: "Programación Backend II: Diseño y Arquitectura Backend",
    institution: "Coderhouse",
    date: "Julio 2026",
    hours: 16,
    image: "/assets/certs/cert-10-backend-ii.jpg"
  },
  {
    id: 4,
    title: "Programación Backend I: Desarrollo Avanzado de Backend Flex",
    institution: "Coderhouse",
    date: "Abril 2026",
    hours: 18,
    image: "/assets/certs/cert-09-backend-i.jpg"
  },
  {
    id: 5,
    title: "SQL (Back-End)",
    institution: "Coderhouse",
    date: "Marzo 2026",
    hours: 22,
    image: "/assets/certs/cert-06-sql-backend.jpg"
  },
  {
    id: 6,
    title: "JavaScript (Back-End)",
    institution: "Coderhouse",
    date: "Noviembre 2025",
    hours: 20,
    image: "/assets/certs/cert-05-javascript-backend.jpg"
  },
  {
    id: 7,
    title: "React JS",
    institution: "Coderhouse",
    date: "Mayo 2025",
    hours: 16,
    image: "/assets/certs/cert-08-react-js.jpg"
  },
  {
    id: 8,
    title: "Carrera de Desarrollo Frontend React",
    institution: "Coderhouse",
    date: "Abril 2025",
    hours: 0,
    image: "/assets/certs/cert-04-frontend-react.jpg"
  },
  {
    id: 9,
    title: "JavaScript",
    institution: "Coderhouse",
    date: "Diciembre 2024",
    hours: 36,
    image: "/assets/certs/cert-07-javascript.jpg"
  },
  {
    id: 10,
    title: "Desarrollo Web",
    institution: "Coderhouse",
    date: "Octubre 2024",
    hours: 38,
    image: "/assets/certs/cert-03-desarrollo-web.jpg"
  },
  {
    id: 11,
    title: "Desarrollador Full Stack Junior",
    institution: "Instituto Superior Politécnico Córdoba",
    date: "Noviembre 2023",
    hours: 300,
    image: "/assets/certs/cert-02-fullstack-junior.jpg"
  },
  {
    id: 12,
    title: "Olimpíada Nacional de Educación Técnico Profesional",
    institution: "INET - Ministerio de Educación",
    date: "2023",
    hours: 0,
    image: "/assets/certs/cert-01-olimpiada.jpg"
  }
];

const techLogos = [
  { name: "React", Icon: SiReact, color: "#61DAFB" },
  { name: "JavaScript", Icon: SiJavascript, color: "#F7DF1E" },
  { name: "HTML5", Icon: SiHtml5, color: "#E34F26" },
  { name: "CSS3", Icon: SiCss, color: "#1572B6" },
  { name: "Tailwind", Icon: SiTailwindcss, color: "#38BDF8" },
  { name: "Sass", Icon: SiSass, color: "#CC6699" },
  { name: "Node.js", Icon: SiNodedotjs, color: "#339933" },
  { name: "Express", Icon: SiExpress, color: "#ffffff" },
  { name: "MySQL", Icon: SiMysql, color: "#4479A1" },
  { name: "MongoDB", Icon: SiMongodb, color: "#47A248" },
  { name: "Git", Icon: SiGit, color: "#F05032" },
  { name: "GitHub", Icon: SiGithub, color: "#ffffff" },
  { name: "VS Code", Icon: VscVscode, color: "#007ACC" },
  { name: "Live Server", Icon: BsBroadcast, color: "#00abf0" },
  { name: "DevTools", Icon: VscDebugConsole, color: "#00abf0" },
  { name: "Postman", Icon: SiPostman, color: "#FF6C37" },
  { name: "MySQL Workbench", Icon: SiMysql, color: "#4479A1" }
];

const techLogosLoop = [...techLogos, ...techLogos];

const Certifications = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isOpen, setIsOpen] = useState(false);

  const total = certsData.length;

  const stats = useMemo(() => {
    const totalHours = certsData.reduce(
      (sum, certificate) => sum + (certificate.hours || 0),
      0
    );

    return {
      total,
      totalHours
    };
  }, [total]);

  const goNext = useCallback(() => {
    setActiveIndex((prev) => (prev + 1) % total);
  }, [total]);

  const goPrev = useCallback(() => {
    setActiveIndex((prev) => (prev - 1 + total) % total);
  }, [total]);

  const openLightbox = () => setIsOpen(true);
  const closeLightbox = () => setIsOpen(false);

  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowRight') goNext();
      if (e.key === 'ArrowLeft') goPrev();
    };

    window.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [isOpen, goNext, goPrev]);

  const prevIndex = (activeIndex - 1 + total) % total;
  const nextIndex = (activeIndex + 1) % total;
  const centerCert = certsData[activeIndex];

  return (
    <section className={styles.certifications} id="certifications">
      <div className={styles.gridBackground}></div>
      <div className={styles.certBlob}></div>

      <div className={styles.container}>
        <div className={styles.header} data-aos="fade-up">
          <div>
            <div className={styles.eyebrow}>
              <span></span>
              FORMACIÓN CONTINUA
            </div>

            <h2 className={styles.title}>
              Formación & <span>certificaciones.</span>
            </h2>
          </div>

          <div className={styles.headerRight}>
            <p>
              Certificaciones que respaldan mi recorrido en desarrollo web,
              frontend, backend, bases de datos y construcción de aplicaciones.
            </p>

            <div className={styles.stats}>
              <div>
                <strong>{stats.total}</strong>
                <span>certificados</span>
              </div>

              <i></i>

              <div>
                <strong>{stats.totalHours}+</strong>
                <span>horas certificadas</span>
              </div>
            </div>
          </div>
        </div>

        <div className={styles.carouselWrapper} data-aos="fade-up">
          <button
            className={styles.arrowBtn}
            onClick={goPrev}
            aria-label="Certificado anterior"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="15 18 9 12 15 6"></polyline>
            </svg>
          </button>

          <div className={styles.carouselStage}>
            <button
              className={styles.peekCard + ' ' + styles.peekLeft}
              onClick={goPrev}
              aria-label={'Ver ' + certsData[prevIndex].title}
            >
              <img src={certsData[prevIndex].image} alt="" />
            </button>

            <Tilt
              key={centerCert.id}
              tiltMaxAngleX={5}
              tiltMaxAngleY={5}
              glareEnable={true}
              glareMaxOpacity={0.15}
              glareColor="#00abf0"
              glarePosition="all"
              scale={1.01}
              transitionSpeed={1200}
              className={styles.centerTilt}
            >
              <button
                className={styles.centerCard}
                onClick={openLightbox}
                aria-label={'Ver certificado completo: ' + centerCert.title}
              >
                {centerCert.badge && (
                  <span className={styles.featuredBadge}>
                    {centerCert.badge}
                  </span>
                )}

                <div className={styles.certImage}>
                  <img
                    src={centerCert.image}
                    alt={centerCert.title}
                  />

                  <div className={styles.zoomHint}>
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="11" cy="11" r="8"></circle>
                      <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                      <line x1="11" y1="8" x2="11" y2="14"></line>
                      <line x1="8" y1="11" x2="14" y2="11"></line>
                    </svg>

                    Ver certificado
                  </div>
                </div>

                <div className={styles.centerInfo}>
                  <span className={styles.centerYear}>
                    {centerCert.date}
                  </span>

                  <h3>{centerCert.title}</h3>
                  <p>{centerCert.institution}</p>
                </div>
              </button>
            </Tilt>

            <button
              className={styles.peekCard + ' ' + styles.peekRight}
              onClick={goNext}
              aria-label={'Ver ' + certsData[nextIndex].title}
            >
              <img src={certsData[nextIndex].image} alt="" />
            </button>
          </div>

          <button
            className={styles.arrowBtn}
            onClick={goNext}
            aria-label="Siguiente certificado"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="9 18 15 12 9 6"></polyline>
            </svg>
          </button>
        </div>

        <div className={styles.carouselMeta}>
          <span>
            {String(activeIndex + 1).padStart(2, '0')}
            <i>/</i>
            {String(total).padStart(2, '0')}
          </span>

          <div className={styles.dots}>
            {certsData.map((certificate, index) => (
              <button
                key={certificate.id}
                className={
                  index === activeIndex
                    ? styles.dot + ' ' + styles.dotActive
                    : styles.dot
                }
                onClick={() => setActiveIndex(index)}
                aria-label={'Ir a ' + certificate.title}
              ></button>
            ))}
          </div>
        </div>

        <a
          href="https://www.linkedin.com/in/camilovenesia/details/certifications/"
          target="_blank"
          rel="noreferrer"
          className={styles.ctaButton}
          data-aos="fade-up"
        >
          Ver todas en LinkedIn

          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <line x1="5" y1="12" x2="19" y2="12"></line>
            <polyline points="12 5 19 12 12 19"></polyline>
          </svg>
        </a>

        <div className={styles.techArea} data-aos="fade-up">
          <div className={styles.techHeader}>
            <span>ECOSISTEMA DE TRABAJO</span>
            <div></div>
          </div>

          <div className={styles.marqueeViewport}>
            <div className={styles.marqueeTrack}>
              {techLogosLoop.map((tech, index) => {
                const Icon = tech.Icon;

                return (
                  <div
                    className={styles.techItem}
                    key={tech.name + index}
                  >
                    <Icon
                      style={{ color: tech.color }}
                      className={styles.techIcon}
                    />

                    <span>{tech.name}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {isOpen && (
          <div
            className={styles.lightboxOverlay}
            onClick={closeLightbox}
          >
            <button
              className={styles.closeBtn}
              onClick={closeLightbox}
              aria-label="Cerrar"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>

            <button
              className={styles.navBtn + ' ' + styles.navPrev}
              onClick={(e) => {
                e.stopPropagation();
                goPrev();
              }}
              aria-label="Certificado anterior"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="15 18 9 12 15 6"></polyline>
              </svg>
            </button>

            <div
              className={styles.lightboxContent}
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={centerCert.image}
                alt={centerCert.title}
              />

              <div className={styles.lightboxInfo}>
                <span className={styles.lightboxYear}>
                  {centerCert.date}
                </span>

                <h3>{centerCert.title}</h3>
                <p>{centerCert.institution}</p>
              </div>

              <div className={styles.filmstrip}>
                {certsData.map((certificate, index) => (
                  <button
                    key={certificate.id}
                    className={
                      index === activeIndex
                        ? styles.filmThumb + ' ' + styles.filmThumbActive
                        : styles.filmThumb
                    }
                    onClick={() => setActiveIndex(index)}
                    aria-label={'Ir a ' + certificate.title}
                  >
                    <img src={certificate.image} alt="" />
                  </button>
                ))}
              </div>
            </div>

            <button
              className={styles.navBtn + ' ' + styles.navNext}
              onClick={(e) => {
                e.stopPropagation();
                goNext();
              }}
              aria-label="Siguiente certificado"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="9 18 15 12 9 6"></polyline>
              </svg>
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default Certifications;