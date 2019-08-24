import { Renderer } from '../Render';
import * as THREE from "three";
import {ComplexObject} from "../utils/ComplexObject";

import image from '../../assets/texture.jpg';
import labItem1 from '../../assets/lab_block1.png';

export class Grid extends ComplexObject<{
    width: number;
    height: number;
}> {

    renderer: Renderer;

    onMount(renderer: Renderer): void {
        this.renderer = renderer;

        const gridW = this.getOptions().width;
        const gridH = this.getOptions().height;

        const floorTileSize = 0.3;
        for (let x=0;x<gridW;++x) {
            for (let y=0;y<gridH;++y) {
                const geometry = new THREE.BoxGeometry(floorTileSize, 0.1, floorTileSize);
                const material = new THREE.MeshPhongMaterial({
                    // light
                    specular: 0xcccccc,
                    // intermediate
                    color: 0x999999,
                    // dark
                    emissive: 0x555555,
                    shininess: 50,
                    wireframe: false,
                    map: THREE.ImageUtils.loadTexture(image),
                });
                const cube = new THREE.Mesh(geometry, material);
                this.addObject(cube);

                cube.position.x = (x-gridW/2)*floorTileSize;
                cube.position.y = -1;
                cube.position.z = (y-gridH/2)*floorTileSize;
            }
        }

        const map = new THREE.TextureLoader().load( labItem1 );
        const material = new THREE.SpriteMaterial( { map: map, color: 0xffffff } );
        const sprite = new THREE.Sprite( material );
        sprite.position.x = 0;
        sprite.position.y = 0;
        sprite.position.z = 0;
        this.addObject( sprite );
    }

    onUnmount(renderer: Renderer): void {

    }


}