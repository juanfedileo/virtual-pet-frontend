## Project snapshot

This is a small React + TypeScript frontend scaffolded with Vite. Key facts an AI helper should know:

- Build & run: development uses `npm run dev` (Vite), production build runs `npm run build` which executes `tsc -b && vite build`. Preview with `npm run preview`.
- TypeScript: project references `tsconfig.app.json` and `tsconfig.node.json` (see `tsconfig.json`). Some edits may require running `tsc -b` before the Vite build.
- Linting: `npm run lint` runs ESLint via the repo's `eslint.config.js`.

## Architecture & important files

- Entry: `index.html` → `src/main.tsx` renders `<App />`.
- App shell: `src/App.tsx` composes `NavBar` and `ProductList`.
- Components: `src/components/*` (e.g. `NavBar.tsx`, `Products/ProductList.tsx`, `Products/ProductItem.tsx`). Follow the existing default-export pattern for components.
- Styling: global styles in `src/index.css` and `src/App.css`. Components use MUI `sx` props (see `ProductItem.tsx` and `NavBar.tsx`).

## Conventions & idioms to preserve

- Use `.tsx` for React components and default exports as shown in the repo.
- UI library: Material UI (MUI) is used extensively. Use MUI primitives (Card, GridLegacy, AppBar) and `sx` for styling consistency.
- Data fetching: `ProductList` uses a plain `fetch` to `https://fakestoreapi.com/products` inside `useEffect`. Keep async UI loading patterns (loading state + spinner) consistent.
- Grid: the list uses `GridLegacy` from MUI — preserve the same responsive usage when adding lists.

## Build / dev workflow tips

- To run locally: `npm install` then `npm run dev` (Vite with HMR).
- When adding new TS files that change project references, run `npm run build` (this runs `tsc -b` and then `vite build`). If you only change UI, `vite` dev server is enough.
- ESLint is configured via `eslint.config.js`. Run `npm run lint` before opening PRs.

## Integration & external dependencies

- External API: `https://fakestoreapi.com/products` is used for product data in `ProductList.tsx` — tests or mocks should intercept that endpoint.
- MUI packages (`@mui/material`, `@mui/icons-material`) and Emotion (`@emotion/react`, `@emotion/styled`) are used for styling and icons.

## Helpful examples to follow

- Add a new presentational component under `src/components/` and export default the React component (see `ProductItem.tsx`).
- For data-driven pages, follow `ProductList.tsx`: use `useEffect` → `fetch` → set state → show a loading spinner while fetching.

## What not to change without CI/dev verification

- `tsconfig` project references and `eslint.config.js` — changing these can break builds. If you change them, run `npm run build` and `npm run lint` locally.

If any of this is unclear or you want examples for a specific change (new route, new API integration, tests), tell me which area and I will expand or add a short code snippet.
