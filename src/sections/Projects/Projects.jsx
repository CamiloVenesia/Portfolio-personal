import React from 'react';
import styles from './Projects.module.css';

const Projects = () => {
  const featuredProjects = [
    {
      id: 1,
      number: "01",
      title: "LaMatera",
      subtitle: "E-Commerce",
      category: "PRODUCTO FULL-STACK",
      status: "EN PRODUCCIÓN",
      description:
        "E-commerce de mates, termos y accesorios construido como una experiencia de compra completa. Integra catálogo, búsqueda, filtros, carrito persistente y un checkout conectado a Firestore con control de stock mediante transacciones.",
      features: [
        "Catálogo con búsqueda y filtros",
        "Carrito persistente",
        "Checkout conectado a Firestore",
        "Control de stock transaccional"
      ],
      tech: ["React", "Firebase", "Firestore"],
      image: "/assets/lamatera.jpg",
      github: "https://github.com/CamiloVenesia/E-Commerce-LaMatera",
      demo: "https://lamatera-arg.web.app"
    },
    {
      id: 2,
      number: "02",
      title: "Kinetic Gym",
      subtitle: "Sistema de gestión",
      category: "APLICACIÓN FULL-STACK",
      status: "EN PRODUCCIÓN",
      description:
        "Sistema de gestión para gimnasios desarrollado a partir de necesidades reales de administración. Centraliza socios, membresías, pagos y accesos dentro de una aplicación con roles, estadísticas y autogestión.",
      features: [
        "Gestión de socios y membresías",
        "Pagos y vencimientos",
        "Autenticación y control de roles",
        "Dashboard y modo kiosco"
      ],
      tech: ["Node.js", "Express", "MongoDB"],
      image: "/assets/kinetic-gym.jpg",
      github: "https://github.com/CamiloVenesia/kinetic-gym-api",
      demo: "https://kinetic-gym-api.onrender.com"
    }
  ];

  const secondaryProjects = [
    {
      id: 3,
      number: "03",
      title: "FitControl Database",
      category: "ARQUITECTURA DE DATOS",
      description:
        "Diseño y arquitectura de base de datos para la gestión de gimnasios. Incluye modelado relacional, diagramas entidad-relación y optimización de consultas.",
      tech: ["MySQL", "SQL", "Database Design"],
      image: "/assets/fitcontrol-db.png",
      github: "https://github.com/CamiloVenesia/FitControl-database",
      demo: null,
      placeholder: false
    },
    {
      id: 4,
      number: "04",
      title: "Proyecto Full-Stack",
      category: "APLICACIÓN WEB",
      description:
        "Proyecto en preparación para ampliar el portfolio con una nueva aplicación enfocada en experiencia de usuario, lógica de negocio y desarrollo de producto.",
      tech: ["Frontend", "Backend", "Database"],
      image: null,
      github: null,
      demo: null,
      placeholder: true
    },
    {
      id: 5,
      number: "05",
      title: "Producto Digital",
      category: "DESARROLLO WEB",
      description:
        "Nuevo proyecto que formará parte del portfolio, pensado para aplicar diseño de interfaces, arquitectura de aplicación y una experiencia completa de usuario.",
      tech: ["UI / UX", "Full-Stack", "Deploy"],
      image: null,
      github: null,
      demo: null,
      placeholder: true
    }
  ];

  const handleImageError = (e) => {
    e.target.style.display = 'none';
    e.target.parentElement.classList.add(styles.imageMissing);
  };

  return (
    <section className={styles.projects} id="projects">
      <div className={styles.gridBackground}></div>
      <div className={styles.glow}></div>

      <div className={styles.container}>
        <div className={styles.header} data-aos="fade-up">
          <div>
            <div className={styles.eyebrow}>
              <span></span>
              TRABAJO SELECCIONADO
            </div>

            <h2>
              Proyectos <span>seleccionados.</span>
            </h2>
          </div>

          <p>
            Aplicaciones y sistemas donde aplico desarrollo frontend, backend,
            datos y decisiones de producto para resolver problemas concretos.
          </p>
        </div>

        <div className={styles.featuredProjects}>
          {featuredProjects.map((project, index) => (
            <article
              className={styles.project}
              key={project.id}
              data-aos="fade-up"
              data-aos-delay={index * 100}
            >
              <div className={styles.projectVisual}>
                <div className={styles.browserTop}>
                  <div className={styles.browserDots}>
                    <span></span>
                    <span></span>
                    <span></span>
                  </div>

                  <span className={styles.browserLabel}>
                    {project.title.toLowerCase().replace(' ', '-')}.app
                  </span>
                </div>

                <div className={styles.imageContainer}>
                  <img
                    src={project.image}
                    alt={project.title}
                    onError={handleImageError}
                  />

                  <div className={styles.imageShade}></div>
                  <div className={styles.projectIndex}>{project.number}</div>
                </div>
              </div>

              <div className={styles.projectContent}>
                <div className={styles.meta}>
                  <span>{project.category}</span>

                  <div className={styles.status}>
                    <i></i>
                    {project.status}
                  </div>
                </div>

                <div className={styles.projectTitle}>
                  <h3>{project.title}</h3>
                  <span>{project.subtitle}</span>
                </div>

                <p className={styles.description}>
                  {project.description}
                </p>

                <div className={styles.featureList}>
                  {project.features.map((feature) => (
                    <div key={feature}>
                      <span></span>
                      {feature}
                    </div>
                  ))}
                </div>

                <div className={styles.projectFooter}>
                  <div className={styles.tech}>
                    {project.tech.map((item) => (
                      <span key={item}>{item}</span>
                    ))}
                  </div>

                  <div className={styles.actions}>
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noreferrer"
                      className={styles.secondaryBtn}
                    >
                      <svg viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 .7a11.5 11.5 0 0 0-3.64 22.41c.58.11.79-.25.79-.56v-2.23c-3.22.7-3.9-1.37-3.9-1.37-.53-1.34-1.29-1.7-1.29-1.7-1.05-.72.08-.7.08-.7 1.16.08 1.77 1.19 1.77 1.19 1.03 1.77 2.7 1.26 3.36.96.1-.75.4-1.26.73-1.55-2.57-.29-5.27-1.29-5.27-5.73 0-1.27.45-2.3 1.19-3.11-.12-.29-.52-1.47.11-3.07 0 0 .97-.31 3.17 1.19A11 11 0 0 1 12 6.04c.98 0 1.96.13 2.88.39 2.2-1.5 3.17-1.19 3.17-1.19.63 1.6.23 2.78.11 3.07.74.81 1.19 1.84 1.19 3.11 0 4.45-2.71 5.43-5.29 5.72.42.36.79 1.07.79 2.16v3.25c0 .31.21.68.8.56A11.5 11.5 0 0 0 12 .7Z"></path>
                      </svg>
                      Código
                    </a>

                    <a
                      href={project.demo}
                      target="_blank"
                      rel="noreferrer"
                      className={styles.primaryBtn}
                    >
                      Ver proyecto

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
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>

        <div className={styles.secondarySection}>
          <div className={styles.secondaryHeader} data-aos="fade-up">
            <span>OTROS PROYECTOS</span>
            <div></div>
          </div>

          <div className={styles.secondaryGrid}>
            {secondaryProjects.map((project, index) => (
              <article
                className={styles.secondaryCard}
                key={project.id}
                data-aos="fade-up"
                data-aos-delay={index * 80}
              >
                <div className={styles.secondaryImage}>
                  {project.image ? (
                    <img
                      src={project.image}
                      alt={project.title}
                      onError={handleImageError}
                    />
                  ) : (
                    <div className={styles.placeholderVisual}>
                      <div className={styles.placeholderWindow}>
                        <div className={styles.placeholderTop}>
                          <span></span>
                          <span></span>
                          <span></span>
                        </div>

                        <div className={styles.placeholderContent}>
                          <div className={styles.placeholderLine}></div>
                          <div className={styles.placeholderLine + ' ' + styles.shortLine}></div>

                          <div className={styles.placeholderBlocks}>
                            <span></span>
                            <span></span>
                            <span></span>
                          </div>
                        </div>
                      </div>

                      <small>PRÓXIMO PROYECTO</small>
                    </div>
                  )}

                  <span className={styles.secondaryNumber}>
                    {project.number}
                  </span>

                  {!project.placeholder && (
                    <div className={styles.cardOverlay}>
                      {project.github && (
                        <a
                          href={project.github}
                          target="_blank"
                          rel="noreferrer"
                        >
                          GitHub
                        </a>
                      )}

                      {project.demo && (
                        <a
                          href={project.demo}
                          target="_blank"
                          rel="noreferrer"
                        >
                          Live Demo
                        </a>
                      )}
                    </div>
                  )}
                </div>

                <div className={styles.secondaryCardContent}>
                  <span className={styles.secondaryCategory}>
                    {project.category}
                  </span>

                  <h3>{project.title}</h3>

                  <p>{project.description}</p>

                  <div className={styles.secondaryTech}>
                    {project.tech.map((item) => (
                      <span key={item}>{item}</span>
                    ))}
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Projects;