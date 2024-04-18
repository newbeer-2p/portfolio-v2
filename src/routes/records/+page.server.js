// @ts-nocheck
import { recordTypes } from "$lib/utils"
import { getRecords } from "@applayer"

export async function load() {
  const records = await getRecords({ shown: true })
  const recordGroups = recordTypes.reduce((group, type) => {
    group[type.name] = records.filter(rec => rec.types.includes(type.name))
    return group
  }, {})

  return {
    records,
    recordGroups
  }
}