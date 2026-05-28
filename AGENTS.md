# business-card

Business Card — 3D business card rendered with Three.js on Zo Space. Pointer-reactive card with bloom, chromatic aberration, and vignette post-processing.

**Live:** https://etok.zo.space/business-card

## Mirror Status

This repo mirrors the live Zo Space Business Card route.
Keep the repo and deployed route synchronized so the repo reflects what users see now.

## Routes

| Path | Type | Description |
|------|------|-------------|
| `/business-card` | page | Interactive 3D business card |

## Tech

- Three.js 0.160.1 (ESM via esm.sh)
- postprocessing 6.35.3: UnrealBloomPass, ChromaticAberrationEffect, VignetteEffect
- Canvas-drawn paper texture with spaced tracking typography
- Extruded card shape with rounded corners + bevel
- Pointer-reactive rotation with spring easing

## Sync

- Routes live at: https://github.com/EthanThatOneKid/business-card
- Export from zo.space → `bun export.ts --name business-card`
- Import to zo.space → `bun import.ts` (from repo root)
