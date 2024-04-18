import db from "$lib/server/db";

/**
 * @typedef {object} User
 * @property {string} id
 * @property {string} authId
 * @property {string} title
 * @property {string} titleTH
 * @property {string} firstName
 * @property {string} lastName
 * @property {string} firstNameTH
 * @property {string} lastNameTH
 * @property {string} nickname
 * @property {string} nicknameTH
 * @property {number} profileImageNo
 * @property {Date} birthday
 * @property {string} description
 * @property {string} descriptionTH
 * @property {string} moral
 * @property {string} moralTH
 * @property {string[]} imageURLs
 * @property {string} fullName
 * @property {string} fullNameTH
 * @property {number} age
 * @property {Contact} contact
 * @property {Record<string, string>} social
 * @property {Experience[]} experiences
 */

/**
 * @typedef {object} Experience
 * @property {string} company
 * @property {string} position
 * @property {string} description
 * @property {Number} yearStart
 * @property {Number} yearEnd
 * @property {boolean} worked
 * @property {number} periodMonth
 * @property {number} periodYear
 */

/**
 * @typedef {object} Contact
 * @property {string} phone
 * @property {string} email
 * @property {Address} address
 */

/**
 * @typedef {object} Address
 * @property {string} houseNo
 * @property {string} moo
 * @property {string} soi
 * @property {string} village
 * @property {string} street
 * @property {string} subDistrict
 * @property {string} district
 * @property {string} province
 * @property {string} country
 * @property {string} postalCode
*/

// @ts-ignore
const userSchema = new db.Schema({
  authId: String,
  title: String,
  titleTH: String,
  firstName: String,
  lastName: String,
  firstNameTH: String,
  lastNameTH: String,
  nickname: String,
  nicknameTH: String,
  profileImageNo: Number,
  birthday: Date,
  description: String,
  descriptionTH: String,
  moral: String,
  moralTH: String,
  imageURLs: [String],
  contact: {
    phone: String,
    email: String,
    houseNo: String,
    address: {
      houseNo: String,
      moo: String,
      soi: String,
      village: String,
      street: String,
      subDistrict: String,
      district: String,
      province: String,
      country: String,
      postalCode: String,
    }
  },
  social: Object,
  experiences: [{
    _id: false,
    company: String,
    position: String,
    description: String,
    yearStart: Number,
    yearEnd: { type: Number, default: null },
    worked: Boolean,
    periodMonth: Number,
    periodYear: Number,
  }],
  skill: {
    languages: [{
      name: String,
      level: {type: String, enum: ["excellent", "good", "basic"]},
      description: String,
    }],
    softwares: [{
      name: String,
      level: {type: String, enum: ["excellent", "good", "basic"]},
      description: String,
    }],
  }
});

userSchema.virtual('fullName').get(function() {
  return `${this.firstName} ${this.lastName}`
});

userSchema.virtual('fullNameTH').get(function() {
  return `${this.firstNameTH} ${this.lastNameTH}`
});

userSchema.virtual('age').get(function() {
  const now = new Date()
  const birthday = this.birthday

  const isBirthday = birthday.getMonth() === now.getMonth() && birthday.getDate() === now.getDate();
  let age = now.getFullYear() - birthday.getFullYear()
  if (!isBirthday) {
    if (now.getMonth() < birthday.getMonth() || (now.getMonth() === birthday.getMonth() && now.getDate() < birthday.getDate())) {
      age--
    }
  }
  return age
});

userSchema.set("toObject", { flattenObjectIds: true, getters: true, versionKey: false })

function getUserModel() {
  if (db.models["users"]) db.deleteModel("users")
  return db.model('users', userSchema)
}

export const UserModel = getUserModel()
