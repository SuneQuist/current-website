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
            title: 'sune',
            meta: [
              { charset: 'utf-8' },
              { name: 'viewport', content: 'width=device-width, initial-scale=1' },
              {
                hid: 'description',
                name: 'description',
                content: 'my website description'
              }
            ],
            link: [
                { 
                    rel: 'icon', 
                    type: 'image/x-icon', 
                    href: '/favicon.ico' 
                },
                { 
                    rel: 'icon', 
                    type: 'image/png',
                    sizes: "16x16",
                    href: '/favicon-16x16.png' 
                },
                { 
                    rel: 'icon', 
                    type: 'image/png',
                    sizes: "32x32",
                    href: '/favicon-32x32.png' 
                },
                { 
                    rel: 'apple-touch-icon', 
                    sizes: "180x180",
                    href: '/apple-touch-icon.png' 
                },
                { 
                    rel: 'manifest', 
                    href: '/site.webmanifest' 
                },
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
