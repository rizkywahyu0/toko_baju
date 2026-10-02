"use client";

import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { FBXLoader } from "three/examples/jsm/loaders/FBXLoader.js";
import { ColorPicker } from "antd";
import {
  Rotate3d,
  Camera,
  Sun,
  Maximize2,
  Sparkles,
  Layers,
  Palette,
  Eye,
  Check,
  Car,
  Pipette,
  Sliders,
  ChevronDown,
} from "lucide-react";
import { InventoryItem } from "@/app/inventory/data/wheels";
import { buildEnkeiRPF1Mesh } from "@/app/workshop/utils/enkeiRPF1Builder";

export interface PaintOption {
  name: string;
  hex: string;
  finish: "Gloss" | "Matte" | "Metallic" | "Carbon";
}

export const PAINT_COLORS: PaintOption[] = [
  { name: "Chalk White", hex: "#f0f2f5", finish: "Gloss" },
  { name: "Guards Red", hex: "#d91e1e", finish: "Gloss" },
  { name: "Stealth Obsidian", hex: "#111317", finish: "Metallic" },
  { name: "Miami Blue", hex: "#00a3e0", finish: "Gloss" },
  { name: "Racing Yellow", hex: "#facc15", finish: "Gloss" },
  { name: "Ultra Violet", hex: "#6d28d9", finish: "Metallic" },
  { name: "Matte Gunmetal", hex: "#4b5563", finish: "Matte" },
  { name: "Python Green", hex: "#16a34a", finish: "Gloss" },
];

export interface CarModelPreset {
  id: "porsche-gt3rs" | "bmw-m3-g81" | "toyota-supra-a91";
  name: string;
  brand: string;
  power: string;
  torque: string;
  weight: string;
  drag: string;
  downforce: string;
}

export const CAR_MODELS: CarModelPreset[] = [
  {
    id: "porsche-gt3rs",
    name: "Porsche 911 GT3 RS",
    brand: "PORSCHE MOTORSPORT",
    power: "642 HP",
    torque: "590 LB-FT",
    weight: "3,120 LBS",
    drag: "0.31 CD",
    downforce: "+860 kg @ 285 km/h",
  },
  {
    id: "bmw-m3-g81",
    name: "BMW M3 Touring G81",
    brand: "BMW M POWER",
    power: "530 HP",
    torque: "650 NM",
    weight: "3,750 LBS",
    drag: "0.33 CD",
    downforce: "+320 kg @ 250 km/h",
  },
  {
    id: "toyota-supra-a91",
    name: "Toyota GR Supra A91",
    brand: "GAZOO RACING",
    power: "382 HP",
    torque: "500 NM",
    weight: "3,395 LBS",
    drag: "0.29 CD",
    downforce: "+280 kg @ 240 km/h",
  },
];

interface Showroom3DCanvasProps {
  equippedVelg: InventoryItem;
  equippedTyre: InventoryItem;
  equippedSpoiler: InventoryItem;
  equippedHood: InventoryItem;
  equippedBodykit: InventoryItem;
  equippedBrake: InventoryItem;
  customModelFile?: { file: File; type: "glb" | "gltf" | "fbx"; scale: number } | null;
  selectedCarModelId: "porsche-gt3rs" | "bmw-m3-g81" | "toyota-supra-a91";
  onSelectCarModel: (id: "porsche-gt3rs" | "bmw-m3-g81" | "toyota-supra-a91") => void;
}

