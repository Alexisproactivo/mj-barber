/**
 * MJ BARBER - Hero 3D Scene (Three.js)
 * Procedural classic barbershop scene featuring an authentic rotating Barber Pole
 * and articulated vintage straight razor in polished brass and forged steel.
 *
 * Strict Performance:
 * - 60 FPS requestAnimationFrame loop with delta-time throttling
 * - Device pixel ratio capped to Math.min(window.devicePixelRatio, 2)
 * - Container configured with pointer-events: none to prevent blocking clicks/taps
 * - Automatic animation pause via document.hidden (Page Visibility API)
 * - Fluid cursor tracking with smooth lerp interpolation
 * - Full memory cleanup and asset disposal on unmount
 */

import React, { useEffect, useRef } from "react";
import * as THREE from "three";

export const Hero3DScene: React.FC = () => {
  const mountRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    // --- Procedural Canvas Texture for Barber Pole Stripes ---
    function createBarberPoleTexture(): THREE.CanvasTexture {
      const canvas = document.createElement("canvas");
      canvas.width = 512;
      canvas.height = 512;
      const ctx = canvas.getContext("2d");

      if (ctx) {
        // Deep background
        ctx.fillStyle = "#f4f0e6"; // Bone white
        ctx.fillRect(0, 0, 512, 512);

        // Stripes setup
        const stripeWidth = 64;
        const totalStripes = 16;

        ctx.save();
        ctx.rotate(-Math.PI / 4); // 45-degree barber spiral

        for (let i = -totalStripes; i < totalStripes * 2; i++) {
          const offset = i * stripeWidth * 3;

          // Crimson red stripe
          ctx.fillStyle = "#8f1d1d";
          ctx.fillRect(offset, -1024, stripeWidth, 2048);

          // Warm brass pin-stripe border
          ctx.fillStyle = "#c5a880";
          ctx.fillRect(offset + stripeWidth - 4, -1024, 4, 2048);

          // Deep navy blue stripe
          ctx.fillStyle = "#162842";
          ctx.fillRect(offset + stripeWidth * 1.5, -1024, stripeWidth, 2048);

          // Warm brass pin-stripe border
          ctx.fillStyle = "#d4af37";
          ctx.fillRect(offset + stripeWidth * 2.5 - 4, -1024, 4, 2048);
        }

        ctx.restore();
      }

      const texture = new THREE.CanvasTexture(canvas);
      texture.wrapS = THREE.RepeatWrapping;
      texture.wrapT = THREE.RepeatWrapping;
      texture.repeat.set(2, 2);
      return texture;
    }

    // --- Scene, Camera, Renderer Setup ---
    const width = container.clientWidth || 600;
    const height = container.clientHeight || 600;

    const scene = new THREE.Scene();

    const camera = new THREE.PerspectiveCamera(38, width / height, 0.1, 100);
    camera.position.set(0, 0, 7.5);

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: "high-performance",
    });

    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.15;

    // Append canvas
    const canvasElement = renderer.domElement;
    canvasElement.style.width = "100%";
    canvasElement.style.height = "100%";
    canvasElement.style.display = "block";
    canvasElement.style.pointerEvents = "none"; // Guarantee clicks pass through
    container.appendChild(canvasElement);

    // --- Materials ---
    const poleTexture = createBarberPoleTexture();

    // Polished warm brass / bronze
    const brassMaterial = new THREE.MeshStandardMaterial({
      color: 0xd4af37,
      metalness: 0.88,
      roughness: 0.22,
    });

    // Dark antique bronze for brackets
    const darkBronzeMaterial = new THREE.MeshStandardMaterial({
      color: 0x5a4832,
      metalness: 0.75,
      roughness: 0.35,
    });

    // Striped core cylinder
    const poleStripesMaterial = new THREE.MeshStandardMaterial({
      map: poleTexture,
      roughness: 0.35,
      metalness: 0.1,
    });

    // Outer protective glass sleeve
    const glassMaterial = new THREE.MeshPhysicalMaterial({
      color: 0xffffff,
      metalness: 0.1,
      roughness: 0.1,
      transmission: 0.85,
      transparent: true,
      opacity: 0.45,
      ior: 1.5,
    });

    // Forged steel blade
    const steelBladeMaterial = new THREE.MeshStandardMaterial({
      color: 0xeff2f7,
      metalness: 0.95,
      roughness: 0.12,
    });

    // Razor ebony / horn scales (handle)
    const razorHandleMaterial = new THREE.MeshStandardMaterial({
      color: 0x1b1918,
      metalness: 0.25,
      roughness: 0.4,
    });

    // --- Main Assembly Group ---
    const mainGroup = new THREE.Group();
    scene.add(mainGroup);

    // --- 1. Authentic Barber Pole Group ---
    const poleGroup = new THREE.Group();
    poleGroup.position.set(-0.8, -0.1, 0);
    poleGroup.rotation.z = 0.08; // Subtle artisanal tilt
    mainGroup.add(poleGroup);

    // Inner rotating cylinder
    const poleRadius = 0.42;
    const poleHeight = 2.6;
    const innerPoleGeo = new THREE.CylinderGeometry(poleRadius, poleRadius, poleHeight, 48);
    const innerPoleMesh = new THREE.Mesh(innerPoleGeo, poleStripesMaterial);
    poleGroup.add(innerPoleMesh);

    // Outer glass cylinder
    const glassGeo = new THREE.CylinderGeometry(poleRadius + 0.06, poleRadius + 0.06, poleHeight + 0.1, 48, 1, true);
    const glassMesh = new THREE.Mesh(glassGeo, glassMaterial);
    poleGroup.add(glassMesh);

    // Brass Caps & Acorn Finials
    const capHeight = 0.22;
    const capGeo = new THREE.CylinderGeometry(poleRadius + 0.12, poleRadius + 0.04, capHeight, 36);

    // Top cap
    const topCap = new THREE.Mesh(capGeo, brassMaterial);
    topCap.position.y = poleHeight / 2 + capHeight / 2;
    poleGroup.add(topCap);

    // Top dome
    const domeGeo = new THREE.SphereGeometry(poleRadius + 0.08, 36, 18, 0, Math.PI * 2, 0, Math.PI / 2);
    const topDome = new THREE.Mesh(domeGeo, brassMaterial);
    topDome.position.y = poleHeight / 2 + capHeight;
    poleGroup.add(topDome);

    // Top acorn finial
    const finialGeo = new THREE.SphereGeometry(0.12, 24, 16);
    const topFinial = new THREE.Mesh(finialGeo, brassMaterial);
    topFinial.position.y = poleHeight / 2 + capHeight + poleRadius + 0.08;
    topFinial.scale.set(1, 1.4, 1);
    poleGroup.add(topFinial);

    // Bottom cap
    const bottomCap = new THREE.Mesh(capGeo, brassMaterial);
    bottomCap.position.y = -(poleHeight / 2 + capHeight / 2);
    bottomCap.rotation.x = Math.PI;
    poleGroup.add(bottomCap);

    // Bottom dome
    const bottomDome = new THREE.Mesh(domeGeo, brassMaterial);
    bottomDome.position.y = -(poleHeight / 2 + capHeight);
    bottomDome.rotation.x = Math.PI;
    poleGroup.add(bottomDome);

    // Bottom finial drop
    const bottomFinial = new THREE.Mesh(finialGeo, brassMaterial);
    bottomFinial.position.y = -(poleHeight / 2 + capHeight + poleRadius + 0.08);
    bottomFinial.scale.set(1, 1.4, 1);
    poleGroup.add(bottomFinial);

    // Wall mounting bracket arm
    const bracketArmGeo = new THREE.TorusGeometry(0.8, 0.06, 16, 32, Math.PI * 0.7);
    const bracketArm = new THREE.Mesh(bracketArmGeo, darkBronzeMaterial);
    bracketArm.position.set(-0.6, 0, -0.4);
    bracketArm.rotation.y = Math.PI / 2;
    bracketArm.rotation.z = Math.PI / 6;
    poleGroup.add(bracketArm);

    // --- 2. Articulated Vintage Straight Razor ---
    const razorGroup = new THREE.Group();
    razorGroup.position.set(1.4, 0.2, 0.3);
    razorGroup.rotation.set(0.15, -0.3, -0.35); // Dynamic heroic angle
    mainGroup.add(razorGroup);

    // Blade
    const bladeShape = new THREE.Shape();
    bladeShape.moveTo(0, -0.15);
    bladeShape.lineTo(2.2, -0.12);
    bladeShape.lineTo(2.3, 0.28);
    bladeShape.lineTo(0.1, 0.35);
    bladeShape.lineTo(-0.4, 0.15); // Tang
    bladeShape.lineTo(-0.6, -0.05); // Tail
    bladeShape.lineTo(-0.3, -0.15);
    bladeShape.closePath();

    const extrudeSettings: THREE.ExtrudeGeometryOptions = {
      depth: 0.04,
      bevelEnabled: true,
      bevelSegments: 4,
      steps: 1,
      bevelSize: 0.015,
      bevelThickness: 0.015,
    };

    const bladeGeo = new THREE.ExtrudeGeometry(bladeShape, extrudeSettings);
    bladeGeo.center();
    const bladeMesh = new THREE.Mesh(bladeGeo, steelBladeMaterial);
    bladeMesh.position.set(0.7, 0, 0);
    razorGroup.add(bladeMesh);

    // Brass Pivot Pin
    const pivotPinGeo = new THREE.CylinderGeometry(0.06, 0.06, 0.12, 24);
    const pivotPin = new THREE.Mesh(pivotPinGeo, brassMaterial);
    pivotPin.rotation.x = Math.PI / 2;
    pivotPin.position.set(-0.2, -0.1, 0);
    razorGroup.add(pivotPin);

    // Razor Handle (Scales) - angled naturally at pivot
    const handleShape = new THREE.Shape();
    handleShape.moveTo(-0.2, -0.18);
    handleShape.lineTo(-2.2, -0.22);
    handleShape.quadraticCurveTo(-2.4, 0.0, -2.2, 0.22);
    handleShape.lineTo(-0.2, 0.18);
    handleShape.closePath();

    const handleGeo = new THREE.ExtrudeGeometry(handleShape, {
      depth: 0.035,
      bevelEnabled: true,
      bevelSegments: 3,
      steps: 1,
      bevelSize: 0.01,
      bevelThickness: 0.01,
    });
    handleGeo.center();

    // Scale 1 (front)
    const scaleFront = new THREE.Mesh(handleGeo, razorHandleMaterial);
    scaleFront.position.set(-1.1, -0.3, 0.04);
    scaleFront.rotation.z = 0.25;
    razorGroup.add(scaleFront);

    // Scale 2 (back)
    const scaleBack = new THREE.Mesh(handleGeo, razorHandleMaterial);
    scaleBack.position.set(-1.1, -0.3, -0.04);
    scaleBack.rotation.z = 0.25;
    razorGroup.add(scaleBack);

    // Brass rivets on handle
    const rivetGeo = new THREE.SphereGeometry(0.03, 16, 16);
    const rivet1 = new THREE.Mesh(rivetGeo, brassMaterial);
    rivet1.position.set(-1.8, -0.45, 0.05);
    razorGroup.add(rivet1);

    const rivet2 = new THREE.Mesh(rivetGeo, brassMaterial);
    rivet2.position.set(-0.5, -0.15, 0.05);
    razorGroup.add(rivet2);

    // --- 3. Floating Artisanal Brass Dust Particles ---
    const particleCount = 45;
    const particleGeo = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount * 3; i += 3) {
      positions[i] = (Math.random() - 0.5) * 8;
      positions[i + 1] = (Math.random() - 0.5) * 6;
      positions[i + 2] = (Math.random() - 0.5) * 4;
    }

    particleGeo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    const particleMat = new THREE.PointsMaterial({
      color: 0xd4af37,
      size: 0.035,
      transparent: true,
      opacity: 0.6,
      blending: THREE.AdditiveBlending,
    });
    const particles = new THREE.Points(particleGeo, particleMat);
    mainGroup.add(particles);

    // --- Lighting ---
    // Warm key light
    const keyLight = new THREE.DirectionalLight(0xfff5e4, 2.6);
    keyLight.position.set(4, 5, 5);
    scene.add(keyLight);

    // Warm metallic rim light
    const rimLight = new THREE.PointLight(0xd4af37, 2.8, 12);
    rimLight.position.set(-4, -2, -3);
    scene.add(rimLight);

    // Soft slate ambient fill
    const ambientLight = new THREE.AmbientLight(0x242832, 1.4);
    scene.add(ambientLight);

    // Subtle golden fill light for bottom reflections
    const groundBounceLight = new THREE.PointLight(0xc5a880, 1.2, 10);
    groundBounceLight.position.set(2, -3, 2);
    scene.add(groundBounceLight);

    // --- Interactive Mouse Tracking with Smooth Lerp ---
    const mouse = { x: 0, y: 0, targetX: 0, targetY: 0 };

    const handleMouseMove = (event: MouseEvent) => {
      const { innerWidth, innerHeight } = window;
      mouse.targetX = (event.clientX / innerWidth - 0.5) * 0.45;
      mouse.targetY = (event.clientY / innerHeight - 0.5) * 0.35;
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });

    // --- Page Visibility API & Render Loop ---
    let animationFrameId: number;
    let isVisible = !document.hidden;

    const handleVisibilityChange = () => {
      isVisible = !document.hidden;
      if (isVisible) {
        lastTime = performance.now();
        animationFrameId = requestAnimationFrame(animate);
      } else {
        cancelAnimationFrame(animationFrameId);
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);

    // Resize handling
    const handleResize = () => {
      if (!container) return;
      const newWidth = container.clientWidth;
      const newHeight = container.clientHeight;
      camera.aspect = newWidth / newHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(newWidth, newHeight);
    };

    window.addEventListener("resize", handleResize);

    // --- Animation Loop ---
    let lastTime = performance.now();

    const animate = (currentTime: number) => {
      if (!isVisible) return;

      animationFrameId = requestAnimationFrame(animate);

      const delta = Math.min((currentTime - lastTime) / 1000, 0.1);
      lastTime = currentTime;

      // 1. Rotate the inner Barber Pole cylinder continuously (classic optical illusion)
      innerPoleMesh.rotation.y += delta * 1.8;

      // 2. Subtle gentle breathing bob for razor
      razorGroup.position.y = 0.2 + Math.sin(currentTime * 0.0015) * 0.08;
      razorGroup.rotation.y = -0.3 + Math.sin(currentTime * 0.001) * 0.06;

      // 3. Slow drift of particles
      particles.rotation.y += delta * 0.05;

      // 4. Smooth Lerp interpolation towards cursor position
      mouse.x += (mouse.targetX - mouse.x) * 0.06;
      mouse.y += (mouse.targetY - mouse.y) * 0.06;

      mainGroup.rotation.y = mouse.x;
      mainGroup.rotation.x = -mouse.y * 0.7;

      renderer.render(scene, camera);
    };

    // Start loop
    animationFrameId = requestAnimationFrame(animate);

    // --- Cleanup on unmount ---
    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", handleResize);
      document.removeEventListener("visibilitychange", handleVisibilityChange);

      if (container.contains(canvasElement)) {
        container.removeChild(canvasElement);
      }

      // Memory disposal
      innerPoleGeo.dispose();
      glassGeo.dispose();
      capGeo.dispose();
      domeGeo.dispose();
      finialGeo.dispose();
      bracketArmGeo.dispose();
      bladeGeo.dispose();
      handleGeo.dispose();
      pivotPinGeo.dispose();
      rivetGeo.dispose();
      particleGeo.dispose();

      poleTexture.dispose();
      brassMaterial.dispose();
      darkBronzeMaterial.dispose();
      poleStripesMaterial.dispose();
      glassMaterial.dispose();
      steelBladeMaterial.dispose();
      razorHandleMaterial.dispose();
      particleMat.dispose();

      renderer.dispose();
    };
  }, []);

  return (
    <div
      ref={mountRef}
      className="hero-3d-container"
      aria-hidden="true"
      style={{
        width: "100%",
        height: "100%",
        pointerEvents: "none", // Strict requirement: never blocks clicks or buttons
        position: "relative",
      }}
    />
  );
};
