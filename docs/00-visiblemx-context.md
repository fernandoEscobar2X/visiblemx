# 00 · Contexto de VisibleMX

Documento base. Es la fuente principal de contexto del proyecto. Cualquier cambio en la web, el copy o la oferta debe ser coherente con lo que aquí se define.

---

## Qué es VisibleMX

VisibleMX es un estudio/agencia digital en Tijuana enfocado en construir **presencia digital y software para negocios**. No es una fábrica de páginas baratas: es un estudio capaz de cubrir desde una landing hasta un sistema completo para operar un negocio.

Alcance real de la oferta:

- Sitios web profesionales y landing pages de conversión.
- Menús digitales y sistemas de agenda/citas.
- Tarjetas digitales NFC / QR.
- Sistemas de gestión a medida (paneles, CRM, inventarios, cotizadores).
- Automatización por WhatsApp.
- Dashboards, medición y reportes.
- Plataformas multicanal (web + móvil + escritorio sobre una base de datos central).

## Problema actual de percepción

La web actual tiene buena calidad visual, pero **la oferta visible se percibe económica**: precios bajos en primer plano, foco en productos pequeños y lenguaje de “oferta/descuento”. Esto comunica “proveedor barato” en lugar de “estudio capaz de construir software de negocio”.

Señal concreta: la propia clienta revisó la página, preguntó si estaba actualizada y detectó fallas en desktop. La prioridad es **mejorar percepción, orden comercial y confianza**, no agregar más efectos.

## Nueva dirección de marca

VisibleMX debe comunicar **más seriedad, más valor, más estrategia y más capacidad técnica**. La marca pasa de “hacemos páginas web económicas” a “construimos presencia digital, sistemas a medida y plataformas multicanal para negocios”.

La oferta se organiza en dos niveles claros:

1. **Productos de entrada** — presencia digital rápida (landing, sitio, menú, agenda, NFC/QR). Pueden conservar precios “desde” en una página secundaria, pero **no deben dominar la home**.
2. **Soluciones profesionales** — sistemas a medida y plataformas multicanal. Se manejan con **diagnóstico y cotización personalizada**, sin precio cerrado en la home.

## Promesa central

> Creamos sitios, sistemas y plataformas digitales para negocios que quieren vender mejor, operar con más orden y crecer sin depender de WhatsApp, Excel o procesos manuales.

Todo el copy de la web debe poder rastrearse a esta promesa. Si una sección no aporta a “vender mejor / operar con más orden / crecer sin caos manual”, sobra o está mal enfocada.

## Clientes objetivo

- **Negocios locales que quieren verse profesionales**: restaurantes, salones, clínicas, gimnasios, despachos, comercios. Necesitan presencia digital y, a veces, agenda o menú.
- **Negocios que ya operan y se les desordena la operación**: usan WhatsApp + Excel + libretas y pierden control. Necesitan un sistema a medida.
- **Negocios en crecimiento o con varias sucursales/roles**: necesitan que web, oficina y campo trabajen sobre la misma información. Son candidatos a plataforma multicanal.

Regla práctica: a mayor dolor operativo del cliente, mayor es el valor (y el ticket) que VisibleMX puede ofrecer.

## Servicios principales

Definición corta (detalle en `docs/02-services.md`):

1. **Presencia digital** — que te encuentren y te contacten: sitios, landings, menús, agendas, NFC/QR.
2. **Sistemas a medida** — ordenar la operación: paneles, CRM, inventarios, cotizadores, reportes, automatización por WhatsApp.
3. **Plataformas multicanal** — operar desde varios canales sobre una base central: web + móvil + escritorio, con usuarios, roles y módulos.

## Cómo entender FitNutrition

FitNutrition fue la **base conceptual** para demostrar arquitectura multicanal: API central + app de escritorio + app móvil + base de datos, con módulos de usuarios, pacientes, citas, consultas, dietas y progreso.

Cómo tratarlo:

- Es un **caso técnico de portafolio / lab**, no un producto comercial final.
- Demuestra que VisibleMX entiende y puede construir sistemas multicanal modernos.
- La versión antigua **no** se presenta como software a la venta ni como sistema en producción.
- La versión comercial futura se moderniza (stack actual) y se usa como demo cuando esté lista. Ver `docs/05-fitnutrition-modernization.md`.

## Cómo entender CLTJ

CLTJ (“Corte Laser Tijuana”, sitio en `cltj.netlify.app`) es un **caso real**: un sitio para un negocio de displays acrílicos, corte láser y piezas personalizadas en Tijuana.

Cómo tratarlo:

- Es portafolio real, presentable como caso con contexto, rol y enlace en vivo.
- Es un **proyecto de cliente**, no un servicio/producto de catálogo de VisibleMX. No se fusiona con la marca.
- Sirve para demostrar capacidad de presencia digital orientada a conversión, sin inventar métricas que no estén verificadas.

## Qué significa “sistema multicanal”

Un sistema multicanal es **una sola información, varios puntos de acceso**: una base de datos central y una API que la sirve, consumida desde distintos canales (web, móvil, escritorio) según el rol de cada usuario.

Cómo explicarlo a un cliente, sin tecnicismos:

> Un sistema propio para ordenar la operación del negocio, donde empleados, administradores y clientes acceden a la misma información actualizada desde la computadora, el celular o la web, sin duplicar datos ni depender de mensajes sueltos.

Qué **no** decir al cliente: “REST”, “JWT”, “Spring Boot”, “JavaFX”, “Redis”, “microservicios”. Eso vive en `docs/06-technical-decisions.md`, no en la venta.

## Tono de marca

- **Serio, claro y seguro.** Como un estudio que sabe lo que hace, no como una promo.
- **Orientado a negocio**, no a tecnología: se habla de ventas, orden, tiempo y control.
- **Concreto.** Nada de “transformamos ideas” o “el futuro de tu negocio” sin explicar el valor real.
- **Sobrio en lo visual.** La confianza se gana con consistencia, no con efectos (ver `docs/07-ui-quality-standards.md`).
- **Honesto.** No se inventan clientes, métricas ni demos. Lo que se muestra, existe y funciona.

## Prioridad estratégica

Primero se actualiza y reposiciona VisibleMX (home, servicios, portafolio). Después se moderniza FitNutrition. La percepción de VisibleMX depende primero de su página principal; ver el plan completo en `docs/01-roadmap.md`.
