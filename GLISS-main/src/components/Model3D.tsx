import { useRef, useEffect } from 'react';
import * as THREE from 'three';

export default function Model3D() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    // ============ CONFIGURACIÓN BASE ============
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0xf5f4fb);

    const width = containerRef.current.clientWidth;
    const height = containerRef.current.clientHeight;
    const camera = new THREE.PerspectiveCamera(60, width / height, 0.1, 1000);
    camera.position.set(0, 0.5, 2.8);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFShadowShadowMap;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1;
    containerRef.current.appendChild(renderer.domElement);

    const group = new THREE.Group();
    scene.add(group);

    // ============ CREAR TEXTURAS ============
    const createSkinTexture = () => {
      const canvas = document.createElement('canvas');
      canvas.width = 512;
      canvas.height = 512;
      const ctx = canvas.getContext('2d');
      if (!ctx) return new THREE.CanvasTexture(canvas);
      
      ctx.fillStyle = '#f5c99f';
      ctx.fillRect(0, 0, 512, 512);
      
      for (let i = 0; i < 50; i++) {
        ctx.fillStyle = `rgba(200, 140, 100, ${Math.random() * 0.3})`;
        ctx.fillRect(Math.random() * 512, Math.random() * 512, Math.random() * 100 + 50, Math.random() * 100 + 50);
      }
      
      return new THREE.CanvasTexture(canvas);
    };

    const createHairTexture = () => {
      const canvas = document.createElement('canvas');
      canvas.width = 512;
      canvas.height = 512;
      const ctx = canvas.getContext('2d');
      if (!ctx) return new THREE.CanvasTexture(canvas);
      
      ctx.fillStyle = '#3d2817';
      ctx.fillRect(0, 0, 512, 512);
      
      for (let i = 0; i < 100; i++) {
        ctx.strokeStyle = `rgba(0, 0, 0, ${Math.random() * 0.5})`;
        ctx.lineWidth = Math.random() * 2 + 1;
        ctx.beginPath();
        ctx.moveTo(Math.random() * 512, Math.random() * 512);
        ctx.lineTo(Math.random() * 512, Math.random() * 512);
        ctx.stroke();
      }
      
      return new THREE.CanvasTexture(canvas);
    };

    const createCheckPattern = () => {
      const canvas = document.createElement('canvas');
      canvas.width = 256;
      canvas.height = 256;
      const ctx = canvas.getContext('2d');
      if (!ctx) return new THREE.CanvasTexture(canvas);
      
      ctx.fillStyle = '#6d3d6d';
      ctx.fillRect(0, 0, 256, 256);
      
      const checkSize = 32;
      ctx.fillStyle = '#8b5a8b';
      for (let i = 0; i < 256; i += checkSize * 2) {
        for (let j = 0; j < 256; j += checkSize * 2) {
          ctx.fillRect(i, j, checkSize, checkSize);
          ctx.fillRect(i + checkSize, j + checkSize, checkSize, checkSize);
        }
      }
      
      return new THREE.CanvasTexture(canvas);
    };

    // ============ MATERIALES ============
    const skinMap = createSkinTexture();
    const hairMap = createHairTexture();
    const checkMap = createCheckPattern();

    const skinMaterial = new THREE.MeshStandardMaterial({
      map: skinMap,
      color: 0xf5c99f,
      roughness: 0.5,
      metalness: 0,
      side: THREE.FrontSide
    });

    const hairMaterial = new THREE.MeshStandardMaterial({
      map: hairMap,
      color: 0x3d2817,
      roughness: 0.85,
      metalness: 0
    });

    const blazerMaterial = new THREE.MeshStandardMaterial({
      color: 0xc9a876,
      roughness: 0.6,
      metalness: 0.1
    });

    const shirtMaterial = new THREE.MeshStandardMaterial({
      map: checkMap,
      color: 0x7d3d7d,
      roughness: 0.7,
      metalness: 0
    });

    const pantsMaterial = new THREE.MeshStandardMaterial({
      color: 0x2a3a4a,
      roughness: 0.8,
      metalness: 0.1
    });

    const shoeMaterial = new THREE.MeshStandardMaterial({
      color: 0x5a3a3a,
      roughness: 0.7,
      metalness: 0.1
    });

    // ============ CABEZA ============
    const headGeometry = new THREE.SphereGeometry(0.32, 64, 64);
    const head = new THREE.Mesh(headGeometry, skinMaterial);
    head.position.y = 2.05;
    head.castShadow = true;
    head.receiveShadow = true;
    group.add(head);

    // ============ CABELLO ============
    const hairGeometry = new THREE.SphereGeometry(0.35, 32, 32);
    const hair = new THREE.Mesh(hairGeometry, hairMaterial);
    hair.position.y = 2.1;
    hair.scale.set(1, 1.15, 1);
    hair.castShadow = true;
    hair.receiveShadow = true;
    group.add(hair);

    // ============ OJOS ============
    const eyeGeometry = new THREE.SphereGeometry(0.095, 16, 16);
    const eyeMaterial = new THREE.MeshStandardMaterial({
      color: 0x8b6f47,
      roughness: 0.2,
      metalness: 0.3
    });

    const leftEye = new THREE.Mesh(eyeGeometry, eyeMaterial);
    leftEye.position.set(-0.12, 2.08, 0.28);
    leftEye.castShadow = true;
    group.add(leftEye);

    const rightEye = new THREE.Mesh(eyeGeometry, eyeMaterial);
    rightEye.position.set(0.12, 2.08, 0.28);
    rightEye.castShadow = true;
    group.add(rightEye);

    // Brillo en ojos
    const eyeShineGeometry = new THREE.SphereGeometry(0.035, 12, 12);
    const eyeShineMaterial = new THREE.MeshStandardMaterial({
      color: 0xffffff,
      roughness: 0,
      metalness: 0.5,
      emissive: 0xffffff,
      emissiveIntensity: 0.3
    });

    const leftEyeShine = new THREE.Mesh(eyeShineGeometry, eyeShineMaterial);
    leftEyeShine.position.set(-0.125, 2.1, 0.34);
    group.add(leftEyeShine);

    const rightEyeShine = new THREE.Mesh(eyeShineGeometry, eyeShineMaterial);
    rightEyeShine.position.set(0.125, 2.1, 0.34);
    group.add(rightEyeShine);

    // ============ NARIZ ============
    const noseGeometry = new THREE.ConeGeometry(0.04, 0.12, 8);
    const noseMaterial = new THREE.MeshStandardMaterial({
      color: 0xf0b090,
      roughness: 0.5,
      metalness: 0
    });
    const nose = new THREE.Mesh(noseGeometry, noseMaterial);
    nose.position.set(0, 1.95, 0.3);
    nose.rotation.x = Math.PI / 2;
    nose.castShadow = true;
    group.add(nose);

    // ============ BOCA ============
    const mouthGeometry = new THREE.BoxGeometry(0.15, 0.04, 0.08);
    const mouthMaterial = new THREE.MeshStandardMaterial({
      color: 0xb07070,
      roughness: 0.6,
      metalness: 0
    });
    const mouth = new THREE.Mesh(mouthGeometry, mouthMaterial);
    mouth.position.set(0, 1.82, 0.31);
    mouth.castShadow = true;
    group.add(mouth);

    // ============ CUELLO ============
    const neckGeometry = new THREE.CylinderGeometry(0.14, 0.16, 0.3, 32);
    const neck = new THREE.Mesh(neckGeometry, skinMaterial);
    neck.position.y = 1.72;
    neck.castShadow = true;
    neck.receiveShadow = true;
    group.add(neck);

    // ============ BLAZER (CHAQUETA CARAMELO) ============
    const blazerChestGeometry = new THREE.BoxGeometry(0.58, 0.68, 0.3);
    const blazerChest = new THREE.Mesh(blazerChestGeometry, blazerMaterial);
    blazerChest.position.y = 1.12;
    blazerChest.castShadow = true;
    blazerChest.receiveShadow = true;
    group.add(blazerChest);

    // Hombros del blazer
    const blazerShoulderGeometry = new THREE.BoxGeometry(0.72, 0.18, 0.32);
    const blazerShoulders = new THREE.Mesh(blazerShoulderGeometry, blazerMaterial);
    blazerShoulders.position.y = 1.5;
    blazerShoulders.castShadow = true;
    blazerShoulders.receiveShadow = true;
    group.add(blazerShoulders);

    // ============ CAMISA (PÚRPURA CON CUADROS) ============
    const shirtGeometry = new THREE.BoxGeometry(0.45, 0.45, 0.32);
    const shirt = new THREE.Mesh(shirtGeometry, shirtMaterial);
    shirt.position.set(0, 1.08, 0.02);
    shirt.castShadow = true;
    shirt.receiveShadow = true;
    group.add(shirt);

    // Corbata púrpura
    const tieGeometry = new THREE.BoxGeometry(0.08, 0.3, 0.04);
    const tieMaterial = new THREE.MeshStandardMaterial({
      color: 0x5a2a5a,
      roughness: 0.6,
      metalness: 0
    });
    const tie = new THREE.Mesh(tieGeometry, tieMaterial);
    tie.position.set(0, 0.95, 0.02);
    tie.castShadow = true;
    group.add(tie);

    // ============ PANTALONES (AZUL OSCURO) ============
    const pantsGeometry = new THREE.BoxGeometry(0.52, 0.75, 0.3);
    const pants = new THREE.Mesh(pantsGeometry, pantsMaterial);
    pants.position.y = 0.25;
    pants.castShadow = true;
    pants.receiveShadow = true;
    group.add(pants);

    // ============ BRAZOS (CILINDRO CONTINUO) ============
    const armGeometry = new THREE.CylinderGeometry(0.12, 0.095, 0.95, 32);

    // Brazo izquierdo
    const leftArm = new THREE.Mesh(armGeometry, skinMaterial);
    leftArm.rotation.z = 0.5;
    leftArm.position.set(-0.68, 1.05, 0.1);
    leftArm.castShadow = true;
    leftArm.receiveShadow = true;
    group.add(leftArm);

    // Brazo derecho
    const rightArm = new THREE.Mesh(armGeometry, skinMaterial);
    rightArm.rotation.z = -0.5;
    rightArm.position.set(0.68, 1.05, 0.1);
    rightArm.castShadow = true;
    rightArm.receiveShadow = true;
    group.add(rightArm);

    // ============ MANOS ============
    const handGeometry = new THREE.BoxGeometry(0.1, 0.15, 0.12);
    const leftHand = new THREE.Mesh(handGeometry, skinMaterial);
    leftHand.position.set(-1.05, 0.3, 0.2);
    leftHand.rotation.z = 0.5;
    leftHand.castShadow = true;
    leftHand.receiveShadow = true;
    group.add(leftHand);

    const rightHand = new THREE.Mesh(handGeometry, skinMaterial);
    rightHand.position.set(1.05, 0.3, 0.2);
    rightHand.rotation.z = -0.5;
    rightHand.castShadow = true;
    rightHand.receiveShadow = true;
    group.add(rightHand);

    // ============ PIERNAS ============
    const legGeometry = new THREE.CylinderGeometry(0.11, 0.105, 0.85, 32);

    const leftLeg = new THREE.Mesh(legGeometry, pantsMaterial);
    leftLeg.position.set(-0.2, -0.55, 0);
    leftLeg.castShadow = true;
    leftLeg.receiveShadow = true;
    group.add(leftLeg);

    const rightLeg = new THREE.Mesh(legGeometry, pantsMaterial);
    rightLeg.position.set(0.2, -0.55, 0);
    rightLeg.castShadow = true;
    rightLeg.receiveShadow = true;
    group.add(rightLeg);

    // ============ ZAPATOS (BORDO/MARRÓN OSCURO) ============
    const shoeGeometry = new THREE.BoxGeometry(0.22, 0.18, 0.42);
    const leftShoe = new THREE.Mesh(shoeGeometry, shoeMaterial);
    leftShoe.position.set(-0.2, -1.45, 0);
    leftShoe.castShadow = true;
    leftShoe.receiveShadow = true;
    group.add(leftShoe);

    const rightShoe = new THREE.Mesh(shoeGeometry, shoeMaterial);
    rightShoe.position.set(0.2, -1.45, 0);
    rightShoe.castShadow = true;
    rightShoe.receiveShadow = true;
    group.add(rightShoe);

    // Suela de zapatos
    const soleGeometry = new THREE.BoxGeometry(0.2, 0.06, 0.38);
    const soleMaterial = new THREE.MeshStandardMaterial({
      color: 0x3a2a2a,
      roughness: 0.8,
      metalness: 0
    });

    const leftSole = new THREE.Mesh(soleGeometry, soleMaterial);
    leftSole.position.set(-0.2, -1.3, 0.15);
    leftSole.castShadow = true;
    group.add(leftSole);

    const rightSole = new THREE.Mesh(soleGeometry, soleMaterial);
    rightSole.position.set(0.2, -1.3, 0.15);
    rightSole.castShadow = true;
    group.add(rightSole);

    // ============ ILUMINACIÓN PROFESIONAL ============
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.55);
    scene.add(ambientLight);

    const mainLight = new THREE.DirectionalLight(0xffffff, 1.3);
    mainLight.position.set(5, 8, 6);
    mainLight.castShadow = true;
    mainLight.shadow.mapSize.set(2048, 2048);
    mainLight.shadow.camera.near = 0.1;
    mainLight.shadow.camera.far = 50;
    mainLight.shadow.camera.left = -10;
    mainLight.shadow.camera.right = 10;
    mainLight.shadow.camera.top = 10;
    mainLight.shadow.camera.bottom = -10;
    mainLight.shadow.bias = -0.0001;
    scene.add(mainLight);

    const fillLight = new THREE.DirectionalLight(0xffffff, 0.6);
    fillLight.position.set(-5, 4, -5);
    scene.add(fillLight);

    const rimLight = new THREE.PointLight(0xffffff, 0.5);
    rimLight.position.set(0, 1.5, -2.5);
    scene.add(rimLight);

    // ============ INTERACCIÓN ============
    let isDragging = false;
    let previousMousePosition = { x: 0, y: 0 };
    let autoRotate = true;

    containerRef.current.addEventListener('mousedown', (e) => {
      isDragging = true;
      autoRotate = false;
      previousMousePosition = { x: e.clientX, y: e.clientY };
    });

    containerRef.current.addEventListener('mousemove', (e) => {
      if (isDragging) {
        const deltaX = e.clientX - previousMousePosition.x;
        const deltaY = e.clientY - previousMousePosition.y;

        group.rotation.y += deltaX * 0.005;
        group.rotation.x += deltaY * 0.005;
        group.rotation.x = Math.max(-Math.PI / 4, Math.min(Math.PI / 4, group.rotation.x));

        previousMousePosition = { x: e.clientX, y: e.clientY };
      }
    });

    containerRef.current.addEventListener('mouseup', () => {
      isDragging = false;
      autoRotate = true;
    });

    containerRef.current.addEventListener('mouseleave', () => {
      isDragging = false;
      autoRotate = true;
    });

    containerRef.current.addEventListener('wheel', (e) => {
      e.preventDefault();
      camera.position.z += e.deltaY * 0.003;
      camera.position.z = Math.max(1.5, Math.min(5, camera.position.z));
    });

    // ============ ANIMACIÓN ============
    let animationId: number;
    const animate = () => {
      animationId = requestAnimationFrame(animate);

      if (autoRotate && !isDragging) {
        group.rotation.y += 0.0025;
      }

      renderer.render(scene, camera);
    };
    animate();

    // ============ RESIZE ============
    const handleResize = () => {
      if (containerRef.current) {
        const newWidth = containerRef.current.clientWidth;
        const newHeight = containerRef.current.clientHeight;
        camera.aspect = newWidth / newHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(newWidth, newHeight);
      }
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      if (containerRef.current && renderer.domElement.parentNode === containerRef.current) {
        containerRef.current.removeChild(renderer.domElement);
      }
      cancelAnimationFrame(animationId);
    };
  }, []);

  return <div ref={containerRef} className="w-full h-full" />;
}
