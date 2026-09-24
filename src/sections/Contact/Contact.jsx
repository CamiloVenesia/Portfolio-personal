import React, { useRef } from 'react';
import emailjs from '@emailjs/browser';
import styles from './Contact.module.css';
import toast, { Toaster } from 'react-hot-toast';

const Contact = () => {
    const form = useRef();

    const sendEmail = (e) => {
        e.preventDefault();

        const toastId = toast.loading('Enviando mensaje...');

        emailjs.sendForm(
            import.meta.env.VITE_EMAILJS_SERVICE_ID, 
            import.meta.env.VITE_EMAILJS_TEMPLATE_ID, 
            form.current, 
            import.meta.env.VITE_EMAILJS_PUBLIC_KEY
        )
        .then(() => {
            toast.success('¡Mensaje enviado con éxito! Te responderé pronto.', {
                id: toastId, 
            });
            e.target.reset(); 
        }, () => {
            toast.error('Hubo un error al enviar el mensaje. Por favor, intentá de nuevo.', {
                id: toastId,
            });
        });
    };

    return (
        <section className={styles.contact} id="contact">
            <div className={styles.contactBlob}></div>

            <Toaster position="bottom-right" reverseOrder={false} />

            <div className={styles.titleContainer} data-aos="fade-down">
                <svg className={styles.titleIcon} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                    <polyline points="22,6 12,13 2,6"></polyline>
                </svg>
                <h2 className={styles.title}>Mi <span>Contacto</span></h2>
            </div>

            <div className={styles.container}>
                <div className={styles.infoColumn} data-aos="fade-right">
                    <h3>¡Hablemos de código!</h3>
                    <p>
                        Actualmente estoy abierto a nuevas oportunidades laborales y proyectos freelance. 
                        Si tenés alguna consulta, propuesta o simplemente querés saludar, ¡no dudes en escribirme!
                    </p>
                    
                    <div className={styles.socialLinks}>
                        <a href="https://www.linkedin.com/in/camilovenesia/" target="_blank" rel="noreferrer" className={styles.socialBtn}>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                            </svg>
                            LinkedIn
                        </a>
                        
                        <a 
                            href="https://mail.google.com/mail/?view=cm&fs=1&to=camilovenesia.dev@gmail.com" 
                            target="_blank" 
                            rel="noreferrer" 
                            className={styles.socialBtn}
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                                <polyline points="22,6 12,13 2,6"></polyline>
                            </svg>
                            Enviar Email
                        </a>
                    </div>
                </div>

                <form ref={form} onSubmit={sendEmail} className={styles.formColumn} data-aos="fade-left">
                    <div className={styles.inputGroup}>
                        <div className={styles.fieldWrapper}>
                            <label htmlFor="user_name" className={styles.srOnly}>Tu nombre</label>
                            <input id="user_name" type="text" name="user_name" placeholder="Tu Nombre" required className={styles.input} />
                        </div>
                        <div className={styles.fieldWrapper}>
                            <label htmlFor="user_email" className={styles.srOnly}>Tu email</label>
                            <input id="user_email" type="email" name="user_email" placeholder="Tu Email" required className={styles.input} />
                        </div>
                    </div>

                    <div className={styles.fieldWrapper}>
                        <label htmlFor="subject" className={styles.srOnly}>Asunto</label>
                        <input id="subject" type="text" name="subject" placeholder="Asunto" required className={styles.input} />
                    </div>

                    <div className={styles.fieldWrapper}>
                        <label htmlFor="message" className={styles.srOnly}>Tu mensaje</label>
                        <textarea id="message" name="message" placeholder="Tu Mensaje..." required className={styles.textarea}></textarea>
                    </div>
                    
                    <button type="submit" className={styles.submitBtn}>
                        Enviar Mensaje
                    </button>
                </form>
            </div>
        </section>
    );
};

export default Contact;