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

            <div
                className={styles.titleContainer}
                data-aos="fade-down"
            >
                <svg
                    className={styles.titleIcon}
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                >
                    <polyline points="16 18 22 12 16 6"></polyline>
                    <polyline points="8 6 2 12 8 18"></polyline>
                </svg>

                <h2 className={styles.title}>
                    Mis <span>Skills</span>
                </h2>
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
                                        <span
                                            className={styles.tagDot}
                                        ></span>

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