import { getRecord } from '@applayer'
import { error } from '@sveltejs/kit'

export async function load({ params }) {
  const no_ = params.no_
  const record = await getRecord({ no_ })

  if (record == null || record.shown === false) throw error(404)

  return {
    record
  }
}