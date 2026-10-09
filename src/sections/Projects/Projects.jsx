import React from 'react';
import styles from './Projects.module.css';

const Projects = () => {
    const projectsData = [
        {
            id: 1,
            title: "LaMatera E-Commerce",
            description:
                "Tienda online de mates, termos y accesorios conectada a Firestore. Catálogo con filtros y búsqueda, carrito persistente y checkout con control de stock mediante transacciones atómicas, evitando órdenes sin stock disponible.",
            tech: ["React", "Firebase", "Firestore"],
            image: "/assets/lamatera.jpg",
            github: "https://github.com/CamiloVenesia/E-Commerce-LaMatera",
            demo: "https://lamatera-arg.web.app"
        },
        {
            id: 2,
            title: "Kinetic Gym",
            description:
                "Sistema full-stack de gestión para gimnasios, desarrollado a partir de necesidades reales de administración. Incluye gestión de socios, membresías y pagos, control de roles, dashboard con estadísticas, exportación de datos y modo kiosco para autogestión.",
            tech: ["Node.js", "Express", "MongoDB"],
            image: "/assets/kinetic-gym.jpg",
            github: "https://github.com/CamiloVenesia/kinetic-gym-api",
            demo: "https://kinetic-gym-api.onrender.com"
        },
        {
            id: 3,
            title: "FitControl Database",
            description:
                "Diseño y arquitectura de base de datos para la gestión de gimnasios. Incluye modelado relacional, diagramas entidad-relación y optimización de consultas.",
            tech: ["MySQL", "SQL", "Database Design"],
            image: "/assets/fitcontrol-db.png",
            github: "https://github.com/CamiloVenesia/FitControl-database",
            demo: "#"
        },
    ];

    const handleImageError = (e) => {
        e.target.style.display = 'none';
        e.target.parentElement.classList.add(styles.imageMissing);
    };

    return (
        <section className={styles.projects} id="projects">
            <div className={styles.titleContainer} data-aos="fade-down">
                <svg
                    className={styles.titleIcon}
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                >
                    <polyline points="16 18 22 12 16 6"></polyline>
                    <polyline points="8 6 2 12 8 18"></polyline>
                </svg>

                <h2 className={styles.title}>
                    Mis <span>Proyectos</span>
                </h2>
            </div>

            <div className={styles.grid}>
                {projectsData.map((project, index) => (
                    <div
                        className={styles.card}
                        key={project.id}
                        data-aos="fade-up"
                        data-aos-delay={index * 100}
                    >
                        <div className={styles.imageContainer}>
                            <img
                                src={project.image}
                                alt={project.title}
                                onError={handleImageError}
                            />

                            <div className={styles.overlay}>
                                <a
                                    href={project.github}
                                    target="_blank"
                                    rel="noreferrer"
                                    className={styles.linkBtn}
                                >
                                    GitHub
                                </a>

                                {project.demo !== "#" && (
                                    <a
                                        href={project.demo}
                                        target="_blank"
                                        rel="noreferrer"
                                        className={styles.linkBtn}
                                    >
                                        Live Demo
                                    </a>
                                )}
                            </div>
                        </div>

                        <div className={styles.content}>
                            <h3>{project.title}</h3>

                            <p>{project.description}</p>

                            <div className={styles.badges}>
                                {project.tech.map((t, i) => (
                                    <span key={i}>{t}</span>
                                ))}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default Projects;