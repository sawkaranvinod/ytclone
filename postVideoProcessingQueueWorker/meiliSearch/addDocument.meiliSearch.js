import {getClient} from "../database/meiliSearch.connect.js";

export async function addData(modle,document) {
    try {
        const index = getClient().index(modle);
        await index.addDocuments(document);
        return true;
    } catch (error) {
        console.log("error in adding document in meili search",error.message);
        return false;
    }
}

