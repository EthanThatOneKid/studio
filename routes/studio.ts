import { useEffect, useRef } from "react";

function drawSpacedText(ctx: CanvasRenderingContext2D, text: string, centerX: number, y: number, tracking: number) {
  const chars = text.split(""); const totalWidth = chars.reduce((sum, char, index) => sum + ctx.measureText(char).width + (index === chars.length - 1 ? 0 : tracking), 0);
  let x = centerX - totalWidth / 2;
  for (let i = 0; i < chars.length; i++) { const char = chars[i]; ctx.fillText(char, x, y); x += ctx.measureText(char).width + tracking; }
}

function createPaperTexture(size = 1200) {
  const canvas = document.createElement("canvas"); canvas.width = size; canvas.height = Math.round(size * 0.62);
  const ctx = canvas.getContext("2d"); if (!ctx) return canvas;
  const width = canvas.width; const height = canvas.height;
  const base = ctx.createLinearGradient(0, 0, width, height);
  base.addColorStop(0, "#f7f1e7"); base.addColorStop(0.55, "#f4edde"); base.addColorStop(1, "#efe4cf");
  ctx.fillStyle = base; ctx.fillRect(0, 0, width, height);
  ctx.globalAlpha = 0.08;
  for (let i = 0; i < 2600; i++) { const x = Math.random() * width; const y = Math.random() * height; const w = Math.random() * 2 + 0.5; const h = Math.random() * 10 + 2; ctx.fillStyle = i % 5 === 0 ? "#cfc2ab" : "#fffaf0"; ctx.fillRect(x, y, w, h); }
  ctx.globalAlpha = 0.035;
  for (let i = 0; i < 18000; i++) { const x = Math.random() * width; const y = Math.random() * height; const tone = 224 + Math.floor(Math.random() * 24); ctx.fillStyle = `rgb(${tone}, ${tone - 4}, ${tone - 10})`; ctx.fillRect(x, y, 1, 1); }
  ctx.globalAlpha = 1; ctx.strokeStyle = "rgba(28,25,23,0.1)"; ctx.lineWidth = 1; ctx.strokeRect(28, 28, width - 56, height - 56);
  const shade = ctx.createRadialGradient(width * 0.52, height * 0.46, width * 0.06, width * 0.52, height * 0.46, width * 0.72);
  shade.addColorStop(0, "rgba(255,255,255,0.2)"); shade.addColorStop(0.45, "rgba(255,255,255,0)"); shade.addColorStop(1, "rgba(80,55,20,0.09)");
  ctx.fillStyle = shade; ctx.fillRect(0, 0, width, height);
  ctx.fillStyle = "#171411"; ctx.font = '500 32px "Helvetica Neue", Helvetica, Arial, sans-serif'; ctx.textAlign = "center";
  drawSpacedText(ctx, "ETHAN DAVIDSON", width / 2, height * 0.29, 11);
  ctx.font = '400 19px "Helvetica Neue", Helvetica, Arial, sans-serif'; drawSpacedText(ctx, "WEB SYSTEMS  AI INTERFACES", width / 2, height * 0.41, 6.5);
  ctx.font = '400 17px "Helvetica Neue", Helvetica, Arial, sans-serif'; drawSpacedText(ctx, "ETOK.ME", width / 2, height * 0.57, 5); drawSpacedText(ctx, "GITHUB.COM/ETHANTHATONEKID", width / 2, height * 0.66, 4.2); drawSpacedText(ctx, "LOS ANGELES, CALIFORNIA", width / 2, height * 0.75, 4.2);
  ctx.save(); ctx.globalAlpha = 0.08; ctx.strokeStyle = "#120f0c"; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(width * 0.23, height * 0.82); ctx.bezierCurveTo(width * 0.38, height * 0.8, width * 0.54, height * 0.86, width * 0.74, height * 0.81); ctx.stroke(); ctx.restore();
  return canvas;
}

