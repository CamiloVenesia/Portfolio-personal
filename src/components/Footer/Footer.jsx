import React from 'react';
import { FiMail, FiMapPin, FiPhone } from 'react-icons/fi';
import { FaLinkedinIn, FaGithub } from 'react-icons/fa';
import { scrollToSection } from '../../utils/scrollToSection';
import styles from './Footer.module.css';

const Footer = () => {
  const links = [
    { label: 'Inicio', target: 'home' },
    { label: 'Proyectos', target: 'projects' },
    { label: 'Skills', target: 'skills' },
    { label: 'Mi Recorrido', target: 'journey' },
    { label: 'Sobre Mí', target: 'about' },
    { label: 'Certificaciones', target: 'certifications' },
    { label: 'Contacto', target: 'contact' }
  ];

  return (
    <footer className={styles.footer}>
      <div className={styles.glow}></div>

      <div className={styles.container}>
        <div className={styles.content}>
          <div className={styles.brand}>
            <h3>
              Camilo <span>Venesia.</span>
            </h3>

            <p>
              Desarrollador Full Stack enfocado en crear soluciones web
              modernas, funcionales y preparadas para escenarios reales.
            </p>
          </div>

          <div className={styles.column}>
            <h4>Explorar</h4>
            <span className={styles.line}></span>

            <nav className={styles.nav}>
              {links.map((link) => (
                <a
                  key={link.target}
                  href={'#' + link.target}
                  onClick={(e) => scrollToSection(e, link.target)}
                >
                  {link.label}
                </a>
              ))}
            </nav>
          </div>

          <div className={styles.column}>
            <h4>Contacto</h4>
            <span className={styles.line}></span>

            <div className={styles.contactList}>
              <a href="tel:+543467403230">
                <FiPhone />
                <span>+54 3467 403230</span>
              </a>

              <a href="mailto:camilovenesia.dev@gmail.com">
                <FiMail />
                <span>camilovenesia.dev@gmail.com</span>
              </a>

              <div className={styles.contactItem}>
                <FiMapPin />
                <span>Rosario, Argentina</span>
              </div>
            </div>
          </div>

          <div className={styles.column}>
            <h4>Redes</h4>
            <span className={styles.line}></span>

            <div className={styles.socials}>
              <a
                href="https://www.linkedin.com/in/camilovenesia/"
                target="_blank"
                rel="noreferrer"
                aria-label="LinkedIn"
              >
                <FaLinkedinIn />
              </a>

              <a
                href="https://github.com/CamiloVenesia"
                target="_blank"
                rel="noreferrer"
                aria-label="GitHub"
              >
                <FaGithub />
              </a>
            </div>
          </div>
        </div>

        <div className={styles.bottom}>
          <p>
            © 2026 Camilo Venesia. Todos los derechos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;