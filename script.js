(function() {
    'use strict';

    const button = document.querySelector('button');
    const body = document.querySelector('body');
    const sections = document.querySelectorAll('section')
    const header = document.querySelector('header');
    const main = document.querySelector('main');
    let mode = 'dark';

    button.addEventListener('click', function() {
        if (mode === 'dark') {
            body.className = 'switch';
            button.className = 'switch';
            header.className = 'switch';
            main.className = 'switch';
            for (const section of sections) {
                section.className = 'switch';
            }
            mode = 'light';
        } else {
            body.removeAttribute('class');
            button.removeAttribute('class');
            header.removeAttribute('class');
            main.removeAttribute('class');
            for (const section of sections) {
                section.removeAttribute('class');
            }
            mode = 'dark'
        }
    })
})()