import {MeiliSearch} from "meilisearch";

export let client = null;

export function connectMeiliSearch(host,apiKey) {
    client = new MeiliSearch({host:host,apiKey:apiKey});
};