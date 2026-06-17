# 05 · FitNutrition — papel estratégico y modernización

Cómo entender, presentar y (a futuro) modernizar FitNutrition. Lectura obligatoria antes de mencionarlo en cualquier parte de la web.

---

## Qué fue

FitNutrition fue una **base técnica/académica** que implementó una arquitectura multicanal completa:

- API central (servidor + base de datos).
- Cliente de escritorio.
- App móvil.
- Módulos de dominio: usuarios, pacientes, citas, consultas, dietas y progreso.

Su valor no es el producto en sí, sino que **demuestra que VisibleMX entiende y puede construir un sistema donde varios canales comparten una sola fuente de datos**.

## Qué demuestra

- Capacidad de diseñar una arquitectura multicanal real (no un mockup).
- Modelado de dominio con varios módulos relacionados.
- Integración de escritorio + móvil + API sobre una base central.
- Que VisibleMX puede ofrecer “plataformas multicanal” con respaldo, no solo de palabra.

## Qué NO se debe afirmar

- Que está en producción.
- Que es un producto comercial terminado.
- Que tiene clientes, usuarios reales o métricas de uso.
- Que hay una demo en vivo lista (hasta que exista la versión modernizada y desplegada).
- Que el stack original es lo que se le entregaría a un cliente hoy.

## Por qué no se vende tal cual

- Fue construido como ejercicio técnico/académico; no está endurecido para producción (seguridad, despliegue, soporte, mantenimiento).
- El stack original puede estar desactualizado frente a lo que hoy conviene operar y mantener.
- Vender una base académica como producto final daña la credibilidad que justo se quiere construir.

La regla: **FitNutrition se usa como prueba de capacidad, no como software a la venta.**

## MVP moderno (versión comercial mínima)

Objetivo del MVP: una demo en vivo, honesta y mantenible de “sistema multicanal moderno”.

- Backend moderno como **monolito modular** (ver `docs/06-technical-decisions.md`).
- Base de datos **PostgreSQL**.
- Autenticación con **JWT** y manejo de **roles**.
- **Panel web** funcional.
- Módulos núcleo: **pacientes/clientes, citas, consultas/progreso**.
- **Reportes básicos**.
- **Docker** para entorno reproducible.
- Despliegue en **dominio demo** con **datos ficticios**.

## Stack sugerido (guía, no dogma)

- Base de datos: PostgreSQL.
- Backend: framework moderno y mantenible sobre monolito modular; API REST/JSON.
- Auth: JWT + roles.
- Frontend del panel: web (alineado al stack del repo cuando aplique).
- Canales adicionales: PWA/móvil primero; escritorio solo si el caso lo pide.
- Infra inicial: VPS/Lightsail + Docker. Redis, load balancer y AWS avanzado **solo cuando se justifique** (ver `docs/06-technical-decisions.md`).

La versión comercial **no debe heredar directamente el stack antiguo**: se moderniza con criterio de mantenibilidad y despliegue real.

## Fases de modernización

1. **Diseño**: definir alcance del MVP, modelo de datos y módulos núcleo.
2. **Backend + datos**: monolito modular + PostgreSQL + auth/roles.
3. **Panel web**: CRUD de pacientes/clientes, citas y consultas/progreso + reportes básicos.
4. **Despliegue demo**: Docker + VPS/Lightsail + dominio demo + datos ficticios.
5. **Canales extra**: PWA/móvil; escritorio opcional; notificaciones; dashboards.
6. **Escalamiento**: Redis/colas, alta disponibilidad e infra avanzada solo si el uso lo exige.

Orden respecto al roadmap: esta modernización es la **Fase 5** y solo arranca con la home de VisibleMX ya reposicionada.

## Cómo presentarlo comercialmente

- En portafolio/labs como **caso técnico de arquitectura multicanal**, con capturas, lista de módulos y diagrama (API central → escritorio/móvil/web → base de datos).
- Mensaje al cliente, en términos de negocio:
  > Así construimos sistemas donde tu equipo y tus clientes trabajan sobre la misma información desde distintos dispositivos. FitNutrition es nuestra demostración de esa capacidad.
- Mientras no exista la versión moderna desplegada: mostrarlo como caso/diagrama, **sin** prometer demo en vivo.
- Cuando exista el MVP: enlazarlo desde `/labs/fitnutrition` como demo funcional con datos ficticios.
