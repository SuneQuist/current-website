let index = 0;
let active = true;
let timeout;
let frames = 8;
export function runAnimationLoop(el) {
    onNuxtReady(() => {
        clearInterval(timeout);
        
        if (active) {
            timeout = setInterval(() => { 
                if (index >= 26) { 
                    setTimeout(() => {
                        index = 0;
                    }, 1000);
                } else {
                    el.target.src = `/images/contact/Artboard${index}.png`; 
                    index++; 
                }
            }, 1000/frames);
        }
    });

    active = !active;
}