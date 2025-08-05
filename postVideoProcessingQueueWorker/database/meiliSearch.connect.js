import {MeiliSearch} from "meilisearch";

export let client = null;

export function connectMeiliSearch(host,apiKey) {
    client = new MeiliSearch({host:host,apiKey:apiKey});
};

export function getClient() {
    if (!client) {
        throw new Error("MeiliSearch client not initialized. Call connectMeiliSearch first.");
    }
    return client;
}
