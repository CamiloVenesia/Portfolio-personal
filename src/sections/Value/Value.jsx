
import React, { useState } from 'react';
import styles from './Value.module.css';
import { scrollToSection } from '../../utils/scrollToSection';

const stages = [
  {
    number: '01',
    label: 'PRODUCTO',
    title: 'Entender el producto',
    description:
      'Definir qué problema se resuelve, quién lo necesita y qué recorrido debería tener la solución.',
    detail:
      'El punto de partida no es una tecnología: es entender el objetivo, el contexto y la experiencia que necesita la persona que va a usar el producto.',
    keywords: ['Contexto', 'Usuario', 'Prioridades']
  },
  {
    number: '02',
    label: 'FRONTEND',
    title: 'Construir la experiencia',
    description:
      'Traducir las necesidades en interfaces claras y funcionalidades coherentes.',
    detail:
      'Diseño y desarrollo interfaces responsive, componentes reutilizables y flujos claros, conectando la experiencia visual con el comportamiento de la aplicación.',
    keywords: ['React', 'Experiencia de usuario', 'Responsive']
  },
  {
    number: '03',
    label: 'BACKEND',
    title: 'Conectar la ingeniería',
    description:
      'Integrar APIs, reglas de negocio, autenticación y persistencia de datos.',
    detail:
      'Trabajo las capas de backend y datos como parte de la misma solución: endpoints, validaciones, permisos, integridad y comunicación entre servicios.',
    keywords: ['APIs', 'Validaciones', 'Datos']
  },
  {
    number: '04',
    label: 'ENTREGA',
    title: 'Validar y llevar a producción',
    description:
      'Probar, corregir y desplegar con atención a los escenarios reales.',
    detail:
      'Una funcionalidad no está terminada cuando compila. Hay que revisar errores, estados, seguridad y comportamiento real, y preparar el despliegue para que sea confiable.',
    keywords: ['Testing', 'Corrección', 'Deploy']
  }
];

const teamPrinciples = [
  {
    number: '01',
    title: 'Criterio de producto',
    description:
      'Entender el contexto antes de proponer soluciones. Priorizar lo que aporta valor al usuario y al objetivo del proyecto, en lugar de sumar funcionalidades porque sí.'
  },
  {
    number: '02',
    title: 'Comunicación y colaboración',
    description:
      'Compartir avances, escuchar feedback y mantener alineadas las decisiones técnicas con las necesidades del equipo. El trabajo mejora cuando las ideas se pueden discutir con claridad.'
  },
  {
    number: '03',
    title: 'Responsabilidad técnica',
    description:
      'Cuidar la legibilidad, las validaciones y los casos límite. No considerar terminado algo solo porque funciona en el escenario ideal.'
  },
  {
    number: '04',
    title: 'Aprendizaje y adaptación',
    description:
      'Investigar, incorporar feedback y adaptarse a nuevas herramientas cuando realmente mejoran el resultado y la forma de trabajar.'
  }
];

const nodePositions = [70, 250, 430, 610];

