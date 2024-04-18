import { getRecords } from "@applayer"

export async function load() {
  const records = await getRecords()
  return {
    records
  }
}