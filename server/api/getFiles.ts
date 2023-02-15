export default defineEventHandler(async () => {

    const extractFromWhere = "pages";
    const amountOfPages = 6;
    const pages = [];

    for (let i = 1; i < amountOfPages + 1; i++) {
        try {
            const site = await $fetch(`/api/${extractFromWhere}/${(i<10?"0"+i:i)}`);
    
            if (site) { pages.push(site) };
        } catch(e) {console.log}
    }

    return pages;
})