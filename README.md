# studio

Etok Studio — 3D business card rendered with Three.js on Zo Space.

**Live:** https://etok.zo.space/studio

## What it is

A pointer-reactive 3D business card featuring:
- Three.js with PBR card mesh and shadow
- Post-processing: bloom, chromatic aberration, vignette
- Canvas texture with tracked "ETOK STUDIO" and spaced "ETHAN DAVIDSON" lettering
- Lift and tilt driven by pointer position

## Tech

- Three.js 0.179.1 via esm.sh (no npm install needed)
- EffectComposer with three pass stages
- Antialiased WebGL renderer with SRGBColorSpace
