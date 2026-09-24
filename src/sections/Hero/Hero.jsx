import React from 'react';
import Tilt from 'react-parallax-tilt';
import styles from './Hero.module.css';
import { scrollToSection } from '../../utils/scrollToSection';

const Hero = () => {
    return (
        <section className={styles.hero} id="home">
            <div className={`${styles.blob} ${styles.blob__1}`}></div>
            <div className={`${styles.blob} ${styles.blob__2}`}></div>

            <div className={styles.container}>
                <div className={styles.content}>
                    <h2 className={styles.subtitle}>Full Stack Developer</h2>
                    <h1 className={styles.title}>
                        CAMILO <br />
                        <span className={styles.strokeText}>VENESIA</span>
                    </h1>
                    <p className={styles.description}>
                        Transformando ideas complejas en experiencias digitales <br />
                        <span>minimalistas, veloces y con estilo.</span>
                    </p>
                    <div className={styles.ctaContainer}>
                        <a href="#projects" className={styles.primaryBtn} onClick={(e) => scrollToSection(e, 'projects')}>Ver Proyectos</a>
                        <a href="#contact" className={styles.secondaryBtn} onClick={(e) => scrollToSection(e, 'contact')}>Hablemos</a>
                    </div>
                </div>

                <div className={styles.imageWrapper}>
                    <div className={styles.glassCircle}></div>
                    <div className={`${styles.decorator} ${styles.decorator__1}`}>+</div>
                    <div className={`${styles.decorator} ${styles.decorator__2}`}></div>
                    
                    <Tilt 
                        perspective={1000} 
                        glareEnable={true} 
                        glareMaxOpacity={0.45} 
                        scale={1.05}
                        gyroscope={true}
                        className={styles.tiltCard}
                    >
                        <div className={styles.cardInner}>
                            <img src="/assets/yoformal.jpg" alt="Camilo Venesia" className={styles.heroImage} />
                            <div className={styles.cardOverlay}></div>
                        </div>
                    </Tilt>
                </div>
            </div>
        </section>
    );
};

export default Hero;