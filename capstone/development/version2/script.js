import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

(function() {
    "use strict"
    console.log("JS Running")
    
    async function init() {
        
         const res = await fetch('files/items.json');
        items = await res.json();
        loadItem(0);
    }
 
    init();




})();