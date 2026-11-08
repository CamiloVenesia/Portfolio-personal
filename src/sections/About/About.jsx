
import React, { useState } from 'react';
import styles from './About.module.css';
import { scrollToSection } from '../../utils/scrollToSection';

const projects = [
  {
    id: 'lamatera',
    number: '01',
    name: 'La Matera',
    category: 'E-COMMERCE · FULL-STACK',
    description:
      'Este proyecto me permitió experimentar con el desarrollo de un producto digital de punta a punta. Profundicé en la integración de servicios externos, la persistencia de datos y la construcción de flujos comerciales completos. Aprendí especialmente a conectar la experiencia del usuario con operaciones críticas como el checkout y el control de stock.',
    learnings: [
      'Integración con Firebase y Firestore',
      'Persistencia y consistencia de datos',
      'Lógica comercial y transacciones'
    ],
    code: 'https://github.com/CamiloVenesia/E-Commerce-LaMatera'
  },
  {
    id: 'kinetic',
    number: '02',
    name: 'Kinetic Gym',
    category: 'GESTIÓN DE GIMNASIOS · FULL-STACK',
    description:
      'Fue una oportunidad para profundizar en el desarrollo backend y comprender cómo organizar la lógica de negocio de una aplicación completa. Trabajé con APIs, autenticación, permisos y persistencia en MongoDB. También incorporé funcionalidades operativas como el sistema de acceso mediante kiosco, aprendiendo a conectar distintos flujos dentro de una misma plataforma.',
    learnings: [
      'Diseño e integración de APIs REST',
      'Autenticación y control de permisos',
      'MongoDB y lógica de negocio'
    ],
    code: 'https://github.com/CamiloVenesia/kinetic-gym-api'
  },
  {
    id: 'deliveryops',
    number: '03',
    name: 'DeliveryOps',
    category: 'OPERACIONES LOGÍSTICAS · FULL-STACK',
    description:
      'Este desarrollo me llevó a trabajar con procesos más complejos, donde distintas partes del sistema deben mantenerse coordinadas. Profundicé en el modelado de operaciones logísticas, la gestión de estados, la geolocalización y el seguimiento de entregas. Me permitió comprender la importancia de la consistencia de datos y de diseñar sistemas que acompañen procesos reales.',
    learnings: [
      'Modelado de procesos logísticos',
      'Geolocalización y seguimiento GPS',
      'Arquitectura y trazabilidad operativa'
    ],
    code: 'https://github.com/CamiloVenesia/deliveryops-api',
    extraCode: 'https://github.com/CamiloVenesia/deliveryops-web'
  },
  {
    id: 'nexo',
    number: '04',
    name: 'NEXO CRM',
    category: 'GESTIÓN COMERCIAL · WEB APP',
    description:
      'Uno de los proyectos que más me permitió profundizar en arquitectura de software. Trabajé con Supabase, PostgreSQL y políticas de seguridad a nivel de base de datos para construir una estructura multiusuario y multiempresa. También incorporé roles, mensajería, calendario y un entorno demo aislado. Me llevé una comprensión mucho más sólida de la importancia de la seguridad desde el diseño.',
    learnings: [
      'Arquitectura multi-tenant y RLS',
      'PostgreSQL y seguridad de datos',
      'Roles, permisos y aislamiento'
    ],
    code: 'https://github.com/CamiloVenesia/nexo-crm'
  },
  {
    id: 'ritmo',
    number: '05',
    name: 'RITMO PÁDEL',
    category: 'RESERVAS DEPORTIVAS · FULL-STACK',
    description:
      'Este proyecto me permitió profundizar en PostgreSQL, el modelado de reservas y la gestión de disponibilidad. Trabajé especialmente en pruebas unitarias y de integración, validación de operaciones y estabilidad del sistema. También exploré experiencias visuales más complejas mediante escenarios interactivos en 3D. Aprendí a equilibrar diseño, funcionalidad y confiabilidad.',
    learnings: [
      'PostgreSQL y modelado relacional',
      'Testing unitario y de integración',
      'Experiencias interactivas en 3D'
    ],
    code: 'https://github.com/CamiloVenesia/ritmo-padel'
  }
];

const ArrowIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <path
      d="M5 12h14M12 5l7 7-7 7"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const ExternalIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <path
      d="M14 5h5v5M19 5l-9 9"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M18 13v5a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h5"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const About = () => {
  const [activeProjectIndex, setActiveProjectIndex] = useState(0);
  const activeProject = projects[activeProjectIndex];

  const handleProjectsClick = (event) => {
    scrollToSection(event, 'projects');
  };

  const handleContactClick = (event) => {
    scrollToSection(event, 'contact');
  };

  return (
    <section className={styles.about} id="about" aria-labelledby="about-title">
      <div className={styles.backgroundGlow} aria-hidden="true" />

      <h2 className={styles.visuallyHidden} id="about-title">
        Sobre mí
      </h2>

      <div className={styles.container}>
        <section
          className={styles.story}
          data-aos="fade-up"
          aria-labelledby="story-title"
        >
          <div className={styles.sectionMarker}>
            <span className={styles.markerNumber}>01</span>
            <h3 className={styles.markerLabel} id="story-title">
              MI HISTORIA
            </h3>
          </div>

          <div className={styles.storyContent}>
            <p className={styles.storyLead}>
              Mi camino en el desarrollo comenzó durante la{' '}
              <strong>escuela secundaria técnica</strong>, cuando elegí la
              orientación en <strong>Programación</strong>. Allí tuve mis
              primeros acercamientos a la lógica, el pensamiento computacional
              y la resolución de problemas, y descubrí mi interés por crear
              soluciones mediante código. Más adelante continué formándome en{' '}
              <strong>Coderhouse</strong> y, en paralelo, de manera autónoma:
              realicé cursos, exploré nuevas tecnologías y llevé lo aprendido
              a proyectos propios. Esa combinación de{' '}
              <strong>formación estructurada</strong> y{' '}
              <strong>práctica independiente</strong> me permitió ampliar mis
              conocimientos y consolidar una forma de aprender que sigo
              aplicando: <strong>investigar, experimentar y construir.</strong>
            </p>

            <div className={styles.storyColumns}>
              <p>
                Me fui formando en desarrollo web desde el frontend,
                trabajando con interfaces y experiencia de usuario, y amplié
                ese camino hacia el backend: APIs, lógica de negocio,
                autenticación, bases de datos y despliegue.
              </p>

              <p>
                 Aprendo construyendo. Cada proyecto independiente me permite
                enfrentar un contexto distinto, tomar decisiones técnicas y
                llevar lo aprendido a funcionalidades concretas. Esa
                combinación entre curiosidad, práctica y mejora continua es
                la que quiero seguir desarrollando.
              </p>
            </div>
          </div>
        </section>

        <section
          className={styles.projectSection}
          aria-labelledby="projects-title"
        >
          <div className={styles.projectHeading} data-aos="fade-up">
            <div className={styles.sectionMarker}>
              <span className={styles.markerNumber}>02</span>
              <span className={styles.markerLabel}>EXPERIENCIA</span>
            </div>

            <div>
              <h3 className={styles.projectSectionTitle} id="projects-title">
                Lo que construí. Lo que aprendí.
              </h3>

              <p className={styles.projectSectionDescription}>
                Cada proyecto fue una oportunidad para enfrentar nuevos desafíos
                y ampliar mis conocimientos.
              </p>
            </div>
          </div>

          <div
            className={styles.projectSelector}
            role="group"
            aria-label="Seleccionar experiencia"
          >
            {projects.map((project, index) => {
              const isActive = activeProjectIndex === index;

              return (
                <button
                  key={project.id}
                  type="button"
                  className={`${styles.projectTab} ${
                    isActive ? styles.projectTabActive : ''
                  }`}
                  onClick={() => setActiveProjectIndex(index)}
                  aria-pressed={isActive}
                >
                  <span className={styles.selectorNumber}>
                    {project.number}
                  </span>

                  <span className={styles.selectorName}>
                    {project.name}
                  </span>
                </button>
              );
            })}
          </div>

          <div
            className={styles.projectStage}
            aria-live="polite"
            aria-atomic="true"
          >
            <div className={styles.projectVisual} aria-hidden="true">
              <span
                key={activeProject.id}
                className={styles.projectNumber}
              >
                {activeProject.number}
              </span>
            </div>

            <article
              className={styles.projectDetails}
              key={activeProject.id}
            >
              <div className={styles.projectMeta}>
                <span className={styles.projectCategory}>
                  {activeProject.category}
                </span>

                <span className={styles.projectCounter}>
                  {activeProject.number} /{' '}
                  {String(projects.length).padStart(2, '0')}
                </span>
              </div>

              <h4 className={styles.projectName}>
                {activeProject.name}
              </h4>

              <p className={styles.projectDescription}>
                {activeProject.description}
              </p>

              <span className={styles.learningLabel}>
                CONOCIMIENTOS Y EXPERIENCIA
              </span>

              <ul className={styles.projectLearnings}>
                {activeProject.learnings.map((learning) => (
                  <li key={learning}>{learning}</li>
                ))}
              </ul>

              <div className={styles.projectActions}>
                <a
                  className={`${styles.projectAction} ${styles.projectActionPrimary}`}
                  href="#projects"
                  onClick={handleProjectsClick}
                  aria-label={`Ver ${activeProject.name} en la sección de proyectos`}
                >
                  <span>Ver proyecto</span>
                  <span className={styles.actionIcon}>
                    <ArrowIcon />
                  </span>
                </a>

                <a
                  className={`${styles.projectAction} ${styles.projectActionSecondary}`}
                  href={activeProject.code}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Ver código de ${activeProject.name} en GitHub`}
                >
                  Código
                  <ExternalIcon />
                </a>

                {activeProject.extraCode && (
                  <a
                    className={`${styles.projectAction} ${styles.projectActionSecondary}`}
                    href={activeProject.extraCode}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Ver código frontend de DeliveryOps en GitHub"
                  >
                    Código web
                    <ExternalIcon />
                  </a>
                )}
              </div>
            </article>
          </div>
        </section>

        <div className={styles.closing} data-aos="fade-up">
          <p>¿Tenés una idea o un desafío?</p>

          <a href="#contact" onClick={handleContactClick}>
            Hablemos
            <ArrowIcon />
          </a>
        </div>
      </div>
    </section>
  );
};

export default About;
