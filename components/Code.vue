<template>
    <div>
        <pre>
            <code
            v-highlight
            :language="item.language"
            :code="item.code"></code>
        </pre>
    </div>
</template>

<script setup>
    const props = defineProps(["item"]);
</script>

<style lang="scss" scoped>
    div {
        padding: 1rem;
        border-radius: 5px;
        overflow: hidden;
    }

    pre, code {
        border-radius: 5px;
    }

    div, pre, code {
        font-size: 1rem;
    }

    @media screen and (min-width: 60.25em) {
        div, pre, code {
            border-radius: 0;
            font-size: 1rem;
        }

        pre, div {
            padding: 0;
        }

        code {
            padding: 1.5rem 3em !important;
        }
    }
</style>