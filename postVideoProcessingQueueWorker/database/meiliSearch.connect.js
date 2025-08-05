import {MeiliSearch} from "meilisearch";

export let client = null;

export function connectMeiliSearch(host,apiKey) {
    client = new MeiliSearch({host:host,apiKey:apiKey});
    console.log(apiKey)
};

export function getClient() {
    if (!client) {
        throw new Error("MeiliSearch client not initialized. Call connectMeiliSearch first.");
    }
    return client;
}
