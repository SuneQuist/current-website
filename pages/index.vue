<template>
    <div id="content" ref="main" :style="bgImage">
        <Header :position="'fixed'"></Header>
        <ul>
            <li v-for="item in list" :key="item" class="item" :style="{width: size + 'px', height: size + 'px'}">
                <NuxtLink :to="`${item.src}`">
                    <img :src="item.thumbnail" alt="thumbnail" />
                </NuxtLink>
            </li>
        </ul>
    </div>
</template>

<script setup>
import {size, bouncing} from "assets/custom/bounce";

const { $storage } = useNuxtApp();
const list = ref($storage?.pages);

const main = ref();
const ctx = ref();

const bgImage = computed(() => { 
    return {
        backgroundImage: `url(${`/images/etc/space-0${Math.floor(Math.random() * (2 - 1 + 1) + 1)}.png` || "/images/etc/space-01.png"})`
    }
})

console.log($storage)

onNuxtReady(() => {
    bouncing(main, ctx, $storage);
    
    window.addEventListener("resize", bouncing(main, ctx, $storage), true);
})

onUnmounted(() => {
    window.removeEventListener("resize", bouncing(main, ctx, $storage), true);
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
        display: flex;
        justify-content: center;
        align-items: center;
        overflow: hidden;

        & img {
            width: 100%;
        }
    }
</style>