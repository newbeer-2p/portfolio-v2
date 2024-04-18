import db from "$lib/server/db";

/**
 * @typedef {'game'|'website'|'model'|'cinematic'|'other'} RecordType
 * 
 * @typedef {object} Record
 * @property {string} id
 * @property {number} no_
 * @property {string} name
 * @property {RecordType[]} types
 * @property {number} year
 * @property {string[]} subjects
 * @property {string} posterURL
 * @property {boolean} project
 * @property {string} description
 * @property {string[]} languages
 * @property {string[]} softwares
 * @property {string[]} roles
 * @property {string} demoURL
 * @property {string} githubURL
 * @property {string} linkURL
 * @property {boolean} shown
 * @property {boolean} recommended
 */
const RecordSchema = new db.Schema({
  no_: Number,
  name: String,
  types: {type: [String], enum: ['game', 'website', 'model', 'cinematic', 'other']},
  year: Number,
  subjects: [String],
  posterURL: String,
  project: Boolean,
  description: String,
  languages: [String],
  softwares: [String],
  roles: [String],
  demoURL: String,
  githubURL: String,
  linkURL: String,
  shown: {type: Boolean, default: true},
  recommended: {type: Boolean, default: false}
})

RecordSchema.set("toObject", { getters: true, flattenObjectIds: true, versionKey: false })

function getRecordModel() {
  if (db.models["records"]) db.deleteModel("records")
  return db.model('records', RecordSchema)
}

export const RecordModel = getRecordModel()