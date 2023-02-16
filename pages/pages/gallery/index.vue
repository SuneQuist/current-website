<template>
    <div id="content" ref="main">
        <Header :position="'fixed'"></Header>
        <div class="memorylane">
            <img src="/titles/memorylane.svg" alt="title" />
        </div>
        <ul>
            <li v-for="item in list" class="item">
                <a :href="item.src" target="_blank">
                    <img :src="item.thumbnail" :style="{width: size + 'px'}" alt="" />
                    <span>{{ item.title }}</span>
                </a>
            </li>
        </ul>
    </div>
</template>

<script setup>
import gsap from 'gsap';

let lmin = 75;
let lmax = 100;

const size = ref(Math.floor(Math.random() * (lmax - lmin + 1) + lmin))

onNuxtReady(() => {
    if (window.innerWidth < (43.75 * 16)) {
            lmin = 75;
            lmax = 100;

            size.value = Math.floor(Math.random() * (lmax - lmin + 1) + lmin);
    } else {
        lmin = 250;
        lmax = 300;
    
        size.value = Math.floor(Math.random() * (lmax - lmin + 1) + lmin);
    }

    window.addEventListener("resize", () => {
        if (window.innerWidth < (43.75 * 16)) {
            lmin = 75;
            lmax = 100;

            size.value = Math.floor(Math.random() * (lmax - lmin + 1) + lmin);
        } else {
            lmin = 250;
            lmax = 300;
    
            size.value = Math.floor(Math.random() * (lmax - lmin + 1) + lmin);
        }
    })
})

const list = [
    {
        title: "Taxi Driver",
        thumbnail: "/images/thumbnails/arctic-01.png",
        size: size.value,
        src: "https://www.behance.net/gallery/163442459/Taxi-Driver-A-lesser-version-of-Dan-Perri"
    },
    {
        title: "Lenius",
        thumbnail: "/images/thumbnails/arctic-02.png",
        size: size.value,
        src: "https://www.behance.net/gallery/163440973/LogoLenius"
    },
    {
        title: "sogl",
        thumbnail: "/images/thumbnails/beach-01.png",
        size: size.value,
        src: "https://www.behance.net/gallery/149712001/Brandsogl"
    },
    {
        title: "Xbox",
        thumbnail: "/images/thumbnails/beach-03.png",
        size: size.value,
        src: "https://www.behance.net/gallery/131144259/XBOX-Controller"
    },
    {
        title: "Shiss",
        thumbnail: "/images/thumbnails/cliff-02.png",
        size: size.value,
        src: "https://www.behance.net/gallery/112015515/Random-shiss"
    },
]

const main = ref();
const ctx = ref();

onMounted(() => {
    function bouncing() {
        ctx.value = gsap.context(self => {
            if (self?.selector) {
                const items = self.selector(".item");
                
                for (let i = 0; i < items.length; i++) {
                    const storageItem = list[i];
    
                    if (storageItem.rotate) {
                        gsap.to(items[i], {rotation: "360", duration:3, ease: "expo", repeat:-1});
                    }
    
                    let x = Math.floor(Math.random() * ((window.innerWidth - (storageItem.size * 4)) - storageItem.size) + storageItem.size);
        
                    let y = Math.floor(Math.random() * ((window.innerHeight - (storageItem.size * 4)) - storageItem.size) + storageItem.size);

                    items[i].style.top = y + "px";
                    items[i].style.left = x + "px";
    
                    requestAnimationFrame(draw);
                    let vx = Math.ceil(Math.random() * (storageItem.size / 300)) * (Math.round(Math.random()) ? 1 : -1) ;
    
                    let vy = Math.ceil(Math.random() * (storageItem.size / 300)) * (Math.round(Math.random()) ? 1 : -1) ;
    
                    function draw() {
                        x += vx;
                        y += vy;
    
                        if (y < 0 || y > window.innerHeight - size.value) {
                            vy = -vy;
                        }
                        
                        if (x < 0 || x > window.innerWidth - size.value) {
                            vx = -vx;
                        }
    
                        items[i].style.top = y + "px";
                        items[i].style.left = x + "px";
                        requestAnimationFrame(draw);
                    }
                }
            }

        }, main.value)
    }

    bouncing();

    window.addEventListener("resize", function() {
        if (size.value) { bouncing(); }
    });
})
</script>

<style lang="scss" scoped>
    #content {
        width: 100%;
        height: 100vh;
        background-image: url('/images/etc/road-02.png');
        background-size: cover;
        background-repeat: no-repeat;
        background-position: bottom;
        position: relative;
        overflow: hidden;
    }

    .memorylane {
        width: 100%;
        position: absolute;
        bottom: 0;
        padding: 0 1rem;
        
        & > img {
            max-width: 100%;
        }
    }

    .item {
        width: 200px;
        position: absolute;

        & > a {
            position: relative;

            & > span {
                height: 100%;
                display: flex;
                justify-content: center;
                align-items: center;
                position: absolute;
                top: 0%;
                left: 90%;
                transform: translate(-50%, -50%);
                font-family: plex;
                font-size: 12px;
                font-weight: 500;
                font-style: italic;
                color: rgb(214, 214, 214);
                background-color: rgb(14, 14, 14);
                text-transform: capitalize;
                width: auto;
                white-space: nowrap;
                padding: 1rem;
                border-radius: 2px;
                text-align: center;
            }
        }

        & img {
            width: 100%;
        }
    }
</style>