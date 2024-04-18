import { RecordModel } from "../models"

/** @typedef {import("../models/record").Record} M_Record */

/**
 * @param {Record<string, any>} query 
 * @returns {Promise<M_Record[]>}
 */
async function getRecords(query={}) {
  const records = await RecordModel.find(query)
  return records.map(record => record.toObject())
}

/**
 * @param {Record<string, any>} query 
 * @returns {Promise<M_Record>}
 */
async function getRecord(query) {
  const record = await RecordModel.findOne(query)
  return record?.toObject()
}

/**
 * @param {string} recordId 
 * @param {object} data 
 */
async function updateRecord(recordId, data) {
  validateRecord(data)
  const record = await RecordModel.findByIdAndUpdate(recordId, data, {
    new: true
  })
  return record?.toObject()
}

function validateRecord(data) {
  ['languages', 'softwares', 'roles', 'subjects'].forEach(key => {
    data[key] = data[key].filter(d => d != "")
  })
}

/**
 * @param {object} data 
 */
async function createRecord(data) {
  validateRecord(data)
  const records = await RecordModel.find({}).sort({no_: -1}).limit(1).select("no_")
  const nextNo_ = records[0].no_ + 1
  const record = await RecordModel.create({ ...data, no_: nextNo_ })
  data.languages.forEach(lang => !languages.includes(lang) ? languages.push(lang) : "")
  data.softwares.forEach(software => !softwares.includes(software) ? softwares.push(software) : "")
  return record?.toObject()
}

/**
 * @param {string} recordId 
 */
async function deleteRecord(recordId) {
  return RecordModel.findByIdAndDelete(recordId)
}

let languages = []
let softwares = []

async function getLanguages() {
  if (!languages.length) languages = await RecordModel.distinct("languages")
  return languages
}

async function getSoftwares() {
  if (!softwares.length) softwares = await RecordModel.distinct("softwares")
  return softwares
}

export {
  getRecords,
  getRecord,
  updateRecord,
  createRecord,
  deleteRecord,
  getLanguages,
  getSoftwares
}