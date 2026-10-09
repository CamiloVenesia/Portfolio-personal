import React from 'react';
import styles from './About.module.css';

const About = () => {
    return (
        <section className={styles.about} id="about">
            <div className={styles.container}>
                <div className={styles.aboutBlob}></div>

                <div className={styles.headerContainer} data-aos="fade-down">
                    <div className={styles.pillTitle}>
                        <svg
                            className={styles.pillIcon}
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        >
                            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                            <circle cx="12" cy="7" r="4"></circle>
                        </svg>

                        <h2 className={styles.mainTitle}>
                            Sobre <span>Mi</span>
                        </h2>
                    </div>
                </div>

                <div className={styles.grid}>

                    {/* 1. QUIÉN SOY */}
                    <div
                        className={`${styles.card} ${styles.large}`}
                        data-aos="fade-right"
                    >
                        <div className={styles.cardContent}>
                            <div className={styles.iconBox}>🚀</div>

                            <h3>
                                Full-Stack <span>Developer</span>
                            </h3>

                            <p>
                                Soy un desarrollador radicado en Rosario, enfocado en el ecosistema{' '}
                                <strong>JavaScript</strong> y en la creación de aplicaciones web
                                completas. Trabajo tanto en interfaces modernas con React como en
                                APIs, lógica de servidor y bases de datos con Node.js, Express,
                                MongoDB y SQL. Disfruto construir productos digitales funcionales,
                                escalables y con especial atención al diseño y la experiencia de
                                usuario.
                            </p>
                        </div>
                    </div>

                    {/* 2. FORMACIÓN */}
                    <div
                        className={`${styles.card} ${styles.tall}`}
                        data-aos="fade-left"
                        data-aos-delay="200"
                    >
                        <div className={styles.cardContent}>
                            <div className={styles.iconBox}>🎓</div>

                            <h4>Formación</h4>

                            <div className={styles.educationItem}>
                                <h5>Desarrollo Back-End</h5>
                                <p>Coderhouse (Finalizado)</p>
                            </div>

                            <div className={styles.educationItem}>
                                <h5>Desarrollo Front-End</h5>
                                <p>Coderhouse (Certificado)</p>
                            </div>

                            <div className={styles.educationItem}>
                                <h5>Idiomas</h5>
                                <p>
                                    Inglés (Técnico) | Portugués (En aprendizaje)
                                </p>
                            </div>

                            <a
                                href="https://www.linkedin.com/in/camilovenesia/details/certifications/"
                                target="_blank"
                                rel="noreferrer"
                                className={styles.certButton}
                            >
                                Ver Certificados 📄
                            </a>
                        </div>
                    </div>

                    {/* 3. ENFOQUE */}
                    <div
                        className={`${styles.card} ${styles.medium}`}
                        data-aos="fade-up"
                    >
                        <div className={styles.cardContent}>
                            <div className={styles.iconBox}>🎯</div>

                            <h4>Disciplina y Detalle</h4>

                            <p>
                                La constancia que aplico en mi día a día entrenando,
                                la traslado a mi código. Me interesan los detalles,
                                la estética, la organización y construir soluciones
                                simples que resuelvan problemas reales.
                            </p>
                        </div>
                    </div>

                    {/* 4. STACK */}
                    <div
                        className={`${styles.card} ${styles.medium}`}
                        data-aos="fade-up"
                        data-aos-delay="200"
                    >
                        <div className={styles.cardContent}>
                            <div className={styles.iconBox}>💻</div>

                            <h4>Mi Stack</h4>

                            <p>
                                <strong>Front:</strong> React, JavaScript, CSS Modules, Vite.
                                <br />
                                <strong>Back:</strong> Node.js, Express, MongoDB, SQL.
                                <br />
                                <strong>Cloud:</strong> Firebase, Render, MongoDB Atlas.
                            </p>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
};

export default About;