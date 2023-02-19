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
let currentlyAtTime = 0;
function play() {
    player = !player;

    if (player) {
        audio.play();
        audio.currentTime = currentlyAtTime;
        audio.volume = 0.25;
        icon = "/audio/audio-on.svg";
        image.value.src = icon;

        audio.addEventListener("ended", function() {
            this.currentTime = 0;
            this.play();
        }, false);
    } else {
        audio.pause();
        currentlyAtTime = audio.currentTime;
        audio.volume = 0.25;
        icon = "/audio/audio-off.svg";
        image.value.src = icon;
    }
}

</script>

<style lang="scss">
    .audio {
        position: fixed;
        bottom: 25px;
        right: 25px;
        width: 4rem;
        height: 4rem;
        z-index: 11;
        cursor: pointer;
        background-color: black;
        padding: 1rem;
        border-radius: 75px;
        display: flex;
        justify-content: center;
        align-items: center;

        & > img {
            width: 100%;
        }
    }
    
    @media screen and (max-width: 43.75em) {
        .audio {
            width: 3rem;
            height: 3rem;
            padding: 0.75rem;
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