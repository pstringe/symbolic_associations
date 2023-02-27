import './style.css'
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { Vector3 } from 'three';
import { EnerergyTransferInputs, CausalInputs } from './interfaces';
import { beABetterPerson, getAJob, IwillNotStartAReligeon, meetAndLearnFromAMaster, meetANewContact, motivationIncrese, orrganizeBedroom, returnToTheTable, study } from './inputs';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
renderer.setPixelRatio(window.devicePixelRatio);
document.body.appendChild( renderer.domElement );
const pointLight = new THREE.PointLight(0xffff00);
pointLight.position.set( 0, 0, 0 );
const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
scene.add(pointLight, ambientLight);
pointLight.position.set(3, 3, 3);

const pointsToVetors = (points: number[][]): Vector3[] => {
  const vectors: Vector3[] = [];
  points.forEach(point => {
    vectors.push(new THREE.Vector3(point[0], point[1], point[2]))
  })
  return vectors;
}

const vectorsToLines = (vectors: Vector3[], color: number=0x000000) => {
  const geometry = new THREE.BufferGeometry().setFromPoints(vectors);
  const material = new THREE.LineBasicMaterial({color, linewidth: 10});
  const line = new THREE.Line(geometry, material);
  return line;
}


const removeConstinants = (plaintext: string): string => {
  const vowels = 'aeiou';
  let newString = '';
  for (let i = 0; i < plaintext.length; i++){
    if (vowels.includes(plaintext[i])){
      newString += plaintext[i];
    }
  }
  return newString;
}

const removeVowels = (plaintext: string): string => {
  const vowels = 'aeiou';
  let newString = '';
  for (let i = 0; i < plaintext.length; i++){
    if (!vowels.includes(plaintext[i]) && alphaNumberMapping[plaintext[i] as keyof typeof alphaNumberMapping] !== undefined){
      newString += plaintext[i];
    }
  }
  return newString;
}

const alphaNumberMapping = {
  'a': 0,
  'b': 1,
  'c': 2,
  'd': 3,
  'e': 4,
  'f': 5,
  'g': 6,
  'h': 7,
  'i': 8,
  'j': 0,
  'k': 1,
  'l': 2,
  'm': 3,
  'n': 4,
  'o': 5,
  'p': 6,
  'q': 7,
  'r': 8,
  's': 0,
  't': 1,
  'u': 2,
  'v': 3,
  'w': 4,
  'x': 5,
  'y': 6,
  'z': 7
};


const digitVectorMapping = {
  0: [0, 2, 0],
  1: [1, 2, 0],
  2: [2, 2, 0],
  3: [0, 1, 0],
  4: [1, 1, 0],
  5: [2, 1, 0],
  6: [0, 0, 0],
  7: [1, 0, 0],
  8: [2, 0, 0],
}

/*
const digitVectorMapping = {
  0: [Math.random() * 10, Math.random() * 10, Math.random() * 10],
  1: [Math.random() * 10, Math.random() * 10, Math.random() * 10],
  2: [Math.random() * 10, Math.random() * 10, Math.random() * 10],
  3: [Math.random() * 10, Math.random() * 10, Math.random() * 10],
  4: [Math.random() * 10, Math.random() * 10, Math.random() * 10],
  5: [Math.random() * 10, Math.random() * 10, Math.random() * 10],
  6: [Math.random() * 10, Math.random() * 10, Math.random() * 10],
  7: [Math.random() * 10, Math.random() * 10, Math.random() * 10],
  8: [Math.random() * 10, Math.random() * 10, Math.random() * 10],
}
*/

/*
//fractal vector mapping
const digitVectorMapping = {
  0: [0, 0, 0],
  1: [1, 0, 0],
  2: [0, 1, 0],
  3: [1, 1, 0],
  4: [0, 0, 1],
  5: [1, 0, 1],
  6: [0, 1, 1],
  7: [1, 1, 1],
  8: [0.5, 0.5, 0.5],
}
*/

