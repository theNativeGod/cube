import './style.css'
import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

const scene = new THREE.Scene()

const cubeGeometry = new THREE.BoxGeometry(1, 1, 1, 16)
const cubeMaterial = new THREE.MeshBasicMaterial({ color: "red", wireframe: false })

const cubeMesh = new THREE.Mesh(
  cubeGeometry,
  cubeMaterial,
)


scene.add(cubeMesh)

const axesHelper = new THREE.AxesHelper(2)

// cubeMesh.add(axesHelper)






const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  200
)

camera.position.z = 3

const canvas = document.querySelector('canvas.threejs')

const renderer = new THREE.WebGLRenderer({
  canvas: canvas
})



const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true
// controls.autoRotate = false
// controls.autoRotateSpeed = 5

camera.aspect = window.innerWidth / window.innerHeight
camera.updateProjectionMatrix()

renderer.setSize(window.innerWidth, window.innerHeight)

const maxPixelRatio = Math.min(window.devicePixelRatio, 2);
renderer.setPixelRatio(maxPixelRatio)

window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight
  camera.updateProjectionMatrix()

  renderer.setSize(window.innerWidth, window.innerHeight)
})

const clock = new THREE.Clock()
let previousTime = 0


const renderloop = () => {


  const currentTime = clock.getElapsedTime()
  const delta = currentTime - previousTime
  previousTime = currentTime
  var sinCurve = Math.sin(currentTime)
  cubeMesh.rotation.y -= 1 * delta

  cubeMesh.scale.y = sinCurve
  controls.update()
  renderer.render(scene, camera)
  window.requestAnimationFrame(renderloop);
}

renderloop()