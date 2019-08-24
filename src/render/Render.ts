import * as THREE from 'three';
import CameraControls from 'camera-controls';

import { Grid } from './grid/Grid';

export class Renderer {

    scene: THREE.Scene;
    renderer: THREE.WebGLRenderer;
    camera: THREE.PerspectiveCamera;
    cameraControls: CameraControls;
    clock: THREE.Clock;
    grid: Grid;

    constructor() {
        this.render = this.render.bind(this);
        this.install = this.install.bind(this);
        this.initializeEnvironment = this.initializeEnvironment.bind(this);
    }

    render() {
        requestAnimationFrame(this.render);

        // snip
        const delta = this.clock.getDelta();
        const hasControlsUpdated = this.cameraControls.update( delta );

        if(true) this.renderer.render(this.scene, this.camera);
    }

    initializeEnvironment() {
        this.grid = new Grid({
            width: 10,
            height: 10,
        });
        this.grid.mount(this);
    }

    install(mountPoint: HTMLElement): Renderer {
        CameraControls.install( { THREE: THREE } );

        this.scene = new THREE.Scene();

        // add light, set color and distance.
        const light = new THREE.DirectionalLight(0xeeeeee, 2);
        // you set the position of the light and it shines into the origin
        light.position.set(2, 2, 1).normalize();
        this.scene.add(light);

        // add ambient light
        // subtle blue
        const ambientLight = new THREE.AmbientLight(0x111111);
        this.scene.add(ambientLight);

        // added anti alising
        this.renderer = new THREE.WebGLRenderer({
            antialias: true,
            alpha: true,
        });
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        this.renderer.setClearColor( 0xffffff, 0);

        this.clock = new THREE.Clock();
        this.camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 2000);
        this.cameraControls = new CameraControls( this.camera, this.renderer.domElement );

        mountPoint.appendChild(this.renderer.domElement);

        this.cameraControls.setLookAt(10, 10, -10, 0,0, 0, false);

        this.initializeEnvironment();

        this.render();
        return this;
    }
}