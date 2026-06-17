# 01 · Roadmap / Plan de ejecución

Este documento es el **plan de ejecución oficial** de VisibleMX. No es una lista de sugerencias: es la secuencia que se sigue.

## Cómo se trabaja (regla obligatoria)

1. Cada iteración **toma la siguiente tarea sin marcar (`[ ]`) en orden**. No se improvisa, no se salta de fase, no se inventan tareas nuevas sobre la marcha.
2. Una tarea se marca `[x]` solo cuando cumple su **Hecho cuando** (definición de hecho).
3. No se avanza a la siguiente fase hasta cerrar el **Criterio de salida** de la fase actual.
4. Si surge algo no contemplado, **se agrega aquí primero** (con su “Hecho cuando”) y luego se ejecuta. La fuente de verdad es este archivo, no la memoria de cada sesión.
5. Reglas transversales que aplican a TODA tarea de UI/código:
   - Respetar `docs/07-ui-quality-standards.md` (filtro de calidad).
   - Respetar `docs/04-pricing-policy.md` (precios) y `docs/02-services.md` (oferta).
   - No inventar clientes, métricas ni demos (`AGENTS.md`).

Regla de oro: **primero se reposiciona VisibleMX (Fases 0–4 y 6), y la migración de FitNutrition (Fase 5) solo arranca con la home ya reposicionada.**

---

## Fase 0 — Documentación

**Objetivo:** tener una fuente de verdad antes de modificar la web.

- [x] Crear `AGENTS.md` y `/docs` con los 9 documentos llenos y consistentes.
- [x] Definir contexto, servicios, precios, portafolio, decisiones técnicas y estándar UI.

**Criterio de salida:** los nueve documentos existen, están llenos y no se contradicen. ✅ (cumplido)

---

## Fase 1 — Reposicionamiento de la home

**Objetivo:** dejar de vender VisibleMX como catálogo barato.

- [x] **1.1** Corregir las fallas visuales pendientes en desktop.
      *Hecho cuando:* la home se ve correcta en móvil, tablet y desktop, sin scroll horizontal ni elementos rotos.
      *Cerrada:* verificado por capturas en 1440/768/390 (sin overflow horizontal: `scrollWidth == clientWidth` en los tres anchos). Fix aplicado en `src/app/components/ScrollProgress.tsx`: el indicador circular de progreso (solo desktop, `hidden lg:block`) mostraba siempre `0%` porque leía `scrollYProgress.get()` una vez en render; ahora se suscribe con `useMotionValueEvent` y refleja el avance real (verificado: 59% a ~55% de scroll). Mobile sin cambios (el indicador no se muestra). Sin rediseño ni efectos nuevos.
- [x] **1.2** Reescribir el hero alineado a la promesa central, sobrio (sin sobrecarga).
      *Hecho cuando:* el hero comunica “sitios + sistemas + plataformas” en una idea clara, con un solo CTA, y pasa el checklist de `07`.
      *Cerrada:* hero reconstruido en `src/app/components/AwwwardsHero.tsx` a layout de dos columnas (según referencia aprobada por el dueño). Izquierda: eyebrow “Estudio de software”, titular “Sistemas digitales para vender más y operar con menos caos.”, promesa concreta (“Creamos sitios web, CRM, dashboards y automatizaciones… dejar atrás WhatsApp, Excel y procesos manuales.”), CTA primario actualizado en 1.4 a **“Iniciar proyecto”** (→ `#contacto`) + CTA secundario **“Ver soluciones”** (→ `#productos`), y 4 chips (Sitios web · Sistemas internos · Automatización multicanal · Dashboards). Derecha: **diagrama de sistema** Web/WhatsApp → CRM → Automatización → Dashboard → Decisiones con loop “Mejora continua”, que demuestra la capacidad multicanal. Comunica los tres pilares (sitios + sistemas + plataformas) vía titular + subtítulo + chips + diagrama. Reemplaza el copy genérico previo (prohibido por `07`). Responsive verificado por capturas: pipeline horizontal en `xl` (1280/1440/1680), rejilla de 2 columnas en 1024–1279, tarjetas apiladas en tablet/mobile; sin overflow horizontal (`scrollWidth == clientWidth`) en 390/768/1024/1280/1440/1680. Se mantuvo `index.html` (title/description/OG/Twitter) alineado a la promesa. Sin glows, gradientes morados, sparkles ni emojis.
