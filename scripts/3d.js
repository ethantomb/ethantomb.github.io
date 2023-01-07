
import { OrbitControls } from 'https://unpkg.com/three@0.126.0/examples/jsm/controls/OrbitControls.js';
const LOADER = new THREE.GLTFLoader();
const SCENE = new THREE.Scene();
const CAMERA = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const RENDERER = new THREE.WebGLRenderer();
const LIGHT = new THREE.PointLight(0xffffff, 1, 1000);
const LIGHT2 = new THREE.PointLight(0xffffff, 1, 1000);
const CONTAINER = document.getElementById("model-container");
let FRAME_RATE = 45; 
let FRAME_DELAY = 1000 / FRAME_RATE; // Calculate the delay in milliseconds

//Initialize renderer
RENDERER.setPixelRatio(window.devicePixelRatio);
RENDERER.setSize(CONTAINER.clientWidth, CONTAINER.clientHeight);
//Add light to the scene
LIGHT.position.set(0, 0, 0);
SCENE.add(LIGHT);
LIGHT2.position.set(5, 0, 5);
SCENE.add(LIGHT2);
//Display renderer
document.getElementById("model").appendChild(RENDERER.domElement);
//Load model
var model;
const pi = 3.1415
LOADER.load('./assets/robotModel/SCRAP-E Model.gltf', function (gltf) {
    //Resize to fit viewport
    gltf.scene.scale.set(20, 20, 20);
    //Rotate to logical default view angle
    gltf.scene.rotation.z = pi;
    gltf.scene.rotation.y = 2*pi/3;
    gltf.scene.position.y = 3;
    gltf.scene.position.x = -2;
    console.log(gltf.scene.position);
    model = gltf.scene;
    SCENE.add(gltf.scene);

}, undefined, function (error) {

    console.error(error);

});

CAMERA.position.y = 5;
CAMERA.position.z = 10;
const controls = new OrbitControls(CAMERA, RENDERER.domElement);
function resizeModelToContainer() {
    const canvas = RENDERER.domElement;
    //console.log(canvas);
    const width = CONTAINER.clientWidth;
    const height = CONTAINER.clientHeight;
    if (canvas.width !== width || canvas.height !== height) {
        canvas.style.width=width;
        canvas.style.height=height;
        RENDERER.setSize(width, height);
        CAMERA.aspect = width / height;
        CAMERA.updateProjectionMatrix();
    }
}

let animationFrameId;
function animate() {
  
  //console.log("Rotation XYZ: ("+controls.object.rotation.x+","+controls.object.rotation.y+","+controls.object.rotation.z+")");
  resizeModelToContainer();
  controls.update();
  RENDERER.render(SCENE, CAMERA);
  animationFrameId = setTimeout(function() {
    requestAnimationFrame(animate);
  }, FRAME_DELAY);
}

function closeModel() {
  let modelClosed = document.getElementById("model-container").style.display == "none";
  document.getElementById("model-container").style.display = (modelClosed ? "flex" : "none");
  document.getElementById("closeModel").style.backgroundColor = (modelClosed ? "rgb(244 122 122)" : "rgb(84 255 88)");
  document.getElementById("closeModel").innerHTML = (modelClosed ? "Click to Close" : "Click to Open");

  if (modelClosed) {
    // Start the animation
    animate();
  } else {
    // Stop the animation
    cancelAnimationFrame(animationFrameId);
  }
}

document.getElementById("FPSCap").addEventListener('input', function() {
  //TODO: Fix Slider being jumpy
  document.getElementById("currentFPSCap").innerText = "FPS Limit: "+this.value+" FPS";
  // Update the FRAME_RATE and FRAME_DELAY constants
  FRAME_RATE = this.value;
  FRAME_DELAY = 1000 / FRAME_RATE;

  
});
$("#closeModel").on("click",closeModel);
$("#closeModel").click();
$("#closeModel").click();