<template>
    <div id="content" ref="main" :style="bgImage">
        <Header :position="'fixed'"></Header>
        <ul>
            <li v-for="item in list" class="item">
                <NuxtLink :to="`${item.src}`">
                    <img :src="item.thumbnail" :style="{width: item.size + 'px'}" alt="" />
                </NuxtLink>
            </li>
        </ul>
    </div>
</template>

<script setup>
import gsap from 'gsap';
const { $storage } = useNuxtApp();
const list = ref($storage?.pages);

const main = ref();
const ctx = ref();

const bgImage = computed(() => { 
    return {
        backgroundImage: `url("/images/etc/space-0${Math.floor(Math.random() * (4 - 1 + 1) + 1)}.png")`
    }
})

onMounted(() => {
    function bouncing() {
        ctx.value = gsap.context(self => {
            if (self?.selector) {
                const items = self.selector(".item");
                
                for (let i = 0; i < items.length; i++) {
                    const storageItem = $storage?.pages[i];
    
                    if (storageItem.rotate) {
                        gsap.to(items[i], {rotation: "360", delay: i, duration:3, ease: "linear", repeat:-1});
                    }
    
                    let x = Math.floor(Math.random() * (window.innerWidth - storageItem.size));
        
                    let y = Math.floor(Math.random() * (window.innerHeight - storageItem.size));
    
                    items[i].style.top = y + "px";
                    items[i].style.left = x + "px";
    
                    requestAnimationFrame(draw);
                    
                    let vx = Math.ceil(Math.random() * (storageItem.size/300)) * (Math.round(Math.random()) ? 1 : -1) ;
    
                    let vy = Math.ceil(Math.random() * (storageItem.size/300)) * (Math.round(Math.random()) ? 1 : -1) ;
    
                    function draw() {
                        x += vx;
                        y += vy;
    
                        if (y < 0 || y > window.innerHeight - storageItem.size) {
                            vy = -vy;
                        }
                        
                        if (x < 0 || x > window.innerWidth - storageItem.size) {
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

    window.addEventListener("resize", bouncing);
})
</script>

<style lang="scss" scoped>
    #content {
        width: 100%;
        height: 100vh;
        background-image: url('/images/etc/space-01.png');
        background-size: cover;
        background-repeat: no-repeat;
        background-position: center;
        position: relative;
        overflow: hidden;
    }

    .item {
        width: 200px;
        position: absolute;

        & img {
            width: 100%;
        }
    }
</style>