- [x] **1.3** Quitar/atenuar precios bajos y lenguaje de oferta de la home.
      *Hecho cuando:* en la home no aparecen precios bajos en primer plano, descuentos tachados ni contadores de “lugares restantes”.
      *Cerrada:* se retiraron precios visibles, “Oferta actual”, “Precio regular”, “Pago único”, precios tachados y notas de precio de las secciones activas de la home (`MinimalProducts`, `ContactSection`, `Footer`). La sección de productos ahora comunica cotización por proyecto, proyecto por fases y valor operativo; el formulario y el footer ya no usan precios como gancho. Verificado con búsqueda en componentes activos de la home: sin `MXN`, precios con `$`, `line-through`, “Oferta actual”, “Precio regular”, “Pago único”, “lugares” ni “restantes”. Sin cambios al hero, rutas, portafolio, FitNutrition ni configuración.
- [x] **1.4** Cambiar el CTA principal a uno de valor (“Iniciar proyecto” / “Cotizar proyecto”).
      *Hecho cuando:* el CTA del hero y de las secciones clave apunta al flujo de proyecto/contacto y funciona.
      *Cerrada:* el CTA principal del hero quedó como **“Iniciar proyecto”** (→ `#contacto`) y el secundario se mantiene como **“Ver soluciones”** (→ `#productos`). Las cards de productos usan **“Cotizar proyecto”** (→ `#contacto`), el formulario usa **“Cuéntanos tu proyecto”** y **“Enviar solicitud”**, y el footer usa **“Hablemos de tu proyecto”**. Se retiró “diagnóstico” del copy público de los componentes activos de la home sin reintroducir precios bajos ni lenguaje de oferta. Sin rediseño del hero, rutas nuevas, dependencias, FitNutrition ni ejecución de 1.8.
- [x] **1.5** Agregar bloque “Sistemas a medida” (según `docs/02-services.md`).
      *Hecho cuando:* existe una sección con descripción de negocio, a quién le sirve y CTA a contacto/proyecto.
      *Cerrada:* se agregó `CustomSystemsSection` en la home con `id="sistemas"` y CTA **“Solicitar propuesta”** (→ `#contacto`). La sección explica qué es un sistema a medida, a qué negocios les sirve, qué problemas ordena y ejemplos de módulos (clientes/CRM, citas, pedidos/cotizaciones, inventario, usuarios/roles, reportes/dashboards y automatización de seguimiento). No publica precios, no usa lenguaje de oferta ni jerga técnica. La sección técnica previa cambió a `id="ingenieria"` para evitar IDs duplicados y mantener `#sistemas` como bloque comercial.
- [x] **1.6** Agregar bloque “Plataformas multicanal” (según `docs/02-services.md`).
      *Hecho cuando:* existe la sección, explicada sin tecnicismos, con CTA a contacto/proyecto.
      *Cerrada:* se agregó `MultichannelPlatformsSection` en la home con `id="plataformas"` y CTA **“Solicitar propuesta”** (→ `#contacto`). La sección explica plataformas multicanal como sistemas que funcionan desde web, computadora o celular sobre una misma información central, sin usar jerga técnica. Incluye canales (web para administración/control, móvil para consulta/seguimiento, escritorio para operación interna), estructura de crecimiento (usuarios/permisos, módulos por proceso, etapas y reportes) y escenarios concretos de uso. No publica precios ni lenguaje de oferta. Responsive verificado en 390/768/1440 sin overflow horizontal.
- [x] **1.7** Actualizar el formulario de contacto para que el eje sea el tipo de proyecto, no el precio.
      *Hecho cuando:* las opciones son sitio profesional, landing, sistema de citas, menú digital, sistema a medida, plataforma multicanal, automatización y reportes; sin precios como eje; el envío funciona.
      *Cerrada:* el formulario ahora se titula **“Cuéntanos tu proyecto”** y captura nombre, empresa o negocio, WhatsApp o correo, tipo de proyecto y qué necesita resolver. Las opciones quedaron como: Sitio web profesional, Landing page, Menú digital, Agenda o sistema de citas, Sistema a medida, Plataforma multicanal, Automatización y reportes, y “No estoy seguro, necesito orientación”. El botón se mantiene como **“Enviar solicitud”** y el envío conserva el comportamiento existente: abre WhatsApp con el mensaje armado y los nuevos campos. No hay precios, paquetes, notas de plan mensual ni lenguaje de oferta en el formulario.
