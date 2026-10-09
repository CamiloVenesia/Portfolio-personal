import React, { useState } from 'react';
import styles from './Journey.module.css';


const Journey = () => {

    const [filter, setFilter] = useState('all');


    const EducationIcon = () => (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
        >
            <path d="M12 3L1 9l4 2.18v6L12 21l7-3.82v-6l2.81-1.53V17h2V8.46L12 3zm6.82 6L12 12.72 5.18 9 12 5.28 18.82 9zM17 15.99l-5 2.73-5-2.73v-3.72l5 2.73 5-2.73v3.72z"/>
        </svg>
    );


    const ExperienceIcon = () => (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
        >
            <path d="M20 6h-4V4c0-1.11-.89-2-2-2h-4c-1.11 0-2 .89-2 2v2H4c-1.11 0-1.99.89-1.99 2L2 19c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V8c0-1.11-.89-2-2-2zm-6 0h-4V4h4v2z"/>
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
                "Tecnicatura universitaria a distancia de 2 años y medio, orientada a la planificación, diseño, desarrollo e implementación de aplicaciones y servicios web. La formación integra bases teóricas y prácticas en programación, ingeniería de software, redes y tecnologías aplicadas al desarrollo web. Preinscripción realizada en octubre de 2026.",
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
                "Desarrollo de un e-commerce de mates, termos y accesorios con React y Firebase. Incluye catálogo con búsqueda y filtros, carrito persistente y checkout conectado a Firestore con control de stock mediante transacciones.",
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
                "Desarrollo y despliegue de un sistema full-stack de gestión para gimnasios. Incluye administración de socios, membresías y pagos, dashboard con estadísticas, control de roles, exportación a CSV, autenticación JWT y modo kiosco de autogestión.",
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
            org: "Proyecto final, curso Back-End III (Coderhouse)",
            description:
                "API REST construida con Node.js, Express y MongoDB para gestión de usuarios, pedidos y entregas. Desarrollada de forma incremental a lo largo de 8 pre-entregas hasta la entrega final.",
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
                "Etapa final de la especialización en Back-End, enfocada en testing, optimización, arquitectura y escalabilidad de aplicaciones.",
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
                "Segunda etapa de la especialización en Back-End, enfocada en diseño y arquitectura de aplicaciones escalables.",
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
                "Primera etapa de la especialización en Back-End, enfocada en desarrollo de APIs, lógica de servidor y aplicaciones con Node.js y Express.",
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
                "Desarrollo de soluciones web y aplicaciones personalizadas, trabajando en interfaces, lógica de negocio, APIs y bases de datos.",
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
                "Formación y certificación en desarrollo de interfaces web modernas utilizando React, JavaScript y herramientas del ecosistema Front-End.",
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
            : timelineData.filter(
                item =>
                    item.type === filter
            );


    return (

        <section
            className={styles.journey}
            id="journey"
        >

            <div
                className={styles.journeyBlob}
            ></div>


            <div
                className={styles.titleContainer}
                data-aos="fade-down"
            >

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
                    <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
                </svg>


                <h2
                    className={styles.title}
                >
                    Mi <span>Recorrido</span>
                </h2>

            </div>


            <div
                className={styles.filterTabs}
                data-aos="fade-up"
            >

                <button
                    className={
                        styles.tab +
                        (
                            filter === 'all'
                                ? ' ' + styles.tabActive
                                : ''
                        )
                    }
                    onClick={() =>
                        setFilter('all')
                    }
                >
                    Todo
                </button>


                <button
                    className={
                        styles.tab +
                        (
                            filter === 'edu'
                                ? ' ' + styles.tabActive
                                : ''
                        )
                    }
                    onClick={() =>
                        setFilter('edu')
                    }
                >
                    Educación
                </button>


                <button
                    className={
                        styles.tab +
                        (
                            filter === 'exp'
                                ? ' ' + styles.tabActive
                                : ''
                        )
                    }
                    onClick={() =>
                        setFilter('exp')
                    }
                >
                    Experiencia
                </button>

            </div>


            <div
                className={styles.timeline}
            >

                {filteredData.map(
                    (item, index) => (

                        <div
                            className={
                                styles.item +
                                ' ' +
                                (
                                    index % 2 === 0
                                        ? styles.itemLeft
                                        : styles.itemRight
                                )
                            }
                            key={item.id}
                            data-aos={
                                index % 2 === 0
                                    ? "fade-right"
                                    : "fade-left"
                            }
                            data-aos-delay={
                                index * 60
                            }
                        >

                            <div
                                className={
                                    styles.node +
                                    ' ' +
                                    (
                                        item.type === 'edu'
                                            ? styles.nodeEdu
                                            : styles.nodeExp
                                    )
                                }
                            >

                                {
                                    item.type === 'edu'
                                        ? <EducationIcon />
                                        : <ExperienceIcon />
                                }


                                {item.current && (

                                    <span
                                        className={styles.pulse}
                                    ></span>

                                )}

                            </div>


                            <div
                                className={styles.card}
                            >

                                <div
                                    className={styles.cardTop}
                                >

                                    <span
                                        className={styles.year}
                                    >
                                        {item.year}
                                    </span>


                                    <span
                                        className={
                                            styles.typeTag +
                                            ' ' +
                                            (
                                                item.type === 'edu'
                                                    ? styles.typeEdu
                                                    : styles.typeExp
                                            )
                                        }
                                    >
                                        {
                                            item.type === 'edu'
                                                ? 'Educación'
                                                : 'Experiencia'
                                        }
                                    </span>

                                </div>


                                <h3>
                                    {item.title}
                                </h3>


                                <p
                                    className={styles.org}
                                >
                                    {item.org}
                                </p>


                                <p
                                    className={styles.description}
                                >
                                    {item.description}
                                </p>


                                <div
                                    className={styles.badges}
                                >

                                    {item.tech.map(
                                        (t, i) => (

                                            <span
                                                key={i}
                                            >
                                                {t}
                                            </span>

                                        )
                                    )}

                                </div>

                            </div>

                        </div>

                    )
                )}

            </div>

        </section>

    );
};


export default Journey;