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
        padding: 1rem 1rem;
        display: flex;
        flex-direction: column;
        gap: 1rem;
    }

    p {
        padding-top: .25rem;
        column-count: 1;
    }

    @media screen and (min-width: 43.75em) {
        p {
            column-count: 2;
        }
    }

    @media screen and (min-width: 60.25em) {
        div {
            margin: 0 10vw 0 30vw;
        }

        h2 {
            font-size: 1.25rem;
            opacity: 1;
        }

        p, q, textArea, input, label {
            padding-top: 1rem;
            position: relative;
        }
        
        p::after {
            content: "";
            position: absolute;
            top: 0;
            left: 0;
            width: 50px;
            height: 2px;
            background-color: white;
            opacity: 0.2;
        }
    }
</style>