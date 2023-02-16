<template>
    <div id="content" ref="main">
        <Header :position="'fixed'"></Header>
        <div class="memorylane">
            <img src="/titles/memorylane.svg" alt="title" />
        </div>
        <ul>
            <li v-for="item in list" :key="item" class="item">
                <a :href="item.src" target="_blank">
                    <img :src="item.thumbnail" :style="{width: size + 'px'}" alt="" />
                    <span>{{ item.title }}</span>
                </a>
            </li>
        </ul>
    </div>
</template>

<script setup>
import {size, bouncing} from "assets/custom/bounce";

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

onNuxtReady(() => {
    bouncing(main, ctx, {pages: list});
    
    window.addEventListener("resize", bouncing(main, ctx, {pages: list}), true);
})

onUnmounted(() => {
    window.removeEventListener("resize", bouncing(main, ctx, {pages: list}), true);
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