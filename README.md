# CMLABS Front-end Part-time Test

Pre-assessment FE-PT-02-2 — dibangun dengan Next.js App Router, TypeScript, dan Tailwind CSS v4.

## Fitur

**Halaman wajib:**
- Halaman Ingredients — list semua ingredients + search by name (frontend)
- Halaman Ingredients Detail — list meal berdasarkan ingredient + search by name (frontend)
- Halaman Meals Detail *(opsional, dikerjakan)* — gambar, instruksi, recipe, YouTube embed

**Fitur tambahan:**
- Favorites — simpan ingredients dan meals favorit ke localStorage, tab UI terpisah
- Infinite scroll — load 18 ingredients per batch dengan skeleton loading
- Breadcrumb navigasi 3-level dengan JSON-LD structured data
- SEO — `generateMetadata` per halaman, Open Graph, canonical URL
- Hero section dengan mosaic tiles (desktop) dan auto-advancing carousel (mobile)
- ISR (Incremental Static Regeneration) — data di-cache 30 menit

## Stack

| | |
|---|---|
| Framework | Next.js 16 (App Router) |
| Language | TypeScript |
| UI | React 19 + Tailwind CSS v4 |
| Font | Manrope + Playfair Display |
| API | TheMealDB (public, no key) |

## Menjalankan Project

```bash
cd app
cp .env.example .env.local
npm install
npm run dev
```

Buka http://localhost:3000

```bash
# Build production
npm run build
npm run start

# Lint
npm run lint
```

## Struktur Halaman

| Route | Deskripsi |
|---|---|
| `/` | List ingredients + hero section |
| `/ingredients/[ingredient]` | List meals berdasarkan ingredient dipilih |
| `/meals/[mealId]` | Detail meal (gambar, instruksi, recipe, YouTube) |
| `/favorites` | Daftar ingredients & meals yang difavoritkan |

## API Endpoint

- List ingredients: `https://www.themealdb.com/api/json/v1/1/list.php?i=list`
- Filter by ingredient: `https://www.themealdb.com/api/json/v1/1/filter.php?i={ingredient-name}`
- Meal detail: `https://www.themealdb.com/api/json/v1/1/lookup.php?i={meal-id}`

## Struktur Folder

```
src/
├── app/               # Route pages (App Router)
├── components/
│   ├── home/          # HeroSection, ThumbnailCarousel
│   ├── ingredients/   # IngredientsExplorer
│   ├── meals/         # MealsExplorer
│   ├── favorites/     # FavoritesContent, card components
│   ├── layout/        # Navbar, PageShell, FavoritesLink
│   └── ui/            # SearchInput, FavoriteButton, Breadcrumb
├── context/           # FavoritesContext (React Context)
├── hooks/             # useFavorites
├── lib/               # api.ts
└── types/             # TypeScript types
```
