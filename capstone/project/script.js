import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
 
(function() {
    "use strict"
    console.log("JS Running")
 
    let items = [];
    let current = 0;
    const viewed = new Set();
    let currentModel = null;
 
    //   BRIEF TEXT   
    const briefText =
        `BUREAU OF FUTURE CONTINUATION
        FIELD DOCUMENTATION DIVISION
        DISPLACEMENT ZONE 7 — RECOVERY ARCHIVE
        
        DATE OF ORIGIN: 2089.03.04
        CLEARANCE REQUIRED: LEVEL 5
        
        What follows is a collection of objects.
        
        They were recovered from sites across the western United States on Thursday, October 23, 2025. 
        
        This archive was assembled as a record of what was allowed to happen to our future. The objects speak to choices made decades before 2089 — in policy rooms, in boardrooms, in elections, when the window to act was still open.
        
        Your task is to review these items and propose a plan to change this reality.
        
        Proceed when ready.`;
 
    //   TIMESTAMP   
    document.querySelector('#notif-timestamp').textContent = 'DATE: 2026.07.15';
 
    //   SPLASH + BRIEF  
    document.querySelector('#btn-view').addEventListener('click', function() {
        document.querySelector('#splash').classList.add('hidden');
        document.querySelector('#brief').classList.remove('hidden');

        new Typed('#brief-text', {
            strings: [briefText],
            typeSpeed: 1,
            showCursor: false,
            onComplete: function() {
                document.querySelector('#btn-enter').classList.remove('hidden');
            }
        });
    });

    document.querySelector('#btn-brief-back').addEventListener('click', function() {
        document.querySelector('#brief').classList.add('hidden');
        document.querySelector('#brief-text').innerHTML = '';
        document.querySelector('#btn-enter').classList.add('hidden');
        document.querySelector('#splash').classList.remove('hidden');
    });
 
    //   BRIEF  + TERMINAL          
    document.querySelector('#btn-enter').addEventListener('click', function() {
        document.querySelector('#brief').classList.add('hidden');
        document.querySelector('#terminal').classList.remove('hidden');
        init();
    });

    document.querySelector('#btn-terminal-back').addEventListener('click', function() {
        document.querySelector('#terminal').classList.add('hidden');
        document.querySelector('#brief-text').innerHTML = '';
        document.querySelector('#btn-enter').classList.add('hidden');
        document.querySelector('#brief').classList.remove('hidden');

        new Typed('#brief-text', {
            strings: [briefText],
            typeSpeed: 1,
            showCursor: false,
            onComplete: function() {
                document.querySelector('#btn-enter').classList.remove('hidden');
            }
        });
    });
 
    //   CONTENT SWAP 
    function buildCitations(citations) {
        if (!citations || citations.length === 0) return '';
 
        const urlPattern = /(https?:\/\/[^\s]+)/g;
 
        const links = citations.map(function(cite) {
            const linked = cite.replace(urlPattern, function(url) {
                return '<a href="' + url + '" target="_blank" rel="noopener noreferrer">' + url + '</a>';
            });
            return '<span class="citation">' + linked + '</span>';
        });
 
        return '<div class="citation-block">' + links.join('') + '</div>';
    }
 
    function loadItem(index) {
        const item = items[index];
        document.querySelector('#artifact-id').textContent = item.id;
        document.querySelector('#artifact-title').textContent = item.title;

        // Description panel 
        document.querySelector('#description-text').innerHTML =
            '<div class="panel-subheading">Object Analysis</div>' +
            item.description;

        // Intelligence panel 
        const intel = document.querySelector('#intelligence-text');
        intel.innerHTML =
            '<div class="panel-subheading">Supporting Data</div>' +
            '<div class="intel-body">' + item.intelligence + '</div>' +
            buildCitations(item.citation);

        document.querySelector('#item-current').textContent = index + 1;
        document.querySelector('#item-total').textContent = items.length;

        viewed.add(index);

        if (viewed.size === items.length) {
            document.querySelector('#conclude-bar').classList.remove('hidden');
        }

        loadModel(item.model);
    }
 
    //   3D MODEL LOADER
    const loader = new GLTFLoader();

    function loadModel(path) {
        if (currentModel) {
            scene.remove(currentModel);
            currentModel = null;
        }

        loader.load(path, function(gltf) {
            currentModel = gltf.scene;

            // center and fit model in view
            const box = new THREE.Box3().setFromObject(currentModel);
            const center = box.getCenter(new THREE.Vector3());
            const size = box.getSize(new THREE.Vector3());
            const maxDim = Math.max(size.x, size.y, size.z);
            const scale = 1.6 / maxDim;

            currentModel.position.sub(center);
            currentModel.scale.setScalar(scale);

            scene.add(currentModel);
        });
    }

    //   NAV    
    document.querySelector('#btn-prev').addEventListener('click', function() {
        current = (current - 1 + items.length) % items.length;
        loadItem(current);
    });
 
    document.querySelector('#btn-next').addEventListener('click', function() {
        current = (current + 1) % items.length;
        loadItem(current);
    });
 
    //   TERMINAL  + CONCLUSION         
    document.querySelector('#btn-conclude').addEventListener('click', function() {
        document.querySelector('#terminal').classList.add('hidden');
        document.querySelector('#conclusion').classList.remove('hidden');
        document.querySelector('#items-reviewed').textContent = items.length;
        document.querySelector('#items-total').textContent = items.length;
    });

    document.querySelector('#btn-conclusion-back').addEventListener('click', function() {
        document.querySelector('#conclusion').classList.add('hidden');
        document.querySelector('#terminal').classList.remove('hidden');
    });

    // ─── PROPOSAL FIELD ───────────────────────────────────────────────────
    let proposalTyped = false;

    const proposalRaw = `BUREAU OF FUTURE CONTINUATION\nANALYST PROPOSAL — TSO-2089-001\n\nHaving reviewed all recovered artifacts, this analyst recommends the following course of action:\n\nEffective immediately, ████████████████ must be held accountable for ████████ through binding ███████████ enforced by █████. Funding equivalent to ████████████ annually shall be redirected from ████ toward ██████ infrastructure and community-led █████ ███ programs.\n\nAll ████████████████ agreements signed after ██████ are to be renegotiated with █████ as the primary benchmark. Citizens of █████ retain the right to █████.\n\nThis proposal carries a ██.██% probability of preventing the 2089 scenario.\n\n— ANALYST ON RECORD`;


    const actionField = document.querySelector('#action-field');
    const actionHint = document.querySelector('#action-hint');

    actionField.addEventListener('click', function() {
        if (proposalTyped) return;
        proposalTyped = true;

        actionField.style.cursor = 'default';
        actionHint.classList.add('hidden');

        document.querySelector('#action-cursor').remove();

        actionField.innerHTML = '';

        const fullHTML = proposalRaw.replace(/\n/g, '<br>');
        actionField.innerHTML = '<span class="proposal-reveal">' + fullHTML + '</span>';
        actionField.querySelector('.proposal-reveal').classList.add('animate-in');

        // After animation, show submit
        setTimeout(function() {
            document.querySelector('#action-submit-row').classList.remove('hidden');
            document.querySelector('#action-note').classList.add('hidden');
        }, 3200);
    }, { once: true });

    // ─── SUBMITTED STATE ──────────────────────────────────────────────────
    document.querySelector('#btn-submit-proposal').addEventListener('click', function() {
        this.textContent = '[ TRANSMISSION SENT — BUREAU ACKNOWLEDGED ]';
        this.disabled = true;
        this.style.color = '#555';
        this.style.borderColor = '#3a3a3a';
        this.style.cursor = 'default';
        this.style.animation = 'none';
    });
 
    // THREE.JS SETUP  
    const canvas = document.querySelector('#three-canvas');
    const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
    renderer.setPixelRatio(window.devicePixelRatio);
 
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, 1, 0.1, 100);
    camera.position.set(2.5, 1.5, 3.5);
 
    const controls = new OrbitControls(camera, canvas);
    controls.enableDamping = true;
    controls.dampingFactor = 0.07;
 
    const ambient = new THREE.AmbientLight(0xffffff, 0.6);
    scene.add(ambient);
    const key = new THREE.DirectionalLight(0xadd8ff, 1.2);
    key.position.set(2, 3, 4);
    scene.add(key);
 
    function onResize() {
        const w = canvas.clientWidth;
        const h = canvas.clientHeight;
        renderer.setSize(w, h, false);
        camera.aspect = w / h;
        camera.updateProjectionMatrix();
    }
    new ResizeObserver(onResize).observe(canvas);
 
    (function animate() {
        requestAnimationFrame(animate);
        controls.update();
        renderer.render(scene, camera);
    })();
 
    const resetButton = document.getElementById('btn-reset-view');

    resetButton.addEventListener('click', function(){
        // Reset camera position
        camera.position.set(0, 0, 5);
        camera.lookAt(0, 0, 0);
        
        // Reset object rotation
        if (currentModel) {
            currentModel.rotation.set(0, 0, 0);
        }
        
        // Reset controls if using OrbitControls
        if (controls) {
            controls.reset();
        }
    });

    let inited = false;
    async function init() {
        if (inited) { loadItem(current); return; }
        inited = true;
        const res = await fetch('files/items.json');
        items = await res.json();
        loadItem(0);
    }




})();