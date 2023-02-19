let images = [];

(function() {
    onNuxtReady(() => {
        for (let i = 0; i < 26; i++ ) {
            const img = new Image();
            img.src = `/images/contact/Artboard${i}.png`;
            img.onload = () => { images.push(img) };
        }
    })
}())

let index = 0;
let active = true;
let timeout;
let frames = 8;
export function runAnimationLoop(el) {
    onNuxtReady(() => {        
        if (active) {
            timeout = setInterval(() => { 
                if (index >= 26) { 
                    setTimeout(() => {
                        index = 0;
                    }, 1000);
                } else {
                    el.target.src = images[index].src; 
                    index++; 
                }
            }, 1000/frames);
        }
    });

    clearInterval(timeout);
    active = !active;
}