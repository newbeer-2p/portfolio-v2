import { UserModel } from "$lib/server/models";
/** @typedef {import("../models/user").User} User */

// /**
//  * @returns {Promise<User>}
//  */
async function getAuthor() {
  const user = await UserModel.findById("65145175bfeea6903aab2553")
  return user?.toObject()
}

/**
 * @param {string} userId
 * @param {import("$lib/server/models/user").User} user 
 */
async function updateUser(userId, user) {
  user.imageURLs = user.imageURLs.filter(url => url !== "")
  const updatedUser = await UserModel.findByIdAndUpdate(userId, user, {
    new: true
  })
  return updatedUser.toObject()
}

export {
  updateUser,
  getAuthor
}