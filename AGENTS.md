# studio

Etok Studio — 3D business card rendered with Three.js on Zo Space. Pointer-reactive card with bloom, chromatic aberration, and vignette post-processing.

**Live:** https://etok.zo.space/studio

## Routes

- `/studio` — Main page (page route)

## Tech

- Three.js 0.179.1 (ESM via esm.sh)
- Post-processing: UnrealBloomPass, custom chromatic aberration, VignetteShader
- Canvas-drawn card texture with tracked/spaced typography
- Pointer-driven tilt and lift via lerp
