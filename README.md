# ❄️ Aires Acondicionados Cancún - AI Micro Site SEO Local (50 Páginas)

[![Astro v5](https://img.shields.io/badge/Astro-v5.0-ff5e00?style=flat-square&logo=astro)](https://astro.build)
[![Vercel Edge](https://img.shields.io/badge/Vercel-Edge_Prerender-000000?style=flat-square&logo=vercel)](https://vercel.com)
[![TypeScript](https://img.shields.io/badge/TypeScript-Strict-3178c6?style=flat-square&logo=typescript)](https://www.typescriptlang.org/)
[![Zero Orphan Pages](https://img.shields.io/badge/SILO_Engine-100%25_Linked-16a34a?style=flat-square)](./src/utils/siloLinking.test.ts)
[![License](https://img.shields.io/badge/License-Proprietary-blue.svg?style=flat-square)](#)

Micrositio de captura de leads de alto rendimiento y SEO local para **Reparación, Mantenimiento e Instalación de Aires Acondicionados en Cancún, Quintana Roo**. Construido bajo el **Blueprint Maestro de 50 Páginas** (Sniper Approach, Exact Match Domain alignment y GEO/AEO AI Search readiness).

---

## 🚀 Características Arquitectónicas y Pilares SEO

- **Distribución Matemática de 50 Páginas**:
  - **6 Páginas Institucionales (Boilerplate)**: Home, Nosotros (E-E-A-T), Cotización/Precios, Contacto 24/7, Privacidad y Términos.
  - **4 Hubs de Servicio ("El Qué")**: Reparación de Minisplits e Inverter, Mantenimiento Preventivo con Hidrolavadora, Instalación de Equipos y Carga de Gas Refrigerante (R410A/R32).
  - **40 Spokes de Ubicación ("El Dónde")**: Matriz de 4 Servicios × 10 Zonas (Zona Hotelera, Puerto Cancún, Centro, Av. Huayacán, Polígono Sur, Bonfil, Isla Mujeres, Cumbres, Puerto Juárez y Puerto Morelos).
- **GEO / AEO (AI Search Readiness)**: Respuestas directas en bloques H2/H3 optimizados para extraer datos clave en **Google AI Overviews**, **ChatGPT** y **Perplexity**, omitiendo el esquema restringido `FAQPage` para negocios comerciales.
- **Conversión Agéntica & Integración 24/7**: Preparado con widget flotante y formularios con webhooks para **Agentes de Voz IA (Vapi)** y atención inmediata por **WhatsApp 24/7**.
- **Motor SILO Determinista (Zero Orphan Guarantee)**: Enlazado interno jerárquico verificado con pruebas unitarias nativas de Node.js (`pnpm test`).
- **Señales Locales E-E-A-T Real**: Redacción adaptada a las condiciones climáticas de Cancún (salitre/corrosión marina *Blue Fin*, variaciones de voltaje de CFE, diagnóstico de tarjetas Inverter y precios transparentes en MXN).

---

## 🛠️ Tecnologías y Herramientas

- **Core**: [Astro v5](https://astro.build) (Static SSG prerenderizado en Vercel Edge).
- **Lenguaje**: TypeScript (`astro check` tipado estricto).
- **Estilos**: Vanilla CSS con diseño Glassmorphism, Google Fonts (`Outfit` + `Inter`) y CSS Container Queries.
- **Testing**: Node.js Test Runner nativo (`node --experimental-strip-types --test`).
- **Estructura de Datos**: Schema.org `HVACBusiness` y `BreadcrumbList` en JSON-LD.

---

## 📁 Estructura del Proyecto

```text
airesacondicionadoscancun/
├── .github/
│   └── ISSUE_TEMPLATE/        # Plantillas de Bug Report y Feature Request
├── src/
│   ├── components/            # Componentes UI (FAQSection, LeadForm, SiloLinks, CookieBanner)
│   ├── content/
│   │   └── pages/             # 50 Archivos Markdown de contenido único local
│   ├── layouts/               # Layout principal con JSON-LD y diseño responsive
│   ├── pages/                 # Dynamic catch-all route [...slug].astro
│   ├── utils/                 # SILO linking engine (siloLinking.ts, getPageUrl.ts)
│   └── content.config.ts      # Astro v5 Zod Content Loader Schema
├── dist/                      # Salida compilada del sitio estático (22-50 rutas HTML)
├── GBP-GUIDE.md               # Guía de alineación de Google Business Profile (NAP)
├── astro.config.mjs           # Configuración de Astro v5 + Vercel Adapter
├── vercel.json                # Cabeceras de seguridad CSP, HSTS y X-Frame-Options
└── package.json               # Dependencias y scripts de ejecución
```

---

## 💻 Comandos de Desarrollo

```bash
# 1. Instalar dependencias
pnpm install

# 2. Iniciar servidor de desarrollo local
pnpm dev

# 3. Ejecutar suite de pruebas unitarias de enlazado SILO (Zero Orphan Pages)
pnpm test

# 4. Verificar integridad de tipos (TypeScript + Astro)
pnpm check

# 5. Compilar bundle estático para producción
pnpm build
```

---

## 📄 Documentación Adicional

- [GBP-GUIDE.md](./GBP-GUIDE.md): Guía para configurar Google Business Profile con datos NAP idénticos al esquema JSON-LD.
- **Conventional Commits**: En esta organización se exige el formato estándar de commits (ej. `feat: ...`, `fix: ...`).
- **Branch Protection**: La rama `main` está protegida contra commits directos y requiere al menos 1 aprobación de Pull Request.
