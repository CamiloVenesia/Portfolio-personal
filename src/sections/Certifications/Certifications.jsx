import React, { useState, useEffect, useCallback, useMemo } from 'react';
import Tilt from 'react-parallax-tilt';
import {
    SiReact, SiJavascript, SiHtml5, SiCss, SiTailwindcss, SiSass,
    SiNodedotjs, SiExpress, SiMysql, SiMongodb, SiGit, SiGithub,
    SiPostman
} from 'react-icons/si';
import { VscDebugConsole, VscVscode } from 'react-icons/vsc';
import { BsBroadcast } from 'react-icons/bs';
import styles from './Certifications.module.css';

const certsData = [
    {
        id: 1,
        title: "Programación Backend II: Diseño y Arquitectura Backend",
        institution: "Coderhouse",
        date: "Julio 2026",
        hours: 16,
        featured: true,
        image: "/assets/certs/cert-10-backend-ii.jpg"
    },
    {
        id: 2,
        title: "Programación Backend I: Desarrollo Avanzado de Backend Flex",
        institution: "Coderhouse",
        date: "Abril 2026",
        hours: 18,
        image: "/assets/certs/cert-09-backend-i.jpg"
    },
    {
        id: 3,
        title: "SQL (Back-End)",
        institution: "Coderhouse",
        date: "Marzo 2026",
        hours: 22,
        image: "/assets/certs/cert-06-sql-backend.jpg"
    },
    {
        id: 4,
        title: "JavaScript (Back-End)",
        institution: "Coderhouse",
        date: "Noviembre 2025",
        hours: 20,
        image: "/assets/certs/cert-05-javascript-backend.jpg"
    },
    {
        id: 5,
        title: "React JS",
        institution: "Coderhouse",
        date: "Mayo 2025",
        hours: 16,
        image: "/assets/certs/cert-08-react-js.jpg"
    },
    {
        id: 6,
        title: "Carrera de Desarrollo Frontend React",
        institution: "Coderhouse",
        date: "Abril 2025",
        hours: 0,
        image: "/assets/certs/cert-04-frontend-react.jpg"
    },
    {
        id: 7,
        title: "JavaScript",
        institution: "Coderhouse",
        date: "Diciembre 2024",
        hours: 36,
        image: "/assets/certs/cert-07-javascript.jpg"
    },
    {
        id: 8,
        title: "Desarrollo Web",
        institution: "Coderhouse",
        date: "Octubre 2024",
        hours: 38,
        image: "/assets/certs/cert-03-desarrollo-web.jpg"
    },
    {
        id: 9,
        title: "Desarrollador Full Stack Junior",
        institution: "Instituto Superior Politécnico Córdoba",
        date: "Noviembre 2023",
        hours: 300,
        image: "/assets/certs/cert-02-fullstack-junior.jpg"
    },
    {
        id: 10,
        title: "Olimpíada Nacional de Educación Técnico Profesional",
        institution: "INET - Ministerio de Educación",
        date: "2023",
        hours: 0,
        image: "/assets/certs/cert-01-olimpiada.jpg"
    },
];

const techLogos = [
    { name: "React", Icon: SiReact, color: "#61DAFB" },
    { name: "JavaScript", Icon: SiJavascript, color: "#F7DF1E" },
    { name: "HTML5", Icon: SiHtml5, color: "#E34F26" },
    { name: "CSS3", Icon: SiCss, color: "#1572B6" },
    { name: "Tailwind", Icon: SiTailwindcss, color: "#38BDF8" },
    { name: "Sass", Icon: SiSass, color: "#CC6699" },
    { name: "Node.js", Icon: SiNodedotjs, color: "#339933" },
    { name: "Express", Icon: SiExpress, color: "#ffffff" },
    { name: "MySQL", Icon: SiMysql, color: "#4479A1" },
    { name: "MongoDB", Icon: SiMongodb, color: "#47A248" },
    { name: "Git", Icon: SiGit, color: "#F05032" },
    { name: "GitHub", Icon: SiGithub, color: "#ffffff" },
    { name: "VS Code", Icon: VscVscode, color: "#007ACC" },
    { name: "Live Server", Icon: BsBroadcast, color: "#00abf0" },
    { name: "DevTools", Icon: VscDebugConsole, color: "#00abf0" },
    { name: "Postman", Icon: SiPostman, color: "#FF6C37" },
    { name: "MySQL Workbench", Icon: SiMysql, color: "#4479A1" },
];
const techLogosLoop = [...techLogos, ...techLogos];