/*
const calcCircularVector = (radius: number, angle: number)=> {
  const x = radius * Math.cos(angle);
  const y = radius * Math.sin(angle);
  return [x, y, 0];
}

//circular vector mapping
const digitVectorMapping = {
  0: calcCircularVector(1, 0),
  1: calcCircularVector(1, Math.PI / 4),
  2: calcCircularVector(1, Math.PI / 2),
  3: calcCircularVector(1, 3 * Math.PI / 4),
  4: calcCircularVector(1, Math.PI),
  5: calcCircularVector(1, 5 * Math.PI / 4),
  6: calcCircularVector(1, 3 * Math.PI / 2),
  7: calcCircularVector(1, 7 * Math.PI / 4),
  8: calcCircularVector(1, 2 * Math.PI),
}
*/

const hash = (plaintext: string): number[] => {
  plaintext = removeVowels(plaintext);
  const hash = [];
  for (let i = 0; i < plaintext.length; i++){
    const n = alphaNumberMapping[plaintext[i] as keyof typeof alphaNumberMapping];
    hash.push(n) % 9;
  }
  return hash;
}

const hashToVectors = (hash: number[], offset: number[]=[0, 0, 0]): Vector3[] => {
  const vectors: Vector3[] = [];
  hash.forEach(digit => {
    const vector = digitVectorMapping[digit as keyof typeof digitVectorMapping];
    vectors.push(new THREE.Vector3(vector[0] + offset[0], vector[1] + offset[1], vector[2] + offset[2]));
  })
  return vectors;
}

const sigilize = (intent: string, offset: number[]=[0, 0, 0]) => {
  const vectors = hashToVectors(hash(intent), offset);
  const sigil = vectorsToLines(vectors);
  return sigil;
}

const energyTransferInterface = (inputs: EnerergyTransferInputs) => {
  const left = 'the left the initial';
  const right = 'the right the initial';
  const above = 'above the energy required';
  const below = 'below the binding constraint';
  
  const pt0e = 'relative to the initial state, energy at max potential';
  const eptn = 'relative to the final state, energy depleted via actualization';
  const pt0c = 'prior to transformation, and application of constraint';
  const cptn = 'post transformation, and application of constraint';
  
  const E_T0_TN_C = sigilize(left + right + above + below, [0, -2, 0]);
  const P_T0_E = sigilize(pt0e, [-2, 0, 0]);
  const P_TN_E = sigilize(eptn, [2, 0, 0]);
  const P_T0_C = sigilize(pt0c, [-2, -4, 0]); 
  const P_TN_C = sigilize(cptn, [2, -4, 0]);
  
  const s = inputs.source;
  const i = inputs.initial;
  const o = inputs.final;
  const c = inputs.constraint;
  
  const source = sigilize(s, [0, 0, 0]);
  const input = sigilize(i, [-2, -2, 0]);
  const output = sigilize(o, [2, -2, 0]);
  const constraint = sigilize(c, [0, -4, 0]);
  
  scene.background = new THREE.Color( 0xffffff );
  
  //energy transfer interface
  scene.add(E_T0_TN_C);
  scene.add(P_T0_E);
  scene.add(P_TN_E);
  scene.add(P_T0_C);
  scene.add(P_TN_C);
  
  //transfomration
  scene.add(source);
  scene.add(input);
  scene.add(output);
  scene.add(constraint);
  
  renderer.render( scene, camera );
  
  camera.position.z = 5;
}

const causalInterface = (inputs: CausalInputs) => {
  const R = 'picture of causal association of trigger and outcome with constraint below'

  const relationship = sigilize(R, [0, -2, 0]);
  
  const trigger = sigilize(inputs.trigger, [-2, -2, 0]);
  const outcome = sigilize(inputs.outcome, [2, -2, 0]);
  //const constraint = sigilize(c, [0, -4, 0]);
  
  scene.background = new THREE.Color( 0xffffff );
  
  
  //transfomration
  scene.add(relationship);
  scene.add(trigger);
  scene.add(outcome);
  //scene.add(constraint);
  
  renderer.render( scene, camera );
  
  camera.position.z = 5;
}

//causalInterface(motivationIncrese);

const controls = new OrbitControls( camera, renderer.domElement );

function animate() {
	requestAnimationFrame( animate );
  renderer.setClearColor( 0xffffff, 0);
	renderer.render( scene, camera );
  controls.update();
}
animate();