import * as THREE from 'three';

export function initialize(mountPoint: HTMLElement) {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75,window.innerWidth/window.innerHeight);
    const renderer = new THREE.WebGLRenderer({antialias: true});

    renderer.setSize(window.innerWidth,window.innerHeight);
    mountPoint.appendChild(renderer.domElement);


    const geometry = new THREE.BoxGeometry(1,1,1);
    const material = new THREE.MeshBasicMaterial({color: 0xff0000});
    const cube = new THREE.Mesh(geometry,material);
    scene.add(cube);

    cube.position.z = -5;
    cube.rotation.x = 10;
    cube.rotation.y = 5;


    const light = new THREE.PointLight( 0xff0000, 1, 100 );
    light.position.set( 5, 5, -10 );
    scene.add( light );

    renderer.render(scene,camera);
}