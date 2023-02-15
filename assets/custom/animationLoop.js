let index = 0;
let active = false;
let timeout;
let frames = 8;
function runAnimationLoop(el) {
    onNuxtReady(() => {
        active = !active;
    
        clearInterval(timeout);
        
        if (active) {
            timeout = setInterval(() => { 
                if (index >= 26) { 
                    setTimeout(() => {
                        index = 0;
                    }, 1000);
                } else {
                    el.target.src = `/images/contact/Artboard(${index}).png`; 
                    index++; 
                }
            }, 1000/frames);
        }
    })
}

export default runAnimationLoop;