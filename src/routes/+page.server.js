import { getAuthor, getRecords } from "@applayer"

export async function load() {
    const author = await getAuthor()
    const records = await getRecords({shown: true, recommended: true})
    return { 
        user: author,
        records
    }
}