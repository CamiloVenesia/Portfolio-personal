
import React, { useEffect, useState } from 'react';
import styles from './Skills.module.css';

import {
  SiReact,
  SiJavascript,
  SiHtml5,
  SiCss,
  SiVite,
  SiTailwindcss,
  SiSass,
  SiNodedotjs,
  SiExpress,
  SiJsonwebtokens,
  SiMongodb,
  SiMysql,
  SiFirebase,
  SiGit,
  SiGithub,
  SiPostman,
  SiRender
} from 'react-icons/si';

import { VscVscode } from 'react-icons/vsc';
import { TbApi, TbDatabase } from 'react-icons/tb';

const skillGroups = [
  {
    id: 'frontend',
    number: '01',
    title: 'Frontend & Interfaces',
    fileName: 'frontend.dev',
    description: 'Interfaces, componentes y experiencia de usuario.',
    technologies: [
      {
        name: 'React',
        Icon: SiReact,
        color: '#61DAFB',
        description: 'Interfaces dinámicas mediante componentes reutilizables.'
      },
      {
        name: 'JavaScript',
        Icon: SiJavascript,
        color: '#F7DF1E',
        description: 'Lógica e interactividad para aplicaciones web.'
      },
      {
        name: 'HTML5',
        Icon: SiHtml5,
        color: '#E34F26',
        description: 'Estructura semántica del contenido web.'
      },
      {
        name: 'CSS3',
        Icon: SiCss,
        color: '#1572B6',
        description: 'Diseño visual, layouts y adaptación responsive.'
      },
      {
        name: 'Vite',
        Icon: SiVite,
        color: '#A78BFA',
        description: 'Entorno de desarrollo y compilación frontend.'
      },
      {
        name: 'Tailwind CSS',
        Icon: SiTailwindcss,
        color: '#06B6D4',
        description: 'Estilos consistentes mediante clases de utilidad.'
      },
      {
        name: 'Sass',
        Icon: SiSass,
        color: '#CC6699',
        description: 'Hojas de estilo organizadas y reutilizables.'
      }
    ]
  },
  {
    id: 'backend',
    number: '02',
    title: 'Backend & APIs',
    fileName: 'backend.dev',
    description: 'Servicios, APIs y lógica de negocio.',
    technologies: [
      {
        name: 'Node.js',
        Icon: SiNodedotjs,
        color: '#5FA04E',
        description: 'Ejecución de JavaScript del lado del servidor.'
      },
      {
        name: 'Express',
        Icon: SiExpress,
        color: '#A3AAB4',
        description: 'Rutas, middleware y servicios HTTP.'
      },
      {
        name: 'REST APIs',
        Icon: TbApi,
        color: '#00ABF0',
        description: 'Comunicación entre aplicaciones mediante HTTP.'
      },
      {
        name: 'JWT',
        Icon: SiJsonwebtokens,
        color: '#D6A7FF',
        description: 'Autenticación y autorización mediante tokens.'
      }
    ]
  },
  {
    id: 'data',
    number: '03',
    title: 'Databases & Data',
    fileName: 'data.store',
    description: 'Almacenamiento, consultas y gestión de información.',
    technologies: [
      {
        name: 'MongoDB',
        Icon: SiMongodb,
        color: '#47A248',
        description: 'Base de datos NoSQL orientada a documentos.'
      },
      {
        name: 'MySQL',
        Icon: SiMysql,
        color: '#4479A1',
        description: 'Gestión de datos relacionales mediante SQL.'
      },
      {
        name: 'Firebase',
        Icon: SiFirebase,
        color: '#FFCA28',
        description: 'Servicios cloud para aplicaciones web.'
      },
      {
        name: 'Firestore',
        Icon: TbDatabase,
        color: '#EAB308',
        description: 'Base de datos NoSQL alojada en la nube.'
      },
      {
        name: 'MongoDB Atlas',
        Icon: SiMongodb,
        color: '#47A248',
        description: 'Gestión de bases MongoDB en infraestructura cloud.'
      }
    ]
  },
  {
    id: 'tools',
    number: '04',
    title: 'Tools & Deployment',
    fileName: 'tools.config',
    description: 'Versionado, pruebas y despliegue de aplicaciones.',
    technologies: [
      {
        name: 'Git',
        Icon: SiGit,
        color: '#F05032',
        description: 'Control de cambios e historial del código.'
      },
      {
        name: 'GitHub',
        Icon: SiGithub,
        color: '#AEB8C5',
        description: 'Repositorios y colaboración en proyectos.'
      },
      {
        name: 'VS Code',
        Icon: VscVscode,
        color: '#007ACC',
        description: 'Edición y depuración de código.'
      },
      {
        name: 'Postman',
        Icon: SiPostman,
        color: '#FF6C37',
        description: 'Pruebas y validación de servicios API.'
      },
      {
        name: 'Render',
        Icon: SiRender,
        color: '#46E3B7',
        description: 'Despliegue de aplicaciones y servicios web.'
      }
    ]
  }
];

