# studio

A 3D business card rendered with Three.js on Zo Space — a textured paper card that tilts and bobs in response to mouse movement, with bloom, chromatic aberration, and vignette post-processing.

**Live:** [https://etok.zo.space/studio](https://etok.zo.space/studio)

## Route

| Path | Type | Description |
|------|------|-------------|
| `/studio` | page | Interactive 3D business card |

## References

- [American Psycho Titles & Business Cards — Fonts In Use](https://fontsinuse.com/uses/49529/american-psycho-titles-and-business-cards)
- [Building an Interactive 3D Event Badge with React Three Fiber — Vercel Blog](https://vercel.com/blog/building-an-interactive-3d-event-badge-with-react-three-fiber)

## How It Works

- **Paper texture:** Generated entirely on a `<canvas>` — linen gradient, micro-fiber noise, copperplate lettering ("ETHAN DAVIDSON", "WEB SYSTEMS · AI INTERFACES", links)
- **3D card:** Three.js `ExtrudeGeometry` with a rounded-rectangle `Shape`, physical material with the canvas as `map` and `bumpMap`
- **Lighting:** Key spotlight (warm), fill point light (cool), rim light, ambient
- **Post-processing:** `EffectComposer` with `BloomEffect`, `ChromaticAberrationEffect`, and `VignetteEffect`
- **Mouse parallax:** Card rotation/position driven by normalized pointer position with spring easing
- **Idle animation:** Sinusoidal bob and light oscillation when pointer is idle

## Tech

- **Three.js:** Loaded via `esm.sh` CDN (v0.160.1) — no local install needed
- **Post-processing:** `postprocessing@6.35.3` via esm.sh
- **Styling:** Background is layered CSS gradients simulating paper-in-light environment
- **No build step:** All imports are CDN dynamic imports inside `useEffect`

## Dependencies

Both loaded from CDN — no npm packages needed:
- `three@0.160.1`
- `postprocessing@6.35.3`

## Development

Sync with the `zopack` skill in `code/workspace-root/Skills/zopack/`.