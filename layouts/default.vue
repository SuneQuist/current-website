<template>
    <main>
        <slot></slot>
    </main>
    <canvas id="canvas"></canvas>
    <div class="audio" @click="play()">
        <img ref="image" :src="icon" alt="play music" />
    </div>
</template>

<script setup>
const image = ref();
let icon = "/audio/audio-off.svg";

let audio;

onNuxtReady(() => { audio = new Audio("/audio/leo.mp3"); });

let player = false;
function play() {
    player = !player;

    if (player) {
        audio.play();
        audio.volume = 0.25;
        icon = "/audio/audio-on.svg";
        image.value.src = icon;
    } else {
        audio.pause();
        audio.volume = 0.25;
        icon = "/audio/audio-off.svg";
        image.value.src = icon;
    }
}

</script>

<style lang="scss">
    .audio {
        position: fixed;
        bottom: 10px;
        right: 10px;
        width: 2.5rem;
        height: 2.5rem;
        z-index: 11;

        & > img {
            width: 100%;
        }
    }

    .page-left-enter-active,
    .page-right-enter-active,
    .page-left-leave-active,
    .page-right-leave-active {
        transition: all 0.25s cubic-bezier(0.175, 0.885, 0.32, 1.275);
    }

    .page-left-enter-from, .page-right-leave-to {
        mix-blend-mode: difference;
        opacity: 0;
    }
    
    .page-left-leave-to, .page-right-enter-from {
        mix-blend-mode: difference;
        opacity: 0;
    }

    .page-left-enter-to, .page-right-enter-to {
        mix-blend-mode: difference;
        opacity: 1;
    }
</style>