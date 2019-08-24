import { Renderer } from './render/render';

window.onload = function () {
    new Renderer().install(document.getElementById("root"));
}