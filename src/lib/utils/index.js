export { toRecordCard, getRecordInput, getRecordLayout, recordTypes, getRecordType } from "./records"

/**
 * @template T
 * @param {T[]} array
 * @returns {T}
 */
export const randomArray = (array) => {
  return array[random(array.length)]
}

/**
 * @param {number} num1 
 * @param {number} num2 
 * @returns 
 */
export const random = (num1, num2=undefined) => {
  if (num2 == undefined) {
    num2 = num1
    num1 = 0
  }
  return Math.floor(Math.random() * num2 + num1)
}

/**
 * @param {Date|string} date 
 * @returns 
 */
export const toDateTH = (date) => (new Date(date)).toLocaleDateString('th-TH', {
  day: 'numeric',
  month: 'long',
  year: 'numeric'
})