export default function StudioPage() {
  const sceneRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    let disposed = false; let cleanup = () => {};
    (async () => {
      const [THREE, { EffectComposer, RenderPass, EffectPass, BloomEffect, ChromaticAberrationEffect, VignetteEffect, BlendFunction }] = await Promise.all([
        import("https://esm.sh/three@0.160.1"),
        import("https://esm.sh/postprocessing@6.35.3"),
      ]);
      if (disposed || !sceneRef.current) return;
      const mount = sceneRef.current;
      const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: "high-performance" });
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2)); renderer.setClearColor(0x000000, 0); mount.appendChild(renderer.domElement);
      const scene = new THREE.Scene(); const camera = new THREE.PerspectiveCamera(28, 1, 0.1, 100); camera.position.set(0, 0, 7.8);
      const composer = new EffectComposer(renderer); composer.addPass(new RenderPass(scene, camera));
      composer.addPass(new EffectPass(camera, new BloomEffect({ intensity: 0.18, luminanceThreshold: 0.72, luminanceSmoothing: 0.2 }), new ChromaticAberrationEffect({ blendFunction: BlendFunction.NORMAL, offset: new THREE.Vector2(0.00035, 0.0006) }), new VignetteEffect({ eskil: false, darkness: 0.3, offset: 0.24 })));
      const textureCanvas = createPaperTexture(); const texture = new THREE.CanvasTexture(textureCanvas); texture.colorSpace = THREE.SRGBColorSpace; texture.anisotropy = renderer.capabilities.getMaxAnisotropy();
      const bumpTexture = new THREE.CanvasTexture(textureCanvas); bumpTexture.wrapS = THREE.ClampToEdgeWrapping; bumpTexture.wrapT = THREE.ClampToEdgeWrapping;
      const cardShape = new THREE.Shape(); const w = 5.4; const h = 3.35; const r = 0.1;
      cardShape.moveTo(-w / 2 + r, -h / 2); cardShape.lineTo(w / 2 - r, -h / 2); cardShape.quadraticCurveTo(w / 2, -h / 2, w / 2, -h / 2 + r); cardShape.lineTo(w / 2, h / 2 - r); cardShape.quadraticCurveTo(w / 2, h / 2, w / 2 - r, h / 2); cardShape.lineTo(-w / 2 + r, h / 2); cardShape.quadraticCurveTo(-w / 2, h / 2, -w / 2, h / 2 - r); cardShape.lineTo(-w / 2, -h / 2 + r); cardShape.quadraticCurveTo(-w / 2, -h / 2, -w / 2 + r, -h / 2);
      const cardGeometry = new THREE.ExtrudeGeometry(cardShape, { depth: 0.028, bevelEnabled: true, bevelSegments: 3, steps: 1, bevelSize: 0.012, bevelThickness: 0.014, curveSegments: 28 }); cardGeometry.center();
      const cardMaterial = new THREE.MeshPhysicalMaterial({ map: texture, bumpMap: bumpTexture, bumpScale: 0.009, color: new THREE.Color("#fafaf8"), roughness: 0.82, metalness: 0, clearcoat: 0.14, clearcoatRoughness: 0.94, sheen: 0.08, sheenRoughness: 0.96, sheenColor: new THREE.Color("#ffffff") });
      const card = new THREE.Mesh(cardGeometry, cardMaterial); card.rotation.x = -0.12; card.rotation.y = 0.18; scene.add(card);
      const shadow = new THREE.Mesh(new THREE.PlaneGeometry(5.3, 3.4), new THREE.MeshBasicMaterial({ color: 0x6c5645, transparent: true, opacity: 0.1 })); shadow.position.set(0.14, -0.32, -0.72); shadow.rotation.z = -0.08; scene.add(shadow);
      const keyLight = new THREE.SpotLight(0xfff3df, 7.5, 30, 0.5, 0.7, 1.2); keyLight.position.set(-3.2, 4.4, 7.5); scene.add(keyLight);
      const fillLight = new THREE.PointLight(0xe7d4bf, 1.5, 18, 2); fillLight.position.set(3.4, -1.2, 6.3); scene.add(fillLight);
      const rimLight = new THREE.PointLight(0xffffff, 1.2, 14, 2); rimLight.position.set(0, 2.5, 4.8); scene.add(rimLight);
      const ambient = new THREE.AmbientLight(0xf3eadc, 0.9); scene.add(ambient);
      const target = { x: -0.12, y: 0.18 }; const current = { x: -0.12, y: 0.18 };
      const resize = () => { if (!mount) return; const { clientWidth, clientHeight } = mount; renderer.setSize(clientWidth, clientHeight); composer.setSize(clientWidth, clientHeight); camera.aspect = clientWidth / clientHeight; camera.updateProjectionMatrix(); };
      const onPointerMove = (event: PointerEvent) => { const rect = mount.getBoundingClientRect(); const nx = (event.clientX - rect.left) / rect.width - 0.5; const ny = (event.clientY - rect.top) / rect.height - 0.5; target.x = -ny * 0.34 - 0.1; target.y = nx * 0.52 + 0.16; shadow.position.x = nx * 0.2 + 0.14; shadow.position.y = ny * 0.12 - 0.32; };
      const onPointerLeave = () => { target.x = -0.12; target.y = 0.18; shadow.position.x = 0.14; shadow.position.y = -0.32; };
      const clock = new THREE.Clock(); let frameId = 0;
      const render = () => { const t = clock.getElapsedTime(); current.x += (target.x - current.x) * 0.07; current.y += (target.y - current.y) * 0.07; card.rotation.x = current.x + Math.sin(t * 0.7) * 0.015; card.rotation.y = current.y + Math.cos(t * 0.6) * 0.018; card.position.y = Math.sin(t * 0.8) * 0.03; keyLight.position.x = -3.2 + Math.cos(t * 0.35) * 0.25; composer.render(); frameId = window.requestAnimationFrame(render); };
      resize(); render(); window.addEventListener("resize", resize); mount.addEventListener("pointermove", onPointerMove); mount.addEventListener("pointerleave", onPointerLeave);
      cleanup = () => { window.cancelAnimationFrame(frameId); window.removeEventListener("resize", resize); mount.removeEventListener("pointermove", onPointerMove); mount.removeEventListener("pointerleave", onPointerLeave); composer.dispose(); cardGeometry.dispose(); cardMaterial.dispose(); texture.dispose(); bumpTexture.dispose(); shadow.geometry.dispose(); (shadow.material as THREE.Material).dispose(); renderer.dispose(); mount.innerHTML = ""; };
    })();
    return () => { disposed = true; cleanup(); };
  }, []);

  return (
    <div className="min-h-screen overflow-hidden bg-[#e8dfd1] text-[#181512]">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.78),_transparent_44%),linear-gradient(135deg,_#efe7da_0%,_#ddd0bf_100%)]" />
      <div className="absolute inset-0 opacity-[0.16] mix-blend-multiply bg-[linear-gradient(0deg,transparent_0%,rgba(130,98,68,0.18)_100%)]" />
      <div className="absolute inset-0 opacity-[0.18] pointer-events-none" style={{ backgroundImage: "radial-gradient(rgba(40,28,18,0.08) 0.7px, transparent 0.7px)", backgroundSize: "10px 10px" }} />
      <main className="relative flex min-h-screen items-center justify-center px-6 py-12">
        <div className="w-full max-w-[920px]">
          <div ref={sceneRef} className="mx-auto aspect-[1.58/1] w-full max-w-[820px] cursor-grab active:cursor-grabbing" />
          <div className="mt-8 text-center text-[11px] uppercase tracking-[0.34em] text-[#4e4338]/70">Ethan Davidson  ·  studio systems  ·  web design that feels lived in</div>
        </div>
      </main>
    </div>
  );
}