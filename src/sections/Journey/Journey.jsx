import { useEffect, useRef, useState } from 'react';
import styles from './Journey.module.css';

const EducationIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 10 12 5 2 10l10 5 10-5Z" />
    <path d="M6 12.5V17c3.5 2.7 8.5 2.7 12 0v-4.5" />
  </svg>
);

const ProjectIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="4" width="18" height="13" rx="2" />
    <path d="M8 21h8M12 17v4M8 9l2 2-2 2M13 13h3" />
  </svg>
);

const timelineData = [
  {
    id: 15,
    type: 'edu',
    year: 'Ingreso 2027',
    title: 'Tecnicatura Universitaria en Desarrollo Web',
    org: 'Facultad de Ciencias de la Administración — UNER',
    description:
      'Tecnicatura universitaria a distancia de 2 años y medio, orientada a la planificación, el diseño, el desarrollo y la implementación de aplicaciones y servicios web.',
    tech: [
      'Programación',
      'Ingeniería de Software',
      'Redes',
      'Aplicaciones Web',
      'Servicios Web'
    ]
  },
  {
    id: 14,
    type: 'project',
    year: 'Oct – Nov 2026',
    title: 'NEXO CRM — Plataforma de gestión comercial',
    org: 'Proyecto independiente · Desarrollo Full Stack',
    description:
      'CRM multiusuario para organizar empresas, contactos, oportunidades comerciales, tareas y actividades. Integra calendario, mensajería interna, notificaciones, reportes y un modo demo público con datos ficticios aislados.',
    tech: ['React', 'TypeScript', 'Supabase', 'PostgreSQL', 'Vercel']
  },
  {
    id: 13,
    type: 'project',
    year: 'Octubre 2026',
    title: 'RITMO PÁDEL — Plataforma de reservas',
    org: 'Proyecto independiente · Desarrollo Full Stack',
    description:
      'Plataforma de reservas para un club de pádel con cuatro canchas interactivas, disponibilidad por fecha, turnos de 90 minutos, escena 3D, cuentas de usuario, historial de reservas y panel de administración.',
    tech: ['React', 'TypeScript', 'Three.js', 'Node.js', 'PostgreSQL']
  },
  {
    id: 2,
    type: 'project',
    year: 'Octubre 2026',
    title: 'Kinetic Gym — Sistema de gestión',
    org: 'Proyecto independiente · Aplicación Full Stack',
    description:
      'Sistema de gestión para gimnasios que centraliza socios, membresías, pagos y accesos. Incluye autenticación, roles y permisos, estadísticas, panel administrativo y modo kiosco.',
    tech: ['Node.js', 'Express', 'MongoDB']
  },
  {
    id: 3,
    type: 'project',
    year: 'Jul – Oct 2026',
    title: 'DeliveryOps — Plataforma de gestión logística',
    org: 'Proyecto independiente · Desarrollo Full Stack',
    description:
      'Plataforma de operaciones logísticas que centraliza pedidos, depósitos y repartidores. Incorpora despacho, seguimiento GPS, comprobantes de entrega, planificación de rutas y métricas operativas.',
    tech: ['React', 'Node.js', 'Express', 'MongoDB', 'JavaScript']
  },
  {
    id: 1,
    type: 'project',
    year: 'Septiembre 2026',
    title: 'La Matera — E-commerce',
    org: 'Proyecto independiente · Comercio electrónico',
    description:
      'E-commerce de mates, termos y accesorios con catálogo, búsqueda, filtros y carrito persistente. Integra Firebase y Firestore para gestionar productos, pedidos y stock, además de una experiencia de compra completa.',
    tech: ['React', 'Vite', 'Firebase', 'Firestore', 'Cloudinary']
  },
  {
    id: 4,
    type: 'edu',
    year: 'Jul – Sep 2026',
    title: 'Programación Backend III: Testing y Escalabilidad',
    org: 'Coderhouse',
    description:
      'Etapa final de la formación Back-End, enfocada en testing, optimización, arquitectura y escalabilidad de aplicaciones.',
    tech: ['Testing', 'Escalabilidad', 'MongoDB']
  },
  {
    id: 5,
    type: 'edu',
    year: 'May – Jul 2026',
    title: 'Programación Backend II: Diseño y Arquitectura',
    org: 'Coderhouse',
    description:
      'Formación enfocada en diseño y arquitectura de aplicaciones escalables dentro del ecosistema Back-End.',
    tech: ['Arquitectura', 'Node.js', 'MongoDB']
  },
  {
    id: 6,
    type: 'edu',
    year: 'Feb – Abr 2026',
    title: 'Programación Backend I: Desarrollo Avanzado',
    org: 'Coderhouse',
    description:
      'Formación en desarrollo de APIs, lógica de servidor y construcción de aplicaciones con Node.js y Express.',
    tech: ['Node.js', 'Express', 'APIs']
  },
  {
    id: 8,
    type: 'edu',
    year: '2025',
    title: 'Desarrollo Front-End',
    org: 'Coderhouse',
    description:
      'Formación y certificación en desarrollo de interfaces web modernas con React, JavaScript y herramientas del ecosistema Front-End.',
    tech: ['React', 'JavaScript', 'CSS Modules']
  },
  {
    id: 10,
    type: 'edu',
    year: '2023',
    title: 'Técnico Informático',
    org: 'Educación Secundaria Técnica',
    description:
      'Formación integral en informática, hardware, redes, sistemas y fundamentos de programación.',
    tech: ['Lógica', 'Hardware', 'Redes']
  }
];

