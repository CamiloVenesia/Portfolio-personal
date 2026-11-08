import React, { useEffect, useRef, useState } from "react";
import styles from "./Header.module.css";
import { scrollToSection } from "../../utils/scrollToSection";

const navigationItems = [
  {
    id: "home",
    label: "Inicio",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round">
        <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
        <polyline points="9 22 9 12 15 12 15 22" />
      </svg>
    ),
  },
  {
    id: "projects",
    label: "Proyectos",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="7" width="20" height="14" rx="2" />
        <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
      </svg>
    ),
  },
  {
    id: "skills",
    label: "Skills",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="16 18 22 12 16 6" />
        <polyline points="8 6 2 12 8 18" />
      </svg>
    ),
  },
  {
    id: "journey",
    label: "Mi recorrido",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="9" />
        <polyline points="12 7 12 12 16 14" />
      </svg>
    ),
  },
  {
    id: "about",
    label: "Sobre mí",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round">
        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
        <circle cx="12" cy="7" r="4" />
      </svg>
    ),
  },
  {
    id: "certifications",
    label: "Certificaciones",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="8" r="7" />
        <path d="m8.2 13.4-1.2 8.1 5-3 5 3-1.2-8.1" />
      </svg>
    ),
  },
  {
    id: "contact",
    label: "Contacto",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="4" width="20" height="16" rx="2" />
        <polyline points="22 6 12 13 2 6" />
      </svg>
    ),
  },
];

const Header = () => {
  const [dockOpen, setDockOpen] = useState(false);

  const [darkMode, setDarkMode] = useState(() => {
    try {
      return localStorage.getItem("theme") !== "light";
    } catch {
      return true;
    }
  });

  const [activeSection, setActiveSection] = useState("home");

  const toggleRef = useRef(null);
  const navRef = useRef(null);

  // Aplicar tema.
  useEffect(() => {
    document.body.classList.toggle("light", !darkMode);

    try {
      localStorage.setItem("theme", darkMode ? "dark" : "light");
    } catch {
      // El tema continúa funcionando aunque localStorage esté bloqueado.
    }
  }, [darkMode]);

  // Evitar que se pueda navegar con teclado dentro del menú cerrado.
  // También devuelve el foco al botón cuando se cierra.
  useEffect(() => {
    const navigation = navRef.current;

    if (!navigation) return;

    navigation.inert = !dockOpen;

    if (!dockOpen && navigation.contains(document.activeElement)) {
      toggleRef.current?.focus();
    }
  }, [dockOpen]);

  // Cerrar con Escape.
  useEffect(() => {
    if (!dockOpen) return undefined;

    const handleEscape = (event) => {
      if (event.key === "Escape") {
        setDockOpen(false);
      }
    };

    window.addEventListener("keydown", handleEscape);

    return () => {
      window.removeEventListener("keydown", handleEscape);
    };
  }, [dockOpen]);

  // Detectar sección activa.
  useEffect(() => {
    const sections = navigationItems
      .map((item) => document.getElementById(item.id))
      .filter(Boolean);

    if (!sections.length) return undefined;

    let frameRequested = false;

    const updateActiveSection = () => {
      const activationLine = window.innerHeight * 0.38;
      let currentSection = sections[0].id;

      sections.forEach((section) => {
        if (section.getBoundingClientRect().top <= activationLine) {
          currentSection = section.id;
        }
      });

      const reachedPageBottom =
        window.innerHeight + window.scrollY >=
        document.documentElement.scrollHeight - 24;

      if (reachedPageBottom) {
        currentSection = sections[sections.length - 1].id;
      }

      setActiveSection((previous) =>
        previous === currentSection ? previous : currentSection
      );

      frameRequested = false;
    };

    const handleScroll = () => {
      if (frameRequested) return;

      frameRequested = true;
      window.requestAnimationFrame(updateActiveSection);
    };

    updateActiveSection();

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, []);

  const closeDock = () => setDockOpen(false);

  const toggleDock = () => {
    setDockOpen((isOpen) => !isOpen);
  };

  const toggleDarkMode = () => {
    setDarkMode((isDark) => !isDark);
  };

  const handleNavigation = (event, targetId) => {
    setActiveSection(targetId);
    scrollToSection(event, targetId, closeDock);
  };

  return (
    <>
      <button
        ref={toggleRef}
        type="button"
        className={`${styles.topLeftToggle} ${
          dockOpen ? styles.active : ""
        }`}
        onClick={toggleDock}
        aria-label={
          dockOpen
            ? "Cerrar menú de navegación"
            : "Abrir menú de navegación"
        }
        aria-expanded={dockOpen}
        aria-controls="floating-navigation"
      >
        <span></span>
        <span></span>
        <span></span>
      </button>

      <div
        className={`${styles.dockBackdrop} ${
          dockOpen ? styles.backdropVisible : ""
        }`}
        onClick={closeDock}
        aria-hidden="true"
      />

      <nav
        ref={navRef}
        id="floating-navigation"
        className={`${styles.floatingDock} ${
          dockOpen ? styles.visible : ""
        }`}
        aria-label="Navegación principal"
        aria-hidden={!dockOpen}
      >
        <div className={styles.dockContainer}>
          <div className={styles.navigationGroup}>
            {navigationItems.map((item, index) => {
              const isActive = activeSection === item.id;

              return (
                <a
                  key={item.id}
                  href={`#${item.id}`}
                  className={`${styles.dockLink} ${
                    isActive ? styles.activeLink : ""
                  }`}
                  aria-label={`Ir a ${item.label}`}
                  aria-current={isActive ? "location" : undefined}
                  onClick={(event) =>
                    handleNavigation(event, item.id)
                  }
                  style={{ "--item-index": index }}
                >
                  <span className={styles.iconWrap}>
                    {item.icon}
                  </span>

                  <span className={styles.linkLabel}>
                    {item.label}
                  </span>

                  <span className={styles.activeIndicator} />
                </a>
              );
            })}
          </div>

          <span
            className={styles.divider}
            aria-hidden="true"
          />

          <button
            type="button"
            onClick={toggleDarkMode}
            className={`${styles.dockLink} ${styles.themeButton}`}
            aria-label={
              darkMode
                ? "Cambiar a modo claro"
                : "Cambiar a modo oscuro"
            }
            aria-pressed={!darkMode}
            title={
              darkMode
                ? "Cambiar a modo claro"
                : "Cambiar a modo oscuro"
            }
          >
            <span className={`${styles.iconWrap} ${styles.themeIcon}`}>
              {darkMode ? (
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.9"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <circle cx="12" cy="12" r="4.5" />
                  <path d="M12 2v2M12 20v2M4.93 4.93l1.42 1.42M17.65 17.65l1.42 1.42M2 12h2M20 12h2M4.93 19.07l1.42-1.42M17.65 6.35l1.42-1.42" />
                </svg>
              ) : (
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.9"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M20.5 14.2A8.5 8.5 0 0 1 9.8 3.5 8.8 8.8 0 1 0 20.5 14.2Z" />
                  <path d="M16.5 3v4M14.5 5h4" />
                </svg>
              )}
            </span>

            <span className={styles.linkLabel}>
              {darkMode ? "Modo claro" : "Modo oscuro"}
            </span>

            <span className={styles.activeIndicator} />
          </button>
        </div>
      </nav>
    </>
  );
};

export default Header;