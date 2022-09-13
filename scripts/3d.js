//Code for displaying the 3D model. 
//TODO: 
//Figure out how tf three js works so I can make it user friendly
//Organize Comment Code
import { OrbitControls } from 'https://unpkg.com/three@0.126.0/examples/jsm/controls/OrbitControls.js';
const loader = new THREE.GLTFLoader();
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();

renderer.setSize(window.innerWidth, window.innerHeight);
//Add light to the scene
const light = new THREE.PointLight(0xffffff, 1, 1000);
light.position.set(0, 0, 0);
scene.add(light);
//Add another light
const light2 = new THREE.PointLight(0xffffff, 1, 1000);
light2.position.set(5, 0, 5);
scene.add(light2);
document.getElementById("model").appendChild(renderer.domElement);
var model;
loader.load('./assets/robotModel/SCRAP-E Model.gltf', function (gltf) {
    gltf.scene.scale.set(10, 10, 10);
    gltf.scene.rotation.z = 3.14;
    gltf.scene.rotation.y = 1.28;

    gltf.scene.position.y = 5;
    console.log(gltf.scene.position);
    model = gltf.scene;
    scene.add(gltf.scene);

}, undefined, function (error) {

    console.error(error);

});

camera.position.y = 5;
camera.position.z = 10;
const controls = new OrbitControls(camera, renderer.domElement);
function animate() {
    requestAnimationFrame(animate);

    controls.update();
    renderer.render(scene, camera);
}
animate();