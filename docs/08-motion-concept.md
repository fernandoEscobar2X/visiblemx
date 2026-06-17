# 08 · Motion concept / Dirección premium

Este documento define la dirección creativa y el alcance técnico para `1.8 — Pulido premium de dirección visual y motion concept`.

No es una implementación. Es el marco para que las siguientes subtareas se construyan sin improvisar, sin romper lo logrado en `1.1–1.7` y sin convertir la home en una demo técnica.

---

## Concepto creativo principal

**Lo invisible se vuelve visible.**

VisibleMX convierte información dispersa en operación visible. Muchos negocios ya tienen datos valiosos, pero están repartidos entre WhatsApp, Excel, notas, pedidos, cotizaciones y memoria humana. VisibleMX toma ese caos operativo y lo convierte en sistemas, CRM, dashboards, automatizaciones y plataformas multicanal.

La idea visual debe contar esta transformación:

> Información dispersa → operación visible → sistema ordenado.

Este concepto no debe competir con la promesa comercial. El usuario debe entender primero qué hace VisibleMX y después sentir que la experiencia visual refuerza esa idea.

---

## Narrativa visual

### 1. Estado inicial

La home puede mostrar señales de información dispersa, oculta o desordenada:

- Mensajes sueltos.
- Filas tipo hoja de cálculo.
- Notas breves.
- Pedidos o cotizaciones sin estructura.
- Fragmentos de seguimiento.

Estos elementos deben ser abstractos y ficticios. No usar clientes reales, métricas inventadas ni datos sensibles.

### 2. Interacción prioritaria

La interacción prioritaria para la primera iteración es un **scanner/reveal sobrio en el hero**.

Objetivo del scanner:

- Revelar información que estaba oculta o desordenada.
- Mostrar cómo esa información empieza a agruparse.
- Reforzar el mensaje de que VisibleMX vuelve visible la operación.

Restricciones:

- El scanner no debe tapar el titular ni el CTA.
- El hero debe seguir comunicando la promesa en menos de 10 segundos.
- Si el usuario no interactúa, el hero debe seguir funcionando como pieza comercial.

### 3. Transformación

La información revelada debe agruparse y conectarse visualmente:

- Mensajes → clientes / CRM.
- Pedidos y cotizaciones → flujo de operación.
- Citas y seguimiento → automatización.
- Reportes sueltos → dashboard.
- Canales separados → plataforma multicanal.

La transformación no debe prometer un producto específico ni una demo final. Es una metáfora visual de la capacidad de VisibleMX.

### 4. Resultado

El resultado visual debe sentirse como operación visible:

- Sistema propio.
- Información centralizada.
- Procesos ordenados.
- Decisiones claras.
- Crecimiento por fases.

La experiencia debe cerrar hacia los CTAs actuales: **Iniciar proyecto**, **Solicitar propuesta**, **Cotizar proyecto** o **Enviar solicitud**, según la sección.

---

## Alcance permitido para la primera versión

La primera versión de 1.8 debe ser deliberadamente acotada.

### Se va a construir

- Un hero interactivo sobrio basado en scanner/reveal.
- Una visualización ligera de información dispersa que se vuelve legible.
- Conexiones simples mediante SVG o CSS.
- Motion sutil y con propósito, solo para reforzar la narrativa.
- Fallback mobile simple, rápido y claro.

### No se va a construir todavía

- Rediseño total de la home.
- Hero 3D.
- Canvas.
- WebGL, shaders o GLSL.
- Three.js / React Three Fiber.
- Lenis.
- Lottie o animaciones de stock.
- Scroll narrativo complejo antes de cerrar `1.8.2`.
- Cambios en precios, oferta, portafolio, FitNutrition o rutas.

### Fallback mobile

Mobile debe priorizar claridad y velocidad:

- Sin interacción dependiente de cursor.
- Sin scroll hijacking.
- Sin animaciones largas.
- El scanner puede convertirse en una franja simple, un reveal automático breve o una composición estática.
- Si `prefers-reduced-motion` está activo, mostrar estado final o transición mínima.

---

## Stack creativo recomendado

### Base permitida

- React + TypeScript.
- Tailwind CSS y CSS moderno.
- SVG para líneas, flujos, conexiones y capas vectoriales.
- CSS `mask-image`, `clip-path` o transiciones simples si aportan al reveal.

### Motion

