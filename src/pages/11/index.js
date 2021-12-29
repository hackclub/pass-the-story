import * as THREE from 'https://unpkg.com/three@0.108.0/build/three.module.js';
import { OrbitControls } from 'https://unpkg.com/three@0.108.0/examples/jsm/controls/OrbitControls.js';
import { OBJLoader } from 'https://unpkg.com/three@0.108.0/examples/jsm/loaders/OBJLoader.js';
import { MTLLoader } from 'https://unpkg.com/three@0.108.0/examples/jsm/loaders/MTLLoader.js';

function main() {
  const canvas = document.querySelector('canvas');
  const { width, height } = canvas.getBoundingClientRect();
  canvas.width = width;
  canvas.height = height;
  const renderer = new THREE.WebGLRenderer({canvas});

  const fov = 75;
  const aspect = 2;  // the canvas default
  const near = 0.1;
  const far = 5;
  const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
  camera.position.z = 2;

  const scene = new THREE.Scene();

  const controls = new OrbitControls( camera, renderer.domElement );

  const ambientLight = new THREE.AmbientLight( 0xcccccc, 0.4 );
  scene.add( ambientLight );

  const pointLight = new THREE.PointLight( 0xffffff, 0.8 );
  camera.add( pointLight );
  scene.add( camera );

  const onProgress = () => {};
  const onError = () => {};

  new MTLLoader()
    .load( './assets/mm_frame.mtl', function ( materials ) {

      materials.preload();

      new OBJLoader(  )
        .setMaterials( materials )
        .load( './assets/mm_frame.obj', function ( object ) {

          const scale = 0.2;
          object.scale.x = scale;
          object.scale.y = scale;
          object.scale.z = scale;
          scene.add( object );

        }, onProgress, onError );

    } );

  controls.update();

  function render(time) {
    const canvas = renderer.domElement;
    camera.aspect = canvas.clientWidth / canvas.clientHeight;
    camera.updateProjectionMatrix();

    controls.update();

    renderer.render(scene, camera);

    requestAnimationFrame(render);
  }

  requestAnimationFrame(render);

}

main();