# 06 · Decisiones técnicas

Decisiones por defecto para los **sistemas y plataformas** que VisibleMX construye y vende (sistemas a medida y multicanal). No aplican al sitio comercial de este repo, que es un front estático en Vite/React.

Principio rector: **empezar simple, escalar cuando el uso lo justifique.** La complejidad se paga; solo se agrega cuando hay un problema real que resolver.

Importante: estas decisiones son **internas**. Nunca son argumento de venta. Al cliente se le habla de orden, control y crecimiento, no de Postgres ni Docker.

---

## Arquitectura

- **Monolito modular primero.** Un solo despliegue, organizado en módulos con límites claros (dominios separados, base de datos compartida). Más fácil de construir, depurar, desplegar y mantener para proyectos de cliente.
- **No microservicios al inicio.** Solo se consideran si hay equipos/escala que lo exijan. Para casi todos los clientes de VisibleMX, microservicios = costo y complejidad sin beneficio.
- Diseñar los módulos con buenas fronteras para que, si algún día se justifica extraer un servicio, se pueda hacer sin reescribir todo.

## Base de datos

- **PostgreSQL como base principal.** Relacional, robusta, gratuita, con buen soporte para datos estructurados y consultas/reportes.
- Una sola base por sistema en el monolito modular; esquemas/módulos bien separados.
- Migraciones versionadas y reproducibles.

## Entornos y despliegue

- **Docker recomendado** para entornos reproducibles (dev = prod en lo posible) y despliegues limpios.
- **VPS / Lightsail es suficiente para la primera versión** de la mayoría de los proyectos. Económico y predecible.
- **AWS avanzado (ECS/EKS, RDS multi-AZ, autoescalado, etc.) solo para clientes con presupuesto y operación crítica.** No es el default.

## Rendimiento y escala

- **Redis solo cuando haga falta** (caché, sesiones, colas). No se agrega “por si acaso”.
- **Load balancer solo si hay varias instancias o requisito real de alta disponibilidad.** Una instancia bien dimensionada cubre la mayoría de los casos iniciales.
- Optimizar con datos reales (mediciones), no por intuición.

## Operación obligatoria (en todo proyecto)

Esto no es opcional, incluso en el MVP más pequeño:

- **Variables de entorno** para toda configuración y secreto. Nada de credenciales en el código.
- **Backups** de base de datos automáticos y probados (un backup que no se restaura no es backup).
- **Logs** de aplicación y de errores, accesibles para diagnóstico.

Recomendado además: autenticación con JWT + roles, HTTPS, y un proceso mínimo de despliegue documentado.

---

## Árbol de decisión rápido

- ¿Proyecto nuevo de cliente? → Monolito modular + PostgreSQL + Docker en VPS/Lightsail.
- ¿Necesito caché/sesiones/colas con evidencia de carga? → Agregar Redis.
- ¿Varias instancias o alta disponibilidad real? → Agregar load balancer.
- ¿Operación crítica con presupuesto? → Considerar AWS avanzado.
- ¿Dudas? → Quedarse en la opción más simple y documentar por qué.

## Relación con FitNutrition 2.0

La modernización de FitNutrition sigue estas decisiones: monolito modular, PostgreSQL, JWT+roles, Docker y despliegue en VPS/Lightsail para el MVP; Redis/HA/infra avanzada solo si el uso lo justifica. Ver `docs/05-fitnutrition-modernization.md`.