const Value = () => {
  const [activeStage, setActiveStage] = useState(0);
  const [activePrinciple, setActivePrinciple] = useState(0);

  const handleStageSelect = (index) => {
    setActiveStage(index);
  };

  const selectedStage = stages[activeStage];
  const progressOffset = 540 - activeStage * 180;

  return (
    <section className={styles.value} id="value">
      <div className={styles.gridBackground}></div>
      <div className={`${styles.glow} ${styles.glowOne}`}></div>
      <div className={`${styles.glow} ${styles.glowTwo}`}></div>

      <div className={styles.container}>
        <header className={styles.header}>
          <div className={styles.headerMain}>
            <div className={styles.eyebrow}>
              <span></span>
              LO QUE APORTO
            </div>

            <h2>
              No se trata solo de escribir código.
              <span> Se trata de construir productos que funcionen.</span>
            </h2>
          </div>

          <p className={styles.headerDescription}>
            Pienso cada desarrollo como un sistema completo: entiendo el
            problema, diseño la experiencia, conecto la lógica y cuido lo que
            llega a producción.
          </p>
        </header>

        <div className={styles.sectionDivider}>
          <span>DEL PROBLEMA A PRODUCCIÓN</span>
          <span className={styles.dividerLine}></span>
          <span>UNA VISIÓN INTEGRAL</span>
        </div>

        <div className={styles.journeyLayout}>
          <div
            className={styles.stageList}
            aria-label="Etapas de construcción de un producto"
          >
            {stages.map((stage, index) => (
              <button
                className={`${styles.stageItem} ${activeStage === index ? styles.stageActive : ''}`}
                key={stage.number}
                type="button"
                onClick={() => handleStageSelect(index)}
                aria-pressed={activeStage === index}
              >
                <span className={styles.stageNumber}>{stage.number}</span>

                <span className={styles.stageCopy}>
                  <span className={styles.stageLabel}>{stage.label}</span>
                  <strong>{stage.title}</strong>
                  <span className={styles.stageDescription}>
                    {stage.description}
                  </span>
                </span>

                <span className={styles.stageArrow} aria-hidden="true">
                  <svg viewBox="0 0 24 24" fill="none">
                    <path d="M5 12h14M13 6l6 6-6 6" />
                  </svg>
                </span>
              </button>
            ))}
          </div>

          <aside className={styles.systemVisual}>
            <div className={styles.visualHeader}>
              <div className={styles.visualHeaderLabel}>
                <span className={styles.visualStatus}></span>
                MAPA DE CONSTRUCCIÓN
              </div>

              <span className={styles.visualCounter}>
                {selectedStage.number} <span>/ 04</span>
              </span>
            </div>

            <div className={styles.diagramWrap}>
              <svg
                className={styles.diagram}
                viewBox="0 0 680 180"
                role="img"
                aria-label={`Etapa activa: ${selectedStage.label.toLowerCase()}`}
              >
                <path d="M70 75 H610" className={styles.diagramTrack} />

                <path
                  d="M70 75 H610"
                  className={styles.diagramProgress}
                  style={{
                    strokeDasharray: 540,
                    strokeDashoffset: progressOffset
                  }}
                />

                {stages.map((stage, index) => {
                  const isActive = activeStage === index;
                  const isComplete = activeStage > index;

                  return (
                    <g
                      className={`${styles.diagramNode} ${isActive ? styles.diagramNodeActive : ''} ${isComplete ? styles.diagramNodeComplete : ''}`}
                      key={stage.number}
                    >
                      {isActive && (
                        <circle
                          cx={nodePositions[index]}
                          cy="75"
                          r="31"
                          className={styles.nodePulse}
                        />
                      )}

                      <circle
                        cx={nodePositions[index]}
                        cy="75"
                        r="19"
                        className={styles.nodeCore}
                      />

                      <circle
                        cx={nodePositions[index]}
                        cy="75"
                        r="5"
                        className={styles.nodeCenter}
                      />
                    </g>
                  );
                })}
              </svg>

              <div className={styles.diagramLegend}>
                {stages.map((stage, index) => (
                  <div
                    className={`${styles.diagramLegendItem} ${activeStage === index ? styles.diagramLegendActive : ''}`}
                    key={stage.number}
                  >
                    <span>{stage.label}</span>
                    <strong>{stage.number}</strong>
                  </div>
                ))}
              </div>
            </div>

            <div
              className={styles.activeStageContent}
              key={selectedStage.number}
              aria-live="polite"
            >
              <div className={styles.activeStageEyebrow}>
                ETAPA {selectedStage.number} / 04
              </div>

              <h3>{selectedStage.title}</h3>
              <p>{selectedStage.detail}</p>

              <div className={styles.stageKeywords}>
                {selectedStage.keywords.map((keyword) => (
                  <span key={keyword}>{keyword}</span>
                ))}
              </div>
            </div>

            <div className={styles.visualFootnote}>
              <span></span>
              CADA DECISIÓN IMPACTA EN EL PRODUCTO COMPLETO
            </div>
          </aside>
        </div>

        <section
          className={styles.teamSection}
          aria-labelledby="team-title"
        >
          <div className={styles.teamIntro}>
            <div className={styles.eyebrow}>
              <span></span>
              TRABAJANDO EN EQUIPO
            </div>

            <h3 id="team-title">
              Un buen producto también se construye
              <span> en equipo.</span>
            </h3>

            <p>
              Me interesa formar parte de equipos donde se comparten ideas,
              se conversa sobre las decisiones y cada persona se compromete
              con el resultado.
            </p>

            <div className={styles.teamStatement}>
              <span>MI FORMA DE APORTAR</span>
              <strong>Iniciativa, criterio y responsabilidad.</strong>
            </div>
          </div>

          <div className={styles.teamList}>
            {teamPrinciples.map((principle, index) => {
              const isOpen = activePrinciple === index;

              return (
                <article
                  className={`${styles.teamItem} ${isOpen ? styles.teamItemActive : ''}`}
                  key={principle.number}
                >
                  <button
                    className={styles.teamTrigger}
                    type="button"
                    onClick={() =>
                      setActivePrinciple(isOpen ? -1 : index)
                    }
                    aria-expanded={isOpen}
                  >
                    <span className={styles.teamNumber}>
                      {principle.number}
                    </span>

                    <span className={styles.teamTitle}>
                      {principle.title}
                    </span>

                    <span className={styles.teamToggle} aria-hidden="true">
                      {isOpen ? '−' : '+'}
                    </span>
                  </button>

                  {isOpen && (
                    <div
                      className={styles.teamDetail}
                      id={`team-detail-${principle.number}`}
                    >
                      <p>{principle.description}</p>
                    </div>
                  )}
                </article>
              );
            })}
          </div>
        </section>

        <div className={styles.transition}>
          <p>
            Las decisiones se reflejan en lo que construyo.
            <strong> Los proyectos son la evidencia.</strong>
          </p>

          <button
            className={styles.projectLink}
            onClick={(event) => scrollToSection(event, 'projects')}
            aria-label="Ir a proyectos"
            type="button"
          >
            <span>VER PROYECTOS</span>

            <span className={styles.arrowCircle}>
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <line x1="12" y1="4" x2="12" y2="19"></line>
                <polyline points="6 13 12 19 18 13"></polyline>
              </svg>
            </span>
          </button>
        </div>
      </div>
    </section>
  );
};

export default Value;
