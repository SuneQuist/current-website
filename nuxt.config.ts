// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    alias: {
        'highlight.js': 'highlight.js',
        'unstorage': 'unstorage',
    },
    plugins: [
        "~/plugins/hljs.ts",
        "~/plugins/storage.ts"
    ],
    build: {
        transpile: ["gsap"],
    },
    app: {
        head: {
            link: [
                {
                    rel: "stylesheet",
                    href: "//cdnjs.cloudflare.com/ajax/libs/highlight.js/11.7.0/styles/default.min.css"
                }
            ]
        }
    },
    components: [
        {
            pathPrefix: false,
            path: "~/components/",
            extensions: [".vue", ".js", ".ts"]
        }
    ],
    css: [
        "assets/styles/global.scss",
        "assets/styles/declareFonts.scss",
        "assets/styles/fonts.scss",
        "assets/styles/hljs.scss"
    ]
})