const StatIcon = ({ type }) => {
    const icons = {
        award: <path d="M12 15a7 7 0 1 0 0-14 7 7 0 0 0 0 14zM8.21 13.89 7 23l5-3 5 3-1.21-9.12" />,
        clock: <><circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" /></>
    };
    return (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            {icons[type]}
        </svg>
    );
};

const Certifications = () => {
    const [activeIndex, setActiveIndex] = useState(0);
    const [isOpen, setIsOpen] = useState(false);

    const total = certsData.length;

    const stats = useMemo(() => {
        const totalHours = certsData.reduce((sum, c) => sum + (c.hours || 0), 0);
        return { total, totalHours };
    }, [total]);

    const goNext = useCallback(() => {
        setActiveIndex((prev) => (prev + 1) % total);
    }, [total]);

    const goPrev = useCallback(() => {
        setActiveIndex((prev) => (prev - 1 + total) % total);
    }, [total]);

    const openLightbox = () => setIsOpen(true);
    const closeLightbox = () => setIsOpen(false);

    useEffect(() => {
        if (!isOpen) return;
        const handleKeyDown = (e) => {
            if (e.key === 'Escape') closeLightbox();
            if (e.key === 'ArrowRight') goNext();
            if (e.key === 'ArrowLeft') goPrev();
        };
        window.addEventListener('keydown', handleKeyDown);
        document.body.style.overflow = 'hidden';
        return () => {
            window.removeEventListener('keydown', handleKeyDown);
            document.body.style.overflow = '';
        };
    }, [isOpen, goNext, goPrev]);

    const prevIndex = (activeIndex - 1 + total) % total;
    const nextIndex = (activeIndex + 1) % total;
    const centerCert = certsData[activeIndex];

    return (
        <section className={styles.certifications} id="certifications">
            <div className={styles.certBlob}></div>

            <div className={styles.titleContainer} data-aos="fade-down">
                <svg className={styles.titleIcon} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 15a7 7 0 1 0 0-14 7 7 0 0 0 0 14z"></path>
                    <path d="M8.21 13.89 7 23l5-3 5 3-1.21-9.12"></path>
                </svg>
                <h2 className={styles.title}>Mis <span>Certificaciones</span></h2>
            </div>

            <p className={styles.subtitle} data-aos="fade-up">
                Cursos y certificaciones que respaldan mi formación continua.
            </p>

            <div className={styles.statsBar} data-aos="fade-up">
                <div className={styles.statChip}>
                    <StatIcon type="award" />
                    <div>
                        <strong>{stats.total}</strong>
                        <span>Certificados</span>
                    </div>
                </div>
                <div className={styles.statDivider}></div>
                <div className={styles.statChip}>
                    <StatIcon type="clock" />
                    <div>
                        <strong>{stats.totalHours}+</strong>
                        <span>Horas certificadas</span>
                    </div>
                </div>
            </div>

            {/* CARRUSEL */}
            <div className={styles.carouselWrapper} data-aos="zoom-in">
                <button className={styles.arrowBtn + ' ' + styles.arrowLeft} onClick={goPrev} aria-label="Certificado anterior">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="15 18 9 12 15 6"></polyline>
                    </svg>
                </button>

                <div className={styles.carouselStage}>
                    <button
                        className={styles.peekCard + ' ' + styles.peekLeft}
                        onClick={goPrev}
                        aria-label={'Ver ' + certsData[prevIndex].title}
                    >
                        <img src={certsData[prevIndex].image} alt="" />
                    </button>

                    <Tilt
                        key={centerCert.id}
                        tiltMaxAngleX={6}
                        tiltMaxAngleY={6}
                        glareEnable={true}
                        glareMaxOpacity={0.2}
                        glareColor="#00abf0"
                        glarePosition="all"
                        scale={1.01}
                        transitionSpeed={1200}
                        className={styles.centerTilt}
                    >
                        <button className={styles.centerCard} onClick={openLightbox} aria-label={'Ver certificado completo: ' + centerCert.title}>
                            {centerCert.featured && <span className={styles.featuredBadge}>★ Más reciente</span>}
                            <img src={centerCert.image} alt={centerCert.title} />
                            <div className={styles.centerInfo}>
                                <span className={styles.centerYear}>{centerCert.date}</span>
                                <h3>{centerCert.title}</h3>
                                <p>{centerCert.institution}</p>
                            </div>
                        </button>
                    </Tilt>

                    <button
                        className={styles.peekCard + ' ' + styles.peekRight}
                        onClick={goNext}
                        aria-label={'Ver ' + certsData[nextIndex].title}
                    >
                        <img src={certsData[nextIndex].image} alt="" />
                    </button>
                </div>

                <button className={styles.arrowBtn + ' ' + styles.arrowRight} onClick={goNext} aria-label="Siguiente certificado">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="9 18 15 12 9 6"></polyline>
                    </svg>
                </button>
            </div>

            <div className={styles.dots}>
                {certsData.map((c, i) => (
                    <button
                        key={c.id}
                        className={i === activeIndex ? styles.dot + ' ' + styles.dotActive : styles.dot}
                        onClick={() => setActiveIndex(i)}
                        aria-label={'Ir a ' + c.title}
                    ></button>
                ))}
            </div>

            
            <a    href="https://www.linkedin.com/in/camilovenesia/details/certifications/"
                target="_blank"
                rel="noreferrer"
                className={styles.ctaButton}
                data-aos="fade-up"
            >
                Ver todos en LinkedIn
            </a>

            {/* CARRUSEL DE TECNOLOGÍAS */}
            <div className={styles.techDivider}></div>
            <div className={styles.marqueeViewport} data-aos="fade-up">
                <div className={styles.marqueeTrack}>
                    {techLogosLoop.map((tech, i) => {
                        const Icon = tech.Icon;
                        return (
                            <div className={styles.techItem} key={tech.name + i}>
                                <Icon style={{ color: tech.color }} className={styles.techIcon} />
                                <span>{tech.name}</span>
                            </div>
                        );
                    })}
                </div>
            </div>

            {/* LIGHTBOX */}
            {isOpen && (
                <div className={styles.lightboxOverlay} onClick={closeLightbox}>
                    <button className={styles.closeBtn} onClick={closeLightbox} aria-label="Cerrar">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <line x1="18" y1="6" x2="6" y2="18"></line>
                            <line x1="6" y1="6" x2="18" y2="18"></line>
                        </svg>
                    </button>

                    <button className={styles.navBtn + ' ' + styles.navPrev} onClick={(e) => { e.stopPropagation(); goPrev(); }} aria-label="Certificado anterior">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <polyline points="15 18 9 12 15 6"></polyline>
                        </svg>
                    </button>

                    <div className={styles.lightboxContent} onClick={(e) => e.stopPropagation()}>
                        <img src={centerCert.image} alt={centerCert.title} />
                        <div className={styles.lightboxInfo}>
                            <span className={styles.lightboxYear}>{centerCert.date}</span>
                            <h3>{centerCert.title}</h3>
                            <p>{centerCert.institution}</p>
                        </div>

                        <div className={styles.filmstrip}>
                            {certsData.map((c, i) => (
                                <button
                                    key={c.id}
                                    className={i === activeIndex ? styles.filmThumb + ' ' + styles.filmThumbActive : styles.filmThumb}
                                    onClick={() => setActiveIndex(i)}
                                    aria-label={'Ir a ' + c.title}
                                >
                                    <img src={c.image} alt="" />
                                </button>
                            ))}
                        </div>
                    </div>

                    <button className={styles.navBtn + ' ' + styles.navNext} onClick={(e) => { e.stopPropagation(); goNext(); }} aria-label="Siguiente certificado">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <polyline points="9 18 15 12 9 6"></polyline>
                        </svg>
                    </button>
                </div>
            )}
        </section>
    );
};

export default Certifications;