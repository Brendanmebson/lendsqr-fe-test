# Lendsqr Frontend Engineering Assessment

A pixel-faithful React/TypeScript/SCSS implementation of the Lendsqr Admin Console.

## Demo credentials
`admin@lendsqr.com` / `password123`

## Pages
| Page | Route |
|------|-------|
| Login | `/login` |
| Dashboard | `/dashboard` |
| Users | `/users` |
| User Details | `/users/:id` |

## Stack
- React 18 + TypeScript (strict)
- SCSS Modules
- Vite
- React Router v6
- Vitest + React Testing Library

## Quick start
```bash
npm install
npm run dev      # localhost:5173
npm test         # 28 unit tests
npm run build
```

## Key decisions

**Pagination over virtualisation** — with 500 records and 10 per page, the DOM never holds more than 10 rows. Virtualisation adds bundle weight without benefit at this scale. I'd add it if the dataset grew to 50k+ unfiltered rows.

**Mock API & Data Generation** — I used json-generator.com to generate the 500 mock records matching the exact schema from the Figma design. I then served this dataset from my own hosted endpoint (`/mock-users.json`) to guarantee zero network failures or rate limits during the review process, strictly following the requirement to provide my own dataset and endpoint. It also supports configuration of custom external mock APIs via the `VITE_API_URL` environment variable.

**localStorage first on User Details** — hook checks cache before fetching. Instant re-render on revisit, satisfies the persistence requirement.

**Pagination state persisted** — page + pageSize saved to localStorage so Back to Users returns you to where you were.

## Unspecified requirements handled
- Row actions menu (View Details, Blacklist, Activate)
- Empty state when filter returns zero results  
- Error state with retry button
- Shimmer skeleton loading state
- 404 state for unknown user IDs
- Responsive: sidebar collapses on ≤1024px, table scrolls on mobile
- Full keyboard navigation + focus-visible outlines
- ARIA labels, roles, aria-current on pagination
