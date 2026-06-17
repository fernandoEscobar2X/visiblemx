# AGENTS.md

Guía de contexto para cualquier agente (humano o IA) que trabaje en este repositorio.
Léela completa antes de tocar nada. Es la fuente de verdad operativa del proyecto.

---

## Qué es VisibleMX

VisibleMX es un estudio/agencia digital en Tijuana. Este repo es su **sitio comercial** (React 19 + Vite + TypeScript + Tailwind v4 + react-router).

VisibleMX construye, de menor a mayor alcance:

- Presencia digital (landing, sitios, menús, agendas, tarjetas NFC/QR).
- Sistemas a medida (paneles, CRM, inventarios, cotizadores, reportes).
- Plataformas multicanal (web + móvil + escritorio sobre una base de datos central).

## Objetivo actual

Reposicionar la marca. VisibleMX se percibe **demasiado barata** por los precios bajos visibles y el foco en productos pequeños. Hay que evolucionar de “hacemos páginas web económicas” a **“construimos presencia digital, sistemas a medida y plataformas multicanal para negocios”**.

Promesa central (usar como brújula de todo el copy):

> Creamos sitios, sistemas y plataformas digitales para negocios que quieren vender mejor, operar con más orden y crecer sin depender de WhatsApp, Excel o procesos manuales.

## Prioridad de reposicionamiento

1. Primero se arregla y reposiciona **VisibleMX** (la home, los servicios, el portafolio).
2. Después se moderniza **FitNutrition** como demo comercial.

No invertir ese orden: la percepción de VisibleMX depende primero de su página principal.

## Reglas de copy

- No presentar a VisibleMX como “solo páginas web”.
- Evitar lenguaje que abarata: “Oferta actual”, “Precio regular”, “Pago único” como eje, descuentos tachados, contadores de “lugares restantes”.
- Preferir lenguaje de valor: “Cotización por diagnóstico”, “Proyecto por fases”, “Sistema a medida”, “Plataforma multicanal”, “Operación centralizada”, “Automatización y reportes”.
- Hablar en términos de negocio, no de stack: el cliente compra orden, ventas y control, no “Spring Boot” ni “Redis”.
- Español natural y profesional. Sin frases huecas (ver `docs/07-ui-quality-standards.md`).

## Reglas de precios

- La home **no** debe estar dominada por precios bajos.
- Los rangos internos de `docs/04-pricing-policy.md` son **guía interna**; no se publican sin decisión explícita del dueño.
- Sistemas a medida y plataformas multicanal van **por diagnóstico**, nunca con precio cerrado en la home.
- No inventar precios nuevos ni cambiarlos en la UI sin revisar `docs/04-pricing-policy.md`.

## Reglas sobre FitNutrition

- FitNutrition **NO** es un producto comercial final ni está en producción.
- Es una **demo técnica / caso de arquitectura multicanal** (API central + escritorio + móvil + base de datos).
- Se usa como **evidencia de capacidad técnica**, no como software a la venta.
- No enlazar repos antiguos como prueba principal para clientes.
- No prometer “demo en vivo” hasta que exista una versión modernizada y desplegada.
- Detalle completo en `docs/05-fitnutrition-modernization.md`.

## Reglas sobre demos y portafolio

- **Portafolio**: proyectos reales (ej. CLTJ). Cuentan una historia con contexto, rol y resultado verificable.
- **Demos**: piezas comerciales que venden productos de entrada (Tap, Page, Menu, Agenda).
- **Labs**: experimentos que muestran capacidad técnica (FitNutrition).
- No mezclar las tres categorías. No presentar una demo como cliente real.
- CLTJ es un caso real externo; no es un servicio propio de VisibleMX ni se fusiona con la marca.
- Rutas y separación en `docs/03-portfolio-and-demos.md`.

## Reglas anti “vibe coded”

VisibleMX no puede verse improvisada o “generada rápido”. Antes de dar por terminada cualquier UI, revisar `docs/07-ui-quality-standards.md`. En resumen:

- Spacing en escala de 8px; nada de paddings/margins aleatorios.
- Un solo sistema de radios y de sombras; no mezclar.
- Sin glows, gradientes morados, sparkles ni emojis decorativos sin justificación.
- Sin hover agresivo en todas las cards.
- Sin testimonios falsos ni links sociales falsos o con `#`.
- Hero sobrio, no sobrecargado.
- Todo botón/link/tab/formulario/CTA debe funcionar.
- Verificar mobile y desktop antes de cerrar.

## Flujo de trabajo obligatorio

1. **Antes de modificar código**, revisar `/docs` (empezando por `docs/00-visiblemx-context.md`).
2. **Se sigue el plan, no se improvisa.** `docs/01-roadmap.md` es el plan de ejecución oficial: cada iteración toma la **siguiente tarea sin marcar (`[ ]`) en orden**, no salta de fase ni inventa tareas sobre la marcha. La sección “Estado actual” del roadmap indica cuál es la próxima tarea.
3. **Antes de tocar UI**, revisar `docs/07-ui-quality-standards.md`.
4. **Antes de tocar copy/precios**, revisar `docs/02-services.md` y `docs/04-pricing-policy.md`.
5. Si surge algo no contemplado, **se agrega primero al roadmap** (con su “Hecho cuando”) y luego se ejecuta. La fuente de verdad es `/docs`, no la memoria de cada sesión.

## Restricciones (no negociables)

- No inventar **clientes**, **testimonios**, **métricas** ni **resultados** que no estén documentados y verificados.
- No inventar **demos** o capacidades que no existan.
- No afirmar que FitNutrition está en producción.
- No fusionar CLTJ con VisibleMX como si fueran el mismo servicio.
- No publicar precios internos sin decisión explícita.
- No agregar dependencias ni efectos “porque se ven bien”: cada elemento debe justificar su valor.

## Mapa de documentación

- `docs/00-visiblemx-context.md` — contexto y dirección de marca (empezar aquí).
- `docs/01-roadmap.md` — plan por fases.
- `docs/02-services.md` — oferta de servicios.
- `docs/03-portfolio-and-demos.md` — portafolio, demos y labs + rutas.
- `docs/04-pricing-policy.md` — política de precios.
- `docs/05-fitnutrition-modernization.md` — plan de FitNutrition.
- `docs/06-technical-decisions.md` — decisiones técnicas de los sistemas que se venden.
- `docs/07-ui-quality-standards.md` — estándar visual y de calidad UI.
