<template>
    <div class="header" :style="{position: position}" ref="main">
        <div>Pages:</div>
        <NuxtLink class="link" to="/about">&lt;- about</NuxtLink>
        <NuxtLink class="link" to="/">&lt;- code</NuxtLink>
        <NuxtLink class="link" to="/pages/gallery">&lt;- gallery</NuxtLink>
    </div>
</template>

<script setup>
    const props = defineProps(["position"]);
    const route = useRoute();
    let splitRoutes = route.path.split("/");

    const main = ref();
    onMounted(() => {
        if (main.value.children) {
            const links = main.value.children;
            if (splitRoutes[1] === "") { 
                links[2].innerHTML =  links[2].innerHTML + "#";
                links[2].style.setProperty("color", "white");
                links[2].style.setProperty("padding-bottom", "0.1rem");
                links[2].style.setProperty("border-bottom", "2px solid white");
            }
            if (splitRoutes[1] === "about") { 
                links[1].innerHTML =  links[1].innerHTML + "#";
                links[1].style.setProperty("color", "white");
                links[1].style.setProperty("padding-bottom", "0.1rem");
                links[1].style.setProperty("border-bottom", "2px solid white");
            }
            if (splitRoutes[1] === "pages" && splitRoutes[2] !== "gallery") { 
                links[2].innerHTML =  links[2].innerHTML + "#";
                links[2].style.setProperty("opacity", "0.5");
            }
            if (splitRoutes[2] === "gallery") { 
                links[3].innerHTML =  links[3].innerHTML + "#";
                links[3].style.setProperty("color", "white");
                links[3].style.setProperty("padding-bottom", "0.1rem");
                links[3].style.setProperty("border-bottom", "2px solid white");
            }
        }
    })
</script>

<style lang="scss" scoped>
    .header {
        padding: 1rem 1rem 0 1rem;
        position: fixed;
        top: 0;
        left: 0;
        z-index: 10;
        display: flex;
        flex-wrap: wrap;

        & > div {
            color: rgb(207, 207, 207);
            font-weight: 500;
            font-family: plex;
            font-size: 1rem;
            margin-right: .5rem;
        }
    }

    .link {
        color: rgb(160, 228, 114);
        font-weight: 500;
        font-family: plex;
        font-size: 1rem;
        position: relative;
        transition: .3s cubic-bezier(0.175, 0.885, 0.32, 1.275);

        &:hover {
            color: white;
            padding-left: 1rem;
            transition: .3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
        }
    }
</style>