# Camilo Monti Venesia | Full Stack Developer

<div align="center">

**Portfolio personal · Rosario, Argentina**

[![Portfolio](https://img.shields.io/badge/Portfolio-Ver%20sitio-00abf0?style=for-the-badge)](https://portafolio-camilo-monti-venesia.vercel.app/)
[![GitHub](https://img.shields.io/badge/GitHub-Perfil-181717?style=for-the-badge&logo=github)](https://github.com/CamiloVenesia)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-Conectemos-0A66C2?style=for-the-badge&logo=linkedin)](https://www.linkedin.com/in/camilovenesia/)

</div>

---

## Sobre el proyecto

Este repositorio contiene el código fuente de mi portfolio personal, desarrollado con React y Vite.

El sitio funciona como una presentación profesional donde comparto mi perfil, conocimientos técnicos, experiencia, formación, certificaciones y proyectos de desarrollo.

Fue diseñado y desarrollado desde cero, prestando especial atención a la identidad visual, la experiencia de usuario, el rendimiento, la accesibilidad y la seguridad.

**Sitio en producción:**

https://portafolio-camilo-monti-venesia.vercel.app/

## Características principales

- **Diseño responsive:** adaptación a dispositivos móviles, tablets y escritorio.
- **Tema claro y oscuro:** preferencia persistente mediante localStorage.
- **Navegación interactiva:** navegación flotante y desplazamiento suave entre secciones.
- **Animaciones:** efectos de aparición, transiciones y elementos interactivos.
- **Hero interactivo:** tarjeta con efecto 3D y parallax.
- **Sobre mí:** presentación personal mediante una composición visual tipo Bento Grid.
- **Skills:** tecnologías y conocimientos organizados por categorías.
- **Trayectoria:** línea de tiempo con formación y experiencia.
- **Proyectos:** presentación de aplicaciones desarrolladas, tecnologías utilizadas y enlaces a repositorios y demos.
- **Certificaciones:** carrusel interactivo con ampliación de imágenes y navegación.
- **Formulario de contacto:** envío de mensajes mediante una API propia y SMTP.
- **Seguridad del formulario:** validación backend, sanitización, protección honeypot, rate limiting e idempotencia.
- **Control de solicitudes:** timeout de 20 segundos en frontend y prevención de envíos simultáneos.
- **SEO técnico:** metadatos, Open Graph, Twitter Cards, datos estructurados, sitemap y robots.txt.

## Stack tecnológico

| Categoría | Tecnologías |
|---|---|
| Frontend | React 18, JavaScript |
| Build y desarrollo | Vite 7.3 |
| Backend | Node.js, Vercel Functions |
| Envío de correos | Nodemailer, SMTP |
| Estilos | CSS |
| Animaciones | AOS, Lenis |
| Interacciones | react-parallax-tilt |
| Fondos visuales | topolines |
| Iconografía | react-icons |
| Testing | Node.js Test Runner |
| Control de versiones | Git y GitHub |
| Hosting | Vercel |

## Estructura del proyecto

```text
portfolio/
├── api/
│   ├── contact.js
│   └── contact-idempotency.js
│
├── public/
│   ├── assets/
│   │   ├── certs/
│   │   └── imágenes del portfolio
│   ├── robots.txt
│   └── sitemap.xml
│
├── src/
│   ├── components/
│   │   ├── Header/
│   │   ├── Footer/
│   │   └── TopographicBackground/
│   │
│   ├── sections/
│   │   ├── Hero/
│   │   ├── Value/
│   │   ├── Projects/
│   │   ├── Skills/
│   │   ├── Journey/
│   │   ├── About/
│   │   ├── Certifications/
│   │   └── Contact/
│   │
│   ├── styles/
│   │   ├── global.css
│   │   └── typography.css
│   │
│   ├── utils/
│   │   └── scrollToSection.js
│   │
│   ├── App.jsx
│   └── main.jsx
│
├── test/
│   └── contact-idempotency.test.js
│
├── index.html
├── package.json
├── package-lock.json
├── vercel.json
├── vite.config.js
└── README.md
```

## Instalación y ejecución

### Requisitos

- Node.js 20.19+ o 22.12+.
- npm.
- Git.
- Vercel CLI para ejecutar las funciones backend localmente.

### 1. Clonar el repositorio

```bash
git clone https://github.com/CamiloVenesia/Portfolio-personal.git

cd Portfolio-personal
```

### 2. Instalar dependencias

```bash
npm ci
```

### 3. Ejecutar el frontend

```bash
npm run dev
```

El servidor de desarrollo estará disponible normalmente en:

http://localhost:5173/

### 4. Ejecutar frontend y backend localmente

Para probar el formulario de contacto y las funciones de Vercel, se utiliza el siguiente comando de PowerShell:

```powershell
powershell -NoProfile -ExecutionPolicy Bypass -File ".\.vercel\start-dev.ps1"
```

Este script es una herramienta local de desarrollo y no se incluye en el repositorio, ya que la carpeta `.vercel` está excluida mediante `.gitignore`.

## Variables de entorno

El formulario de contacto utiliza Nodemailer para enviar correos mediante SMTP.

Las siguientes variables deben configurarse en el entorno local y en Vercel:

| Variable | Descripción |
|---|---|
| `SMTP_HOST` | Servidor SMTP. Por defecto: smtp.gmail.com |
| `SMTP_PORT` | Puerto SMTP permitido: 465 o 587 |
| `SMTP_USER` | Cuenta de correo utilizada para enviar mensajes |
| `SMTP_PASS` | Contraseña de aplicación SMTP |
| `CONTACT_TO` | Dirección o direcciones que reciben los mensajes |
| `ALLOWED_ORIGINS` | Orígenes adicionales autorizados, separados por comas |

Ejemplo de configuración local:

```env
SMTP_HOST=smtp.gmail.com
SMTP_PORT=465
SMTP_USER=tu_correo@gmail.com
SMTP_PASS=tu_contraseña_de_aplicacion
CONTACT_TO=correo_destino@gmail.com
ALLOWED_ORIGINS=http://localhost:3000
```

`ALLOWED_ORIGINS` es opcional. La aplicación también reconoce los dominios proporcionados por Vercel.

**Seguridad:**

- Nunca utilizar credenciales reales en el código fuente.
- No utilizar el prefijo `VITE_` para variables SMTP privadas.
- No subir archivos `.env`, `.env.local` ni credenciales a GitHub.
- Para Gmail, utilizar una contraseña de aplicación cuando corresponda.
- Configurar las variables directamente en el panel de Vercel para cada entorno.

## Formulario de contacto

El formulario utiliza una función backend ubicada en:

```text
api/contact.js
```

El envío se realiza mediante una solicitud POST a:

```text
/api/contact
```

### Protecciones implementadas

- Validación de datos en frontend y backend.
- Sanitización de entradas.
- Validación del origen de las solicitudes.
- Límite de tamaño del cuerpo de la solicitud.
- Campo honeypot para detectar bots.
- Rate limiting en memoria.
- Timeout de solicitudes en frontend.
- Bloqueo de envíos simultáneos.
- Claves de idempotencia para reconocer reintentos.
- Protección contra reutilización de una clave con contenido diferente.

**Limitaciones técnicas:**

La idempotencia y el rate limiting utilizan memoria de la instancia. En Vercel, las instancias serverless pueden tener memorias independientes. Por lo tanto, estas protecciones no representan una garantía distribuida entre todas las instancias.

## Pruebas y compilación

El proyecto utiliza el sistema de pruebas nativo de Node.js.

### Ejecutar las pruebas

```bash
npm test
```

### Generar la compilación de producción

```bash
npm run build
```

### Visualizar la compilación localmente

```bash
npm run preview
```

## Scripts disponibles

| Comando | Descripción |
|---|---|
| `npm run dev` | Inicia el servidor de desarrollo de Vite |
| `npm test` | Ejecuta las pruebas automatizadas |
| `npm run build` | Genera la compilación optimizada |
| `npm run preview` | Permite visualizar la compilación localmente |

## Deployment

El proyecto utiliza Vercel para alojar el frontend y ejecutar las funciones backend.

Para desplegar una nueva versión:

1. Importar el repositorio de GitHub en Vercel.
2. Configurar el proyecto utilizando Vite.
3. Establecer `npm run build` como comando de compilación.
4. Utilizar `dist` como directorio de salida.
5. Configurar las variables SMTP en el panel de Vercel.
6. Realizar el deployment y comprobar el funcionamiento del sitio y del formulario.

Las variables de entorno deben configurarse por separado para los entornos Development, Preview y Production, según corresponda.

## SEO

El proyecto incorpora optimizaciones técnicas orientadas a mejorar su indexación y presentación en buscadores y redes sociales:

- Title y meta description.
- URL canónica.
- Metadatos Open Graph.
- Twitter Cards.
- Datos estructurados JSON-LD mediante Schema.org.
- Archivo `robots.txt`.
- Sitemap XML.

Los metadatos y datos estructurados se encuentran principalmente en `index.html`.

Los archivos de rastreo e indexación se encuentran en `public/`.

## Contacto

¿Tenés una propuesta, una oportunidad laboral o querés conversar sobre algún proyecto?

- **Email:** camilovenesia.dev@gmail.com
- **LinkedIn:** https://www.linkedin.com/in/camilovenesia/
- **GitHub:** https://github.com/CamiloVenesia
- **Ubicación:** Rosario, Argentina.

---

<div align="center">

**Desarrollado por Camilo Monti Venesia**

Portfolio personal · Full Stack Developer

</div>