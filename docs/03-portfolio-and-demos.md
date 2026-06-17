# 03 · Portafolio, demos y labs

Tres categorías distintas. No se mezclan. Cada una tiene un propósito y un nivel de “realidad” diferente.

| Categoría | Qué es | Propósito | Nivel de realidad |
|-----------|--------|-----------|-------------------|
| Portafolio | Proyectos reales de clientes | Generar confianza con casos verificables | Real, en producción |
| Demos | Piezas comerciales de productos de entrada | Vender Tap/Page/Menu/Agenda | Ejemplo realista, datos ficticios |
| Labs | Exploraciones técnicas propias | Demostrar capacidad técnica | Experimento, no comercial |

---

## Portafolio

Proyectos reales con cliente real. Cada caso cuenta una historia: contexto, qué construyó VisibleMX, su rol y el resultado **solo si está verificado**. Sin métricas inventadas.

**CLTJ — Corte Laser Tijuana**
Sitio para un negocio de displays acrílicos, corte láser y piezas personalizadas en Tijuana (`cltj.netlify.app`). Caso de presencia digital orientada a conversión. Es un proyecto de cliente, no un producto de catálogo de VisibleMX, y no se fusiona con la marca.

**FitNutrition (como caso técnico)**
Figura en portafolio como **caso de arquitectura multicanal**, no como producto comercial final. Se presenta con capturas, módulos y diagrama de arquitectura, dejando claro que es una base técnica/demostración (detalle en `docs/05-fitnutrition-modernization.md`).

## Demos

Ejemplos comerciales y navegables de los productos de entrada. Usan datos ficticios realistas (negocios de ejemplo) y sirven para que el cliente “toque” el producto antes de comprar.

- **Tap** — tarjeta de contacto digital NFC/QR (varios estilos por perfil de cliente).
- **Page** — sitio profesional de negocio (ejemplo: landing de gimnasio).
- **Menu** — menú digital con carrito y pedido por WhatsApp.
- **Agenda** — sistema de citas/reservaciones.

Regla: una demo es claramente un ejemplo. Nunca se presenta como cliente real ni como caso de portafolio.

## Labs

Exploraciones técnicas propias de VisibleMX. Muestran capacidad, no se venden tal cual.

- **FitNutrition (lab)** — demostración funcional de sistema multicanal cuando exista la versión modernizada y desplegada. Hasta entonces, no hay demo en vivo enlazada como prueba principal.

---

## Rutas recomendadas

Esquema objetivo (a implementar en las fases 3–4 del roadmap):

```
/portafolio                 Índice de casos reales
/portafolio/cltj            Caso CLTJ
/portafolio/fitnutrition    Caso técnico multicanal (FitNutrition)

/demos/tap                  Demo comercial: tarjeta NFC/QR
/demos/page                 Demo comercial: sitio profesional
/demos/menu                 Demo comercial: menú digital
/demos/agenda               Demo comercial: agenda/citas

/labs/fitnutrition          Lab técnico (demo funcional cuando exista)
```

## Mapeo desde las rutas actuales

El sitio hoy usa otro esquema. La migración debe conservar enlaces viejos con redirecciones para no romper SEO ni links compartidos:

| Ruta actual | Ruta objetivo | Acción |
|-------------|---------------|--------|
| `/tap` | `/demos/tap` | redirección 301/permanente |
| `/tap/demos/:slug` | `/demos/tap/:slug` | redirección + ajustar slugs |
| `/demo/link` | `/demos/...` o `/portafolio` | decidir si Link sigue como demo de entrada |
| `/demo/page` | `/demos/page` | redirección |
| `/demo/menu` | `/demos/menu` | redirección |
| `/demo/agenda` | `/demos/agenda` | redirección |
| (nuevo) | `/portafolio`, `/portafolio/cltj`, `/portafolio/fitnutrition`, `/labs/fitnutrition` | crear |

Notas:
- La implementación de rutas es trabajo de una fase futura; este documento solo fija el destino y las reglas. No cambiar rutas como parte de la documentación.
- Actualizar `sitemap.xml` cuando se implementen las rutas nuevas.

## Reglas de presentación

- No inventar clientes, testimonios ni métricas. Si un resultado no está verificado, no se afirma.
- No enlazar repos antiguos como prueba principal para clientes.
- No presentar FitNutrition como producto en producción.
- Una demo es una demo; un caso es un caso; un lab es un lab. Etiquetar siempre con claridad.
