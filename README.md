# Assignment 4 – Book Catalog SPA

A multi-view React SPA for tracking books with ratings and prices.

## Setup

```
npm install
npm run dev
```

## Routes

| Path | View |
|------|------|
| `/` | Home |
| `/list` | List with search/filter/sort |
| `/item/:id` | Detail view |
| `/new` | Add book |
| `/edit/:id` | Edit book |
| `*` | 404 fallback |

## Data Model

Each book has: `id`, `name`, `category`, `price`, `rating`, `description`

## Storage

localStorage key: `a4_items`

## Deployment

Uses HashRouter for GitHub Pages compatibility. Deploy by running `npm run build` and pushing the `dist/` folder.