export default function Showroom3DCanvas({
  equippedVelg,
  equippedTyre,
  equippedSpoiler,
  equippedHood,
  equippedBodykit,
  equippedBrake,
  customModelFile,
  selectedCarModelId,
  onSelectCarModel,
}: Showroom3DCanvasProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [paintColor, setPaintColor] = useState<PaintOption>(PAINT_COLORS[0]);
  const [isColorPickerOpen, setIsColorPickerOpen] = useState(false);
  const [isRotating, setIsRotating] = useState(false);
  const [activeCamPreset, setActiveCamPreset] = useState<string>("3/4 Front");

  const handleHexChange = (newHex: string) => {
    setPaintColor((prev) => ({
      ...prev,
      name: "Custom Color",
      hex: newHex,
    }));
  };

  const handleFinishChange = (newFinish: "Gloss" | "Matte" | "Metallic" | "Carbon") => {
    setPaintColor((prev) => ({
      ...prev,
      finish: newFinish,
    }));
  };

  const currentCarData =
    CAR_MODELS.find((c) => c.id === selectedCarModelId) || CAR_MODELS[0];

  // Three.js instances ref
  const threeRef = useRef<{
    scene: THREE.Scene;
    camera: THREE.PerspectiveCamera;
    renderer: THREE.WebGLRenderer;
    controls: OrbitControls;
    carBodyMaterial: THREE.MeshPhysicalMaterial;
    carGroup: THREE.Group;
    bodyMeshGroup: THREE.Group;
    wheelsGroup: THREE.Group;
    spoilerGroup: THREE.Group;
    hoodGroup: THREE.Group;
    caliperGroup: THREE.Group;
    customModelGroup: THREE.Group;
  } | null>(null);

  // Initialize Three.js Scene
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const width = container.clientWidth || 800;
    const height = container.clientHeight || 550;

    // 1. Scene & Camera
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x06070a);
    scene.fog = new THREE.FogExp2(0x06070a, 0.04);

    const camera = new THREE.PerspectiveCamera(40, width / height, 0.1, 100);
    camera.position.set(4.8, 2.2, 5.2);

    // 2. WebGL Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: false });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.3;

    container.replaceChildren(renderer.domElement);

    // 3. Orbit Controls
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.maxPolarAngle = Math.PI / 2 - 0.02;
    controls.minDistance = 2.5;
    controls.maxDistance = 14;
    controls.target.set(0, 0.6, 0);

    // 4. Lighting & Stage Setup
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.2);
    scene.add(ambientLight);

    const mainLight = new THREE.DirectionalLight(0xffffff, 2.8);
    mainLight.position.set(5, 8, 5);
    mainLight.castShadow = true;
    mainLight.shadow.mapSize.width = 2048;
    mainLight.shadow.mapSize.height = 2048;
    mainLight.shadow.bias = -0.0001;
    scene.add(mainLight);

    const rimLight1 = new THREE.PointLight(0x9cbbf8, 3.5, 15);
    rimLight1.position.set(-6, 3, -4);
    scene.add(rimLight1);

    const rimLight2 = new THREE.PointLight(0x00e5ff, 2.5, 12);
    rimLight2.position.set(5, 2, -5);
    scene.add(rimLight2);

    // Floor Shadow Plane
    const floorGeo = new THREE.PlaneGeometry(30, 30);
    const floorMat = new THREE.MeshStandardMaterial({
      color: 0x090b10,
      roughness: 0.4,
      metalness: 0.6,
    });
    const floor = new THREE.Mesh(floorGeo, floorMat);
    floor.rotation.x = -Math.PI / 2;
    floor.receiveShadow = true;
    scene.add(floor);

    // Iconic Circular Neon Halo Stage Light
    const haloGeo = new THREE.TorusGeometry(3.6, 0.04, 16, 64);
    const haloMat = new THREE.MeshBasicMaterial({ color: 0xffffff });
    const haloMesh = new THREE.Mesh(haloGeo, haloMat);
    haloMesh.rotation.x = Math.PI / 2;
    haloMesh.position.y = 0.02;
    scene.add(haloMesh);

    const haloInnerGeo = new THREE.TorusGeometry(3.55, 0.02, 16, 64);
    const haloInnerMat = new THREE.MeshBasicMaterial({ color: 0x9cbbf8 });
    const haloInner = new THREE.Mesh(haloInnerGeo, haloInnerMat);
    haloInner.rotation.x = Math.PI / 2;
    haloInner.position.y = 0.025;
    scene.add(haloInner);

    // 5. Car Root Group
    const carGroup = new THREE.Group();
    scene.add(carGroup);

    const bodyMeshGroup = new THREE.Group();
    carGroup.add(bodyMeshGroup);

    const wheelsGroup = new THREE.Group();
    carGroup.add(wheelsGroup);

    const spoilerGroup = new THREE.Group();
    carGroup.add(spoilerGroup);

    const hoodGroup = new THREE.Group();
    carGroup.add(hoodGroup);

    const caliperGroup = new THREE.Group();
    carGroup.add(caliperGroup);

    const customModelGroup = new THREE.Group();
    carGroup.add(customModelGroup);

    // Paint Shader Material
    const carBodyMaterial = new THREE.MeshPhysicalMaterial({
      color: new THREE.Color(paintColor.hex),
      metalness: 0.3,
      roughness: 0.15,
      clearcoat: 1.0,
      clearcoatRoughness: 0.05,
    });

    threeRef.current = {
      scene,
      camera,
      renderer,
      controls,
      carBodyMaterial,
      carGroup,
      bodyMeshGroup,
      wheelsGroup,
      spoilerGroup,
      hoodGroup,
      caliperGroup,
      customModelGroup,
    };

    // Animation Loop
    let animId: number;
    const animate = () => {
      animId = requestAnimationFrame(animate);
      controls.update();
      renderer.render(scene, camera);
    };

    animate();

    const handleResize = () => {
      if (!container) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", handleResize);
      renderer.dispose();
    };
  }, []);

  // Update Paint Color & Finish
  useEffect(() => {
    if (!threeRef.current) return;
    const { carBodyMaterial } = threeRef.current;
    carBodyMaterial.color.set(paintColor.hex);

    switch (paintColor.finish) {
      case "Gloss":
        carBodyMaterial.clearcoat = 1.0;
        carBodyMaterial.roughness = 0.12;
        carBodyMaterial.metalness = 0.25;
        break;
      case "Metallic":
        carBodyMaterial.clearcoat = 1.0;
        carBodyMaterial.roughness = 0.22;
        carBodyMaterial.metalness = 0.88;
        break;
      case "Matte":
        carBodyMaterial.clearcoat = 0.0;
        carBodyMaterial.roughness = 0.75;
        carBodyMaterial.metalness = 0.1;
        break;
      case "Carbon":
        carBodyMaterial.clearcoat = 0.8;
        carBodyMaterial.roughness = 0.35;
        carBodyMaterial.metalness = 0.3;
        break;
    }
  }, [paintColor]);

  // Sync auto-rotation with OrbitControls
  useEffect(() => {
    if (!threeRef.current) return;
    threeRef.current.controls.autoRotate = isRotating;
    threeRef.current.controls.autoRotateSpeed = 1.5;
  }, [isRotating]);

  // Build Procedural 3D Car Body (3 Models Available)
  useEffect(() => {
    if (!threeRef.current) return;
    const {
      bodyMeshGroup,
      wheelsGroup,
      spoilerGroup,
      hoodGroup,
      caliperGroup,
      carBodyMaterial,
    } = threeRef.current;

    // Clear old meshes
    bodyMeshGroup.clear();
    wheelsGroup.clear();
    spoilerGroup.clear();
    hoodGroup.clear();
    caliperGroup.clear();

    if (customModelFile) return; // If custom uploaded model is active

    const carbonMat = new THREE.MeshStandardMaterial({
      color: 0x15171e,
      roughness: 0.3,
      metalness: 0.4,
    });
    const glassMat = new THREE.MeshPhysicalMaterial({
      color: 0x0a0c10,
      transparent: true,
      opacity: 0.85,
      roughness: 0.05,
      metalness: 0.9,
    });
    const darkMat = new THREE.MeshStandardMaterial({ color: 0x0f1115, roughness: 0.8 });
    const chromeMat = new THREE.MeshStandardMaterial({ color: 0xd1d5db, metalness: 0.9, roughness: 0.1 });

    // ================= MODEL 1: PORSCHE 911 GT3 RS =================
    if (selectedCarModelId === "porsche-gt3rs") {
      // Lower Main Body
      const lowerGeo = new THREE.BoxGeometry(1.82, 0.45, 4.3);
      const lower = new THREE.Mesh(lowerGeo, carBodyMaterial);
      lower.position.set(0, 0.48, 0);
      lower.castShadow = true;
      bodyMeshGroup.add(lower);

      // Curved GT3 Front Nose
      const noseGeo = new THREE.BoxGeometry(1.78, 0.34, 1.4);
      const nose = new THREE.Mesh(noseGeo, carBodyMaterial);
      nose.position.set(0, 0.45, 1.7);
      nose.rotation.x = 0.08;
      nose.castShadow = true;
      bodyMeshGroup.add(nose);

      // Teardrop Fastback Cabin
      const cabinGeo = new THREE.BoxGeometry(1.38, 0.52, 2.0);
      const cabin = new THREE.Mesh(cabinGeo, carBodyMaterial);
      cabin.position.set(0, 0.85, -0.2);
      cabin.castShadow = true;
      bodyMeshGroup.add(cabin);

      // Windshield & Rear Sloped Glass
      const wsGeo = new THREE.BoxGeometry(1.34, 0.48, 0.8);
      const ws = new THREE.Mesh(wsGeo, glassMat);
      ws.position.set(0, 0.82, 0.6);
      ws.rotation.x = -0.45;
      bodyMeshGroup.add(ws);

      const rgGeo = new THREE.BoxGeometry(1.34, 0.46, 1.0);
      const rg = new THREE.Mesh(rgGeo, glassMat);
      rg.position.set(0, 0.78, -1.0);
      rg.rotation.x = 0.48;
      bodyMeshGroup.add(rg);

      // 4-Point Oval LED Headlamps
      const hlMat = new THREE.MeshBasicMaterial({ color: 0x00e5ff });
      const hlLeft = new THREE.Mesh(new THREE.CylinderGeometry(0.12, 0.12, 0.08, 16), hlMat);
      hlLeft.position.set(-0.65, 0.54, 2.35);
      hlLeft.rotation.x = Math.PI / 2;
      bodyMeshGroup.add(hlLeft);

      const hlRight = new THREE.Mesh(new THREE.CylinderGeometry(0.12, 0.12, 0.08, 16), hlMat);
      hlRight.position.set(0.65, 0.54, 2.35);
      hlRight.rotation.x = Math.PI / 2;
      bodyMeshGroup.add(hlRight);

      // 992 LED Lightbar Taillight
      const tlMat = new THREE.MeshBasicMaterial({ color: 0xef4444 });
      const tl = new THREE.Mesh(new THREE.BoxGeometry(1.65, 0.06, 0.08), tlMat);
      tl.position.set(0, 0.58, -2.15);
      bodyMeshGroup.add(tl);

      // GT3 RS Side Decal Stripe
      const decalMat = new THREE.MeshBasicMaterial({ color: 0xd91e1e });
      const dLeft = new THREE.Mesh(new THREE.BoxGeometry(0.02, 0.14, 2.2), decalMat);
      dLeft.position.set(-0.92, 0.42, -0.1);
      bodyMeshGroup.add(dLeft);

      const dRight = new THREE.Mesh(new THREE.BoxGeometry(0.02, 0.14, 2.2), decalMat);
      dRight.position.set(0.92, 0.42, -0.1);
      bodyMeshGroup.add(dRight);

      // Splitter & Diffuser
      const spl = new THREE.Mesh(new THREE.BoxGeometry(1.92, 0.05, 0.45), carbonMat);
      spl.position.set(0, 0.22, 2.25);
      bodyMeshGroup.add(spl);

      const diff = new THREE.Mesh(new THREE.BoxGeometry(1.86, 0.14, 0.5), carbonMat);
      diff.position.set(0, 0.26, -2.15);
      bodyMeshGroup.add(diff);
    }

    // ================= MODEL 2: BMW M3 TOURING (G81) =================
    else if (selectedCarModelId === "bmw-m3-g81") {
      // Boxy Muscular Touring Body
      const lowerGeo = new THREE.BoxGeometry(1.85, 0.5, 4.4);
      const lower = new THREE.Mesh(lowerGeo, carBodyMaterial);
      lower.position.set(0, 0.5, 0);
      lower.castShadow = true;
      bodyMeshGroup.add(lower);

      // Long Touring Wagon Roof
      const roofGeo = new THREE.BoxGeometry(1.42, 0.56, 2.8);
      const roof = new THREE.Mesh(roofGeo, carBodyMaterial);
      roof.position.set(0, 0.88, -0.3);
      roof.castShadow = true;
      bodyMeshGroup.add(roof);

      // Roof Rails
      const railGeo = new THREE.BoxGeometry(0.04, 0.04, 2.6);
      const rLeft = new THREE.Mesh(railGeo, darkMat);
      rLeft.position.set(-0.68, 1.18, -0.3);
      bodyMeshGroup.add(rLeft);

      const rRight = new THREE.Mesh(railGeo, darkMat);
      rRight.position.set(0.68, 1.18, -0.3);
      bodyMeshGroup.add(rRight);

      // Vertical Frameless M-Twin Kidney Grille
      const gMat = new THREE.MeshBasicMaterial({ color: 0x0a0c10 });
      const kLeft = new THREE.Mesh(new THREE.BoxGeometry(0.24, 0.38, 0.08), gMat);
      kLeft.position.set(-0.16, 0.42, 2.22);
      bodyMeshGroup.add(kLeft);

      const kRight = new THREE.Mesh(new THREE.BoxGeometry(0.24, 0.38, 0.08), gMat);
      kRight.position.set(0.16, 0.42, 2.22);
      bodyMeshGroup.add(kRight);

      // L-Shaped Laser Headlights
      const laserMat = new THREE.MeshBasicMaterial({ color: 0x38bdf8 });
      const hlL = new THREE.Mesh(new THREE.BoxGeometry(0.35, 0.1, 0.1), laserMat);
      hlL.position.set(-0.65, 0.58, 2.2);
      bodyMeshGroup.add(hlL);

      const hlR = new THREE.Mesh(new THREE.BoxGeometry(0.35, 0.1, 0.1), laserMat);
      hlR.position.set(0.65, 0.58, 2.2);
      bodyMeshGroup.add(hlR);

      // Quad Round M-Exhaust Tips
      const exMat = chromeMat;
      [-0.45, -0.3, 0.3, 0.45].forEach((xPos) => {
        const tip = new THREE.Mesh(new THREE.CylinderGeometry(0.05, 0.05, 0.15, 16), exMat);
        tip.position.set(xPos, 0.26, -2.25);
        tip.rotation.x = Math.PI / 2;
        bodyMeshGroup.add(tip);
      });
    }

    // ================= MODEL 3: TOYOTA GR SUPRA (A91) =================
    else if (selectedCarModelId === "toyota-supra-a91") {
      // Low Slung Sculpted Coupe Body
      const lowerGeo = new THREE.BoxGeometry(1.8, 0.44, 4.1);
      const lower = new THREE.Mesh(lowerGeo, carBodyMaterial);
      lower.position.set(0, 0.46, 0);
      lower.castShadow = true;
      bodyMeshGroup.add(lower);

      // Long Sleek Hood with Center Nose Tip
      const noseGeo = new THREE.BoxGeometry(1.72, 0.32, 1.6);
      const nose = new THREE.Mesh(noseGeo, carBodyMaterial);
      nose.position.set(0, 0.44, 1.6);
      nose.rotation.x = 0.06;
      bodyMeshGroup.add(nose);

      // Double-Bubble Aerodynamic Roof
      const roofL = new THREE.Mesh(new THREE.CylinderGeometry(0.32, 0.32, 1.6, 16), carBodyMaterial);
      roofL.position.set(-0.35, 0.88, -0.2);
      roofL.rotation.x = Math.PI / 2;
      bodyMeshGroup.add(roofL);

      const roofR = new THREE.Mesh(new THREE.CylinderGeometry(0.32, 0.32, 1.6, 16), carBodyMaterial);
      roofR.position.set(0.35, 0.88, -0.2);
      roofR.rotation.x = Math.PI / 2;
      bodyMeshGroup.add(roofR);

      // Integrated Ducktail Rear Lip
      const dtGeo = new THREE.BoxGeometry(1.45, 0.12, 0.25);
      const dt = new THREE.Mesh(dtGeo, carBodyMaterial);
      dt.position.set(0, 0.72, -1.95);
      dt.rotation.x = -0.2;
      bodyMeshGroup.add(dt);

      // 6-Lens LED Headlamps
      const hlMat = new THREE.MeshBasicMaterial({ color: 0xffffff });
      const hlL = new THREE.Mesh(new THREE.BoxGeometry(0.32, 0.08, 0.2), hlMat);
      hlL.position.set(-0.62, 0.5, 2.2);
      bodyMeshGroup.add(hlL);

      const hlR = new THREE.Mesh(new THREE.BoxGeometry(0.32, 0.08, 0.2), hlMat);
      hlR.position.set(0.62, 0.5, 2.2);
      bodyMeshGroup.add(hlR);

      // Formula 1 Center Rear Fog Lamp
      const f1Light = new THREE.Mesh(new THREE.BoxGeometry(0.12, 0.12, 0.06), new THREE.MeshBasicMaterial({ color: 0xef4444 }));
      f1Light.position.set(0, 0.24, -2.12);
      bodyMeshGroup.add(f1Light);
    }

    // ================= 4 MODULAR WHEELS (VELG & BAN) =================
    const wheelPositions = [
      { x: -0.98, y: 0.38, z: 1.35, isLeft: true },
      { x: 0.98, y: 0.38, z: 1.35, isLeft: false },
      { x: -0.98, y: 0.4, z: -1.35, isLeft: true },
      { x: 0.98, y: 0.4, z: -1.35, isLeft: false },
    ];

    const rimColor = new THREE.Color(equippedVelg.colorTheme.primary);
    const rimMat = new THREE.MeshStandardMaterial({
      color: rimColor,
      metalness: 0.92,
      roughness: 0.2,
    });
    const tireMat = new THREE.MeshStandardMaterial({
      color: 0x16171a,
      roughness: 0.85,
      metalness: 0.1,
    });
    const rotorMat = new THREE.MeshStandardMaterial({
      color: 0x6b7280,
      metalness: 0.95,
      roughness: 0.2,
    });

    const caliperColorHex = equippedBrake.colorTheme.primary || "#eab308";
    const caliperMat = new THREE.MeshStandardMaterial({
      color: new THREE.Color(caliperColorHex),
      metalness: 0.6,
      roughness: 0.3,
    });

    wheelPositions.forEach((pos) => {
      const wheelSub = new THREE.Group();
      wheelSub.position.set(pos.x, pos.y, pos.z);

      // Tire Torus
      const tireTorus = new THREE.Mesh(new THREE.TorusGeometry(0.38, 0.12, 20, 36), tireMat);
      tireTorus.rotation.y = Math.PI / 2;
      tireTorus.castShadow = true;
      wheelSub.add(tireTorus);

      if (equippedVelg.id === "enkei-rpf1") {
        // High detail Enkei RPF1 Model
        const rpf1Mesh = buildEnkeiRPF1Mesh({
          scale: 0.28,
          color: equippedVelg.colorTheme.primary || 0xdbe2ea,
          secondaryColor: equippedVelg.colorTheme.secondary,
          widthDepth: 0.38,
        });
        // Orient wheel outward towards vehicle side
        rpf1Mesh.rotation.y = pos.isLeft ? -Math.PI / 2 : Math.PI / 2;
        wheelSub.add(rpf1Mesh);
      } else {
        // Fallback procedural rim
        const rimBarrel = new THREE.Mesh(
          new THREE.CylinderGeometry(0.34, 0.34, 0.24, 32, 1, true),
          rimMat
        );
        rimBarrel.rotation.z = Math.PI / 2;
        wheelSub.add(rimBarrel);

        const rimHub = new THREE.Mesh(new THREE.CylinderGeometry(0.1, 0.1, 0.25, 24), rimMat);
        rimHub.rotation.z = Math.PI / 2;
        wheelSub.add(rimHub);

        const spokeCount =
          equippedVelg.id === "volk-te37"
            ? 6
            : equippedVelg.id === "bbs-lm-r"
            ? 16
            : 10;

        for (let s = 0; s < spokeCount; s++) {
          const ang = (s * Math.PI * 2) / spokeCount;
          const spokeMesh = new THREE.Mesh(new THREE.BoxGeometry(0.04, 0.24, 0.02), rimMat);
          spokeMesh.position.set(
            0.06 * (pos.isLeft ? -1 : 1),
            Math.sin(ang) * 0.2,
            Math.cos(ang) * 0.2
          );
          spokeMesh.rotation.x = ang;
          wheelSub.add(spokeMesh);
        }
      }

      // Brake Rotor & Caliper
      const rotor = new THREE.Mesh(new THREE.CylinderGeometry(0.24, 0.24, 0.02, 28), rotorMat);
      rotor.rotation.z = Math.PI / 2;
      wheelSub.add(rotor);

      const caliper = new THREE.Mesh(new THREE.BoxGeometry(0.08, 0.16, 0.08), caliperMat);
      caliper.position.set(0, 0.16, 0.05);
      wheelSub.add(caliper);

      wheelsGroup.add(wheelSub);
    });

    // ================= MODULAR SPOILER / GT WING =================
    if (equippedSpoiler.category !== "STOCK") {
      const wingBlade = new THREE.Mesh(new THREE.BoxGeometry(1.8, 0.04, 0.35), carbonMat);
      wingBlade.position.set(0, 1.22, -1.9);
      wingBlade.rotation.x = -0.08;
      wingBlade.castShadow = true;
      spoilerGroup.add(wingBlade);

      const endplateGeo = new THREE.BoxGeometry(0.02, 0.24, 0.38);
      const epLeft = new THREE.Mesh(endplateGeo, carbonMat);
      epLeft.position.set(-0.9, 1.22, -1.9);
      spoilerGroup.add(epLeft);

      const epRight = new THREE.Mesh(endplateGeo, carbonMat);
      epRight.position.set(0.9, 1.22, -1.9);
      spoilerGroup.add(epRight);

      const stLeft = new THREE.Mesh(new THREE.BoxGeometry(0.04, 0.45, 0.08), darkMat);
      stLeft.position.set(-0.45, 0.98, -1.82);
      stLeft.rotation.x = 0.2;
      spoilerGroup.add(stLeft);

      const stRight = new THREE.Mesh(new THREE.BoxGeometry(0.04, 0.45, 0.08), darkMat);
      stRight.position.set(0.45, 0.98, -1.82);
      stRight.rotation.x = 0.2;
      spoilerGroup.add(stRight);
    }

    // ================= MODULAR HOOD VENTS =================
    if (equippedHood.category.includes("CARBON")) {
      const ventGeo = new THREE.BoxGeometry(0.4, 0.04, 0.6);
      const vLeft = new THREE.Mesh(ventGeo, carbonMat);
      vLeft.position.set(-0.42, 0.64, 1.6);
      vLeft.rotation.x = 0.08;
      hoodGroup.add(vLeft);

      const vRight = new THREE.Mesh(ventGeo, carbonMat);
      vRight.position.set(0.42, 0.64, 1.6);
      vRight.rotation.x = 0.08;
      hoodGroup.add(vRight);
    }
  }, [
    selectedCarModelId,
    equippedVelg,
    equippedTyre,
    equippedSpoiler,
    equippedHood,
    equippedBodykit,
    equippedBrake,
    customModelFile,
  ]);

  // Load Custom 3D Model (.glb, .gltf, .fbx)
  useEffect(() => {
    if (!threeRef.current || !customModelFile) return;
    const { customModelGroup, carBodyMaterial } = threeRef.current;
    customModelGroup.clear();

    const fileUrl = URL.createObjectURL(customModelFile.file);

    if (customModelFile.type === "glb" || customModelFile.type === "gltf") {
      const loader = new GLTFLoader();
      loader.load(
        fileUrl,
        (gltf) => {
          const model = gltf.scene;
          model.traverse((child) => {
            if ((child as THREE.Mesh).isMesh) {
              const mesh = child as THREE.Mesh;
              mesh.castShadow = true;
              mesh.receiveShadow = true;
              if (
                mesh.name.toLowerCase().includes("body") ||
                mesh.name.toLowerCase().includes("paint") ||
                mesh.name.toLowerCase().includes("car")
              ) {
                mesh.material = carBodyMaterial;
              }
            }
          });

          const box = new THREE.Box3().setFromObject(model);
          const size = box.getSize(new THREE.Vector3());
          const center = box.getCenter(new THREE.Vector3());

          model.position.x -= center.x;
          model.position.y -= box.min.y;
          model.position.z -= center.z;

          const maxDim = Math.max(size.x, size.y, size.z);
          const scale = (4.0 / maxDim) * customModelFile.scale;
          model.scale.set(scale, scale, scale);

          customModelGroup.add(model);
        },
        undefined,
        (err) => console.error("Error loading GLTF model:", err)
      );
    } else if (customModelFile.type === "fbx") {
      const loader = new FBXLoader();
      loader.load(
        fileUrl,
        (fbx) => {
          fbx.traverse((child) => {
            if ((child as THREE.Mesh).isMesh) {
              const mesh = child as THREE.Mesh;
              mesh.castShadow = true;
              mesh.receiveShadow = true;
            }
          });

          const box = new THREE.Box3().setFromObject(fbx);
          const size = box.getSize(new THREE.Vector3());
          const center = box.getCenter(new THREE.Vector3());

          fbx.position.x -= center.x;
          fbx.position.y -= box.min.y;
          fbx.position.z -= center.z;

          const maxDim = Math.max(size.x, size.y, size.z);
          const scale = (4.0 / maxDim) * customModelFile.scale;
          fbx.scale.set(scale, scale, scale);

          customModelGroup.add(fbx);
        },
        undefined,
        (err) => console.error("Error loading FBX model:", err)
      );
    }

    return () => {
      URL.revokeObjectURL(fileUrl);
    };
  }, [customModelFile]);

  // Camera View Presets
  const setCameraView = (preset: string) => {
    if (!threeRef.current) return;
    const { camera, controls } = threeRef.current;
    setActiveCamPreset(preset);

    switch (preset) {
      case "3/4 Front":
        camera.position.set(4.8, 2.2, 5.2);
        controls.target.set(0, 0.6, 0);
        break;
      case "Side Profile":
        camera.position.set(6.5, 1.2, 0);
        controls.target.set(0, 0.6, 0);
        break;
      case "Rear Aero":
        camera.position.set(-4.5, 2.0, -5.0);
        controls.target.set(0, 0.6, 0);
        break;
      case "Wheel Zoom":
        camera.position.set(1.8, 0.5, 1.6);
        controls.target.set(1.0, 0.4, 1.35);
        break;
      case "Top Down":
        camera.position.set(0, 7.5, 0.1);
        controls.target.set(0, 0, 0);
        break;
    }
  };

  return (
    <div className="relative w-full h-[480px] sm:h-[560px] xl:h-[620px] rounded-2xl bg-[#06070a] border border-white/[0.08] overflow-hidden shadow-2xl flex items-center justify-center select-none">
      {/* 3D WebGL Canvas */}
      <div ref={containerRef} className="w-full h-full cursor-grab active:cursor-grabbing" />

      {/* TOP CAR MODEL SELECTOR TABS */}
      <div className="absolute top-4 left-1/2 -translate-x-1/2 flex items-center gap-1.5 bg-[#0d0f15]/90 border border-white/10 rounded-xl p-1.5 backdrop-blur-md font-mono text-xs z-10 shadow-2xl">
        {CAR_MODELS.map((car) => {
          const isSelected = selectedCarModelId === car.id && !customModelFile;
          return (
            <button
              key={car.id}
              onClick={() => onSelectCarModel(car.id)}
              className={`px-3 py-1.5 rounded-lg transition-all flex items-center gap-1.5 whitespace-nowrap ${
                isSelected
                  ? "bg-[#253046] text-[#9cbbf8] border border-[#9cbbf8]/40 font-bold shadow-[0_0_12px_rgba(156,187,248,0.2)]"
                  : "text-neutral-400 hover:text-white hover:bg-white/[0.04]"
              }`}
            >
              <Car className="w-3.5 h-3.5" />
              <span>{car.name}</span>
            </button>
          );
        })}
      </div>

      {/* Top Right Live Telemetry HUD Overlay */}
      <div className="absolute top-16 sm:top-4 right-4 bg-[#0d0f15]/80 border border-white/10 rounded-xl p-3 backdrop-blur-md font-mono text-xs text-neutral-300 pointer-events-none shadow-xl space-y-1">
        <div className="flex items-center justify-between gap-4">
          <span className="text-neutral-500 text-[10px]">PWR:</span>
          <span className="text-[#9cbbf8] font-bold">{currentCarData.power}</span>
        </div>
        <div className="flex items-center justify-between gap-4">
          <span className="text-neutral-500 text-[10px]">TRQ:</span>
          <span className="text-white font-bold">{currentCarData.torque}</span>
        </div>
        <div className="flex items-center justify-between gap-4">
          <span className="text-neutral-500 text-[10px]">WGT:</span>
          <span className="text-neutral-200 font-bold">{currentCarData.weight}</span>
        </div>
      </div>

      {/* Bottom Center Downforce Curve HUD */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-center pointer-events-none font-mono hidden sm:block">
        <p className="text-[10px] text-neutral-400 tracking-wider">
          AERO BALANCE // {currentCarData.downforce}
        </p>
        <p className="text-xs sm:text-sm font-black text-white tracking-widest uppercase mt-0.5">
          DRAG COEFFICIENT: {currentCarData.drag}
        </p>
      </div>

      {/* Top Left Real-time Color Picker & Finish Customizer */}
      <div className="absolute top-16 sm:top-4 left-4 z-20 font-mono text-xs">
        <div className="bg-[#0d0f15]/90 border border-white/10 rounded-xl p-2.5 backdrop-blur-md shadow-2xl space-y-2.5 max-w-[280px]">
          {/* Header with Color Picker title & expand toggle */}
          <div className="flex items-center justify-between gap-2 border-b border-white/[0.06] pb-2">
            <div className="flex items-center gap-1.5 text-neutral-400 text-[10px] uppercase font-bold tracking-wider">
              <Palette className="w-3.5 h-3.5 text-[#9cbbf8]" />
              <span>COLOR PICKER</span>
            </div>
            <button
              onClick={() => setIsColorPickerOpen((prev) => !prev)}
              className="px-1.5 py-0.5 rounded bg-white/10 hover:bg-white/20 text-[10px] text-neutral-300 transition-colors flex items-center gap-1"
            >
              <span>{isColorPickerOpen ? "COLLAPSE" : "EXPAND"}</span>
              <ChevronDown className={`w-3 h-3 transition-transform ${isColorPickerOpen ? "rotate-180" : ""}`} />
            </button>
          </div>

          {/* Color Picker & Live Hex Input Row */}
          <div className="flex items-center gap-3">
            {/* Interactive ColorPicker trigger */}
            <div className="shrink-0 flex items-center justify-center">
              <ColorPicker
                value={paintColor.hex}
                onChange={(color) => handleHexChange(color.toHexString())}
                showText={false}
                size="middle"
                arrow={false}
              />
            </div>

            {/* Hex Input & Name info */}
            <div className="flex-1 min-w-0 space-y-1">
              <div className="flex items-center justify-between text-[10px] text-neutral-400">
                <span>HEX:</span>
                <span className="text-[#9cbbf8] font-bold">{paintColor.hex.toUpperCase()}</span>
              </div>
              <input
                type="text"
                value={paintColor.hex}
                onChange={(e) => {
                  const val = e.target.value;
                  if (val.startsWith("#") && val.length <= 7) {
                    handleHexChange(val);
                  } else if (!val.startsWith("#") && val.length <= 6) {
                    handleHexChange("#" + val);
                  }
                }}
                className="w-full bg-black/60 border border-white/15 rounded px-2 py-1 text-xs text-white font-bold focus:border-[#9cbbf8] focus:ring-1 focus:ring-[#9cbbf8] outline-none font-mono"
                placeholder="#RRGGBB"
              />
            </div>
          </div>

          {/* Finish Mode Selector */}
          <div className="space-y-1 pt-1 border-t border-white/[0.06]">
            <div className="flex items-center justify-between text-[10px] text-neutral-400">
              <span>FINISH SHADER:</span>
              <span className="text-[#9cbbf8] font-bold">{paintColor.finish.toUpperCase()}</span>
            </div>
            <div className="grid grid-cols-4 gap-1">
              {(["Gloss", "Metallic", "Matte", "Carbon"] as const).map((finishMode) => {
                const isActive = paintColor.finish === finishMode;
                return (
                  <button
                    key={finishMode}
                    onClick={() => handleFinishChange(finishMode)}
                    className={`py-1 text-[10px] rounded transition-all font-bold ${
                      isActive
                        ? "bg-[#9cbbf8] text-black shadow-[0_0_8px_rgba(156,187,248,0.4)]"
                        : "bg-white/[0.05] text-neutral-400 hover:text-white hover:bg-white/10"
                    }`}
                  >
                    {finishMode}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Collapsible Presets Swatches */}
          {isColorPickerOpen && (
            <div className="space-y-1.5 pt-2 border-t border-white/[0.06]">
              <span className="text-[10px] text-neutral-500 block">SUPERCAR OEM PRESETS:</span>
              <div className="grid grid-cols-4 gap-1.5">
                {PAINT_COLORS.map((col) => {
                  const isSelected = paintColor.hex.toLowerCase() === col.hex.toLowerCase();
                  return (
                    <button
                      key={col.name}
                      onClick={() => setPaintColor(col)}
                      title={`${col.name} (${col.finish})`}
                      className={`h-6 rounded-md transition-all flex items-center justify-center border text-[9px] font-bold truncate px-1 ${
                        isSelected
                          ? "border-[#9cbbf8] scale-105 shadow-[0_0_8px_rgba(156,187,248,0.4)]"
                          : "border-white/10 hover:border-white/40 opacity-80 hover:opacity-100"
                      }`}
                      style={{
                        backgroundColor: col.hex,
                        color: ["#f0f2f5", "#facc15"].includes(col.hex) ? "#000" : "#fff",
                      }}
                    >
                      {isSelected ? "✓" : col.name.split(" ")[0]}
                    </button>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Floating Bottom Left Camera View Presets */}
      <div className="absolute bottom-4 left-4 flex items-center gap-1.5 bg-[#0d0f15]/80 border border-white/10 rounded-lg p-1 backdrop-blur-md font-mono text-[10px] z-10">
        {["3/4 Front", "Side Profile", "Rear Aero", "Wheel Zoom"].map((preset) => {
          const isActive = activeCamPreset === preset;
          return (
            <button
              key={preset}
              onClick={() => setCameraView(preset)}
              className={`px-2 py-1 rounded transition-colors ${
                isActive
                  ? "bg-[#9cbbf8] text-black font-bold"
                  : "text-neutral-400 hover:text-white hover:bg-white/10"
              }`}
            >
              {preset}
            </button>
          );
        })}
      </div>

      {/* Floating Bottom Right Controls */}
      <div className="absolute bottom-4 right-4 flex items-center gap-2 z-10">
        <button
          onClick={() => setIsRotating((prev) => !prev)}
          className={`px-3 py-1.5 rounded-lg border text-xs font-mono font-bold transition-all backdrop-blur-md flex items-center gap-1.5 ${
            isRotating
              ? "bg-[#9cbbf8] text-black border-[#9cbbf8] shadow-[0_0_12px_rgba(156,187,248,0.4)]"
              : "bg-[#0d0f15]/80 text-neutral-300 border-white/10 hover:text-white hover:bg-black/90"
          }`}
        >
          <Rotate3d className="w-4 h-4" />
          <span>{isRotating ? "ROTATING" : "AUTO ROTATE"}</span>
        </button>
      </div>
    </div>
  );
}
