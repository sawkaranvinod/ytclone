import { MeiliSearch } from "meilisearch";

export async function addData(modle, document, host, apiKey) {
    try {
        if (!host || !apiKey) {
            throw new Error("MeiliSearch host or apiKey is undefined");
        }
        
        const client = new MeiliSearch({ host, apiKey });
        const index = client.index(modle);
        
        try {
            // Add documents and wait for operation to complete
            const response = await index.addDocuments(document, { primaryKey: '_id' });
            console.log("data inserted successfully");
            return true;
        } catch (taskError) {
            console.error("Task failed:", taskError.message);
            return false;
        }
    } catch (error) {
        console.log("error in adding document in meili search", error.message);
        return false;
    }
}

