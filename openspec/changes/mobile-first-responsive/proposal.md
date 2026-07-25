# Change Proposal: Mobile-First Responsive Redesign

## Context & Motivation
El sitio web `airesacondicionadoscancun` tiene actualmente una arquitectura CSS "Desktop-First" con parches defensivos para móviles (`@media (max-width: 640px)`). Para lograr máxima velocidad, UX imprevisto en smartphones y Core Web Vitals impecables en dispositivos móviles en Cancún y Quintana Roo, es indispensable migrar el sistema de estilos a una arquitectura verdaderamente **Mobile-First**.

## Key Objectives
1. **Base Mobile-First CSS Architecture**:
   - Reestructurar el CSS base (`Layout.astro` y componentes) iniciando con viewports de 320px–375px sin media queries.
   - Aplicar mejora progresiva mediante `@media (min-width: 768px)` para tabletas y `@media (min-width: 1024px)` para pantallas de escritorio.
2. **Fluid Typography & Ergonomic Spacing**:
   - Implementar cálculo de tipografía fluida usando `clamp()` para encabezados (`h1`, `h2`, `h3`) y párrafos, eliminando cambios abruptos entre breakpoints.
   - Garantizar áreas de toque de al menos 44x44px en botones, inputs y enlaces flotantes (`float-btn`, `btn-phone`, `CookieBanner`).
3. **Touch-Friendly Controls & Mobile UX**:
   - Optimizar `LeadForm.astro` con `inputmode="tel"`, `autocomplete`, `:user-valid` y áreas de toque ergonómicas para uso en una sola mano.
   - Asegurar que `FAQSection.astro` (acordeón interactivo) tenga indicadores de expansión claros y target de clic amplio.
   - Refactorizar la cabecera e indicadores flotantes (WhatsApp CTA) para cero solapamientos en dispositivos de pantalla angosta (p. ej. iPhone SE / 360px).
4. **Visual Regression & Layout Auditing**:
   - Validar cero scroll horizontal (`overflow-x: hidden` limpio) y verificar mediante pruebas de Playwright a 390px, 768px y 1280px.
