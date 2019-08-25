import React from 'react';
import ReactDOM from 'react-dom';

import { Game } from './components/Game';

window.onload = function () {
    ReactDOM.render(<Game />, document.getElementById('root'));
    (window as any).imageMapResize();
}