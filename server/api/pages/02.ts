function structure() {
    return {
        title: "HardcodeHTML",
        github: "https://github.com/SuneQuist/hardcore_html_reactivity",
        size: Math.floor(Math.random() * (200 - 100 + 1) + 100),
        svg: "hardcorehtml.svg",
        src: "/pages/code/hardcorehtml",
        thumbnail: "/images/programming/computer-01.png",
        rotate: false,
        layout: [
            {
                type: "quote",
                title: "le' observer",
                body: "Vue utilizes WeakMap as well as the garbage collector I made in another project, but they are turning more towards Proxy with subscription rather than subscribing to different garbage collectors."
            },
            {
                type: "code",
                language: "js",
                code: `
class Dep {
    constructor(weak) { this.subscribers = weak; }
    
    dependency(update) { this.subscribers.proxy()._.add(update); }
    
    notify() {
        this.subscribers.proxy()._.forEach(sub => {
            typeof sub === "function" ? sub() : sub?.executable();
        });
    }
}
                `
            },
            {
                type: "quote",
                title: "The State Of The Game",
                body: `At last, we subscribe to the Dep class by referring to a global Proxy. That we call our subscriptions within and set the key and value, though they can mostly be ignored as we won't access them through the Proxy, but rather globally by key.`
            },
            {
                type: "code",
                language: "js",
                code: `
function observe(obj) {
    Object.keys(obj).forEach((key) => {
        let iv = obj[key];
        Object.defineProperty(obj, key, {
            get() { return iv; },
            set(t) {
                iv = t; 
                dep.notify(obj, key);
            }
        })
    })

}
                `
            },
            {
                type: "quote",
                title: "A quick DOM calling",
                body: `By creating a function that reads on all elements, note that we don't use a shadow-dom tree nor' the render(h(dom)) constructor as Vue does, but we just call it directly (each element). 
                
                FYI. Never use this. It's simply for testing and if it is implemented it is a huge and I mean HUGE security risk.`
            },
            {
                type: "code",
                language: "js",
                code: `
let _this;
window.addEventListener("DOMContentLoaded", (e) => {
    const executables = document.querySelectorAll("[exec]");

    for (let i = 0; i < executables.length; i++) {
        _this = executables[i];
        const createFunction = new Function(_this.getAttribute("exec"));
        const functionToArray = Array.isArray(createFunction()) ? [...createFunction()] : [...[createFunction()]];

        const element = {
            tag: _this,
            executable: createFunction,
            data: typeof createFunction() === "undefined" ? [] : functionToArray
        }

        autorun(element);
    }
})
                `
            },
        ]
    }
}

export default defineEventHandler(() => {
    return structure();
})