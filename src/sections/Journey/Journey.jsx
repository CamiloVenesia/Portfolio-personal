import React from 'react';
import styles from './Journey.module.css';

const Journey = () => {
    const EducationIcon = () => (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 3L1 9l4 2.18v6L12 21l7-3.82v-6l2.81-1.53V17h2V8.46L12 3zm6.82 6L12 12.72 5.18 9 12 5.28 18.82 9zM17 15.99l-5 2.73-5-2.73v-3.72l5 2.73 5-2.73v3.72z"/>
        </svg>
    );

    const ExperienceIcon = () => (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
            <path d="M20 6h-4V4c0-1.11-.89-2-2-2h-4c-1.11 0-2 .89-2 2v2H4c-1.11 0-1.99.89-1.99 2L2 19c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V8c0-1.11-.89-2-2-2zm-6 0h-4V4h4v2z"/>
        </svg>
    );

    return (
        <section className={styles.journey} id="journey">
            {/* LUZ DE FONDO PARA MANTENER LA ESTÉTICA */}
            <div className={styles.journeyBlob}></div>

            {/* TÍTULO CON PANEL GEOMÉTRICO Y GLOW */}
            <div className={styles.titleContainer} data-aos="fade-down">
                <svg className={styles.titleIcon} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
                </svg>
                <h2 className={styles.title}>Mi <span>Recorrido</span></h2>
            </div>

            <div className={styles.container}>
                {/* COLUMNA EDUCACIÓN */}
                <div className={styles.column}>
                    <h3 className={styles.subtitle} data-aos="fade-right">Educación</h3>
                    <div className={styles.box}>
                        <div className={styles.content} data-aos="fade-up" data-aos-delay="100">
                            <div className={styles.iconWrapper}><EducationIcon /></div>
                            <div className={styles.year}>2025 - Actualidad</div>
                            <h4>Desarrollo Back-End</h4>
                            <p>Coderhouse - Actualmente cursando la especialización en arquitectura de servidores y bases de datos.</p>
                            <div className={styles.badges}>
                                <span>Node.js</span>
                                <span>Express</span>
                                <span>SQL</span>
                            </div>
                        </div>
                        
                        <div className={styles.content} data-aos="fade-up" data-aos-delay="200">
                            <div className={styles.iconWrapper}><EducationIcon /></div>
                            <div className={styles.year}>2025</div>
                            <h4>Desarrollo Front-End</h4>
                            <p>Coderhouse - Certificación en React, JavaScript y diseño de interfaces modernas.</p>
                            <div className={styles.badges}>
                                <span>React</span>
                                <span>JavaScript</span>
                                <span>CSS Modules</span>
                            </div>
                        </div>
                        
                        <div className={styles.content} data-aos="fade-up" data-aos-delay="300">
                            <div className={styles.iconWrapper}><EducationIcon /></div>
                            <div className={styles.year}>2023</div>
                            <h4>Técnico Informático</h4>
                            <p>Educación Secundaria Técnica - Formación integral en hardware, redes y lógica de programación.</p>
                            <div className={styles.badges}>
                                <span>Lógica</span>
                                <span>Hardware</span>
                                <span>Redes</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* COLUMNA EXPERIENCIA */}
                <div className={styles.column}>
                    <h3 className={styles.subtitle} data-aos="fade-left">Experiencia</h3>
                    <div className={styles.box}>
                        <div className={styles.content} data-aos="fade-up" data-aos-delay="100">
                            <div className={styles.iconWrapper}><ExperienceIcon /></div>
                            <div className={styles.year}>2026 - Actualidad</div>
                            <h4>Full Stack Developer</h4>
                            <p>
                                <strong>LaMatera:</strong> Desarrollo integral de una plataforma E-commerce para la venta de mates y accesorios. Implementación de carrito de compras, integración con pasarelas de pago y panel de administración para gestión de inventario y pedidos.
                            </p>
                            <div className={styles.badges}>
                                <span>React</span>
                                <span>Node.js</span>
                                <span>SQL</span>
                            </div>
                        </div>
                        
                        <div className={styles.content} data-aos="fade-up" data-aos-delay="200">
                            <div className={styles.iconWrapper}><ExperienceIcon /></div>
                            <div className={styles.year}>2025 - Actualidad</div>
                            <h4>Full Stack Developer Freelance</h4>
                            <p>Desarrollo de soluciones web personalizadas, enfocándome en código limpio y escalabilidad para clientes locales.</p>
                            <div className={styles.badges}>
                                <span>React</span>
                                <span>JavaScript</span>
                                <span>Vite</span>
                            </div>
                        </div>
                        
                        <div className={styles.content} data-aos="fade-up" data-aos-delay="300">
                            <div className={styles.iconWrapper}><ExperienceIcon /></div>
                            <div className={styles.year}>2023</div>
                            <h4>Pasante de Soporte Técnico Informático</h4>
                            <p>Mantenimiento preventivo, resolución de fallas de hardware/software y optimización de sistemas operativos.</p>
                            <div className={styles.badges}>
                                <span>Mantenimiento</span>
                                <span>Soporte</span>
                                <span>Sistemas</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Journey;