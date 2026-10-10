import React, { useState } from 'react';
import styles from './Journey.module.css';

const Journey = () => {
  const [filter, setFilter] = useState('all');

  const EducationIcon = () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 10 12 5 2 10l10 5 10-5Z"></path>
      <path d="M6 12.5V17c3.5 2.7 8.5 2.7 12 0v-4.5"></path>
    </svg>
  );

  const ExperienceIcon = () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="7" width="18" height="13" rx="2"></rect>
      <path d="M8 7V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
      <path d="M3 12h18"></path>
    </svg>
  );

  const timelineData = [
    {
      id: 11,
      type: 'edu',
      year: "Ingreso 2027",
      current: false,
      title: "Tecnicatura Universitaria en Desarrollo Web",
      org: "Facultad de Ciencias de la Administración — UNER",
      description:
        "Tecnicatura universitaria a distancia de 2 años y medio, orientada a la planificación, diseño, desarrollo e implementación de aplicaciones y servicios web. Preinscripción realizada en octubre de 2026.",
      tech: [
        "Programación",
        "Ingeniería de Software",
        "Redes",
        "Aplicaciones Web",
        "Servicios Web"
      ]
    },
    {
      id: 1,
      type: 'exp',
      year: "2026 - Actualidad",
      current: true,
      title: "Full Stack Developer",
      org: "LaMatera",
      description:
        "Desarrollo de un e-commerce de mates, termos y accesorios con catálogo, búsqueda, filtros, carrito persistente y checkout conectado a Firestore.",
      tech: [
        "React",
        "Firebase",
        "Firestore"
      ]
    },
    {
      id: 2,
      type: 'exp',
      year: "2026",
      current: false,
      title: "Full Stack Developer",
      org: "Kinetic Gym",
      description:
        "Desarrollo y despliegue de un sistema de gestión para gimnasios con socios, membresías, pagos, roles, estadísticas, autenticación y modo kiosco.",
      tech: [
        "Node.js",
        "Express",
        "MongoDB"
      ]
    },
    {
      id: 3,
      type: 'exp',
      year: "Jul - Sep 2026",
      current: false,
      title: "ShipNow — API de Gestión Logística",
      org: "Proyecto final · Back-End III · Coderhouse",
      description:
        "API REST para gestión de usuarios, pedidos y entregas, desarrollada de forma incremental durante el proyecto final del curso.",
      tech: [
        "Node.js",
        "Express",
        "MongoDB"
      ]
    },
    {
      id: 4,
      type: 'edu',
      year: "Jul - Sep 2026",
      current: false,
      title: "Programación Backend III: Testing y Escalabilidad",
      org: "Coderhouse",
      description:
        "Etapa final de la formación Back-End, enfocada en testing, optimización, arquitectura y escalabilidad de aplicaciones.",
      tech: [
        "Testing",
        "Escalabilidad",
        "MongoDB"
      ]
    },
    {
      id: 5,
      type: 'edu',
      year: "May - Jul 2026",
      current: false,
      title: "Programación Backend II: Diseño y Arquitectura",
      org: "Coderhouse",
      description:
        "Formación enfocada en diseño y arquitectura de aplicaciones escalables dentro del ecosistema Back-End.",
      tech: [
        "Arquitectura",
        "Node.js",
        "MongoDB"
      ]
    },
    {
      id: 6,
      type: 'edu',
      year: "Feb - Abr 2026",
      current: false,
      title: "Programación Backend I: Desarrollo Avanzado",
      org: "Coderhouse",
      description:
        "Formación en desarrollo de APIs, lógica de servidor y construcción de aplicaciones con Node.js y Express.",
      tech: [
        "Node.js",
        "Express",
        "APIs"
      ]
    },
    {
      id: 7,
      type: 'exp',
      year: "2025 - Actualidad",
      current: true,
      title: "Full Stack Developer Freelance",
      org: "Proyectos independientes",
      description:
        "Desarrollo de soluciones web personalizadas trabajando interfaces, lógica de negocio, APIs y bases de datos.",
      tech: [
        "React",
        "JavaScript",
        "Node.js"
      ]
    },
    {
      id: 8,
      type: 'edu',
      year: "2025",
      current: false,
      title: "Desarrollo Front-End",
      org: "Coderhouse",
      description:
        "Formación y certificación en desarrollo de interfaces web modernas con React, JavaScript y herramientas del ecosistema Front-End.",
      tech: [
        "React",
        "JavaScript",
        "CSS Modules"
      ]
    },
    {
      id: 9,
      type: 'exp',
      year: "2023",
      current: false,
      title: "Pasante de Soporte Técnico Informático",
      org: "Pasantía técnica",
      description:
        "Mantenimiento preventivo, resolución de fallas de hardware y software y optimización de sistemas operativos.",
      tech: [
        "Mantenimiento",
        "Soporte",
        "Sistemas"
      ]
    },
    {
      id: 10,
      type: 'edu',
      year: "2023",
      current: false,
      title: "Técnico Informático",
      org: "Educación Secundaria Técnica",
      description:
        "Formación integral en informática, hardware, redes, sistemas y fundamentos de programación.",
      tech: [
        "Lógica",
        "Hardware",
        "Redes"
      ]
    }
  ];

  const filteredData =
    filter === 'all'
      ? timelineData
      : timelineData.filter((item) => item.type === filter);

  return (
    <section className={styles.journey} id="journey">
      <div className={styles.gridBackground}></div>
      <div className={styles.journeyBlob}></div>

      <div className={styles.container}>
        <div className={styles.header} data-aos="fade-up">
          <div>
            <div className={styles.eyebrow}>
              <span></span>
              MI RECORRIDO
            </div>

            <h2 className={styles.title}>
              Experiencia & formación
              <span> en evolución.</span>
            </h2>
          </div>

          <div className={styles.headerRight}>
            <p>
              Experiencia práctica y formación continua, ordenadas en una línea
              de tiempo que muestra cómo fui ampliando mi perfil profesional.
            </p>

            <div className={styles.filterTabs}>
              <button
                className={styles.tab + (filter === 'all' ? ' ' + styles.tabActive : '')}
                onClick={() => setFilter('all')}
              >
                Todo
              </button>

              <button
                className={styles.tab + (filter === 'edu' ? ' ' + styles.tabActive : '')}
                onClick={() => setFilter('edu')}
              >
                Educación
              </button>

              <button
                className={styles.tab + (filter === 'exp' ? ' ' + styles.tabActive : '')}
                onClick={() => setFilter('exp')}
              >
                Experiencia
              </button>
            </div>
          </div>
        </div>

        <div className={styles.timelinePanel}>
          <div className={styles.timelineLine}></div>

          {filteredData.map((item, index) => (
            <article
              className={styles.timelineItem}
              key={item.id}
              data-aos="fade-up"
              data-aos-delay={Math.min(index * 45, 250)}
            >
              <div className={styles.meta}>
                <span className={styles.year}>{item.year}</span>

                <span
                  className={
                    styles.typeTag +
                    ' ' +
                    (item.type === 'edu' ? styles.typeEdu : styles.typeExp)
                  }
                >
                  {item.type === 'edu' ? 'Educación' : 'Experiencia'}
                </span>
              </div>

              <div
                className={
                  styles.node +
                  ' ' +
                  (item.type === 'edu' ? styles.nodeEdu : styles.nodeExp)
                }
              >
                {item.type === 'edu' ? <EducationIcon /> : <ExperienceIcon />}

                {item.current && (
                  <span className={styles.pulse}></span>
                )}
              </div>

              <div className={styles.card}>
                <div className={styles.cardHeading}>
                  <div>
                    <h3>{item.title}</h3>
                    <p className={styles.org}>{item.org}</p>
                  </div>

                  {item.current && (
                    <div className={styles.currentLabel}>
                      <span></span>
                      ACTUAL
                    </div>
                  )}
                </div>

                <p className={styles.description}>
                  {item.description}
                </p>

                <div className={styles.badges}>
                  {item.tech.map((tech) => (
                    <span key={tech}>{tech}</span>
                  ))}
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Journey;