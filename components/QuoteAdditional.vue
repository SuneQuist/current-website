<template>
    <div>
        <h2 v-text="props.item.title"></h2>
        <p v-text="props.item.body"></p>
    </div>
</template>

<script setup>
    const props = defineProps(["item"]);
</script>

<style lang="scss" scoped>
    div {
        padding: 1rem 1rem 2rem 1rem;
        column-count: 1;
        position: relative;
    }

    div::after {
        content: "";
        position: absolute;
        top: 0;
        left: 1rem;
        width: 50%;
        height: 2px;
        background-color: white;
        opacity: 0.2;
    }

    @media screen and (min-width: 60.25em) {
        div {
            margin: 0 10vw 0 30vw;
        }

        h2 {
            font-size: 1.25rem;
            opacity: 0.75;
        }

        p, q, textArea, input, label {
            opacity: 0.5;
        }
    }
</style>