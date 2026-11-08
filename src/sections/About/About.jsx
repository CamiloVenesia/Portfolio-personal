import React, { useState } from 'react';
import styles from './About.module.css';
import { scrollToSection } from '../../utils/scrollToSection';

const projects = [
  {
    id: 'matera',
    number: '01',
    name: 'La Matera',
    category: 'COMERCIO ELECTRÓNICO',
    headline: 'Una experiencia de compra, de principio a fin.',
    description:
      'Una tienda online de mates, termos y accesorios que conecta la experiencia de compra con la gestión del negocio. El proyecto integra catálogo, búsqueda, filtros y carrito persistente, junto con la administración de productos, pedidos y stock.',
    focus: [
      'Catálogo y filtros',
      'Carrito persistente',
      'Productos, pedidos y stock'
    ]
  },
  {
    id: 'kinetic',
    number: '02',
    name: 'Kinetic Gym',
    category: 'GESTIÓN DE GIMNASIOS',
    headline: 'Toda la operación de un gimnasio, conectada.',
    description:
      'Un sistema que centraliza la gestión de socios, membresías, pagos y accesos. Incluye autenticación, roles y permisos, estadísticas, panel administrativo y un modo kiosco para agilizar las operaciones.',
    focus: [
      'Socios y membresías',
      'Pagos y accesos',
      'Administración y kiosco'
    ]
  },
  {
    id: 'ritmo',
    number: '03',
    name: 'RITMO PÁDEL',
    category: 'RESERVAS DEPORTIVAS',
    headline: 'La experiencia de reservar también importa.',
    description:
      'Una plataforma para un club de pádel con cuatro canchas interactivas. Permite consultar disponibilidad, gestionar turnos de 90 minutos y acceder a cuentas de usuario, historial de reservas y administración.',
    focus: [
      'Disponibilidad por fecha',
      'Escena 3D interactiva',
      'Reservas e historial'
    ]
  },
  {
    id: 'delivery',
    number: '04',
    name: 'DeliveryOps',
    category: 'OPERACIONES LOGÍSTICAS',
    headline: 'Del depósito al destino, con todo bajo control.',
    description:
      'Una plataforma que conecta pedidos, depósitos y repartidores para organizar operaciones logísticas. Incorpora despacho, seguimiento GPS, comprobantes de entrega, planificación de rutas y métricas operativas.',
    focus: [
      'Despacho y seguimiento GPS',
      'Comprobantes de entrega',
      'Rutas y métricas'
    ]
  },
  {
    id: 'nexo',
    number: '05',
    name: 'NEXO CRM',
    category: 'GESTIÓN COMERCIAL',
    headline: 'Las relaciones comerciales, en un mismo lugar.',
    description:
      'Un CRM multiusuario para organizar empresas, contactos, oportunidades comerciales, tareas y actividades. Integra calendario, mensajería interna, notificaciones, reportes y un modo demo con datos ficticios aislados.',
    focus: [
      'Empresas y oportunidades',
      'Calendario y mensajería',
      'Reportes y modo demo'
    ]
  }
];

const ArrowIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <path d="M7 17 17 7M7 7h10v10" />
  </svg>
);

