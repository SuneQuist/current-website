function structure() {
    return {
        title: "NikeSorter",
        website: "https://wonderful-carson-e102ba.netlify.app/",
        github: "https://github.com/SuneQuist/Nike/tree/main/src/Components/Database",
        size: Math.floor(Math.random() * (200 - 100 + 1) + 100),
        svg: "nikesorter.svg",
        src: "/pages/code/nikesorter",
        thumbnail: "/images/programming/videogame-01.png",
        rotate: false,
        layout: [
            {
                type: "quote",
                title: "The Free Nike Database",
                body: `Nike once provided a 2 million line JSON file filled with links to Nike's items and such. The list is terribly setup which makes it a perfect practice tool for sorting.`
            },
            {
                type: "code",
                language: "js",
                code: `
//------------------------------------------------------------------------------------------------------------//
// Sort Categories
//------------------------------------------------------------------------------------------------------------//
export const callDatabase = async (data) => {
    let catalog = data.catalog[0].categories; // Nike Catalog
    let minCount = 3; // Minimum amount of sub categories to be considered for sorting

    // Catalog Sorting Arrays
    let listItems = [];
    let sortedListItems = [];
    let primaryListItemValues = [];

    //-------------//
    // Create Primary DOM List

    for (let i = 0; i < catalog.length; i++) {
    if (catalog[i].name.toUpperCase() === catalog[i].name) {
        primaryListItemValues.push({ ...catalog[i], catalog: [] });
    } else {
        listItems.push(catalog[i].parent_id); // Every secondaryListItems and under
    }
    }

    //-------------//
    // Start of Sorting categories

    let resetCounter = 0;

    listItems.sort((a, b) => {
    return a + b;
    });

    for (let i = 0; i < listItems.length; i++) {
    // Check if duplicate
    if (listItems[i] === listItems[i + 1]) {
        resetCounter++;

        // Count as duplicate if above minCount
        if (resetCounter >= minCount) {
        sortedListItems.push(listItems[i]);
        resetCounter = 0; // Reset so we only get one number, and not duplicates of the number in the new filtered array
        }
    } else resetCounter = 0;
    }
                `
            },
            {
                type: "quote",
                title: "The Filtering",
                body: `The data is now ready to be filtered and sorted for ease of use. As this sorted array is finished, the look-up time will be log(n), and is extremely fast.`
            },
            {
                type: "code",
                language: "js",
                code: `
//-------------//
// Filters

// Filter sortedListItems
let filteredListItems = sortedListItems.filter(
    (v, i) => sortedListItems.indexOf(v) === i
);

// Filter filteredListItems (catalog Items)
let sortedCatalogItemParents = catalog.filter((category) =>
    filteredListItems.find((parent_id) => parent_id === category.id)
);

sort(sortedCatalogItemParents);

// Filter filteredListItems (catalog Items)
let sortedCatalogItems = catalog.filter((category) =>
    filteredListItems.find((parent_id) => parent_id === category.parent_id)
);

//-------------//
// Sort primaryListItemValues catalog array

for (let i = 0; i < sortedCatalogItemParents.length; i++) {
    if (
    primaryListItemValues[0].id <= sortedCatalogItemParents[i].id &&
    primaryListItemValues[1].id >= sortedCatalogItemParents[i].id
    ) {
    primaryListItemValues[0].catalog.push(sortedCatalogItemParents[i]);
    } else if (
    primaryListItemValues[1].id <= sortedCatalogItemParents[i].id &&
    primaryListItemValues[2].id >= sortedCatalogItemParents[i].id
    ) {
    primaryListItemValues[1].catalog.push(sortedCatalogItemParents[i]);
    } else {
    primaryListItemValues[2].catalog.push(sortedCatalogItemParents[i]);
    }
}

//-------------//
// Filter / Sort primaryListItemValues catalog array

for (let i = 0; i < primaryListItemValues.length; i++) {
    primaryListItemValues[i].catalog = sortParentsDupes(
    primaryListItemValues[i].catalog
    );

    for (let j = 0; j < primaryListItemValues[i].catalog.length; j++) {
    let lists = primaryListItemValues[i].catalog[j].supportingLists;
    let similarities = sortSupportingParentsItems(sortedCatalogItems, lists);
    primaryListItemValues[i].catalog[j] = {
        ...primaryListItemValues[i].catalog[j],
        products: similarities,
    };
    }
}

return primaryListItemValues;
};
                `
            },
            {
                type: "quote",
                title: "Sorting out the Fakes",
                body: `To make sure we don't have duplicate values or simply values that have nothing linked/attached to them, we create a separate function that is recursive and loops over the array like the past functions and sorts out the dupes.`
            },
            {
                type: "code",
                language: "js",
                code: `
// Sorts out dupes, and creates a new value on primaryListItemValues, with the suppoorting Values (The dupes)
function sortParentsDupes(primaryList) {
    let sortedParentsList = [];
    let sortedDupeParentsList = [];

    for (let i = 0; i < primaryList.length - 1; i++) {
    // Sort dupelicates from none duplicates
    if (primaryList[i].name === primaryList[i + 1].name) {
        sortedDupeParentsList.push(primaryList[i].id);
    } else {
        sortedDupeParentsList.push(primaryList[i].id);

        sortedParentsList.push({
        ...primaryList[i],
        supportingLists: sortedDupeParentsList,
        });

        sortedDupeParentsList = [];
    }

    // Insurance, if category is too small.
    if (primaryList.length - 1 <= 1) {
        sortedDupeParentsList.push(primaryList[i].id);

        sortedParentsList.push({
        ...primaryList[i],
        supportingLists: sortedDupeParentsList,
        });

        sortedDupeParentsList = [];
    }
    }
    return sortedParentsList;
}

// Sort SupportingParents items into a new children array
function sortSupportingParentsItems(sortedCatalogItems, lists) {
    let similarities = [];
    let returnSimilarities = [];

    for (let key of sortedCatalogItems) {
    if (lists.indexOf(key.parent_id) > -1) {
        similarities.push(key);
    }
    }

    sort(similarities);

    for (let i = 0; i < similarities.length - 1; i++) {
    if (similarities[i].name !== similarities[i + 1].name) {
        returnSimilarities.push(similarities[i]);
    }
    }

    sort(returnSimilarities);

    return returnSimilarities;
}

// Sorting arr, asc order
const sort = (arr) => {
    arr.sort((a, b) => {
    if (a.name < b.name) return -1;
    if (a.name > b.name) return 1;
    return 0;
    });
};
                `
            },
            {
                type: "quote",
                title: "Calling the data in React",
                body: `The data is called upon in React by using the useContext() statement (this is instead of using a heavy library like Redux, even though it's stored it quite proficiently [also redux isn't good for sorting, but simply looking up like a linked list or hot module reloading]).
                
                The code below is the search method used and is as quick as log(n).`
            },
            {
                type: "code",
                language: "js",
                code: `
//------------------------------------//
// Search Options
//------------------------------------//

const searching = useCallback(
    (input) => {
    if (database.products) {
        const products = database?.products?.filter((v) =>
        v.name.toLowerCase().match('%{input}'% "gi")
        );

        let categories = database?.categories?.map((v) =>
        v.catalog.map((k) => {
            const category = v.name.toLowerCase().match('%{input}'% "gi");
            const catalog = k.name.toLowerCase().match('%{input}'% "gi");

            if (catalog?.input) {
            return {
                category:
                (category ? category?.input : null) ||
                (catalog?.input ? v.name.toLowerCase() : null),
                catalog: catalog?.input,
            };
            } else {
            return null;
            }
        })
        );
        let checkForNull = false;

        for (let i = 0; i < categories.length; i++) {
        for (let j = 0; j < categories[i].length; j++) {
            if (categories[i][j]) {
            checkForNull = true;
            }
        }
        }

        return [
        checkForNull ? categories : null,
        products.length > 0 ? products.splice(0, 5) : null,
        ];
    }
    },
    [database]
);
                `
            },
        ]
    }
}

export default defineEventHandler(() => {
    return structure();
})