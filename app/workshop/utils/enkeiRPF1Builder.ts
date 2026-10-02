import * as THREE from "three";

/**
 * Creates a high-detail procedural texture for the Enkei RPF1 Center Cap
 */
export function createEnkeiCenterCapTexture(): THREE.CanvasTexture {
  const size = 512;
  const canvas = document.createElement("canvas");
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext("2d");

  if (ctx) {
    const cx = size / 2;
    const cy = size / 2;

    // Background circle (Dark Matte Metallic)
    const bgGrad = ctx.createRadialGradient(cx, cy, 10, cx, cy, size / 2);
    bgGrad.addColorStop(0, "#1f2229");
    bgGrad.addColorStop(0.7, "#0c0d11");
    bgGrad.addColorStop(1, "#050608");
    ctx.fillStyle = bgGrad;
    ctx.beginPath();
    ctx.arc(cx, cy, size / 2 - 4, 0, Math.PI * 2);
    ctx.fill();

    // Outer Silver Bezel Ring
    ctx.strokeStyle = "#cbd5e1";
    ctx.lineWidth = 14;
    ctx.beginPath();
    ctx.arc(cx, cy, size / 2 - 16, 0, Math.PI * 2);
    ctx.stroke();

    // Inner Chrome Ring
    ctx.strokeStyle = "#64748b";
    ctx.lineWidth = 4;
    ctx.beginPath();
    ctx.arc(cx, cy, size / 2 - 28, 0, Math.PI * 2);
    ctx.stroke();

    // 5 Perimeter Allen Bolts
    for (let i = 0; i < 5; i++) {
      const ang = (i * Math.PI * 2) / 5 - Math.PI / 2;
      const boltR = size / 2 - 42;
      const bx = cx + boltR * Math.cos(ang);
      const by = cy + boltR * Math.sin(ang);

      ctx.fillStyle = "#e2e8f0";
      ctx.beginPath();
      ctx.arc(bx, by, 8, 0, Math.PI * 2);
      ctx.fill();

      // Allen hex socket hole
      ctx.fillStyle = "#0f172a";
      ctx.beginPath();
      ctx.arc(bx, by, 4, 0, Math.PI * 2);
      ctx.fill();
    }

    // Center "Racing" Script
    ctx.fillStyle = "#ffffff";
    ctx.font = "italic 900 60px 'Inter', sans-serif, system-ui";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.shadowColor = "rgba(0,0,0,0.8)";
    ctx.shadowBlur = 8;
    ctx.fillText("Racing", cx, cy - 22);

    // Enkei Double-Loop & ENKEI text badge
    ctx.fillStyle = "#ffffff";
    ctx.font = "bold 26px 'Inter', sans-serif, monospace";
    ctx.fillText("⧜ ENKEI", cx, cy + 32);

    // Underline divider
    ctx.strokeStyle = "#e2e8f0";
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(cx - 90, cy + 8);
    ctx.lineTo(cx + 90, cy + 8);
    ctx.stroke();
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.anisotropy = 8;
  texture.needsUpdate = true;
  return texture;
}

/**
 * Creates the Stepped-Lip Decal Texture containing "ENKEI" badges and markings
 */
export function createEnkeiLipDecalTexture(): THREE.CanvasTexture {
  const size = 1024;
  const canvas = document.createElement("canvas");
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext("2d");

  if (ctx) {
    const cx = size / 2;
    const cy = size / 2;
    const lipRadius = size * 0.405;

    ctx.clearRect(0, 0, size, size);

    // Function to draw curved text along arc
    const drawCurvedText = (
      text: string,
      startAngleRad: number,
      fontSize: number,
      fontColor: string,
      isReversed: boolean = false
    ) => {
      ctx.save();
      ctx.font = `900 ${fontSize}px 'Arial Black', sans-serif`;
      ctx.fillStyle = fontColor;
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";

      const totalChars = text.length;
      const arcSpread = 0.22;
      const step = arcSpread / Math.max(totalChars, 1);

      for (let i = 0; i < totalChars; i++) {
        const charAngle = startAngleRad + (i - (totalChars - 1) / 2) * step;
        ctx.save();
        ctx.translate(
          cx + lipRadius * Math.cos(charAngle),
          cy + lipRadius * Math.sin(charAngle)
        );
        ctx.rotate(charAngle + (isReversed ? -Math.PI / 2 : Math.PI / 2));
        ctx.fillText(text[i], 0, 0);
        ctx.restore();
      }
      ctx.restore();
    };

    // 1. Top-Right ENKEI Decal at ~2 o'clock (~50 deg / 0.88 rad)
    drawCurvedText("∞ ENKEI", -0.85, 28, "#111827", false);

    // 2. Bottom-Left ENKEI Decal at ~8 o'clock (~230 deg / 4.0 rad)
    drawCurvedText("∞ ENKEI", 2.3, 28, "#111827", false);

    // 3. MAT Casting mark at ~4 o'clock
    drawCurvedText("MAT", 0.8, 16, "#475569", false);

    // 4. VIA / JWL mark at ~10 o'clock
    drawCurvedText("VIA 690KG", -2.3, 15, "#475569", false);

    // 5. Valve Stem Hole & Dot at 6 o'clock
    ctx.save();
    ctx.fillStyle = "#1e293b";
    ctx.beginPath();
    ctx.arc(cx, cy + lipRadius + 18, 10, 0, Math.PI * 2);
    ctx.fill();
    ctx.strokeStyle = "#cbd5e1";
    ctx.lineWidth = 3;
    ctx.stroke();
    ctx.restore();
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.anisotropy = 8;
  texture.needsUpdate = true;
  return texture;
}

export interface EnkeiRPF1Options {
  scale?: number; // Overall radius scale (default 1.0 -> ~1.2 unit radius)
  color?: string | number | THREE.Color; // Silver/custom finish
  secondaryColor?: string | number | THREE.Color;
  includeBrakes?: boolean;
  caliperColor?: string | number | THREE.Color;
  widthDepth?: number; // Barrel depth (e.g. 0.55 for standalone, 0.28 for car mount)
  isLeftMount?: boolean; // For car wheel orientation
}

/**
 * Builds a 3D procedural model of the iconic ENKEI RPF1 wheel
 */
export function buildEnkeiRPF1Mesh(options: EnkeiRPF1Options = {}): THREE.Group {
  const {
    scale = 1.0,
    color = 0xdbe2ea, // F1 Brilliant Silver
    includeBrakes = false,
    caliperColor = 0x00e5ff,
    widthDepth = 0.55,
    isLeftMount = true,
  } = options;

  const wheelGroup = new THREE.Group();

  // Primary F1 Machined Silver Wheel Material
  const rimMat = new THREE.MeshPhysicalMaterial({
    color: new THREE.Color(color),
    metalness: 0.94,
    roughness: 0.16,
    clearcoat: 0.85,
    clearcoatRoughness: 0.08,
  });

  // Darker accent / inner barrel material
  const innerBarrelMat = new THREE.MeshStandardMaterial({
    color: 0x222630,
    metalness: 0.8,
    roughness: 0.4,
  });

  // Dark Lug Nuts Material
  const lugMat = new THREE.MeshStandardMaterial({
    color: 0x1e2430,
    metalness: 0.95,
    roughness: 0.2,
  });

  // Chrome Screws / Highlights
  const chromeMat = new THREE.MeshStandardMaterial({
    color: 0xf1f5f9,
    metalness: 0.98,
    roughness: 0.1,
  });

  const R_OUTER = 1.22 * scale;
  const R_STEP = 1.06 * scale;
  const R_INNER_LIP = 0.92 * scale;
  const R_HUB = 0.38 * scale;
  const R_CAP = 0.18 * scale;
  const DEPTH = widthDepth * scale;

  // 1. ================= STEPPED BARREL GEOMETRY =================
  // Outer Rim Flange (Front Lip)
  const outerFlangeGeo = new THREE.TorusGeometry(R_OUTER, 0.045 * scale, 18, 64);
  const outerFlange = new THREE.Mesh(outerFlangeGeo, rimMat);
  outerFlange.position.z = DEPTH * 0.38;
  wheelGroup.add(outerFlange);

  // Stepped Lip Shelf (The distinctive RPF1 drop step)
  const stepShelfGeo = new THREE.CylinderGeometry(
    R_OUTER * 0.98,
    R_STEP,
    DEPTH * 0.22,
    64,
    1,
    true
  );
  const stepShelf = new THREE.Mesh(stepShelfGeo, rimMat);
  stepShelf.rotation.x = Math.PI / 2;
  stepShelf.position.z = DEPTH * 0.26;
  wheelGroup.add(stepShelf);

  // Secondary Drop Well (where spokes branch out)
  const dropWellGeo = new THREE.CylinderGeometry(
    R_STEP,
    R_INNER_LIP,
    DEPTH * 0.16,
    64,
    1,
    true
  );
  const dropWell = new THREE.Mesh(dropWellGeo, rimMat);
  dropWell.rotation.x = Math.PI / 2;
  dropWell.position.z = DEPTH * 0.14;
  wheelGroup.add(dropWell);

  // Stepped Lip Ring Bevel
  const stepRingGeo = new THREE.TorusGeometry(R_STEP, 0.03 * scale, 16, 64);
  const stepRing = new THREE.Mesh(stepRingGeo, rimMat);
  stepRing.position.z = DEPTH * 0.18;
  wheelGroup.add(stepRing);

  // Rear Barrel Tube
  const rearBarrelGeo = new THREE.CylinderGeometry(
    R_INNER_LIP * 1.05,
    R_OUTER * 0.95,
    DEPTH * 0.7,
    48,
    1,
    true
  );
  const rearBarrel = new THREE.Mesh(rearBarrelGeo, innerBarrelMat);
  rearBarrel.rotation.x = Math.PI / 2;
  rearBarrel.position.z = -DEPTH * 0.25;
  wheelGroup.add(rearBarrel);

  // Stepped Lip Decals Plane Overlay
  const decalTexture = createEnkeiLipDecalTexture();
  const decalMat = new THREE.MeshBasicMaterial({
    map: decalTexture,
    transparent: true,
    opacity: 0.95,
    depthWrite: false,
  });
  const decalPlaneGeo = new THREE.RingGeometry(
    R_STEP * 0.92,
    R_OUTER * 0.99,
    48
  );
  const decalPlane = new THREE.Mesh(decalPlaneGeo, decalMat);
  decalPlane.position.z = DEPTH * 0.28;
  wheelGroup.add(decalPlane);

  // 2. ================= 6 TWIN-SPOKE PAIRS (12 SPOKES) =================
  const spokePairCount = 6;
  const spokeLength = (R_STEP - R_HUB) * 1.05;
  const spokeWidth = 0.055 * scale;
  const spokeThickness = 0.065 * scale;
  const spokePairGapDeg = 7.5; // Narrow pocket between twins

  for (let i = 0; i < spokePairCount; i++) {
    const baseAngle = (i * Math.PI * 2) / spokePairCount;
    const pairGroup = new THREE.Group();

    // Twin spoke 1 & 2
    [-1, 1].forEach((dir) => {
      const halfGapRad = (spokePairGapDeg * Math.PI) / 360;
      const spokeAngle = baseAngle + dir * halfGapRad;

      // Spoke Body (Curved cross-section with subtle inward taper)
      const spokeGeo = new THREE.BoxGeometry(
        spokeWidth,
        spokeLength,
        spokeThickness
      );
      const spokeMesh = new THREE.Mesh(spokeGeo, rimMat);

      const midR = (R_HUB + R_STEP) * 0.52;
      spokeMesh.position.set(
        Math.sin(spokeAngle) * midR,
        Math.cos(spokeAngle) * midR,
        DEPTH * 0.16
      );
      spokeMesh.rotation.z = -spokeAngle;
      // Slanted inward towards recessed center hub
      spokeMesh.rotation.x = 0.08 * Math.cos(spokeAngle);
      spokeMesh.rotation.y = -0.08 * Math.sin(spokeAngle);

      pairGroup.add(spokeMesh);

      // Spoke front highlight fillet
      const filletGeo = new THREE.CylinderGeometry(
        spokeWidth * 0.28,
        spokeWidth * 0.35,
        spokeLength * 0.92,
        8
      );
      const filletMesh = new THREE.Mesh(filletGeo, rimMat);
      filletMesh.position.set(
        Math.sin(spokeAngle) * midR,
        Math.cos(spokeAngle) * midR,
        DEPTH * 0.19
      );
      filletMesh.rotation.z = -spokeAngle;
      pairGroup.add(filletMesh);
    });

    // Pocket Bridge Web at base of the twin spokes (Joining the pair near the hub)
    const bridgeGeo = new THREE.BoxGeometry(
      spokeWidth * 2.2,
      spokeWidth * 1.3,
      spokeThickness * 0.8
    );
    const bridgeMesh = new THREE.Mesh(bridgeGeo, rimMat);
    const bridgeR = R_HUB * 1.05;
    bridgeMesh.position.set(
      Math.sin(baseAngle) * bridgeR,
      Math.cos(baseAngle) * bridgeR,
      DEPTH * 0.12
    );
    bridgeMesh.rotation.z = -baseAngle;
    pairGroup.add(bridgeMesh);

    // Outer Step Web (Connecting pair at the outer lip)
    const outerWebGeo = new THREE.BoxGeometry(
      spokeWidth * 2.4,
      spokeWidth * 1.1,
      spokeThickness * 0.85
    );
    const outerWebMesh = new THREE.Mesh(outerWebGeo, rimMat);
    const outerWebR = R_STEP * 0.98;
    outerWebMesh.position.set(
      Math.sin(baseAngle) * outerWebR,
      Math.cos(baseAngle) * outerWebR,
      DEPTH * 0.18
    );
    outerWebMesh.rotation.z = -baseAngle;
    pairGroup.add(outerWebMesh);

    wheelGroup.add(pairGroup);
  }

  // 3. ================= RECESSED CENTER HUB & LUG NUT BOWL =================
  // Recessed Hub Base Bowl
  const hubBowlGeo = new THREE.CylinderGeometry(
    R_HUB * 1.05,
    R_HUB * 0.88,
    DEPTH * 0.24,
    36
  );
  const hubBowl = new THREE.Mesh(hubBowlGeo, rimMat);
  hubBowl.rotation.x = Math.PI / 2;
  hubBowl.position.z = DEPTH * 0.04;
  wheelGroup.add(hubBowl);

  // Hub Inner Chamfered Face
  const hubFaceGeo = new THREE.RingGeometry(
    R_CAP * 1.08,
    R_HUB * 1.02,
    36
  );
  const hubFace = new THREE.Mesh(hubFaceGeo, rimMat);
  hubFace.position.z = DEPTH * 0.12;
  wheelGroup.add(hubFace);

  // 5 Chamfered Lug Nut Recesses (PCD 5x114.3 layout)
  const lugPcdRadius = (R_HUB + R_CAP) * 0.53;
  for (let l = 0; l < 5; l++) {
    const lugAngle = (l * Math.PI * 2) / 5 - Math.PI / 2;
    const lx = Math.cos(lugAngle) * lugPcdRadius;
    const ly = Math.sin(lugAngle) * lugPcdRadius;

    // Recessed Lug Well (Counterbore)
    const wellGeo = new THREE.CylinderGeometry(
      0.055 * scale,
      0.045 * scale,
      DEPTH * 0.18,
      18
    );
    const wellMesh = new THREE.Mesh(wellGeo, innerBarrelMat);
    wellMesh.rotation.x = Math.PI / 2;
    wellMesh.position.set(lx, ly, DEPTH * 0.06);
    wheelGroup.add(wellMesh);

    // Lug Nut Head (Hexagonal Acorn Nut)
    const nutGeo = new THREE.CylinderGeometry(
      0.034 * scale,
      0.034 * scale,
      DEPTH * 0.12,
      6
    );
    const nutMesh = new THREE.Mesh(nutGeo, lugMat);
    nutMesh.rotation.x = Math.PI / 2;
    nutMesh.position.set(lx, ly, DEPTH * 0.09);
    wheelGroup.add(nutMesh);

    // Lug Chamfer Bezel Ring
    const nutBezelGeo = new THREE.TorusGeometry(
      0.052 * scale,
      0.012 * scale,
      12,
      24
    );
    const nutBezel = new THREE.Mesh(nutBezelGeo, rimMat);
    nutBezel.position.set(lx, ly, DEPTH * 0.125);
    wheelGroup.add(nutBezel);
  }

  // 4. ================= CENTER CAP WITH ENKEI RACING BADGE =================
  const capTexture = createEnkeiCenterCapTexture();
  const capMat = new THREE.MeshStandardMaterial({
    map: capTexture,
    metalness: 0.6,
    roughness: 0.25,
  });

  const capCylinderGeo = new THREE.CylinderGeometry(
    R_CAP,
    R_CAP * 0.96,
    DEPTH * 0.12,
    32
  );
  const centerCapMesh = new THREE.Mesh(capCylinderGeo, [
    rimMat, // side
    capMat, // top face with Enkei Racing badge
    rimMat, // bottom
  ]);
  centerCapMesh.rotation.x = Math.PI / 2;
  centerCapMesh.position.z = DEPTH * 0.14;
  wheelGroup.add(centerCapMesh);

  // Center Cap Chrome Bezel Ring
  const capBezelGeo = new THREE.TorusGeometry(
    R_CAP * 1.02,
    0.016 * scale,
    14,
    36
  );
  const capBezel = new THREE.Mesh(capBezelGeo, chromeMat);
  capBezel.position.z = DEPTH * 0.18;
  wheelGroup.add(capBezel);

  // 5. ================= METAL VALVE STEM =================
  const valveGroup = new THREE.Group();
  const valveStemGeo = new THREE.CylinderGeometry(
    0.018 * scale,
    0.018 * scale,
    0.08 * scale,
    12
  );
  const valveStem = new THREE.Mesh(valveStemGeo, chromeMat);
  valveStem.rotation.x = Math.PI / 2 - 0.2;
  valveStem.position.set(0, -R_STEP * 0.95, DEPTH * 0.24);

  const valveCapGeo = new THREE.CylinderGeometry(
    0.022 * scale,
    0.022 * scale,
    0.03 * scale,
    12
  );
  const valveCap = new THREE.Mesh(valveCapGeo, lugMat);
  valveCap.rotation.x = Math.PI / 2 - 0.2;
  valveCap.position.set(0, -R_STEP * 0.95, DEPTH * 0.28);

  valveGroup.add(valveStem);
  valveGroup.add(valveCap);
  wheelGroup.add(valveGroup);

  // 6. ================= OPTIONAL BRAKE ROTOR & CALIPER =================
  if (includeBrakes) {
    const brakeRotorMat = new THREE.MeshStandardMaterial({
      color: 0x5a5e69,
      metalness: 0.95,
      roughness: 0.22,
    });
    const caliperMat = new THREE.MeshStandardMaterial({
      color: new THREE.Color(caliperColor),
      metalness: 0.5,
      roughness: 0.25,
    });

    // Slotted Carbon/Steel Rotor Disc
    const rotorGeo = new THREE.CylinderGeometry(
      R_OUTER * 0.78,
      R_OUTER * 0.78,
      0.04 * scale,
      36
    );
    const rotor = new THREE.Mesh(rotorGeo, brakeRotorMat);
    rotor.rotation.x = Math.PI / 2;
    rotor.position.z = -DEPTH * 0.22;
    wheelGroup.add(rotor);

    // Multi-Piston High Performance Caliper
    const caliperGeo = new THREE.BoxGeometry(
      0.22 * scale,
      0.52 * scale,
      0.18 * scale
    );
    const caliper = new THREE.Mesh(caliperGeo, caliperMat);
    caliper.position.set(
      R_OUTER * 0.62 * (isLeftMount ? 1 : -1),
      R_OUTER * 0.28,
      -DEPTH * 0.18
    );
    wheelGroup.add(caliper);
  }

  return wheelGroup;
}
