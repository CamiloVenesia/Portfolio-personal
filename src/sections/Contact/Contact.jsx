import React, { useRef, useState } from 'react';
import styles from './Contact.module.css';

const Contact = () => {
  const startedAt = useRef(Date.now());

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
    website: ''
  });

  const [status, setStatus] = useState({
    type: 'idle',
    message: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const sendMessage = async (e) => {
    e.preventDefault();

    if (status.type === 'sending') return;

    setStatus({
      type: 'sending',
      message: 'Enviando mensaje...'
    });

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          ...formData,
          formStartedAt: startedAt.current
        })
      });

      const data = await response.json().catch(() => ({}));

      if (!response.ok) {
        throw new Error(
          data.error || 'No se pudo enviar el mensaje.'
        );
      }

      setFormData({
        name: '',
        email: '',
        subject: '',
        message: '',
        website: ''
      });

      startedAt.current = Date.now();

      setStatus({
        type: 'success',
        message: 'Tu mensaje fue enviado correctamente. Gracias por contactarme.'
      });
    } catch (error) {
      setStatus({
        type: 'error',
        message:
          error.message ||
          'Ocurrió un error al enviar el mensaje. Intentá nuevamente.'
      });
    }
  };

  return (
    <section className={styles.contact} id="contact">
      <div className={styles.gridBackground}></div>
      <div className={styles.contactBlob}></div>

      <div className={styles.container}>
        <div className={styles.header} data-aos="fade-up">
          <div>
            <div className={styles.eyebrow}>
              <span></span>
              CONTACTO
            </div>

            <h2 className={styles.title}>
              Hablemos<span>.</span>
            </h2>
          </div>
        </div>

        <div className={styles.contactGrid}>
          <div className={styles.infoColumn} data-aos="fade-right">
            <div className={styles.availability}>
              <span className={styles.statusDot}></span>
              Disponible para oportunidades
            </div>

            <h3>Podés contactarme directamente.</h3>

            <p className={styles.intro}>
              Estoy abierto a conversar sobre desarrollo web, proyectos
              freelance y oportunidades profesionales.
            </p>

            <div className={styles.contactDetails}>
              <a
                href="mailto:camilovenesia.dev@gmail.com"
                className={styles.contactItem}
              >
                <div className={styles.iconBox}>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                    <rect x="3" y="5" width="18" height="14" rx="2"></rect>
                    <path d="m3 7 9 6 9-6"></path>
                  </svg>
                </div>

                <div>
                  <span>Email</span>
                  <strong>camilovenesia.dev@gmail.com</strong>
                </div>
              </a>

              <div className={styles.contactItem}>
                <div className={styles.iconBox}>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                    <path d="M20 10c0 5-8 11-8 11S4 15 4 10a8 8 0 1 1 16 0Z"></path>
                    <circle cx="12" cy="10" r="2.5"></circle>
                  </svg>
                </div>

                <div>
                  <span>Ubicación</span>
                  <strong>Rosario, Argentina</strong>
                </div>
              </div>
            </div>

            <div className={styles.socialLinks}>
              <a
                href="https://www.linkedin.com/in/camilovenesia/"
                target="_blank"
                rel="noreferrer"
              >
                LinkedIn
                <span>↗</span>
              </a>

              <a
                href="https://github.com/CamiloVenesia"
                target="_blank"
                rel="noreferrer"
              >
                GitHub
                <span>↗</span>
              </a>
            </div>
          </div>

          <form
            className={styles.formCard}
            onSubmit={sendMessage}
            data-aos="fade-left"
          >
            <div className={styles.formHeader}>
              <span>ENVIAR MENSAJE</span>
              <p>
                Completá el formulario y el mensaje llegará directamente a mi email.
              </p>
            </div>

            <div className={styles.row}>
              <div className={styles.field}>
                <label htmlFor="contact-name">Nombre</label>

                <input
                  id="contact-name"
                  name="name"
                  type="text"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Tu nombre"
                  autoComplete="name"
                  maxLength="80"
                  required
                />
              </div>

              <div className={styles.field}>
                <label htmlFor="contact-email">Email</label>

                <input
                  id="contact-email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="tu@email.com"
                  autoComplete="email"
                  maxLength="254"
                  required
                />
              </div>
            </div>

            <div className={styles.field}>
              <label htmlFor="contact-subject">Asunto</label>

              <input
                id="contact-subject"
                name="subject"
                type="text"
                value={formData.subject}
                onChange={handleChange}
                placeholder="¿Sobre qué querés conversar?"
                maxLength="120"
                required
              />
            </div>

            <div className={styles.field}>
              <label htmlFor="contact-message">Mensaje</label>

              <textarea
                id="contact-message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="Contame brevemente en qué puedo ayudarte..."
                maxLength="3000"
                required
              ></textarea>

              <span className={styles.characterCount}>
                {formData.message.length} / 3000
              </span>
            </div>

            <div className={styles.honeypot} aria-hidden="true">
              <label htmlFor="contact-website">Website</label>

              <input
                id="contact-website"
                name="website"
                type="text"
                value={formData.website}
                onChange={handleChange}
                tabIndex="-1"
                autoComplete="off"
              />
            </div>

            <button
              type="submit"
              className={styles.submitButton}
              disabled={status.type === 'sending'}
            >
              <span>
                {status.type === 'sending'
                  ? 'Enviando...'
                  : 'Enviar mensaje'}
              </span>

              {status.type !== 'sending' && (
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M5 12h14"></path>
                  <path d="m13 6 6 6-6 6"></path>
                </svg>
              )}

              {status.type === 'sending' && (
                <span className={styles.loader}></span>
              )}
            </button>

            <div
              className={
                styles.status +
                (status.type === 'success'
                  ? ' ' + styles.statusSuccess
                  : '') +
                (status.type === 'error'
                  ? ' ' + styles.statusError
                  : '')
              }
              aria-live="polite"
            >
              {status.type === 'success' && (
                <span className={styles.statusIcon}>✓</span>
              )}

              {status.type === 'error' && (
                <span className={styles.statusIcon}>!</span>
              )}

              {status.type !== 'idle' &&
                status.type !== 'sending' &&
                status.message}
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Contact;