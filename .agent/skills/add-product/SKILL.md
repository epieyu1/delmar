---
name: add-product
description: Add a real Del Mar Artesanías product to the catalog from user-provided details and product photos. Use for product additions; do not use for catalog redesigns or product copywriting without supplied facts.
---

# Add a catalog product

Use this skill when the user provides a new product's name, price, description, specifications, and images.

## Workflow

1. Read `src/data/products.js` and inspect `productos/` to understand the existing schema, categories, and newly supplied image files. Visually confirm that the photos match the product. If file ownership is unclear, ask before assigning or moving images.
2. Keep every product photo inside that product's own descriptive, lowercase, hyphenated subfolder under `productos/`. Move matching loose incoming photos into the folder; leave unrelated files untouched. If a destination filename already exists, compare file contents and use a collision-safe filename to preserve the incoming file. Do not add byte-identical copies as extra gallery images.
3. Add imports and one record to `src/data/products.js`. Store every photo in the product's `images` array in the order they should appear in the gallery. The product gallery already supports selectable thumbnails and image enlargement; use that interface without changing its components when possible.
4. Use the user's product name, price, description, and specifications as the source of truth. Store COP prices as integer pesos. A short card description may summarize only facts the user supplied. Put provided specifications in `details`; never infer origin, materials, sizes, availability, or other product facts.
5. Reuse an existing category when it fits. Add a category only when needed for the supplied product and supported by the current catalog UI.
6. Audit the catalog and filesystem before finishing: every imported product image must exist inside its matching product subfolder, every distinct supplied photo must appear in that product's `images` array, and no product photos may remain loose at the root of `productos/`. Move any identifiable loose product photo into its matching product folder; ask only if its ownership is unclear. Leave non-product metadata files alone. Check that no unrelated product data or assets changed, then run `git diff --check`; do not run application tests unless the user asks.

Follow the repository's scope-isolation skill and existing code conventions. Do not delete existing products, optimize or edit original photos, commit, or push unless the user explicitly asks.
