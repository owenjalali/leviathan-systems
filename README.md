# Leviathan Systems (React + Vite)

This project runs **React + Vite** with **Tailwind CSS v4** using the official Vite plugin.

## Tailwind (v4) setup

- `tailwindcss`: `^4.1.18`
- `@tailwindcss/vite`: `^4.1.18`
- Vite plugin configured in `vite.config.js`
- Tailwind imported with `@import "tailwindcss";` in `src/index.css`
- Tailwind config in `tailwind.config.js` (wired via `@config` in `src/index.css`)

## Scripts

```bash
npm install
npm run dev
```

```bash
npm run build
npm run preview
```

```bash
npm run verify:tailwind
```