- **1.8 — Pulido premium de dirección visual y motion concept.**
      *Importante:* este bloque **NO se ejecuta como una sola tarea gigante**. Se divide en subtareas internas y solo se ejecutan en orden después de cerrar 1.7 y antes de dar por terminada la Fase 1.
      *Objetivo:* elevar la home de VisibleMX de “correcta y profesional” a “memorable y premium”, usando una narrativa visual basada en el concepto: **“Lo invisible se vuelve visible.”**
      *Concepto creativo:* VisibleMX convierte información dispersa en operación visible. El negocio ya tiene datos valiosos en WhatsApp, Excel, notas, pedidos, cotizaciones y memoria humana; VisibleMX los centraliza en sistemas, CRM, dashboards, automatizaciones y plataformas multicanal.
      *Propuesta narrativa obligatoria:* información dispersa → operación visible → sistema ordenado.
      *Reglas generales de 1.8:*
      - No ejecutar ninguna subtarea sin seguir el orden.
      - No instalar GSAP, Lenis, Three.js ni usar Canvas hasta que `1.8.1` justifique su uso.
      - No rediseñar todo de golpe.
      - No sacrificar el reposicionamiento logrado en 1.1–1.7.
      - No usar Lottie genérico o animaciones de stock.
      - No sacrificar performance, responsive, SEO ni accesibilidad.
      - Mobile debe tener fallback más simple y rápido.
      - Sin glows, sparkles, emojis, gradientes morados ni efectos decorativos sin propósito.
      - Respetar `docs/07-ui-quality-standards.md`.

      - [x] **1.8.1** Definir dirección creativa y alcance técnico.
            *Hecho cuando:* quede documentado qué se va a construir, qué no se va a construir, qué interacción será prioritaria, qué librerías se justifican y cuál será el fallback mobile.
            *Cerrada:* definido en `docs/08-motion-concept.md`. La dirección creativa queda centrada en **“Lo invisible se vuelve visible”**: información dispersa → operación visible → sistema ordenado. Para `1.8.2` se prioriza un hero scanner/reveal sobrio, construido primero con React, TypeScript, Tailwind/CSS y SVG; `motion` solo si aporta microinteracciones claras. Quedan fuera del alcance inicial: rediseño total, 3D, Canvas, Lenis, Three.js/R3F/GLSL, Lottie y dependencias nuevas. Mobile tendrá fallback simple y `prefers-reduced-motion` debe estar contemplado.
      - [ ] **1.8.2** Prototipo del hero scanner/reveal.
            *Hecho cuando:* exista una primera versión funcional y sobria del concepto “lo invisible se vuelve visible”, sin romper performance, responsive ni claridad comercial.
      - [ ] **1.8.3** Scroll narrativo caos → sistema.
            *Hecho cuando:* los elementos dispersos se ordenen visualmente en una arquitectura de operación, usando motion solo si aporta a la narrativa.
      - [ ] **1.8.4** Servicios como arquitectura visual.
            *Hecho cuando:* las secciones de servicios se sientan conectadas a una misma propuesta de sistema, no como cards aisladas genéricas.
      - [ ] **1.8.5** Pulido final, performance y accesibilidad.
            *Hecho cuando:* mobile, tablet y desktop funcionen sin overflow, con motion reducido si el usuario lo solicita, sin animaciones pesadas y sin sacrificar SEO ni claridad.

**Criterio de salida:** un visitante entiende en ~10 segundos que VisibleMX hace desde una landing hasta un sistema completo, y que el siguiente paso es un diagnóstico.

---

## Fase 2 — Servicios

**Objetivo:** estructurar la oferta en los tres niveles de `docs/02-services.md`.

- [ ] **2.1** Crear página/sección de servicios con: Presencia digital, Sistemas a medida, Plataformas multicanal.
      *Hecho cuando:* los tres niveles están presentes, con descripción de negocio y siguiente paso.
- [ ] **2.2** Redactar cada servicio sin tecnicismos (descripción, a quién le sirve, cómo se explica).
      *Hecho cuando:* el copy coincide con `docs/02-services.md` y no usa jerga técnica.
- [ ] **2.3** Mover productos de entrada a una página secundaria (no protagonizan la home).
      *Hecho cuando:* los productos de entrada viven en su propia página y la home no gira alrededor de ellos.

**Criterio de salida:** la oferta es legible y escalonada; el cliente se ubica solo en el nivel que necesita.

---

## Fase 3 — Portafolio

**Objetivo:** demostrar capacidad sin prometer de más.

- [ ] **3.1** Crear `/portafolio` (índice de casos).
      *Hecho cuando:* la ruta existe y lista los casos disponibles.
