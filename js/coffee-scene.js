/* ==========================================================
   L'Atelier du Café — 3D Coffee Pouring Scene
   نیاز به: js/three.min.js (Three.js r125)
   ========================================================== */
(function () {
  const container = document.getElementById("threejs-container-ANIMATION_17");
  const devicePixelRatio = window.devicePixelRatio || 1;
  const width = container.clientWidth || window.innerWidth;
  const height = container.clientHeight || window.innerHeight;

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(38, width / height, 0.1, 100);
  camera.position.set(0, 1.45, 4.3);
  camera.lookAt(0, -0.12, 0);

  const renderer = new THREE.WebGLRenderer({
    antialias: true,
    alpha: true,
    powerPreference: "high-performance",
  });
  renderer.setSize(width, height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.35;
  container.appendChild(renderer.domElement);

  // نورپردازی گرم و لوکس کافه
  const ambient = new THREE.AmbientLight(0xfff7ee, 2.2);
  scene.add(ambient);

  const keyLight = new THREE.DirectionalLight(0xffeed9, 3.6);
  keyLight.position.set(3.2, 7.2, 4.0);
  keyLight.castShadow = true;
  keyLight.shadow.mapSize.width = 1024;
  keyLight.shadow.mapSize.height = 1024;
  scene.add(keyLight);

  const rimLight = new THREE.DirectionalLight(0xe8bb5a, 2.8);
  rimLight.position.set(-4.5, 4.2, -2.2);
  scene.add(rimLight);

  const warmUnderglow = new THREE.PointLight(0xe28155, 1.9, 6.5);
  warmUnderglow.position.set(0, -0.5, 2.2);
  scene.add(warmUnderglow);

  const sceneGroup = new THREE.Group();
  scene.add(sceneGroup);

  // متریال‌ها
  const ceramicCupMat = new THREE.MeshStandardMaterial({
    color: 0x1b0f0a,
    roughness: 0.15,
    metalness: 0.22,
  });
  const ceramicCupInteriorMat = new THREE.MeshStandardMaterial({
    color: 0x24150e,
    roughness: 0.22,
    metalness: 0.12,
  });
  const brushedGoldMat = new THREE.MeshStandardMaterial({
    color: 0xdfb153,
    roughness: 0.22,
    metalness: 0.85,
  });
  const matteKettleMat = new THREE.MeshStandardMaterial({
    color: 0x141211,
    roughness: 0.36,
    metalness: 0.76,
  });
  const copperRoseMat = new THREE.MeshStandardMaterial({
    color: 0xc8754b,
    roughness: 0.24,
    metalness: 0.68,
  });
  const walnutWoodMat = new THREE.MeshStandardMaterial({
    color: 0x48240e,
    roughness: 0.62,
    metalness: 0.05,
  });
  const coffeeLiquidMat = new THREE.MeshPhysicalMaterial({
    color: 0x1e0a03,
    emissive: 0x0c0401,
    roughness: 0.04,
    metalness: 0.1,
    transmission: 0.45,
    ior: 1.34,
    transparent: true,
    opacity: 0.98,
  });
  const cremaFoamMat = new THREE.MeshStandardMaterial({
    color: 0xce9150,
    roughness: 0.42,
    metalness: 0.05,
  });
  const fluidStreamCoreMat = new THREE.MeshPhysicalMaterial({
    color: 0x240c04,
    roughness: 0.06,
    metalness: 0.12,
    transmission: 0.36,
    ior: 1.34,
    transparent: true,
    opacity: 0.96,
  });
  const fluidStreamSheenMat = new THREE.MeshStandardMaterial({
    color: 0xdf9248,
    roughness: 0.1,
    metalness: 0.38,
    transparent: true,
    opacity: 0.72,
    blending: THREE.AdditiveBlending,
  });

  // فنجان سرامیکی
  const cupContainer = new THREE.Group();
  cupContainer.position.set(0, -0.72, 0);
  sceneGroup.add(cupContainer);

  const saucerOuter = new THREE.Mesh(
    new THREE.CylinderGeometry(1.5, 0.98, 0.1, 48),
    ceramicCupMat,
  );
  saucerOuter.position.y = -0.52;
  saucerOuter.receiveShadow = true;
  cupContainer.add(saucerOuter);

  const saucerGoldBevel = new THREE.Mesh(
    new THREE.TorusGeometry(1.49, 0.032, 16, 48),
    brushedGoldMat,
  );
  saucerGoldBevel.rotation.x = Math.PI / 2;
  saucerGoldBevel.position.y = -0.47;
  cupContainer.add(saucerGoldBevel);

  const cupFoot = new THREE.Mesh(
    new THREE.CylinderGeometry(0.68, 0.64, 0.1, 40),
    ceramicCupMat,
  );
  cupFoot.position.y = -0.46;
  cupContainer.add(cupFoot);

  const cupOuterWall = new THREE.Mesh(
    new THREE.CylinderGeometry(0.98, 0.68, 1.12, 48, 1, true),
    ceramicCupMat,
  );
  cupOuterWall.position.y = 0.1;
  cupOuterWall.castShadow = true;
  cupOuterWall.receiveShadow = true;
  cupContainer.add(cupOuterWall);

  const cupInnerWall = new THREE.Mesh(
    new THREE.CylinderGeometry(0.92, 0.63, 1.08, 48, 1, true),
    ceramicCupInteriorMat,
  );
  cupInnerWall.position.y = 0.11;
  cupInnerWall.scale.set(-1, 1, 1);
  cupContainer.add(cupInnerWall);

  const cupInnerFloor = new THREE.Mesh(
    new THREE.CircleGeometry(0.62, 40),
    ceramicCupInteriorMat,
  );
  cupInnerFloor.rotation.x = -Math.PI / 2;
  cupInnerFloor.position.y = -0.41;
  cupContainer.add(cupInnerFloor);

  const cupLip = new THREE.Mesh(
    new THREE.TorusGeometry(0.95, 0.045, 16, 48),
    brushedGoldMat,
  );
  cupLip.rotation.x = Math.PI / 2;
  cupLip.position.y = 0.66;
  cupContainer.add(cupLip);

  const handleSpline = new THREE.CatmullRomCurve3([
    new THREE.Vector3(0.86, 0.5, 0),
    new THREE.Vector3(1.42, 0.4, 0),
    new THREE.Vector3(1.46, -0.06, 0),
    new THREE.Vector3(1.1, -0.28, 0),
    new THREE.Vector3(0.72, -0.22, 0),
  ]);
  const handleMesh = new THREE.Mesh(
    new THREE.TubeGeometry(handleSpline, 40, 0.075, 16, false),
    ceramicCupMat,
  );
  handleMesh.castShadow = true;
  cupContainer.add(handleMesh);

  // مایع درون فنجان
  const liquidSurface = new THREE.Mesh(
    new THREE.CircleGeometry(0.92, 48),
    coffeeLiquidMat,
  );
  liquidSurface.rotation.x = -Math.PI / 2;
  liquidSurface.position.y = -0.4;
  liquidSurface.scale.set(0.66, 0.66, 0.66);
  cupContainer.add(liquidSurface);

  const cremaSwirl = new THREE.Mesh(
    new THREE.RingGeometry(0.08, 0.88, 48),
    cremaFoamMat,
  );
  cremaSwirl.rotation.x = -Math.PI / 2;
  cremaSwirl.position.y = -0.395;
  cremaSwirl.scale.set(0.66, 0.66, 0.66);
  cupContainer.add(cremaSwirl);
  cremaSwirl.visible = false;

  const liquidColumnGeo = new THREE.CylinderGeometry(
    0.92,
    0.64,
    1.0,
    40,
    1,
    false,
  );
  liquidColumnGeo.translate(0, 0.5, 0);
  const liquidColumn = new THREE.Mesh(liquidColumnGeo, coffeeLiquidMat);
  liquidColumn.position.y = -0.41;
  liquidColumn.scale.set(1, 0.0001, 1);
  cupContainer.add(liquidColumn);

  const rippleDisc1 = new THREE.Mesh(
    new THREE.RingGeometry(0.03, 0.38, 36),
    cremaFoamMat,
  );
  rippleDisc1.rotation.x = -Math.PI / 2;
  rippleDisc1.position.y = -0.39;
  cupContainer.add(rippleDisc1);
  rippleDisc1.visible = false;

  // کتری
  const kettle = new THREE.Group();
  kettle.position.set(3.2, 2.9, 0.2);
  sceneGroup.add(kettle);

  const kBody = new THREE.Mesh(
    new THREE.CylinderGeometry(0.55, 0.86, 1.3, 44),
    matteKettleMat,
  );
  kBody.castShadow = true;
  kettle.add(kBody);

  const kBase = new THREE.Mesh(
    new THREE.CylinderGeometry(0.865, 0.875, 0.22, 44),
    copperRoseMat,
  );
  kBase.position.y = -0.55;
  kettle.add(kBase);

  const kLid = new THREE.Mesh(
    new THREE.CylinderGeometry(0.52, 0.56, 0.12, 36),
    matteKettleMat,
  );
  kLid.position.y = 0.7;
  kettle.add(kLid);

  const kKnob = new THREE.Mesh(
    new THREE.CylinderGeometry(0.12, 0.09, 0.16, 20),
    walnutWoodMat,
  );
  kKnob.position.y = 0.82;
  kettle.add(kKnob);

  const spoutSpline = new THREE.CatmullRomCurve3([
    new THREE.Vector3(-0.72, -0.38, 0),
    new THREE.Vector3(-1.22, -0.18, 0),
    new THREE.Vector3(-1.46, 0.38, 0),
    new THREE.Vector3(-1.32, 0.94, 0),
    new THREE.Vector3(-1.54, 0.86, 0),
  ]);
  const spout = new THREE.Mesh(
    new THREE.TubeGeometry(spoutSpline, 48, 0.054, 16, false),
    matteKettleMat,
  );
  spout.castShadow = true;
  kettle.add(spout);

  const spoutTip = new THREE.Mesh(
    new THREE.CylinderGeometry(0.056, 0.058, 0.09, 16),
    copperRoseMat,
  );
  spoutTip.position.set(-1.53, 0.86, 0);
  spoutTip.rotation.z = 0.4;
  kettle.add(spoutTip);

  const handlePath = new THREE.CatmullRomCurve3([
    new THREE.Vector3(0.72, 0.46, 0),
    new THREE.Vector3(1.3, 0.56, 0),
    new THREE.Vector3(1.48, -0.18, 0),
    new THREE.Vector3(0.84, -0.36, 0),
  ]);
  const kHandle = new THREE.Mesh(
    new THREE.TubeGeometry(handlePath, 36, 0.082, 14, false),
    walnutWoodMat,
  );
  kettle.add(kHandle);

  // جریان قهوه
  const streamGroup = new THREE.Group();
  sceneGroup.add(streamGroup);

  let streamCoreMesh = null;
  let streamSheenMesh = null;

  const splashCount = 32;
  const splashGeo = new THREE.SphereGeometry(0.034, 8, 8);
  const splashMat = new THREE.MeshStandardMaterial({
    color: 0x2b0f04,
    roughness: 0.1,
    metalness: 0.25,
  });
  const splashes = [];
  for (let i = 0; i < splashCount; i++) {
    const m = new THREE.Mesh(splashGeo, splashMat);
    m.visible = false;
    cupContainer.add(m);
    splashes.push({ mesh: m, vx: 0, vy: 0, vz: 0, life: 0 });
  }

  // بخار
  const steamCount = 36;
  const steamGeo = new THREE.BufferGeometry();
  const steamPos = new Float32Array(steamCount * 3);
  const steamVel = [];
  for (let i = 0; i < steamCount; i++) {
    steamPos[i * 3] = (Math.random() - 0.5) * 0.4;
    steamPos[i * 3 + 1] = 0.5 + Math.random() * 1.5;
    steamPos[i * 3 + 2] = (Math.random() - 0.5) * 0.4;
    steamVel.push({
      speedY: 0.012 + Math.random() * 0.016,
      drift: (Math.random() - 0.5) * 0.007,
      seed: Math.random() * 10,
    });
  }
  steamGeo.setAttribute("position", new THREE.BufferAttribute(steamPos, 3));

  const steamCanv = document.createElement("canvas");
  steamCanv.width = 64;
  steamCanv.height = 64;
  const sCtx = steamCanv.getContext("2d");
  const sGrad = sCtx.createRadialGradient(32, 32, 0, 32, 32, 32);
  sGrad.addColorStop(0, "rgba(255, 245, 230, 0.45)");
  sGrad.addColorStop(0.5, "rgba(240, 225, 210, 0.18)");
  sGrad.addColorStop(1, "rgba(255, 255, 255, 0)");
  sCtx.fillStyle = sGrad;
  sCtx.fillRect(0, 0, 64, 64);

  const steamMat = new THREE.PointsMaterial({
    size: 0.65,
    map: new THREE.CanvasTexture(steamCanv),
    transparent: true,
    opacity: 0,
    depthWrite: false,
    blending: THREE.NormalBlending,
  });
  const steamPoints = new THREE.Points(steamGeo, steamMat);
  cupContainer.add(steamPoints);

  // اسکرول
  let rawScrollProgress = 0;
  function onScroll() {
    const maxScroll =
      document.documentElement.scrollHeight - window.innerHeight || 1;
    const curr = window.scrollY || window.pageYOffset || 0;
    rawScrollProgress = Math.min(Math.max(curr / maxScroll, 0), 1);
  }
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  let mouseX = 0,
    mouseY = 0;
  window.addEventListener("mousemove", (e) => {
    mouseX = (e.clientX / window.innerWidth) * 2 - 1;
    mouseY = -(e.clientY / window.innerHeight) * 2 + 1;
  });

  const clock = new THREE.Clock();

  function animate() {
    requestAnimationFrame(animate);
    const t = clock.getElapsedTime();

    let targetKettleX = 3.2;
    let targetKettleY = 2.9;
    let targetKettleRotZ = 0;
    let isPouring = false;
    let fillFraction = 0;

    if (rawScrollProgress < 0.06) {
      const p = rawScrollProgress / 0.06;
      targetKettleX = 3.2 - p * 1.8;
      targetKettleY = 2.9 - p * 1.72;
      targetKettleRotZ = 0;
      fillFraction = 0;
      isPouring = false;
    } else if (rawScrollProgress >= 0.06 && rawScrollProgress <= 0.9) {
      const p = (rawScrollProgress - 0.06) / 0.84;
      fillFraction = p;
      targetKettleX = 1.4 - Math.sin(p * Math.PI) * 0.05;
      targetKettleY = 1.18 + Math.sin(t * 1.8) * 0.015;
      targetKettleRotZ = 0.62 + Math.sin(t * 3.2) * 0.012;
      isPouring = true;
    } else if (rawScrollProgress > 0.9 && rawScrollProgress <= 0.98) {
      const p = (rawScrollProgress - 0.9) / 0.08;
      fillFraction = 1.0;
      targetKettleRotZ = 0.62 * (1 - p);
      targetKettleX = 1.4 + p * 2.2;
      targetKettleY = 1.18 + p * 1.8;
      isPouring = false;
    } else {
      fillFraction = 1.0;
      targetKettleX = 4.2;
      targetKettleY = 3.2;
      targetKettleRotZ = 0;
      isPouring = false;
    }

    kettle.position.x += (targetKettleX - kettle.position.x) * 0.12;
    kettle.position.y += (targetKettleY - kettle.position.y) * 0.12;
    kettle.rotation.z += (targetKettleRotZ - kettle.rotation.z) * 0.12;
    kettle.rotation.y = -0.22 + mouseX * 0.12;

    const targetLiquidY = -0.4 + fillFraction * 0.96;
    liquidSurface.position.y +=
      (targetLiquidY - liquidSurface.position.y) * 0.1;

    const liquidRadiusFactor = 0.65 + fillFraction * 0.35;
    liquidSurface.scale.set(liquidRadiusFactor, liquidRadiusFactor, 1);

    const columnH = Math.max(liquidSurface.position.y - -0.41, 0.0001);
    liquidColumn.scale.set(liquidRadiusFactor, columnH, liquidRadiusFactor);

    if (fillFraction > 0.04) {
      cremaSwirl.visible = true;
      cremaSwirl.position.y = liquidSurface.position.y + 0.005;
      cremaSwirl.scale.set(liquidRadiusFactor, liquidRadiusFactor, 1);
      cremaSwirl.rotation.z += 0.005;
    } else {
      cremaSwirl.visible = false;
    }

    if (fillFraction > 0.2) {
      steamMat.opacity = Math.min((fillFraction - 0.2) * 1.3, 0.45);
      const pos = steamGeo.attributes.position.array;
      for (let i = 0; i < steamCount; i++) {
        pos[i * 3 + 1] += steamVel[i].speedY;
        pos[i * 3] +=
          Math.sin(t * 2.5 + steamVel[i].seed) * 0.003 + steamVel[i].drift;
        if (pos[i * 3 + 1] > 2.5) {
          pos[i * 3 + 1] = liquidSurface.position.y + 0.1;
          pos[i * 3] = (Math.random() - 0.5) * 0.35;
        }
      }
      steamGeo.attributes.position.needsUpdate = true;
    } else {
      steamMat.opacity = 0;
    }

    if (isPouring) {
      rippleDisc1.visible = true;
      rippleDisc1.position.y = liquidSurface.position.y + 0.008;
      const rScale = 0.9 + Math.sin(t * 14) * 0.25;
      rippleDisc1.scale.set(rScale, rScale, 1);

      const localSpoutTip = new THREE.Vector3(-1.54, 0.86, 0);
      const worldSpoutTip = localSpoutTip.applyMatrix4(kettle.matrixWorld);

      const localCupTarget = new THREE.Vector3(0, liquidSurface.position.y, 0);
      const worldCupTarget = localCupTarget.applyMatrix4(
        cupContainer.matrixWorld,
      );

      const midPoint1 = new THREE.Vector3(
        worldSpoutTip.x * 0.65 +
          worldCupTarget.x * 0.35 +
          Math.sin(t * 7.5) * 0.012,
        worldSpoutTip.y * 0.62 + worldCupTarget.y * 0.38,
        (worldSpoutTip.z + worldCupTarget.z) * 0.5,
      );
      const midPoint2 = new THREE.Vector3(
        worldCupTarget.x + Math.sin(t * 11) * 0.01,
        worldCupTarget.y + 0.15,
        worldCupTarget.z,
      );

      const fluidCurve = new THREE.CatmullRomCurve3([
        worldSpoutTip,
        midPoint1,
        midPoint2,
        worldCupTarget,
      ]);

      const streamRadius = 0.04 + Math.sin(t * 16) * 0.005;
      const newStreamGeo = new THREE.TubeGeometry(
        fluidCurve,
        32,
        streamRadius,
        14,
        false,
      );

      if (!streamCoreMesh) {
        streamCoreMesh = new THREE.Mesh(newStreamGeo, fluidStreamCoreMat);
        streamSheenMesh = new THREE.Mesh(newStreamGeo, fluidStreamSheenMat);
        streamSheenMesh.scale.set(1.04, 1.04, 1.04);
        streamGroup.add(streamCoreMesh);
        streamGroup.add(streamSheenMesh);
      } else {
        streamCoreMesh.geometry.dispose();
        streamCoreMesh.geometry = newStreamGeo;
        streamSheenMesh.geometry = newStreamGeo;
      }
      streamGroup.visible = true;

      splashes.forEach((sp) => {
        if (!sp.mesh.visible || sp.life <= 0) {
          sp.mesh.visible = true;
          sp.mesh.position.set(
            (Math.random() - 0.5) * 0.12,
            liquidSurface.position.y + 0.02,
            (Math.random() - 0.5) * 0.12,
          );
          const ang = Math.random() * Math.PI * 2;
          const spd = 0.016 + Math.random() * 0.035;
          sp.vx = Math.cos(ang) * spd;
          sp.vy = 0.032 + Math.random() * 0.042;
          sp.vz = Math.sin(ang) * spd;
          sp.life = 1.0;
          const s = 0.5 + Math.random() * 0.5;
          sp.mesh.scale.set(s, s, s);
        } else {
          sp.mesh.position.x += sp.vx;
          sp.mesh.position.y += sp.vy;
          sp.mesh.position.z += sp.vz;
          sp.vy -= 0.0035;
          sp.life -= 0.04;
          if (sp.mesh.position.y < liquidSurface.position.y) {
            sp.mesh.visible = false;
          }
        }
      });
    } else {
      streamGroup.visible = false;
      rippleDisc1.visible = false;
      splashes.forEach((sp) => {
        sp.mesh.visible = false;
        sp.life = 0;
      });
    }

    cupContainer.position.y = -0.72 + Math.sin(t * 1.1) * 0.025;
    cupContainer.rotation.y = t * 0.08 + mouseX * 0.28;
    cupContainer.rotation.x = 0.12 + mouseY * 0.08;

    renderer.render(scene, camera);
  }

  animate();

  window.addEventListener("resize", () => {
    const w = container.clientWidth || window.innerWidth;
    const h = container.clientHeight || window.innerHeight;
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
    renderer.setSize(w, h);
  });
})();
