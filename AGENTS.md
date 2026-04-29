# studio

Etok Studio — 3D business card rendered with Three.js on Zo Space. Pointer-reactive card with bloom, chromatic aberration, and vignette post-processing.

**Live:** https://etok.zo.space/studio

## Mirror Status

This repo mirrors the live Zo Space Studio route.
Keep the repo and deployed route synchronized so the repo reflects what users see now.

## Routes

| Path | Type | Description |
|------|------|-------------|
| `/studio` | page | Interactive 3D business card |

## Tech

- Three.js 0.160.1 (ESM via esm.sh)
- postprocessing 6.35.3: UnrealBloomPass, ChromaticAberrationEffect, VignetteEffect
- Canvas-drawn paper texture with spaced tracking typography
- Extruded card shape with rounded corners + bevel
- Pointer-reactive rotation with spring easing

## Sync

- Routes live at: https://github.com/EthanThatOneKid/studio
- Export from zo.space → `bun export.ts --name studio`
- Import to zo.space → `bun import.ts` (from repo root)
