import { writable } from "svelte/store"

function createTitle() {
  const origin = "Newbeer Portfolio"
  const { set, subscribe } = writable(origin)
  return {
    subscribe,
    /**
     * @param {string} value 
     * @param {string} subfix 
     */
    set: (value, subfix=origin) => {
			set(`${value} | ${subfix}`)
		},
		clear: () => {
			set(origin);
		}
  }
}

export const title = createTitle()