<template>
    <div ref="main">
        <Header :position="'sticky'"></Header>
        <div class="links" v-if="item?.github">
            <a :href="item?.github" target="_blank">
                <img src="/images/etc/github.png" alt="github" />
            </a>
            <a v-if="item?.website" class="sus" :href="item?.website" target="_blank">ඞ</a>
        </div>
        <article class="hero">
            <div class="hero-title start-title" ref="title" v-if="item?.title">
                <img v-if="item?.svg" ref="thumbnail" :src="/titles/ + size + item?.svg" alt="" />
            </div>
            <div class="hero-image-container start-image" :style="bgImage"></div>
        </article>
        <article class="layout wtf" v-for="items in item?.layout">
            <Quote v-if="items.type === 'quote'" :item="items" />
            <QuoteAdditional v-if="items.type === 'quote-additional'" :item="items" />
            <Code v-if="items.type === 'code'" :item="items" />
        </article>
        <section class="back">
            <a href="/">
                <img src="/titles/back.svg" alt="back" />
            </a>
        </section>
    </div>
</template>

<script setup>
import {gsap, ScrollTrigger, ScrollToPlugin} from "gsap/all";
const props = defineProps(["item"]);
const main = ref();
const ctx = ref();
const tl = ref();

function animate() {
    gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

ctx.value = gsap.context(self => {
    let proxy = { skew: 0 },
    skewSetter = gsap.quickSetter(".wtf", "skewY", "deg"),
    clamp = gsap.utils.clamp(-0.45, 0.45);

    tl.value = gsap.timeline(
        gsap.from(".start-image", {
            delay: 0,
            scale: 0,
            y: 100,
            opacity: 0,
            visibility: "hidden"
        }),
        gsap.to(".start-image", {
            duration: 1.2,
            scale: 1,
            y: 0,
            opacity: 1,
            ease: "expo",
            overwrite: true,
            visibility: "visible"
        }),
        gsap.from(".start-title", {
            delay: 1.2,
            scale: 0,
            y: 100,
            opacity: 0,
            visibility: "hidden"
        }),
        gsap.to(".start-title", {
            delay: 0.6,
            duration: 1.2,
            scale: 1,
            y: 0,
            opacity: 1,
            ease: "expo",
            overwrite: true,
            visibility: "visible"
        }),
        ScrollTrigger.create({
        onUpdate: (self) => {
            let skew = clamp(self.getVelocity() / -1);
            if (Math.abs(skew) > Math.abs(proxy.skew)) {
            proxy.skew = skew;
            gsap.to(proxy, {skew: 0, duration: 1.2, ease: "expo", overwrite: true, onUpdate: () => skewSetter(proxy.skew)});
            }
        }
        }),

        gsap.set(".wtf", {transformOrigin: "right center", force3D: true})
    );
}, main.value);
}

// resize checkup
let size = ref("mobile-");

onNuxtReady(() => {
    if (window.innerWidth < (43.75 * 16)) { size.value = 'mobile-'; }
    else { size.value = 'desktop-'; }

    window.addEventListener("resize", () => {
        if (window.innerWidth < (43.75 * 16)) { size.value = 'mobile-'; }
        else { size.value = 'desktop-'; }
    })

    animate();
})
onBeforeRouteLeave(() => { tl.value.kill() })

// get item
const { $storage } = useNuxtApp();
const {fullPath} = useRoute();

const item = $storage?.pages.find(e => e.src === fullPath);

const bgImage = computed(() => { 
    return {
        backgroundImage: `url(${item?.thumbnail || "/images/programming/cd-01.png"})`
    }
})

</script>

<style lang="scss" scoped>
    .start-image {
        opacity: 0;
        visibility: hidden;
    }

    .start-title {
        opacity: 0;
        visibility: hidden;
    }

    .links {
        width: 100%;
        display: flex;
        flex-direction: column;
        align-items: flex-end;
        position: fixed;
        top: 50px;
        right: 5px;
        z-index: 5;

        & .sus {
            width: 50px;
            height: 50px;
            background-color: rgb(228, 228, 228);
            border-radius: 2px;
            padding: .25rem;
            display: flex;
            justify-content: center;
            align-items: center;
            color: black;
            font-size: 2rem;
        }

        & a {
            cursor: pointer;
        }

        & img {
            width: 50px;
            height: 50px;
            background-color: rgb(228, 228, 228);
            border-radius: 2px;
            padding: .25rem;
        }
    }

    .back {
        width: 100%;
        padding: 1rem;

        & img {
            width: 100%;
        }
    }
    .hero {
        width: 100%;
        height: 100%;
        padding: 1rem 1rem;
        margin: 0 auto;
        position: relative;
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        margin-bottom: 2rem;

        & > .hero-title {
            display: flex;
            justify-content: flex-start;
            width: 100%;
            padding: 1rem 0;

            & > img {
                width: 100%;
            }
        }

        & > .hero-image-container {
            background-size: 200%;
            background-position: center;
            background-repeat: no-repeat;
            width: 100%;
            height: 60vh;
            overflow: hidden;
            margin: 0 auto;
        }
    }

    @media screen and (max-width: 43.75em) {
        .hero {
            & > .hero-image-container {
                // padding: 0;
                border-radius: 5px;
                height: 40vh;
            }
        }
    }
</style>