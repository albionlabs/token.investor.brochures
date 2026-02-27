# @albionlabs/brochure-templates

A Svelte 5 component library for generating print-ready brochure templates for Albion protocol investment tokens.

Each template is a self-contained unit that includes:

- **Renderer** — a Svelte component that accepts a typed `data` prop and renders the full layout
- **JSON Schema** — for validating input data and powering schema-driven form UIs
- **TypeScript types** — full type definitions for the template's data shape
- **Sample data** — a working example you can render out of the box
- **Metadata** — id, name, description, version, and category

This library is designed to be consumed by a parent SvelteKit application that handles the surrounding concerns: template picker UI, schema-driven forms, JSON upload, PDF export, and authentication. The library focuses purely on rendering and data contracts.

## Architecture

```
Parent SvelteKit App (template picker, form UI, auth, PDF export)
  └── imports @albionlabs/brochure-templates
        ├── listTemplates()            → enumerate available templates
        ├── getTemplate('investor-pitch') → renderer + schema + sample data
        └── <InvestorPitchRenderer>    → render with data prop
```

The parent app owns layout and orchestration. Each template renderer is self-contained — it sets its own fonts, colors, and spacing without leaking global styles. For PDF export, templates include `@media print` CSS so the parent app can simply call `window.print()` or use server-side rendering.

## Install

```bash
npm install @albionlabs/brochure-templates
```

Requires `svelte ^5.0.0` as a peer dependency.

## Usage

### Registry API

The registry lets a parent app enumerate templates dynamically — useful for building a template picker or factory UI where users choose which brochure to create.

```ts
import { listTemplates, getTemplate } from '@albionlabs/brochure-templates';

// List all available templates (returns TemplateDefinition[])
const templates = listTemplates();
templates.forEach(t => console.log(t.meta.name));

// Get a specific template by ID
const template = getTemplate('investor-pitch');
// template.renderer   — Svelte component accepting { data }
// template.schema     — JSON Schema object (for ajv validation or form generation)
// template.sampleData — example data to render immediately
// template.meta       — { id, name, description, version, category }
```

### Rendering a template

```svelte
<script>
  import { getTemplate } from '@albionlabs/brochure-templates';

  const template = getTemplate('investor-pitch');
  const Renderer = template.renderer;
  const data = template.sampleData; // or your own data
</script>

<Renderer {data} />
```

### Direct imports (tree-shakeable)

If you know which template you need, import it directly to avoid pulling in the full registry:

```svelte
<script>
  import { InvestorPitchRenderer } from '@albionlabs/brochure-templates';
  import type { InvestorPitch } from '@albionlabs/brochure-templates';

  let { data }: { data: InvestorPitch } = $props();
</script>

<InvestorPitchRenderer {data} />
```

You can also import from the template sub-path:

```ts
import { InvestorPitchRenderer, investorPitchSchema } from '@albionlabs/brochure-templates/templates/investor-pitch';
```

### Schema validation

Each template ships a JSON Schema that describes the exact shape of its data. Use it with any JSON Schema validator (e.g. ajv) to validate user input before rendering, or to generate forms automatically.

```ts
import Ajv from 'ajv';
import { investorPitchSchema } from '@albionlabs/brochure-templates';

const ajv = new Ajv();
const validate = ajv.compile(investorPitchSchema);

if (!validate(userData)) {
  console.error(validate.errors);
}
```

### Print / PDF

Template renderers include `@media print` styles for clean PDF output. The investor-pitch template is optimized for A4 landscape. To generate a PDF from the parent app:

```ts
window.print();
```

Or use a headless browser (Puppeteer, Playwright) for server-side PDF generation.

## Available templates

| Template | ID | Category | Description |
|---|---|---|---|
| Investor Pitch | `investor-pitch` | `investor-relations` | Single-page investor summary with key metrics, portfolio charts, sensitivity analysis, timeline, and risk overview |

## Adding a new template

1. Create a new directory under `src/lib/templates/<template-id>/`
2. Add the required files:
   - `types.ts` — data type definitions
   - `schema.json` — JSON Schema matching the types
   - `sample.json` — example data
   - `meta.ts` — template metadata (id, name, description, version, category)
   - `<Name>Renderer.svelte` — renderer component accepting `{ data }`
   - `components/` — internal components used by the renderer
   - `print.css` — `@media print` overrides
   - `index.ts` — barrel export
3. Register the template in `src/lib/registry.ts`
4. Re-export from `src/lib/index.ts`
5. Add an export path in `package.json` under `exports`

## Development

```bash
npm install
npm run dev       # Start dev preview at localhost (renders sample data)
npm run check     # TypeScript / Svelte type checking
npm run package   # Build library output to dist/
```

The `src/routes/` directory contains a dev preview app that renders templates using the registry with sample data. It is excluded from the published npm package.

## Publishing

Releases are published to npm automatically via GitHub Actions (OIDC trusted publishing) when a version tag is pushed:

```bash
npm version patch  # or minor / major — bumps version and creates a git tag
git push --follow-tags
```
