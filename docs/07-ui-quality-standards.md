# 07 · Estándar de calidad UI

Reglas para que VisibleMX **no parezca una web improvisada, “vibe coded” o generada rápido**. Revisar este documento antes de tocar cualquier UI. La confianza se gana con consistencia, no con efectos.

Principio rector: **claridad, consistencia y confianza por encima de novedad visual.**

---

## Espaciado

- **Escala base de 8px.** Todo padding, margin y gap debe ser múltiplo de 8 (4px permitido solo para ajustes finos puntuales: 4, 8, 16, 24, 32, 48, 64…).
- Nada de valores aleatorios (`13px`, `27px`, `mt-[18px]`). Si un valor no está en la escala, probablemente está mal.
- Ritmo vertical consistente entre secciones; no improvisar separaciones “a ojo”.

## Tipografía

- **Jerarquía clara y limitada**: un set definido de tamaños/pesos para h1, h2, h3, body, caption. No inventar tamaños por componente.
- Máximo 1–2 familias tipográficas con un propósito claro cada una.
- Longitud de línea legible en textos largos (~60–80 caracteres).
- Contraste y peso suficientes para que el texto se lea sin esfuerzo en móvil.

## Color y contraste

- **Paleta disciplinada**: colores de marca + neutros + un acento. No agregar colores nuevos por capricho.
- Cumplir contraste accesible (texto normal objetivo AA). Nada de gris claro sobre blanco.
- El color comunica jerarquía y estado, no “adorna”.

## Efectos (lo que se evita)

- **Sin gradientes morados** ni gradientes decorativos sin razón.
- **Sin glows** y **sin “sparkles”** decorativos.
- **Sin emojis decorativos** en UI o copy.
- Animaciones discretas y con propósito; respetar `prefers-reduced-motion`.
- Cada efecto debe justificar su valor; ante la duda, quitarlo.

## Hover e interacción

- **Sin hover agresivo en todas las cards.** Nada de escalados grandes, saltos o sombras exageradas en cada elemento.
- Estados hover/active sutiles y consistentes en todo el sitio.
- El feedback de interacción debe ser uniforme (no un hover distinto por componente).

## Sistema de componentes

- **No mezclar border-radius.** Definir una escala de radios (p. ej. sm/md/lg/full) y usarla; no combinar 6px, 10px, 14px, 20px al azar.
- **No mezclar sombras.** Una escala de elevación definida; nada de sombras distintas por componente sin sistema.
- Botones, inputs, cards y badges deben verse como parte de la misma familia (mismos paddings, radios y estados).

## Contenido honesto

- **Sin testimonios falsos.** Si no hay testimonios reales y verificables, no se ponen.
- **Sin links sociales falsos ni con `#`.** Un ícono social solo existe si apunta a un perfil real; si no, se omite.
- **Sin métricas o clientes inventados** (ver `AGENTS.md`).

## Copy

- **Sin frases genéricas** que no expliquen valor real: evitar “crea sin límites”, “el futuro de tu negocio”, “transformamos ideas”, “soluciones innovadoras”.
- Cada frase debe decir algo concreto que el cliente entienda en términos de su negocio (ver `docs/00-visiblemx-context.md` y `docs/02-services.md`).
- Español natural y profesional, con acentos y ñ correctos.

## Layout y hero

- **Hero sobrio, no sobrecargado.** Una idea principal, una promesa clara y un CTA primario (con, a lo sumo, un CTA secundario). Sin amontonar badges, estadísticas, efectos y botones a la vez.
- Composición ordenada y con aire; alinear a una rejilla coherente.

## Funcionalidad (no negociable)

- **Todo botón, link, tab, formulario y CTA debe funcionar.** Nada decorativo que no lleve a ningún lado.
- Estados vacíos, de error y de éxito contemplados donde aplique.
- **Agregar estados de loading** en toda acción asíncrona (envíos, navegación pesada, carga de datos).

## Responsive

- **Verificar mobile y desktop antes de dar por terminado.** Probar al menos móvil chico, tablet y desktop.
- Sin scroll horizontal accidental; sin texto cortado; sin elementos encimados.
- Targets táctiles cómodos (mínimo ~44px) en móvil.

## SEO y metadatos

- Revisar **meta title** y **meta description** (coherentes con la promesa central, por ruta cuando aplique).
- **Favicon** presente y correcto.
- **OpenGraph / Twitter** completos (título, descripción, imagen 1200×630, URL canónica).
- Actualizar `sitemap.xml` y `robots.txt` cuando cambien las rutas.

---

## Checklist antes de cerrar una UI

- [ ] Spacing en escala de 8px, sin valores sueltos.
- [ ] Jerarquía tipográfica respetada.
- [ ] Paleta y contraste correctos.
- [ ] Un solo sistema de radios y de sombras.
- [ ] Sin glows, gradientes morados, sparkles ni emojis decorativos.
- [ ] Hover/estados sutiles y consistentes.
- [ ] Sin testimonios ni links sociales falsos; sin `#`.
- [ ] Copy concreto, sin frases huecas, con acentos correctos.
- [ ] Hero sobrio.
- [ ] Todos los botones/links/tabs/formularios/CTAs funcionan.
- [ ] Estados de loading en acciones async.
- [ ] Probado en mobile y desktop, sin scroll horizontal.
- [ ] Meta title, description, favicon y OpenGraph revisados.