const TypewriterText = ({ text, active }) => {
  const [displayedText, setDisplayedText] = useState(
    active ? '' : text
  );

  useEffect(() => {
    if (!active) {
      setDisplayedText(text);
      return;
    }

    setDisplayedText('');

    let index = 0;

    const interval = setInterval(() => {
      index += 1;
      setDisplayedText(text.slice(0, index));

      if (index >= text.length) {
        clearInterval(interval);
      }
    }, 65);

    return () => clearInterval(interval);
  }, [text, active]);

  return (
    <span className={styles.typewriterText}>
      <span>{displayedText}</span>
      <span className={styles.typewriterCaret}></span>
    </span>
  );
};

const Skills = () => {
  const [activeGroupId, setActiveGroupId] = useState('frontend');
  const [selectedTechnologyName, setSelectedTechnologyName] =
    useState('React');

  const activeGroup =
    skillGroups.find((group) => group.id === activeGroupId) ||
    skillGroups[0];

  const selectedTechnology =
    activeGroup.technologies.find(
      (technology) => technology.name === selectedTechnologyName
    ) || activeGroup.technologies[0];

  const handleGroupSelect = (group) => {
    setActiveGroupId(group.id);
    setSelectedTechnologyName(group.technologies[0].name);
  };

  const handleTechnologySelect = (group, technology) => {
    setActiveGroupId(group.id);
    setSelectedTechnologyName(technology.name);
  };

  const SelectedIcon = selectedTechnology.Icon;

  return (
    <section className={styles.skills} id="skills">
      <div className={styles.skillsBlob} aria-hidden="true" />

      <div className={styles.container}>
        <header className={styles.header}>
          <div>
            <div className={styles.eyebrow}>
              <span />
              STACK TÉCNICO / ECOSISTEMA
            </div>

            <h2 className={styles.title}>
              Mi stack de <span>desarrollo.</span>
            </h2>
          </div>

          <p className={styles.subtitle}>
            Tecnologías y herramientas que utilizo para desarrollar,
            conectar y desplegar aplicaciones web.
          </p>
        </header>

        <div className={styles.selectionPanel}>
          <div className={styles.selectedLayer}>
            <span className={styles.detailKicker}>
              CAPA SELECCIONADA / {activeGroup.number}
            </span>

            <h3>{activeGroup.title}</h3>

            <p>{activeGroup.description}</p>
          </div>

          <div className={styles.selectedTechnology}>
            <div className={styles.selectedTechnologyHeader}>
              <span className={styles.detailKicker}>
                TECNOLOGÍA SELECCIONADA
              </span>
            </div>

            <div className={styles.selectedTechnologyTitle}>
              <SelectedIcon
                className={styles.selectedIcon}
                style={{ color: selectedTechnology.color }}
                aria-hidden="true"
              />

              <h4>{selectedTechnology.name}</h4>
            </div>

            <p className={styles.technologyCaption}>
              {selectedTechnology.description}
            </p>
          </div>
        </div>

        <div className={styles.groupList}>
          {skillGroups.map((group) => {
            const isActive = activeGroupId === group.id;

            return (
              <article
                className={`${styles.groupRow} ${
                  isActive ? styles.groupRowActive : ''
                }`}
                key={group.id}
              >
                <button
                  type="button"
                  className={styles.groupSelector}
                  onClick={() => handleGroupSelect(group)}
                  aria-pressed={isActive}
                >
                  <span className={styles.groupNumber}>
                    {group.number}
                  </span>

                  <span className={styles.groupInformation}>
                    <strong>{group.title}</strong>

                    <small>
                      <TypewriterText
                        text={group.fileName}
                        active={isActive}
                      />
                    </small>
                  </span>
                </button>

                <div className={styles.groupTechnologies}>
                  <span className={styles.groupCount}>
                    {String(group.technologies.length).padStart(2, '0')}
                  </span>

                  <div className={styles.technologyList}>
                    {group.technologies.map((technology) => {
                      const TechnologyIcon = technology.Icon;

                      const isSelected =
                        isActive &&
                        selectedTechnologyName === technology.name;

                      return (
                        <button
                          type="button"
                          key={technology.name}
                          className={`${styles.technologyButton} ${
                            isSelected
                              ? styles.technologyButtonActive
                              : ''
                          }`}
                          onClick={() =>
                            handleTechnologySelect(group, technology)
                          }
                          aria-pressed={isSelected}
                        >
                          <TechnologyIcon
                            className={styles.technologyIcon}
                            style={{ color: technology.color }}
                            aria-hidden="true"
                          />

                          <span>{technology.name}</span>
                        </button>
                      );
                    })}
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

export default Skills;