- [ ] **3.2** Crear `/portafolio/cltj` como caso formal (contexto, rol, enlace en vivo).
      *Hecho cuando:* el caso cuenta la historia sin métricas inventadas y enlaza al sitio real.
- [ ] **3.3** Crear `/portafolio/fitnutrition` como caso técnico (capturas, módulos, diagrama).
      *Hecho cuando:* figura como arquitectura multicanal, NO como producto en producción.
- [ ] **3.4** Revisar que no se expongan repos antiguos como prueba principal ni demo en vivo de FitNutrition.
      *Hecho cuando:* no hay enlaces a repos viejos como evidencia central.

**Criterio de salida:** existe evidencia presentable y honesta de capacidad, separada por tipo.

---

## Fase 4 — Demos y Labs

**Objetivo:** separar demos comerciales de exploraciones técnicas.

- [ ] **4.1** Implementar rutas de demos: `/demos/tap`, `/demos/page`, `/demos/menu`, `/demos/agenda`.
      *Hecho cuando:* las rutas existen y cada demo es claramente un ejemplo (datos ficticios).
- [ ] **4.2** Implementar `/labs/fitnutrition` (placeholder hasta tener la versión moderna desplegada).
      *Hecho cuando:* la ruta existe y comunica que es un lab técnico, sin prometer demo en vivo aún.
- [ ] **4.3** Migrar rutas actuales con redirecciones según la tabla de `docs/03-portfolio-and-demos.md`.
      *Hecho cuando:* `/tap` y `/demo/*` redirigen a las nuevas rutas sin romper enlaces.
- [ ] **4.4** Actualizar `sitemap.xml` y `robots.txt` con el esquema nuevo.
      *Hecho cuando:* el sitemap refleja las rutas vigentes.

**Criterio de salida:** queda claro qué es venta de producto, qué es experimento técnico y qué es proyecto real.

---

## Fase 5 — FitNutrition 2.0

**Objetivo:** demo moderna y vendible de sistema multicanal. **Solo arranca con la home ya reposicionada.** Detalle en `docs/05-fitnutrition-modernization.md` y `docs/06-technical-decisions.md`.

- [ ] **5.1** Definir alcance del MVP, modelo de datos y módulos núcleo.
      *Hecho cuando:* hay un documento de alcance aprobado.
- [ ] **5.2** Backend (monolito modular) + PostgreSQL + auth JWT/roles.
      *Hecho cuando:* el backend corre con auth y datos persistentes.
- [ ] **5.3** Panel web con módulos: pacientes/clientes, citas, consultas/progreso + reportes básicos.
      *Hecho cuando:* el CRUD de los módulos núcleo funciona end-to-end.
- [ ] **5.4** Docker + deploy en dominio demo con datos ficticios.
      *Hecho cuando:* hay una URL demo navegable con datos de ejemplo.
- [ ] **5.5** (Después del MVP) PWA/móvil, escritorio opcional, notificaciones, dashboards; Redis/HA solo si se justifica.
      *Hecho cuando:* cada extra se agrega solo con necesidad real documentada.

**Criterio de salida:** existe una demo en vivo y honesta de sistema multicanal moderno, enlazada desde `/labs/fitnutrition`.

---

## Fase 6 — Comercialización

**Objetivo:** usar la web para cerrar mejores clientes.

- [ ] **6.1** Crear formulario/brief de diagnóstico (discovery).
      *Hecho cuando:* existe un flujo que captura el contexto del proyecto del cliente.
- [ ] **6.2** Crear propuesta/PDF base con alcance por fases.
      *Hecho cuando:* hay una plantilla reutilizable de propuesta.
- [ ] **6.3** Página de servicios sin precios cerrados + página secundaria de productos de entrada (precios “desde”, si se decide).
      *Hecho cuando:* la estructura de `docs/04-pricing-policy.md` está reflejada en la web.

**Criterio de salida:** el sitio convierte interés en una conversación de diagnóstico, no en una compra impulsiva de producto barato.

---

## Estado actual

- Fase 0: **completada**.
- Fase 1: **en curso** — 1.1, 1.2, 1.3, 1.4, 1.5, 1.6 y 1.7 completadas.
- Próxima tarea concreta a ejecutar: **1.8.2** (prototipo del hero scanner/reveal; ver `docs/08-motion-concept.md` antes de implementar UI).

> Mantener esta sección “Estado actual” actualizada al cerrar cada tarea: apuntar siempre cuál es la siguiente `[ ]`.
