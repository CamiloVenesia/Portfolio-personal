import React from 'react';
import styles from './Projects.module.css';

const Projects = () => {
    // Array con tus 3 proyectos principales
    const projectsData = [
        {
            id: 1,
            title: "FitControl Database",
            description: "Diseño y arquitectura de base de datos para la gestión de gimnasios. Incluye modelado relacional, diagramas entidad-relación y optimización de consultas.",
            tech: ["MySQL", "SQL", "Database Design"],
            image: "/assets/fitcontrol-db.png", 
            github: "https://github.com/CamiloVenesia/FitControl-database", 
            demo: "#" 
        },
        {
            id: 2,
            title: "LaMatera E-Commerce",
            description: "Plataforma de ventas online de mates y accesorios. Cuenta con carrito de compras integrado, panel de administración y diseño totalmente responsivo.",
            tech: ["React", "Express", "JavaScript"],
            image: "/assets/lamatera.jpg", 
            github: "https://github.com/camilovenesia", 
            demo: "#"
        },
        {
            id: 3,
            title: "Menú Digital Interactivo",
            description: "Menú digital moderno y dinámico para restaurantes. Diseñado para mejorar la experiencia del cliente al escanear y ordenar desde dispositivos móviles.",
            tech: ["HTML", "CSS", "JavaScript"],
            image: "/assets/menu.jpg", 
            github: "https://github.com/camilovenesia",
            demo: "#"
        }
    ];

    return (
        <section className={styles.projects} id="projects">
            {/* TÍTULO UNIFICADO CON EL SISTEMA DE DISEÑO */}
            <div className={styles.titleContainer} data-aos="fade-down">
                <svg className={styles.titleIcon} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="16 18 22 12 16 6"></polyline>
                    <polyline points="8 6 2 12 8 18"></polyline>
                </svg>
                <h2 className={styles.title}>Mis <span>Proyectos</span></h2>
            </div>

            <div className={styles.grid}>
                {projectsData.map((project, index) => (
                    <div className={styles.card} key={project.id} data-aos="fade-up" data-aos-delay={index * 100}>
                        <div className={styles.imageContainer}>
                            {/* Fondo oscuro acorde a tu paleta si la imagen no carga */}
                            <img 
                                src={project.image} 
                                alt={project.title} 
                                onError={(e) => { 
                                    e.target.onerror = null; 
                                    e.target.src = "https://via.placeholder.com/600x400/050d18/00aaff?text=Proyecto+Camilo" 
                                }} 
                            />
                            <div className={styles.overlay}>
                                <a href={project.github} target="_blank" rel="noreferrer" className={styles.linkBtn}>GitHub</a>
                                
                                {/* CONDICIONAL: El botón de Demo solo se renderiza si el link no es "#" */}
                                {project.demo !== "#" && (
                                    <a href={project.demo} target="_blank" rel="noreferrer" className={styles.linkBtn}>Live Demo</a>
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