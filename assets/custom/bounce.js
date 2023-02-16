import gsap from "gsap";

let lmin = 75;
let lmax = 100;

const size = ref(Math.floor(Math.random() * (lmax - lmin + 1) + lmin))

onNuxtReady(() => { 
    resizeSize();
    window.addEventListener("resize", resizeSize, false);
    })

onUnmounted(() => {
    window.removeEventListener("resize", resizeSize, false);
})

function resizeSize() {
    if (window.innerWidth < (43.75 * 16)) {
        lmin = 75;
        lmax = 125;

        size.value = Math.floor(Math.random() * (lmax - lmin + 1) + lmin);
        } else if (window.innerWidth < (60.25 * 16)) {
        lmin = 125;
        lmax = 225;

        size.value = Math.floor(Math.random() * (lmax - lmin + 1) + lmin);
        } else {
        lmin = 225;
        lmax = 300;

        size.value = Math.floor(Math.random() * (lmax - lmin + 1) + lmin);
    }
}

function bouncing(main, ctx, $storage) {
    ctx.value = gsap.context(self => {
        if (self?.selector) {
            const items = self.selector(".item");
            
            for (let i = 0; i < items.length; i++) {
                const storageItem = $storage?.pages[i] || $storage;

                if (storageItem.rotate) {
                    gsap.to(items[i], {rotation: "360", delay: 0, duration: 3 * (i + 1), ease: "linear", repeat:-1});
                }

                let x = Math.floor(Math.random() * ((window.innerWidth - (size.value * 2)) - size.value) + size.value);
    
                let y = Math.floor(Math.random() * ((window.innerHeight - (size.value * 2)) - size.value) + size.value);

                let vx = Math.ceil(Math.random() * (size.value/300)) * (Math.round(Math.random()) ? 1 : -1);

                let vy = Math.ceil(Math.random() * (size.value/300)) * (Math.round(Math.random()) ? 1 : -1);

                window.addEventListener("resize", () => {
                    x = Math.floor(Math.random() * ((window.innerWidth - (size.value * 2)) - size.value) + size.value);
        
                    y = Math.floor(Math.random() * ((window.innerHeight - (size.value * 2)) - size.value) + size.value);
                }, false);

                requestAnimationFrame(draw);
                function draw() {
                    x += vx;
                    y += vy;

                    if (y < 0 || y > window.innerHeight - size.value) {
                        vy = -vy;
                    }
                    
                    if (x < 0 || x > window.innerWidth - size.value) {
                        vx = -vx;
                    }

                    items[i].style.setProperty("top", y + "px");
                    items[i].style.setProperty("left", x + "px");
                    requestAnimationFrame(draw);
                }
            }
        }

    }, main.value);
}

export {size, bouncing}