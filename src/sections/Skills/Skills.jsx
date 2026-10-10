import React from 'react';
import styles from './Skills.module.css';

const Skills = () => {
    const skillsData = [
        {
            category: "Frontend",
            fileName: "frontend.dev",
            items: [
                "React",
                "JavaScript",
                "HTML5",
                "CSS3",
                "Vite",
                "Tailwind",
                "Sass"
            ]
        },
        {
            category: "Backend",
            fileName: "backend.dev",
            items: [
                "Node.js",
                "Express",
                "MongoDB",
                "MySQL",
                "REST APIs",
                "JWT"
            ]
        },
        {
            category: "Herramientas & Cloud",
            fileName: "tools.config",
            items: [
                "Git",
                "GitHub",
                "VS Code",
                "Postman",
                "Firebase",
                "Firestore",
                "MongoDB Atlas",
                "Render"
            ]
        }
    ];

    return (
        <section className={styles.skills} id="skills">
            <div className={styles.skillsBlob}></div>

            <div className={styles.header} data-aos="fade-up">
                <div>
                    <div className={styles.eyebrow}>
                        <span></span>
                        STACK TÉCNICO
                    </div>

                    <h2 className={styles.title}>
                        Skills & <span>herramientas.</span>
                    </h2>
                </div>

                <p className={styles.subtitle}>
                    Tecnologías y herramientas que utilizo para desarrollar,
                    conectar y desplegar aplicaciones web.
                </p>
            </div>

            <div className={styles.grid}>
                {skillsData.map((group, index) => (
                    <div
                        className={styles.window}
                        key={group.category}
                        data-aos="fade-up"
                        data-aos-delay={index * 100}
                    >
                        <div className={styles.windowBar}>
                            <div className={styles.dots}>
                                <span className={styles.dotRed}></span>
                                <span className={styles.dotYellow}></span>
                                <span className={styles.dotGreen}></span>
                            </div>

                            <span className={styles.fileName}>
                                {group.fileName}
                            </span>

                            <span className={styles.count}>
                                {group.items.length}
                            </span>
                        </div>

                        <div className={styles.windowBody}>
                            <h3>{group.category}</h3>

                            <div className={styles.tags}>
                                {group.items.map((item) => (
                                    <span
                                        key={item}
                                        className={styles.tag}
                                    >
                                        <span className={styles.tagDot}></span>
                                        {item}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default Skills;