const About = () => {
  const [activeProjectIndex, setActiveProjectIndex] = useState(0);

  const activeProject = projects[activeProjectIndex];

  const handleContactClick = (event) => {
    scrollToSection(event, 'contact');
  };

  return (
    <section
      className={styles.about}
      id="about"
      aria-labelledby="about-title"
    >
      <div className={styles.backgroundGrid} aria-hidden="true"></div>
      <div className={styles.glowOne} aria-hidden="true"></div>
      <div className={styles.glowTwo} aria-hidden="true"></div>

      <div className={styles.container}>
        {/* PRESENTACIÓN */}

        <header className={styles.sectionHeader} data-aos="fade-up">
          <div className={styles.eyebrow}>
            <span className={styles.eyebrowDot}></span>
            PERFIL PROFESIONAL
          </div>

          <div className={styles.headerGrid}>
            <h2 className={styles.title} id="about-title">
              De la informática
              <span className={styles.titleAccent}>
                al desarrollo de productos.
              </span>
            </h2>

            <div className={styles.headerAside}>
              <span className={styles.asideLabel}>CAMINO FULL-STACK</span>

              <p>
                Soy Camilo Venesia, desarrollador Full Stack radicado en
                Rosario. Me interesa comprender cómo se conectan las distintas
                partes de una aplicación para convertir una necesidad en una
                herramienta útil.
              </p>

              <div className={styles.locationLine}>
                <span className={styles.locationDot}></span>
                Rosario, Argentina
                <span className={styles.locationSeparator}>/</span>
                Desarrollo web
              </div>
            </div>
          </div>
        </header>

        {/* MI HISTORIA - SE CONSERVA */}

        <div className={styles.story} data-aos="fade-up">
          <div className={styles.sectionMarker}>
            <span className={styles.markerNumber}>01</span>
            <span className={styles.markerLabel}>MI HISTORIA</span>
          </div>

          <div className={styles.storyContent}>
            <p className={styles.storyLead}>
              Mi recorrido comenzó con una{' '}
              <strong>formación técnica en informática</strong>. Ese punto de
              partida despertó mi interés por entender no solo lo que una
              aplicación muestra, sino también todo lo que sucede detrás.
            </p>

            <div className={styles.storyColumns}>
              <p>
                Me fui formando en desarrollo web desde el frontend, trabajando
                con interfaces y experiencia de usuario, y amplié ese camino
                hacia el backend: APIs, lógica de negocio, autenticación, bases
                de datos y despliegue.
              </p>

              <p>
                Aprendo construyendo. Cada proyecto independiente me permite
                enfrentar un contexto distinto, tomar decisiones técnicas y
                llevar lo aprendido a funcionalidades concretas. Esa
                combinación entre curiosidad, práctica y mejora continua es la
                que quiero seguir desarrollando.
              </p>
            </div>
          </div>
        </div>

        {/* EXPLORADOR DE PROYECTOS */}

        <section
          className={styles.projectExperience}
          aria-labelledby="projects-title"
        >
          <div className={styles.experienceIntro} data-aos="fade-up">
            <div className={styles.sectionMarker}>
              <span className={styles.markerNumber}>02</span>
              <span className={styles.markerLabel}>EXPERIENCIA APLICADA</span>
            </div>

            <div className={styles.experienceHeading}>
              <h3 id="projects-title">
                Distintos desafíos.
                <span>Una misma pasión por construir.</span>
              </h3>

              <p>
                Cada proyecto nace de una necesidad diferente. Estos son
                algunos de los productos que desarrollé para transformar
                procesos cotidianos en experiencias digitales.
              </p>
            </div>
          </div>

          <div className={styles.projectExplorer}>
            {/* NAVEGACIÓN */}

            <div
              className={styles.projectSelector}
              role="group"
              aria-label="Explorar proyectos"
            >
              {projects.map((project, index) => (
                <button
                  key={project.id}
                  type="button"
                  className={`${styles.projectTab} ${
                    activeProjectIndex === index ? styles.projectTabActive : ''
                  }`}
                  onClick={() => setActiveProjectIndex(index)}
                  aria-pressed={activeProjectIndex === index}
                >
                  <span className={styles.selectorNumber}>
                    {project.number}
                  </span>

                  <span className={styles.selectorName}>
                    {project.name}
                  </span>
                </button>
              ))}
            </div>

            {/* LÍNEA DE PROGRESO */}

            <div
              className={styles.projectProgress}
              role="progressbar"
              aria-label="Proyecto seleccionado"
              aria-valuemin={1}
              aria-valuemax={projects.length}
              aria-valuenow={activeProjectIndex + 1}
            >
              <span
                className={styles.projectProgressFill}
                style={{
                  '--project-progress': `${
                    ((activeProjectIndex + 1) / projects.length) * 100
                  }%`
                }}
              ></span>
            </div>

            {/* CONTENIDO DINÁMICO */}

            <div
              className={styles.projectStage}
              aria-live="polite"
              aria-atomic="true"
            >
              <div className={styles.projectIndex} aria-hidden="true">
                <span className={styles.projectIndexKicker}>
                  PROYECTO SELECCIONADO
                </span>

                <span className={styles.projectIndexNumber}>
                  {activeProject.number}
                </span>

                <span className={styles.projectIndexName}>
                  {activeProject.name}
                </span>

                <span className={styles.projectIndexFooter}>
                  PORTFOLIO / 2026
                </span>
              </div>

              <article
                className={styles.projectDetails}
                key={activeProject.id}
              >
                <div className={styles.projectDetailsTop}>
                  <span className={styles.projectCategory}>
                    {activeProject.category}
                  </span>

                  <span className={styles.projectCounter}>
                    {activeProject.number} / 05
                  </span>
                </div>

                <h4 className={styles.projectHeadline}>
                  {activeProject.headline}
                </h4>

                <p className={styles.projectDescription}>
                  {activeProject.description}
                </p>

                <div className={styles.projectFocus}>
                  <span className={styles.focusLabel}>
                    FUNCIONALIDADES PRINCIPALES
                  </span>

                  <ul>
                    {activeProject.focus.map((item, index) => (
                      <li
                        key={item}
                        style={{
                          '--focus-delay': `${index * 100}ms`
                        }}
                      >
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </article>
            </div>

            {/* INDICACIÓN DE INTERACCIÓN */}

            <div className={styles.explorerFooter}>
              <span>SELECCIONÁ UN PROYECTO PARA EXPLORARLO</span>

              <span className={styles.explorerDots}>
                {projects.map((project, index) => (
                  <span
                    key={project.id}
                    className={
                      activeProjectIndex === index
                        ? styles.explorerDotActive
                        : ''
                    }
                  ></span>
                ))}
              </span>
            </div>
          </div>
        </section>

        {/* CIERRE PROFESIONAL */}

        <footer className={styles.closing} data-aos="fade-up">
          <div className={styles.closingHeader}>
            <div className={styles.sectionMarker}>
              <span className={styles.markerNumber}>03</span>
              <span className={styles.markerLabel}>
                EN CONSTANTE EVOLUCIÓN
              </span>
            </div>

            <span className={styles.closingAside}>
              SIEMPRE HAY ALGO NUEVO POR CONSTRUIR
            </span>
          </div>

          <div className={styles.closingBody}>
            <h3 className={styles.closingTitle}>
              Me interesa construir tecnología que
              <span> resuelva problemas reales.</span>
            </h3>

            <div className={styles.closingBottom}>
              <p>
                Busco seguir creciendo en entornos donde pueda aportar una
                mirada Full Stack, asumir nuevos desafíos y participar en la
                construcción de productos digitales sólidos y útiles.
              </p>

              <a
                className={styles.closingLink}
                href="#contact"
                onClick={handleContactClick}
              >
                Hablemos
                <ArrowIcon />
              </a>
            </div>
          </div>
        </footer>
      </div>
    </section>
  );
};

export default About;