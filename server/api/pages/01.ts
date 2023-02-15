function structure() {
    return {
        title: "ReactivityGarbageCollector",
        github: "https://github.com/SuneQuist/reactivityGarbageCollector",
        size: Math.floor(Math.random() * (200 - 100 + 1) + 100),
        svg: "suqu.svg",
        src: "/pages/code/suqu",
        thumbnail: "/images/programming/floppy-02.png",
        rotate: true,
        layout: [
            {
                type: "quote",
                title: "The WeakMap -saga",
                body: "In ECMA we do not control garbage collection, and we currently don't have any reliable ways to look at the data being garbage collected, so instead, we can use a constructor called WeakMap which automatically garbage collects and keeps your data private because it's only accessible through its own prototype."
            },
            {
                type: "code",
                language: "js",
                code: `
const garbageInstance = new WeakMap();

function GlobalPrivateSubscriberGarbageCollector() {

    // # Private
    const _subsricbers = {
        instances: new Set(),
    }

    garbageInstance.set(this, _subsricbers);
}
                `
            },
            {
                type: "quote",
                title: "Subscribing to the Global WeakMap",
                body: `Since we want to keep the global garbage collection, and the local garbage collection separates we can create another garbage collector like the other, and create keys to refer to the collectors.

                Int short: "Instead of changing variables globally we change them locally and update the garbage collector behind the scenes".`
            },
            {
                type: "code",
                language: "js",
                code: `
/**
 * 
 * @param {String} key - Key string to add 
 * @returns 
 */
SubscribeToPrivateGarbageData.prototype.addNewKey = function(key) {
    const _this = tranferredGarbage.get(this);

    if (!key) { return; }
    
    if (globalGarbageCollector.lookup(_this.target, key)) { return; }

    globalGarbageCollector.update(_this.target, _this);
    this.addKeyPair(key);
}

/**
 * 
 * @param {String} checkForKey
 * @returns - void # Creates keypair set
 */
SubscribeToPrivateGarbageData.prototype.addKeyPair = function(checkForKey) {
    const _this = tranferredGarbage.get(this);

    const checkIfAnythingIsAlreadyThere = globalGarbageCollector.lookup(_this.target);

    if (checkIfAnythingIsAlreadyThere) {
        for (let [key, value] of checkIfAnythingIsAlreadyThere.perKeyEffect) {
            _this.perKeyEffect.set(key, value);
        }
        
        if (!checkIfAnythingIsAlreadyThere.perKeyEffect.get(checkForKey)) {
            _this.perKeyEffect.set(checkForKey, new Set());
        }
    } else {
        _this.perKeyEffect.set(checkForKey, new Set());
    }

    globalGarbageCollector.update(_this.target, _this);
}
                `
            },
            {
                type: "quote",
                title: "How to actually subscribe",
                body: `In all honestly, the way we subscribe is something a bit close to Vuejs way but still a bit off since were subscribing directly to the garbage collector and changing the collectors from the shadow-dom tree instead of using render(h(dom)) like Vue prefers to do (using Proxy).`
            },
            {
                type: "code",
                language: "js",
                code: `
export function Subscriber(target) {
    let currentSubcriber = null;
    if (globalGarbageCollector.lookup(target)) {
        currentSubcriber = globalGarbageCollector.lookup(target).self;
    } else {
        currentSubcriber = new SubscribeToPrivateGarbageData(target);
    }

    return currentSubcriber;
}

// function() - track here...
// function() - trigger here...

export function createReactiveProxy(target, key, value) {
    const reactive = new Proxy({[key]: value}, {
        get() {
            track(target, reactive);
            return Reflect.get(...arguments);
        },
        set(t, k, v) {
            t[k] = v;
            trigger(target, reactive);
            return true; 
        }
    });

    track(target, reactive);

    return [reactive, (val) => reactive[key] = val];
}
                `
            },
            {
                type: "quote",
                title: "You mentioned shadow-dom tree?",
                body: `I chose to play with the setup a bit and render the dom in a shadow-dom tree. This makes me able to change it quickly and put custom attributes around as I like (this is possible without the shadow-dom tree as well [you can use Object.defineProperty() with Proxy]).`
            },
            {
                type: "quote-additional",
                body: `Now the code for that is a bit too long to just plop in, so instead, I'll just quickly say that it uses a class to generate each node and it creates an object tree, by going through the DOM recursively. `
            },
            {
                type: "code",
                language: "js",
                code: `
export default function suqu(html, target, stack, sheet) {
    const stackedProxies = new Map();
    for (let property in stack) {
        const [proxy, setProxy] = createReactiveProxy(target, property, stack[property]);
        stackedProxies.set(property, {self: proxy, name: property, value: proxy[property], setValue: setProxy});
    }

    const shadow = html.attachShadow({mode: "open"});
    shadow.innerHTML = html.innerHTML;
    shadow.adoptedStyleSheets = [ sheet ];
    makeNodeShadowTree(shadow, stackedProxies, target);

    if (stackedProxies.size > 0) {
        for (let [key, value] of stackedProxies) {
            target.iterateOverCallbacks(value.self);
        }
    }

    return stackedProxies;
}
                `
            },
            {
                type: "quote",
                title: "Last thing on the menu",
                body: `The code below is showing how the two attributes you can use in the HTML are implemented..`
            },
            {
                type: "code",
                language: "js",
                code: `
function placeholder(node) {
    if (node.attribute === "value") { node.elm.value = getToProxyValue(node); }
    if (node.attribute === "innerHTML") { node.elm.innerHTML = getToProxyValue(node); }
}

function change(node) {
    if (node.attribute === "value" && node.self) { node.elm.value = getToProxyValue(node); }
    
    node.elm.addEventListener("input", (e) => {
        if (node.targetProxy) {
            node.targetProxy.setValue(e.target.value);
        }
    });
}
                `
            },
        ]
    }
}

export default defineEventHandler(() => {
    return structure();
})