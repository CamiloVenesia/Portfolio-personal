import React from 'react';
import styles from './Value.module.css';
import { scrollToSection } from '../../utils/scrollToSection';

const Value = () => {
  const teamValue = [
    {
      number: "01",
      title: "Criterio de producto",
      description:
        "No pienso una funcionalidad solo desde el código. También considero cómo se entiende, cómo se usa y qué problema real tiene que resolver."
    },
    {
      number: "02",
      title: "Visión de punta a punta",
      description:
        "Puedo moverme entre interfaz, lógica, APIs y datos, entendiendo cómo una decisión en una capa impacta en el resto del producto."
    },
    {
      number: "03",
      title: "Calidad visual y técnica",
      description:
        "Cuido tanto la experiencia y los detalles de interfaz como la organización del código, las validaciones y la consistencia de los datos."
    },
    {
      number: "04",
      title: "Aprendizaje continuo",
      description:
        "Busco mejorar constantemente mi forma de construir software, incorporando nuevas herramientas cuando realmente aportan valor al proyecto."
    }
  ];

  return (
    <section className={styles.value} id="value">
      <div className={styles.gridBackground}></div>
      <div className={styles.glow + ' ' + styles.glowOne}></div>
      <div className={styles.glow + ' ' + styles.glowTwo}></div>

      <div className={styles.container}>
        <div className={styles.header} data-aos="fade-up">
          <div>
            <div className={styles.eyebrow}>
              <span></span>
              LO QUE APORTO
            </div>

            <h2>
              Tecnología con foco
              <span> en producto.</span>
            </h2>
          </div>

          <p>
            No trabajo las capas de una aplicación como piezas aisladas.
            Pienso la experiencia, la lógica y los datos como partes de un
            mismo producto que tiene que ser claro, confiable y útil.
          </p>
        </div>

        <div className={styles.bento}>
          <article
            className={styles.card + ' ' + styles.frontendCard}
            data-aos="fade-up"
          >
            <div className={styles.cardHeader}>
              <div>
                <span className={styles.cardNumber}>01</span>
                <span className={styles.cardCategory}>FORTALEZA PRINCIPAL</span>
              </div>

              <div className={styles.cardIcon}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                  <rect x="3" y="4" width="18" height="16" rx="2"></rect>
                  <line x1="3" y1="9" x2="21" y2="9"></line>
                  <line x1="8" y1="4" x2="8" y2="9"></line>
                </svg>
              </div>
            </div>

            <div className={styles.frontendContent}>
              <div className={styles.copy}>
                <h3>Frontend & producto</h3>

                <p>
                  Mi foco principal está en construir interfaces que no solo se
                  vean bien: tienen que ser claras, consistentes, responsive y
                  fáciles de usar.
                </p>

                <div className={styles.textPoints}>
                  <span>Jerarquía visual</span>
                  <span>Diseño responsive</span>
                  <span>Componentes reutilizables</span>
                  <span>Interacciones claras</span>
                  <span>Experiencia de usuario</span>
                </div>
              </div>

              <div className={styles.browserMockup}>
                <div className={styles.browserTop}>
                  <div>
                    <span></span>
                    <span></span>
                    <span></span>
                  </div>

                  <p>product.ui</p>
                </div>

                <div className={styles.browserBody}>
                  <div className={styles.mockSidebar}>
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                  </div>

                  <div className={styles.mockContent}>
                    <div className={styles.mockTitle}></div>
                    <div className={styles.mockSubtitle}></div>

                    <div className={styles.mockCards}>
                      <div></div>
                      <div></div>
                    </div>

                    <div className={styles.mockChart}>
                      <i></i>
                      <i></i>
                      <i></i>
                      <i></i>
                      <i></i>
                      <i></i>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </article>

          <article
            className={styles.card + ' ' + styles.fullstackCard}
            data-aos="fade-up"
            data-aos-delay="80"
          >
            <div className={styles.cardHeader}>
              <div>
                <span className={styles.cardNumber}>02</span>
                <span className={styles.cardCategory}>INTEGRACIÓN</span>
              </div>

              <div className={styles.cardIcon}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                  <circle cx="5" cy="12" r="2"></circle>
                  <circle cx="12" cy="5" r="2"></circle>
                  <circle cx="19" cy="12" r="2"></circle>
                  <circle cx="12" cy="19" r="2"></circle>
                  <line x1="6.5" y1="10.5" x2="10.5" y2="6.5"></line>
                  <line x1="13.5" y1="6.5" x2="17.5" y2="10.5"></line>
                  <line x1="17.5" y1="13.5" x2="13.5" y2="17.5"></line>
                  <line x1="10.5" y1="17.5" x2="6.5" y2="13.5"></line>
                </svg>
              </div>
            </div>

            <h3>Desarrollo Full-Stack</h3>

            <p>
              Puedo seguir el recorrido completo de una funcionalidad, desde
              la acción del usuario hasta la lógica que procesa y persiste la información.
            </p>

            <div className={styles.flow}>
              <div>
                <strong>UI</strong>
                <span>Interacción</span>
              </div>

              <i>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <line x1="4" y1="12" x2="20" y2="12"></line>
                  <polyline points="14 6 20 12 14 18"></polyline>
                </svg>
              </i>

              <div>
                <strong>API</strong>
                <span>Servidor</span>
              </div>

              <i>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <line x1="4" y1="12" x2="20" y2="12"></line>
                  <polyline points="14 6 20 12 14 18"></polyline>
                </svg>
              </i>

              <div>
                <strong>Logic</strong>
                <span>Reglas</span>
              </div>

              <i>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <line x1="4" y1="12" x2="20" y2="12"></line>
                  <polyline points="14 6 20 12 14 18"></polyline>
                </svg>
              </i>

              <div>
                <strong>Data</strong>
                <span>Persistencia</span>
              </div>
            </div>
          </article>

          <article
            className={styles.card + ' ' + styles.qualityCard}
            data-aos="fade-up"
            data-aos-delay="120"
          >
            <div className={styles.cardHeader}>
              <div>
                <span className={styles.cardNumber}>03</span>
                <span className={styles.cardCategory}>CALIDAD</span>
              </div>

              <div className={styles.cardIcon}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                  <path d="M12 3 4 7v5c0 5 3.5 8 8 9 4.5-1 8-4 8-9V7l-8-4Z"></path>
                  <polyline points="9 12 11 14 15 10"></polyline>
                </svg>
              </div>
            </div>

            <h3>Arquitectura & confiabilidad</h3>

            <p>
              Una aplicación profesional también tiene que comportarse bien
              cuando algo falla, cuando cambian los datos o cuando distintos
              usuarios tienen permisos diferentes.
            </p>

            <div className={styles.checkList}>
              <div>
                <span></span>
                Validación de datos
              </div>

              <div>
                <span></span>
                Autenticación y roles
              </div>

              <div>
                <span></span>
                Integridad y consistencia
              </div>

              <div>
                <span></span>
                Manejo de errores
              </div>
            </div>
          </article>

          <article
            className={styles.card + ' ' + styles.processCard}
            data-aos="fade-up"
            data-aos-delay="160"
          >
            <div className={styles.cardHeader}>
              <div>
                <span className={styles.cardNumber}>04</span>
                <span className={styles.cardCategory}>FORMA DE TRABAJO</span>
              </div>

              <div className={styles.cardIcon}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                  <path d="M5 4h14v16H5z"></path>
                  <path d="M8 8h8M8 12h5M8 16h7"></path>
                </svg>
              </div>
            </div>

            <h3>Del problema a producción</h3>

            <p>
              Antes de programar, intento entender qué necesita resolver el
              producto. Después construyo, valido e itero hasta llevarlo a un
              entorno real.
            </p>

            <div className={styles.process}>
              <div>
                <span>01</span>
                <strong>Entender</strong>
              </div>

              <div className={styles.processLine}></div>

              <div>
                <span>02</span>
                <strong>Construir</strong>
              </div>

              <div className={styles.processLine}></div>

              <div>
                <span>03</span>
                <strong>Validar</strong>
              </div>

              <div className={styles.processLine}></div>

              <div>
                <span>04</span>
                <strong>Publicar</strong>
              </div>
            </div>
          </article>
        </div>

        <section className={styles.teamSection} data-aos="fade-up">
          <div className={styles.teamIntro}>
            <div className={styles.teamEyebrow}>
              <span></span>
              TRABAJANDO EN EQUIPO
            </div>

            <h3>
              ¿Qué aporto
              <span> a tu equipo?</span>
            </h3>

            <p>
              Un perfil técnico capaz de involucrarse en distintas partes del
              producto, pero con especial sensibilidad por la experiencia,
              el detalle visual y la calidad de lo que finalmente recibe el usuario.
            </p>
          </div>

          <div className={styles.teamGrid}>
            {teamValue.map((item) => (
              <article className={styles.teamItem} key={item.number}>
                <div className={styles.teamNumber}>{item.number}</div>

                <div>
                  <h4>{item.title}</h4>
                  <p>{item.description}</p>
                </div>
              </article>
            ))}
          </div>
        </section>

        <div className={styles.transition} data-aos="fade-up">
          <p>
            Estas ideas no quedan solamente en teoría.
            <strong> Los proyectos son la evidencia.</strong>
          </p>

          <button
            className={styles.projectLink}
            onClick={(e) => scrollToSection(e, 'projects')}
            aria-label="Ir a proyectos"
          >
            <span>VER PROYECTOS</span>

            <div className={styles.arrowCircle}>
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="12" y1="4" x2="12" y2="19"></line>
                <polyline points="6 13 12 19 18 13"></polyline>
              </svg>
            </div>
          </button>
        </div>
      </div>
    </section>
  );
};

export default Value;