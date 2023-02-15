function structure() {
    return {
        title: "FilterFormatter",
        website: "https://filterformatter.netlify.app/",
        github: "https://github.com/SuneQuist/FilterFormatter",
        size: Math.floor(Math.random() * (250 - 150 + 1) + 150),
        svg: "filterformatter.svg",
        src: "/pages/code/filterformatter",
        thumbnail: "/images/programming/vhs-01.png",
        rotate: true,
        layout: [
            {
                type: "quote",
                title: "Why?",
                body: `This project was a quick little one since it was for a Minecraft server I was mod on (moderator), and I wanted to help by making a website for uploading our chat-filter JSON files and editing and deleting/adding filters to them.`
            },
            {
                type: "quote-additional",
                body: `The project is built using classes because of the many different types of filters that need to be implemented, and function factories simply wouldn't cut it.`
            },
            {
                type: "code",
                language: "js",
                code: `
class CreateNodeFromInputs {
    constructor(
        filterName = "",
        wordContains = [""],
        wordsContainsNot = [""],
        playSound = true,
        soundPath = "",
        highlightMessage = true,
        highlightColorR = 192,
        highlightColorG = 76,
        highlightColorB = 60,
        hideMessage = false,
        displayInSecondChat = false,
        filterTooltips = false,
        room = "Global",
        highlightHex = "#C04C3C",
        createMode = true,
    ) {
        this.filterName = filterName;
        this.wordsContains = wordContains;
        this.wordsContainsNot = wordsContainsNot;
        this.playSound = playSound;
        this.soundPath = soundPath;
        this.highlightMessage = highlightMessage;
        this.highlightColorR = highlightColorR,
        this.highlightColorG = highlightColorG,
        this.highlightColorB = highlightColorB,
        this.hideMessage = hideMessage;
        this.displayInSecondChat = displayInSecondChat;
        this.filterTooltips = filterTooltips;
        this.room = room;
        this.highlightHex = highlightHex;
        this.filter = false;
        this.index = 0;
        this.createMode = createMode;
        this.init();
    }
                `
            },
            {
                type: "quote",
                title: "DOMming",
                body: `Each filter has a specific use case and a constructor prototype assigned to it, meaning we can call it. In the code below you will see how we call and assign all the elements by simply doing a bit of DOM manipulation.`
            },
            {
                type: "code",
                language: "js",
                code: `
function createNodeList(filters) {
    node.update({filter: filters});
    const filterList = document.createElement("ul");
    filterList.classList.add("filterList");

    filters.forEach((key, index) => {
        const filterField = document.createElement("li");
        filterField.classList.add("filterField");
        
        const filterFieldName = document.createElement("h2");
        filterFieldName.classList.add("filterFieldName");
        filterFieldName.innerHTML = key.filterName;

        const filterToggles= document.createElement("div");
        filterField.classList.add("filterFieldToggles");
        
        const filterFieldEdit = document.createElement("button");
        filterFieldEdit.classList.add("filterFieldButton");
        filterFieldEdit.innerHTML = "edit";
        filterFieldEdit.dataset.index = index;
        filterFieldEdit.onclick = () => {createData(filterFieldEdit, filters, false)};

        const filterFieldDelete = document.createElement("button");
        filterFieldDelete.classList.add("filterFieldButton");
        filterFieldDelete.innerHTML = "Delete";
        filterFieldDelete.dataset.index = index;
        filterFieldDelete.onclick = () => {deleteData(index)};
        
        filterToggles.append(filterFieldEdit, filterFieldDelete)
        filterField.append(filterFieldName, filterToggles);
        filterList.appendChild(filterField);
        filterWrapper.appendChild(filterList);
    })
}
                `
            },
            {
                type: "quote",
                title: "Fetching the data",
                body: `We can get the data out of our try-catch fetch by calling the function createNodeList that we established above, as we will be using that function to create nodes, or rather update them/put them into their right places.`
            },
            {
                type: "code",
                language: "js",
                code: `
(async function getData() {
    const format = localStorage.getItem("filterFormatterData");
    if (format) {
        let filterData = await JSON.parse(format);
        createNodeList(filterData?.filters);
    }

    if (!format) {
        try {
            const req = await fetch("filters.json");
            const res = await req.json();
            let filters = Array.from(res?.filters);
            createNodeList(filters);
        } catch(err) {
            console.log(err);
        }
    }
}())
                `
            },
        ]
    }
}

export default defineEventHandler(() => {
    return structure();
})