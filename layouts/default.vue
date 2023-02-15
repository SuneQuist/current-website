<template>
    <main>
        <slot></slot>
    </main>
    <canvas id="canvas"></canvas>
</template>

<style>
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