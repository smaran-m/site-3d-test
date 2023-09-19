import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

let scene, camera, renderer;

function init() {
    scene = new THREE.Scene();
    scene.background = new THREE.Color(0xdddddd); // Set to gray

    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    // Lights
    const ambientLight = new THREE.AmbientLight(0x404040, 1); // Soft white light
    scene.add(ambientLight);
    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5); // White directional light
    scene.add(directionalLight);

    camera.position.z = 5;

    // Box Geometry Test
    const geometry = new THREE.BoxGeometry(1, 1, 1);
    const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
    const cube = new THREE.Mesh(geometry, material);
    scene.add(cube);

    // Load GLB model (Keep this if you still want to load the model alongside the box)
    const loader = new GLTFLoader();
    loader.load('/models/sources/myModel.glb', (gltf) => {
        console.log("Model loaded", gltf);
        const model = gltf.scene;
        scene.add(model);
    });

    window.addEventListener('resize', () => {
        let width = window.innerWidth;
        let height = window.innerHeight;
        renderer.setSize(width, height);
        camera.aspect = width / height;
        camera.updateProjectionMatrix();
    });
}

function animate() {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
}

init();
animate();
