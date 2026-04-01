import React, { useState, useEffect } from "react";
import styles from "./Header.module.css";

const Header = () => {
    const [dockOpen, setDockOpen] = useState(false);
    const [darkMode, setDarkMode] = useState(true);

    useEffect(() => {
        const saved = localStorage.getItem("theme");
        if (saved === "light") setDarkMode(false);
    }, []);

    useEffect(() => {
        document.body.classList.toggle("light", !darkMode);
        localStorage.setItem("theme", darkMode ? "dark" : "light");
    }, [darkMode]);

    const toggleDock = () => setDockOpen((v) => !v);
    const toggleDarkMode = () => setDarkMode((v) => !v);

    // 🔥 MOTOR DE SCROLL JAVASCRIPT: IMPOSIBLE QUE FALLE 🔥
    const scrollToSection = (e, targetId) => {
        e.preventDefault();
        setDockOpen(false);

        const target = document.getElementById(targetId);
        if (!target) return;

        const targetPosition = target.getBoundingClientRect().top + window.scrollY;
        const startPosition = window.scrollY;
        const distance = targetPosition - startPosition;
        const duration = 800; // 800ms = 0.8 segundos de viaje
        let start = null;

        const animation = (currentTime) => {
            if (start === null) start = currentTime;
            const timeElapsed = currentTime - start;
            const progress = Math.min(timeElapsed / duration, 1);
            
            // Curva de aceleración (arranca rápido, frena suave)
            const ease = progress < 0.5 ? 4 * progress * progress * progress : 1 - Math.pow(-2 * progress + 2, 3) / 2;

            window.scrollTo(0, startPosition + distance * ease);

            if (timeElapsed < duration) requestAnimationFrame(animation);
        };

        requestAnimationFrame(animation);
    };

    return (
        <>
            <div 
                className={`${styles.topLeftToggle} ${dockOpen ? styles.active : ""}`} 
                onClick={toggleDock}
            >
                <span></span><span></span><span></span>
            </div>

            <nav className={`${styles.floatingDock} ${dockOpen ? styles.visible : ""}`}>
                <div className={styles.dockContainer}>
                    
                    <a href="#home" className={styles.iconBtn} onClick={(e) => scrollToSection(e, 'home')}>
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/>
                        </svg>
                    </a>

                    <a href="#about" className={styles.iconBtn} onClick={(e) => scrollToSection(e, 'about')}>
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle>
                        </svg>
                    </a>

                    <a href="#projects" className={styles.iconBtn} onClick={(e) => scrollToSection(e, 'projects')}>
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path>
                        </svg>
                    </a>

                    <a href="#contact" className={styles.iconBtn} onClick={(e) => scrollToSection(e, 'contact')}>
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline>
                        </svg>
                    </a>

                    <div className={styles.divider}></div>

                    <button onClick={toggleDarkMode} className={styles.iconBtn}>
                        {darkMode ? (
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <circle cx="12" cy="12" r="5"></circle><line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="23"></line><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line><line x1="1" y1="12" x2="3" y2="12"></line><line x1="21" y1="12" x2="23" y2="12"></line><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
                            </svg>
                        ) : (
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
                            </svg>
                        )}
                    </button>
                    
                </div>
            </nav>
        </>
    );
};

export default Header;