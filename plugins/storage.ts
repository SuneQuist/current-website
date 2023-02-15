import {createStorage as _cs} from "unstorage";

async function createStorage() {
    const storage = _cs();

    // *dynamic import*
    try {
        const driver = await import(/* @vite-ignore */ 'unstorage/drivers/localstorage').then(r => r.default || r);

        if (driver) {
            const data:any = {};
    
            storage.mount("assets", driver());
            await Promise.all(
                (await storage.getKeys()).map(async key => {
                    data[key] = await storage.getItem(key);
                })
            ).then(r => r.flat())
    
            return storage || {};
        }
    } catch(e) {console.log};
}

export default defineNuxtPlugin(async (nuxtApp) => {
    const s = await createStorage();

    /**Not providing setItem for security */
    if (s) { return nuxtApp.provide('storage', {
        getItem: s.getItem,
        pages: await setPages(s) || []
    }); }
});

/**
 * Sets global pages (caching / end point (aws/redis edge-location in-mind))
 * @param s - storage
 * @returns {Array}
 */
async function setPages(s:any) {
    const pages = await $fetch("/api/getFiles");
    let createPages:any = [];

    if (Array.isArray(pages) && s) {
        if (Array.isArray(await s?.getItem('pages')) ) {
            createPages = await s?.getItem('pages');
        } else {
            if (s) {
                s?.setItem('pages', pages);
                createPages = await s?.getItem('pages');
            }
        }
    }

    return createPages || [];
}