const filters = [
  { id: 'all', label: 'Todo' },
  { id: 'project', label: 'Proyectos' },
  { id: 'edu', label: 'Educación' }
];

const Journey = () => {
  const [filter, setFilter] = useState('all');
  const sectionRef = useRef(null);

  const filteredData =
    filter === 'all'
      ? timelineData
      : timelineData.filter((item) => item.type === filter);

  useEffect(() => {
    const section = sectionRef.current;

    if (!section) return;

    const elements = section.querySelectorAll('[data-journey-reveal]');

    if (!('IntersectionObserver' in window)) {
      elements.forEach((element) => {
        element.classList.add(styles.isVisible);
      });
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add(styles.isVisible);
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.12,
        rootMargin: '0px 0px -45px 0px'
      }
    );

    elements.forEach((element) => observer.observe(element));

    return () => observer.disconnect();
  }, [filter]);

  return (
    <section
      className={styles.journey}
      id="journey"
      ref={sectionRef}
    >
      <div className={styles.gridBackground}></div>
      <div className={styles.journeyBlob}></div>

      <div className={styles.container}>
        <div
          className={`${styles.header} ${styles.revealItem}`}
          data-journey-reveal
        >
          <div>
            <div className={styles.eyebrow}>
              <span></span>
              MI RECORRIDO
            </div>

            <h2 className={styles.title}>
              Formación y proyectos
              <span> en evolución.</span>
            </h2>
          </div>

          <div className={styles.headerRight}>
            <p>
              Formación y proyectos que reflejan mi evolución
              en el desarrollo de productos digitales, desde los
              fundamentos técnicos hasta aplicaciones Full Stack completas.
            </p>

            <div
              className={styles.filterTabs}
              role="group"
              aria-label="Filtrar recorrido"
            >
              {filters.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  className={`${styles.tab} ${
                    filter === item.id ? styles.tabActive : ''
                  }`}
                  onClick={() => setFilter(item.id)}
                  aria-pressed={filter === item.id}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className={styles.timelinePanel} key={filter}>
          <div className={styles.timelineLine}></div>

          {filteredData.map((item, index) => {
            const Icon =
              item.type === 'edu' ? EducationIcon : ProjectIcon;

            const typeClass =
              item.type === 'edu'
                ? styles.typeEdu
                : styles.typeProject;

            const nodeClass =
              item.type === 'edu'
                ? styles.nodeEdu
                : styles.nodeProject;

            return (
              <article
                className={`${styles.timelineItem} ${styles.revealItem}`}
                key={item.id}
                data-journey-reveal
                style={{
                  '--reveal-delay': `${Math.min(index, 10) * 65}ms`
                }}
              >
                <div className={styles.meta}>
                  <span className={styles.year}>{item.year}</span>

                  <span className={`${styles.typeTag} ${typeClass}`}>
                    {item.type === 'edu' ? 'Educación' : 'Proyecto'}
                  </span>
                </div>

                <div className={`${styles.node} ${nodeClass}`}>
                  <Icon />
                </div>

                <div
                  className={`${styles.card} ${
                    item.type === 'project' ? styles.projectCard : ''
                  }`}
                >
                  <div className={styles.cardHeading}>
                    <div>
                      <h3>{item.title}</h3>
                      <p className={styles.org}>{item.org}</p>
                    </div>
                  </div>

                  <p className={styles.description}>
                    {item.description}
                  </p>

                  <div className={styles.badges}>
                    {item.tech.map((tech) => (
                      <span
                        key={tech}
                        style={{ '--typing-steps': Math.max(tech.length, 1) }}
                      >
                        <span className={styles.badgeText} data-text={tech}>
                          {tech}
                        </span>
                      </span>
                    ))}
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Journey;