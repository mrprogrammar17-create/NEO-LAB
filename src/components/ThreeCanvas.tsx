import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";

interface ThreeCanvasProps {
  bodyColor: string;          // hex string e.g., '#ef4444'
  wireframeMode: boolean;     // toggles wireframe on models
  engineActive: boolean;      // speeds up core spin & lighting intensity
  glowColor: string;          // hex string for core glow
  selectedPreset: string;     // concept styling preset
  explodedView: boolean;      // moves parts outward for structural show
  cameraAngle: "front" | "side" | "top" | "back"; // viewport target preset
}

export default function ThreeCanvas({
  bodyColor,
  wireframeMode,
  engineActive,
  glowColor,
  selectedPreset,
  explodedView,
  cameraAngle,
}: ThreeCanvasProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Keep state for mouse interaction
  const mouseRef = useRef({ x: 0, y: 0, isDown: false, prevX: 0, prevY: 0 });
  const hoverPosRef = useRef({ x: 0, y: 0 });
  const [isRotating, setIsRotating] = useState(true);

  // References to animateable 3D parts
  const bodyMeshGroupRef = useRef<THREE.Group | null>(null);
  const engineCoreRef = useRef<THREE.Group | null>(null);
  const thrustersRef = useRef<THREE.Group[]>([]);
  const particlesRef = useRef<THREE.Points | null>(null);
  const ambientGridRef = useRef<THREE.GridHelper | null>(null);

  // Keep references to materials for real-time adjustments
  const bodyMaterialRef = useRef<THREE.MeshStandardMaterial | null>(null);
  const glassMaterialRef = useRef<THREE.MeshStandardMaterial | null>(null);
  const engineMaterialRef = useRef<THREE.MeshPhysicalMaterial | null>(null);
  const lineSegmentGroupRef = useRef<THREE.Group | null>(null);

  // Handlers for Camera presets
  const targetCamPosition = useRef(new THREE.Vector3(0, 2, 6));
  const currentCamPosition = useRef(new THREE.Vector3(0, 10, 15));

  useEffect(() => {
    if (!containerRef.current || !canvasRef.current) return;

    const width = containerRef.current.clientWidth;
    const height = containerRef.current.clientHeight || 400;

    // 1. Scene setup with dark aesthetic
    const scene = new THREE.Scene();
    scene.background = new THREE.Color("#09090b"); // Tailwind zinc-950
    scene.fog = new THREE.FogExp2("#09090b", 0.08);

    // 2. Camera setup
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.copy(currentCamPosition.current);

    // 3. Renderer setup
    const renderer = new THREE.WebGLRenderer({
      canvas: canvasRef.current,
      antialias: true,
      alpha: false,
      powerPreference: "high-performance",
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;

    // 4. Lights
    const ambientLight = new THREE.AmbientLight("#18181b", 1.5);
    scene.add(ambientLight);

    // Main Studio Light
    const mainLight = new THREE.DirectionalLight("#ffffff", 4.0);
    mainLight.position.set(5, 10, 5);
    mainLight.castShadow = true;
    mainLight.shadow.mapSize.width = 2048;
    mainLight.shadow.mapSize.height = 2048;
    mainLight.shadow.bias = -0.0001;
    scene.add(mainLight);

    // Dynamic Colored Rim/Glow lights
    const rimLightLeft = new THREE.PointLight(glowColor, 8.0, 12);
    rimLightLeft.position.set(-6, 2, -2);
    scene.add(rimLightLeft);

    const rimLightRight = new THREE.PointLight(bodyColor, 6.0, 12);
    rimLightRight.position.set(6, 2, 2);
    scene.add(rimLightRight);

    const coreLight = new THREE.PointLight(glowColor, 12.0, 6);
    coreLight.position.set(0, 0, -0.5);
    scene.add(coreLight);

    // Under-glow neon strip
    const underGlow = new THREE.PointLight(glowColor, 5.0, 4);
    underGlow.position.set(0, -1, 0);
    scene.add(underGlow);

    // 5. Build procedural Futuristic Concept Model
    const modelGroup = new THREE.Group();
    scene.add(modelGroup);

    // Materials definition
    const carColor = new THREE.Color(bodyColor);
    
    // Sleek metallic body material
    const bodyMat = new THREE.MeshStandardMaterial({
      color: carColor,
      metalness: 0.95,
      roughness: 0.18,
      envMapIntensity: 1.5,
    });
    bodyMaterialRef.current = bodyMat;

    // Futuristic composite windshield/cabins glass
    const glassMat = new THREE.MeshStandardMaterial({
      color: "#18181b",
      metalness: 0.9,
      roughness: 0.05,
      transparent: true,
      opacity: 0.65,
    });
    glassMaterialRef.current = glassMat;

    // Core generator material (emissive energy crystal)
    const carbonMat = new THREE.MeshStandardMaterial({
      color: "#1e1b4b",
      metalness: 0.8,
      roughness: 0.4,
    });

    const coreMat = new THREE.MeshPhysicalMaterial({
      color: new THREE.Color(glowColor),
      emissive: new THREE.Color(glowColor),
      emissiveIntensity: 1.5,
      roughness: 0.1,
      metalness: 0.1,
      transparent: true,
      opacity: 0.9,
    });
    engineMaterialRef.current = coreMat;

    const chromeMat = new THREE.MeshStandardMaterial({
      color: "#f4f4f5",
      metalness: 0.98,
      roughness: 0.1,
    });

    // 5.1 Sub-groups for Exploded View translation
    const fuselageGroup = new THREE.Group();
    const turbineGroup = new THREE.Group();
    const engineBayGroup = new THREE.Group();
    const wingGroup = new THREE.Group();

    modelGroup.add(fuselageGroup);
    modelGroup.add(turbineGroup);
    modelGroup.add(engineBayGroup);
    modelGroup.add(wingGroup);

    bodyMeshGroupRef.current = fuselageGroup;

    // FUSELAGE: Main aerodynamic chassis
    const bodyGeom = new THREE.BoxGeometry(1.6, 0.6, 4.4, 16, 8, 32);
    // Standardizing vertices to form a beautiful streamlined wedge
    const pos = bodyGeom.attributes.position;
    for (let i = 0; i < pos.count; i++) {
      let x = pos.getX(i);
      let y = pos.getY(i);
      let z = pos.getZ(i);

      // Streamline front: wedge narrowing
      if (z > 0) {
        x *= (1.0 - z * 0.12);
        y *= (1.0 - z * 0.16);
      }
      // Streamline back: diffuser taper
      if (z < 0) {
        x *= (1.0 + z * 0.08);
        y *= (1.0 + z * 0.05);
      }
      
      // Aerodynamic curve contour
      y -= (z * z * 0.015);

      pos.setXYZ(i, x, y, z);
    }
    bodyGeom.computeVertexNormals();
    const bodyMesh = new THREE.Mesh(bodyGeom, bodyMat);
    bodyMesh.castShadow = true;
    bodyMesh.receiveShadow = true;
    fuselageGroup.add(bodyMesh);

    // Windshield/Cabin (Glass canopy capsule)
    const glassGeom = new THREE.SphereGeometry(0.68, 32, 16);
    glassGeom.scale(1.0, 0.48, 2.0);
    const glassMesh = new THREE.Mesh(glassGeom, glassMat);
    glassMesh.position.set(0, 0.38, 0.4);
    glassMesh.castShadow = true;
    fuselageGroup.add(glassMesh);

    // Glowing front neon strip (headlight bar)
    const lightBarGeom = new THREE.BoxGeometry(1.3, 0.04, 0.1);
    const lightBarMat = new THREE.MeshBasicMaterial({ color: glowColor });
    const lightBar = new THREE.Mesh(lightBarGeom, lightBarMat);
    lightBar.position.set(0, -0.05, 2.15);
    fuselageGroup.add(lightBar);

    // Side Aero Fins (Wings)
    const leftWingGeom = new THREE.ConeGeometry(0.5, 2.0, 4);
    leftWingGeom.rotateZ(Math.PI / 2.3);
    leftWingGeom.scale(0.3, 1.8, 1.0);
    const leftWing = new THREE.Mesh(leftWingGeom, bodyMat);
    leftWing.position.set(-1.1, 0, -0.4);
    leftWing.castShadow = true;
    wingGroup.add(leftWing);

    const rightWingGeom = leftWingGeom.clone();
    rightWingGeom.rotateY(Math.PI);
    const rightWing = new THREE.Mesh(rightWingGeom, bodyMat);
    rightWing.position.set(1.1, 0, -0.4);
    rightWing.castShadow = true;
    wingGroup.add(rightWing);

    // Endplates for aesthetic wings (glowing vertical stabilizers)
    const endplateGeom = new THREE.BoxGeometry(0.1, 0.8, 1.2);
    const leftEndplate = new THREE.Mesh(endplateGeom, carbonMat);
    leftEndplate.position.set(-2.0, 0.1, -0.6);
    leftEndplate.castShadow = true;
    wingGroup.add(leftEndplate);

    const rightEndplate = leftEndplate.clone();
    rightEndplate.position.set(2.0, 0.1, -0.6);
    wingGroup.add(rightEndplate);

    // Tail Spoiler
    const spoilerBarGeom = new THREE.BoxGeometry(1.9, 0.05, 0.4);
    const spoilerBar = new THREE.Mesh(spoilerBarGeom, bodyMat);
    spoilerBar.position.set(0, 0.58, -1.9);
    spoilerBar.castShadow = true;
    wingGroup.add(spoilerBar);

    const spoilerStandL = new THREE.Mesh(new THREE.BoxGeometry(0.04, 0.5, 0.1), carbonMat);
    spoilerStandL.position.set(-0.7, 0.3, -1.85);
    spoilerStandL.rotation.x = -0.2;
    wingGroup.add(spoilerStandL);

    const spoilerStandR = spoilerStandL.clone();
    spoilerStandR.position.set(0.7, 0.3, -1.85);
    wingGroup.add(spoilerStandR);

    // ENGINE BAY: Quantum Reactor Drive (rear center)
    const reactorHousingGeom = new THREE.CylinderGeometry(0.48, 0.48, 1.0, 16);
    reactorHousingGeom.rotateX(Math.PI / 2);
    const reactorHousing = new THREE.Mesh(reactorHousingGeom, carbonMat);
    reactorHousing.position.set(0, 0, -1.4);
    engineBayGroup.add(reactorHousing);

    // Glowing Power Ring (Nuclear engine core)
    const engineCore = new THREE.Group();
    engineCore.position.set(0, 0, -1.4);
    engineBayGroup.add(engineCore);
    engineCoreRef.current = engineCore;

    const coreTorusGeom = new THREE.TorusGeometry(0.3, 0.08, 12, 48);
    const coreTorus = new THREE.Mesh(coreTorusGeom, coreMat);
    engineCore.add(coreTorus);

    const coreSpinnerGeom = new THREE.CylinderGeometry(0.15, 0.15, 0.4, 8);
    coreSpinnerGeom.rotateX(Math.PI / 2);
    const coreSpinner = new THREE.Mesh(coreSpinnerGeom, chromeMat);
    engineCore.add(coreSpinner);

    // THRUSTERS: Procedural Wheels/Thrusters (Aerodynamic floating propulsion pods)
    const thrusterPositions = [
      { x: -0.95, y: -0.25, z: 1.4, isLeft: true },
      { x: 0.95, y: -0.25, z: 1.4, isLeft: false },
      { x: -1.0, y: -0.25, z: -1.2, isLeft: true },
      { x: 1.0, y: -0.25, z: -1.2, isLeft: false },
    ];

    const tempThrustersList: THREE.Group[] = [];
    thrusterPositions.forEach((posInfo) => {
      const pod = new THREE.Group();
      pod.position.set(posInfo.x, posInfo.y, posInfo.z);

      // Inner Rotating Rim Ring
      const wheelRingGeom = new THREE.TorusGeometry(0.45, 0.08, 16, 32);
      wheelRingGeom.rotateY(Math.PI / 2);
      const rim = new THREE.Mesh(wheelRingGeom, chromeMat);
      rim.name = "rotator";
      rim.castShadow = true;
      pod.add(rim);

      // Jet outer shield/fairing
      const shieldGeom = new THREE.CylinderGeometry(0.55, 0.55, 0.28, 16);
      shieldGeom.rotateZ(Math.PI / 2);
      const shield = new THREE.Mesh(shieldGeom, carbonMat);
      pod.add(shield);

      // Internal glowing turbine core
      const fanGeom = new THREE.CylinderGeometry(0.38, 0.38, 0.05, 8);
      fanGeom.rotateZ(Math.PI / 2);
      const fanMesh = new THREE.Mesh(fanGeom, coreMat);
      fanMesh.name = "fan";
      pod.add(fanMesh);

      turbineGroup.add(pod);
      tempThrustersList.push(pod);
    });
    thrustersRef.current = tempThrustersList;

    // 5.2 Create structural outline lines group for explodable view
    const outlineGroup = new THREE.Group();
    scene.add(outlineGroup);
    lineSegmentGroupRef.current = outlineGroup;

    // Create wireframe outlines of key shapes
    const makeOutline = (geometry: THREE.BufferGeometry, parentMesh: THREE.Object3D) => {
      const edges = new THREE.EdgesGeometry(geometry);
      const lineMat = new THREE.LineBasicMaterial({
        color: glowColor,
        transparent: true,
        opacity: 0.0, // Driven by wireframeMode & explodedView states
      });
      const lines = new THREE.LineSegments(edges, lineMat);
      outlineGroup.add(lines);

      // Keep scale & offset in matching animate hook
      return lines;
    };

    const mainBodyOutline = makeOutline(bodyGeom, bodyMesh);
    const leftWingOutline = makeOutline(leftWingGeom, leftWing);
    const rightWingOutline = makeOutline(rightWingGeom, rightWing);

    // 6. Floor & environment grids
    const gridColor = new THREE.Color("#1e1b4b");
    const grid = new THREE.GridHelper(30, 30, gridColor, "#27272a");
    grid.position.y = -0.7;
    scene.add(grid);
    ambientGridRef.current = grid;

    // Glowing project reference circle on floor
    const circGeom = new THREE.RingGeometry(2.3, 2.4, 64);
    circGeom.rotateX(-Math.PI / 2);
    const circMat = new THREE.MeshBasicMaterial({
      color: glowColor,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.25,
    });
    const circFloor = new THREE.Mesh(circGeom, circMat);
    circFloor.position.y = -0.69;
    scene.add(circFloor);

    // Shadow receiver plane on floor
    const shadowGeo = new THREE.PlaneGeometry(10, 10);
    shadowGeo.rotateX(-Math.PI / 2);
    const shadowMat = new THREE.ShadowMaterial({ opacity: 0.6 });
    const shadowMesh = new THREE.Mesh(shadowGeo, shadowMat);
    shadowMesh.position.y = -0.69;
    shadowMesh.receiveShadow = true;
    scene.add(shadowMesh);

    // 7. Dynamic backgrounds: Flying core dust particle clouds
    const particleCount = 180;
    const particleGeo = new THREE.BufferGeometry();
    const particlePositions = new Float32Array(particleCount * 3);
    const particleSpeeds: number[] = [];

    for (let i = 0; i < particleCount * 3; i += 3) {
      // Cylindrical distribution around centerline
      const radius = 2.0 + Math.random() * 8;
      const angle = Math.random() * Math.PI * 2;
      const x = Math.cos(angle) * radius;
      const y = -0.5 + Math.random() * 5.0;
      const z = (Math.random() - 0.5) * 20;

      particlePositions[i] = x;
      particlePositions[i + 1] = y;
      particlePositions[i + 2] = z;

      particleSpeeds.push(0.01 + Math.random() * 0.03);
    }

    particleGeo.setAttribute("position", new THREE.BufferAttribute(particlePositions, 3));
    const pMaterial = new THREE.PointsMaterial({
      color: glowColor,
      size: 0.08,
      transparent: true,
      opacity: 0.5,
      blending: THREE.AdditiveBlending,
    });
    const particles = new THREE.Points(particleGeo, pMaterial);
    scene.add(particles);
    particlesRef.current = particles;

    // 8. Animation & Render loop
    let clock = new THREE.Clock();
    let reqId: number;

    const animate = () => {
      reqId = requestAnimationFrame(animate);

      const delta = clock.getDelta();
      const time = clock.getElapsedTime();

      // Calculate hover offsets (scale ranges for high-fidelity physical float)
      const targetHoverX = hoverPosRef.current.x * 1.5;
      const targetHoverY = hoverPosRef.current.y * 0.8;

      // Smoothly slide model group positions following mouse coordinates
      modelGroup.position.x = THREE.MathUtils.lerp(modelGroup.position.x, targetHoverX, 0.08);
      
      const hoverYBase = Math.sin(time * 1.5) * 0.08;
      modelGroup.position.y = THREE.MathUtils.lerp(modelGroup.position.y, hoverYBase + targetHoverY, 0.08);

      // Dynamic tilt (roll & pitch) based on hover position offset
      const targetTiltZ = -hoverPosRef.current.x * 0.25;
      const targetTiltX = hoverPosRef.current.y * 0.15;

      modelGroup.rotation.z = THREE.MathUtils.lerp(modelGroup.rotation.z, targetTiltZ, 0.08);

      // Slow Orbit Rotate if user is idle
      if (isRotating && !mouseRef.current.isDown) {
        // Base orbit angle over time
        const targetAngle = time * 0.15;
        // Base model slow oscillation tilt
        modelGroup.rotation.y = targetAngle;
        modelGroup.rotation.x = THREE.MathUtils.lerp(modelGroup.rotation.x, targetTiltX + Math.sin(time * 0.8) * 0.04, 0.08);
      } else {
        modelGroup.rotation.x = THREE.MathUtils.lerp(modelGroup.rotation.x, targetTiltX, 0.08);
      }

      // Physics/Speed parameters based on Core state
      const speedMultiplier = engineActive ? 5.0 : 1.2;

      // Rotate Engine Reactor Core
      if (engineCoreRef.current) {
        engineCoreRef.current.rotation.z += delta * 4 * speedMultiplier;
        engineCoreRef.current.rotation.x += delta * 1.5;
        // Back-and-forth wiggle
        engineCoreRef.current.scale.setScalar(1 + Math.sin(time * 8) * 0.02 * speedMultiplier);
      }

      // Rotate Turbine interior blades
      thrustersRef.current.forEach((thruster, idx) => {
        const rotator = thruster.getObjectByName("rotator");
        const fan = thruster.getObjectByName("fan");
        if (rotator) {
          // Thruster pitch oscillation to simulate hover balance
          thruster.rotation.x = Math.sin(time * 2 + idx) * 0.06;
          thruster.rotation.z = Math.cos(time * 1.5 + idx) * 0.05;
        }
        if (fan) {
          fan.rotation.x += delta * 14 * speedMultiplier;
        }
      });

      // Handle custom camera interpolation and angle targeting
      camera.position.lerp(targetCamPosition.current, 0.05);
      camera.lookAt(0, 0, 0);

      // Move particle clouds (simulation of speed airflow)
      if (particlesRef.current) {
        const positions = particlesRef.current.geometry.attributes.position.array as Float32Array;
        for (let i = 0; i < particleCount; i++) {
          const zIndex = i * 3 + 2;
          // Drive along Z axis
          positions[zIndex] -= particleSpeeds[i] * speedMultiplier * 1.5;
          // Loop particle back once it flies past screen
          if (positions[zIndex] < -10) {
            positions[zIndex] = 10;
          }
        }
        particlesRef.current.geometry.attributes.position.needsUpdate = true;
      }

      // Live update point light intensities based on reactor pulsation
      coreLight.intensity = (15 + Math.sin(time * 12) * 6) * speedMultiplier;
      underGlow.intensity = (4 + Math.cos(time * 8) * 2) * speedMultiplier;

      // Exploded View components movement interpolation (pushes subparts outward)
      const explodeFactor = explodedView ? 1.0 : 0.0;
      // Interpolated actual movement offsets
      const tY = THREE.MathUtils.lerp(0, 0.8, explodeFactor); // Canopy goes UP
      const tW = THREE.MathUtils.lerp(0, 0.7, explodeFactor); // Wings go OUTER
      const tE = THREE.MathUtils.lerp(0, -0.9, explodeFactor); // Reactor goes BACK
      const tP = THREE.MathUtils.lerp(0, 0.6, explodeFactor); // Propulsion pods go OUT-LATERAL

      if (fuselageGroup) {
        // Raise canopy glass
        glassMesh.position.y = 0.38 + tY;
      }
      if (wingGroup) {
        // Expand wings and endplates
        leftWing.position.x = -1.1 - tW;
        leftEndplate.position.x = -2.0 - tW * 1.3;
        
        rightWing.position.x = 1.1 + tW;
        rightEndplate.position.x = 2.0 + tW * 1.3;
      }
      if (engineBayGroup) {
        // Pull back power core
        engineBayGroup.position.z = tE;
      }
      if (turbineGroup) {
        // Translate four hover engines out
        tempThrustersList[0].position.set(-0.95 - tP, -0.25, 1.4 + tP * 0.4);
        tempThrustersList[1].position.set(0.95 + tP, -0.25, 1.4 + tP * 0.4);
        tempThrustersList[2].position.set(-1.0 - tP, -0.25, -1.2 - tP * 0.4);
        tempThrustersList[3].position.set(1.0 + tP, -0.25, -1.2 - tP * 0.4);
      }

      // Synchronize outline segments positions / opacities
      if (lineSegmentGroupRef.current) {
        lineSegmentGroupRef.current.position.copy(modelGroup.position);
        lineSegmentGroupRef.current.rotation.copy(modelGroup.rotation);

        lineSegmentGroupRef.current.children.forEach((outline, idx) => {
          const mat = (outline as THREE.LineSegments).material as THREE.LineBasicMaterial;
          
          // Wireframes match the transparency of current modes
          if (wireframeMode) {
            mat.opacity = THREE.MathUtils.lerp(mat.opacity, 0.85, 0.08);
          } else if (explodedView) {
            mat.opacity = THREE.MathUtils.lerp(mat.opacity, 0.35, 0.08);
          } else {
            mat.opacity = THREE.MathUtils.lerp(mat.opacity, 0.0, 0.08);
          }

          // Match geometry displacements for corresponding outline objects locally
          if (idx === 0) {
            // Main fuselage
            outline.position.set(0, 0, 0);
            outline.rotation.set(0, 0, 0);
          } else if (idx === 1) {
            // Left wing
            outline.position.set(-1.1 - tW, 0, -0.4);
            outline.rotation.set(0, 0, 0);
          } else if (idx === 2) {
            // Right wing
            outline.position.set(1.1 + tW, 0, -0.4);
            outline.rotation.set(0, 0, 0);
          }
        });
      }

      renderer.render(scene, camera);
    };

    animate();

    // 9. ResizeObserver to handle element scaling perfectly and robustly
    const resizeObserver = new ResizeObserver((entries) => {
      for (let entry of entries) {
        const w = Math.floor(entry.contentRect.width);
        const h = Math.floor(entry.contentRect.height) || 400;

        camera.aspect = w / h;
        camera.updateProjectionMatrix();

        renderer.setSize(w, h);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      }
    });

    if (containerRef.current) {
      resizeObserver.observe(containerRef.current);
    }

    // Capture initial cleanup
    return () => {
      cancelAnimationFrame(reqId);
      resizeObserver.disconnect();
      renderer.dispose();
      scene.clear();
    };
  }, [bodyColor, glowColor, wireframeMode, engineActive, explodedView, isRotating]);

  // Update light/body colors instantly on change in standard uniforms
  useEffect(() => {
    if (bodyMaterialRef.current) {
      bodyMaterialRef.current.color.set(bodyColor);
    }
    if (engineMaterialRef.current) {
      engineMaterialRef.current.color.set(glowColor);
      engineMaterialRef.current.emissive.set(glowColor);
    }
  }, [bodyColor, glowColor]);

  // Update target coordinates depending on choice of viewport
  useEffect(() => {
    switch (cameraAngle) {
      case "front":
        targetCamPosition.current.set(0, 0.4, 4.3);
        break;
      case "side":
        targetCamPosition.current.set(4.8, 0.8, 0);
        break;
      case "top":
        targetCamPosition.current.set(0, 5.0, 0.1);
        break;
      case "back":
        targetCamPosition.current.set(0, 1.2, -4.5);
        break;
    }
    setIsRotating(false); // Disable auto orbit temporarily to lock onto custom target
    
    // Auto re-enable auto rotate after brief delay
    const timer = setTimeout(() => {
      setIsRotating(true);
    }, 4000);

    return () => clearTimeout(timer);
  }, [cameraAngle]);

  // Drag-to-rotate viewport calculations
  const handleMouseDown = (e: React.MouseEvent) => {
    mouseRef.current.isDown = true;
    mouseRef.current.prevX = e.clientX;
    mouseRef.current.prevY = e.clientY;
    setIsRotating(false);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const y = -((e.clientY - rect.top) / rect.height) * 2 + 1;
      hoverPosRef.current = { x, y };
    }

    if (!mouseRef.current.isDown) return;

    const deltaX = e.clientX - mouseRef.current.prevX;
    const deltaY = e.clientY - mouseRef.current.prevY;

    mouseRef.current.prevX = e.clientX;
    mouseRef.current.prevY = e.clientY;

    // Shift camera target on circular sphere tracking
    const orbitSpeed = 0.006;
    const radialDistance = targetCamPosition.current.length();

    // Horizontal rotation orbital
    const currentAngleX = Math.atan2(targetCamPosition.current.x, targetCamPosition.current.z);
    const newAngleX = currentAngleX - deltaX * orbitSpeed;

    // Vertical angle clamping
    const elevationY = targetCamPosition.current.y / radialDistance;
    const newY = Math.max(-0.2, Math.min(0.9, elevationY - deltaY * orbitSpeed * 0.5)) * radialDistance;

    const targetZ = Math.cos(newAngleX) * Math.sqrt(radialDistance * radialDistance - newY * newY);
    const targetX = Math.sin(newAngleX) * Math.sqrt(radialDistance * radialDistance - newY * newY);

    targetCamPosition.current.set(targetX, newY, targetZ);
  };

  const handleMouseUpOrLeave = () => {
    mouseRef.current.isDown = false;
    hoverPosRef.current = { x: 0, y: 0 };
    // Schedule returning back into slow orbit automatic rotation
    const timer = setTimeout(() => {
      if (!mouseRef.current.isDown) {
        setIsRotating(true);
      }
    }, 6000);
  };

  return (
    <div
      ref={containerRef}
      className="relative w-full h-full cursor-grab active:cursor-grabbing rounded-2xl overflow-hidden bg-black/40 border border-zinc-800"
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUpOrLeave}
      onMouseLeave={handleMouseUpOrLeave}
      id="3d-canvas-wrapper"
    >
      <canvas ref={canvasRef} className="block w-full h-full" id="three-showroom-viewport" />
      
      {/* Dynamic 3D HUD Indicators overlaid */}
      <div className="absolute top-4 left-4 flex flex-col gap-1 pointer-events-none select-none font-mono">
        <div className="flex items-center gap-2 text-xs text-zinc-300">
          <span className={`w-2 h-2 rounded-full bg-brand-orange ${engineActive ? 'animate-ping' : ''}`} />
          <span>CURSOR TETHER PILOT: ACTIVE</span>
        </div>
        <div className="text-[10px] text-zinc-500 flex flex-col">
          <span>STABILITY PROFILE: 100% SECURE</span>
          <span>LATERAL VECTOR: [{(hoverPosRef.current.x * 10).toFixed(1)}, {(hoverPosRef.current.y * 10).toFixed(1)}]</span>
        </div>
      </div>

      <div className="absolute bottom-4 right-4 text-[10px] font-mono text-zinc-400 pointer-events-none bg-black/85 border border-zinc-900 px-3 py-2 rounded backdrop-blur text-right flex flex-col gap-0.5">
        <span className="text-brand-orange font-bold uppercase tracking-widest">▲ ACTIVE CURSOR HOVER CONTROL</span>
        <span>MOVE CURSOR AROUND VIEWPORT TO GLIDE VEHICLE</span>
        <span>DRAG TO ROTATE 3D SHOWROOM CAMERA</span>
      </div>
    </div>
  );
}
