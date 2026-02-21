# Visible MX Ecosystem (Production)

Proyecto separado y limpio del prototipo de Figma Make, reconstruido en:

- `React 19 + Vite + TypeScript`
- `Tailwind CSS v4` (vía CSS variables)
- `react-router` (Data Router)
- `gsap + ScrollTrigger` y `motion/react`

## Rutas

- `/` Home Agencia
- `/demo/link` Visible Link
- `/demo/page` Visible Page (Gym)
- `/demo/menu` Visible Menu
- `/demo/agenda` Visible Agenda

## Comandos

```bash
npm install
npm run dev
npm run build
npm run preview
```

## Deploy

### Vercel

- Archivo incluido: `vercel.json`
- Build command: `npm run build`
- Output: `dist`

### Netlify

- Archivos incluidos: `netlify.toml` y `public/_redirects`
- Build command: `npm run build`
- Publish directory: `dist`

## Notas

- Proyecto listo para SPA fallback en rutas internas.
- Build de producción validado localmente.
