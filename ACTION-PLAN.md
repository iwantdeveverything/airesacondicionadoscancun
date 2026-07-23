# Plan de Acción Priorizado — SEO & Micrositio

> **Basado en la Auditoría SEO del 23 de Julio, 2026**

---

## 🔴 Prioridad Alta (Acción Inmediata — Semana 1)

### 1. Inclusión de `robots.txt` y Generación de `sitemap.xml`
- **Problema**: El sitio compila 50 páginas HTML estáticas, pero no cuenta con un `robots.txt` explícito ni con la integración del plugin `@astrojs/sitemap`.
- **Impacto**: Facilita el descubrimiento inmediato y rastreo por parte de Googlebot y Bingbot.
- **Fix**: Integrar `@astrojs/sitemap` en `astro.config.mjs` y agregar `public/robots.txt` declarando el enlace al sitemap y bloqueando únicamente bots maliciosos de scraping.

### 2. Generación de la Guía Google Business Profile (`GBP-GUIDE.md`)
- **Problema**: Falta el entregable obligatorio `GBP-GUIDE.md` alineando NAP, latitud/longitud, categorías principales (`HVAC Contractor`, `Air Conditioning Repair Service`) y servicios de GBP con el schema `HVACBusiness` del sitio.
- **Impacto**: Alineación del Map Pack (Google Maps) con las 40 páginas Spokes geolocalizadas.
- **Fix**: Generar `GBP-GUIDE.md` en la raíz.

---

## ⚠️ Prioridad Media (Optimización a Corto Plazo — Mes 1)

### 3. Incorporación de Assets de Imagen WebP con E-E-A-T Visual
- **Problema**: Actualmente la interfaz utiliza componentes vectoriales y gradientes CSS.
- **Impacto**: Faltan señales de imágenes reales en Google Images y Rich Snippets.
- **Fix**: Generar/añadir imágenes comprimidas en WebP (ej. héroe de mantenimiento, técnicos trabajando en Zona Hotelera) con etiquetas `alt` descriptivas con palabras clave geolocalizadas.

### 4. Simplificación de Frases Extensas en la Copywriting
- **Problema**: El analizador de legibilidad detectó oraciones de más de 35 palabras en los bloques FAQ.
- **Impacto**: Mejora el tiempo de permanencia y reduce la tasa de rebote en usuarios móviles.
- **Fix**: Reducir el promedio a 15-20 palabras por oración en las introducciones de cada página.

---

## ℹ️ Prioridad Baja / Mantenimiento Continuo

### 5. Monitoreo de Respuestas AEO / Perplexity
- **Acción**: Validar trimestralmente que las respuestas directas H2/H3 sigan siendo citadas en Perplexity, ChatGPT y Google Search Overviews para búsquedas locales de emergencia en Cancún.
