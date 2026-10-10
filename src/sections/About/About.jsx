import React from 'react';
import styles from './About.module.css';
import { scrollToSection } from '../../utils/scrollToSection';


const About = () => {

    const capabilities = [
        "Arquitectura Full-Stack",
        "APIs REST",
        "Autenticación y roles",
        "Bases SQL y NoSQL",
        "Integridad de datos",
        "Deploy y producción"
    ];


    return (

        <section
            className={styles.about}
            id="about"
        >

            <div
                className={styles.backgroundGrid}
            ></div>

            <div
                className={styles.glowOne}
            ></div>

            <div
                className={styles.glowTwo}
            ></div>


            <div
                className={styles.container}
            >

                {/* CABECERA */}

                <div
                    className={styles.sectionHeader}
                    data-aos="fade-up"
                >

                    <div
                        className={styles.eyebrow}
                    >

                        <span
                            className={styles.eyebrowDot}
                        ></span>

                        Perfil profesional

                    </div>


                    <h2
                        className={styles.title}
                    >
                        Sobre <span>mí</span>
                    </h2>


                    <p
                        className={styles.headerDescription}
                    >
                        Desarrollo productos web completos combinando
                        ingeniería, diseño de interfaces y una mirada
                        orientada a resolver problemas reales.
                    </p>

                </div>


                {/* GRID PRINCIPAL */}

                <div
                    className={styles.profileGrid}
                >

                    {/* TARJETA PRINCIPAL */}

                    <article
                        className={
                            styles.card +
                            ' ' +
                            styles.mainCard
                        }
                        data-aos="fade-right"
                    >

                        <div
                            className={styles.mainContent}
                        >

                            <span
                                className={styles.cardLabel}
                            >
                                FULL-STACK DEVELOPER
                            </span>


                            <h3>
                                Construyo productos,
                                <br />
                                no solamente páginas web.
                            </h3>


                            <p
                                className={styles.mainDescription}
                            >
                                Soy desarrollador Full-Stack radicado en Rosario.
                                Trabajo principalmente con el ecosistema JavaScript,
                                desarrollando desde la experiencia de usuario y el
                                frontend hasta APIs, lógica de negocio, autenticación,
                                bases de datos y despliegue.
                            </p>


                            <p
                                className={styles.mainDescription}
                            >
                                Mi objetivo es construir aplicaciones que además de
                                verse bien sean claras, mantenibles, seguras y
                                preparadas para funcionar en escenarios reales.
                            </p>


                            <div
                                className={styles.capabilityList}
                            >

                                {capabilities.map(
                                    item => (

                                        <span
                                            key={item}
                                            className={styles.capability}
                                        >
                                            {item}
                                        </span>

                                    )
                                )}

                            </div>


                            <div
                                className={styles.actions}
                            >

                                <a
                                    href="#projects"
                                    className={styles.primaryAction}
                                    onClick={
                                        e =>
                                            scrollToSection(
                                                e,
                                                'projects'
                                            )
                                    }
                                >
                                    Ver proyectos

                                    <svg
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    >
                                        <line
                                            x1="5"
                                            y1="12"
                                            x2="19"
                                            y2="12"
                                        ></line>

                                        <polyline
                                            points="12 5 19 12 12 19"
                                        ></polyline>
                                    </svg>

                                </a>


                                <a
                                    href="#journey"
                                    className={styles.secondaryAction}
                                    onClick={
                                        e =>
                                            scrollToSection(
                                                e,
                                                'journey'
                                            )
                                    }
                                >
                                    Ver recorrido
                                </a>

                            </div>

                        </div>


                        <div
                            className={styles.codePanel}
                        >

                            <div
                                className={styles.codeHeader}
                            >

                                <div
                                    className={styles.windowDots}
                                >
                                    <span></span>
                                    <span></span>
                                    <span></span>
                                </div>

                                <span>
                                    stack.config
                                </span>

                            </div>


                            <div
                                className={styles.codeBody}
                            >

                                <div
                                    className={styles.codeLine}
                                >
                                    <span>
                                        frontend
                                    </span>

                                    <strong>
                                        React · Vite
                                    </strong>
                                </div>


                                <div
                                    className={styles.codeLine}
                                >
                                    <span>
                                        backend
                                    </span>

                                    <strong>
                                        Node.js · Express
                                    </strong>
                                </div>


                                <div
                                    className={styles.codeLine}
                                >
                                    <span>
                                        data
                                    </span>

                                    <strong>
                                        MongoDB · Firestore · SQL
                                    </strong>
                                </div>


                                <div
                                    className={styles.codeLine}
                                >
                                    <span>
                                        cloud
                                    </span>

                                    <strong>
                                        Firebase · Render · Atlas
                                    </strong>
                                </div>


                                <div
                                    className={styles.codeStatus}
                                >

                                    <span
                                        className={styles.statusDot}
                                    ></span>

                                    end-to-end development

                                </div>

                            </div>

                        </div>

                    </article>


                    {/* FORMA DE TRABAJO */}

                    <article
                        className={
                            styles.card +
                            ' ' +
                            styles.approachCard
                        }
                        data-aos="fade-left"
                    >

                        <div
                            className={styles.cardIcon}
                        >

                            <svg
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            >
                                <path d="M12 20h9"></path>
                                <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4Z"></path>
                            </svg>

                        </div>


                        <span
                            className={styles.cardLabel}
                        >
                            CÓMO TRABAJO
                        </span>


                        <h4>
                            Diseño con intención.
                        </h4>


                        <p>
                            No separo desarrollo y experiencia de usuario.
                            Busco interfaces claras, jerarquía visual,
                            flujos simples y decisiones técnicas que
                            hagan el producto más fácil de mantener.
                        </p>


                        <div
                            className={styles.miniFeatures}
                        >

                            <span>
                                UX/UI
                            </span>

                            <span>
                                Código mantenible
                            </span>

                            <span>
                                Responsive
                            </span>

                        </div>

                    </article>


                    {/* FORMACIÓN */}

                    <article
                        className={
                            styles.card +
                            ' ' +
                            styles.educationCard
                        }
                        data-aos="fade-left"
                        data-aos-delay="100"
                    >

                        <div
                            className={styles.cardIcon}
                        >

                            <svg
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            >
                                <path d="M22 10v6M2 10l10-5 10 5-10 5Z"></path>
                                <path d="M6 12v5c3 3 9 3 12 0v-5"></path>
                            </svg>

                        </div>


                        <span
                            className={styles.cardLabel}
                        >
                            FORMACIÓN
                        </span>


                        <div
                            className={styles.educationBlock}
                        >

                            <div
                                className={styles.educationItem}
                            >

                                <span
                                    className={styles.educationState}
                                >
                                    COMPLETADO
                                </span>

                                <h5>
                                    Carrera de Desarrollo Full Stack
                                </h5>

                                <p>
                                    Coderhouse
                                </p>

                            </div>


                            <div
                                className={styles.educationDivider}
                            ></div>


                            <div
                                className={styles.educationItem}
                            >

                                <span
                                    className={
                                        styles.educationState +
                                        ' ' +
                                        styles.educationUpcoming
                                    }
                                >
                                    INGRESO 2027
                                </span>

                                <h5>
                                    Tecnicatura Universitaria en Desarrollo Web
                                </h5>

                                <p>
                                    Facultad de Ciencias de la Administración · UNER
                                </p>

                            </div>

                        </div>

                    </article>


                    {/* ENFOQUE PROFESIONAL */}

                    <article
                        className={
                            styles.card +
                            ' ' +
                            styles.focusCard
                        }
                        data-aos="fade-up"
                    >

                        <div
                            className={styles.focusTop}
                        >

                            <div
                                className={styles.cardIcon}
                            >

                                <svg
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                >
                                    <circle
                                        cx="12"
                                        cy="12"
                                        r="10"
                                    ></circle>

                                    <circle
                                        cx="12"
                                        cy="12"
                                        r="6"
                                    ></circle>

                                    <circle
                                        cx="12"
                                        cy="12"
                                        r="2"
                                    ></circle>
                                </svg>

                            </div>


                            <div>

                                <span
                                    className={styles.cardLabel}
                                >
                                    ENFOQUE
                                </span>

                                <h4>
                                    Resolver antes que complicar.
                                </h4>

                            </div>

                        </div>


                        <p>
                            Me interesa transformar necesidades reales en
                            sistemas claros y utilizables. Antes de sumar
                            complejidad, priorizo una arquitectura comprensible,
                            datos consistentes y una experiencia que tenga sentido
                            para quien realmente va a usar el producto.
                        </p>

                    </article>


                    {/* EXPERIENCIA PRÁCTICA */}

                    <article
                        className={
                            styles.card +
                            ' ' +
                            styles.experienceCard
                        }
                        data-aos="fade-up"
                        data-aos-delay="100"
                    >

                        <span
                            className={styles.cardLabel}
                        >
                            EXPERIENCIA PRÁCTICA
                        </span>


                        <h4>
                            Del concepto a producción.
                        </h4>


                        <p>
                            Mis proyectos incluyen e-commerce, sistemas de gestión,
                            APIs, autenticación, roles, procesamiento de datos,
                            dashboards y despliegues en servicios cloud.
                        </p>


                        <div
                            className={styles.projectTypes}
                        >

                            <div>
                                <strong>
                                    Frontend
                                </strong>

                                <span>
                                    interfaces y producto
                                </span>
                            </div>


                            <div>
                                <strong>
                                    Backend
                                </strong>

                                <span>
                                    APIs y lógica
                                </span>
                            </div>


                            <div>
                                <strong>
                                    Data
                                </strong>

                                <span>
                                    persistencia y reglas
                                </span>
                            </div>

                        </div>

                    </article>

                </div>

            </div>

        </section>

    );

};


export default About;