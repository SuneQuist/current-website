import hljs from 'highlight.js';

export default defineNuxtPlugin((nuxtApp) => {
    /**
     * @param {HTMLAttributes} vHighlight - use this on an element to use the custom attribute
     * @param {HTMLAttributes & String} language - set langauge to be used
     * @param {HTMLAttributes & String} code - set code to be highlighted
     */
    /**
     * @returns Example: <code v-highlight language="js" code="console.log('Not much to load (ㆆ _ ㆆ)')"></code>
     */
    nuxtApp.vueApp.directive("highlight", {
        mounted (el ,_ , {props}) {
            el.innerHTML = `${props?.code || el?.innerHTML}` || "Not loading (ㆆ _ ㆆ)";
            el.classList.add(props?.language || "plaintext");
            hljs.highlightElement(el);
        },
        updated (el) { hljs.highlightElement(el); },
    })
})