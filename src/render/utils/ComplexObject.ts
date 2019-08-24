import { Renderer } from '../Render';
import * as THREE from "three";

export abstract class ComplexObject<ComplexObjectOptionsT> {

    renderer: Renderer | null;
    children: THREE.Object3D[];
    options: ComplexObjectOptionsT;

    constructor(options: ComplexObjectOptionsT) {
        this.renderer = null;
        this.children = [];
        this.options = options;
    }

    abstract onMount(renderer: Renderer): void;
    abstract onUnmount(renderer: Renderer): void;

    getOptions() {
        return this.options;
    }

    setOptions(options: ComplexObjectOptionsT) {
        this.options = {
            ...this.options,
            ...options,
        };
    }

    addObject(...objects: THREE.Object3D[]) {
        this.children = [...this.children, ...objects];
        this.renderer.scene.add(...objects);
    }

    mount(render: Renderer) {
        this.renderer = render;
        this.children = [];
        this.onMount(this.renderer);
    }

    unmount() {
        this.onUnmount(this.renderer);

        this.renderer.scene.remove(...this.children);

        this.renderer = null;
        this.children = [];
    }

}