`motion` ya existe en el proyecto y puede usarse de forma limitada para:

- Entrada/salida de elementos.
- Microinteracciones.
- Transiciones pequeñas del scanner/reveal.
- Respeto a `prefers-reduced-motion`.

No debe usarse para animar todo por defecto.

### GSAP / ScrollTrigger

No se justifica para `1.8.2`.

Puede evaluarse en `1.8.3` solo si el scroll narrativo caos → sistema no puede resolverse de forma clara con CSS/SVG/Motion. Si se usa, debe documentarse qué problema resuelve y cómo se mantiene accesible y performante.

### Lenis

Fuera de alcance inicial.

Solo se consideraría si aporta de forma clara a la experiencia premium sin afectar accesibilidad, navegación por teclado, rendimiento ni comportamiento esperado del scroll.

### Canvas

Fuera de alcance inicial.

Solo se consideraría si SVG/CSS no resuelven una interacción propia con buen rendimiento. No se usará para decoración.

### Three.js / React Three Fiber / GLSL

Fuera de alcance para la primera iteración de 1.8.

No hay una necesidad 3D clara para explicar la propuesta comercial actual. Usarlos ahora aumentaría complejidad y riesgo sin mejorar necesariamente la comprensión del servicio.

### Dependencias nuevas

No instalar dependencias nuevas para `1.8.2`.

La primera versión debe intentar resolverse con el stack ya disponible: React, TypeScript, Tailwind/CSS, SVG y, si hace falta, `motion`.

---

## Criterios de calidad

La dirección premium debe cumplir estas reglas:

- No parecer demo técnica sobreanimada.
- No usar glows, sparkles, emojis decorativos, gradientes morados ni efectos sin propósito.
- No ocultar el mensaje principal detrás de la animación.
- No romper la claridad de los CTAs.
- No introducir precios, descuentos ni urgencias artificiales.
- No inventar clientes, métricas ni resultados.
- No usar jerga técnica como argumento comercial.
- Respetar `prefers-reduced-motion`.
- Mantener mobile, tablet y desktop sin overflow horizontal.
- Mantener SEO, performance, responsive y accesibilidad.
- La experiencia debe cargar rápido y degradar bien.

Checklist mínimo antes de cerrar cualquier subtarea visual de 1.8:

- El titular y CTA del hero siguen visibles y entendibles.
- El motion tiene una función narrativa clara.
- La versión mobile es más simple que desktop.
- `prefers-reduced-motion` tiene comportamiento seguro.
- No hay dependencias nuevas sin justificación documentada.
- No se perdió el reposicionamiento comercial logrado en `1.1–1.7`.

---

## Alcance por subtarea

### 1.8.2 — Hero scanner/reveal

Construir la primera prueba funcional del concepto en el hero.

Prioridad:

- Scanner/reveal sobrio.
- Mensaje comercial intacto.
- Sin 3D, Canvas, Lenis ni nuevas dependencias.
- Fallback mobile y `prefers-reduced-motion` desde el primer pase.

### 1.8.3 — Scroll narrativo caos → sistema

Explorar una narrativa por scroll donde elementos dispersos se ordenan en una arquitectura de operación.

Condición:

- Solo usar motion si aporta a la narrativa.
- Evaluar GSAP/ScrollTrigger únicamente si CSS/SVG/Motion no bastan.

### 1.8.4 — Servicios como arquitectura visual

Conectar visualmente presencia digital, sistemas a medida y plataformas multicanal como partes de una misma propuesta.

Condición:

- No convertir las secciones en cards genéricas aisladas.
- No perder legibilidad ni CTA.

### 1.8.5 — Pulido final, performance y accesibilidad

Cerrar la fase visual con pruebas de calidad.

Debe verificar:

- Mobile, tablet y desktop sin overflow.
- Motion reducido.
- Accesibilidad básica.
- Performance.
- SEO y claridad comercial.

---

## Decisión de 1.8.1

Para la primera implementación (`1.8.2`), la dirección aprobada es:

- Priorizar hero scanner/reveal.
- Resolver primero con React, TypeScript, Tailwind/CSS y SVG.
- Usar `motion` solo si aporta microinteracciones claras.
- No usar GSAP, Lenis, Canvas, Three.js, R3F ni GLSL.
- Mantener la propuesta comercial como centro: **sitios, sistemas y plataformas para vender mejor, operar con orden y crecer sin caos manual**.
