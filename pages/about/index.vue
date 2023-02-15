<template>
    <div ref="main">
        <div class="links">
            <a href="https://github.com/SuneQuist" target="_blank">
                <img src="/images/etc/github.png" alt="github" />
            </a>
            <a class="sus" href="https://www.linkedin.com/in/sune-quist-05ab90184/" target="_blank">ඞ</a>
        </div>
        <div class="container">
            <div class="hint hero">
                    <Header :position="'fixed'"></Header>
                    <div class="title">
                        <img class="title-image" src="/titles/info.svg" alt="title" />
                    </div>
                </div>
                <div class="text">
                    <div>
                    <h2>About</h2>
                    <p>
                    Hello there,<br /><br />

                    My name is Sune and 21 years old, and I love to study and learn new things.<br /><br />

                    I study design and programming, but I love anything I can get my hands on. I'm currently getting diagnosed with Autism and ADHD (or more likely *ADD) and have a rare disease that occupied my early life (and still does to some extent).<br /><br />

                    If you want to talk or reach out, you can contact me at - <a href="mailto:sunevinterhoej@gmail.com">sunevinterhoej@gmail.com</a>
                    </p>
                    </div>
                </div>
                <div class="contact">
                    <img @click="runAnimationLoop" src="/images/contact/Artboard0.png" alt="contact animation" />
                </div>
        </div>
    </div>
</template>

<script setup>
import {gsap, ScrollTrigger, ScrollToPlugin} from "gsap/all";

const ctx = ref();
const main = ref();

let index = 0;
let active = false;
let timeout;
let frames = 8;
function runAnimationLoop(el) {
    onNuxtReady(() => {
        active = !active;
    
        clearInterval(timeout);
        
        if (active) {
            timeout = setInterval(() => { 
                if (index >= 26) { 
                    setTimeout(() => {
                        index = 0;
                    }, 1000);
                } else {
                    el.target.src = `/images/contact/Artboard{index}.png`; 
                    index++; 
                }
            }, 1000/frames);
        }
    })
}

function animate() {
    gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

    ctx.value = gsap.context(self => {

        gsap.timeline(
            gsap.fromTo(".title-image", {y: 200}, {ease: "expo", duration: 2, y: 0}),
    
            ScrollTrigger.create({
                onEnter: (self) => {
                    gsap.timeline(
                        gsap.fromTo(".image-wrapper", 
                        { y: 200, opacity: 0 }, 
                        { y: 0, opacity: 1, duration: 2, ease: "expo" })
                    )
                },
            })
        )

    }, main.value);
}

onNuxtReady(() => { animate(); })

</script>

<style lang="scss">
    .image-wrapper {
        width: 100%;
        padding: 1rem;
    }

    .contact {
        width: 100%;
        overflow: hidden;
        cursor: pointer;

        & img {
            max-width: 100%;
            float: left;
        }
    }

    .text {
        padding: 3rem 0 5rem 0;

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

        a {
            color: rgb(223, 223, 223);
            border-bottom: 10px solid rgb(223, 223, 223);
            opacity: 1;

            &:hover, &:active {
                opacity: 1;
            }
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
                opacity: 0.5;
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
    }

    .hero {
        .title {
            background-image: url('/images/etc/tunnel-01.png');
            background-size: cover;
            background-repeat: no-repeat;
            background-position: center;
            background-attachment: fixed;
            width: 100%;
            height: 100vh;
            padding: 1rem 2rem;
            display: flex;
            justify-content: center;
            align-items: flex-end;
            overflow: hidden;

            & .title-image {
                max-width: 100%;
                height: 90%;
            }
        }

        a {
            color: white;
            text-decoration: none;
            font-size: 2rem;
        }
    }

    .hint {
        height: 100vh;
        background-color: black;
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
</style>