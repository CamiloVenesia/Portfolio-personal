<div align="center">

# 👋 Hola, soy Camilo Venesia

### Full Stack Developer | Rosario, Argentina

[![Portfolio](https://img.shields.io/badge/Portfolio-Ver_sitio-00abf0?style=for-the-badge)](#)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-Conectemos-0A66C2?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/camilovenesia/)
[![Email](https://img.shields.io/badge/Email-Contactar-EA4335?style=for-the-badge&logo=gmail&logoColor=white)](mailto:camilovenesia.dev@gmail.com)

</div>

---

## 📋 Sobre este proyecto

Este repositorio contiene el código fuente de mi **portfolio personal**, desarrollado desde cero con React y Vite. Es la carta de presentación donde muestro quién soy, mi formación, mi recorrido profesional, mis proyectos y cómo contactarme.

No es una plantilla descargada ni generada automáticamente: cada sección fue diseñada, iterada y refinada a mano, con foco en el detalle visual, la performance y una experiencia de usuario cuidada.

---

## ✨ Características principales

- 🌗 **Modo claro/oscuro** persistente entre sesiones (`localStorage`)
- 🧭 **Navegación tipo "floating dock"** con scroll suave animado en JavaScript puro
- 🎴 **Tarjeta 3D interactiva** en el Hero con efecto parallax al mover el mouse
- 🗂️ **Bento grid** en la sección "Sobre Mí"
- 📅 **Línea de tiempo interactiva** en "Mi Recorrido", con filtros por Educación/Experiencia y animación de pulso en los ítems activos
- 🧩 **Sección de Skills** con estética tipo editor de código (ventanas con barra estilo macOS)
- 🖼️ **Galería de proyectos** con overlay de enlaces a repositorio y demo en vivo
- 🎠 **Carrusel de certificaciones** con vista ampliada (lightbox), navegación por teclado y filmstrip de miniaturas
- 🎞️ **Carrusel infinito de tecnologías** con logos de marca reales
- ✉️ **Formulario de contacto funcional** vía EmailJS, sin necesidad de backend propio
- 📱 **100% responsivo**, probado en mobile, tablet y desktop
- ♿ Atención a accesibilidad básica (`aria-label`, labels ocultos para lectores de pantalla)

---

## 🛠️ Stack tecnológico

| Categoría | Tecnologías |
|---|---|
| **Core** | React 18, Vite |
| **Estilos** | CSS Modules, variables CSS nativas para theming |
| **Animaciones** | AOS (Animate On Scroll), react-parallax-tilt, animaciones CSS a medida |
| **Formulario** | EmailJS (`@emailjs/browser`) |
| **Notificaciones** | react-hot-toast |
| **Íconos** | react-icons (logos de marca reales para el carrusel de tecnologías) |
| **Control de versiones** | Git & GitHub |

---

## 📁 Estructura del proyecto

```
portfolio/
├── public/
│   └── assets/
│       ├── certs/          # Imágenes de certificados
│       ├── favicon.png
│       └── ...
│
├── src/
│   ├── components/
│   │   ├── Header/         # Navbar / Floating Dock
│   │   └── Footer/
│   │
│   ├── sections/
│   │   ├── Hero/
│   │   ├── About/
│   │   ├── Journey/        # "Mi Recorrido"
│   │   ├── Skills/
│   │   ├── Projects/
│   │   ├── Certifications/
│   │   └── Contact/
│   │
│   ├── utils/
│   │   └── scrollToSection.js
│   │
│   ├── styles/
│   │   └── global.css
│   │
│   ├── App.jsx
│   └── main.jsx
│
├── .env.example
├── .gitignore
├── index.html
├── package.json
└── vite.config.js
```

---

## 🚀 Cómo correr el proyecto localmente

### 1. Cloná el repositorio

```bash
git clone https://github.com/camilovenesia/portfolio.git
cd portfolio
```

### 2. Instalá las dependencias

```bash
npm install
```

### 3. Configurá las variables de entorno

Este proyecto usa [EmailJS](https://www.emailjs.com/) para el formulario de contacto. Creá un archivo `.env` en la raíz (podés copiar `.env.example` como base) con:

```env
VITE_EMAILJS_SERVICE_ID=tu_service_id
VITE_EMAILJS_TEMPLATE_ID=tu_template_id
VITE_EMAILJS_PUBLIC_KEY=tu_public_key
```

> 🔒 El archivo `.env` está excluido del repositorio vía `.gitignore` — nunca subas tus claves reales a GitHub.

### 4. Levantá el servidor de desarrollo

```bash
npm run dev
```

El proyecto va a estar disponible en `http://localhost:5173`.

---

## 📜 Scripts disponibles

| Comando | Descripción |
|---|---|
| `npm run dev` | Levanta el servidor de desarrollo con hot-reload |
| `npm run build` | Genera la build de producción optimizada |
| `npm run preview` | Sirve localmente la build de producción para probarla antes de deployar |

---

## ☁️ Deployment

Si vas a deployar este proyecto (Vercel, Netlify, etc.), recordá cargar las 3 variables de entorno de EmailJS en el panel de configuración del hosting — el `.env` local no viaja con el repositorio.

---

## 🗺️ Roadmap

- [ ] Deploy en producción
- [ ] Reemplazar imágenes de proyectos por capturas reales
- [ ] Sumar más proyectos a medida que se completen

---

## 📬 Contacto

¿Tenés una propuesta, una oportunidad laboral o simplemente querés saludar? Estoy abierto a nuevos proyectos y desafíos.

- 📧 **Email:** [camilovenesia.dev@gmail.com](mailto:camilovenesia.dev@gmail.com)
- 💼 **LinkedIn:** [linkedin.com/in/camilovenesia](https://www.linkedin.com/in/camilovenesia/)
- 📍 **Ubicación:** Rosario, Argentina

---

<div align="center">

**Desarrollado con dedicación por Camilo Venesia**

*Si te gustó este proyecto, dejá una ⭐ en el repositorio*

</div>