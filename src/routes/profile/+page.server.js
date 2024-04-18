import { getAuthor } from '@applayer'

export async function load() {
  const author = await getAuthor()
  return { 
      user: author
  }
}